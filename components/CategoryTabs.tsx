'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CategoryTabs = () => {
    const pathname = usePathname();

    const categories = [
        { name: 'Men', image: '/images/men.png' },
        { name: 'Women', image: '/images/women.png' },
        { name: 'Accessories', image: '/images/accessories.png' },
        { name: 'Outerwear', image: '/images/outerwear.png' },
        { name: 'Shoes', image: '/images/shoes.png' },
    ]

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex flex-wrap justify-center gap-8">
                {categories.map((category) => {
                    // Create the URL path (e.g., 'Men' -> '/men')
                    const href = `/shop/${category.name.toLowerCase()}`

                    // Check if this category matches the current URL path
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={category.name}
                            href={href}
                            className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                            <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-300 ${
                                isActive
                                    ? 'ring-4 ring-red-500 shadow-lg scale-110'
                                    : 'hover:scale-105'
                            }`}>
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <span className={`text-sm font-large transition-colors ${
                                isActive ? 'text-red-500' : 'text-gray-700'
                            }`}>
                                {category.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryTabs;




// 'use client'
//
// import React, { useState } from 'react'
// import Image from 'next/image'
//
// const CategoryTabs = () => {
//     const [activeCategory, setActiveCategory] = useState('Women')
//
//     const categories = [
//         { name: 'Men', image: '/images/men.png' },
//         { name: 'Women', image: '/images/women.png' },
//         { name: 'Accessories', image: '/images/accessories.png' },
//         { name: 'Outerwear', image: '/images/outerwear.png' },
//         { name: 'Shoes', image: '/images/shoes.png' },
//     ]
//
//     return (
//         <section className="container mx-auto px-4 py-12">
//             <div className="flex flex-wrap justify-center gap-8">
//                 {categories.map((category) => (
//                     <button
//                         key={category.name}
//                         onClick={() => setActiveCategory(category.name)}
//                         className="flex flex-col items-center gap-2 group"
//                     >
//
//                         <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-300 ${
//                             activeCategory === category.name
//                                 ? 'ring-4 ring-red-500 shadow-lg scale-110'
//                                 : 'hover:scale-105'
//                         }`}>
//                             <Image
//                                 src={category.image}
//                                 alt={category.name}
//                                 fill
//                                 className="object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                         </div>
//
//                         <span className={`text-sm font-large transition-colors ${
//                             activeCategory === category.name ? 'text-red-500' : 'text-gray-700'
//                         }`}>
//               {category.name}
//             </span>
//                     </button>
//                 ))}
//             </div>
//         </section>
//     );
// };
//
// export default CategoryTabs;