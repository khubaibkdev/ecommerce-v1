'use client'

import { Field, Input, Textarea, Select, SubmitButton, Card } from '@/components/admin/ui'
import ImagePicker, { type MediaItem } from '@/components/admin/ImagePicker'
import type { BlogPost } from '@/lib/content'

interface BlogPostFormProps {
    action: (formData: FormData) => void
    post?: BlogPost
    media: MediaItem[]
}

const BlogPostForm = ({ action, post, media }: BlogPostFormProps) => (
    <form action={action} className="flex flex-col gap-6">
        <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Title" htmlFor="title">
                <Input id="title" name="title" required defaultValue={post?.title} />
            </Field>
            <Field label="Handle (URL slug)" htmlFor="handle" hint="Leave blank to auto-generate from title.">
                <Input id="handle" name="handle" defaultValue={post?.handle} />
            </Field>
            <Field label="Author" htmlFor="author">
                <Input id="author" name="author" defaultValue={post?.author} />
            </Field>
            <Field label="Date" htmlFor="date" hint="Displayed as-is, e.g. November 06, 2023">
                <Input id="date" name="date" defaultValue={post?.date} />
            </Field>
            <Field label="Status" htmlFor="status">
                <Select id="status" name="status" defaultValue="published">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </Select>
            </Field>
        </Card>

        <Card>
            <ImagePicker name="image" label="Cover Image" defaultValue={post?.image} media={media} />
        </Card>

        <Card className="flex flex-col gap-4">
            <Field label="Excerpt" htmlFor="excerpt" hint="Short summary shown in listings.">
                <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} />
            </Field>
            <Field label="Content" htmlFor="content" hint="Separate paragraphs with a blank line.">
                <Textarea id="content" name="content" rows={10} defaultValue={post?.content} />
            </Field>
        </Card>

        <div>
            <SubmitButton>{post ? 'Save Changes' : 'Create Post'}</SubmitButton>
        </div>
    </form>
)

export default BlogPostForm
