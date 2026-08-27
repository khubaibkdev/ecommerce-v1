'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { RecentPurchase } from '@/lib/content'
import { CloseIcon } from '@/components/icons'

const INITIAL_DELAY = 5000
const VISIBLE_DURATION = 6000
const GAP_DURATION = 4000

interface ProductNotificationToastProps {
    recentPurchases: RecentPurchase[]
}

const ProductNotificationToast = ({ recentPurchases }: ProductNotificationToastProps) => {
    const [state, setState] = useState<{ index: number; visible: boolean }>({ index: 0, visible: false })
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => {
        if (recentPurchases.length === 0) return

        const schedule = (fn: () => void, ms: number) => {
            const id = setTimeout(fn, ms)
            timers.current.push(id)
        }

        const showCycle = (index: number, delayBeforeShow: number) => {
            schedule(() => {
                setState({ index, visible: true })
                schedule(() => {
                    setState((prev) => ({ ...prev, visible: false }))
                    const nextIndex = (index + 1) % recentPurchases.length
                    showCycle(nextIndex, GAP_DURATION)
                }, VISIBLE_DURATION)
            }, delayBeforeShow)
        }

        showCycle(0, INITIAL_DELAY)

        return () => {
            timers.current.forEach(clearTimeout)
            timers.current = []
        }
    }, [recentPurchases])

    if (recentPurchases.length === 0) return null

    const entry = recentPurchases[state.index]

    return (
        <div
            className={`fixed bottom-6 left-6 z-40 hidden max-w-sm rounded-xl bg-[var(--card-bg)] p-4 shadow-[var(--card-shadow)] transition-all duration-500 md:block ${
                state.visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
            }`}
        >
            <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, visible: false }))}
                aria-label="Dismiss notification"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
            >
                <CloseIcon />
            </button>

            <div className="flex gap-3 pr-4">
                <div className="relative h-[70px] w-14 shrink-0 overflow-hidden rounded-md">
                    <Image src={entry.image} alt={entry.title} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs opacity-60">Someone recently bought</p>
                    <Link
                        href={`/product/${entry.handle}`}
                        className="block truncate text-sm font-bold transition-colors hover:text-[var(--g-main-2)]"
                        style={{ color: 'var(--g-color-heading)' }}
                    >
                        {entry.title}
                    </Link>
                    <p className="text-xs opacity-70">{entry.location}</p>
                    <p className="text-[11px] opacity-50">{entry.time}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductNotificationToast
