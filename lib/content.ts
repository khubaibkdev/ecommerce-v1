import { prisma } from '@/lib/db'

export interface HeroSlide {
    image: string
    eyebrow: string
    heading: [string, string]
    subheading: string
    align: 'center' | 'right'
    buttonHref: string
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
    const rows = await prisma.heroSlide.findMany({ where: { active: true }, orderBy: { position: 'asc' } })
    return rows.map((s) => ({
        image: s.image,
        eyebrow: s.eyebrow,
        heading: [s.headingL1, s.headingL2],
        subheading: s.subheading,
        align: s.align === 'right' ? 'right' : 'center',
        buttonHref: s.buttonHref,
    }))
}

export interface GridBannerItem {
    image: string
    eyebrow: string
    heading: [string, string]
    text: string
    buttonHref: string
}

export async function getGridBanners(): Promise<GridBannerItem[]> {
    const rows = await prisma.gridBanner.findMany({ where: { active: true }, orderBy: { position: 'asc' } })
    return rows.map((b) => ({
        image: b.image,
        eyebrow: b.eyebrow,
        heading: [b.headingL1, b.headingL2],
        text: b.text,
        buttonHref: b.buttonHref,
    }))
}

export interface SpringSlide {
    image: string
    productHandle: string
    position: { top: string; left: string }
}

export async function getSpringSlides(): Promise<SpringSlide[]> {
    const rows = await prisma.springSlide.findMany({ where: { active: true }, orderBy: { position: 'asc' } })
    return rows.map((s) => ({ image: s.image, productHandle: s.productHandle, position: { top: s.topPos, left: s.leftPos } }))
}

export interface Testimonial {
    name: string
    role: string
    image: string
    quote: string
    subText: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const rows = await prisma.testimonial.findMany({ where: { active: true }, orderBy: { position: 'asc' } })
    return rows.map((t) => ({ name: t.name, role: t.role, image: t.image, quote: t.quote, subText: t.subText }))
}

export async function getInstagramImages(): Promise<string[]> {
    const rows = await prisma.instagramImage.findMany({ where: { active: true }, orderBy: { position: 'asc' } })
    return rows.map((r) => r.image)
}

export interface RecentPurchase {
    title: string
    image: string
    handle: string
    location: string
    time: string
}

export async function getRecentPurchases(): Promise<RecentPurchase[]> {
    const rows = await prisma.recentPurchase.findMany({ where: { active: true }, orderBy: { position: 'asc' } })
    return rows.map((r) => ({ title: r.title, image: r.image, handle: r.handle, location: r.location, time: r.timeLabel }))
}

export interface BlogPost {
    handle: string
    title: string
    image: string
    author: string
    date: string
    excerpt: string
    content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const rows = await prisma.blogPost.findMany({ where: { status: 'published' }, orderBy: { position: 'asc' } })
    return rows
}

export async function getPostByHandle(handle: string): Promise<BlogPost | undefined> {
    const row = await prisma.blogPost.findUnique({ where: { handle } })
    return row ?? undefined
}
