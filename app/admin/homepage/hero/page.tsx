import { prisma } from '@/lib/db'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Textarea, Select, Checkbox, SubmitButton, DeleteButton, EmptyState } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { createHeroSlide, updateHeroSlide, deleteHeroSlide } from './actions'

const AdminHeroSlidesPage = async () => {
    const [slides, media] = await Promise.all([
        prisma.heroSlide.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
    ])

    return (
        <div>
            <PageHeader title="Hero Slideshow" description="The full-width slideshow at the top of the homepage." />

            <div className="flex flex-col gap-6">
                {slides.map((slide) => (
                    <Card key={slide.id}>
                        <form action={updateHeroSlide.bind(null, slide.id)} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImagePicker name="image" label="Image" defaultValue={slide.image} media={media} />
                                <Field label="Eyebrow" htmlFor={`eyebrow-${slide.id}`}>
                                    <Input id={`eyebrow-${slide.id}`} name="eyebrow" defaultValue={slide.eyebrow} />
                                </Field>
                                <Field label="Heading Line 1" htmlFor={`h1-${slide.id}`}>
                                    <Input id={`h1-${slide.id}`} name="headingL1" defaultValue={slide.headingL1} />
                                </Field>
                                <Field label="Heading Line 2" htmlFor={`h2-${slide.id}`}>
                                    <Input id={`h2-${slide.id}`} name="headingL2" defaultValue={slide.headingL2} />
                                </Field>
                                <Field label="Subheading" htmlFor={`sub-${slide.id}`}>
                                    <Textarea id={`sub-${slide.id}`} name="subheading" rows={2} defaultValue={slide.subheading} />
                                </Field>
                                <Field label="Button Link" htmlFor={`href-${slide.id}`}>
                                    <Input id={`href-${slide.id}`} name="buttonHref" defaultValue={slide.buttonHref} />
                                </Field>
                                <Field label="Text Alignment" htmlFor={`align-${slide.id}`}>
                                    <Select id={`align-${slide.id}`} name="align" defaultValue={slide.align}>
                                        <option value="center">Center</option>
                                        <option value="right">Right</option>
                                    </Select>
                                </Field>
                                <Field label="Sort Position" htmlFor={`pos-${slide.id}`}>
                                    <Input id={`pos-${slide.id}`} name="position" type="number" defaultValue={slide.position} />
                                </Field>
                            </div>
                            <Checkbox name="active" label="Active (shown on homepage)" defaultChecked={slide.active} />
                            <div className="flex items-center gap-3">
                                <SubmitButton>Save</SubmitButton>
                            </div>
                        </form>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                            <DeleteButton
                                action={deleteHeroSlide}
                                confirmText="Delete this hero slide?"
                                hiddenFields={<input type="hidden" name="id" value={slide.id} />}
                            />
                        </div>
                    </Card>
                ))}

                {slides.length === 0 && <EmptyState>No hero slides yet — add one below.</EmptyState>}

                <Card className="border-dashed">
                    <p className="mb-4 text-sm font-medium text-slate-700">Add New Slide</p>
                    <form action={createHeroSlide} className="flex flex-col gap-4">
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
                            <Field label="Subheading" htmlFor="new-sub">
                                <Textarea id="new-sub" name="subheading" rows={2} />
                            </Field>
                            <Field label="Button Link" htmlFor="new-href">
                                <Input id="new-href" name="buttonHref" defaultValue="/shop/men" />
                            </Field>
                            <Field label="Text Alignment" htmlFor="new-align">
                                <Select id="new-align" name="align" defaultValue="center">
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </Select>
                            </Field>
                            <Field label="Sort Position" htmlFor="new-pos">
                                <Input id="new-pos" name="position" type="number" defaultValue={slides.length} />
                            </Field>
                        </div>
                        <Checkbox name="active" label="Active (shown on homepage)" defaultChecked />
                        <div>
                            <SubmitButton>Add Slide</SubmitButton>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AdminHeroSlidesPage
