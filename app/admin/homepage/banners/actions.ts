'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

function readFields(formData: FormData) {
    return {
        image: String(formData.get('image') || '').trim(),
        eyebrow: String(formData.get('eyebrow') || '').trim(),
        headingL1: String(formData.get('headingL1') || '').trim(),
        headingL2: String(formData.get('headingL2') || '').trim(),
        text: String(formData.get('text') || '').trim(),
        buttonHref: String(formData.get('buttonHref') || '/shop/men').trim(),
        position: Number(formData.get('position') || 0),
        active: formData.get('active') === 'on',
    }
}

export async function createGridBanner(formData: FormData) {
    await requireAdminSession()
    await prisma.gridBanner.create({ data: readFields(formData) })
    revalidatePath('/admin/homepage/banners')
    revalidatePath('/')
}

export async function updateGridBanner(id: number, formData: FormData) {
    await requireAdminSession()
    await prisma.gridBanner.update({ where: { id }, data: readFields(formData) })
    revalidatePath('/admin/homepage/banners')
    revalidatePath('/')
}

export async function deleteGridBanner(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.gridBanner.delete({ where: { id } })
    revalidatePath('/admin/homepage/banners')
    revalidatePath('/')
}
