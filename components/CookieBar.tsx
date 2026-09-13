'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'glora_cookie_ok'

interface CookieBarProps {
    enabled: boolean
    text: string
}

const CookieBar = ({ enabled, text }: CookieBarProps) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!enabled) return
        try {
            if (!localStorage.getItem(STORAGE_KEY)) {
                // Deciding one-time client-only visibility from localStorage on
                // mount is intentional here — there is no SSR value to sync with.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setVisible(true)
            }
        } catch {
            // localStorage unavailable — skip the bar
        }
    }, [enabled])

    const dismiss = () => {
        try {
            localStorage.setItem(STORAGE_KEY, '1')
        } catch {
            // ignore
        }
        setVisible(false)
    }

    if (!enabled) return null

    return (
        <div
            className={`fixed inset-x-0 bottom-0 z-[65] max-w-none rounded-none bg-[var(--card-bg)] p-5 shadow-[var(--card-shadow)] transition-transform duration-500 md:inset-x-auto md:bottom-4 md:right-4 md:max-w-sm md:rounded-2xl ${
                visible ? 'translate-y-0' : 'translate-y-full pointer-events-none opacity-0 md:opacity-0'
            }`}
            role="dialog"
            aria-label="Cookie notice"
            aria-hidden={!visible}
        >
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--g-color-heading)' }}>
                Cookie Policy
            </h3>
            <p className="mb-4 text-sm leading-relaxed opacity-75">
                {text}{' '}
                <Link href="/pages/privacy-policy" className="btn-underline">
                    Read Privacy
                </Link>
            </p>
            <button type="button" onClick={dismiss} className="btn-theme w-full sm:w-auto">
                Got it!
            </button>
        </div>
    )
}

export default CookieBar
