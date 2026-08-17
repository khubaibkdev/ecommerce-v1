import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PromotionalSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-80 md:h-96">
                        <Image
                            src="/images/p1_model.webp"
                            alt="Seasonal fashion"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className=" text-black text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Seasonal Style Sensations
            </span>
                        <h2 className="text-black text-2xl md:text-3xl leading-tight">
                            Unwrap The Hottest <br />
                            <span>Trends Of The Year</span>
                        </h2>
                        <p className="text-white text-sm mt-2">
                            Get ready for a wardrobe makeover like no other.
                        </p>
                        <Link
                            href="/shop"
                            className="underline inline-flex items-center gap-2 mt-4  text-white px-5 py-2.5 rounded-full text-sm "
                        >
                            {/*View More*/}
                        </Link>
                    </div>
                </div>


                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 p-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-80 md:h-96">
                        <Image
                            src="/images/p2_model.webp"
                            alt="Latest fashion"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block px-3 py-1  text-black text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Elevate Your Style Game
            </span>
                        <h2 className="text-2xl md:text-3xl  leading-tight ">
                            Discover The Latest <br />
                            <span>In Fashion</span>
                        </h2>
                        <p className="text-white text-sm mt-2">
                            Unleash your inner fashionista with Rosyz.
                        </p>
                        <Link
                            href="/collection"
                            className="underline inline-flex items-center gap-2 mt-4  text-white px-5 py-2.5 rounded-full text-sm "
                        >
                            {/*View More →*/}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionalSection