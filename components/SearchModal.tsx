'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUIState } from '@/components/UIStateContext'
import { CloseIcon, SearchIcon } from '@/components/icons'
import { formatPrice, type Product } from '@/lib/products'

const MAX_RESULTS = 6

interface SearchModalProps {
    products: Product[]
}

export default function SearchModal({ products }: SearchModalProps) {
    const { activeDrawer, closeDrawer } = useUIState()
    const isOpen = activeDrawer === 'search'
    const [query, setQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    // Reset the query when the modal transitions closed (adjusting state during
    // render, per React's guidance, rather than in an effect).
    const [prevOpen, setPrevOpen] = useState(isOpen)
    if (isOpen !== prevOpen) {
        setPrevOpen(isOpen)
        if (!isOpen) setQuery('')
    }

    useEffect(() => {
        if (!isOpen) return
        const id = requestAnimationFrame(() => inputRef.current?.focus())
        return () => cancelAnimationFrame(id)
    }, [isOpen])

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

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return products
            .filter((p) => p.title.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q))
            .slice(0, MAX_RESULTS)
    }, [query, products])

    return (
        <>
            <div
                className={`fixed inset-0 z-[60] bg-[var(--overlay-bg)] transition-opacity duration-300 ${
                    isOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
                }`}
                onClick={closeDrawer}
                aria-hidden="true"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Search products"
                className={`fixed inset-x-0 top-0 z-[61] bg-[var(--g-body)] text-[var(--header-text)] shadow-2xl transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="container-x relative py-16 md:py-24">
                    <button
                        type="button"
                        onClick={closeDrawer}
                        aria-label="Close search"
                        className="absolute right-4 top-4 p-2 transition-colors hover:text-[var(--g-main-2)] md:right-6 md:top-6"
                    >
                        <CloseIcon className="h-4 w-4" />
                    </button>

                    <div className="mx-auto max-w-2xl">
                        <p className="subtop mb-4 text-center">What are you looking for?</p>
                        <div className="relative flex items-center border-b border-[var(--g-border)] pb-3">
                            <SearchIcon className="mr-3 h-5 w-5 shrink-0" style={{ color: 'var(--header-menudroptext)' }} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Products..."
                                aria-label="Search products"
                                className="w-full bg-transparent text-xl outline-none placeholder:opacity-50 md:text-2xl"
                            />
                        </div>

                        {query.trim() !== '' && (
                            <div className="mt-6 max-h-[50vh] overflow-y-auto">
                                {results.length === 0 ? (
                                    <p className="py-6 text-center text-sm" style={{ color: 'var(--header-menudroptext)' }}>
                                        No results found for &ldquo;{query}&rdquo;.
                                    </p>
                                ) : (
                                    <ul className="flex flex-col gap-3">
                                        {results.map((product) => (
                                            <li key={product.id}>
                                                <Link
                                                    href={`/product/${product.handle}`}
                                                    onClick={closeDrawer}
                                                    className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-[var(--g-body-alt)]"
                                                >
                                                    <span className="relative block h-14 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--g-body-alt)]">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.title}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate text-sm font-medium">{product.title}</span>
                                                        <span className="block text-xs" style={{ color: 'var(--header-menudroptext)' }}>
                                                            {product.vendor}
                                                        </span>
                                                    </span>
                                                    <span className="shrink-0 text-sm font-semibold">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
