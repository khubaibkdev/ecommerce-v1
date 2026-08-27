'use client'

import React, { createContext, useContext, useState } from 'react'
import type { Product } from '@/lib/products'

interface QuickViewContextType {
    product: Product | null
    openQuickView: (product: Product) => void
    closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined)

export const QuickViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [product, setProduct] = useState<Product | null>(null)

    return (
        <QuickViewContext.Provider
            value={{
                product,
                openQuickView: (p) => setProduct(p),
                closeQuickView: () => setProduct(null),
            }}
        >
            {children}
        </QuickViewContext.Provider>
    )
}

export const useQuickView = () => {
    const context = useContext(QuickViewContext)
    if (context === undefined) {
        throw new Error('useQuickView must be used within a QuickViewProvider')
    }
    return context
}
