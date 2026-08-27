import { prisma } from '@/lib/db'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Select, Checkbox, SubmitButton, DeleteButton, EmptyState } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { createRecentPurchase, updateRecentPurchase, deleteRecentPurchase } from './actions'

const AdminRecentPurchasesPage = async () => {
    const [entries, media, products] = await Promise.all([
        prisma.recentPurchase.findMany({ orderBy: { position: 'asc' } }),
        listMedia(),
        prisma.product.findMany({ select: { handle: true, title: true }, orderBy: { title: 'asc' } }),
    ])

    return (
        <div>
            <PageHeader
                title="Recent Purchase Notifications"
                description="The “Someone recently bought…” popup shown to storefront visitors. Turn it off entirely in Site Settings."
            />

            <div className="flex flex-col gap-6">
                {entries.map((entry) => (
                    <Card key={entry.id}>
                        <form action={updateRecentPurchase.bind(null, entry.id)} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImagePicker name="image" label="Image" defaultValue={entry.image} media={media} />
                                <Field label="Display Title" htmlFor={`title-${entry.id}`}>
                                    <Input id={`title-${entry.id}`} name="title" defaultValue={entry.title} />
                                </Field>
                                <Field label="Linked Product" htmlFor={`handle-${entry.id}`}>
                                    <Select id={`handle-${entry.id}`} name="handle" defaultValue={entry.handle}>
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
                                <Field label="Location" htmlFor={`loc-${entry.id}`} hint="e.g. in Paris, France">
                                    <Input id={`loc-${entry.id}`} name="location" defaultValue={entry.location} />
                                </Field>
                                <Field label="Time Label" htmlFor={`time-${entry.id}`} hint="e.g. about 19 minutes ago">
                                    <Input id={`time-${entry.id}`} name="timeLabel" defaultValue={entry.timeLabel} />
                                </Field>
                                <Field label="Sort Position" htmlFor={`pos-${entry.id}`}>
                                    <Input id={`pos-${entry.id}`} name="position" type="number" defaultValue={entry.position} />
                                </Field>
                            </div>
                            <Checkbox name="active" label="Active" defaultChecked={entry.active} />
                            <SubmitButton>Save</SubmitButton>
                        </form>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                            <DeleteButton
                                action={deleteRecentPurchase}
                                confirmText="Delete this notification?"
                                hiddenFields={<input type="hidden" name="id" value={entry.id} />}
                            />
                        </div>
                    </Card>
                ))}

                {entries.length === 0 && <EmptyState>No entries yet — add one below.</EmptyState>}

                <Card className="border-dashed">
                    <p className="mb-4 text-sm font-medium text-slate-700">Add New Notification</p>
                    <form action={createRecentPurchase} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <ImagePicker name="image" label="Image" media={media} />
                            <Field label="Display Title" htmlFor="new-title">
                                <Input id="new-title" name="title" />
                            </Field>
                            <Field label="Linked Product" htmlFor="new-handle">
                                <Select id="new-handle" name="handle">
                                    <option value="" disabled selected>
                                        Select a product
                                    </option>
                                    {products.map((p) => (
                                        <option key={p.handle} value={p.handle}>
                                            {p.title}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                            <Field label="Location" htmlFor="new-loc" hint="e.g. in Paris, France">
                                <Input id="new-loc" name="location" />
                            </Field>
                            <Field label="Time Label" htmlFor="new-time" hint="e.g. about 19 minutes ago">
                                <Input id="new-time" name="timeLabel" />
                            </Field>
                            <Field label="Sort Position" htmlFor="new-pos">
                                <Input id="new-pos" name="position" type="number" defaultValue={entries.length} />
                            </Field>
                        </div>
                        <Checkbox name="active" label="Active" defaultChecked />
                        <div>
                            <SubmitButton>Add Notification</SubmitButton>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AdminRecentPurchasesPage
