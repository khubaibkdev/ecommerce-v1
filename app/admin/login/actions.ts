'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { verifyPassword } from '@/lib/auth'
import { setSessionCookie, clearSessionCookie } from '@/lib/session'

export async function loginAction(formData: FormData) {
    const username = String(formData.get('username') || '').trim()
    const password = String(formData.get('password') || '')
    const next = String(formData.get('next') || '/admin')
    const safeNext = next.startsWith('/admin') ? next : '/admin'

    const user = await prisma.adminUser.findUnique({ where: { username } })
    const valid = user ? await verifyPassword(password, user.passwordHash) : false

    if (!user || !valid) {
        redirect(`/admin/login?error=1&next=${encodeURIComponent(safeNext)}`)
    }

    await setSessionCookie({ username: user.username, role: user.role })
    redirect(safeNext)
}

export async function logoutAction() {
    await clearSessionCookie()
    redirect('/admin/login')
}
