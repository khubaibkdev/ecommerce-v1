import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@/components/Carousel'
import { getCollections } from '@/lib/products'

const CollectionsCarousel = async () => {
    const collections = await getCollections()

    return (
        <Carousel
            itemClassName="w-[78%] sm:w-1/3 md:w-1/4 lg:w-1/6"
            gapClassName="gap-4 md:gap-8"
            showArrows
            showDots
            ariaLabel="Shop by category"
        >
            {collections.map((collection) => (
                <Link key={collection.slug} href={`/shop/${collection.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-full">
                        <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            sizes="(max-width: 768px) 42vw, 16vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="font-medium text-[var(--g-color-heading)]">{collection.name}</p>
                        <p className="text-sm opacity-60">{collection.count} products</p>
                    </div>
                </Link>
            ))}
        </Carousel>
    )
}

export default CollectionsCarousel
