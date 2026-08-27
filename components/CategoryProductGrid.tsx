'use client'

import React, { useMemo, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { CaretIcon, CloseIcon } from '@/components/icons'
import type { Product } from '@/lib/products'

type SortKey = 'best-selling' | 'price-asc' | 'price-desc' | 'alpha'
type Availability = 'in-stock' | 'sold-out'
type PriceBucket = 'under-20' | '20-25' | '25-30' | 'over-30'
type Columns = 2 | 3 | 4
type Size = 'S' | 'M' | 'L'
type Tag = 'featured' | 'new-arrival' | 'best-seller'

const sortLabels: Record<SortKey, string> = {
    'best-selling': 'Best Selling',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    alpha: 'Alphabetically, A-Z',
}

const priceBuckets: { key: PriceBucket; label: string; test: (price: number) => boolean }[] = [
    { key: 'under-20', label: 'Under $20', test: (p) => p < 20 },
    { key: '20-25', label: '$20 - $25', test: (p) => p >= 20 && p < 25 },
    { key: '25-30', label: '$25 - $30', test: (p) => p >= 25 && p < 30 },
    { key: 'over-30', label: '$30 & Above', test: (p) => p >= 30 },
]

const SIZES: Size[] = ['S', 'M', 'L']

const tagLabels: Record<Tag, string> = {
    featured: 'Featured',
    'new-arrival': 'New Arrival',
    'best-seller': 'Best Seller',
}

/** Collapsible sidebar section — matches the reference theme's accordion filter groups. */
const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [open, setOpen] = useState(true)
    return (
        <div className="border-t pb-5 pt-5" style={{ borderColor: 'var(--g-border)' }}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="mb-3 flex w-full items-center justify-between text-sm font-semibold"
                style={{ color: 'var(--g-color-heading)' }}
            >
                {title}
                <CaretIcon className={`h-2 w-2.5 opacity-60 transition-transform ${open ? '' : '-rotate-90'}`} />
            </button>
            {open && children}
        </div>
    )
}

const GridIcon = ({ bars, active }: { bars: 2 | 3 | 4; active: boolean }) => (
    <span
        className="flex h-8 w-8 items-center justify-center gap-[3px] rounded border transition-colors"
        style={{
            borderColor: active ? 'var(--g-color-heading)' : 'var(--g-border)',
            backgroundColor: active ? 'var(--g-body-alt)' : 'transparent',
        }}
    >
        {Array.from({ length: bars }).map((_, i) => (
            <span key={i} className="h-4 w-[2px]" style={{ backgroundColor: 'var(--g-color-heading)', opacity: active ? 1 : 0.4 }} />
        ))}
    </span>
)

