import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Save, Loader2 } from 'lucide-react'
import type { Contact } from '@/db/schema'

export const Route = createFileRoute('/admin/contact')({
    component: ContactManager,
})

function ContactManager() {
    const [contact, setContact] = useState<Partial<Contact>>({
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        fetchContact()
    }, [])

    async function fetchContact() {
        try {
            const res = await fetch('/api/admin/contact')
            const data = await res.json()
            if (data.length > 0) {
                setContact(data[0])
            }
        } catch (error) {
            console.error('Failed to fetch contact:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave() {
        setIsSaving(true)
        setMessage(null)

        try {
            const method = contact.id ? 'PUT' : 'POST'
            const url = contact.id ? `/api/admin/contact?id=${contact.id}` : '/api/admin/contact'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            })

            if (res.ok) {
                const data = await res.json()
                if (data.length > 0) {
                    setContact(data[0])
                }
                setMessage({ type: 'success', text: 'Contact information saved successfully!' })
            } else {
                setMessage({ type: 'error', text: 'Failed to save contact information' })
            }
        } catch {
            setMessage({ type: 'error', text: 'An error occurred while saving' })
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold text-white">Contact Information</h1>
                <p className="text-zinc-400 mt-2">
                    How can potential clients and employers reach you?
                </p>
            </div>

            <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                    <CardTitle className="text-white">Contact Details</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Your email, phone, and location
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-300">Email</label>
                        <Input
                            type="email"
                            value={contact.email || ''}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            placeholder="hello@example.com"
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">Phone</label>
                            <Input
                                value={contact.phone || ''}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                placeholder="+1 (555) 123-4567"
                                className="bg-zinc-900 border-zinc-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">Location</label>
                            <Input
                                value={contact.location || ''}
                                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                                placeholder="San Francisco, CA"
                                className="bg-zinc-900 border-zinc-700 text-white"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                    <CardTitle className="text-white">Social Links</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Your social media and professional profiles
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">GitHub</label>
                            <Input
                                value={contact.github || ''}
                                onChange={(e) => setContact({ ...contact, github: e.target.value })}
                                placeholder="https://github.com/username"
                                className="bg-zinc-900 border-zinc-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">LinkedIn</label>
                            <Input
                                value={contact.linkedin || ''}
                                onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                                placeholder="https://linkedin.com/in/username"
                                className="bg-zinc-900 border-zinc-700 text-white"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">Twitter / X</label>
                            <Input
                                value={contact.twitter || ''}
                                onChange={(e) => setContact({ ...contact, twitter: e.target.value })}
                                placeholder="https://twitter.com/username"
                                className="bg-zinc-900 border-zinc-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">Website</label>
                            <Input
                                value={contact.website || ''}
                                onChange={(e) => setContact({ ...contact, website: e.target.value })}
                                placeholder="https://yoursite.com"
                                className="bg-zinc-900 border-zinc-700 text-white"
                            />
                        </div>
                    </div>

                    {message && (
                        <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {message.text}
                        </p>
                    )}

                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-white text-zinc-900 hover:bg-zinc-200"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Contact Info
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
