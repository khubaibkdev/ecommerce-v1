import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CategoryHero = () => {
    return (
        <section className="w-full">

            {/* ===== 1. BREADCRUMB NAVIGATION ===== */}
            <div className="bg-white border-b border-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm text-gray-500 font-medium">
                        <Link href="/" className="hover:text-black transition-colors">
                            Home
                        </Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="text-black">Men</span>
                    </nav>
                </div>
            </div>

            {/* ===== 2. HERO BANNER ===== */}
            <div className="relative w-full h-[300px] md:h-[400px] bg-[#808080] overflow-hidden">

                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/men.png"
                        alt="Men's Autumn Collection"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Centered Text Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-3">
                        Men
                    </h1>
                    <p className="text-sm md:text-base font-light max-w-2xl opacity-90 leading-relaxed">
                        Embrace the beauty of the season with our curated autumn collection.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default CategoryHero