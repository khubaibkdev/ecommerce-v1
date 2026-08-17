'use client'

import React from 'react'
import Link from "next/link"
import { useCart } from '@/components/CartContext'

const Navbar = () => {
    const { getCartCount } = useCart()
    const itemCount = getCartCount()

    return (
        <header className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">


                <Link href="/" className="logo text-2xl font-bold">
                    <p>Rosyz.</p>
                </Link>


                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <Link href="/" className="hover:text-red-500 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        {/* 👇 UPDATED SHOP LINK TO POINT TO THE MEN'S CATEGORY PAGE 👇 */}
                        <Link href="/shop" className="hover:text-red-500 transition-colors">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link href="/product" className="hover:text-red-500 transition-colors">
                            Product
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:text-red-500 transition-colors">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/pages" className="hover:text-red-500 transition-colors">
                            Pages
                        </Link>
                    </li>
                    <li>
                        <Link href="/buy-now" className="hover:text-red-500 transition-colors">
                            Buy Now
                        </Link>
                    </li>
                </ul>


                <div className="flex items-center gap-5">

                    <Link href="/currency" className="text-sm font-medium hover:text-red-500 transition-colors hidden lg:block">
                        USD$
                    </Link>

                    <button className="hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    <button className="hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </button>

                    <Link href="/cart" className="relative flex items-center hover:text-red-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                        {itemCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                {itemCount}
                            </span>
                        )
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar


// import React from 'react'
// import Link from "next/link"
//
// const Navbar = () => {
//     return (
//         <header className="container mx-auto px-4 py-4">
//             <nav className="flex items-center justify-between">
//                 <Link href="/" className="logo text-2xl font-bold">
//                     <p>Rosyz.</p>
//                 </Link>
//
//                 <ul className="flex items-center gap-6">
//                     <li>
//                         <Link href="/" className="hover:text-red-500 transition-colors">
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/shop" className="hover:text-red-500 transition-colors">
//                             Shop
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/product" className="hover:text-red-500 transition-colors">
//                             Product
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/blog" className="hover:text-red-500 transition-colors">
//                             Blog
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/pages" className="hover:text-red-500 transition-colors">
//                             Pages
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/buy-now" className="hover:text-red-500 transition-colors">
//                             Buy Now
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/currency" className="hover:text-red-500 transition-colors">
//                             USD$
//                         </Link>
//                     </li>
//                     {/*<li>*/}
//             {/*<span className="bg-red-500 text-white px-3 py-1 text-xs rounded-full font-bold">*/}
//             {/*  Sale*/}
//             {/*</span>*/}
//             {/*        </li>*/}
//                 </ul>
//             </nav>
//         </header>
//     )
// }
//
// export default Navbar
//
//
//
//
//
// // import React from 'react'
// // import Link from "next/link";
// //
// // const Navbar = () => {
// //     return (
// //         <header>
// //             <nav>
// //                 <Link href= "/" className= "logo">
// //                     <p>Rosyz.</p>
// //                 </Link>
// //
// //                 <ul className="hidden md:flex items-center gap-8">
// //                     <Link href= "/">Home</Link>
// //                     <Link href= "/">Shop</Link>
// //                     <Link href= "/">Product</Link>
// //                     <Link href="/">Blog</Link>
// //                     <Link href="/">Pages</Link>
// //                     <Link href="/">Buy Now</Link>
// //                     <Link href="/">USD</Link>
// //                     <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">Sale</span>
// //                 </ul>
// //
// //             </nav>
// //         </header>
// //     )
// // }
// // export default Navbar