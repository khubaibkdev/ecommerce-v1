'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const FashionCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Replace these with your actual PNG images inside the public folder
    const slides = [
        {
            id: 1,
            src: "/images/fc1.png",
            alt: "Fashion Model Yellow"
        },
        {
            id: 2,
            src: "/images/fc2.png",
            alt: "Fashion Model Pink"
        },
        {
            id: 3,
            src: "/images/fc3.png",
            alt: "Fashion Model Green"
        },
        {
            id: 4,
            src: "/images/fc4.png",
            alt: "Fashion Model Red"
        },
        {
            id: 5,
            src: "/images/fc5.png",
            alt: "Fashion Model Random1"
        },
        {
            id: 6,
            src: "/images/fc6.png",
            alt: "Fashion Model Random2"
        }
    ];

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="container mx-auto px-4 py-16">

            {/* Carousel Container */}
            <div className="relative max-w-[1200px] mx-auto overflow-hidden pb-12">

                {/* Slider Track */}
                <div
                    className="flex gap-6 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 34}%)` }}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="min-w-[32%] relative aspect-[3/4] rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            {/* The "+" Button */}
                            <button
                                className="absolute left-5 bottom-5 w-12 h-12 rounded-full bg-white hover:bg-gray-100 hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center text-2xl font-light text-gray-800"
                                aria-label="Add to favorites"
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                currentIndex === index
                                    ? 'bg-[#d32f2f] scale-125' // The red active dot
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default FashionCarousel