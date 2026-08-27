import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PageHeader, LinkButton, Table, Th, Td, EmptyState, DeleteButton } from '@/components/admin/ui'
import { formatPrice } from '@/lib/products'
import { deleteProduct } from './actions'

const AdminProductsPage = async () => {
    const products = await prisma.product.findMany({ orderBy: { position: 'asc' }, include: { category: true } })

    return (
        <div>
            <PageHeader
                title="Products"
                description={`${products.length} product${products.length === 1 ? '' : 's'}`}
                action={<LinkButton href="/admin/products/new">+ Add Product</LinkButton>}
            />

            {products.length === 0 ? (
                <EmptyState>No products yet. Add your first one to get started.</EmptyState>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Product</Th>
                            <Th>Category</Th>
                            <Th>Price</Th>
                            <Th>Status</Th>
                            <Th>Stock</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                                            {p.image && <Image src={p.image} alt={p.title} fill sizes="40px" className="object-cover" />}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate font-medium">{p.title}</span>
                                            <span className="block truncate text-xs text-slate-500">{p.handle}</span>
                                        </span>
                                    </div>
                                </Td>
                                <Td>{p.category.name}</Td>
                                <Td>{formatPrice(p.price)}</Td>
                                <Td>
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                            p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        {p.status}
                                    </span>
                                </Td>
                                <Td>{p.soldOut ? <span className="text-red-600">Sold out</span> : 'In stock'}</Td>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/products/${p.id}`} className="font-medium text-slate-700 underline">
                                            Edit
                                        </Link>
                                        <DeleteButton
                                            action={deleteProduct}
                                            confirmText={`Delete "${p.title}"? This cannot be undone.`}
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

export default AdminProductsPage
