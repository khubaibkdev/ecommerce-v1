import React from 'react'
import ProductDetails from '@/components/ProductDetails'

interface PageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ img?: string }>
}

const ProductPage = async ({ params, searchParams }: PageProps) => {
    const { slug } = await params
    const { img } = await searchParams

    const productName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="bg-white min-h-screen">
            <ProductDetails
                name={productName}
                price={29.99}
                availability={5}
                image={img || '/images/puffer-jacket.png'}
            />
        </div>
    )
}

export default ProductPage