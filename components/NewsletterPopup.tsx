'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CloseIcon } from '@/components/icons'

const STORAGE_KEY = 'glora_newsletter_seen'

interface NewsletterPopupProps {
    enabled: boolean
    heading: string
    text: string
    image: string
}

const NewsletterPopup = ({ enabled, heading, text, image }: NewsletterPopupProps) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!enabled) return
        const timer = setTimeout(() => {
            try {
                if (!sessionStorage.getItem(STORAGE_KEY)) {
                    sessionStorage.setItem(STORAGE_KEY, '1')
                    setOpen(true)
                }
            } catch {
                // sessionStorage unavailable — skip the popup
            }
        }, 4000)
        return () => clearTimeout(timer)
    }, [enabled])

    useEffect(() => {
        if (!open) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--overlay-bg)] p-4 transition-opacity duration-300"
            onClick={() => setOpen(false)}
        >
            <div
                className="grid w-full max-w-3xl overflow-hidden rounded-2xl bg-[var(--g-body)] shadow-2xl md:grid-cols-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative hidden md:block">
                    <Image src={image} alt="Newsletter" fill className="object-cover" sizes="50vw" />
                </div>

                <div className="relative flex flex-col justify-center gap-4 p-8 md:p-10">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close newsletter popup"
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--g-body-alt)]"
                    >
                        <CloseIcon />
                    </button>

                    <h2 className="pr-8 text-2xl font-semibold md:text-3xl" style={{ color: 'var(--g-color-heading)' }}>
                        {heading}
                    </h2>
                    <p className="text-sm leading-relaxed opacity-70">{text}</p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setOpen(false)
                        }}
                        className="flex flex-col gap-3"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Your email address"
                            aria-label="Email address"
                            className="w-full rounded-full border border-[var(--g-input-border)] bg-[var(--g-input-bg)] px-5 py-3.5 text-sm outline-none"
                            style={{ color: 'var(--g-color-heading)' }}
                        />
                        <button type="submit" className="btn-theme w-full">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewsletterPopup
