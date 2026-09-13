import 'server-only'
import { v2 as cloudinary } from 'cloudinary'
import { prisma } from '@/lib/db'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

function sanitizeFilename(name: string) {
    return name.replace(/[^a-zA-Z0-9.\-_]/g, '-').toLowerCase()
}

export async function saveUploadedFile(file: File) {
    if (!file || file.size === 0) return null

    const filename = `${Date.now()}-${sanitizeFilename(file.name || 'upload')}`
    const bytes = Buffer.from(await file.arrayBuffer())
    const base64 = `data:${file.type};base64,${bytes.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64, {
        public_id: filename,
        folder: 'media',
    })

    return prisma.media.create({
        data: { url: result.secure_url, filename, altText: '' },
    })
}

export async function listMedia() {
    return prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } })
}

export async function deleteMediaRecord(id: number) {
    const media = await prisma.media.delete({ where: { id } })
    try {
        const parts = media.url.split('/')
        const folderAndFile = parts.slice(parts.indexOf('media')).join('/')
        const publicId = folderAndFile.replace(/\.[^.]+$/, '')
        await cloudinary.uploader.destroy(publicId)
    } catch {
        // file already gone — nothing to clean up
    }
    return media
}
