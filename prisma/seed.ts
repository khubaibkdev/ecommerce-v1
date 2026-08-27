import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

const IMG = (name: string) => `/images/rosyz/${name}`

const categories = [
    { slug: 'men', name: 'Men', image: IMG('men.jpg'), heroImage: IMG('product-8_58055203-fbbb-468a-a10b-41c28c632965.jpg') },
    { slug: 'women', name: 'Women', image: IMG('women.jpg'), heroImage: IMG('product-6_d24b89b7-e72a-469f-a7e6-a07ca8400f75.jpg') },
    { slug: 'accessories', name: 'Accessories', image: IMG('accessories.jpg'), heroImage: IMG('product-16_5fef85d4-4017-42d2-9a01-b8aa390dde62.jpg') },
    { slug: 'outerwear', name: 'Outerwear', image: IMG('outerwear.jpg'), heroImage: IMG('product-4_b32fd154-87e2-438a-968f-5a4b5fc9d9a0.jpg') },
    { slug: 'shoes', name: 'Shoes', image: IMG('shoes.jpg'), heroImage: IMG('product-21_ba641002-5032-4416-94af-cc3abc215944.jpg') },
    { slug: 'glasses', name: 'Glasses', image: IMG('glasses.jpg'), heroImage: IMG('spring-5.jpg') },
]

