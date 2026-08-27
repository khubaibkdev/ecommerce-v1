import Link from 'next/link'
import ProductDetails from '@/components/ProductDetails'
import { getProductByHandle, getProducts } from '@/lib/products'

interface PageProps {
    params: Promise<{ slug: string }>
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

    const allProducts = await getProducts()
    const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8)

    return <ProductDetails product={product} relatedProducts={relatedProducts} />
}

export default ProductPage
