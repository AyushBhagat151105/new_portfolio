import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2 } from 'lucide-react'
import type { About } from '@/db/schema'

export const Route = createFileRoute('/admin/about')({
    component: AboutManager,
})

function AboutManager() {
    const [about, setAbout] = useState<Partial<About>>({
        title: '',
        description: '',
        image: '',
        resumeUrl: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        fetchAbout()
    }, [])

    async function fetchAbout() {
        try {
            const res = await fetch('/api/admin/about')
            const data = await res.json()
            if (data.length > 0) {
                setAbout(data[0])
            }
        } catch (error) {
            console.error('Failed to fetch about:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave() {
        setIsSaving(true)
        setMessage(null)

        try {
            const method = about.id ? 'PUT' : 'POST'
            const url = about.id ? `/api/admin/about?id=${about.id}` : '/api/admin/about'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(about),
            })

            if (res.ok) {
                const data = await res.json()
                if (data.length > 0) {
                    setAbout(data[0])
                }
                setMessage({ type: 'success', text: 'About section saved successfully!' })
            } else {
                setMessage({ type: 'error', text: 'Failed to save about section' })
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
                <h1 className="text-3xl font-bold text-white">About Section</h1>
                <p className="text-zinc-400 mt-2">
                    Tell visitors about yourself and your background.
                </p>
            </div>

            <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                    <CardTitle className="text-white">About Me</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Share your story and experience
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-300">Section Title</label>
                        <Input
                            value={about.title || ''}
                            onChange={(e) => setAbout({ ...about, title: e.target.value })}
                            placeholder="About Me"
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-300">Description</label>
                        <Textarea
                            value={about.description || ''}
                            onChange={(e) => setAbout({ ...about, description: e.target.value })}
                            placeholder="Write about yourself, your journey, and what you're passionate about..."
                            rows={8}
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-300">Profile Image URL</label>
                        <Input
                            value={about.image || ''}
                            onChange={(e) => setAbout({ ...about, image: e.target.value })}
                            placeholder="https://example.com/your-photo.jpg"
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-300">Resume URL</label>
                        <Input
                            value={about.resumeUrl || ''}
                            onChange={(e) => setAbout({ ...about, resumeUrl: e.target.value })}
                            placeholder="https://example.com/resume.pdf"
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
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
                                Save Changes
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
