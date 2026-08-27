'use client'

import React from 'react'
import Link from 'next/link'
import { useWishlist } from '@/components/WishlistContext'
import type { Product } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { HeartIcon } from '@/components/icons'

interface WishlistPageClientProps {
    products: Product[]
}

const WishlistPageClient = ({ products }: WishlistPageClientProps) => {
    const { wishlist } = useWishlist()
    const wishlistedProducts = products.filter((p) => wishlist.includes(p.id))

    return (
        <div className="container-x py-14 md:py-20">
            <div className="mb-12 text-center md:mb-16">
                <p className="subtop mb-3">Saved For Later</p>
                <h1 className="section-title">Your Wishlist</h1>
            </div>

            {wishlistedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <HeartIcon className="h-12 w-12 opacity-30" />
                    <p className="opacity-70">You haven&apos;t added anything to your wishlist yet.</p>
                    <Link href="/" className="btn-theme">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                    {wishlistedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default WishlistPageClient
