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
        subheading: String(formData.get('subheading') || '').trim(),
        align: String(formData.get('align') || 'center'),
        buttonHref: String(formData.get('buttonHref') || '/shop/men').trim(),
        position: Number(formData.get('position') || 0),
        active: formData.get('active') === 'on',
    }
}

export async function createHeroSlide(formData: FormData) {
    await requireAdminSession()
    await prisma.heroSlide.create({ data: readFields(formData) })
    revalidatePath('/admin/homepage/hero')
    revalidatePath('/')
}

export async function updateHeroSlide(id: number, formData: FormData) {
    await requireAdminSession()
    await prisma.heroSlide.update({ where: { id }, data: readFields(formData) })
    revalidatePath('/admin/homepage/hero')
    revalidatePath('/')
}

export async function deleteHeroSlide(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.heroSlide.delete({ where: { id } })
    revalidatePath('/admin/homepage/hero')
    revalidatePath('/')
}
