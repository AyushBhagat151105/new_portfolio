import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Save, Loader2 } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import type { Contact } from '@/db/schema'

export const Route = createFileRoute('/admin/contact')({
    component: ContactManager,
})

function ContactManager() {
    const [contactId, setContactId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: '',
            phone: '',
            location: '',
            github: '',
            linkedin: '',
            twitter: '',
            website: '',
        },
    })

    useEffect(() => {
        fetchContact()
    }, [])

    async function fetchContact() {
        try {
            const res = await fetch('/api/admin/contact')
            const data: Contact[] = await res.json()
            if (data.length > 0) {
                const contact = data[0]
                setContactId(contact.id)
                reset({
                    email: contact.email || '',
                    phone: contact.phone || '',
                    location: contact.location || '',
                    github: contact.github || '',
                    linkedin: contact.linkedin || '',
                    twitter: contact.twitter || '',
                    website: contact.website || '',
                })
            }
        } catch (error) {
            console.error('Failed to fetch contact:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(data: ContactFormData) {
        setIsSaving(true)
        setMessage(null)

        try {
            const method = contactId ? 'PUT' : 'POST'
            const url = contactId ? `/api/admin/contact?id=${contactId}` : '/api/admin/contact'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                const result = await res.json()
                if (result.length > 0) {
                    setContactId(result[0].id)
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                placeholder="hello@example.com"
                                className="bg-zinc-900 border-zinc-700 text-white"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-400">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-300">Phone</label>
                                <Input
                                    placeholder="+1 (555) 123-4567"
                                    className="bg-zinc-900 border-zinc-700 text-white"
                                    {...register('phone')}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-400">{errors.phone.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-300">Location</label>
                                <Input
                                    placeholder="San Francisco, CA"
                                    className="bg-zinc-900 border-zinc-700 text-white"
                                    {...register('location')}
                                />
                                {errors.location && (
                                    <p className="text-sm text-red-400">{errors.location.message}</p>
                                )}
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
                                    placeholder="https://github.com/username"
                                    className="bg-zinc-900 border-zinc-700 text-white"
                                    {...register('github')}
                                />
                                {errors.github && (
                                    <p className="text-sm text-red-400">{errors.github.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-300">LinkedIn</label>
                                <Input
                                    placeholder="https://linkedin.com/in/username"
                                    className="bg-zinc-900 border-zinc-700 text-white"
                                    {...register('linkedin')}
                                />
                                {errors.linkedin && (
                                    <p className="text-sm text-red-400">{errors.linkedin.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-300">Twitter / X</label>
                                <Input
                                    placeholder="https://twitter.com/username"
                                    className="bg-zinc-900 border-zinc-700 text-white"
                                    {...register('twitter')}
                                />
                                {errors.twitter && (
                                    <p className="text-sm text-red-400">{errors.twitter.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-300">Website</label>
                                <Input
                                    placeholder="https://yoursite.com"
                                    className="bg-zinc-900 border-zinc-700 text-white"
                                    {...register('website')}
                                />
                                {errors.website && (
                                    <p className="text-sm text-red-400">{errors.website.message}</p>
                                )}
                            </div>
                        </div>

                        {message && (
                            <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message.text}
                            </p>
                        )}

                        <Button
                            type="submit"
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
            </form>
        </div>
    )
}
