'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

function readFields(formData: FormData) {
    return {
        image: String(formData.get('image') || '').trim(),
        productHandle: String(formData.get('productHandle') || '').trim(),
        topPos: String(formData.get('topPos') || '40%').trim(),
        leftPos: String(formData.get('leftPos') || '10%').trim(),
        position: Number(formData.get('position') || 0),
        active: formData.get('active') === 'on',
    }
}

export async function createSpringSlide(formData: FormData) {
    await requireAdminSession()
    await prisma.springSlide.create({ data: readFields(formData) })
    revalidatePath('/admin/homepage/spring')
    revalidatePath('/')
}

export async function updateSpringSlide(id: number, formData: FormData) {
    await requireAdminSession()
    await prisma.springSlide.update({ where: { id }, data: readFields(formData) })
    revalidatePath('/admin/homepage/spring')
    revalidatePath('/')
}

export async function deleteSpringSlide(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.springSlide.delete({ where: { id } })
    revalidatePath('/admin/homepage/spring')
    revalidatePath('/')
}
