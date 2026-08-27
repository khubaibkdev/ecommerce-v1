import WishlistPageClient from '@/components/WishlistPageClient'
import { getProducts } from '@/lib/products'

const WishlistPage = async () => {
    const products = await getProducts()
    return <WishlistPageClient products={products} />
}

export default WishlistPage
