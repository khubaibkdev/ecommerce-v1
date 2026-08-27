import Image from 'next/image'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, DeleteButton, EmptyState } from '@/components/admin/ui'
import { uploadMediaFormAction, deleteMediaAction } from './actions'

const AdminMediaPage = async () => {
    const media = await listMedia()

    return (
        <div>
            <PageHeader title="Media Library" description={`${media.length} file${media.length === 1 ? '' : 's'} uploaded`} />

            <Card className="mb-6">
                <form action={uploadMediaFormAction} className="flex flex-wrap items-center gap-3">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        required
                        className="text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
                    />
                    <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                        Upload
                    </button>
                </form>
                <p className="mt-2 text-xs text-slate-500">
                    Uploaded files are also picked up automatically by the image pickers used across Products, Categories, Homepage, and Blog.
                </p>
            </Card>

            {media.length === 0 ? (
                <EmptyState>No files uploaded yet.</EmptyState>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {media.map((m) => (
                        <Card key={m.id} className="flex flex-col gap-2 p-2">
                            <div className="relative aspect-square overflow-hidden rounded-md bg-slate-100">
                                <Image src={m.url} alt={m.filename} fill sizes="150px" className="object-cover" />
                            </div>
                            <p className="truncate text-xs text-slate-500" title={m.filename}>
                                {m.filename}
                            </p>
                            <DeleteButton
                                action={deleteMediaAction}
                                confirmText="Delete this file? Anything still referencing it will show a broken image."
                                hiddenFields={<input type="hidden" name="id" value={m.id} />}
                            />
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminMediaPage
