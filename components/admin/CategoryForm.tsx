'use client'

import { Field, Input, SubmitButton, Card } from '@/components/admin/ui'
import ImagePicker, { type MediaItem } from '@/components/admin/ImagePicker'

interface CategoryFormProps {
    action: (formData: FormData) => void
    category?: { slug: string; name: string; image: string; heroImage: string; position: number }
    media: MediaItem[]
}

const CategoryForm = ({ action, category, media }: CategoryFormProps) => (
    <form action={action} className="flex flex-col gap-6">
        <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Name" htmlFor="name">
                <Input id="name" name="name" required defaultValue={category?.name} />
            </Field>
            <Field label="Slug" htmlFor="slug" hint="Leave blank to auto-generate from name. Used in /shop/[slug] URLs.">
                <Input id="slug" name="slug" defaultValue={category?.slug} />
            </Field>
            <Field label="Sort Position" htmlFor="position" hint="Lower numbers appear first.">
                <Input id="position" name="position" type="number" defaultValue={category?.position ?? 0} />
            </Field>
        </Card>

        <Card className="flex flex-col gap-4">
            <ImagePicker name="image" label="Thumbnail Image" defaultValue={category?.image} media={media} />
            <ImagePicker name="heroImage" label="Hero Banner Image (collection page)" defaultValue={category?.heroImage} media={media} />
        </Card>

        <div>
            <SubmitButton>{category ? 'Save Changes' : 'Create Category'}</SubmitButton>
        </div>
    </form>
)

export default CategoryForm
