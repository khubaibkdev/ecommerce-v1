import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { ArrowRightIcon } from '@/components/icons'
import { getProducts } from '@/lib/products'
import { getSiteSettings } from '@/lib/settings'

const BestSellers = async () => {
    const [allProducts, settings] = await Promise.all([getProducts(), getSiteSettings()])
    const products = allProducts.filter((p) => p.tabs.includes('best-seller')).slice(0, settings.bestSellerLimit)

    return (
        <div>
            <div className="grid grid-cols-2 gap-6 md:gap-10 lg:grid-cols-3">
                {products.map((p) => (
                    <ProductCard product={p} key={p.id} />
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Link href="/shop/men" className="btn-underline">
                    Show All
                    <ArrowRightIcon />
                </Link>
            </div>
        </div>
    )
}

export default BestSellers
