import Image from 'next/image'
import Carousel from '@/components/Carousel'
import { StarIcon } from '@/components/icons'
import { getTestimonials } from '@/lib/content'

const QuotesCarousel = async () => {
    const testimonials = await getTestimonials()

    return (
        <Carousel
            itemClassName="w-full sm:w-1/2 lg:w-1/3"
            gapClassName="gap-6"
            autoplayMs={6000}
            ariaLabel="Customer testimonials"
        >
            {testimonials.map((testimonial) => (
                <div
                    key={testimonial.name}
                    className="flex h-full flex-col rounded-2xl bg-[var(--card-bg)] p-8"
                    style={{ boxShadow: 'var(--card-shadow)' }}
                >
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} className="h-4 w-4" />
                        ))}
                    </div>

                    <p className="mt-4 text-base font-medium leading-relaxed md:text-lg">“{testimonial.quote}”</p>
                    <p className="mt-2 text-sm opacity-60">{testimonial.subText}</p>

                    <div className="mt-auto flex items-center gap-3 pt-6">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                            <Image src={testimonial.image} alt={testimonial.name} fill sizes="48px" className="object-cover" />
                        </span>
                        <span>
                            <span className="block font-semibold" style={{ color: 'var(--g-color-heading)' }}>
                                {testimonial.name}
                            </span>
                            <span className="block text-sm opacity-60">{testimonial.role}</span>
                        </span>
                    </div>
                </div>
            ))}
        </Carousel>
    )
}

export default QuotesCarousel
