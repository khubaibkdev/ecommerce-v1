import React from 'react'
import Image from 'next/image'


const StarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-[#F59E0B]" // Amber/Orange color
    >
        <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
        />
    </svg>
)

const testimonials = [
    {
        id: 1,
        quote: "I've Shopped At Many Online Fashion Stores, But Rosyz Is Truly Exceptional. Their Quality And Style Are Unmatched. I Keep Coming Back For More!",
        subText: "I keep coming back for more!",
        name: "Emily Johnson",
        role: "Fashion Enthusiast",
        image: "/images/ts1.png",
    },
    {
        id: 2,
        quote: "Rosyz Is My Go-To For The Latest Fashion Trends. Their Collection Is Always Up-To-Date, And The Shopping Experience Is A Breeze. I Recommend Them To All My Friends.",
        subText: "I recommend them to all my friends.",
        name: "David Smith",
        role: "Trendsetter",
        image: "/images/ts2.png",
    },
    {
        id: 3,
        quote: "I've Had The Pleasure Of Collaborating With Rosyz Multiple Times. Their Commitment To Style And Quality Is Evident In Every Piece They Offer.",
        subText: "It's the perfect fashion store",
        name: "Sarah Anderson",
        role: "Fashion Blogger",
        image: "/images/ts3.png",
    }
];

const TestimonialsSection = () => {
    return (
        <section className="container mx-auto mt-7 px-4 py-16 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex flex-col">


                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                        </div>


                        <p className="text-gray-900 text-lg font-medium leading-relaxed mb-2">
                            &ldquo;{testimonial.quote}&rdquo;
                        </p>


                        <p className="text-gray-600 text-sm mb-8">
                            {testimonial.subText}
                        </p>


                        <div className="flex items-center gap-4 mt-auto">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                  {testimonial.name}
                </span>
                                <span className="text-sm text-gray-500">
                  {testimonial.role}
                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default TestimonialsSection