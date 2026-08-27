import { PageHeader } from '@/components/admin/ui'
import BlogPostForm from '@/components/admin/BlogPostForm'
import { listMedia } from '@/lib/media'
import { createBlogPost } from '../actions'

const NewBlogPostPage = async () => {
    const media = await listMedia()
    return (
        <div>
            <PageHeader title="New Blog Post" />
            <BlogPostForm action={createBlogPost} media={media} />
        </div>
    )
}

export default NewBlogPostPage
