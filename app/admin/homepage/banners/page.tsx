import { prisma } from '@/lib/db'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Textarea, Checkbox, SubmitButton, DeleteButton, EmptyState } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { createGridBanner, updateGridBanner, deleteGridBanner } from './actions'

const AdminGridBannersPage = async () => {
    const [banners, media] = await Promise.all([
        prisma.gridBanner.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
    ])

    return (
        <div>
            <PageHeader title="Grid Banners" description="The two-up promo banners below the category carousel." />

            <div className="flex flex-col gap-6">
                {banners.map((banner) => (
                    <Card key={banner.id}>
                        <form action={updateGridBanner.bind(null, banner.id)} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImagePicker name="image" label="Image" defaultValue={banner.image} media={media} />
                                <Field label="Eyebrow" htmlFor={`eyebrow-${banner.id}`}>
                                    <Input id={`eyebrow-${banner.id}`} name="eyebrow" defaultValue={banner.eyebrow} />
                                </Field>
                                <Field label="Heading Line 1" htmlFor={`h1-${banner.id}`}>
                                    <Input id={`h1-${banner.id}`} name="headingL1" defaultValue={banner.headingL1} />
                                </Field>
                                <Field label="Heading Line 2" htmlFor={`h2-${banner.id}`}>
                                    <Input id={`h2-${banner.id}`} name="headingL2" defaultValue={banner.headingL2} />
                                </Field>
                                <Field label="Text" htmlFor={`text-${banner.id}`}>
                                    <Textarea id={`text-${banner.id}`} name="text" rows={2} defaultValue={banner.text} />
                                </Field>
                                <Field label="Button Link" htmlFor={`href-${banner.id}`}>
                                    <Input id={`href-${banner.id}`} name="buttonHref" defaultValue={banner.buttonHref} />
                                </Field>
                                <Field label="Sort Position" htmlFor={`pos-${banner.id}`}>
                                    <Input id={`pos-${banner.id}`} name="position" type="number" defaultValue={banner.position} />
                                </Field>
                            </div>
                            <Checkbox name="active" label="Active (shown on homepage)" defaultChecked={banner.active} />
                            <SubmitButton>Save</SubmitButton>
                        </form>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                            <DeleteButton
                                action={deleteGridBanner}
                                confirmText="Delete this banner?"
                                hiddenFields={<input type="hidden" name="id" value={banner.id} />}
                            />
                        </div>
                    </Card>
                ))}

                {banners.length === 0 && <EmptyState>No banners yet — add one below.</EmptyState>}

                <Card className="border-dashed">
                    <p className="mb-4 text-sm font-medium text-slate-700">Add New Banner</p>
                    <form action={createGridBanner} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <ImagePicker name="image" label="Image" media={media} />
                            <Field label="Eyebrow" htmlFor="new-eyebrow">
                                <Input id="new-eyebrow" name="eyebrow" />
                            </Field>
                            <Field label="Heading Line 1" htmlFor="new-h1">
                                <Input id="new-h1" name="headingL1" />
                            </Field>
                            <Field label="Heading Line 2" htmlFor="new-h2">
                                <Input id="new-h2" name="headingL2" />
                            </Field>
                            <Field label="Text" htmlFor="new-text">
                                <Textarea id="new-text" name="text" rows={2} />
                            </Field>
                            <Field label="Button Link" htmlFor="new-href">
                                <Input id="new-href" name="buttonHref" defaultValue="/shop/men" />
                            </Field>
                            <Field label="Sort Position" htmlFor="new-pos">
                                <Input id="new-pos" name="position" type="number" defaultValue={banners.length} />
                            </Field>
                        </div>
                        <Checkbox name="active" label="Active (shown on homepage)" defaultChecked />
                        <div>
                            <SubmitButton>Add Banner</SubmitButton>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AdminGridBannersPage
