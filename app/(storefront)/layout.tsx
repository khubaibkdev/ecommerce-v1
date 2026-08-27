import type { Metadata } from "next"
import "../globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import SearchModal from "@/components/SearchModal"
import LoginModal from "@/components/LoginModal"
import QuickViewModal from "@/components/QuickViewModal"
import NewsletterPopup from "@/components/NewsletterPopup"
import CookieBar from "@/components/CookieBar"
import BackToTop from "@/components/BackToTop"
import ProductNotificationToast from "@/components/ProductNotificationToast"
import { CartProvider } from "@/components/CartContext"
import { ThemeProvider } from "@/components/ThemeContext"
import { WishlistProvider } from "@/components/WishlistContext"
import { CompareProvider } from "@/components/CompareContext"
import { QuickViewProvider } from "@/components/QuickViewContext"
import { UIStateProvider } from "@/components/UIStateContext"
import { getCollections, getProducts } from "@/lib/products"
import { getBlogPosts, getRecentPurchases } from "@/lib/content"
import { getSiteSettings } from "@/lib/settings"

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings()
    return {
        title: settings.seoTitle,
        description: settings.seoDescription,
        icons: { icon: settings.favicon },
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [collections, products, blogPosts, recentPurchases, settings] = await Promise.all([
        getCollections(),
        getProducts(),
        getBlogPosts(),
        getRecentPurchases(),
        getSiteSettings(),
    ])
    const recentPosts = blogPosts.slice(0, 3)

    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--g-body)" }} suppressHydrationWarning>
        <ThemeProvider>
            <UIStateProvider>
                <CartProvider>
                    <WishlistProvider>
                        <CompareProvider>
                            <QuickViewProvider>
                                <Header collections={collections} recentPosts={recentPosts} logoSrc={settings.logoLight} siteName={settings.siteName} />
                                <main className="flex-1">{children}</main>
                                <Footer settings={settings} categories={collections} />

                                <CartDrawer />
                                <SearchModal products={products} />
                                <LoginModal />
                                <QuickViewModal />
                                <NewsletterPopup
                                    enabled={settings.newsletterEnabled}
                                    heading={settings.newsletterHeading}
                                    text={settings.newsletterText}
                                    image={settings.newsletterImage}
                                />
                                <CookieBar enabled={settings.cookieBarEnabled} text={settings.cookieBarText} />
                                <BackToTop />
                                <ProductNotificationToast recentPurchases={recentPurchases} />
                            </QuickViewProvider>
                        </CompareProvider>
                    </WishlistProvider>
                </CartProvider>
            </UIStateProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
