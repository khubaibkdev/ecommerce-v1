import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PageHeader, LinkButton, Table, Th, Td, EmptyState, DeleteButton } from '@/components/admin/ui'
import { deleteBlogPost } from './actions'

const AdminBlogPage = async () => {
    const posts = await prisma.blogPost.findMany({ orderBy: { position: 'asc' } })

    return (
        <div>
            <PageHeader
                title="Blog"
                description={`${posts.length} post${posts.length === 1 ? '' : 's'}`}
                action={<LinkButton href="/admin/blog/new">+ New Post</LinkButton>}
            />

            {posts.length === 0 ? (
                <EmptyState>No blog posts yet.</EmptyState>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>Post</Th>
                            <Th>Author</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((p) => (
                            <tr key={p.id}>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                                            {p.image && <Image src={p.image} alt={p.title} fill sizes="40px" className="object-cover" />}
                                        </span>
                                        <span className="font-medium">{p.title}</span>
                                    </div>
                                </Td>
                                <Td>{p.author}</Td>
                                <Td>{p.date}</Td>
                                <Td>
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                            p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        {p.status}
                                    </span>
                                </Td>
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/blog/${p.id}`} className="font-medium text-slate-700 underline">
                                            Edit
                                        </Link>
                                        <DeleteButton
                                            action={deleteBlogPost}
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

export default AdminBlogPage
