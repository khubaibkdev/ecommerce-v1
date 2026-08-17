'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'


interface CartItem {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}


interface CartContextType {
    cartItems: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])


    useEffect(() => {
        const storedCart = localStorage.getItem('shopping_cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 3. Add an item to the cart
    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCartItems((prevItems) => {
            // Check if the item is already in the cart
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                // If it exists, increase quantity
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If it's new, add it with a quantity of 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // 4. Remove an item (or decrease quantity)
    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevItems.filter((item) => item.id !== id);
            }
        });
    };

    // 5. Clear the whole cart
    const clearCart = () => setCartItems([]);

    // 6. Calculate total price
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // 7. Get total number of items
    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Helper hook to use the cart easily in any component
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};