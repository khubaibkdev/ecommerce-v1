import { PageHeader } from '@/components/admin/ui'
import StaticPageForm from '@/components/admin/StaticPageForm'
import { createPage } from '../actions'

const NewPagePage = () => (
    <div>
        <PageHeader title="Add Page" />
        <StaticPageForm action={createPage} />
    </div>
)

export default NewPagePage
