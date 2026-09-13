import React from 'react'
import type { Metadata } from 'next'
import HeroSlideshow from '@/components/home/HeroSlideshow'
import CollectionsCarousel from '@/components/home/CollectionsCarousel'
import GridBanner from '@/components/home/GridBanner'
import ProductTabs from '@/components/home/ProductTabs'
import ParallaxBanner from '@/components/home/ParallaxBanner'
import BestSellers from '@/components/home/BestSellers'
import SpringCollection from '@/components/home/SpringCollection'
import BlogCarousel from '@/components/home/BlogCarousel'
import QuotesCarousel from '@/components/home/QuotesCarousel'
import BrandCarousel from '@/components/home/BrandCarousel'
import { getHeroSlides } from '@/lib/content'
import { getProducts } from '@/lib/products'

export const metadata: Metadata = {
    title: 'Glora Styles — Luxury Women\'s Fashion, Lingerie & Beauty',
    description: 'Shop luxury women\'s fashion, lingerie, skincare, swimwear & accessories at Glora Styles. Curated elegance with worldwide shipping. Discover your signature style.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Glora Styles — Luxury Women\'s Fashion, Lingerie & Beauty',
        description: 'Shop luxury women\'s fashion, lingerie, skincare, swimwear & accessories at Glora Styles. Curated elegance with worldwide shipping.',
        url: 'https://glorastyle.com',
    },
}

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
    <div className="mb-10 text-center md:mb-14">
        <p className="subtop mb-3">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
    </div>
)

const Page = async () => {
    const [heroSlides, products] = await Promise.all([getHeroSlides(), getProducts()])

    return (
        <>
            <h1 className="sr-only">Glora Styles — Luxury Women&apos;s Fashion &amp; Beauty Store</h1>
            <HeroSlideshow slides={heroSlides} />

            <section className="container-x py-16 md:py-24">
                <SectionHeading eyebrow="Our Exclusive Collections" title="Shop By Categories" />
                <CollectionsCarousel />
            </section>

            <section className="container-x pb-16 md:pb-24">
                <GridBanner />
            </section>

            <section className="container-x py-16 md:py-24">
                <SectionHeading eyebrow="Stay Ahead of the Fashion Curve" title="Trending Products" />
                <ProductTabs products={products} />
            </section>

            <ParallaxBanner />

            <section className="container-x py-16 md:py-24">
                <SectionHeading eyebrow="Top Picks for Fashion-Forward Shoppers" title="Best Selling" />
                <BestSellers />
            </section>

            <section className="container-x py-16 md:py-24">
                <SectionHeading eyebrow="Blossom into Style: Our Spring Fashion Picks" title="The Spring Collection" />
                <SpringCollection />
            </section>

            <section className="container-x py-16 md:py-24">
                <SectionHeading eyebrow="Explore Our Latest Fashion Insights" title="Blog Posts" />
                <BlogCarousel />
            </section>

            <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--g-body-alt)' }}>
                <div className="container-x">
                    <SectionHeading eyebrow="Sub Title Top" title="From The People" />
                    <QuotesCarousel />
                </div>
            </section>

            <section className="container-x py-16 md:py-24">
                <SectionHeading eyebrow="Follow Us" title="@Glora_Styles" />
                <BrandCarousel />
            </section>
        </>
    )
}

export default Page
