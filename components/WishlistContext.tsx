'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface WishlistContextType {
    wishlist: number[]
    toggleWishlist: (id: number) => void
    isWishlisted: (id: number) => boolean
    count: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlist, setWishlist] = useState<number[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('rosyz_wishlist')
        // Hydrating one-time client-only state from localStorage on mount is
        // intentional here — there is no SSR value to keep in sync with.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (stored) setWishlist(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem('rosyz_wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const toggleWishlist = (id: number) => {
        setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
    }

    const isWishlisted = (id: number) => wishlist.includes(id)

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, count: wishlist.length }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider')
    }
    return context
}
