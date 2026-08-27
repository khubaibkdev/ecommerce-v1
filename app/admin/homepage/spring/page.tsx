import { prisma } from '@/lib/db'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Select, Checkbox, SubmitButton, DeleteButton, EmptyState } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { createSpringSlide, updateSpringSlide, deleteSpringSlide } from './actions'

const ProductSelect = ({ id, defaultValue, products }: { id: string; defaultValue?: string; products: { handle: string; title: string }[] }) => (
    <Field label="Linked Product" htmlFor={id}>
        <Select id={id} name="productHandle" defaultValue={defaultValue}>
            <option value="" disabled>
                Select a product
            </option>
            {products.map((p) => (
                <option key={p.handle} value={p.handle}>
                    {p.title}
                </option>
            ))}
        </Select>
    </Field>
)

const AdminSpringSlidesPage = async () => {
    const [slides, media, products] = await Promise.all([
        prisma.springSlide.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
        prisma.product.findMany({ select: { handle: true, title: true }, orderBy: { title: 'asc' } }),
    ])

    return (
        <div>
            <PageHeader title="Spring Collection" description="The scrollable lookbook carousel linking to products." />

            <div className="flex flex-col gap-6">
                {slides.map((slide) => (
                    <Card key={slide.id}>
                        <form action={updateSpringSlide.bind(null, slide.id)} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImagePicker name="image" label="Look Image" defaultValue={slide.image} media={media} />
                                <ProductSelect id={`product-${slide.id}`} defaultValue={slide.productHandle} products={products} />
                                <Field label="Callout Top Position" htmlFor={`top-${slide.id}`} hint="e.g. 40%">
                                    <Input id={`top-${slide.id}`} name="topPos" defaultValue={slide.topPos} />
                                </Field>
                                <Field label="Callout Left Position" htmlFor={`left-${slide.id}`} hint="e.g. 10%">
                                    <Input id={`left-${slide.id}`} name="leftPos" defaultValue={slide.leftPos} />
                                </Field>
                                <Field label="Sort Position" htmlFor={`pos-${slide.id}`}>
                                    <Input id={`pos-${slide.id}`} name="position" type="number" defaultValue={slide.position} />
                                </Field>
                            </div>
                            <Checkbox name="active" label="Active (shown on homepage)" defaultChecked={slide.active} />
                            <SubmitButton>Save</SubmitButton>
                        </form>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                            <DeleteButton
                                action={deleteSpringSlide}
                                confirmText="Delete this slide?"
                                hiddenFields={<input type="hidden" name="id" value={slide.id} />}
                            />
                        </div>
                    </Card>
                ))}

                {slides.length === 0 && <EmptyState>No spring collection slides yet — add one below.</EmptyState>}

                <Card className="border-dashed">
                    <p className="mb-4 text-sm font-medium text-slate-700">Add New Slide</p>
                    <form action={createSpringSlide} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <ImagePicker name="image" label="Look Image" media={media} />
                            <ProductSelect id="new-product" products={products} />
                            <Field label="Callout Top Position" htmlFor="new-top" hint="e.g. 40%">
                                <Input id="new-top" name="topPos" defaultValue="40%" />
                            </Field>
                            <Field label="Callout Left Position" htmlFor="new-left" hint="e.g. 10%">
                                <Input id="new-left" name="leftPos" defaultValue="10%" />
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

export default AdminSpringSlidesPage
