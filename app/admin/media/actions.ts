'use server'

import { requireAdminSession } from '@/lib/session'
import { saveUploadedFile, deleteMediaRecord } from '@/lib/media'
import { revalidatePath } from 'next/cache'

export async function uploadMediaAction(formData: FormData): Promise<{ url: string } | { error: string }> {
    await requireAdminSession()
    const file = formData.get('file')
    if (!(file instanceof File) || file.size === 0) return { error: 'No file provided' }

    const media = await saveUploadedFile(file)
    if (!media) return { error: 'Upload failed' }

    revalidatePath('/admin/media')
    return { url: media.url }
}

export async function uploadMediaFormAction(formData: FormData): Promise<void> {
    await uploadMediaAction(formData)
}

export async function deleteMediaAction(formData: FormData) {
    await requireAdminSession()
    const id = Number(formData.get('id'))
    await deleteMediaRecord(id)
    revalidatePath('/admin/media')
}
