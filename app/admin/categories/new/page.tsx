import { PageHeader } from '@/components/admin/ui'
import CategoryForm from '@/components/admin/CategoryForm'
import { listMedia } from '@/lib/media'
import { createCategory } from '../actions'

const NewCategoryPage = async () => {
    const media = await listMedia()
    return (
        <div>
            <PageHeader title="Add Category" />
            <CategoryForm action={createCategory} media={media} />
        </div>
    )
}

export default NewCategoryPage