const products = [
    {
        handle: 'classic-mens-oxford-shirt', vendor: "The Gentleman's Choice", title: "Classic Men's Oxford Shirt",
        price: 25, compareAtPrice: 32,
        image: IMG('product-2_05e3a33d-b42f-4a74-9d91-362738e2f30c.jpg'), hoverImage: IMG('product-3_ce442f55-eda6-4790-bf62-f87d031447d0.jpg'),
        tabs: ['featured'], category: 'men', productType: 'Shirt', sizes: ['S', 'M', 'L'],
        reviews: 12, rating: 5,
        description: 'A timeless wardrobe staple, tailored from breathable cotton with a crisp collar and a relaxed, versatile fit that carries from the office to the weekend.',
        swatches: [] as { name: string; color: string; image: string }[],
    },
    {
        handle: 'cozy-knit-sweater', vendor: 'Cozy Knits Co', title: 'Cozy Knit Sweater',
        price: 25,
        image: IMG('product-3_a7cd6a59-3ea8-4649-b3d5-91e39326bf35.jpg'), hoverImage: IMG('product-5.jpg'),
        tabs: ['featured', 'new-arrival', 'best-seller'], category: 'women', productType: 'Sweater', sizes: ['S', 'M', 'L'],
        reviews: 9, rating: 4,
        description: 'Soft, chunky-knit sweater spun for cold-weather comfort without sacrificing shape — layers beautifully over everything in your closet.',
        swatches: [
            { name: 'Black', color: '#000000', image: IMG('product-3_a7cd6a59-3ea8-4649-b3d5-91e39326bf35.jpg') },
            { name: 'Blue', color: '#3f5b8c', image: IMG('product-5.jpg') },
            { name: 'Camel', color: '#c19a6b', image: IMG('product-6.jpg') },
            { name: 'Navy', color: '#28304a', image: IMG('product-4_a7dd50d9-8cf7-477d-aa4a-996727ff69bb.jpg') },
        ],
    },
    {
        handle: 'leather-biker-jacket', vendor: 'Rebel Rider', title: 'Leather Biker Jacket',
        price: 25,
        image: IMG('product-4_b32fd154-87e2-438a-968f-5a4b5fc9d9a0.jpg'), hoverImage: IMG('product-6_9a03bb35-01bf-4040-987f-e16be12ef293.jpg'),
        tabs: ['featured', 'best-seller'], category: 'outerwear', productType: 'Jacket', sizes: ['S', 'M', 'L'],
        reviews: 21, rating: 5,
        description: 'A moto-inspired silhouette in supple faux leather with asymmetric zip closure and quilted shoulder detailing for edge that never goes out of style.',
        swatches: [],
    },
    {
        handle: 'boho-floral-maxi-dress', vendor: 'Bohemian Bliss', title: 'Boho Floral Maxi Dress',
        price: 25,
        image: IMG('product-6_d24b89b7-e72a-469f-a7e6-a07ca8400f75.jpg'), hoverImage: IMG('product-6_d24b89b7-e72a-469f-a7e6-a07ca8400f75.jpg'),
        tabs: ['featured', 'best-seller'], category: 'women', productType: 'Dress', sizes: ['S', 'M', 'L'], countdown: true,
        reviews: 42, rating: 5,
        description: 'Flowing floral-print maxi with elasticated waist and fluttering sleeves — an effortless throw-on for warm days and golden-hour plans.',
        swatches: [
            { name: 'Black', color: '#000000', image: IMG('product-6_d24b89b7-e72a-469f-a7e6-a07ca8400f75.jpg') },
            { name: 'Blue', color: '#3f5b8c', image: IMG('product-5_986261a2-e512-4f8b-aa1b-0153f3505293.jpg') },
            { name: 'Burgundy', color: '#6d1f2b', image: IMG('product-7_a119b294-0a99-4731-b091-e1beaa5e9a91.jpg') },
            { name: 'Camel', color: '#c19a6b', image: IMG('product-8_a6b0968a-1ff3-4df0-99d4-f9df5ad3dbb5.jpg') },
        ],
    },
    {
        handle: 'luxury-silk-scarf', vendor: 'Silk Elegance', title: 'Luxury Silk Scarf',
        price: 21,
        image: IMG('product-16_5fef85d4-4017-42d2-9a01-b8aa390dde62.jpg'), hoverImage: IMG('product-16_5fef85d4-4017-42d2-9a01-b8aa390dde62.jpg'),
        tabs: ['featured', 'best-seller'], category: 'accessories', productType: 'Scarf',
        reviews: 6, rating: 4,
        description: 'Hand-finished 100% mulberry silk scarf with a hand-rolled edge — the kind of quiet-luxury accessory that elevates every outfit it touches.',
        swatches: [],
    },
    {
        handle: 'athletic-performance-shorts', vendor: 'ActiveLife Gear', title: 'Athletic Performance Shorts',
        price: 25,
        image: IMG('product-8_f97a217b-482e-4fe1-a26a-def18b54e8fb.jpg'), hoverImage: IMG('product-14_2b431b71-44f5-4271-9b59-b55150a0f851.jpg'),
        tabs: ['featured', 'best-seller'], category: 'men', productType: 'Shorts', sizes: ['S', 'M', 'L'], countdown: true,
        reviews: 15, rating: 4,
        description: 'Lightweight, moisture-wicking shorts built with four-way stretch and a secure inner liner — made to move as hard as you do.',
        swatches: [],
    },
    {
        handle: 'denim-skinny-jeans', vendor: 'Denim Delight', title: 'Denim Skinny Jeans',
        price: 21,
        image: IMG('product-7_a2f29db3-5ded-4ea2-893d-ae493be16ce6.jpg'), hoverImage: IMG('product-13_65f48017-44d1-4dd8-b30b-3e4e47988dc5.jpg'),
        tabs: ['featured'], category: 'women', productType: 'Jeans', sizes: ['S', 'M', 'L'],
        reviews: 18, rating: 4,
        description: 'A signature skinny fit in comfort-stretch denim that holds its shape all day — the everyday jean you will reach for on repeat.',
        swatches: [],
    },
    {
        handle: 'sleek-slim-fit-suit', vendor: 'Dapper Styles', title: 'Sleek Slim Fit Suit',
        price: 25,
        image: IMG('product-8_58055203-fbbb-468a-a10b-41c28c632965.jpg'), hoverImage: IMG('product-8_58055203-fbbb-468a-a10b-41c28c632965.jpg'),
        tabs: ['featured', 'best-seller'], category: 'men', productType: 'Suit', sizes: ['S', 'M', 'L'], soldOut: true,
        reviews: 5, rating: 5,
        description: 'A precisely tailored two-piece in a lightweight weave, cut slim through the body with a modern, tapered leg for a sharp, contemporary line.',
        swatches: [],
    },
    {
        handle: 'quilted-puffer-jacket', vendor: 'WinterWonder Co', title: 'Quilted Puffer Jacket',
        price: 20, compareAtPrice: 25,
        image: IMG('product-14_19296051-21ae-47a1-8b1b-5726a52f43d4.jpg'), hoverImage: IMG('product-19_3130953c-8709-44d8-8332-236cc2a907ac.jpg'),
        tabs: ['featured', 'new-arrival'], category: 'outerwear', productType: 'Jacket', sizes: ['S', 'M', 'L'],
        reviews: 11, rating: 4,
        description: 'Insulated quilted puffer with a packable down-alternative fill and storm-ready zip closure — engineered for serious warmth without the bulk.',
        swatches: [],
    },
    {
        handle: 'elegant-evening-gown', vendor: 'Chic Couture', title: 'Elegant Evening Gown',
        price: 25,
        image: IMG('product-1.jpg'), hoverImage: IMG('product-3.jpg'),
        tabs: ['featured'], category: 'women', productType: 'Dress', sizes: ['S', 'M', 'L'],
        reviews: 8, rating: 5,
        description: 'A floor-length gown with a fluid drape and a delicately fitted bodice, designed to make an entrance at every black-tie occasion.',
        swatches: [],
    },
    {
        handle: 'mens-classic-chino-pants', vendor: 'Modern Man', title: "Men's Classic Chino Pants",
        price: 15,
        image: IMG('product-20_291c13b3-8505-4e21-8dd1-660195dd8a43.jpg'), hoverImage: IMG('product-20_291c13b3-8505-4e21-8dd1-660195dd8a43.jpg'),
        tabs: ['new-arrival'], category: 'men', productType: 'Pants', sizes: ['S', 'M', 'L'],
        reviews: 7, rating: 4,
        description: 'Classic straight-leg chinos in a durable cotton twill with just enough stretch for all-day comfort, on or off the clock.',
        swatches: [],
    },
    {
        handle: 'fringe-boho-bag', vendor: 'Boho Chic Boutique', title: 'Fringe Boho Bag',
        price: 15,
        image: IMG('product-19_c03940a1-d696-4c40-826b-9e560bc8b8b1.jpg'), hoverImage: IMG('product-21_c28c0996-d7e1-4b08-9ac3-2bc5f6f57bb1.jpg'),
        tabs: ['new-arrival'], category: 'accessories', productType: 'Handbag',
        reviews: 4, rating: 4,
        description: 'Suede-effect crossbody with fringe trim and antique hardware — a free-spirited finishing touch for festival season and beyond.',
        swatches: [],
    },
    {
        handle: 'striped-linen-blouse', vendor: 'Coastal Trends', title: 'Striped Linen Blouse',
        price: 25,
        image: IMG('product-22_7511be76-314d-4314-a871-06383dcb28bc.jpg'), hoverImage: IMG('product-22_7511be76-314d-4314-a871-06383dcb28bc.jpg'),
        tabs: ['new-arrival'], category: 'women', productType: 'Blouse', sizes: ['S', 'M', 'L'],
        reviews: 10, rating: 4,
        description: 'Breathable striped linen blouse with a relaxed collar and rolled sleeves — breezy, coastal-inspired ease for warm-weather dressing.',
        swatches: [],
    },
    {
        handle: 'mens-leather-chelsea-boots', vendor: 'Urban Rugged', title: "Men's Leather Chelsea Boots",
        price: 0,
        image: IMG('product-21_ba641002-5032-4416-94af-cc3abc215944.jpg'), hoverImage: IMG('product-23_4f678243-f37d-4676-90ad-059f0ad6d84b.jpg'),
        tabs: ['new-arrival'], category: 'shoes', productType: 'Boots', soldOut: true,
        reviews: 3, rating: 4,
        description: 'Full-grain leather Chelsea boots with an elastic side gusset and stacked heel — built to be worn in and worn often.',
        swatches: [],
    },
    {
        handle: 'cashmere-knit-cardigan', vendor: 'Cashmere Cozy', title: 'Cashmere Knit Cardigan',
        price: 25,
        image: IMG('product-23_7bbb492d-e347-41fe-bf7c-f2bff0da0020.jpg'), hoverImage: IMG('product-1_5fb2cf19-ceb7-478a-8b49-5bd8371e0b25.jpg'),
        tabs: ['best-seller'], category: 'women', productType: 'Cardigan', sizes: ['S', 'M', 'L'],
        reviews: 14, rating: 5,
        description: 'A luxuriously soft cashmere-blend cardigan with mother-of-pearl buttons — the kind of quiet layer you will wear on a loop all season.',
        swatches: [],
    },
    {
        handle: 'tailored-satin-blazer', vendor: 'Refined Edit', title: 'Tailored Satin Blazer',
        price: 32,
        image: IMG('product-13-blazer.jpg'), hoverImage: IMG('product-13-blazer.jpg'),
        tabs: [], category: 'outerwear', productType: 'Blazer', sizes: ['S', 'M', 'L'],
        reviews: 6, rating: 5,
        description: 'A double-breasted blazer in a soft satin-finish weave with a relaxed, draped shoulder — polished enough for the office, easy enough for everything after.',
        swatches: [],
    },
    {
        handle: 'classic-trench-coat', vendor: 'Refined Edit', title: 'Classic Trench Coat',
        price: 34,
        image: IMG('product-24-trench.jpg'), hoverImage: IMG('product-24-trench.jpg'),
        tabs: [], category: 'outerwear', productType: 'Coat', sizes: ['S', 'M', 'L'],
        reviews: 9, rating: 5,
        description: 'A vegan-leather trench with a relaxed collar and belted waist — a transitional-weather staple that layers over almost anything.',
        swatches: [],
    },
    {
        handle: 'retro-cat-eye-sunglasses', vendor: 'Shade & Co.', title: 'Retro Cat-Eye Sunglasses',
        price: 18,
        image: IMG('insta2.jpg'), hoverImage: IMG('insta2.jpg'),
        tabs: [], category: 'glasses', productType: 'Sunglasses',
        reviews: 5, rating: 4,
        description: 'Tinted cat-eye sunglasses with a slim wire frame — a statement finish for sunny days and golden-hour outfits alike.',
        swatches: [],
    },
    {
        handle: 'round-wire-frame-glasses', vendor: 'Shade & Co.', title: 'Round Wire-Frame Glasses',
        price: 22,
        image: IMG('spring-3.jpg'), hoverImage: IMG('spring-3.jpg'),
        tabs: [], category: 'glasses', productType: 'Eyeglasses',
        reviews: 3, rating: 4,
        description: 'Lightweight round wire frames with a classic keyhole bridge — an understated everyday pair that pairs with anything.',
        swatches: [],
    },
]

