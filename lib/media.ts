import 'server-only'
import { mkdir, writeFile, unlink } from 'fs/promises'
import path from 'path'
import { put, del } from '@vercel/blob'
import { prisma } from '@/lib/db'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

function sanitizeFilename(name: string) {
    return name.replace(/[^a-zA-Z0-9.\-_]/g, '-').toLowerCase()
}

export async function saveUploadedFile(file: File) {
    if (!file || file.size === 0) return null

    const filename = `${Date.now()}-${sanitizeFilename(file.name || 'upload')}`

    let url: string
    if (useBlob()) {
        const blob = await put(filename, file, { access: 'public' })
        url = blob.url
    } else {
        await mkdir(UPLOAD_DIR, { recursive: true })
        const bytes = Buffer.from(await file.arrayBuffer())
        await writeFile(path.join(UPLOAD_DIR, filename), bytes)
        url = `/uploads/${filename}`
    }

    return prisma.media.create({ data: { url, filename, altText: '' } })
}

export async function listMedia() {
    return prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } })
}

export async function deleteMediaRecord(id: number) {
    const media = await prisma.media.delete({ where: { id } })
    try {
        if (media.url.startsWith('/uploads/')) {
            await unlink(path.join(UPLOAD_DIR, media.filename))
        } else {
            await del(media.url)
        }
    } catch {
        // file already gone — nothing to clean up
    }
    return media
}
