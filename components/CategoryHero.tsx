import Image from 'next/image'
import Link from 'next/link'

interface CategoryHeroProps {
    title: string
    description: string
    image: string
}

const CategoryHero = ({ title, description, image }: CategoryHeroProps) => {
    return (
        <section className="w-full">
            {/* Breadcrumb */}
            <div className="border-b border-[var(--g-border)] py-4">
                <div className="container-x">
                    <nav className="flex items-center gap-2 text-sm text-[var(--g-color-heading)] opacity-70">
                        <Link href="/" className="hover:opacity-100 transition-opacity">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="opacity-100">{title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero banner */}
            <div className="relative w-full h-[260px] md:h-[380px] overflow-hidden">
                <Image
                    src={image}
                    alt={`${title} collection banner`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-semibold">{title}</h1>
                    <p className="text-sm md:text-base opacity-90 max-w-xl mx-auto mt-3">{description}</p>
                </div>
            </div>
        </section>
    )
}

export default CategoryHero
