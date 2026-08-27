import { prisma } from '@/lib/db'
import type { SiteSettings } from '@prisma/client'

export async function getSiteSettings(): Promise<SiteSettings> {
    const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } })
    if (existing) return existing
    return prisma.siteSettings.create({ data: { id: 1 } })
}
