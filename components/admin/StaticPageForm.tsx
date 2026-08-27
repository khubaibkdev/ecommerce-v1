'use client'

import { useState } from 'react'
import { Field, Input, Textarea, SubmitButton, Card } from '@/components/admin/ui'
import type { StaticPage } from '@/lib/pages'

interface StaticPageFormProps {
    action: (formData: FormData) => void
    page?: StaticPage
}

const StaticPageForm = ({ action, page }: StaticPageFormProps) => {
    const [blocks, setBlocks] = useState(
        (page?.body.length ? page.body : [{ heading: '', text: '' }]).map((b, i) => ({ key: `${i}`, ...b })),
    )

    const addBlock = () => setBlocks((prev) => [...prev, { key: `new-${Date.now()}`, heading: '', text: '' }])
    const removeBlock = (key: string) => setBlocks((prev) => prev.filter((b) => b.key !== key))

    return (
        <form action={action} className="flex flex-col gap-6">
            <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Title" htmlFor="title">
                    <Input id="title" name="title" required defaultValue={page?.title} />
                </Field>
                <Field label="Slug" htmlFor="slug" hint="Leave blank to auto-generate from title. Used in /pages/[slug] URLs.">
                    <Input id="slug" name="slug" defaultValue={page?.slug} />
                </Field>
            </Card>

            <Card>
                <Field label="Intro" htmlFor="intro" hint="Shown under the page title.">
                    <Textarea id="intro" name="intro" rows={2} defaultValue={page?.intro} />
                </Field>
            </Card>

            <Card className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">Content Blocks</p>
                    <button type="button" onClick={addBlock} className="text-sm font-medium text-slate-700 underline">
                        + Add block
                    </button>
                </div>
                {blocks.map((block) => (
                    <div key={block.key} className="flex flex-col gap-3 rounded-md border border-slate-200 p-3">
                        <Field label="Heading" htmlFor={`heading-${block.key}`}>
                            <Input id={`heading-${block.key}`} name="blockHeading" defaultValue={block.heading} />
                        </Field>
                        <Field label="Text" htmlFor={`text-${block.key}`}>
                            <Textarea id={`text-${block.key}`} name="blockText" rows={3} defaultValue={block.text} />
                        </Field>
                        <button type="button" onClick={() => removeBlock(block.key)} className="self-start text-sm font-medium text-red-600 underline">
                            Remove block
                        </button>
                    </div>
                ))}
            </Card>

            <div>
                <SubmitButton>{page ? 'Save Changes' : 'Create Page'}</SubmitButton>
            </div>
        </form>
    )
}

export default StaticPageForm