const CategoryProductGrid = ({ products }: { products: Product[] }) => {
    const [sort, setSort] = useState<SortKey>('best-selling')
    const [availability, setAvailability] = useState<Set<Availability>>(new Set())
    const [priceFilter, setPriceFilter] = useState<Set<PriceBucket>>(new Set())
    const [sizeFilter, setSizeFilter] = useState<Set<Size>>(new Set())
    const [typeFilter, setTypeFilter] = useState<Set<string>>(new Set())
    const [brandFilter, setBrandFilter] = useState<Set<string>>(new Set())
    const [colorFilter, setColorFilter] = useState<Set<string>>(new Set())
    const [tagFilter, setTagFilter] = useState<Set<Tag>>(new Set())
    const [columns, setColumns] = useState<Columns>(3)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const inStockCount = products.filter((p) => !p.soldOut).length
    const soldOutCount = products.filter((p) => p.soldOut).length

    const bucketCounts = useMemo(
        () =>
            Object.fromEntries(
                priceBuckets.map((b) => [b.key, products.filter((p) => b.test(p.price)).length]),
            ) as Record<PriceBucket, number>,
        [products],
    )

    const sizeCounts = useMemo(
        () => Object.fromEntries(SIZES.map((s) => [s, products.filter((p) => p.sizes?.includes(s)).length])) as Record<Size, number>,
        [products],
    )

    const typeOptions = useMemo(() => {
        const counts = new Map<string, number>()
        products.forEach((p) => counts.set(p.productType, (counts.get(p.productType) ?? 0) + 1))
        return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
    }, [products])

    const brandOptions = useMemo(() => {
        const counts = new Map<string, number>()
        products.forEach((p) => counts.set(p.vendor, (counts.get(p.vendor) ?? 0) + 1))
        return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
    }, [products])

    const colorOptions = useMemo(() => {
        const swatchByName = new Map<string, string>()
        const counts = new Map<string, number>()
        products.forEach((p) =>
            p.swatches?.forEach((sw) => {
                swatchByName.set(sw.name, sw.color)
                counts.set(sw.name, (counts.get(sw.name) ?? 0) + 1)
            }),
        )
        return [...counts.entries()].map(([name, count]) => ({ name, count, color: swatchByName.get(name)! }))
    }, [products])

    const tagCounts = useMemo(() => {
        const counts: Record<Tag, number> = { featured: 0, 'new-arrival': 0, 'best-seller': 0 }
        products.forEach((p) => p.tabs.forEach((t) => counts[t]++))
        return counts
    }, [products])

    const toggleSet = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
        const next = new Set(set)
        if (next.has(value)) next.delete(value)
        else next.add(value)
        setter(next)
    }

    const filtered = useMemo(() => {
        let list = products
        if (availability.size > 0) {
            list = list.filter((p) => (availability.has('sold-out') && p.soldOut) || (availability.has('in-stock') && !p.soldOut))
        }
        if (priceFilter.size > 0) {
            list = list.filter((p) => priceBuckets.some((b) => priceFilter.has(b.key) && b.test(p.price)))
        }
        if (sizeFilter.size > 0) {
            list = list.filter((p) => p.sizes?.some((s) => sizeFilter.has(s)))
        }
        if (typeFilter.size > 0) {
            list = list.filter((p) => typeFilter.has(p.productType))
        }
        if (brandFilter.size > 0) {
            list = list.filter((p) => brandFilter.has(p.vendor))
        }
        if (colorFilter.size > 0) {
            list = list.filter((p) => p.swatches?.some((sw) => colorFilter.has(sw.name)))
        }
        if (tagFilter.size > 0) {
            list = list.filter((p) => p.tabs.some((t) => tagFilter.has(t)))
        }
        const sorted = [...list]
        if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
        else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
        else if (sort === 'alpha') sorted.sort((a, b) => a.title.localeCompare(b.title))
        return sorted
    }, [products, availability, priceFilter, sizeFilter, typeFilter, brandFilter, colorFilter, tagFilter, sort])

    const activeFilterCount =
        availability.size + priceFilter.size + sizeFilter.size + typeFilter.size + brandFilter.size + colorFilter.size + tagFilter.size
    const hasActiveFilters = activeFilterCount > 0
    const gridColsClass = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'

    const FilterPanel = (
        <div>
            <div className="flex items-center justify-between pb-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--g-color-heading)' }}>
                    Filter{hasActiveFilters ? `: (${activeFilterCount})` : ':'}
                </h3>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={() => {
                            setAvailability(new Set())
                            setPriceFilter(new Set())
                            setSizeFilter(new Set())
                            setTypeFilter(new Set())
                            setBrandFilter(new Set())
                            setColorFilter(new Set())
                            setTagFilter(new Set())
                        }}
                        className="text-xs underline opacity-60 hover:opacity-100"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <FilterSection title="Availability">
                <label className="mb-2 flex cursor-pointer items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={availability.has('in-stock')}
                            onChange={() => toggleSet(availability, 'in-stock', setAvailability)}
                            className="h-4 w-4 accent-[var(--g-main-2)]"
                        />
                        In stock
                    </span>
                    <span className="opacity-50">({inStockCount})</span>
                </label>
                <label className="flex cursor-pointer items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={availability.has('sold-out')}
                            onChange={() => toggleSet(availability, 'sold-out', setAvailability)}
                            className="h-4 w-4 accent-[var(--g-main-2)]"
                        />
                        Out of stock
                    </span>
                    <span className="opacity-50">({soldOutCount})</span>
                </label>
            </FilterSection>

            <FilterSection title="Price">
                {priceBuckets.map((bucket) => (
                    <label key={bucket.key} className="mb-2 flex cursor-pointer items-center justify-between text-sm last:mb-0">
                        <span className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={priceFilter.has(bucket.key)}
                                onChange={() => toggleSet(priceFilter, bucket.key, setPriceFilter)}
                                className="h-4 w-4 accent-[var(--g-main-2)]"
                            />
                            {bucket.label}
                        </span>
                        <span className="opacity-50">({bucketCounts[bucket.key]})</span>
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Size">
                <div className="flex flex-wrap gap-2">
                    {SIZES.filter((s) => sizeCounts[s] > 0).map((size) => {
                        const active = sizeFilter.has(size)
                        return (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSet(sizeFilter, size, setSizeFilter)}
                                className="flex h-9 w-9 items-center justify-center rounded border text-xs font-medium transition-colors"
                                style={{
                                    borderColor: active ? 'var(--g-color-heading)' : 'var(--g-border)',
                                    backgroundColor: active ? 'var(--g-color-heading)' : 'transparent',
                                    color: active ? 'var(--g-body)' : 'var(--g-color-heading)',
                                }}
                            >
                                {size}
                            </button>
                        )
                    })}
                </div>
            </FilterSection>

            <FilterSection title="Product type">
                {typeOptions.map(([type, count]) => (
                    <label key={type} className="mb-2 flex cursor-pointer items-center justify-between text-sm last:mb-0">
                        <span className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={typeFilter.has(type)}
                                onChange={() => toggleSet(typeFilter, type, setTypeFilter)}
                                className="h-4 w-4 accent-[var(--g-main-2)]"
                            />
                            {type}
                        </span>
                        <span className="opacity-50">({count})</span>
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Brand">
                {brandOptions.map(([brand, count]) => (
                    <label key={brand} className="mb-2 flex cursor-pointer items-center justify-between text-sm last:mb-0">
                        <span className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={brandFilter.has(brand)}
                                onChange={() => toggleSet(brandFilter, brand, setBrandFilter)}
                                className="h-4 w-4 accent-[var(--g-main-2)]"
                            />
                            {brand}
                        </span>
                        <span className="opacity-50">({count})</span>
                    </label>
                ))}
            </FilterSection>

            {colorOptions.length > 0 && (
                <FilterSection title="Color">
                    <div className="flex flex-wrap gap-2.5">
                        {colorOptions.map(({ name, color, count }) => {
                            const active = colorFilter.has(name)
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    title={`${name} (${count})`}
                                    onClick={() => toggleSet(colorFilter, name, setColorFilter)}
                                    className={`h-6 w-6 rounded-full border transition-transform hover:scale-110 ${
                                        active ? 'ring-2 ring-offset-2 ring-[var(--g-main-2)]' : 'border-black/10'
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            )
                        })}
                    </div>
                </FilterSection>
            )}

            <FilterSection title="More filters">
                {(Object.keys(tagLabels) as Tag[])
                    .filter((tag) => tagCounts[tag] > 0)
                    .map((tag) => (
                        <label key={tag} className="mb-2 flex cursor-pointer items-center justify-between text-sm last:mb-0">
                            <span className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={tagFilter.has(tag)}
                                    onChange={() => toggleSet(tagFilter, tag, setTagFilter)}
                                    className="h-4 w-4 accent-[var(--g-main-2)]"
                                />
                                {tagLabels[tag]}
                            </span>
                            <span className="opacity-50">({tagCounts[tag]})</span>
                        </label>
                    ))}
            </FilterSection>
        </div>
    )

    return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">{FilterPanel}</aside>

            <div>
                {/* Toolbar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--g-border)' }}>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(true)}
                            className="btn-outline px-4 py-2 text-xs lg:hidden"
                        >
                            Filter{hasActiveFilters ? ` (${activeFilterCount})` : ''}
                        </button>
                        <div className="hidden items-center gap-1.5 sm:flex">
                            {([2, 3, 4] as Columns[]).map((c) => (
                                <button key={c} type="button" aria-label={`Show ${c} per row`} onClick={() => setColumns(c)}>
                                    <GridIcon bars={c === 2 ? 2 : c === 3 ? 3 : 4} active={columns === c} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-xs">
                            <span className="opacity-60">Sort By:</span>
                            <span className="relative">
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value as SortKey)}
                                    className="appearance-none rounded-full border bg-transparent py-2 pl-3 pr-8 text-xs outline-none"
                                    style={{ borderColor: 'var(--g-input-border)', color: 'var(--g-color-heading)' }}
                                >
                                    {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                                        <option key={key} value={key} style={{ color: '#111' }}>
                                            {sortLabels[key]}
                                        </option>
                                    ))}
                                </select>
                                <CaretIcon className="pointer-events-none absolute right-3 top-1/2 h-2 w-2.5 -translate-y-1/2" />
                            </span>
                        </label>
                        <span className="text-xs opacity-60">{filtered.length} Products</span>
                    </div>
                </div>

                {filtered.length > 0 ? (
                    <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
                        {filtered.map((p) => (
                            <ProductCard product={p} key={p.id} />
                        ))}
                    </div>
                ) : (
                    <p className="py-16 text-center text-sm opacity-60">No products match the selected filters.</p>
                )}
            </div>

            {/* Mobile filter drawer */}
            <div
                className={`fixed inset-0 z-[65] bg-[var(--overlay-bg)] transition-opacity duration-300 lg:hidden ${
                    mobileFiltersOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                onClick={() => setMobileFiltersOpen(false)}
                aria-hidden="true"
            />
            <div
                role="dialog"
                aria-modal="true"
                className={`fixed left-0 top-0 z-[66] h-full w-[85%] max-w-sm overflow-y-auto p-6 shadow-2xl transition-transform duration-300 lg:hidden ${
                    mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ backgroundColor: 'var(--g-body)' }}
            >
                <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wide">Filters</span>
                    <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                        <CloseIcon />
                    </button>
                </div>
                {FilterPanel}
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="btn-theme mt-8 w-full">
                    Show {filtered.length} Results
                </button>
            </div>
        </div>
    )
}

export default CategoryProductGrid
