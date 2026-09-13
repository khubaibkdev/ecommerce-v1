'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/CartContext'
import { useWishlist } from '@/components/WishlistContext'
import { useCompare } from '@/components/CompareContext'
import { HeartIcon, CompareIcon, StarIcon, MinusIcon, PlusIcon } from '@/components/icons'
import Carousel from '@/components/Carousel'
import ProductCard from '@/components/ProductCard'
import { formatPrice, type Product, type ProductSwatch } from '@/lib/products'

interface ProductDetailsProps {
    product: Product
    relatedProducts: Product[]
}

const ProductDetails = ({ product, relatedProducts }: ProductDetailsProps) => {
    const router = useRouter()
    const { addToCart } = useCart()
    const { isWishlisted, toggleWishlist } = useWishlist()
    const { toggleCompare } = useCompare()

    const [activeImage, setActiveImage] = useState(product.image)
    const [selectedSwatch, setSelectedSwatch] = useState<ProductSwatch | undefined>(product.swatches?.[0])
    const [quantity, setQuantity] = useState(1)

    const discountPercent = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : null

    const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1)
    const showThumbnails = product.hoverImage !== product.image

    const handleSwatchClick = (swatch: ProductSwatch) => {
        setSelectedSwatch(swatch)
        setActiveImage(swatch.image)
    }

    const addSelectedToCart = () => {
        if (product.affiliateUrl) {
            window.location.href = product.affiliateUrl
            return
        }
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: activeImage,
            })
        }
    }

    const handleBuyNow = () => {
        if (product.affiliateUrl) {
            window.location.href = product.affiliateUrl
            return
        }
        addSelectedToCart()
        router.push('/checkout')
    }

    const handleCompareClick = () => {
        const added = toggleCompare(product.id)
        if (!added) {
            alert('You can compare up to 4 products at a time.')
        }
    }

    return (
        <>
            <section className="container-x py-8 md:py-14">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[var(--g-color-heading)] opacity-70 mb-8">
                    <Link href="/" className="hover:opacity-100 transition-opacity">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href={`/shop/${product.category}`} className="hover:opacity-100 transition-opacity">
                        {categoryLabel}
                    </Link>
                    <span>/</span>
                    <span className="opacity-100">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left: images */}
                    <div>
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[var(--g-body-alt)]">
                            <Image
                                src={activeImage}
                                alt={product.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {showThumbnails && (
                            <div className="flex gap-3 mt-4">
                                {[product.image, product.hoverImage].map((img, i) => (
                                    <button
                                        key={img}
                                        type="button"
                                        onClick={() => setActiveImage(img)}
                                        aria-label={`Show image ${i + 1} of ${product.title}`}
                                        className={`relative w-[72px] h-[90px] rounded-md overflow-hidden border-2 transition-colors ${
                                            activeImage === img ? 'border-[var(--g-main-2)]' : 'border-transparent'
                                        }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.title} thumbnail ${i + 1}`}
                                            fill
                                            sizes="72px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: info */}
                    <div className="flex flex-col">
                        <Link href="#" className="text-xs uppercase tracking-wider opacity-60 mb-2 w-fit">
                            {product.vendor}
                        </Link>

                        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--g-color-heading)] mb-3">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: product.rating }).map((_, i) => (
                                    <StarIcon key={i} className="w-3.5 h-3" />
                                ))}
                            </div>
                            <span className="text-sm opacity-60">({product.reviews} reviews)</span>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap mb-6">
                            <span className="text-2xl font-bold text-[var(--g-color-heading)]">
                                {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && (
                                <s className="text-base opacity-50">{formatPrice(product.compareAtPrice)}</s>
                            )}
                            {discountPercent !== null && (
                                <span
                                    className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                                    style={{ backgroundColor: 'var(--g-main-2)' }}
                                >
                                    -{discountPercent}% OFF
                                </span>
                            )}
                        </div>

                        <p className="text-sm opacity-70 leading-relaxed border-b border-[var(--g-border)] pb-6 mb-6">
                            {product.description}
                        </p>

                        {product.soldOut ? (
                            <div className="mb-6">
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                                    style={{ color: 'var(--sold-out-text)', backgroundColor: 'var(--sold-out-bg)' }}
                                >
                                    Sold Out
                                </span>
                            </div>
                        ) : (
                            <>
                                {product.swatches && selectedSwatch && (
                                    <div className="mb-6">
                                        <p className="text-sm font-medium text-[var(--g-color-heading)] mb-2">
                                            Color: {selectedSwatch.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {product.swatches.map((swatch) => (
                                                <button
                                                    key={swatch.name}
                                                    type="button"
                                                    title={swatch.name}
                                                    aria-label={`Select color ${swatch.name}`}
                                                    onClick={() => handleSwatchClick(swatch)}
                                                    className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                                                        selectedSwatch.name === swatch.name
                                                            ? 'border-[var(--g-main-2)]'
                                                            : 'border-transparent'
                                                    }`}
                                                    style={{ backgroundColor: swatch.color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center border border-[var(--g-border)] rounded-full h-12 px-1 w-fit mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-[var(--g-color-heading)]"
                                        aria-label="Decrease quantity"
                                    >
                                        <MinusIcon className="w-3 h-3" />
                                    </button>
                                    <span className="w-10 text-center font-medium text-[var(--g-color-heading)]">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-[var(--g-color-heading)]"
                                        aria-label="Increase quantity"
                                    >
                                        <PlusIcon className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="flex gap-4 flex-wrap mb-6">
                                    <button type="button" onClick={addSelectedToCart} className="btn-outline">
                                        Add to Cart
                                    </button>
                                    <button type="button" onClick={handleBuyNow} className="btn-theme">
                                        Buy It Now
                                    </button>
                                </div>
                            </>
                        )}

                        <div className="flex items-center gap-6 border-t border-[var(--g-border)] pt-6 mt-6">
                            <button
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--g-main-2)] transition-colors"
                            >
                                <HeartIcon className="w-4 h-4" filled={isWishlisted(product.id)} />
                                Add to Wishlist
                            </button>
                            <button
                                type="button"
                                onClick={handleCompareClick}
                                className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--g-main-2)] transition-colors"
                            >
                                <CompareIcon className="w-4 h-4" />
                                Compare
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="container-x mt-16 md:mt-24 mb-16 md:mb-24">
                    <p className="subtop mb-3">You May Also Like</p>
                    <h2 className="section-title mb-8">Related Products</h2>
                    <Carousel itemClassName="w-[70%] sm:w-1/2 lg:w-1/4" gapClassName="gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard product={p} key={p.id} />
                        ))}
                    </Carousel>
                </section>
            )}
        </>
    )
}

export default ProductDetails
