'use client'

import { useState } from 'react'
import Carousel from '@/components/Carousel'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

type TabKey = 'featured' | 'new-arrival' | 'best-seller'

const tabs: { key: TabKey; label: string }[] = [
    { key: 'featured', label: 'Featured' },
    { key: 'new-arrival', label: 'New Arrival' },
    { key: 'best-seller', label: 'Best Seller' },
]

interface ProductTabsProps {
    products: Product[]
}

const ProductTabs = ({ products }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState<TabKey>('featured')
    const filtered = products.filter((product) => product.tabs.includes(activeTab))

    return (
        <div>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-full border-2 px-5 py-2 text-sm font-medium transition-colors ${
                            activeTab === tab.key
                                ? 'border-[var(--g-color-heading)] bg-[var(--g-color-heading)] text-[var(--g-body)]'
                                : 'border-[var(--g-border)] text-[var(--g-color-heading)] opacity-70 hover:opacity-100'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <Carousel key={activeTab} itemClassName="w-[72%] sm:w-1/2 lg:w-1/4" gapClassName="gap-6 md:gap-8">
                {filtered.map((p) => (
                    <ProductCard product={p} key={p.id} />
                ))}
            </Carousel>
        </div>
    )
}

export default ProductTabs
