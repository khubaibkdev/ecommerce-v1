'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
    {
        eyebrow: 'Discover the latest trends',
        heading: (
            <>Elevate Your Style With <br /> Our New Collection</>
        ),
        description: (
            <>Get ready to turn heads with our exclusive fashion line. <br /> Explore the season's hottest trends</>
        ),
        image: '/images/hero_1.png',
        imageAlt: 'Woman holding shopping bag',
        imagePosition: 'object-right',
        textAlign: 'mx-auto text-center',
    },
    {
    eyebrow: 'Discover your style',
    heading: (
        <>Unleash The Latest Trends <br /> With Rosyz.</>
    ),
    description: (
        <>Step into the world of fashion and redefine your wardrobe <br /> with our exclusive collection.</>
    ),
    image: '/images/hero_2.png',
    imageAlt: 'Woman in purple fur coat',
    imagePosition: 'object-left',
    textAlign: 'ml-auto text-left',
    },
]

const HeroSection = () => {
    const [current, setCurrent] = useState(0)
    const slide = slides[current]

    return (
        <section className="relative min-h-[80vh] flex items-center px-4 md:px-12 overflow-hidden">

            {/* Full-bleed background image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    className={`object-cover ${slide.imagePosition}`}
                    priority
                />
            </div>

            {/* Text content */}
            <div className={`relative z-10 max-w-xl w-full ${slide.textAlign}`}>
                <h1 className="text-sm text-red-500 uppercase tracking-wider font-semibold">
                    {slide.eyebrow}
                </h1>
                <p className="mt-5 text-4xl md:text-5xl font-medium leading-tight">
                    {slide.heading}
                </p>
                <p className="mt-5 text-gray-700">
                    {slide.description}
                </p>
                <Link
                    href="/shop/men"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-bold text-white"
                >
                    Shop Now
                    <Image src="/icons/arrow-right.svg" alt="arrow-right" width={24} height={24} />
                </Link>

                {/* Dot navigation */}
                <div className={`flex gap-2 mt-10 ${slide.textAlign.includes('text-center') ? 'justify-center' : slide.textAlign.includes('ml-auto') ? 'justify-start' : ''}`}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`transition-all duration-300 rounded-full ${
                                current === index
                                    ? 'w-3 h-3 bg-red-500 ring-2 ring-red-300 ring-offset-2'
                                    : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/40'
                            }`}
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}

export default HeroSection

// import ShopBtn from '@/components/ShopBtn'
// import Image from 'next/image'


// const HeroSection = () => {
//     return (
//         <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-yellow-600">

//             <h1 className="text-center text-sm text-red-500">Discover the latest trends</h1>
//             <p className="text-center mt-5 text-4xl font-bold">Elevate Your Style With <br/> Our New Collection</p>
//             <p className="text-center mt-5">Get ready to turn heads with our exclusive fashion line. <br/> Explore the season's hottest trends</p>

//             <ShopBtn/>

//             <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[-80px] xl:right-[-20px] w-[550px] z-0">
//                 <Image
//                     src="/images/model_3.png"
//                     alt="Fashion model"
//                     width={300}
//                     height={300}
//                     className="object-contain"
//                     priority
//                 />
//             </div>

//         </section>
//     )
// }


// export default HeroSection