const heroSlides = [
    {
        image: IMG('banner-new2_e9cb5899-3448-4bc1-b523-f27298825ac1.png'),
        eyebrow: 'Discover the Latest Trends',
        headingL1: 'Elevate Your Style with', headingL2: 'Our New Collection',
        subheading: "Get ready to turn heads with our exclusive fashion line. Explore the season's hottest trends.",
        align: 'center',
    },
    {
        image: IMG('banner-new1_e2b0ee06-c245-4193-bda9-05713dc12bc5.png'),
        eyebrow: 'Discover Your Style',
        headingL1: 'Unleash the Latest Trends', headingL2: 'with Rosyz.',
        subheading: 'Step into the world of fashion and redefine your wardrobe with our exclusive collection.',
        align: 'right',
    },
]

const gridBanners = [
    {
        image: IMG('offer-banner1_cd5ff0a4-83f8-4855-b0ca-254ffafee564.jpg'),
        eyebrow: 'Seasonal Style Sensations',
        headingL1: 'Unwrap the Hottest', headingL2: 'Trends of the Year',
        text: 'Get ready for a wardrobe makeover like no other.',
        buttonHref: '/shop/men',
    },
    {
        image: IMG('offer-banner2_1e89c27a-54d6-49ae-ac26-6415cb2b5f64.jpg'),
        eyebrow: 'Elevate Your Style Game',
        headingL1: 'Discover the Latest', headingL2: 'in Fashion',
        text: 'Unleash your inner fashionista with Rosyz.',
        buttonHref: '/shop/women',
    },
]

