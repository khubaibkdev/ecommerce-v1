import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getStaticPage } from '@/lib/pages'
import { getProducts } from '@/lib/products'
import ContactForm from '@/components/ContactForm'

interface PageProps {
    params: Promise<{ slug: string }>
}

const StaticContentPage = async ({ params }: PageProps) => {
    const { slug } = await params
    const page = await getStaticPage(slug)

    if (!page) {
        return (
            <div className="container-x flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
                <h1 className="section-title">Page not found</h1>
                <Link href="/" className="btn-theme">
                    Back to Home
                </Link>
            </div>
        )
    }

    const lookbookProducts = page.slug === 'lookbook' ? (await getProducts()).slice(0, 9) : []

    return (
        <div className="container-x py-14 md:py-20">
            <nav className="mb-8 text-sm opacity-60">
                <Link href="/" className="hover:text-[var(--g-main-2)]">
                    Home
                </Link>{' '}
                / <span>{page.title}</span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
                <h1 className="section-title">{page.title}</h1>
                <p className="mt-4 opacity-75">{page.intro}</p>
            </div>

            {page.slug === 'lookbook' ? (
                <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                    {lookbookProducts.map((p) => (
                        <Link
                            key={p.id}
                            href={`/product/${p.handle}`}
                            className="group relative block aspect-[3/4] overflow-hidden rounded-lg"
                        >
                            <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span className="text-sm font-medium text-white">{p.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : page.slug === 'contact' ? (
                <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="space-y-6">
                        {page.body.map((block) => (
                            <div key={block.heading}>
                                <h2 className="font-semibold" style={{ color: 'var(--g-color-heading)' }}>
                                    {block.heading}
                                </h2>
                                <p className="mt-1 opacity-75">{block.text}</p>
                            </div>
                        ))}
                    </div>
                    <ContactForm />
                </div>
            ) : (
                <div className="mx-auto mt-14 max-w-3xl space-y-8">
                    {page.body.map((block) => (
                        <div key={block.heading} className="border-b pb-8 last:border-b-0" style={{ borderColor: 'var(--g-border)' }}>
                            {block.heading && (
                                <h2 className="mb-2 text-lg font-semibold" style={{ color: 'var(--g-color-heading)' }}>
                                    {block.heading}
                                </h2>
                            )}
                            <p className="opacity-75">{block.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default StaticContentPage
