import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { PageHeader, Card, Field, Input, Select, SubmitButton, DeleteButton, Table, Th, Td } from '@/components/admin/ui'
import { createAdminUser, updateAdminPassword, deleteAdminUser } from './actions'

const AdminUsersPage = async () => {
    const [users, session] = await Promise.all([
        prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' } }),
        getSession(),
    ])

    return (
        <div>
            <PageHeader title="Admin Users" description="People who can sign in to this dashboard." />

            <Table>
                <thead>
                    <tr>
                        <Th>Username</Th>
                        <Th>Role</Th>
                        <Th>Change Password</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <Td className="font-medium">
                                {u.username} {u.username === session?.username && <span className="text-xs text-slate-400">(you)</span>}
                            </Td>
                            <Td>{u.role}</Td>
                            <Td>
                                <form action={updateAdminPassword.bind(null, u.id)} className="flex items-center gap-2">
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="New password"
                                        minLength={6}
                                        className="w-40"
                                    />
                                    <SubmitButton variant="secondary">Update</SubmitButton>
                                </form>
                            </Td>
                            <Td>
                                <DeleteButton
                                    action={deleteAdminUser}
                                    confirmText={`Remove admin access for "${u.username}"?`}
                                    label="Remove"
                                    hiddenFields={<input type="hidden" name="id" value={u.id} />}
                                />
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Card className="mt-6 border-dashed">
                <p className="mb-4 text-sm font-medium text-slate-700">Add New Admin</p>
                <form action={createAdminUser} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Username" htmlFor="new-username">
                        <Input id="new-username" name="username" required />
                    </Field>
                    <Field label="Password" htmlFor="new-password" hint="At least 6 characters.">
                        <Input id="new-password" name="password" type="password" minLength={6} required />
                    </Field>
                    <Field label="Role" htmlFor="new-role">
                        <Select id="new-role" name="role" defaultValue="editor">
                            <option value="owner">Owner</option>
                            <option value="editor">Editor</option>
                        </Select>
                    </Field>
                    <div className="md:col-span-3">
                        <SubmitButton>Add Admin</SubmitButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default AdminUsersPage
