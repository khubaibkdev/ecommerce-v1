import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PageHeader, LinkButton, Table, Th, Td, EmptyState, DeleteButton } from '@/components/admin/ui'
import { deleteCategory } from './actions'

const AdminCategoriesPage = async () => {
    const categories = await prisma.category.findMany({
        orderBy: { position: 'asc' },
        include: { _count: { select: { products: true } } },
    })

    return (
        <div>
            <PageHeader
                title="Categories"
                description={`${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}`}
                action={<LinkButton href="/admin/categories/new">+ Add Category</LinkButton>}
            />

            {categories.length === 0 ? (
                <EmptyState>No categories yet.</EmptyState>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Category</Th>
                            <Th>Slug</Th>
                            <Th>Products</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={c.id}>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                                            {c.image && <Image src={c.image} alt={c.name} fill sizes="40px" className="object-cover" />}
                                        </span>
                                        <span className="font-medium">{c.name}</span>
                                    </div>
                                </Td>
                                <Td>{c.slug}</Td>
                                <Td>{c._count.products}</Td>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/categories/${c.id}`} className="font-medium text-slate-700 underline">
                                            Edit
                                        </Link>
                                        <DeleteButton
                                            action={deleteCategory}
                                            confirmText={`Delete "${c.name}"?`}
                                            hiddenFields={<input type="hidden" name="id" value={c.id} />}
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

export default AdminCategoriesPage
