import Link from 'next/link'
import CategoryHero from '@/components/CategoryHero'
import CategoryProductGrid from '@/components/CategoryProductGrid'
import CategoryCollectionsCarousel from '@/components/CategoryCollectionsCarousel'
import { getCollections, getCollectionBySlug, getProducts } from '@/lib/products'

interface PageProps {
    params: Promise<{ category: string }>
}

const CategoryPage = async ({ params }: PageProps) => {
    const { category } = await params
    const [collection, collections, products] = await Promise.all([
        getCollectionBySlug(category),
        getCollections(),
        getProducts(),
    ])

    if (!collection) {
        return (
            <div className="container-x py-24 text-center">
                <h1 className="mb-4 text-2xl font-semibold text-[var(--g-color-heading)] md:text-3xl">
                    Collection not found
                </h1>
                <p className="mb-8 text-sm opacity-60">We couldn&apos;t find the collection you were looking for.</p>
                <Link href="/" className="btn-theme">
                    Back to Home
                </Link>
            </div>
        )
    }

    const filteredProducts = products.filter((p) => p.category === collection.slug)

    return (
        <>
            <CategoryHero
                title={collection.name}
                description={`Discover our curated ${collection.name.toLowerCase()} collection — handpicked pieces for every occasion.`}
                image={collection.heroImage}
            />

            {/* Shop-by-category tabs */}
            <div className="border-b" style={{ borderColor: 'var(--g-border)' }}>
                <div className="container-x">
                    <nav className="no-scrollbar flex gap-8 overflow-x-auto py-4">
                        {collections.map((c) => {
                            const active = c.slug === collection.slug
                            return (
                                <Link
                                    key={c.slug}
                                    href={`/shop/${c.slug}`}
                                    className={`shrink-0 whitespace-nowrap pb-1 text-sm font-medium transition-colors ${
                                        active ? 'border-b-2' : 'opacity-60 hover:opacity-100'
                                    }`}
                                    style={active ? { borderColor: 'var(--g-color-heading)', color: 'var(--g-color-heading)' } : undefined}
                                >
                                    {c.name} <span className="opacity-60">({c.count})</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>

            {/* Shop-by-category strip */}
            <div className="container-x py-8 md:py-10">
                <CategoryCollectionsCarousel />
            </div>

            <div className="container-x py-10 md:py-16">
                <CategoryProductGrid products={filteredProducts} />
            </div>
        </>
    )
}

export default CategoryPage
