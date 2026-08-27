import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import { getGridBanners } from '@/lib/content'

const GridBanner = async () => {
    const gridBanners = await getGridBanners()

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {gridBanners.map((banner) => (
                <div key={banner.image} className="group relative h-[340px] overflow-hidden rounded-2xl md:h-[440px]">
                    <Image
                        src={banner.image}
                        alt={banner.heading.join(' ')}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white md:p-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/90">{banner.eyebrow}</p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">
                            {banner.heading[0]}
                            <br />
                            {banner.heading[1]}
                        </h3>
                        <p className="mt-2 text-sm text-white/85">{banner.text}</p>
                        <Link
                            href={banner.buttonHref}
                            className="btn-underline mt-4 hover:opacity-80"
                            style={{ color: '#ffffff', borderColor: '#ffffff' }}
                        >
                            View More
                            <ArrowRightIcon />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridBanner
