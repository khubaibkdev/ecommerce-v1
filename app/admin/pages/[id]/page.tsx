import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/ui'
import StaticPageForm from '@/components/admin/StaticPageForm'
import { updatePage } from '../actions'

interface EditPagePageProps {
    params: Promise<{ id: string }>
}

const EditPagePage = async ({ params }: EditPagePageProps) => {
    const { id } = await params
    const pageId = Number(id)

    const row = await prisma.page.findUnique({ where: { id: pageId } })
    if (!row) notFound()

    const page = { slug: row.slug, title: row.title, intro: row.intro, body: JSON.parse(row.body || '[]') }
    const boundUpdate = updatePage.bind(null, pageId)

    return (
        <div>
            <PageHeader title={`Edit: ${page.title}`} />
            <StaticPageForm action={boundUpdate} page={page} />
        </div>
    )
}

export default EditPagePage
