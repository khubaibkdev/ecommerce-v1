import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/ui'
import BlogPostForm from '@/components/admin/BlogPostForm'
import { listMedia } from '@/lib/media'
import { updateBlogPost } from '../actions'

interface EditBlogPostPageProps {
    params: Promise<{ id: string }>
}

const EditBlogPostPage = async ({ params }: EditBlogPostPageProps) => {
    const { id } = await params
    const postId = Number(id)

    const [post, media] = await Promise.all([
        prisma.blogPost.findUnique({ where: { id: postId } }),
        listMedia(),
    ])
    if (!post) notFound()

    const boundUpdate = updateBlogPost.bind(null, postId)

    return (
        <div>
            <PageHeader title={`Edit: ${post.title}`} />
            <BlogPostForm action={boundUpdate} post={post} media={media} />
        </div>
    )
}

export default EditBlogPostPage
