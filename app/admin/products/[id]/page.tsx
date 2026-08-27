import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/ui'
import ProductForm from '@/components/admin/ProductForm'
import { getProductByHandle } from '@/lib/products'
import { listMedia } from '@/lib/media'
import { updateProduct } from '../actions'

interface EditProductPageProps {
    params: Promise<{ id: string }>
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
    const { id } = await params
    const productId = Number(id)

    const [row, categories, media] = await Promise.all([
        prisma.product.findUnique({ where: { id: productId } }),
        prisma.category.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
    ])
    if (!row) notFound()

    const product = await getProductByHandle(row.handle)
    if (!product) notFound()

    const boundUpdate = updateProduct.bind(null, productId)

    return (
        <div>
            <PageHeader title={`Edit: ${product.title}`} />
            <ProductForm action={boundUpdate} product={product} categories={categories} media={media} />
        </div>
    )
}

export default EditProductPage
