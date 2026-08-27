'use client'

import { useState } from 'react'
import { Field, Input, Textarea, Select, Checkbox, SubmitButton, Card } from '@/components/admin/ui'
import ImagePicker, { type MediaItem } from '@/components/admin/ImagePicker'
import type { Product } from '@/lib/products'

interface CategoryOption {
    slug: string
    name: string
}

interface ProductFormProps {
    action: (formData: FormData) => void
    product?: Product
    categories: CategoryOption[]
    media: MediaItem[]
}

const SIZE_OPTIONS = ['S', 'M', 'L'] as const
const TAB_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'new-arrival', label: 'New Arrival' },
    { value: 'best-seller', label: 'Best Seller' },
]

const ProductForm = ({ action, product, categories, media }: ProductFormProps) => {
    const [swatches, setSwatches] = useState(
        (product?.swatches || []).map((s, i) => ({ key: `existing-${i}`, ...s })),
    )

    const addSwatch = () => {
        setSwatches((prev) => [...prev, { key: `new-${Date.now()}`, name: '', color: '#000000', image: '' }])
    }

    const removeSwatch = (key: string) => {
        setSwatches((prev) => prev.filter((s) => s.key !== key))
    }

    return (
        <form action={action} className="flex flex-col gap-6">
            <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Title" htmlFor="title">
                    <Input id="title" name="title" required defaultValue={product?.title} />
                </Field>
                <Field label="Handle (URL slug)" htmlFor="handle" hint="Leave blank to auto-generate from title.">
                    <Input id="handle" name="handle" defaultValue={product?.handle} placeholder="auto-generated-from-title" />
                </Field>
                <Field label="Vendor" htmlFor="vendor">
                    <Input id="vendor" name="vendor" defaultValue={product?.vendor} />
                </Field>
                <Field label="Product Type" htmlFor="productType" hint="e.g. Shirt, Jacket, Dress">
                    <Input id="productType" name="productType" defaultValue={product?.productType} />
                </Field>
                <Field label="Category" htmlFor="category">
                    <Select id="category" name="category" required defaultValue={product?.category}>
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>
                                {c.name}
                            </option>
                        ))}
                    </Select>
                </Field>
                <Field label="Status" htmlFor="status">
                    <Select id="status" name="status" defaultValue="published">
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </Select>
                </Field>
                <Field label="Price" htmlFor="price">
                    <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={product?.price} />
                </Field>
                <Field label="Compare-at Price" htmlFor="compareAtPrice" hint="Optional — shown as a strikethrough price.">
                    <Input id="compareAtPrice" name="compareAtPrice" type="number" step="0.01" min="0" defaultValue={product?.compareAtPrice} />
                </Field>
                <Field label="Reviews Count" htmlFor="reviews">
                    <Input id="reviews" name="reviews" type="number" min="0" defaultValue={product?.reviews ?? 0} />
                </Field>
                <Field label="Rating (0-5)" htmlFor="rating">
                    <Input id="rating" name="rating" type="number" min="0" max="5" defaultValue={product?.rating ?? 0} />
                </Field>
            </Card>

            <Card className="flex flex-col gap-4">
                <ImagePicker name="image" label="Main Image" defaultValue={product?.image} media={media} />
                <ImagePicker name="hoverImage" label="Hover Image" defaultValue={product?.hoverImage} media={media} />
            </Card>

            <Card className="flex flex-col gap-4">
                <Field label="Description" htmlFor="description">
                    <Textarea id="description" name="description" rows={5} defaultValue={product?.description} />
                </Field>
            </Card>

            <Card className="flex flex-col gap-4">
                <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">Sizes</p>
                    <div className="flex gap-4">
                        {SIZE_OPTIONS.map((size) => (
                            <Checkbox key={size} name="sizes" value={size} label={size} defaultChecked={product?.sizes?.includes(size)} />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">Homepage Tabs</p>
                    <div className="flex flex-wrap gap-4">
                        {TAB_OPTIONS.map((tab) => (
                            <Checkbox
                                key={tab.value}
                                name="tabs"
                                value={tab.value}
                                label={tab.label}
                                defaultChecked={product?.tabs?.includes(tab.value as never)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-6">
                    <Checkbox name="soldOut" label="Sold out" defaultChecked={product?.soldOut} />
                    <Checkbox name="countdown" label="Show countdown badge" defaultChecked={product?.countdown} />
                </div>
            </Card>

            <Card className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700">Color Swatches</p>
                    <button type="button" onClick={addSwatch} className="text-sm font-medium text-slate-700 underline">
                        + Add swatch
                    </button>
                </div>
                {swatches.length === 0 && <p className="text-xs text-slate-500">No swatches — this product will show a single image only.</p>}
                {swatches.map((swatch) => (
                    <div key={swatch.key} className="grid grid-cols-1 gap-3 rounded-md border border-slate-200 p-3 sm:grid-cols-[1fr_120px_auto]">
                        <Field label="Name" htmlFor={`swatch-name-${swatch.key}`}>
                            <Input id={`swatch-name-${swatch.key}`} name="swatchName" defaultValue={swatch.name} placeholder="Black" />
                        </Field>
                        <Field label="Color" htmlFor={`swatch-color-${swatch.key}`}>
                            <Input id={`swatch-color-${swatch.key}`} name="swatchColor" type="color" defaultValue={swatch.color} className="h-10 p-1" />
                        </Field>
                        <div className="flex items-end">
                            <button type="button" onClick={() => removeSwatch(swatch.key)} className="text-sm font-medium text-red-600 underline">
                                Remove
                            </button>
                        </div>
                        <div className="sm:col-span-3">
                            <ImagePicker name="swatchImage" label="Swatch Image" defaultValue={swatch.image} media={media} />
                        </div>
                    </div>
                ))}
            </Card>

            <Card className="grid grid-cols-1 gap-4">
                <Field label="SEO Title" htmlFor="seoTitle" hint="Optional — overrides the page title for search engines.">
                    <Input id="seoTitle" name="seoTitle" defaultValue={product?.title} />
                </Field>
                <Field label="SEO Description" htmlFor="seoDescription">
                    <Textarea id="seoDescription" name="seoDescription" rows={3} />
                </Field>
            </Card>

            <div>
                <SubmitButton>{product ? 'Save Changes' : 'Create Product'}</SubmitButton>
            </div>
        </form>
    )
}

export default ProductForm
