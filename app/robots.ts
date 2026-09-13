import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/cart', '/checkout', '/order-confirmation', '/account'],
            },
        ],
        sitemap: 'https://glorastyle.com/sitemap.xml',
    }
}
