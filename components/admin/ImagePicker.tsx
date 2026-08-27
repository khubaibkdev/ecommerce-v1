'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { uploadMediaAction } from '@/app/admin/media/actions'
import { Input } from '@/components/admin/ui'

export interface MediaItem {
    id: number
    url: string
    filename: string
}

interface ImagePickerProps {
    name: string
    label: string
    defaultValue?: string
    media: MediaItem[]
}

const ImagePicker = ({ name, label, defaultValue = '', media }: ImagePickerProps) => {
    const [value, setValue] = useState(defaultValue)
    const [browsing, setBrowsing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        const formData = new FormData()
        formData.set('file', file)
        const result = await uploadMediaAction(formData)
        setUploading(false)
        if ('url' in result) setValue(result.url)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                    {value && <Image src={value} alt="" fill sizes="64px" className="object-cover" />}
                </div>
                <div className="flex-1 space-y-2">
                    <Input name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="/images/... or /uploads/..." />
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                        <label className="cursor-pointer font-medium text-slate-700 underline">
                            {uploading ? 'Uploading…' : 'Upload new'}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
                        </label>
                        <button type="button" onClick={() => setBrowsing((b) => !b)} className="font-medium text-slate-700 underline">
                            {browsing ? 'Hide library' : 'Browse library'}
                        </button>
                    </div>
                </div>
            </div>

            {browsing && (
                <div className="mt-2 grid max-h-56 grid-cols-6 gap-2 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-2 sm:grid-cols-8">
                    {media.length === 0 && <p className="col-span-full py-4 text-center text-xs text-slate-500">No media uploaded yet.</p>}
                    {media.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                                setValue(m.url)
                                setBrowsing(false)
                            }}
                            className="relative aspect-square overflow-hidden rounded border border-transparent hover:border-slate-400"
                            title={m.filename}
                        >
                            <Image src={m.url} alt={m.filename} fill sizes="64px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImagePicker
