import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@/components/Carousel'
import { getSpringSlides } from '@/lib/content'
import { formatPrice, getProductByHandle } from '@/lib/products'

const SpringCollection = async () => {
    const springSlides = await getSpringSlides()
    const products = await Promise.all(springSlides.map((slide) => getProductByHandle(slide.productHandle)))

    return (
        <Carousel itemClassName="w-[78%] sm:w-1/2 lg:w-1/3" gapClassName="gap-6" ariaLabel="Spring collection">
            {springSlides.map((slide, i) => {
                const product = products[i]

                return (
                    <div key={`${slide.productHandle}-${i}`}>
                        <div className="group relative aspect-[3/4] overflow-hidden rounded-xl md:aspect-[4/5]">
                            <Image
                                src={slide.image}
                                alt={product ? product.title : 'Spring collection look'}
                                fill
                                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {product && (
                                <Link
                                    href={`/product/${product.handle}`}
                                    className="absolute z-10 hidden w-[180px] translate-y-2 items-center gap-3 rounded-lg bg-[var(--card-bg)] p-2.5 opacity-0 shadow-lg transition-all duration-300 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto md:flex"
                                    style={{ top: slide.position.top, left: slide.position.left }}
                                >
                                    <span className="relative h-[50px] w-10 shrink-0 overflow-hidden rounded">
                                        <Image src={product.image} alt="" fill sizes="40px" className="object-cover" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm font-medium" style={{ color: 'var(--g-color-heading)' }}>
                                            {product.title}
                                        </span>
                                        <span className="block text-sm font-semibold text-[var(--g-main-2)]">
                                            {formatPrice(product.price)}
                                        </span>
                                    </span>
                                </Link>
                            )}
                        </div>

                        {product && (
                            <Link href={`/product/${product.handle}`} className="mt-3 flex items-center gap-3 md:hidden">
                                <span className="relative h-[50px] w-10 shrink-0 overflow-hidden rounded">
                                    <Image src={product.image} alt="" fill sizes="40px" className="object-cover" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm font-medium" style={{ color: 'var(--g-color-heading)' }}>
                                        {product.title}
                                    </span>
                                    <span className="block text-sm font-semibold text-[var(--g-main-2)]">
                                        {formatPrice(product.price)}
                                    </span>
                                </span>
                            </Link>
                        )}
                    </div>
                )
            })}
        </Carousel>
    )
}

export default SpringCollection
