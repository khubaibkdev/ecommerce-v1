import React from 'react'
import Image from 'next/image'


const socialImages = [
    { id: 1, src: "/images/ts1.png", alt: "Fashion model with blue lighting" },
    { id: 2, src: "/images/sf2.png", alt: "Model with green hair and sunglasses" },
    { id: 3, src: "/images/sf3.png", alt: "Curly hair model with orange shirt" },
    { id: 4, src: "/images/sf4.png", alt: "Model with afro and red earrings" },
    { id: 5, src: "/images/sf5.png", alt: "Model with straw hat and yellow shirt" },
    { id: 6, src: "/images/ts2.png", alt: "Blonde model with glasses and teal top" },
]

const SocialFeed = () => {
    return (
        <section className="w-full py-16 bg-white">

            
            {/* <div className="flex w-full overflow-x-auto"> */}
            <div className="flex w-full overflow-x-auto max-w-full">
                
                {socialImages.map((image) => (
                   <div 
                    key={image.id}
                    className="relative aspect-square flex-grow min-w-[40%] md:min-w-[16.666%] shrink-0"
                   >
                   {/* // <div */}
                    {/* //     key={image.id} */}
                    {/* //     className="relative aspect-square flex-grow min-w-[40%] md:min-w-[16.666%]" */}
                    {/* // > */}
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 33vw, 16vw"
                        />

                    </div>
                ))}
            </div>
        </section>
    )
}

export default SocialFeed