import React from 'react'
import Link from 'next/link'


const FacebookIcon = () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)
const TwitterIcon = () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
)
const InstagramIcon = () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.315 1.347 20.646.935 19.856.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
)

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">

                {/*NEWSLETTER SECTION*/}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-white/10">
                    <h2 className="text-2xl md:text-3xl font-medium leading-tight max-w-md">
                        Fashion Forward: Stay In The Know With Our Newsletter
                    </h2>
                    <div className="w-full md:w-auto flex-1 max-w-lg bg-white rounded-full p-1.5 flex flex-col md:flex-row items-center gap-2 md:gap-0">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 bg-transparent text-gray-800 px-6 py-2 outline-none text-sm w-full"
                        />
                        <button className="w-full md:w-auto bg-black text-white hover:bg-gray-800 transition-colors px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 md:ml-2">
                            Subscribe
                            <span>→</span>
                        </button>
                    </div>
                    {/*<div className="w-full md:w-auto flex-1 max-w-lg bg-white rounded-full p-1.5 flex items-center">*/}
                    {/*    <input*/}
                    {/*        type="email"*/}
                    {/*        placeholder="Your email"*/}
                    {/*        className="flex-1 bg-transparent text-gray-800 px-6 py-2 outline-none text-sm"*/}
                    {/*    />*/}
                    {/*    <button className="bg-black text-white hover:bg-gray-800 transition-colors px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2">*/}
                    {/*        Subscribe*/}
                    {/*        <span>→</span>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>

                {/* ===== LINKS & INFO SECTION ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 py-12">

                    {/* Col 1: Get In Touch */}
                    <div className="space-y-4">
                        <h3 className="text-red-500 font-bold uppercase text-sm tracking-wide">Get In Touch</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <p>T: + (08) 9055 0269</p>
                            <p>E: example@example.com</p>
                            <p className="leading-relaxed">
                                50 Porana Place, West Casuarinas,<br />
                                Western Australia, Australia.
                            </p>
                        </div>
                    </div>

                    {/* Col 2: Categories */}
                    <div className="space-y-4">
                        <h3 className="text-red-500 font-bold uppercase text-sm tracking-wide">Categories</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Accessories</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Bags</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Glasses</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Men</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Outerwear</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Information */}
                    <div className="space-y-4">
                        <h3 className="text-red-500 font-bold uppercase text-sm tracking-wide">Information</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Returns Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-red-500 font-bold uppercase text-sm tracking-wide">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">My Account</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">My Cart</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Size Chart</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Wishlist</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Gift Card</Link></li>
                        </ul>
                    </div>

                    {/* Col 5: Brand & Bio */}
                    <div className="space-y-6 md:col-span-1">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Rosyz.</h2>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Rosyz Shopify is a dynamic and innovative online retail platform that offers a wide range of products to customers worldwide.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <Link href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <FacebookIcon />
                            </Link>
                            <Link href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <TwitterIcon />
                            </Link>
                            <Link href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <InstagramIcon />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer