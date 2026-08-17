import React from 'react';
import CategoryHero from '@/components/CategoryHero';
import ProductSection from '@/components/ProductSection';


interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

const CategoryPage = async ({ params }: PageProps) => {

    const { category } = await params;


    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <>
            <CategoryHero
                title={categoryName}
                description={`Embrace the beauty of the season with our curated ${categoryName.toLowerCase()} collection.`}
                image={`/images/${category}.png`}
            />

            <ProductSection />
        </>
    )
}

export default CategoryPage