'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext' // Import useCart

const ProductSection = () => {
    const [activeTab, setActiveTab] = useState('Featured')
    const { addToCart } = useCart(); // Get the addToCart function

    const tabs = ['Featured', 'New Arrival', 'Best Seller']

    const products = [
        {
            id: 1,
            name: "WinterWonder Co",
            title: "Quilted Puffer Jacket",
            price: "$20.00",
            originalPrice: "$32.00",
            discount: "-21%",
            image: "/images/puffer-jacket.png",
            category: "Featured",
            tag: "Sale"
        },
        {
            id: 2,
            name: "The Gentleman's Choice",
            title: "Classic Men's Shirt",
            price: "$25.00",
            originalPrice: null,
            discount: null,
            image: "/images/biker-jacket.png",
            category: "New Arrival"
        },
        {
            id: 3,
            name: "Rebel Rider",
            title: "Leather Biker Jacket",
            price: "$25.00",
            originalPrice: null,
            discount: null,
            image: "/images/oxford-shirt.png",
            category: "Best Seller",
            tag: "Hot"
        },
        {
            id: 4,
            name: "Silk Elegance",
            title: "Luxury Silk Scarf",
            price: "$21.00",
            originalPrice: null,
            discount: null,
            image: "/images/silk-scarf.png",
            category: "Featured"
        },
        {
            id: 5,
            name: "Active life Gear",
            title: "Athletic Shorts",
            price: "$15.00",
            originalPrice: null,
            discount: null,
            image: "/images/athletic-shorts.png",
            category: "Featured"
        },
        {
            id: 6,
            name: "Cashmere Cozy",
            title: "Cashmere knit Cardigan",
            price: "$28.00",
            originalPrice: null,
            discount: null,
            image: "/images/cashmare-knit.png",
            category: "New Arrival"
        },
        {
            id: 7,
            name: "bohemian Bliss",
            title: "Boho Floral Maxi",
            price: "$35.00",
            originalPrice: null,
            discount: null,
            image: "/images/boho-maxi.png",
            category: "New Arrival"
        }
    ];

    // Filter products based on active tab
    const filteredProducts = products.filter(
        product => product.category === activeTab || activeTab === 'Featured'
    );

    // Helper function to generate slug
    const createSlug = (text: string) => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    };

    return (
        <section className="container mx-auto px-4 py-12">

            <div className="justify-center flex gap-2 p-1 ">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 text-2xl font-medium transition-all duration-300 ${
                            activeTab === tab
                                ? 'text-red-400'
                                : 'text-gray-600 hover:text-black'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                    const productSlug = createSlug(product.title);
                    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${productSlug}?img=${encodeURIComponent(product.image)}`}
                            className="..."
                        >
                            {/* Product Image */}
                            <div className="relative h-64 bg-gray-100 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="max-sm:object-contain sm:object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {product.discount && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {product.discount}
                                    </div>
                                )}

                                {product.tag && (
                                    <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {product.tag}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <p className="text-xs text-gray-400 uppercase tracking-wider">
                                    {product.name}
                                </p>
                                <h3 className="font-semibold text-gray-800 mt-1 group-hover:text-red-500 transition-colors">
                                    {product.title}
                                </h3>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        {product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            {product.originalPrice}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: numericPrice,
                                            image: product.image,
                                        });

                                    }}
                                    className="w-full mt-4 bg-black text-white py-2 rounded-full text-sm font-medium hover:bg-red-500 transition-colors duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default ProductSection