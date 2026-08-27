'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdminSession } from '@/lib/session'

const str = (formData: FormData, key: string) => String(formData.get(key) || '').trim()

export async function updateSettings(formData: FormData) {
    await requireAdminSession()

    const data = {
        siteName: str(formData, 'siteName'),
        tagline: str(formData, 'tagline'),
        logoLight: str(formData, 'logoLight'),
        logoDark: str(formData, 'logoDark'),
        favicon: str(formData, 'favicon'),

        footerDescription: str(formData, 'footerDescription'),
        contactPhone: str(formData, 'contactPhone'),
        contactEmail: str(formData, 'contactEmail'),
        contactAddress: str(formData, 'contactAddress'),
        facebookUrl: str(formData, 'facebookUrl'),
        twitterUrl: str(formData, 'twitterUrl'),
        instagramUrl: str(formData, 'instagramUrl'),
        copyrightText: str(formData, 'copyrightText'),

        parallaxImage: str(formData, 'parallaxImage'),
        parallaxEyebrow: str(formData, 'parallaxEyebrow'),
        parallaxHeadingL1: str(formData, 'parallaxHeadingL1'),
        parallaxHeadingL2: str(formData, 'parallaxHeadingL2'),
        parallaxText: str(formData, 'parallaxText'),
        parallaxButtonHref: str(formData, 'parallaxButtonHref'),

        newsletterEnabled: formData.get('newsletterEnabled') === 'on',
        newsletterHeading: str(formData, 'newsletterHeading'),
        newsletterText: str(formData, 'newsletterText'),
        newsletterImage: str(formData, 'newsletterImage'),

        cookieBarEnabled: formData.get('cookieBarEnabled') === 'on',
        cookieBarText: str(formData, 'cookieBarText'),

        announcementEnabled: formData.get('announcementEnabled') === 'on',
        announcementText: str(formData, 'announcementText'),

        bestSellerLimit: Number(formData.get('bestSellerLimit') || 3),

        seoTitle: str(formData, 'seoTitle'),
        seoDescription: str(formData, 'seoDescription'),
        currencySymbol: str(formData, 'currencySymbol'),
    }

    await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: data,
        create: { id: 1, ...data },
    })

    revalidatePath('/', 'layout')
    revalidatePath('/admin/settings')
}
