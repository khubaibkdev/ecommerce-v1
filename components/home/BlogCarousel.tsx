import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@/components/Carousel'
import { getBlogPosts } from '@/lib/content'

const BlogCarousel = async () => {
    const blogPosts = await getBlogPosts()

    return (
        <Carousel itemClassName="w-[85%] sm:w-1/2 lg:w-1/3" gapClassName="gap-8" ariaLabel="Blog posts">
            {blogPosts.map((post) => (
                <article className="group" key={post.handle}>
                    <Link href={`/blog/${post.handle}`} className="relative block aspect-[3/2] overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>

                    <div className="mt-4 flex items-center gap-2 text-xs opacity-60">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                    </div>

                    <Link
                        href={`/blog/${post.handle}`}
                        className="mt-2 block text-lg font-medium transition-colors line-clamp-2 hover:text-[var(--g-main-2)] md:text-xl"
                    >
                        {post.title}
                    </Link>

                    <p className="mt-2 line-clamp-2 text-sm opacity-70">{post.excerpt}</p>

                    <Link href={`/blog/${post.handle}`} className="btn-outline mt-4 inline-flex text-xs">
                        Read More
                    </Link>
                </article>
            ))}
        </Carousel>
    )
}

export default BlogCarousel
