'use client'

import React, { useEffect, useState } from 'react'
import { useUIState } from '@/components/UIStateContext'
import { CloseIcon } from '@/components/icons'

type Mode = 'login' | 'register' | 'recover'

const inputClass =
    'w-full rounded-md border border-[var(--g-input-border)] bg-[var(--g-input-bg)] px-4 py-2.5 text-sm text-[var(--header-text)] outline-none transition-colors focus:border-[var(--g-main-2)] focus:ring-2 focus:ring-[var(--g-main-2)]/20'

export default function LoginModal() {
    const { activeDrawer, closeDrawer } = useUIState()
    const isOpen = activeDrawer === 'login'
    const [mode, setMode] = useState<Mode>('login')
    const [recoverySent, setRecoverySent] = useState(false)

    // Reset the form mode when the modal transitions closed (adjusting state during
    // render, per React's guidance, rather than in an effect).
    const [prevOpen, setPrevOpen] = useState(isOpen)
    if (isOpen !== prevOpen) {
        setPrevOpen(isOpen)
        if (!isOpen) {
            setMode('login')
            setRecoverySent(false)
        }
    }

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeDrawer()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [isOpen, closeDrawer])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        closeDrawer()
    }

    const handleRecoverSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setRecoverySent(true)
    }

    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center bg-[var(--overlay-bg)] p-4 transition-opacity duration-300 ${
                isOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
            }`}
            onClick={closeDrawer}
            aria-hidden={!isOpen}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Account"
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-md rounded-lg bg-[var(--g-body)] p-8 text-[var(--header-text)] shadow-2xl transition-all duration-300 ease-out ${
                    isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
                }`}
            >
                <button
                    type="button"
                    onClick={closeDrawer}
                    aria-label="Close"
                    className="absolute right-4 top-4 p-1 transition-colors hover:text-[var(--g-main-2)]"
                >
                    <CloseIcon />
                </button>

                {mode === 'login' && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">Login</h2>
                            <p className="mt-1 text-sm" style={{ color: 'var(--header-menudroptext)' }}>
                                Please enter your e-mail and password:
                            </p>
                        </div>
                        <input type="email" required placeholder="Email address" aria-label="Email address" className={inputClass} />
                        <input type="password" required placeholder="Password" aria-label="Password" className={inputClass} />
                        <button
                            type="button"
                            onClick={() => setMode('recover')}
                            className="w-fit text-xs font-medium underline-offset-2 hover:text-[var(--g-main-2)] hover:underline"
                        >
                            Forgot your password?
                        </button>
                        <button type="submit" className="btn-theme w-full">
                            Login
                        </button>
                        <p className="text-center text-sm">
                            New customer?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('register')}
                                className="font-medium text-[var(--g-main-2)] hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    </form>
                )}

                {mode === 'register' && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">Register</h2>
                            <p className="mt-1 text-sm" style={{ color: 'var(--header-menudroptext)' }}>
                                Create your account to get started:
                            </p>
                        </div>
                        <input type="text" required placeholder="Full name" aria-label="Full name" className={inputClass} />
                        <input type="email" required placeholder="Email address" aria-label="Email address" className={inputClass} />
                        <input type="password" required placeholder="Password" aria-label="Password" className={inputClass} />
                        <button type="submit" className="btn-theme w-full">
                            Create Account
                        </button>
                        <p className="text-center text-sm">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className="font-medium text-[var(--g-main-2)] hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    </form>
                )}

                {mode === 'recover' && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">Reset your password</h2>
                            <p className="mt-1 text-sm" style={{ color: 'var(--header-menudroptext)' }}>
                                We will send you an email to reset your password.
                            </p>
                        </div>
                        {recoverySent ? (
                            <p className="rounded-md bg-[var(--g-body-alt)] px-4 py-3 text-sm text-[var(--g-main-2)]">
                                We&apos;ve sent you an email with a link to update your password.
                            </p>
                        ) : (
                            <form onSubmit={handleRecoverSubmit} className="flex flex-col gap-4">
                                <input type="email" required placeholder="Email address" aria-label="Email address" className={inputClass} />
                                <button type="submit" className="btn-theme w-full">
                                    Submit
                                </button>
                            </form>
                        )}
                        <button
                            type="button"
                            onClick={() => setMode('login')}
                            className="w-fit text-sm font-medium underline-offset-2 hover:text-[var(--g-main-2)] hover:underline"
                        >
                            Back to login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
