'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'

interface ProductDetailsProps {
    name: string;
    price: number;
    availability: number;
    image: string;
}

const ProductDetails = ({ name, price, availability, image }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart()

    const handleQuantity = (type: 'increase' | 'decrease') => {
        if (type === 'increase') setQuantity(prev => prev + 1);
        if (type === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
    }

    return (
        <section className="container mx-auto px-4 py-8 md:py-12">

            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-gray-500 mb-8 gap-2">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link href="/men" className="hover:text-black transition-colors">Men</Link>
                <span>/</span>
                <span className="text-black font-medium">{name}</span>
            </nav>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                {/* Left Column: Image */}
                <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Arrow placeholders */}
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all">‹</button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all">›</button>
                </div>

                {/* Right Column: Info */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-3">
                        {name}
                    </h1>

                    <div className="flex items-center gap-6 mb-6">
                        <span className="text-2xl font-medium">${price.toFixed(2)}</span>
                        <span className="text-green-600 text-sm font-medium">{availability} Available</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                        Experience unparalleled style with our premium {name.toLowerCase()}. Crafted with the finest materials, this piece offers both comfort and elegance for any occasion.
                    </p>

                    {/* Stock Progress Bar */}
                    <div className="mb-6">
                        <p className="text-red-500 text-sm mb-2">
                            Hurrify, {availability} item(s) left in stock!
                        </p>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                    </div>

                    {/* Quantity & Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="flex items-center border border-gray-200 rounded-full h-12 px-1">
                            <button onClick={() => handleQuantity('decrease')} className="w-10 h-10 text-xl">-</button>
                            <span className="w-10 text-center font-medium">{quantity}</span>
                            <button onClick={() => handleQuantity('increase')} className="w-10 h-10 text-xl">+</button>
                        </div>
                        <button
                            onClick={() => {
                                addToCart({
                                    id: Date.now(), // Generates a temp ID, replace with real ID later
                                    title: name,
                                    price: price, // Make sure price is passed as a number, not string
                                    image: image,
                                });
                                alert(`${name} added to cart!`);
                            }}
                            className="flex-1 min-w-[140px] h-12 rounded-full border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
                        >
                            ADD TO CART
                        </button>                        <button className="flex-1 min-w-[140px] h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-all">BUY IT NOW</button>
                    </div>


                    <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
                        <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 text-sm font-medium">♡ Add To Wishlist</button>
                        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500 text-sm font-medium">⇄ Compare</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails