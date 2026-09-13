import type { Product } from '@/lib/products'
import type { BlogPost } from '@/lib/content'

const BASE = 'https://glorastyle.com'

interface JsonLdProps {
    data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}

export function OrganizationJsonLd() {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Glora Styles',
                url: BASE,
                logo: `${BASE}/glora-asset/logo.png`,
                description: 'Luxury women\'s fashion, lingerie, skincare & accessories. Curated elegance for the modern woman.',
                sameAs: [],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+ (08) 9055 0269',
                    contactType: 'customer service',
                    email: 'example@example.com',
                },
            }}
        />
    )
}

export function WebSiteJsonLd() {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Glora Styles',
                url: BASE,
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${BASE}/shop/women?q={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
            }}
        />
    )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items.map((item, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: item.name,
                    item: item.url,
                })),
            }}
        />
    )
}

export function ProductJsonLd({ product }: { product: Product }) {
    const data: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image.startsWith('http') ? product.image : `${BASE}${product.image}`,
        brand: { '@type': 'Brand', name: product.vendor },
        sku: product.handle,
        offers: {
            '@type': 'Offer',
            url: `${BASE}/product/${product.handle}`,
            priceCurrency: 'USD',
            price: product.price.toFixed(2),
            availability: product.soldOut
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'Glora Styles' },
        },
    }

    if (product.reviews > 0) {
        data.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toString(),
            reviewCount: product.reviews.toString(),
            bestRating: '5',
            worstRating: '1',
        }
    }

    return <JsonLd data={data} />
}

export function CollectionJsonLd({ name, slug, products }: { name: string; slug: string; products: Product[] }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: `${name} — Glora Styles`,
                url: `${BASE}/shop/${slug}`,
                description: `Shop luxury ${name.toLowerCase()} at Glora Styles. Curated pieces for every occasion.`,
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: products.length,
                    itemListElement: products.slice(0, 20).map((p, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        url: `${BASE}/product/${p.handle}`,
                        name: p.title,
                    })),
                },
            }}
        />
    )
}

export function BlogPostJsonLd({ post }: { post: BlogPost }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.title,
                image: post.image.startsWith('http') ? post.image : `${BASE}${post.image}`,
                author: { '@type': 'Person', name: post.author },
                publisher: {
                    '@type': 'Organization',
                    name: 'Glora Styles',
                    logo: { '@type': 'ImageObject', url: `${BASE}/glora-asset/logo.png` },
                },
                datePublished: post.date,
                description: post.excerpt,
                mainEntityOfPage: `${BASE}/blog/${post.handle}`,
            }}
        />
    )
}

export function BlogListJsonLd({ posts }: { posts: BlogPost[] }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'Blog',
                name: 'Glora Styles Blog',
                url: `${BASE}/blog`,
                description: 'Style guides, beauty tips & trend reports from Glora Styles.',
                blogPost: posts.map((p) => ({
                    '@type': 'BlogPosting',
                    headline: p.title,
                    url: `${BASE}/blog/${p.handle}`,
                    image: p.image.startsWith('http') ? p.image : `${BASE}${p.image}`,
                    author: { '@type': 'Person', name: p.author },
                    datePublished: p.date,
                })),
            }}
        />
    )
}
