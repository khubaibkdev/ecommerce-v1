'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface OrderItem {
    id: string | number
    title: string
    price: number
    quantity: number
    image: string
}

interface Order {
    orderNumber: string
    items: OrderItem[]
    total: number
    email: string
    date: string
}

const OrderConfirmationPage = () => {
    const [order, setOrder] = useState<Order | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('lastOrder')
        if (stored) {
            setOrder(JSON.parse(stored))
        }
    }, [])

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">No recent order found.</p>
                    <Link href="/" className="text-blue-600 hover:underline">
                        Return to homepage
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16 max-w-2xl">

                {/* Success Icon + Message */}
                <div className="text-center mb-10">
                    <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
                    <p className="text-gray-600">
                        A confirmation email has been sent to <span className="font-medium">{order.email || 'your inbox'}</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Order #{order.orderNumber} · {order.date}
                    </p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-white">
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

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-base font-medium text-gray-900">Total Paid</span>
                        <span className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Continue Shopping */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-block bg-black text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmationPage