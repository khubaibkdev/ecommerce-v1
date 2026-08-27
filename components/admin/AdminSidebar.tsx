'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/categories', label: 'Categories' },
    { href: '/admin/homepage', label: 'Homepage Builder' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/pages', label: 'Pages' },
    { href: '/admin/media', label: 'Media Library' },
    { href: '/admin/settings', label: 'Site Settings' },
    { href: '/admin/users', label: 'Admin Users' },
]

const AdminSidebar = () => {
    const pathname = usePathname()

    return (
        <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                    >
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )
}

export default AdminSidebar
