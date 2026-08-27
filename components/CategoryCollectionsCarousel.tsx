import Image from 'next/image'
import Link from 'next/link'
import { getCollections } from '@/lib/products'

/**
 * Matches the reference theme's "featured-collections-3" block that sits under
 * the category tabs on every collection page: equal-width cards stretched to
 * fill the full row edge-to-edge, with a name + product count over a lightly
 * tinted square image that brightens slightly on hover as it scales.
 */
const CategoryCollectionsCarousel = async () => {
    const collections = await getCollections()

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-5" aria-label="Shop by category">
            {collections.map((collection) => (
                <Link key={collection.slug} href={`/shop/${collection.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded">
                        <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[rgb(34,34,34)]/20 transition-opacity duration-300 group-hover:opacity-70" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                            <h4 className="text-base font-semibold text-white md:text-lg">{collection.name}</h4>
                            <p className="mt-1 text-xs text-white/80 md:text-sm">{collection.count} products</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CategoryCollectionsCarousel
