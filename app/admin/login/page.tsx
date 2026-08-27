import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { loginAction } from './actions'

interface LoginPageProps {
    searchParams: Promise<{ error?: string; next?: string }>
}

const AdminLoginPage = async ({ searchParams }: LoginPageProps) => {
    const session = await getSession()
    if (session) redirect('/admin')

    const { error, next } = await searchParams

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-xl font-semibold text-slate-900">Admin Sign In</h1>
                <p className="mt-1 text-sm text-slate-500">Sign in to manage your store.</p>

                {error && (
                    <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">Invalid username or password.</p>
                )}

                <form action={loginAction} className="mt-6 flex flex-col gap-4">
                    <input type="hidden" name="next" value={next || '/admin'} />
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="username" className="text-sm font-medium text-slate-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            autoFocus
                            autoComplete="username"
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLoginPage
