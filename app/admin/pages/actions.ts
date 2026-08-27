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
    const slugRaw = String(formData.get('slug') || '').trim()

    const headings = formData.getAll('blockHeading').map(String)
    const texts = formData.getAll('blockText').map(String)
    const body = headings
        .map((heading, i) => ({ heading: heading.trim(), text: (texts[i] || '').trim() }))
        .filter((b) => b.heading || b.text)

    return {
        title,
        slug: slugify(slugRaw || title),
        intro: String(formData.get('intro') || '').trim(),
        body: JSON.stringify(body),
    }
}

export async function createPage(formData: FormData) {
    await requireAdminSession()
    const fields = readFields(formData)
    await prisma.page.create({ data: fields })
    revalidatePath('/admin/pages')
    redirect('/admin/pages')
}

export async function updatePage(id: number, formData: FormData) {
    await requireAdminSession()
    const fields = readFields(formData)
    const existing = await prisma.page.findUnique({ where: { id } })
    await prisma.page.update({ where: { id }, data: fields })

    revalidatePath('/admin/pages')
    revalidatePath(`/pages/${fields.slug}`)
    if (existing && existing.slug !== fields.slug) revalidatePath(`/pages/${existing.slug}`)
    redirect('/admin/pages')
}

export async function deletePage(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.page.delete({ where: { id } })
    revalidatePath('/admin/pages')
}