const springSlides = [
    { image: IMG('spring-3.jpg'), productHandle: 'denim-skinny-jeans', topPos: '40%', leftPos: '10%' },
    { image: IMG('spring-4.jpg'), productHandle: 'athletic-performance-shorts', topPos: '40%', leftPos: '20%' },
    { image: IMG('spring-5.jpg'), productHandle: 'luxury-silk-scarf', topPos: '40%', leftPos: '30%' },
    { image: IMG('spring-4.jpg'), productHandle: 'elegant-evening-gown', topPos: '70%', leftPos: '10%' },
    { image: IMG('spring-2.jpg'), productHandle: 'cozy-knit-sweater', topPos: '55%', leftPos: '10%' },
]

const testimonials = [
    {
        name: 'Emily Johnson', role: 'Fashion Enthusiast', image: IMG('insta1.jpg'),
        quote: "I've shopped at many online fashion stores, but Rosyz is truly exceptional. Their quality and style are unmatched. I keep coming back for more!",
        subText: 'I keep coming back for more!',
    },
    {
        name: 'David Smith', role: 'Trendsetter', image: IMG('insta6.jpg'),
        quote: 'Rosyz is my go-to for the latest fashion trends. Their collection is always up-to-date, and the shopping experience is a breeze. I recommend them to all my friends.',
        subText: 'I recommend them to all my friends.',
    },
    {
        name: 'Sarah Anderson', role: 'Fashion Blogger', image: IMG('insta8.jpg'),
        quote: "I've had the pleasure of collaborating with Rosyz multiple times. Their commitment to style and quality is evident in every piece they offer.",
        subText: "It's the perfect fashion store",
    },
    {
        name: 'Michael Roberts', role: 'Style Icon', image: IMG('glasses.jpg'),
        quote: 'Shopping at Rosyz has been a game-changer for me. Their selection is always on point, and I appreciate the attention to detail in each piece.',
        subText: "I've found some of my signature looks here!",
    },
]

