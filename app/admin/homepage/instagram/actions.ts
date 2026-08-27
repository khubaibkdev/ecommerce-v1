'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

function readFields(formData: FormData) {
    return {
        image: String(formData.get('image') || '').trim(),
        link: String(formData.get('link') || '#').trim(),
        position: Number(formData.get('position') || 0),
        active: formData.get('active') === 'on',
    }
}

export async function createInstagramImage(formData: FormData) {
    await requireAdminSession()
    await prisma.instagramImage.create({ data: readFields(formData) })
    revalidatePath('/admin/homepage/instagram')
    revalidatePath('/')
}

export async function updateInstagramImage(id: number, formData: FormData) {
    await requireAdminSession()
    await prisma.instagramImage.update({ where: { id }, data: readFields(formData) })
    revalidatePath('/admin/homepage/instagram')
    revalidatePath('/')
}

export async function deleteInstagramImage(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.instagramImage.delete({ where: { id } })
    revalidatePath('/admin/homepage/instagram')
    revalidatePath('/')
}
