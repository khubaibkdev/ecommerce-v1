import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const StyleRedefined = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/model_4.png"
                    alt="Style Redefined"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/10" />
            </div>


            <div className=" relative z-10 container mx-auto px-4 text-left ">
        <span className="inline-block text-sm uppercase tracking-[0.3em] text-black font-semibold mb-4">
          Style Redefined
        </span>

                <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                    Your Passport To <br />
                    <span className="text-black-400">Fashion Elegance</span>
                </h2>

                <p className="text-black max-w-2xl  text-left text-lg mb-8">
                    Indulge in the art of fashion with Rosyz. Discover a world of
                    sophistication and timeless elegance.
                </p>

                <Link
                    href="/shop"
                    className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Discover Now
                </Link>
            </div>
        </section>
    )
}

export default StyleRedefined