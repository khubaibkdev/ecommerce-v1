'use client'

import React from 'react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

const baseFieldClass =
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500'

export const Field = ({
    label,
    htmlFor,
    hint,
    children,
}: {
    label: string
    htmlFor?: string
    hint?: string
    children: React.ReactNode
}) => (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
            {label}
        </label>
        {children}
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
)

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`${baseFieldClass} ${props.className ?? ''}`} />
)

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className={`${baseFieldClass} ${props.className ?? ''}`} />
)

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select {...props} className={`${baseFieldClass} ${props.className ?? ''}`} />
)

export const Checkbox = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" {...props} className="h-4 w-4 rounded border-slate-300 text-slate-900" />
        {label}
    </label>
)

const buttonVariants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-700',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants
}

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
    <button
        {...props}
        className={`inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${buttonVariants[variant]} ${className ?? ''}`}
    />
)

export const LinkButton = ({
    href,
    variant = 'primary',
    className,
    children,
}: {
    href: string
    variant?: keyof typeof buttonVariants
    className?: string
    children: React.ReactNode
}) => (
    <Link
        href={href}
        className={`inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${buttonVariants[variant]} ${className ?? ''}`}
    >
        {children}
    </Link>
)

export const SubmitButton = ({ children, variant = 'primary' }: { children: React.ReactNode; variant?: keyof typeof buttonVariants }) => {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" variant={variant} disabled={pending}>
            {pending ? 'Saving…' : children}
        </Button>
    )
}

export const DeleteButton = ({
    action,
    confirmText = 'Delete this item? This cannot be undone.',
    label = 'Delete',
    hiddenFields,
}: {
    action: (formData: FormData) => void
    confirmText?: string
    label?: string
    hiddenFields?: React.ReactNode
}) => (
    <form
        action={action}
        onSubmit={(e) => {
            if (!confirm(confirmText)) e.preventDefault()
        }}
    >
        {hiddenFields}
        <Button type="submit" variant="danger">
            {label}
        </Button>
    </form>
)

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-lg border border-slate-200 bg-white p-6 shadow-sm ${className ?? ''}`}>{children}</div>
)

export const PageHeader = ({
    title,
    description,
    action,
}: {
    title: string
    description?: string
    action?: React.ReactNode
}) => (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {action}
    </div>
)

export const Table = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
)

export const Th = ({ children }: { children: React.ReactNode }) => (
    <th className="border-b border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-600">{children}</th>
)

export const Td = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <td className={`border-b border-slate-100 px-4 py-3 align-middle text-slate-800 ${className ?? ''}`}>{children}</td>
)

export const EmptyState = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
        {children}
    </div>
)
