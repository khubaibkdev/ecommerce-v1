import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PageHeader, LinkButton, Table, Th, Td, EmptyState, DeleteButton } from '@/components/admin/ui'
import { deletePage } from './actions'

const AdminPagesPage = async () => {
    const pages = await prisma.page.findMany({ orderBy: { title: 'asc' } })

    return (
        <div>
            <PageHeader
                title="Pages"
                description={`${pages.length} page${pages.length === 1 ? '' : 's'} — About, FAQs, Policies, etc.`}
                action={<LinkButton href="/admin/pages/new">+ Add Page</LinkButton>}
            />

            {pages.length === 0 ? (
                <EmptyState>No pages yet.</EmptyState>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Title</Th>
                            <Th>Slug</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((p) => (
                            <tr key={p.id}>
                                <Td className="font-medium">{p.title}</Td>
                                <Td>/pages/{p.slug}</Td>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/pages/${p.id}`} className="font-medium text-slate-700 underline">
                                            Edit
                                        </Link>
                                        <DeleteButton
                                            action={deletePage}
                                            confirmText={`Delete "${p.title}"?`}
                                            hiddenFields={<input type="hidden" name="id" value={p.id} />}
                                        />
                                    </div>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default AdminPagesPage
