'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

interface CartLineItem {
    id: number;
    title: string;
    price: number;
    image: string;
}

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart, getCartTotal } = useCart();
    const total = getCartTotal();

    // Helper to increase quantity
    const handleIncrease = (item: CartLineItem) => {
        addToCart({ id: item.id, title: item.title, price: item.price, image: item.image });
    };

    return (
        <div className="min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Page Title */}
                <h1 className="text-3xl font-normal text-[var(--g-color-heading)] mb-10">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

                    {/* ===== LEFT COLUMN: PRODUCTS & SHIPPING ===== */}
                    <div className="flex-1">

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[var(--g-border)] text-sm text-[var(--g-color-heading)] opacity-80">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-3 text-right">Total</div>
                        </div>

                        {/* Product Rows */}
                        <div className="divide-y divide-[var(--g-border)]">
                            {cartItems.length === 0 ? (
                                <div className="py-16 text-center text-[var(--g-color-heading)] opacity-60">
                                    Your cart is currently empty.
                                    <Link href="/" className="block text-[var(--g-color-heading)] underline mt-2 font-medium">Continue Shopping</Link>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 py-8 items-center">

                                        {/* Product Column */}
                                        <div className="col-span-6 flex gap-6 items-center">
                                            <div className="relative w-24 h-28 shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover rounded-sm"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-medium text-[var(--g-color-heading)]">{item.title}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-sm text-[var(--g-color-heading)] opacity-50 hover:opacity-100 hover:text-[var(--g-main-2)] transition-colors underline mt-1"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quantity Column */}
                                        <div className="col-span-3 flex justify-center">
                                            <div className="flex items-center border border-[var(--g-border)] rounded-sm h-10 w-28 bg-[var(--g-input-bg)]">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-8 h-full flex items-center justify-center text-[var(--g-color-heading)] opacity-60 hover:opacity-100 text-lg border-r border-[var(--g-border)]"
                                                >-</button>
                                                <span className="flex-1 text-center font-medium text-sm text-[var(--g-color-heading)]">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncrease(item)}
                                                    className="w-8 h-full flex items-center justify-center text-[var(--g-color-heading)] opacity-60 hover:opacity-100 text-lg border-l border-[var(--g-border)]"
                                                >+</button>
                                            </div>
                                        </div>

                                        {/* Total Price Column */}
                                        <div className="col-span-3 text-right text-lg text-[var(--g-color-heading)]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* ===== SHIPPING ESTIMATES ===== */}
                        {cartItems.length > 0 && (
                            <div className="mt-16 border border-[var(--g-border)] rounded-sm p-8 bg-[var(--g-body)]">
                                <h3 className="text-lg font-normal mb-6 text-[var(--g-color-heading)]">Get shipping estimates</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {/* Country */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-[var(--g-color-heading)] opacity-70">Country</label>
                                        <div className="relative">
                                            <select className="w-full border border-[var(--g-input-border)] rounded-sm p-3 text-sm bg-[var(--g-input-bg)] text-[var(--g-color-heading)] appearance-none">
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>United Kingdom</option>
                                            </select>
                                            {/* Dropdown Arrow */}
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--g-color-heading)] opacity-50">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Province */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-[var(--g-color-heading)] opacity-70">Province</label>
                                        <div className="relative">
                                            <select className="w-full border border-[var(--g-input-border)] rounded-sm p-3 text-sm bg-[var(--g-input-bg)] text-[var(--g-color-heading)] appearance-none">
                                                <option>Alabama</option>
                                                <option>California</option>
                                                <option>New York</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--g-color-heading)] opacity-50">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Zip Code */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-[var(--g-color-heading)] opacity-70">Zip/Postal Code</label>
                                        <input
                                            type="text"
                                            className="w-full border border-[var(--g-input-border)] rounded-sm p-3 text-sm bg-[var(--g-input-bg)] text-[var(--g-color-heading)] outline-none focus:border-[var(--g-main-2)]"
                                            placeholder="Enter zip code"
                                        />
                                    </div>
                                </div>

                                <button className="btn-outline mt-6">
                                    CALCULATE SHIPPING
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ===== RIGHT COLUMN: SIDEBAR ===== */}
                    <div className="lg:w-[380px] shrink-0">
                        <div className="flex flex-col gap-8 pb-8 border-b border-[var(--g-border)] mb-8">

                            {/* Free Shipping Bar */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm text-[var(--g-color-heading)] opacity-80">
                                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span>Spend <strong>$960.00</strong> for Free Shipping</span>
                                </div>
                                {/* Thin Progress Bar */}
                                <div className="w-full h-1 bg-[var(--g-border)] rounded-sm overflow-hidden mt-1">
                                    <div className="h-full bg-black rounded-sm" style={{ width: '15%' }}></div>
                                </div>
                            </div>

                            {/* Special instructions */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-[var(--g-color-heading)] opacity-80">Special instructions for seller</label>
                                <textarea
                                    className="w-full p-3 border border-[var(--g-input-border)] rounded-sm text-sm bg-[var(--g-input-bg)] text-[var(--g-color-heading)] resize-none focus:outline-none focus:border-[var(--g-main-2)]"
                                    rows={4}
                                ></textarea>
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="flex flex-col gap-4 pb-8 border-b border-[var(--g-border)] mb-8">
                            <h4 className="font-medium text-[var(--g-color-heading)]">List Coupon</h4>
                            <div className="space-y-1 text-sm text-[var(--g-color-heading)] opacity-70">
                                <p><span className="font-bold text-[var(--g-color-heading)]">december</span> → 20% off 14 collections</p>
                                <p><span className="font-bold text-[var(--g-color-heading)]">lotita</span> → 10% off No usage limits</p>
                                <p className="text-xs opacity-70 mt-2">Coupon code will work on checkout page</p>
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <input
                                    type="text"
                                    placeholder="Coupon"
                                    className="flex-1 p-3 border border-[var(--g-input-border)] rounded-sm text-sm bg-[var(--g-input-bg)] text-[var(--g-color-heading)] outline-none focus:border-[var(--g-main-2)]"
                                />
                                <button className="btn-outline shrink-0">
                                    SAVE
                                </button>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-base text-[var(--g-color-heading)]">Total</span>
                            <span className="text-2xl text-[var(--g-color-heading)] font-medium">${total.toFixed(2)}</span>
                        </div>

                        {/* Checkout Button */}
                        <Link
                            href="/checkout"
                            className="btn-theme w-full"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
