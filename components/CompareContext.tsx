'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const MAX_COMPARE = 4

interface CompareContextType {
    compareList: number[]
    toggleCompare: (id: number) => boolean
    isComparing: (id: number) => boolean
    removeFromCompare: (id: number) => void
    count: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
    const [compareList, setCompareList] = useState<number[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('glora_compare')
        // Hydrating one-time client-only state from localStorage on mount is
        // intentional here — there is no SSR value to keep in sync with.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (stored) setCompareList(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem('glora_compare', JSON.stringify(compareList))
    }, [compareList])

    // returns false if the max-item cap blocked the add
    const toggleCompare = (id: number) => {
        let added = true
        setCompareList((prev) => {
            if (prev.includes(id)) return prev.filter((i) => i !== id)
            if (prev.length >= MAX_COMPARE) {
                added = false
                return prev
            }
            return [...prev, id]
        })
        return added
    }

    const isComparing = (id: number) => compareList.includes(id)
    const removeFromCompare = (id: number) => setCompareList((prev) => prev.filter((i) => i !== id))

    return (
        <CompareContext.Provider
            value={{ compareList, toggleCompare, isComparing, removeFromCompare, count: compareList.length }}
        >
            {children}
        </CompareContext.Provider>
    )
}

export const useCompare = () => {
    const context = useContext(CompareContext)
    if (context === undefined) {
        throw new Error('useCompare must be used within a CompareProvider')
    }
    return context
}
