import { prisma } from '@/lib/db'

export interface StaticPage {
    slug: string
    title: string
    intro: string
    body: { heading?: string; text: string }[]
}

export async function getStaticPage(slug: string): Promise<StaticPage | undefined> {
    const row = await prisma.page.findUnique({ where: { slug } })
    if (!row) return undefined
    return { slug: row.slug, title: row.title, intro: row.intro, body: JSON.parse(row.body || '[]') }
}

export async function getStaticPages(): Promise<StaticPage[]> {
    const rows = await prisma.page.findMany({ orderBy: { title: 'asc' } })
    return rows.map((row) => ({ slug: row.slug, title: row.title, intro: row.intro, body: JSON.parse(row.body || '[]') }))
}
