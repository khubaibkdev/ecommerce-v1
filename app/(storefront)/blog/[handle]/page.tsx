import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts, getPostByHandle } from '@/lib/content'
import { BlogPostJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

interface PageProps {
    params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { handle } = await params
    const post = await getPostByHandle(handle)
    if (!post) return {}
    const imgUrl = post.image.startsWith('http') ? post.image : `https://glorastyle.com${post.image}`
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${handle}` },
        openGraph: {
            title: `${post.title} | Glora Styles Blog`,
            description: post.excerpt,
            url: `https://glorastyle.com/blog/${handle}`,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: imgUrl, alt: post.title }],
        },
        twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [imgUrl] },
    }
}

const BlogPostPage = async ({ params }: PageProps) => {
    const { handle } = await params
    const post = await getPostByHandle(handle)

    if (!post) {
        return (
            <div className="container-x flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
                <h1 className="section-title">Post not found</h1>
                <Link href="/blog" className="btn-theme">
                    Back to Blog
                </Link>
            </div>
        )
    }

    const allPosts = await getBlogPosts()
    const related = allPosts.filter((p) => p.handle !== post.handle).slice(0, 3)
    const paragraphs = post.content.split('\n\n').filter(Boolean)

    return (
        <article className="container-x py-14 md:py-20">
            <BreadcrumbJsonLd items={[
                { name: 'Home', url: 'https://glorastyle.com' },
                { name: 'Blog', url: 'https://glorastyle.com/blog' },
                { name: post.title, url: `https://glorastyle.com/blog/${post.handle}` },
            ]} />
            <BlogPostJsonLd post={post} />
            <nav className="mb-6 text-sm opacity-60">
                <Link href="/" className="hover:text-[var(--g-main-2)]">
                    Home
                </Link>{' '}
                /{' '}
                <Link href="/blog" className="hover:text-[var(--g-main-2)]">
                    Blog
                </Link>{' '}
                / <span>{post.title}</span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
                <div className="mb-4 flex items-center justify-center gap-2 text-xs uppercase tracking-wide opacity-60">
                    <span>By {post.author}</span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                </div>
                <h1 className="section-title">{post.title}</h1>
            </div>

            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
            </div>

            <div className="mx-auto mt-10 max-w-2xl space-y-5 leading-relaxed opacity-80">
                {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>

            {related.length > 0 && (
                <div className="mx-auto mt-20 max-w-5xl">
                    <p className="subtop mb-3 text-center">Keep Reading</p>
                    <h2 className="section-title mb-10 text-center">More From The Journal</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {related.map((p) => (
                            <Link key={p.handle} href={`/blog/${p.handle}`} className="group block">
                                <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        sizes="33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <p className="mt-3 font-medium leading-snug group-hover:text-[var(--g-main-2)]">{p.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    )
}

export default BlogPostPage
