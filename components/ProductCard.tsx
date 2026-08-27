'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { useWishlist } from '@/components/WishlistContext'
import { useQuickView } from '@/components/QuickViewContext'
import { HeartIcon, PlusIcon } from '@/components/icons'
import { formatPrice, type Product } from '@/lib/products'

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart()
    const { isWishlisted, toggleWishlist } = useWishlist()
    const { openQuickView } = useQuickView()
    const [activeImage, setActiveImage] = useState(product.image)
    const wishlisted = isWishlisted(product.id)

    const discount = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : null

    return (
        <div className="group/card relative flex flex-col text-left">
            <div className="relative overflow-hidden rounded-[2px]" style={{ aspectRatio: '0.75' }}>
                <Link href={`/product/${product.handle}`} className="absolute inset-0 block">
                    <Image
                        src={activeImage}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-opacity duration-500"
                        onMouseEnter={() => setActiveImage(product.hoverImage)}
                    />
                </Link>

                {/* badges */}
                <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
                    {discount !== null && (
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: '#84c8bb' }}>
                            -{discount}%
                        </span>
                    )}
                    {product.countdown && !product.soldOut && (
                        <span className="rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Limited Deal
                        </span>
                    )}
                </div>
                {product.soldOut && (
                    <span
                        className="pointer-events-none absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold"
                        style={{ backgroundColor: 'var(--sold-out-bg)', color: 'var(--sold-out-text)' }}
                    >
                        Sold Out
                    </span>
                )}

                {/* wishlist */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(product.id)
                    }}
                    aria-label="Add to Wishlist"
                    className={`absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm shadow-md transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 ${
                        wishlisted ? 'bg-[var(--g-main-2)] text-white' : 'bg-white text-gray-800 hover:bg-[var(--g-main-2)] hover:text-white'
                    }`}
                >
                    <HeartIcon className="h-4 w-4" filled={wishlisted} />
                </button>

                {/* quickview */}
                {!product.soldOut && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            openQuickView(product)
                        }}
                        aria-label="Quickshop"
                        className="absolute left-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-all duration-300 hover:bg-black hover:text-white md:opacity-0 md:translate-y-2 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100"
                    >
                        <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            <div className="pt-3.5">
                <Link
                    href={`/collections/vendors?filter=${encodeURIComponent(product.vendor)}`}
                    className="mb-1 block truncate text-[11px] uppercase tracking-wider opacity-60 hover:opacity-100"
                >
                    {product.vendor}
                </Link>
                <Link
                    href={`/product/${product.handle}`}
                    className="block truncate font-medium leading-snug hover:text-[var(--g-main-2)]"
                >
                    {product.title}
                </Link>

                <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-semibold" style={{ color: 'var(--g-color-heading)' }}>
                        {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                        <s className="text-sm opacity-50">{formatPrice(product.compareAtPrice)}</s>
                    )}
                </div>

                {product.swatches && (
                    <div className="mt-2 flex items-center gap-1.5">
                        {product.swatches.map((swatch) => (
                            <button
                                key={swatch.name}
                                type="button"
                                title={swatch.name}
                                onClick={() => setActiveImage(swatch.image)}
                                className={`h-4 w-4 rounded-full border transition-transform hover:scale-110 ${
                                    activeImage === swatch.image ? 'ring-2 ring-offset-1 ring-[var(--g-main-2)]' : 'border-black/10'
                                }`}
                                style={{ backgroundColor: swatch.color }}
                            />
                        ))}
                    </div>
                )}

                {!product.soldOut && (
                    <button
                        type="button"
                        onClick={() =>
                            addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.image,
                            })
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide opacity-70 hover:opacity-100 hover:text-[var(--g-main-2)]"
                    >
                        <PlusIcon className="h-2.5 w-2.5" /> Add to Cart
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductCard
