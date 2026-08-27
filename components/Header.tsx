'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { useWishlist } from '@/components/WishlistContext'
import { useTheme } from '@/components/ThemeContext'
import { useUIState } from '@/components/UIStateContext'
import {
    SearchIcon,
    HeartIcon,
    CartIcon,
    UserIcon,
    CloseIcon,
    SunIcon,
    MoonIcon,
    HamburgerIcon,
    CaretIcon,
} from '@/components/icons'
import type { Collection } from '@/lib/products'
import type { BlogPost } from '@/lib/content'

type MobileSection = 'shop' | 'blog' | 'pages' | null

interface SimpleLink {
    label: string
    href: string
}

const pagesLinks: SimpleLink[] = [
    { label: 'About Us', href: '/pages/about-us' },
    { label: 'FAQs', href: '/pages/faqs' },
    { label: 'Lookbook', href: '/pages/lookbook' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Contact Us', href: '/pages/contact' },
]

const badgeClass =
    'rounded-full bg-[var(--g-main-2)] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white'

const navLinkClass =
    'relative text-sm font-medium transition-colors duration-300 hover:text-[var(--header-linkhover)]'

const underlineClass =
    'pointer-events-none absolute left-0 -bottom-1 h-[1.5px] w-0 bg-[var(--header-linkhover)] transition-all duration-300 group-hover:w-full'

interface HeaderProps {
    collections: Collection[]
    recentPosts: BlogPost[]
    logoSrc: string
    siteName: string
}

export default function Header({ collections, recentPosts, logoSrc, siteName }: HeaderProps) {
    const { getCartCount } = useCart()
    const { count: wishlistCount } = useWishlist()
    const { theme, toggleTheme } = useTheme()
    const { openDrawer } = useUIState()

    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileSection, setMobileSection] = useState<MobileSection>(null)

    const cartCount = getCartCount()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    const closeMobile = () => {
        setMobileOpen(false)
        setMobileSection(null)
    }

    const toggleMobileSection = (section: Exclude<MobileSection, null>) => {
        setMobileSection((prev) => (prev === section ? null : section))
    }

    return (
        <header
            className={`sticky top-0 z-50 bg-[var(--header-background)] text-[var(--header-text)] transition-shadow duration-300 ${
                scrolled ? 'shadow-[0_2px_10px_rgba(0,0,0,0.08)]' : ''
            }`}
        >
            <div className="container-x">
                {/* ---------- Desktop bar ---------- */}
                <div className="hidden h-20 items-center justify-between lg:flex">
                    <Link href="/" className="shrink-0">
                        <Image
                            src={logoSrc}
                            alt={siteName}
                            width={116}
                            height={44}
                            className="h-11 w-auto"
                            priority
                        />
                    </Link>

                    <nav className="flex flex-1 items-center justify-center gap-8 xl:gap-10">
                        {/* Home */}
                        <Link href="/" className="group relative flex items-center gap-1.5 py-2">
                            <span className={navLinkClass}>
                                Home
                                <span className={underlineClass} />
                            </span>
                            <span className={badgeClass}>New</span>
                        </Link>

                        {/* Shop */}
                        <div className="group relative py-2">
                            <Link href="/shop/men" className={navLinkClass}>
                                Shop
                                <span className={underlineClass} />
                            </Link>
                            <div className="invisible absolute left-1/2 top-full z-20 w-[420px] -translate-x-1/2 translate-y-2 rounded-lg bg-[var(--header-menudropbg)] p-5 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="grid grid-cols-3 gap-4">
                                    {collections.map((c) => (
                                        <Link
                                            key={c.slug}
                                            href={`/shop/${c.slug}`}
                                            className="group/item flex flex-col items-center gap-2 text-center"
                                        >
                                            <span className="relative block h-[72px] w-[72px] overflow-hidden rounded-lg bg-[var(--g-body-alt)]">
                                                <Image
                                                    src={c.image}
                                                    alt={c.name}
                                                    fill
                                                    sizes="72px"
                                                    className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                                                />
                                            </span>
                                            <span className="text-xs font-medium group-hover/item:text-[var(--header-linkhover)]">
                                                {c.name}
                                            </span>
                                            <span className="text-[11px]" style={{ color: 'var(--header-menudroptext)' }}>
                                                {c.count} products
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Blog */}
                        <div className="group relative py-2">
                            <Link href="/blog" className={navLinkClass}>
                                Blog
                                <span className={underlineClass} />
                            </Link>
                            <div className="invisible absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 translate-y-2 rounded-lg bg-[var(--header-menudropbg)] p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="flex flex-col gap-3">
                                    {recentPosts.map((post) => (
                                        <Link
                                            key={post.handle}
                                            href={`/blog/${post.handle}`}
                                            className="group/item flex items-center gap-3"
                                        >
                                            <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--g-body-alt)]">
                                                <Image src={post.image} alt={post.title} fill sizes="48px" className="object-cover" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate text-xs font-medium group-hover/item:text-[var(--header-linkhover)]">
                                                    {post.title}
                                                </span>
                                                <span className="block text-[11px]" style={{ color: 'var(--header-menudroptext)' }}>
                                                    {post.date}
                                                </span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pages */}
                        <div className="group relative py-2">
                            <Link href="#" className={navLinkClass}>
                                Pages
                                <span className={underlineClass} />
                            </Link>
                            <div className="invisible absolute left-1/2 top-full z-20 w-52 -translate-x-1/2 translate-y-2 rounded-lg bg-[var(--header-menudropbg)] p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="flex flex-col gap-1">
                                    {pagesLinks.map((p) => (
                                        <Link
                                            key={p.href}
                                            href={p.href}
                                            className="rounded px-2 py-2 text-xs font-medium transition-colors hover:text-[var(--header-linkhover)]"
                                        >
                                            {p.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sale */}
                        <Link href="/shop/women" className="group relative flex items-center gap-1.5 py-2">
                            <span className={navLinkClass}>
                                Sale
                                <span className={underlineClass} />
                            </span>
                            <span className={badgeClass}>Sale</span>
                        </Link>
                    </nav>

                    <div className="flex shrink-0 items-center gap-5">
                        <span className="hidden text-sm lg:inline-block">USD $</span>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            className="transition-colors hover:text-[var(--header-linkhover)]"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button
                            type="button"
                            onClick={() => openDrawer('search')}
                            aria-label="Search"
                            className="transition-colors hover:text-[var(--header-linkhover)]"
                        >
                            <SearchIcon />
                        </button>
                        <button
                            type="button"
                            onClick={() => openDrawer('login')}
                            aria-label="Account"
                            className="flex items-center gap-1.5 transition-colors hover:text-[var(--header-linkhover)]"
                        >
                            <UserIcon />
                            <span className="hidden text-sm md:inline">Login</span>
                        </button>
                        <Link
                            href="/wishlist"
                            aria-label="Wishlist"
                            className="relative flex items-center transition-colors hover:text-[var(--header-linkhover)]"
                        >
                            <HeartIcon />
                            {wishlistCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--g-main-2)] px-1 text-[10px] font-bold text-white">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <button
                            type="button"
                            onClick={() => openDrawer('cart')}
                            aria-label="Cart"
                            className="relative flex items-center transition-colors hover:text-[var(--header-linkhover)]"
                        >
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--g-main-2)] px-1 text-[10px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* ---------- Mobile bar (two rows: full-width centered logo, then hamburger/cart) ---------- */}
                <div className="lg:hidden">
                    <div className="flex justify-center pt-2.5">
                        <Link href="/">
                            <Image
                                src={logoSrc}
                                alt={siteName}
                                width={100}
                                height={38}
                                className="h-9 w-auto"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex h-14 items-center justify-between">
                        <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu" className="p-1">
                            <HamburgerIcon />
                        </button>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => openDrawer('search')}
                                aria-label="Search"
                                className="transition-colors hover:text-[var(--header-linkhover)]"
                            >
                                <SearchIcon />
                            </button>
                            <button
                                type="button"
                                onClick={() => openDrawer('cart')}
                                aria-label="Cart"
                                className="relative flex items-center transition-colors hover:text-[var(--header-linkhover)]"
                            >
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--g-main-2)] px-1 text-[9px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Mobile nav backdrop + drawer ---------- */}
            <div
                className={`fixed inset-0 z-[55] bg-[var(--overlay-bg)] transition-opacity duration-300 lg:hidden ${
                    mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                onClick={closeMobile}
                aria-hidden="true"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className={`fixed left-0 top-0 z-[56] h-full w-[85%] max-w-sm bg-[var(--header-menudropbg)] text-[var(--header-text)] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between border-b border-[var(--g-border)] px-5 py-4">
                    <span className="text-sm font-semibold uppercase tracking-wide">Menu</span>
                    <button
                        type="button"
                        onClick={closeMobile}
                        aria-label="Close menu"
                        className="p-1 transition-colors hover:text-[var(--header-linkhover)]"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex h-[calc(100%-57px)] flex-col overflow-y-auto px-5 py-4">
                    <nav className="flex flex-col">
                        <Link
                            href="/"
                            onClick={closeMobile}
                            className="flex items-center justify-between border-b border-[var(--g-border)] py-3.5 text-sm font-medium"
                        >
                            <span className="flex items-center gap-2">
                                Home
                                <span className={badgeClass}>New</span>
                            </span>
                        </Link>

                        {/* Shop accordion */}
                        <div className="border-b border-[var(--g-border)]">
                            <div className="flex items-center justify-between py-3.5">
                                <Link href="/shop/men" onClick={closeMobile} className="text-sm font-medium hover:text-[var(--header-linkhover)]">
                                    Shop
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => toggleMobileSection('shop')}
                                    aria-label="Toggle shop menu"
                                    aria-expanded={mobileSection === 'shop'}
                                    className="p-2"
                                >
                                    <CaretIcon
                                        className={`h-2 w-3 transition-transform duration-300 ${
                                            mobileSection === 'shop' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                            </div>
                            {mobileSection === 'shop' && (
                                <div className="grid grid-cols-2 gap-3 pb-4">
                                    {collections.map((c) => (
                                        <Link
                                            key={c.slug}
                                            href={`/shop/${c.slug}`}
                                            onClick={closeMobile}
                                            className="flex items-center gap-2 rounded-md p-2 text-xs hover:bg-[var(--g-body-alt)]"
                                        >
                                            <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-md bg-[var(--g-body-alt)]">
                                                <Image src={c.image} alt={c.name} fill sizes="40px" className="object-cover" />
                                            </span>
                                            <span>
                                                <span className="block font-medium">{c.name}</span>
                                                <span className="block text-[10px]" style={{ color: 'var(--header-menudroptext)' }}>
                                                    {c.count} products
                                                </span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Blog accordion */}
                        <div className="border-b border-[var(--g-border)]">
                            <div className="flex items-center justify-between py-3.5">
                                <Link href="/blog" onClick={closeMobile} className="text-sm font-medium hover:text-[var(--header-linkhover)]">
                                    Blog
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => toggleMobileSection('blog')}
                                    aria-label="Toggle blog menu"
                                    aria-expanded={mobileSection === 'blog'}
                                    className="p-2"
                                >
                                    <CaretIcon
                                        className={`h-2 w-3 transition-transform duration-300 ${
                                            mobileSection === 'blog' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                            </div>
                            {mobileSection === 'blog' && (
                                <div className="flex flex-col gap-3 pb-4">
                                    {recentPosts.map((post) => (
                                        <Link
                                            key={post.handle}
                                            href={`/blog/${post.handle}`}
                                            onClick={closeMobile}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-md bg-[var(--g-body-alt)]">
                                                <Image src={post.image} alt={post.title} fill sizes="40px" className="object-cover" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate text-xs font-medium">{post.title}</span>
                                                <span className="block text-[10px]" style={{ color: 'var(--header-menudroptext)' }}>
                                                    {post.date}
                                                </span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pages accordion */}
                        <div className="border-b border-[var(--g-border)]">
                            <button
                                type="button"
                                onClick={() => toggleMobileSection('pages')}
                                aria-expanded={mobileSection === 'pages'}
                                className="flex w-full items-center justify-between py-3.5 text-sm font-medium"
                            >
                                Pages
                                <CaretIcon
                                    className={`h-2 w-3 transition-transform duration-300 ${
                                        mobileSection === 'pages' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {mobileSection === 'pages' && (
                                <div className="flex flex-col gap-1 pb-4">
                                    {pagesLinks.map((p) => (
                                        <Link
                                            key={p.href}
                                            href={p.href}
                                            onClick={closeMobile}
                                            className="rounded-md px-2 py-2 text-xs hover:bg-[var(--g-body-alt)]"
                                        >
                                            {p.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/shop/women"
                            onClick={closeMobile}
                            className="flex items-center gap-2 border-b border-[var(--g-border)] py-3.5 text-sm font-medium"
                        >
                            Sale
                            <span className={badgeClass}>Sale</span>
                        </Link>
                    </nav>

                    <div className="mt-auto pt-5">
                        <div className="mb-4 flex items-center gap-4 border-t border-[var(--g-border)] pt-5 text-sm font-medium">
                            <button
                                type="button"
                                onClick={() => {
                                    openDrawer('login')
                                    closeMobile()
                                }}
                                className="transition-colors hover:text-[var(--header-linkhover)]"
                            >
                                Login
                            </button>
                            <span style={{ color: 'var(--g-border)' }}>/</span>
                            <button
                                type="button"
                                onClick={() => {
                                    openDrawer('login')
                                    closeMobile()
                                }}
                                className="transition-colors hover:text-[var(--header-linkhover)]"
                            >
                                Register
                            </button>
                        </div>
                        <span className="text-sm">USD $</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
