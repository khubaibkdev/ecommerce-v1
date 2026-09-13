import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/settings'

const ParallaxBanner = async () => {
    const settings = await getSiteSettings()

    return (
        <section className="relative flex min-h-[480px] w-full items-center md:min-h-[620px]">
            <Image
                src={settings.parallaxImage}
                alt="Glora Styles outfit and accessories styled against a sunlit backdrop"
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="container-x relative">
                <div className="max-w-lg rounded-2xl bg-[var(--g-body)]/75 p-8 backdrop-blur-sm md:p-12">
                    <p className="subtop">{settings.parallaxEyebrow}</p>
                    <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--g-color-heading)] md:text-5xl">
                        {settings.parallaxHeadingL1}
                        <br />
                        {settings.parallaxHeadingL2}
                    </h2>
                    <p className="mt-4 text-[var(--g-color-heading)] opacity-80">{settings.parallaxText}</p>
                    <Link href={settings.parallaxButtonHref} className="btn-theme mt-8">
                        Discover Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ParallaxBanner
