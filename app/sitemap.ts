import type { MetadataRoute } from 'next'
import { getProducts, getCollections } from '@/lib/products'
import { getBlogPosts } from '@/lib/content'

const BASE = 'https://glorastyle.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [products, collections, blogPosts] = await Promise.all([
        getProducts(),
        getCollections(),
        getBlogPosts(),
    ])

    const staticPages = [
        { url: BASE, changeFrequency: 'daily' as const, priority: 1.0 },
        { url: `${BASE}/blog`, changeFrequency: 'weekly' as const, priority: 0.8 },
        { url: `${BASE}/pages/about-us`, changeFrequency: 'monthly' as const, priority: 0.6 },
        { url: `${BASE}/pages/contact`, changeFrequency: 'monthly' as const, priority: 0.6 },
        { url: `${BASE}/pages/faqs`, changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${BASE}/pages/privacy-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
        { url: `${BASE}/pages/returns-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
        { url: `${BASE}/pages/shipping-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
        { url: `${BASE}/pages/terms-conditions`, changeFrequency: 'yearly' as const, priority: 0.3 },
        { url: `${BASE}/pages/size-guide`, changeFrequency: 'monthly' as const, priority: 0.4 },
        { url: `${BASE}/pages/lookbook`, changeFrequency: 'monthly' as const, priority: 0.5 },
    ]

    const categoryPages = collections.map((c) => ({
        url: `${BASE}/shop/${c.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const productPages = products.map((p) => ({
        url: `${BASE}/product/${p.handle}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const blogPages = blogPosts.map((p) => ({
        url: `${BASE}/blog/${p.handle}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...categoryPages, ...productPages, ...blogPages]
}
