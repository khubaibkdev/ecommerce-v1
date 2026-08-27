'use client'

import React from 'react'
import Link from 'next/link'
import { useUIState } from '@/components/UIStateContext'
import { UserIcon } from '@/components/icons'

const AccountPage = () => {
    const { openDrawer } = useUIState()

    return (
        <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
            <UserIcon className="h-10 w-10 opacity-40" />
            <h1 className="section-title">My Account</h1>
            <p className="max-w-sm opacity-70">Sign in to view your orders, saved addresses, and account details.</p>
            <div className="mt-2 flex gap-4">
                <button type="button" onClick={() => openDrawer('login')} className="btn-theme">
                    Login
                </button>
                <Link href="/" className="btn-outline">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default AccountPage
