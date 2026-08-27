import { prisma } from '@/lib/db'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Checkbox, SubmitButton, DeleteButton, EmptyState } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { createInstagramImage, updateInstagramImage, deleteInstagramImage } from './actions'

const AdminInstagramPage = async () => {
    const [images, media] = await Promise.all([
        prisma.instagramImage.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
    ])

    return (
        <div>
            <PageHeader title="Instagram Gallery" description="The “Follow Us” image grid at the bottom of the homepage." />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((img) => (
                    <Card key={img.id}>
                        <form action={updateInstagramImage.bind(null, img.id)} className="flex flex-col gap-4">
                            <ImagePicker name="image" label="Image" defaultValue={img.image} media={media} />
                            <Field label="Link" htmlFor={`link-${img.id}`}>
                                <Input id={`link-${img.id}`} name="link" defaultValue={img.link} />
                            </Field>
                            <Field label="Sort Position" htmlFor={`pos-${img.id}`}>
                                <Input id={`pos-${img.id}`} name="position" type="number" defaultValue={img.position} />
                            </Field>
                            <Checkbox name="active" label="Active" defaultChecked={img.active} />
                            <SubmitButton>Save</SubmitButton>
                        </form>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                            <DeleteButton
                                action={deleteInstagramImage}
                                confirmText="Delete this image?"
                                hiddenFields={<input type="hidden" name="id" value={img.id} />}
                            />
                        </div>
                    </Card>
                ))}

                {images.length === 0 && <EmptyState>No images yet — add one below.</EmptyState>}

                <Card className="border-dashed">
                    <p className="mb-4 text-sm font-medium text-slate-700">Add New Image</p>
                    <form action={createInstagramImage} className="flex flex-col gap-4">
                        <ImagePicker name="image" label="Image" media={media} />
                        <Field label="Link" htmlFor="new-link">
                            <Input id="new-link" name="link" defaultValue="#" />
                        </Field>
                        <Field label="Sort Position" htmlFor="new-pos">
                            <Input id="new-pos" name="position" type="number" defaultValue={images.length} />
                        </Field>
                        <Checkbox name="active" label="Active" defaultChecked />
                        <div>
                            <SubmitButton>Add Image</SubmitButton>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AdminInstagramPage
