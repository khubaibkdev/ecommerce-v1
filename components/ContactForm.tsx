'use client'

import React, { useState } from 'react'

const ContactForm = () => {
    const [sent, setSent] = useState(false)

    if (sent) {
        return (
            <div
                className="flex flex-col items-center justify-center gap-2 rounded-2xl p-6 text-center"
                style={{ backgroundColor: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
            >
                <p className="font-semibold" style={{ color: 'var(--g-color-heading)' }}>
                    Thanks for reaching out!
                </p>
                <p className="text-sm opacity-70">We&apos;ll get back to you as soon as we can.</p>
            </div>
        )
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
            }}
            className="space-y-4 rounded-2xl p-6"
            style={{ backgroundColor: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
        >
            <input
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: 'var(--g-input-border)', backgroundColor: 'var(--g-input-bg)' }}
            />
            <input
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: 'var(--g-input-border)', backgroundColor: 'var(--g-input-bg)' }}
            />
            <textarea
                required
                placeholder="Message"
                rows={4}
                className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: 'var(--g-input-border)', backgroundColor: 'var(--g-input-bg)' }}
            />
            <button type="submit" className="btn-theme w-full">
                Send Message
            </button>
        </form>
    )
}

export default ContactForm
