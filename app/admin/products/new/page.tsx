import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/ui'
import ProductForm from '@/components/admin/ProductForm'
import { listMedia } from '@/lib/media'
import { createProduct } from '../actions'

const NewProductPage = async () => {
    const [categories, media] = await Promise.all([
        prisma.category.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
    ])

    return (
        <div>
            <PageHeader title="Add Product" />
            <ProductForm action={createProduct} categories={categories} media={media} />
        </div>
    )
}

export default NewProductPage