const instagramImages = ['insta1.jpg', 'insta2.jpg', 'insta3.jpg', 'insta4.jpg', 'insta5.jpg', 'insta6.jpg', 'insta7.jpg', 'insta8.jpg'].map(
    (name) => IMG(name),
)

const recentPurchases = [
    { title: 'Elegant Evening Gown', image: IMG('product-1.jpg'), handle: 'elegant-evening-gown', location: 'in Bridgetown, Barbados', timeLabel: 'about 46 minutes ago' },
    { title: "Classic Men's Oxford Shirt", image: IMG('product-2_05e3a33d-b42f-4a74-9d91-362738e2f30c.jpg'), handle: 'classic-mens-oxford-shirt', location: 'in Beijing, China', timeLabel: 'about 16 minutes ago' },
    { title: 'Leather Biker Jacket', image: IMG('product-4_b32fd154-87e2-438a-968f-5a4b5fc9d9a0.jpg'), handle: 'leather-biker-jacket', location: 'in Paris, France', timeLabel: 'about 19 minutes ago' },
]

const blogContent = [
    "Any, meaning — it doesn't matter what color or print it is. It'll work. Augue eget lorem euismod dictum, purus mauris facilisis nunc, in gravida sapien risus nec sapien. Fashion moves fast, but a few ideas stay evergreen season after season.",
    'Layering, texture, and proportion are the three things worth thinking about before anything else. Start with a piece you already love, then build outward — a well-fitted blazer over a simple tee, or a bold accessory against a neutral base.',
    "Whatever direction you take it, the goal is the same: clothes that feel like you, not a costume. That's the whole idea behind this season's edit.",
].join('\n\n')

const blogPosts = [
    {
        handle: 'runway-to-reality-adapting-fashion-week-trends', title: 'Runway to Reality: Adapting Fashion Week Trends',
        image: IMG('blog-5.jpg'), author: 'Qodex Web', date: 'November 06, 2023',
        excerpt: "Any, meaning — it doesn't matter what color or print it is. It'll work. Augue...",
    },
    {
        handle: 'chic-and-unique-creating-your-signature-style', title: 'Chic and Unique: Creating Your Signature Style',
        image: IMG('blog-4.jpg'), author: 'Qodex Web', date: 'November 06, 2023',
        excerpt: "Any, meaning — it doesn't matter what color or print it is. It'll work. Augue...",
    },
    {
        handle: 'behind-the-seams-the-making-of-fashions-favorites', title: "Behind the Seams: The Making of Fashion's Favorites",
        image: IMG('blog-3.jpg'), author: 'Qodex Web', date: 'November 06, 2023',
        excerpt: "Any, meaning — it doesn't matter what color or print it is. It'll work. Augue...",
    },
    {
        handle: 'fashion-forward-exploring-future-trends', title: 'Fashion Forward: Exploring Future Trends',
        image: IMG('blog-7.jpg'), author: 'Qodex Web', date: 'November 06, 2023',
        excerpt: "Any, meaning — it doesn't matter what color or print it is. It'll work. Augue...",
    },
    {
        handle: 'wardrobe-essentials-building-a-timeless-collection', title: 'Wardrobe Essentials: Building a Timeless Collection',
        image: IMG('blog-6.jpg'), author: 'Qodex Web', date: 'November 06, 2023',
        excerpt: "Any, meaning — it doesn't matter what color or print it is. It'll work. Augue...",
    },
].map((p) => ({ ...p, content: blogContent }))

