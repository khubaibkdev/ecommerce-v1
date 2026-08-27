import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Card, PageHeader } from '@/components/admin/ui'

const AdminDashboard = async () => {
    const [productCount, soldOutCount, draftCount, categoryCount, blogCount, pageCount, mediaCount] = await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { soldOut: true } }),
        prisma.product.count({ where: { status: 'draft' } }),
        prisma.category.count(),
        prisma.blogPost.count(),
        prisma.page.count(),
        prisma.media.count(),
    ])

    const stats = [
        { label: 'Products', value: productCount, href: '/admin/products' },
        { label: 'Sold Out', value: soldOutCount, href: '/admin/products' },
        { label: 'Draft Products', value: draftCount, href: '/admin/products' },
        { label: 'Categories', value: categoryCount, href: '/admin/categories' },
        { label: 'Blog Posts', value: blogCount, href: '/admin/blog' },
        { label: 'Pages', value: pageCount, href: '/admin/pages' },
        { label: 'Media Files', value: mediaCount, href: '/admin/media' },
    ]

    const quickLinks = [
        { label: 'Add a Product', href: '/admin/products/new' },
        { label: 'Edit Hero Slides', href: '/admin/homepage/hero' },
        { label: 'Edit Site Settings', href: '/admin/settings' },
        { label: 'Write a Blog Post', href: '/admin/blog/new' },
    ]

    return (
        <div>
            <PageHeader title="Dashboard" description="An overview of your store." />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href}>
                        <Card className="transition-shadow hover:shadow-md">
                            <p className="text-sm text-slate-500">{stat.label}</p>
                            <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
