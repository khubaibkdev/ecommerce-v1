'use client'

import { useState, useEffect } from 'react'
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 9000)

        return () => clearInterval(timer)
    }, [])

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

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// const slides = [
//     {
//         eyebrow: 'Discover the latest trends',
//         heading: (
//             <>Elevate Your Style With <br /> Our New Collection</>
//         ),
//         description: (
//             <>Get ready to turn heads with our exclusive fashion line. <br /> Explore the season's hottest trends</>
//         ),
//         image: '/images/hero_1.png',
//         imageAlt: 'Woman holding shopping bag',
//         imagePosition: 'object-right',
//         textAlign: 'mx-auto text-center',
//     },
//     {
//     eyebrow: 'Discover your style',
//     heading: (
//         <>Unleash The Latest Trends <br /> With Rosyz.</>
//     ),
//     description: (
//         <>Step into the world of fashion and redefine your wardrobe <br /> with our exclusive collection.</>
//     ),
//     image: '/images/hero_2.png',
//     imageAlt: 'Woman in purple fur coat',
//     imagePosition: 'object-left',
//     textAlign: 'ml-auto text-left',
//     },
// ]

// const HeroSection = () => {
//     const [current, setCurrent] = useState(0)
//     const slide = slides[current]

//     return (
//         <section className="relative min-h-[80vh] flex items-center px-4 md:px-12 overflow-hidden">

//             {/* Full-bleed background image */}
//             <div className="absolute inset-0 -z-10">
//                 <Image
//                     src={slide.image}
//                     alt={slide.imageAlt}
//                     fill
//                     className={`object-cover ${slide.imagePosition}`}
//                     priority
//                 />
//             </div>

//             {/* Text content */}
//             <div className={`relative z-10 max-w-xl w-full ${slide.textAlign}`}>
//                 <h1 className="text-sm text-red-500 uppercase tracking-wider font-semibold">
//                     {slide.eyebrow}
//                 </h1>
//                 <p className="mt-5 text-4xl md:text-5xl font-medium leading-tight">
//                     {slide.heading}
//                 </p>
//                 <p className="mt-5 text-gray-700">
//                     {slide.description}
//                 </p>
//                 <Link
//                     href="/shop/men"
//                     className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-bold text-white"
//                 >
//                     Shop Now
//                     <Image src="/icons/arrow-right.svg" alt="arrow-right" width={24} height={24} />
//                 </Link>

//                 {/* Dot navigation */}
//                 <div className={`flex gap-2 mt-10 ${slide.textAlign.includes('text-center') ? 'justify-center' : slide.textAlign.includes('ml-auto') ? 'justify-start' : ''}`}>
//                     {slides.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrent(index)}
//                             aria-label={`Go to slide ${index + 1}`}
//                             className={`transition-all duration-300 rounded-full ${
//                                 current === index
//                                     ? 'w-3 h-3 bg-red-500 ring-2 ring-red-300 ring-offset-2'
//                                     : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/40'
//                             }`}
//                         />
//                     ))}
//                 </div>
//             </div>

//         </section>
//     )
// }

// export default HeroSection
