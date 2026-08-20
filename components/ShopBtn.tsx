'use client'
import Image from "next/image"
import Link from "next/link"

const ShopBtn = () => {
    return (
        <Link
            href="/shop/men"
            id="shop-btn"
            className="mt-7 mx-auto flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 font-bold text-white"
        >
            Shop Now
            <Image src="/icons/arrow-right.svg" alt="arrow-right" width={24} height={24} />
        </Link>

        // <a
        //     href="#events" id="shop-btn" className="mt-7 mx-auto flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 font-bold text-white">
        //     Shop Now
        //     <Image src="/icons/arrow-right.svg" alt="arrow-right" width={24} height={24}
        //     />
        // </a>
    )
}
export default ShopBtn