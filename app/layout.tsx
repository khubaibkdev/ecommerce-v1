import type { Metadata } from "next"
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CartProvider } from "@/components/CartContext"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted_grotesk",
    subsets: ["latin"],
});

const martianMono = Martian_Mono({
    variable: "--font-martian_mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevEvent ",
    description: "The Hub for Every Dev Event You Must not Miss",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                schibstedGrotesk.variable,
                martianMono.variable,
                "font-sans",
                geist.variable
            )}
        >
        <body className="screen flex flex-col">


        <CartProvider>
            <Navbar />
            {children}
            <Footer />
        </CartProvider>

        </body>
        </html>
    )
}