const pages = [
    {
        slug: 'about-us', title: 'About Us',
        intro: 'Rosyz is a dynamic and innovative online fashion retailer bringing curated style to customers worldwide.',
        body: [
            { heading: 'Our Story', text: 'Founded with a simple idea — that great style shouldn\'t be complicated — Rosyz curates fashion-forward pieces across menswear, womenswear, accessories and outerwear, sourced from independent labels and design houses we believe in.' },
            { heading: 'Our Promise', text: 'Every piece in our collection is chosen for quality, craftsmanship, and timeless appeal. We work directly with our vendors to bring you honest pricing and fast, reliable shipping wherever you are.' },
            { heading: 'Sustainability', text: 'We\'re continually reviewing our supply chain to favor partners who share our commitment to responsible materials and fair labor practices.' },
        ],
    },
    {
        slug: 'faqs', title: 'FAQs', intro: 'Answers to the questions we hear most often.',
        body: [
            { heading: 'How long does shipping take?', text: 'Standard orders typically arrive within 5–7 business days. Express options are available at checkout.' },
            { heading: 'What is your returns policy?', text: 'We accept returns within 30 days of delivery on unworn items with tags attached — see our Returns Policy page for the full details.' },
            { heading: 'Do you ship internationally?', text: 'Yes — we ship to most countries worldwide. Shipping costs and timelines are calculated at checkout based on destination.' },
            { heading: 'How do I track my order?', text: 'Once your order ships you\'ll receive a confirmation email with a tracking link.' },
            { heading: 'Can I change or cancel my order?', text: 'Contact us as soon as possible after placing your order — we can usually make changes before it ships.' },
        ],
    },
    {
        slug: 'contact', title: 'Contact Us',
        intro: 'We\'d love to hear from you — reach out with any questions about an order, a product, or anything else.',
        body: [
            { heading: 'Phone', text: '+ (08) 9055 0269' },
            { heading: 'Email', text: 'example@example.com' },
            { heading: 'Address', text: '50 Porana Place, West Casuarinas, Western Australia, Australia.' },
        ],
    },
    {
        slug: 'privacy-policy', title: 'Privacy Policy',
        intro: 'Your privacy matters to us. This page explains what information we collect and how we use it.',
        body: [
            { heading: 'Information We Collect', text: 'We collect the information you provide when creating an account, placing an order, or contacting support — such as your name, email, shipping address, and order history.' },
            { heading: 'How We Use It', text: 'We use your information to process orders, provide customer support, and — with your consent — send updates about new arrivals and promotions.' },
            { heading: 'Your Choices', text: 'You can update your account details or unsubscribe from marketing emails at any time.' },
        ],
    },
    {
        slug: 'returns-policy', title: 'Returns Policy', intro: 'Not quite right? We make returns simple.',
        body: [
            { heading: 'Eligibility', text: 'Items may be returned within 30 days of delivery, provided they are unworn, unwashed, and have all original tags attached.' },
            { heading: 'How to Start a Return', text: 'Contact our support team with your order number and we\'ll send you a prepaid return label.' },
            { heading: 'Refunds', text: 'Once received and inspected, refunds are issued to your original payment method within 5–10 business days.' },
        ],
    },
    {
        slug: 'shipping-policy', title: 'Shipping Policy', intro: 'Here\'s what to expect once you place an order.',
        body: [
            { heading: 'Processing Time', text: 'Orders are processed within 1–2 business days.' },
            { heading: 'Delivery Estimates', text: 'Standard shipping: 5–7 business days. Express shipping: 2–3 business days.' },
            { heading: 'Free Shipping', text: 'Orders over $100 qualify for free standard shipping.' },
        ],
    },
    {
        slug: 'terms-conditions', title: 'Terms & Conditions',
        intro: 'The terms below govern your use of the Rosyz website and any purchases made through it.',
        body: [
            { heading: 'Use of Site', text: 'By using this site you agree to browse and shop in accordance with applicable laws and these terms.' },
            { heading: 'Pricing & Availability', text: 'Prices and product availability are subject to change without notice.' },
            { heading: 'Limitation of Liability', text: 'Rosyz is not liable for indirect or consequential damages arising from the use of this site.' },
        ],
    },
    {
        slug: 'size-guide', title: 'Size Guide', intro: 'Find your perfect fit using the general size chart below (measurements in inches).',
        body: [
            { heading: 'Tops (Chest)', text: 'XS: 32–34 · S: 35–37 · M: 38–40 · L: 41–43 · XL: 44–46' },
            { heading: 'Bottoms (Waist)', text: 'XS: 26–28 · S: 29–31 · M: 32–34 · L: 35–37 · XL: 38–40' },
            { heading: 'Shoes', text: 'Sizing runs true to standard US sizing — if you\'re between sizes, we recommend sizing up.' },
        ],
    },
    {
        slug: 'gift-card', title: 'Gift Card', intro: 'Give the gift of great style. Rosyz digital gift cards are delivered by email and never expire.',
        body: [
            { heading: 'How It Works', text: 'Choose an amount, add a personal message, and we\'ll email the gift card straight to the recipient.' },
            { heading: 'Redemption', text: 'Gift cards can be applied at checkout and used across multiple orders until the balance is used up.' },
        ],
    },
    { slug: 'lookbook', title: 'Lookbook', intro: 'A closer look at how we style our favorite pieces this season.', body: [] },
]

