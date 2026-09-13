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

function readProductFields(formData: FormData) {
    const title = String(formData.get('title') || '').trim()
    const handleRaw = String(formData.get('handle') || '').trim()

    return {
        title,
        handle: slugify(handleRaw || title),
        vendor: String(formData.get('vendor') || '').trim(),
        description: String(formData.get('description') || '').trim(),
        price: Number(formData.get('price') || 0),
        compareAtPrice: formData.get('compareAtPrice') ? Number(formData.get('compareAtPrice')) : null,
        image: String(formData.get('image') || '').trim(),
        hoverImage: String(formData.get('hoverImage') || formData.get('image') || '').trim(),
        affiliateUrl: String(formData.get('affiliateUrl') || '').trim() || null,
        categorySlug: String(formData.get('category') || '').trim(),
        productType: String(formData.get('productType') || '').trim(),
        sizes: JSON.stringify(formData.getAll('sizes').map(String)),
        tabs: JSON.stringify(formData.getAll('tabs').map(String)),
        soldOut: formData.get('soldOut') === 'on',
        countdown: formData.get('countdown') === 'on',
        reviews: Number(formData.get('reviews') || 0),
        rating: Number(formData.get('rating') || 0),
        status: String(formData.get('status') || 'published'),
        seoTitle: String(formData.get('seoTitle') || '') || null,
        seoDescription: String(formData.get('seoDescription') || '') || null,
    }
}

function readSwatches(formData: FormData) {
    const names = formData.getAll('swatchName').map(String)
    const colors = formData.getAll('swatchColor').map(String)
    const images = formData.getAll('swatchImage').map(String)

    return names
        .map((name, i) => ({ name: name.trim(), color: colors[i] || '#000000', image: images[i] || '', position: i }))
        .filter((s) => s.name && s.image)
}

export async function createProduct(formData: FormData) {
    await requireAdminSession()
    const fields = readProductFields(formData)
    const swatches = readSwatches(formData)

    const count = await prisma.product.count()

    await prisma.product.create({
        data: { ...fields, position: count, swatches: { create: swatches } },
    })

    revalidatePath('/admin/products')
    revalidatePath('/')
    revalidatePath(`/shop/${fields.categorySlug}`)
    redirect('/admin/products')
}

export async function updateProduct(id: number, formData: FormData) {
    await requireAdminSession()
    const fields = readProductFields(formData)
    const swatches = readSwatches(formData)

    const existing = await prisma.product.findUnique({ where: { id } })

    await prisma.product.update({
        where: { id },
        data: {
            ...fields,
            swatches: { deleteMany: {}, create: swatches },
        },
    })

    revalidatePath('/admin/products')
    revalidatePath('/')
    revalidatePath(`/product/${fields.handle}`)
    revalidatePath(`/shop/${fields.categorySlug}`)
    if (existing && existing.categorySlug !== fields.categorySlug) {
        revalidatePath(`/shop/${existing.categorySlug}`)
    }
    redirect('/admin/products')
}

export async function deleteProduct(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    const product = await prisma.product.delete({ where: { id } })

    revalidatePath('/admin/products')
    revalidatePath('/')
    revalidatePath(`/shop/${product.categorySlug}`)
}
