'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuickView } from '@/components/QuickViewContext'
import { useCart } from '@/components/CartContext'
import { CloseIcon, StarIcon, MinusIcon, PlusIcon } from '@/components/icons'
import { formatPrice } from '@/lib/products'

const QuickViewModal = () => {
    const { product, closeQuickView } = useQuickView()
    const { addToCart } = useCart()
    const [activeImage, setActiveImage] = useState<string>('')
    const [quantity, setQuantity] = useState(1)
    const [lastProductId, setLastProductId] = useState<number | null>(null)

    // Reset the local gallery/quantity state whenever a *different* product is
    // opened. This adjusts state during render (React's documented pattern for
    // "resetting state when a prop changes") rather than in an effect, so there
    // is no extra render pass or flash of the previous product's image.
    if (product && product.id !== lastProductId) {
        setLastProductId(product.id)
        setActiveImage(product.image)
        setQuantity(1)
    }

    useEffect(() => {
        if (!product) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeQuickView()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [product, closeQuickView])

    if (!product) return null

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: activeImage,
            })
        }
        closeQuickView()
    }

    const activeSwatch = product.swatches?.find((s) => s.image === activeImage)

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--overlay-bg)] p-4"
            onClick={closeQuickView}
        >
            <div
                className="relative grid w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-2xl bg-[var(--g-body)] shadow-2xl md:max-h-[90vh] md:grid-cols-2"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={closeQuickView}
                    aria-label="Close quick view"
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--g-body)]/80 shadow transition-colors hover:bg-[var(--g-body-alt)]"
                >
                    <CloseIcon />
                </button>

                <div className="relative aspect-[3/4] w-full">
                    <Image src={activeImage} alt={product.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>

                <div className="flex flex-col gap-3 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-wider opacity-60">{product.vendor}</p>
                    <h3 className="text-xl font-semibold md:text-2xl" style={{ color: 'var(--g-color-heading)' }}>
                        {product.title}
                    </h3>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold" style={{ color: 'var(--g-color-heading)' }}>
                            {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && <s className="text-sm opacity-50">{formatPrice(product.compareAtPrice)}</s>}
                    </div>

                    <p className="text-sm leading-relaxed opacity-70">{product.description}</p>

                    {product.swatches && (
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                {product.swatches.map((swatch) => (
                                    <button
                                        key={swatch.name}
                                        type="button"
                                        title={swatch.name}
                                        aria-label={`Select ${swatch.name}`}
                                        onClick={() => setActiveImage(swatch.image)}
                                        className={`h-6 w-6 rounded-full border transition-transform hover:scale-110 ${
                                            activeImage === swatch.image ? 'ring-2 ring-offset-2 ring-[var(--g-main-2)]' : 'border-black/10'
                                        }`}
                                        style={{ backgroundColor: swatch.color }}
                                    />
                                ))}
                            </div>
                            {activeSwatch && <p className="text-xs opacity-60">Color: {activeSwatch.name}</p>}
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs font-semibold uppercase tracking-wide opacity-70">Quantity</span>
                        <div className="flex items-center gap-4 rounded-full border border-[var(--g-input-border)] px-4 py-2">
                            <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="flex h-4 w-4 items-center justify-center opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30"
                                disabled={quantity <= 1}
                            >
                                <MinusIcon />
                            </button>
                            <span className="w-4 text-center text-sm" style={{ color: 'var(--g-color-heading)' }}>
                                {quantity}
                            </span>
                            <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => setQuantity((q) => q + 1)}
                                className="flex h-4 w-4 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </div>

                    {product.soldOut ? (
                        <button type="button" disabled className="btn-theme mt-2 w-full cursor-not-allowed opacity-50">
                            Sold Out
                        </button>
                    ) : (
                        <button type="button" onClick={handleAddToCart} className="btn-theme mt-2 w-full">
                            Add to Cart
                        </button>
                    )}

                    <Link
                        href={`/product/${product.handle}`}
                        onClick={closeQuickView}
                        className="btn-underline mx-auto mt-1"
                    >
                        View full details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default QuickViewModal
