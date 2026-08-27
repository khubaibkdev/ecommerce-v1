'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function readFields(formData: FormData) {
    const name = String(formData.get('name') || '').trim()
    const slugRaw = String(formData.get('slug') || '').trim()
    return {
        name,
        slug: slugify(slugRaw || name),
        image: String(formData.get('image') || '').trim(),
        heroImage: String(formData.get('heroImage') || formData.get('image') || '').trim(),
        position: Number(formData.get('position') || 0),
    }
}

export async function createCategory(formData: FormData) {
    await requireAdminSession()
    const fields = readFields(formData)
    await prisma.category.create({ data: fields })
    revalidatePath('/admin/categories')
    revalidatePath('/')
    redirect('/admin/categories')
}

export async function updateCategory(id: number, formData: FormData) {
    await requireAdminSession()
    const fields = readFields(formData)
    const existing = await prisma.category.findUnique({ where: { id } })
    await prisma.category.update({ where: { id }, data: fields })

    revalidatePath('/admin/categories')
    revalidatePath('/')
    revalidatePath(`/shop/${fields.slug}`)
    if (existing && existing.slug !== fields.slug) revalidatePath(`/shop/${existing.slug}`)
    redirect('/admin/categories')
}

export async function deleteCategory(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    const productCount = await prisma.product.count({ where: { categorySlug: (await prisma.category.findUnique({ where: { id } }))?.slug } })
    if (productCount > 0) {
        throw new Error('Cannot delete a category that still has products. Move or delete its products first.')
    }
    await prisma.category.delete({ where: { id } })
    revalidatePath('/admin/categories')
    revalidatePath('/')
}
