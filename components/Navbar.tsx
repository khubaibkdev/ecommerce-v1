'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { useCart } from '@/components/CartContext'

const Navbar = () => {
    const { getCartCount } = useCart()
    const itemCount = getCartCount()

    // 1. Add state for the hamburger menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="container mx-auto px-4 py-4 relative">
            <nav className="flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="logo text-2xl font-bold z-20">
                    <p>Rosyz.</p>
                </Link>

                {/* Desktop Navigation Links (Hidden on mobile) */}
                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <Link href="/" className="hover:text-red-500 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors">
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors">
                            Pages
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors">
                            Buy Now
                        </Link>
                    </li>
                </ul>

                {/* Right Side Icons */}
                <div className="flex items-center gap-4 z-20">

                    <Link href="/currency" className="text-sm font-medium hover:text-red-500 transition-colors hidden lg:block">
                        USD$
                    </Link>

                    {/* Hide Search/User on mobile */}
                    <button className="hover:text-red-500 transition-colors hidden md:block">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    <button className="hover:text-red-500 transition-colors hidden md:block">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </button>

                    {/* Cart Link */}
                    <Link href="/cart" className="relative flex items-center hover:text-red-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                        {itemCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* 2. Hamburger Menu Button (Only shows on mobile) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-1 ml-2"
                    >
                        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* 3. Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4 md:hidden z-10">
                        <Link href="/" className="hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Product</Link>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Pages</Link>
                        <Link href="/shop/men" className="hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Buy Now</Link>
                    </div>
                )}

            </nav>
        </header>
    )
}

export default Navbar

// 'use client'
//
// import React from 'react'
// import Link from "next/link"
// import { useCart } from '@/components/CartContext'
//
// const Navbar = () => {
//     const { getCartCount } = useCart()
//     const itemCount = getCartCount()
//
//     return (
//         <header className="container mx-auto px-4 py-4">
//             <nav className="flex items-center justify-between">
//
//
//                 <Link href="/" className="logo text-2xl font-bold">
//                     <p>Rosyz.</p>
//                 </Link>
//
//
//                 <ul className="hidden md:flex items-center gap-6">
//                     <li>
//                         <Link href="/" className="hover:text-red-500 transition-colors">
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         {/* 👇 UPDATED SHOP LINK TO POINT TO THE MEN'S CATEGORY PAGE 👇 */}
//                         <Link href="/shop/men" className="hover:text-red-500 transition-colors">
//                             Shop
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/shop/men" className="hover:text-red-500 transition-colors">
//                             Product
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/shop/men" className="hover:text-red-500 transition-colors">
//                             Blog
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/shop/men" className="hover:text-red-500 transition-colors">
//                             Pages
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/shop/men" className="hover:text-red-500 transition-colors">
//                             Buy Now
//                         </Link>
//                     </li>
//                 </ul>
//
//
//                 <div className="flex items-center gap-5">
//
//                     <Link href="/currency" className="text-sm font-medium hover:text-red-500 transition-colors hidden lg:block">
//                         USD$
//                     </Link>
//
//                     <button className="hover:text-red-500 transition-colors">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                     </button>
//
//                     <button className="hover:text-red-500 transition-colors">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                     </button>
//
//                     <Link href="/cart" className="relative flex items-center hover:text-red-500 transition-colors">
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
//
//                         {itemCount > 0 && (
//                             <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
//                                 {itemCount}
//                             </span>
//                         )
//                         }
//                     </Link>
//                 </div>
//             </nav>
//         </header>
//     )
// }
//
// export default Navbar

