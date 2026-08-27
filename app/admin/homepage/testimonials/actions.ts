'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

function readFields(formData: FormData) {
    return {
        name: String(formData.get('name') || '').trim(),
        role: String(formData.get('role') || '').trim(),
        image: String(formData.get('image') || '').trim(),
        quote: String(formData.get('quote') || '').trim(),
        subText: String(formData.get('subText') || '').trim(),
        position: Number(formData.get('position') || 0),
        active: formData.get('active') === 'on',
    }
}

export async function createTestimonial(formData: FormData) {
    await requireAdminSession()
    await prisma.testimonial.create({ data: readFields(formData) })
    revalidatePath('/admin/homepage/testimonials')
    revalidatePath('/')
}

export async function updateTestimonial(id: number, formData: FormData) {
    await requireAdminSession()
    await prisma.testimonial.update({ where: { id }, data: readFields(formData) })
    revalidatePath('/admin/homepage/testimonials')
    revalidatePath('/')
}

export async function deleteTestimonial(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/homepage/testimonials')
    revalidatePath('/')
}
