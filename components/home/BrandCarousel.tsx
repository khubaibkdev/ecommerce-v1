import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@/components/Carousel'
import { getInstagramImages } from '@/lib/content'

const BrandCarousel = async () => {
    const instagramImages = await getInstagramImages()

    return (
        <Carousel
            itemClassName="w-1/2 sm:w-1/3 md:w-1/6"
            gapClassName="gap-3 md:gap-4"
            showDots={false}
            autoplayMs={3000}
            ariaLabel="Instagram photos"
        >
            {instagramImages.map((image, i) => (
                <Link href="#" key={image + i} className="group relative block aspect-square overflow-hidden rounded-lg">
                    <Image
                        src={image}
                        alt={`Glora Styles Instagram photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            ))}
        </Carousel>
    )
}

export default BrandCarousel
