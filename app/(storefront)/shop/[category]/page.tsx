import type { Metadata } from 'next'
import Link from 'next/link'
import CategoryHero from '@/components/CategoryHero'
import CategoryProductGrid from '@/components/CategoryProductGrid'
import CategoryCollectionsCarousel from '@/components/CategoryCollectionsCarousel'
import { getCollections, getCollectionBySlug, getProducts } from '@/lib/products'
import { CollectionJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

const CATEGORY_META: Record<string, { title: string; description: string }> = {
    clothes: { title: "Women's Luxury Clothing", description: 'Shop curated luxury clothing for women at Glora Styles. Dresses, tops, skirts & more — designed for every occasion with worldwide shipping.' },
    lingerie: { title: 'Luxury Lingerie Collection', description: 'Discover premium lingerie at Glora Styles. Elegant bras, sets & bodysuits crafted for comfort and confidence. Free shipping on select orders.' },
    swimwear: { title: 'Designer Swimwear for Women', description: 'Shop designer swimwear & bikinis at Glora Styles. Resort-ready pieces from one-piece suits to bikini sets for every body type.' },
    skincare: { title: 'Premium Skincare Collection', description: 'Luxury skincare essentials at Glora Styles. Serums, moisturizers & treatments to reveal your natural radiance.' },
    essentials: { title: 'Luxury Bags & Accessories', description: 'Complete your look with luxury bags, accessories & essentials from Glora Styles. Statement pieces for the modern woman.' },
    footwear: { title: "Women's Designer Footwear", description: 'Step into elegance with designer heels, flats & boots from Glora Styles. Premium footwear for every occasion.' },
    nightsuits: { title: 'Luxury Sleepwear & Nightsuits', description: 'Indulge in luxurious sleepwear at Glora Styles. Silk pajamas, nightgowns & cozy nightsuits for effortless bedtime elegance.' },
    men: { title: "Men's Premium Fashion", description: "Shop men's premium fashion at Glora Styles. Curated shirts, trousers, accessories & grooming essentials with modern sophistication." },
}

interface PageProps {
    params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params
    const collection = await getCollectionBySlug(category)
    if (!collection) return {}
    const meta = CATEGORY_META[category] || { title: collection.name, description: `Shop ${collection.name.toLowerCase()} at Glora Styles.` }
    return {
        title: meta.title,
        description: meta.description,
        alternates: { canonical: `/shop/${category}` },
        openGraph: {
            title: `${meta.title} | Glora Styles`,
            description: meta.description,
            url: `https://glorastyle.com/shop/${category}`,
            images: collection.heroImage ? [{ url: collection.heroImage, alt: collection.name }] : undefined,
        },
    }
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
            <BreadcrumbJsonLd items={[
                { name: 'Home', url: 'https://glorastyle.com' },
                { name: collection.name, url: `https://glorastyle.com/shop/${collection.slug}` },
            ]} />
            <CollectionJsonLd name={collection.name} slug={collection.slug} products={filteredProducts} />
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
