'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { useUIState } from '@/components/UIStateContext'
import { CartIcon, CloseIcon } from '@/components/icons'
import { formatPrice } from '@/lib/products'

const FREE_SHIPPING_THRESHOLD = 100

export default function CartDrawer() {
    const { cartItems, removeFromCart, getCartTotal, getCartCount } = useCart()
    const { activeDrawer, closeDrawer } = useUIState()
    const isOpen = activeDrawer === 'cart'

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

    const total = getCartTotal()
    const count = getCartCount()
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
    const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)

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
                aria-label="Shopping cart"
                className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-[var(--g-body)] text-[var(--header-text)] shadow-2xl transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between border-b border-[var(--g-border)] px-5 py-4 sm:px-6">
                    <h2 className="text-base font-semibold">Cart ({count})</h2>
                    <button
                        type="button"
                        onClick={closeDrawer}
                        aria-label="Close cart"
                        className="p-1 transition-colors hover:text-[var(--g-main-2)]"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {cartItems.length > 0 && (
                    <div className="border-b border-[var(--g-border)] px-5 py-4 sm:px-6">
                        {remaining > 0 ? (
                            <p className="mb-2 text-xs" style={{ color: 'var(--header-menudroptext)' }}>
                                Spend <strong className="text-[var(--header-text)]">{formatPrice(remaining)}</strong> for Free
                                Shipping
                            </p>
                        ) : (
                            <p className="mb-2 text-xs font-medium text-[var(--g-main-2)]">
                                You&apos;ve unlocked free shipping!
                            </p>
                        )}
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--g-border)]">
                            <div
                                className="h-full rounded-full bg-[var(--g-main-2)] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                    {cartItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                            <CartIcon className="h-16 w-16 opacity-20" />
                            <p className="text-sm" style={{ color: 'var(--header-menudroptext)' }}>
                                No products in the cart.
                            </p>
                            <Link href="/" onClick={closeDrawer} className="btn-theme">
                                Shop our products
                            </Link>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-5">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex gap-4">
                                    <span className="relative block h-20 w-16 shrink-0 overflow-hidden rounded-md bg-[var(--g-body-alt)]">
                                        <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                                    </span>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <p className="text-sm font-medium leading-snug">{item.title}</p>
                                            <p className="mt-1 text-xs" style={{ color: 'var(--header-menudroptext)' }}>
                                                {formatPrice(item.price)} &times; {item.quantity}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="w-fit text-xs font-medium uppercase tracking-wide underline-offset-2 transition-colors hover:text-[var(--g-main-2)] hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <span className="shrink-0 text-sm font-semibold">
                                        {formatPrice(item.price * item.quantity)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-[var(--g-border)] px-5 py-5 sm:px-6">
                        <div className="mb-4 flex items-center justify-between text-sm font-semibold">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/cart" onClick={closeDrawer} className="btn-outline flex-1">
                                View Cart
                            </Link>
                            <Link href="/checkout" onClick={closeDrawer} className="btn-theme flex-1">
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
