import { prisma } from '@/lib/db'
import type { Product as DbProduct, ProductSwatch as DbSwatch, Category as DbCategory } from '@prisma/client'

export interface ProductSwatch {
    name: string
    color: string
    image: string
}

export interface Product {
    id: number
    handle: string
    vendor: string
    title: string
    price: number
    compareAtPrice?: number
    image: string
    hoverImage: string
    swatches?: ProductSwatch[]
    tabs: Array<'featured' | 'new-arrival' | 'best-seller'>
    category: string
    productType: string
    sizes?: Array<'S' | 'M' | 'L'>
    soldOut?: boolean
    countdown?: boolean
    reviews: number
    rating: number
    description: string
}

export interface Collection {
    slug: string
    name: string
    image: string
    heroImage: string
    count: number
}

type ProductWithRelations = DbProduct & { swatches: DbSwatch[] }

const toProduct = (p: ProductWithRelations): Product => ({
    id: p.id,
    handle: p.handle,
    vendor: p.vendor,
    title: p.title,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? undefined,
    image: p.image,
    hoverImage: p.hoverImage,
    swatches: p.swatches.length
        ? p.swatches.sort((a, b) => a.position - b.position).map((s) => ({ name: s.name, color: s.color, image: s.image }))
        : undefined,
    tabs: JSON.parse(p.tabs || '[]'),
    category: p.categorySlug,
    productType: p.productType,
    sizes: p.sizes && p.sizes !== '[]' ? JSON.parse(p.sizes) : undefined,
    soldOut: p.soldOut || undefined,
    countdown: p.countdown || undefined,
    reviews: p.reviews,
    rating: p.rating,
    description: p.description,
})

const toCollection = (c: DbCategory & { _count: { products: number } }): Collection => ({
    slug: c.slug,
    name: c.name,
    image: c.image,
    heroImage: c.heroImage,
    count: c._count.products,
})

export async function getProducts(): Promise<Product[]> {
    const rows = await prisma.product.findMany({
        where: { status: 'published' },
        include: { swatches: true },
        orderBy: { position: 'asc' },
    })
    return rows.map(toProduct)
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
    const row = await prisma.product.findUnique({ where: { handle }, include: { swatches: true } })
    return row ? toProduct(row) : undefined
}

export async function getCollections(): Promise<Collection[]> {
    const rows = await prisma.category.findMany({
        include: { _count: { select: { products: { where: { status: 'published' } } } } },
        orderBy: { position: 'asc' },
    })
    return rows.map(toCollection)
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const row = await prisma.category.findUnique({
        where: { slug },
        include: { _count: { select: { products: { where: { status: 'published' } } } } },
    })
    return row ? toCollection(row) : undefined
}

export const formatPrice = (price: number) => `$${price.toFixed(2)}`
