import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/content'
import { BlogListJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Fashion & Beauty Blog',
    description: 'Style guides, beauty tips, trend reports & fashion inspiration from Glora Styles. Stay ahead of the curve with expert insights.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Fashion & Beauty Blog | Glora Styles',
        description: 'Style guides, beauty tips, trend reports & fashion inspiration from Glora Styles.',
        url: 'https://glorastyle.com/blog',
    },
}

const BlogIndexPage = async () => {
    const blogPosts = await getBlogPosts()

    return (
        <div className="container-x py-14 md:py-20">
            <BreadcrumbJsonLd items={[
                { name: 'Home', url: 'https://glorastyle.com' },
                { name: 'Blog', url: 'https://glorastyle.com/blog' },
            ]} />
            <BlogListJsonLd posts={blogPosts} />
            <div className="mb-12 text-center md:mb-16">
                <p className="subtop mb-3">Explore Our Latest Fashion Insights</p>
                <h1 className="section-title">The Journal</h1>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {blogPosts.map((post) => (
                    <article key={post.handle} className="group flex flex-col">
                        <Link href={`/blog/${post.handle}`} className="relative block aspect-[3/2] overflow-hidden rounded-lg">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </Link>
                        <div className="mt-4 flex items-center gap-2 text-xs opacity-60">
                            <span>By {post.author}</span>
                            <span>&bull;</span>
                            <span>{post.date}</span>
                        </div>
                        <Link
                            href={`/blog/${post.handle}`}
                            className="mt-2 text-lg font-medium leading-snug transition-colors hover:text-[var(--g-main-2)] md:text-xl"
                        >
                            {post.title}
                        </Link>
                        <p className="mt-2 text-sm opacity-70">{post.excerpt}</p>
                        <Link href={`/blog/${post.handle}`} className="btn-outline mt-4 inline-flex w-fit text-xs">
                            Read More
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default BlogIndexPage
