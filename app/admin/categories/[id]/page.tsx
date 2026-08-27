import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/ui'
import CategoryForm from '@/components/admin/CategoryForm'
import { listMedia } from '@/lib/media'
import { updateCategory } from '../actions'

interface EditCategoryPageProps {
    params: Promise<{ id: string }>
}

const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
    const { id } = await params
    const categoryId = Number(id)

    const [category, media] = await Promise.all([
        prisma.category.findUnique({ where: { id: categoryId } }),
        listMedia(),
    ])
    if (!category) notFound()

    const boundUpdate = updateCategory.bind(null, categoryId)

    return (
        <div>
            <PageHeader title={`Edit: ${category.name}`} />
            <CategoryForm action={boundUpdate} category={category} media={media} />
        </div>
    )
}

export default EditCategoryPage
