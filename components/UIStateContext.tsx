'use client'

import React, { createContext, useContext, useState } from 'react'

type Drawer = 'cart' | 'menu' | 'search' | 'login' | 'wishlist' | 'compare' | null

interface UIStateContextType {
    activeDrawer: Drawer
    openDrawer: (drawer: Exclude<Drawer, null>) => void
    closeDrawer: () => void
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined)

export const UIStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeDrawer, setActiveDrawer] = useState<Drawer>(null)

    return (
        <UIStateContext.Provider
            value={{
                activeDrawer,
                openDrawer: (drawer) => setActiveDrawer(drawer),
                closeDrawer: () => setActiveDrawer(null),
            }}
        >
            {children}
        </UIStateContext.Provider>
    )
}

export const useUIState = () => {
    const context = useContext(UIStateContext)
    if (context === undefined) {
        throw new Error('useUIState must be used within a UIStateProvider')
    }
    return context
}
