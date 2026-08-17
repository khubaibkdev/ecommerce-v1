import React from 'react'
import HeroSection from '@/components/HeroSection'
import CategoryTabs from '@/components/CategoryTabs'
import PromotionalSection from "@/components/PromotionalSection"
import ProductSection from "@/components/ProductSection"
import StyleRedefined from "@/components/StyleRedefined"
import FashionCarousel from "@/components/FashionCarousel"
import BlogPosts from "@/components/BlogPosts"
import TestimonialSection from "@/components/TestimonialSection"
import SocialFeed from "@/components/SocialFeed"


const Page = () => {
    return (
        <section>
            <HeroSection/>

            <h1 className="text-center mt-15 text-sm text-red-500">OUR EXCLUSIVE COLLECTIONS</h1>

            <p className="text-center mt-10 text-4xl font-semibold">Shop By Categories</p>

            <CategoryTabs />

            <PromotionalSection />

            <h2 className="text-center mt-15 text-sm text-red-500">STAY AHEAD OF THE FASHION CURVE </h2>

            <p className="text-center mt-10 text-4xl font-semibold">Trending Products</p>

            <ProductSection />

            <StyleRedefined />

            <h1 className="text-center mt-15 text-sm font-medium text-red-500">BLOSSOM INTO STYLE: OUR SPRING FASHION PICKS</h1>

            <p className="text-center mt-5 text-4xl font-medium">The Spring Collection</p>

            <FashionCarousel />

            <h1 className="text-center mt-15  text-sm font-medium text-red-500">EXPLORE OUT LATEST FASHION INSIGHTS</h1>

            <p className="text-center mt-5 text-4xl font-medium">Blog Posts</p>

            <BlogPosts />

            <h1 className="text-center mt-15 text-sm font-medium text-red-500">SUB TITLE TOP</h1>

            <p className="text-center mt-5 text-4xl font-medium">From The People</p>

            <TestimonialSection />

            <p className="text-center mt-10 text-4xl font-medium">Follow Us</p>

            <h1 className="text-center mt-5 text-4xlfont-medium text-red-500">@Rosyz_Fashion_Store</h1>

            <SocialFeed/>









        </section>
    )
}
export default Page
































// import Image from "next/image";
//
// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.tsx
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
