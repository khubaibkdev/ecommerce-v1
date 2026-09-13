import type { Metadata } from 'next'
import Link from 'next/link'
import ProductDetails from '@/components/ProductDetails'
import { getProductByHandle, getProducts, getCollectionBySlug, formatPrice } from '@/lib/products'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductByHandle(slug)
    if (!product) return {}
    const title = `${product.title} — ${product.vendor}`
    const description = product.description || `Shop ${product.title} by ${product.vendor} at Glora Styles. ${formatPrice(product.price)} — free shipping on select orders.`
    const imgUrl = product.image.startsWith('http') ? product.image : `https://glorastyle.com${product.image}`
    return {
        title,
        description,
        alternates: { canonical: `/product/${slug}` },
        openGraph: {
            title: `${title} | Glora Styles`,
            description,
            url: `https://glorastyle.com/product/${slug}`,
            type: 'website',
            images: [{ url: imgUrl, alt: product.title }],
        },
        twitter: { card: 'summary_large_image', title, description, images: [imgUrl] },
    }
}

const ProductPage = async ({ params }: PageProps) => {
    const { slug } = await params
    const product = await getProductByHandle(slug)

    if (!product) {
        return (
            <div className="container-x py-24 text-center">
                <h1 className="text-2xl md:text-3xl font-semibold text-[var(--g-color-heading)] mb-4">
                    Product not found
                </h1>
                <p className="text-sm opacity-60 mb-8">
                    We couldn&apos;t find the product you were looking for.
                </p>
                <Link href="/" className="btn-theme">
                    Back to Home
                </Link>
            </div>
        )
    }

    const [allProducts, collection] = await Promise.all([
        getProducts(),
        getCollectionBySlug(product.category),
    ])
    const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8)
    const categoryName = collection?.name || product.category

    return (
        <>
            <BreadcrumbJsonLd items={[
                { name: 'Home', url: 'https://glorastyle.com' },
                { name: categoryName, url: `https://glorastyle.com/shop/${product.category}` },
                { name: product.title, url: `https://glorastyle.com/product/${product.handle}` },
            ]} />
            <ProductJsonLd product={product} />
            <ProductDetails product={product} relatedProducts={relatedProducts} />
        </>
    )
}

export default ProductPage
