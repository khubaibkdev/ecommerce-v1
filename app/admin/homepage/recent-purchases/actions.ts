'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

function readFields(formData: FormData) {
    return {
        title: String(formData.get('title') || '').trim(),
        image: String(formData.get('image') || '').trim(),
        handle: String(formData.get('handle') || '').trim(),
        location: String(formData.get('location') || '').trim(),
        timeLabel: String(formData.get('timeLabel') || '').trim(),
        position: Number(formData.get('position') || 0),
        active: formData.get('active') === 'on',
    }
}

export async function createRecentPurchase(formData: FormData) {
    await requireAdminSession()
    await prisma.recentPurchase.create({ data: readFields(formData) })
    revalidatePath('/admin/homepage/recent-purchases')
    revalidatePath('/')
}

export async function updateRecentPurchase(id: number, formData: FormData) {
    await requireAdminSession()
    await prisma.recentPurchase.update({ where: { id }, data: readFields(formData) })
    revalidatePath('/admin/homepage/recent-purchases')
    revalidatePath('/')
}

export async function deleteRecentPurchase(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.recentPurchase.delete({ where: { id } })
    revalidatePath('/admin/homepage/recent-purchases')
    revalidatePath('/')
}
