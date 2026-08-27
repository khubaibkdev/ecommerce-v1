import Link from 'next/link'
import { PageHeader, Card } from '@/components/admin/ui'

const sections = [
    { href: '/admin/homepage/hero', title: 'Hero Slideshow', description: 'Full-width slides at the very top of the homepage.' },
    { href: '/admin/homepage/banners', title: 'Grid Banners', description: 'The two-up promo banners below the category carousel.' },
    { href: '/admin/homepage/spring', title: 'Spring Collection', description: 'The scrollable lookbook carousel linking to products.' },
    { href: '/admin/homepage/testimonials', title: 'Testimonials', description: 'Customer quotes in the “From The People” section.' },
    { href: '/admin/homepage/instagram', title: 'Instagram Gallery', description: 'The “Follow Us” image grid at the bottom of the page.' },
    { href: '/admin/homepage/recent-purchases', title: 'Recent Purchase Notifications', description: 'The “Someone recently bought…” popup.' },
    { href: '/admin/products?tab=best-seller', title: 'Best Sellers', description: 'Managed from Products — tag a product “Best Seller” to feature it here.' },
    { href: '/admin/settings#parallax', title: 'Parallax Banner', description: 'The full-bleed style banner between Trending Products and Best Selling.' },
    { href: '/admin/settings#newsletter', title: 'Newsletter Popup', description: 'The pop-up modal shown to first-time visitors.' },
]

const AdminHomepageHub = () => (
    <div>
        <PageHeader title="Homepage Builder" description="Manage every section of the storefront homepage." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
                <Link key={s.href} href={s.href}>
                    <Card className="h-full transition-shadow hover:shadow-md">
                        <p className="font-medium text-slate-900">{s.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{s.description}</p>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
)

export default AdminHomepageHub