async function main() {
    console.log('Seeding admin user…')
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    await prisma.adminUser.upsert({
        where: { username: adminUsername },
        update: {},
        create: { username: adminUsername, passwordHash: await hashPassword(adminPassword), role: 'owner' },
    })

    console.log('Seeding categories…')
    for (const [i, c] of categories.entries()) {
        await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, position: i } })
    }

    console.log('Seeding products…')
    for (const [i, p] of products.entries()) {
        const { swatches, category, ...rest } = p
        await prisma.product.upsert({
            where: { handle: p.handle },
            update: {},
            create: {
                ...rest,
                sizes: JSON.stringify(p.sizes ?? []),
                tabs: JSON.stringify(p.tabs ?? []),
                categorySlug: category,
                position: i,
                swatches: { create: swatches.map((s, si) => ({ ...s, position: si })) },
            },
        })
    }

    console.log('Seeding hero slides…')
    for (const [i, s] of heroSlides.entries()) {
        await prisma.heroSlide.upsert({ where: { id: i + 1 }, update: {}, create: { id: i + 1, ...s, position: i } })
    }

    console.log('Seeding grid banners…')
    for (const [i, b] of gridBanners.entries()) {
        await prisma.gridBanner.upsert({ where: { id: i + 1 }, update: {}, create: { id: i + 1, ...b, position: i } })
    }

    console.log('Seeding spring slides…')
    for (const [i, s] of springSlides.entries()) {
        await prisma.springSlide.upsert({ where: { id: i + 1 }, update: {}, create: { id: i + 1, ...s, position: i } })
    }

    console.log('Seeding testimonials…')
    for (const [i, t] of testimonials.entries()) {
        await prisma.testimonial.upsert({ where: { id: i + 1 }, update: {}, create: { id: i + 1, ...t, position: i } })
    }

    console.log('Seeding instagram images…')
    for (const [i, image] of instagramImages.entries()) {
        await prisma.instagramImage.upsert({ where: { id: i + 1 }, update: {}, create: { id: i + 1, image, position: i } })
    }

    console.log('Seeding recent purchases…')
    for (const [i, r] of recentPurchases.entries()) {
        await prisma.recentPurchase.upsert({ where: { id: i + 1 }, update: {}, create: { id: i + 1, ...r, position: i } })
    }

    console.log('Seeding blog posts…')
    for (const [i, p] of blogPosts.entries()) {
        await prisma.blogPost.upsert({ where: { handle: p.handle }, update: {}, create: { ...p, position: i } })
    }

    console.log('Seeding pages…')
    for (const p of pages) {
        await prisma.page.upsert({
            where: { slug: p.slug },
            update: {},
            create: { slug: p.slug, title: p.title, intro: p.intro, body: JSON.stringify(p.body) },
        })
    }

    console.log('Seeding site settings…')
    await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } })

    console.log('Done.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
