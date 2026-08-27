'use client'

import React, { useEffect, useState } from 'react'

const BackToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-40 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[var(--g-body)] shadow-lg ring-2 ring-[var(--g-main-2)] transition-all duration-300 ${
                visible ? 'opacity-100' : 'pointer-events-none opacity-0 translate-y-2'
            }`}
        >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" style={{ color: 'var(--g-main-2)' }}>
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}

export default BackToTop
