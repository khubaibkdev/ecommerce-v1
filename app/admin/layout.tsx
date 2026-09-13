import type { Metadata } from 'next'
import Link from 'next/link'
import '../globals.css'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { getSession } from '@/lib/session'
import { logoutAction } from '@/app/admin/login/actions'

export const metadata: Metadata = {
    title: 'Glora Admin',
    description: 'Store administration dashboard.',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession()

    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-screen bg-slate-100 text-slate-900" style={{ colorScheme: 'light' }}>
                {!session ? (
                    <div className="min-h-screen bg-slate-100">{children}</div>
                ) : (
                    <div className="flex min-h-screen">
                        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:block">
                            <div className="border-b border-slate-200 px-4 py-4">
                                <span className="text-sm font-semibold uppercase tracking-wide text-slate-900">Glora Admin</span>
                            </div>
                            <AdminSidebar />
                        </aside>

                        <div className="flex min-w-0 flex-1 flex-col">
                            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
                                <span className="text-sm text-slate-500 md:hidden">Glora Admin</span>
                                <div className="ml-auto flex items-center gap-4 text-sm">
                                    <Link href="/" target="_blank" className="text-slate-600 hover:text-slate-900">
                                        View Store ↗
                                    </Link>
                                    <span className="text-slate-400">|</span>
                                    <span className="text-slate-600">{session.username}</span>
                                    <form action={logoutAction}>
                                        <button type="submit" className="font-medium text-slate-600 hover:text-slate-900">
                                            Log out
                                        </button>
                                    </form>
                                </div>
                            </header>

                            <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
                        </div>
                    </div>
                )}
            </body>
        </html>
    )
}
