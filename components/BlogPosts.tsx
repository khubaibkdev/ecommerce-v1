import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
    {
        id: 1,
        image: "/images/bp1.png", // Replace with your PNG or JPG
        author: "Qodex Web",
        date: "November 06 2023",
        title: "Chic and Unique Creating Your Signature Style",
        excerpt: "ANY, MEANING – IT DOESN'T MATTER WHAT COLOR OR PRINT IT IS. IT'LL WORK. Augue...",
        link: "/blog/chic-and-unique"
    },
    {
        id: 2,
        image: "/images/bp2.png",
        author: "Qodex Web",
        date: "November 06 2023",
        title: "Behind the Seams The Making of Fashion's ",
        excerpt: "ANY, MEANING – IT DOESN'T MATTER WHAT COLOR OR PRINT IT IS. IT'LL WORK. Augue...",
        link: "/blog/behind-the-seams"
    },
    {
        id: 3,
        image: "/images/bp3.png",
        author: "Qodex Web",
        date: "November 06 2023",
        title: "Fashion Forward Exploring Future Trends",
        excerpt: "ANY, MEANING – IT DOESN'T MATTER WHAT COLOR OR PRINT IT IS. IT'LL WORK. Augue...",
        link: "/blog/fashion-forward"
    }
];

const BlogSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <article
                        key={post.id}
                        className="flex flex-col h-full group"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden mb-6">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                        {/* Meta Data (Author & Date) */}
                        <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 mb-3">
                            <span>By {post.author}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{post.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-medium leading-tight text-gray-900 mb-4 group-hover:text-red-500 transition-colors">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Read More Button */}
                        <Link
                            href={post.link}
                            className="mt-auto w-fit px-8 py-2.5 border-2 border-black rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Read More
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default BlogSection