import ShopBtn from '@/components/ShopBtn'
import Image from 'next/image'


const HeroSection = () => {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-yellow-600">

            <h1 className="text-center text-sm text-red-500">Discover the latest trends</h1>
            <p className="text-center mt-5 text-4xl font-bold">Elevate Your Style With <br/> Our New Collection</p>
            <p className="text-center mt-5">Get ready to turn heads with our exclusive fashion line. <br/> Explore the season's hottest trends</p>

            <ShopBtn/>

            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[-80px] xl:right-[-20px] w-[550px] z-0">
                <Image
                    src="/images/model_3.png"
                    alt="Fashion model"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                />
            </div>

        </section>
    )
}


export default HeroSection

