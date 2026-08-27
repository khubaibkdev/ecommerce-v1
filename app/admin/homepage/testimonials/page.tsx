import { prisma } from '@/lib/db'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Textarea, Checkbox, SubmitButton, DeleteButton, EmptyState } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { createTestimonial, updateTestimonial, deleteTestimonial } from './actions'

const AdminTestimonialsPage = async () => {
    const [testimonials, media] = await Promise.all([
        prisma.testimonial.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
    ])

    return (
        <div>
            <PageHeader title="Testimonials" description="Customer quotes shown in the “From The People” section." />

            <div className="flex flex-col gap-6">
                {testimonials.map((t) => (
                    <Card key={t.id}>
                        <form action={updateTestimonial.bind(null, t.id)} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImagePicker name="image" label="Photo" defaultValue={t.image} media={media} />
                                <Field label="Name" htmlFor={`name-${t.id}`}>
                                    <Input id={`name-${t.id}`} name="name" defaultValue={t.name} />
                                </Field>
                                <Field label="Role" htmlFor={`role-${t.id}`}>
                                    <Input id={`role-${t.id}`} name="role" defaultValue={t.role} />
                                </Field>
                                <Field label="Sort Position" htmlFor={`pos-${t.id}`}>
                                    <Input id={`pos-${t.id}`} name="position" type="number" defaultValue={t.position} />
                                </Field>
                                <Field label="Quote" htmlFor={`quote-${t.id}`}>
                                    <Textarea id={`quote-${t.id}`} name="quote" rows={3} defaultValue={t.quote} />
                                </Field>
                                <Field label="Sub Text" htmlFor={`subtext-${t.id}`}>
                                    <Input id={`subtext-${t.id}`} name="subText" defaultValue={t.subText} />
                                </Field>
                            </div>
                            <Checkbox name="active" label="Active (shown on homepage)" defaultChecked={t.active} />
                            <SubmitButton>Save</SubmitButton>
                        </form>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                            <DeleteButton
                                action={deleteTestimonial}
                                confirmText="Delete this testimonial?"
                                hiddenFields={<input type="hidden" name="id" value={t.id} />}
                            />
                        </div>
                    </Card>
                ))}

                {testimonials.length === 0 && <EmptyState>No testimonials yet — add one below.</EmptyState>}

                <Card className="border-dashed">
                    <p className="mb-4 text-sm font-medium text-slate-700">Add New Testimonial</p>
                    <form action={createTestimonial} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <ImagePicker name="image" label="Photo" media={media} />
                            <Field label="Name" htmlFor="new-name">
                                <Input id="new-name" name="name" />
                            </Field>
                            <Field label="Role" htmlFor="new-role">
                                <Input id="new-role" name="role" />
                            </Field>
                            <Field label="Sort Position" htmlFor="new-pos">
                                <Input id="new-pos" name="position" type="number" defaultValue={testimonials.length} />
                            </Field>
                            <Field label="Quote" htmlFor="new-quote">
                                <Textarea id="new-quote" name="quote" rows={3} />
                            </Field>
                            <Field label="Sub Text" htmlFor="new-subtext">
                                <Input id="new-subtext" name="subText" />
                            </Field>
                        </div>
                        <Checkbox name="active" label="Active (shown on homepage)" defaultChecked />
                        <div>
                            <SubmitButton>Add Testimonial</SubmitButton>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AdminTestimonialsPage
