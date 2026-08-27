'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

interface CarouselProps {
    children: React.ReactNode[]
    itemClassName?: string
    gapClassName?: string
    showArrows?: boolean
    showDots?: boolean
    autoplayMs?: number
    className?: string
    ariaLabel?: string
}

const MAX_DOTS = 8

const Carousel = ({
    children,
    itemClassName = 'w-[85%] sm:w-1/2 lg:w-1/4',
    gapClassName = 'gap-6',
    showArrows = true,
    showDots = true,
    autoplayMs,
    className = '',
    ariaLabel = 'carousel',
}: CarouselProps) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const dragStateRef = useRef({ active: false, moved: false, startX: 0, startScrollLeft: 0 })
    const count = React.Children.count(children)
    const dotCount = Math.min(count, MAX_DOTS)

    const scrollToIndex = useCallback((index: number) => {
        const track = trackRef.current
        if (!track) return
        const clamped = Math.max(0, Math.min(index, count - 1))
        const child = track.children[clamped] as HTMLElement | undefined
        if (child) {
            track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: 'smooth' })
        }
    }, [count])

    const scrollByOne = useCallback(
        (dir: 1 | -1) => {
            const next = Math.max(0, Math.min(activeIndex + dir, count - 1))
            scrollToIndex(next)
        },
        [activeIndex, count, scrollToIndex],
    )

    const updateEdgeState = useCallback(() => {
        const track = trackRef.current
        if (!track) return
        setAtStart(track.scrollLeft <= 2)
        setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2)
    }, [])

    const onScroll = useCallback(() => {
        const track = trackRef.current
        if (!track) return
        let closest = 0
        let closestDist = Infinity
        Array.from(track.children).forEach((el, i) => {
            const dist = Math.abs((el as HTMLElement).offsetLeft - track.offsetLeft - track.scrollLeft)
            if (dist < closestDist) {
                closestDist = dist
                closest = i
            }
        })
        setActiveIndex(closest)
        updateEdgeState()
    }, [updateEdgeState])

    useEffect(() => {
        updateEdgeState()
    }, [updateEdgeState, count])

    useEffect(() => {
        if (!autoplayMs || paused || count <= 1) return
        const timer = setInterval(() => {
            const track = trackRef.current
            if (!track) return
            const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
            if (isAtEnd) {
                track.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                scrollByOne(1)
            }
        }, autoplayMs)
        return () => clearInterval(timer)
    }, [autoplayMs, paused, scrollByOne, count])

    // Click-and-drag scrolling for mouse/trackpad users — touch already scrolls
    // natively, so we only handle 'mouse'/'pen' pointer types here. A small
    // movement threshold distinguishes an intentional drag from a plain click
    // so links/buttons inside slides still work normally.
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') return
        const track = trackRef.current
        if (!track) return
        dragStateRef.current = { active: true, moved: false, startX: e.clientX, startScrollLeft: track.scrollLeft }
        track.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragStateRef.current
        const track = trackRef.current
        if (!drag.active || !track) return
        const dx = e.clientX - drag.startX
        if (Math.abs(dx) > 10 && !drag.moved) {
            drag.moved = true
            setIsDragging(true)
        }
        if (drag.moved) {
            track.scrollLeft = drag.startScrollLeft - dx
        }
    }

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragStateRef.current
        const track = trackRef.current
        if (drag.active && track) {
            try {
                track.releasePointerCapture(e.pointerId)
            } catch {
                // pointer capture may already be released — safe to ignore
            }
        }
        dragStateRef.current.active = false
        // Defer clearing the "moved" flag so the click handler below (which
        // fires right after pointerup) can still see it and swallow the click.
        if (drag.moved) {
            setTimeout(() => {
                dragStateRef.current.moved = false
                setIsDragging(false)
            }, 0)
        }
    }

    const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
        if (dragStateRef.current.moved) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    // Map a small, fixed number of "page" dots onto however many real slides
    // there are, so a row of 15 products doesn't render 15 tiny dots — each
    // dot represents a proportional scroll position instead of one slide.
    const dotToIndex = (dotIdx: number) =>
        dotCount <= 1 ? 0 : Math.round((dotIdx / (dotCount - 1)) * (count - 1))
    const activeDot = dotCount <= 1 ? 0 : Math.round((activeIndex / Math.max(count - 1, 1)) * (dotCount - 1))

    return (
        <div
            className={`relative ${className}`}
            role="region"
            aria-label={ariaLabel}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                ref={trackRef}
                onScroll={onScroll}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onPointerCancel={endDrag}
                onClickCapture={onClickCapture}
                className={`no-scrollbar flex snap-x overflow-x-auto ${
                    isDragging ? 'cursor-grabbing select-none snap-none scroll-auto' : 'cursor-grab snap-mandatory scroll-smooth'
                } ${gapClassName}`}
            >
                {React.Children.map(children, (child, i) => (
                    <div key={i} className={`shrink-0 snap-start ${itemClassName}`}>
                        {child}
                    </div>
                ))}
            </div>

            {showArrows && count > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous slide"
                        aria-disabled={atStart}
                        onClick={() => scrollByOne(-1)}
                        className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 hover:bg-[var(--g-main-2)] hover:text-white hover:border-[var(--g-main-2)] md:flex"
                        style={{
                            backgroundColor: 'var(--g-body)',
                            borderColor: 'var(--g-border)',
                            color: 'var(--g-color-heading)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                            opacity: atStart ? 0.4 : 1,
                        }}
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next slide"
                        aria-disabled={atEnd}
                        onClick={() => scrollByOne(1)}
                        className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 hover:bg-[var(--g-main-2)] hover:text-white hover:border-[var(--g-main-2)] md:flex"
                        style={{
                            backgroundColor: 'var(--g-body)',
                            borderColor: 'var(--g-border)',
                            color: 'var(--g-color-heading)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                            opacity: atEnd ? 0.4 : 1,
                        }}
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </>
            )}

            {showDots && count > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to slide group ${i + 1}`}
                            onClick={() => scrollToIndex(dotToIndex(i))}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeDot === i ? 'w-6 bg-[var(--g-main-2)]' : 'w-2 bg-current opacity-25 hover:opacity-50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Carousel
