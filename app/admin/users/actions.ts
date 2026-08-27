'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { requireAdminSession } from '@/lib/session'

export async function createAdminUser(formData: FormData) {
    await requireAdminSession()
    const username = String(formData.get('username') || '').trim()
    const password = String(formData.get('password') || '')
    const role = String(formData.get('role') || 'editor')

    if (!username || password.length < 6) {
        throw new Error('Username is required and password must be at least 6 characters.')
    }

    await prisma.adminUser.create({ data: { username, passwordHash: await hashPassword(password), role } })
    revalidatePath('/admin/users')
}

export async function updateAdminPassword(id: number, formData: FormData) {
    await requireAdminSession()
    const password = String(formData.get('password') || '')
    if (password.length < 6) throw new Error('Password must be at least 6 characters.')

    await prisma.adminUser.update({ where: { id }, data: { passwordHash: await hashPassword(password) } })
    revalidatePath('/admin/users')
}

export async function deleteAdminUser(formData: FormData) {
    const session = await requireAdminSession()
    const id = Number(formData.get('id'))

    const target = await prisma.adminUser.findUnique({ where: { id } })
    if (!target) return
    if (target.username === session.username) throw new Error('You cannot delete your own account while signed in.')

    const total = await prisma.adminUser.count()
    if (total <= 1) throw new Error('Cannot delete the last remaining admin account.')

    await prisma.adminUser.delete({ where: { id } })
    revalidatePath('/admin/users')
}
