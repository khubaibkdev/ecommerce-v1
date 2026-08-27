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
    const title = String(formData.get('title') || '').trim()
    const handleRaw = String(formData.get('handle') || '').trim()
    return {
        title,
        handle: slugify(handleRaw || title),
        image: String(formData.get('image') || '').trim(),
        author: String(formData.get('author') || '').trim(),
        date: String(formData.get('date') || '').trim(),
        excerpt: String(formData.get('excerpt') || '').trim(),
        content: String(formData.get('content') || '').trim(),
        status: String(formData.get('status') || 'published'),
    }
}

export async function createBlogPost(formData: FormData) {
    await requireAdminSession()
    const fields = readFields(formData)
    const count = await prisma.blogPost.count()
    await prisma.blogPost.create({ data: { ...fields, position: count } })
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath('/')
    redirect('/admin/blog')
}

export async function updateBlogPost(id: number, formData: FormData) {
    await requireAdminSession()
    const fields = readFields(formData)
    const existing = await prisma.blogPost.findUnique({ where: { id } })
    await prisma.blogPost.update({ where: { id }, data: fields })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath('/')
    revalidatePath(`/blog/${fields.handle}`)
    if (existing && existing.handle !== fields.handle) revalidatePath(`/blog/${existing.handle}`)
    redirect('/admin/blog')
}

export async function deleteBlogPost(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.blogPost.delete({ where: { id } })
    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    revalidatePath('/')
}
