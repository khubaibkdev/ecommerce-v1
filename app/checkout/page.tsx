'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { useRouter } from 'next/navigation'

const CheckoutPage = () => {
    const { cartItems, getCartTotal, clearCart } = useCart()

    const total = getCartTotal()
    const router = useRouter()

    const [email, setEmail] = useState('')

    const handlePayNow = () => {
        const order = {
            orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
            items: cartItems,
            total: total,
            email: email,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        }

        localStorage.setItem('lastOrder', JSON.stringify(order))
        clearCart()
        router.push('/order-confirmation')
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header with Logo */}
                <div className="mb-8 pb-4 border-b border-gray-100">
                    <Link href="/" className="text-2xl font-bold text-black">
                        Rosyz.
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* ===== LEFT COLUMN: FORMS ===== */}
                    <div className="flex-1 lg:max-w-[600px]">

                        {/* --- CONTACT SECTION --- */}
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-xl font-medium">Contact</h2>
                                <Link href="#" className="text-sm text-blue-600 hover:underline">Sign in</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Email or mobile phone number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors pr-10"
                                />
                                {/* Info Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className="mt-3 flex items-center gap-2">
                                <input type="checkbox" id="news" name="news" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                                <label htmlFor="news" className="text-sm text-gray-700">Email me with news and offers</label>
                            </div>
                        </div>

                        {/* --- DELIVERY SECTION --- */}
                        <div className="mb-8">
                            <h2 className="text-xl font-medium mb-4">Delivery</h2>

                            {/* Country */}
                            <div className="mb-4 relative">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country"
                                    className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors appearance-none bg-white"
                                >
                                    <option>Singapore</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                                <label htmlFor="country" className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Country/Region</label>
                            </div>

                            {/* Name Row */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        autoComplete="given-name"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors"
                                    />
                                    <label htmlFor="firstName" className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">First name (optional)</label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        autoComplete="family-name"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors"
                                    />
                                    <label htmlFor="lastName" className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Last name</label>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    autoComplete="address-line1"
                                    className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors pr-10"
                                />
                                <label htmlFor="address" className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Address</label>
                                {/* Search Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>

                            {/* Apartment */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    id="apartment"
                                    name="apartment"
                                    autoComplete="address-line2"
                                    className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors"
                                />
                                <label htmlFor="apartment" className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Apartment, suite, etc. (optional)</label>
                            </div>

                            {/* Postal Code */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    autoComplete="postal-code"
                                    className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors"
                                />
                                <label htmlFor="postalCode" className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Postal code</label>
                            </div>

                            {/* Save Info Checkbox */}
                            <div className="flex items-center gap-2 mb-8">
                                <input type="checkbox" id="saveInfo" name="saveInfo" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                                <label htmlFor="saveInfo" className="text-sm text-gray-700">Save this information for next time</label>
                            </div>

                            {/* --- SHIPPING METHOD HEADER --- */}
                            <h2 className="text-xl font-medium mt-4">Shipping method</h2>

                            {/* Shipping Method Box */}
                            <div className="mt-2 mb-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 border border-gray-100">
                                Enter your shipping address to view available shipping methods.
                            </div>

                            {/* --- PAYMENT SECTION --- */}
                            <div className="mb-8">
                                <h2 className="text-xl font-medium">Payment</h2>
                                <p className="text-sm text-gray-500 mt-1 mb-4">All transactions are secure and encrypted.</p>

                                {/* Payment Method Selection (Credit Card) */}
                                <div className="border-2 border-blue-500 rounded-lg bg-blue-50/50 p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                id="credit-card"
                                                defaultChecked
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor="credit-card" className="text-sm font-medium text-gray-900 cursor-pointer">
                                                Credit card
                                            </label>
                                        </div>
                                        {/* Credit Card Icons (Placeholders for SVG) */}
                                        <div className="flex gap-1">
                                            <span className="bg-blue-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">VISA</span>
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">MC</span>
                                            <span className="bg-blue-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">AMEX</span>
                                            <span className="bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">+4</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Credit Card Form Fields */}
                                <div className="bg-gray-50 rounded-b-lg p-4 border border-t-0 border-gray-200 space-y-3 mb-4">

                                    {/* Card Number */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            autoComplete="cc-number"
                                            placeholder="Card number"
                                            className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white pr-10"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        </div>
                                    </div>

                                    {/* Expiry & Security Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="cardExpiry"
                                                name="cardExpiry"
                                                autoComplete="cc-exp"
                                                placeholder="Expiration date (MM / YY)"
                                                className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="cardCvc"
                                                name="cardCvc"
                                                autoComplete="cc-csc"
                                                placeholder="Security code"
                                                className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white pr-10"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name on Card */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="cardName"
                                            name="cardName"
                                            autoComplete="cc-name"
                                            placeholder="Name on card"
                                            className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white"
                                        />
                                    </div>

                                    {/* Billing Address Checkbox */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="checkbox"
                                            id="billing"
                                            name="billing"
                                            defaultChecked
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="billing" className="text-sm text-gray-700">Use shipping address as billing address</label>
                                    </div>
                                </div>
                            </div>

                            {/* --- PAY NOW BUTTON --- */}
                            <button
                                onClick={handlePayNow}
                                className="w-full bg-blue-600 text-white py-4 rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-300 shadow-sm"
                            >
                                Pay now
                            </button>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN: SIDEBAR ===== */}
                    <div className="lg:w-[380px] shrink-0">
                        <div className="bg-gray-50 rounded-xl p-6 sticky top-6">

                            {/* Product List */}
                            <div className="space-y-6 mb-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        {/* Image with Quantity Badge */}
                                        <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex justify-between items-start pt-1">
                                            <span className="text-sm font-medium text-gray-900">{item.title}</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Discount Code Input */}
                            <div className="flex gap-2 mb-8">
                                <input
                                    type="text"
                                    id="discountCode"
                                    name="discountCode"
                                    placeholder="Discount code"
                                    className="flex-1 border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black bg-white transition-colors"
                                />
                                <button className="px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-not-allowed">
                                    Apply
                                </button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-400">Enter shipping address</span>
                                </div>
                            </div>

                            {/* Grand Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-base font-medium text-gray-900">Total</span>
                                <div className="text-right">
                                    <span className="text-xs text-gray-500 block">USD</span>
                                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div className="flex justify-center gap-4 mt-4 text-[11px] text-gray-500">
                                <Link href="#" className="hover:underline">Refund policy</Link>
                                <Link href="#" className="hover:underline">Privacy policy</Link>
                                <Link href="#" className="hover:underline">Terms of service</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage

//
// 'use client'
//
// import React, { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useCart } from '@/components/CartContext'
//
// const CheckoutPage = () => {
//     const { cartItems, getCartTotal } = useCart();
//     const total = getCartTotal();
//
//
//     const [email, setEmail] = useState('');
//
//     return (
//         <div className="min-h-screen bg-white">
//             <div className="container mx-auto px-4 py-8 max-w-6xl">
//                 {/* Header with Logo */}
//                 <div className="mb-8 pb-4 border-b border-gray-100">
//                     <Link href="/" className="text-2xl font-bold text-black">
//                         Rosyz.
//                     </Link>
//                 </div>
//
//                 <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
//
//                     {/* ===== LEFT COLUMN: FORMS ===== */}
//                     <div className="flex-1 lg:max-w-[600px]">
//
//                         {/* --- CONTACT SECTION --- */}
//                         <div className="mb-8">
//                             <div className="flex justify-between items-end mb-4">
//                                 <h2 className="text-xl font-medium">Contact</h2>
//                                 <Link href="#" className="text-sm text-blue-600 hover:underline">Sign in</Link>
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type="email"
//                                     placeholder="Email or mobile phone number"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors pr-10"
//                                 />
//                                 {/* Info Icon */}
//                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                                 </div>
//                             </div>
//
//                             {/* Checkbox */}
//                             <div className="mt-3 flex items-center gap-2">
//                                 <input type="checkbox" id="news" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
//                                 <label htmlFor="news" className="text-sm text-gray-700">Email me with news and offers</label>
//                             </div>
//                         </div>
//
//                         {/* --- DELIVERY SECTION --- */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-medium mb-4">Delivery</h2>
//
//                             {/* Country */}
//                             <div className="mb-4 relative">
//                                 <select className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors appearance-none bg-white">
//                                     <option>Singapore</option>
//                                     <option>United States</option>
//                                     <option>United Kingdom</option>
//                                 </select>
//                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//                                 </div>
//                                 <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Country/Region</label>
//                             </div>
//
//                             {/* Name Row */}
//                             <div className="grid grid-cols-2 gap-4 mb-4">
//                                 <div className="relative">
//                                     <input type="text" className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors" />
//                                     <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">First name (optional)</label>
//                                 </div>
//                                 <div className="relative">
//                                     <input type="text" className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors" />
//                                     <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Last name</label>
//                                 </div>
//                             </div>
//
//                             {/* Address */}
//                             <div className="relative mb-4">
//                                 <input type="text" className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors pr-10" />
//                                 <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Address</label>
//                                 {/* Search Icon */}
//                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                                 </div>
//                             </div>
//
//                             {/* Apartment */}
//                             <div className="relative mb-4">
//                                 <input type="text" className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors" />
//                                 <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Apartment, suite, etc. (optional)</label>
//                             </div>
//
//                             {/* Postal Code */}
//                             <div className="relative mb-4">
//                                 <input type="text" className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors" />
//                                 <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500">Postal code</label>
//                             </div>
//
//                             {/* Save Info Checkbox */}
//                             <div className="flex items-center gap-2 mb-8">
//                                 <input type="checkbox" id="saveInfo" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
//                                 <label htmlFor="saveInfo" className="text-sm text-gray-700">Save this information for next time</label>
//                             </div>
//
//                             {/* --- SHIPPING METHOD HEADER --- */}
//                             {/* --- SHIPPING METHOD HEADER --- */}
//                             <h2 className="text-xl font-medium mt-4">Shipping method</h2>
//
//                             {/* Shipping Method Box */}
//                             <div className="mt-2 mb-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 border border-gray-100">
//                                 Enter your shipping address to view available shipping methods.
//                             </div>
//
//                             {/* --- PAYMENT SECTION --- */}
//                             <div className="mb-8">
//                                 <h2 className="text-xl font-medium">Payment</h2>
//                                 <p className="text-sm text-gray-500 mt-1 mb-4">All transactions are secure and encrypted.</p>
//
//                                 {/* Payment Method Selection (Credit Card) */}
//                                 <div className="border-2 border-blue-500 rounded-lg bg-blue-50/50 p-4">
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center gap-3">
//                                             <input
//                                                 type="radio"
//                                                 name="payment"
//                                                 id="credit-card"
//                                                 defaultChecked
//                                                 className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                                             />
//                                             <label htmlFor="credit-card" className="text-sm font-medium text-gray-900 cursor-pointer">
//                                                 Credit card
//                                             </label>
//                                         </div>
//                                         {/* Credit Card Icons (Placeholders for SVG) */}
//                                         <div className="flex gap-1">
//                                             <span className="bg-blue-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">VISA</span>
//                                             <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">MC</span>
//                                             <span className="bg-blue-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">AMEX</span>
//                                             <span className="bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">+4</span>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Credit Card Form Fields */}
//                                 <div className="bg-gray-50 rounded-b-lg p-4 border border-t-0 border-gray-200 space-y-3 mb-4">
//
//                                     {/* Card Number */}
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             placeholder="Card number"
//                                             className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white pr-10"
//                                         />
//                                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//                                         </div>
//                                     </div>
//
//                                     {/* Expiry & Security Row */}
//                                     <div className="grid grid-cols-2 gap-3">
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Expiration date (MM / YY)"
//                                                 className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white"
//                                             />
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Security code"
//                                                 className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white pr-10"
//                                             />
//                                             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     {/* Name on Card */}
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             placeholder="Name on card"
//                                             className="w-full border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:border-black transition-colors bg-white"
//                                         />
//                                     </div>
//
//                                     {/* Billing Address Checkbox */}
//                                     <div className="flex items-center gap-2 mt-2">
//                                         <input
//                                             type="checkbox"
//                                             id="billing"
//                                             defaultChecked
//                                             className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                         />
//                                         <label htmlFor="billing" className="text-sm text-gray-700">Use shipping address as billing address</label>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* --- PAY NOW BUTTON --- */}
//                             <button className="w-full bg-blue-600 text-white py-4 rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-300 shadow-sm">
//                                 Pay now
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* ===== RIGHT COLUMN: SIDEBAR ===== */}
//                     <div className="lg:w-[380px] shrink-0">
//                         <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
//
//                             {/* Product List */}
//                             <div className="space-y-6 mb-8">
//                                 {cartItems.map((item) => (
//                                     <div key={item.id} className="flex gap-4">
//                                         {/* Image with Quantity Badge */}
//                                         <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden">
//                                             <Image src={item.image} alt={item.title} fill className="object-cover" />
//                                             <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                                                 {item.quantity}
//                                             </span>
//                                         </div>
//                                         <div className="flex-1 flex justify-between items-start pt-1">
//                                             <span className="text-sm font-medium text-gray-900">{item.title}</span>
//                                             <span className="text-sm font-medium text-gray-900">
//                                                 ${(item.price * item.quantity).toFixed(2)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//
//                             {/* Discount Code Input */}
//                             <div className="flex gap-2 mb-8">
//                                 <input
//                                     type="text"
//                                     placeholder="Discount code"
//                                     className="flex-1 border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black bg-white transition-colors"
//                                 />
//                                 <button className="px-4 py-3 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-not-allowed">
//                                     Apply
//                                 </button>
//                             </div>
//
//                             {/* Totals */}
//                             <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-600">Subtotal</span>
//                                     <span className="text-gray-900">${total.toFixed(2)}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-gray-600">Shipping</span>
//                                     <span className="text-gray-400">Enter shipping address</span>
//                                 </div>
//                             </div>
//
//                             {/* Grand Total */}
//                             <div className="flex justify-between items-center mb-6">
//                                 <span className="text-base font-medium text-gray-900">Total</span>
//                                 <div className="text-right">
//                                     <span className="text-xs text-gray-500 block">USD</span>
//                                     <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
//                                 </div>
//                             </div>
//
//                             {/* Footer Links */}
//                             <div className="flex justify-center gap-4 mt-4 text-[11px] text-gray-500">
//                                 <Link href="#" className="hover:underline">Refund policy</Link>
//                                 <Link href="#" className="hover:underline">Privacy policy</Link>
//                                 <Link href="#" className="hover:underline">Terms of service</Link>
//                             </div>
//
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default CheckoutPage





