'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import type { HeroSlide } from '@/lib/content'

const AUTOPLAY_MS = 7000

interface HeroSlideshowProps {
    slides: HeroSlide[]
}

const HeroSlideshow = ({ slides: heroSlides }: HeroSlideshowProps) => {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (paused) return
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length)
        }, AUTOPLAY_MS)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [paused, current, heroSlides.length])

    const goTo = (index: number) => {
        setCurrent(index)
    }

    return (
        <section
            className="relative w-full h-[500px] overflow-hidden md:h-auto md:min-h-[85vh]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {heroSlides.map((slide, i) => (
                <div
                    key={slide.image}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        i === current ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={i !== current}
                >
                    <Image
                        src={slide.image}
                        alt={slide.heading.join(' ')}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover"
                    />

                    {/* subtle overlay so text stays readable without washing out the photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

                    <div
                        className={`absolute inset-0 flex items-center ${
                            slide.align === 'center'
                                ? 'justify-center text-center'
                                : 'justify-end text-right pr-[6%] md:pr-[10%]'
                        }`}
                    >
                        <div className="max-w-xl">
                            <p className="subtop">{slide.eyebrow}</p>
                            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
                                {slide.heading[0]}
                                <br />
                                {slide.heading[1]}
                            </h1>
                            <p
                                className={`mt-4 max-w-md text-white/90 ${
                                    slide.align === 'center' ? 'mx-auto' : 'ml-auto'
                                }`}
                            >
                                {slide.subheading}
                            </p>
                            <Link href={slide.buttonHref} className="btn-theme mt-8">
                                Shop Now
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* dot navigation */}
            <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            i === current ? 'w-8 bg-[var(--g-main-2)]' : 'w-2 bg-white/60 hover:bg-white/90'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default HeroSlideshow
