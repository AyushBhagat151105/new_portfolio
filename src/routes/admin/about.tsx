import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2, Upload, FileText, X, ExternalLink } from 'lucide-react'
import { aboutSchema, type AboutFormData } from '@/lib/schemas'
import type { About } from '@/db/schema'

export const Route = createFileRoute('/admin/about')({
    component: AboutManager,
})

function AboutManager() {
    const [aboutId, setAboutId] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [resumeFileName, setResumeFileName] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AboutFormData>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
            title: '',
            description: '',
            image: '',
            resumeUrl: '',
        },
    })

    const resumeUrl = watch('resumeUrl')

    useEffect(() => {
        fetchAbout()
    }, [])

    async function fetchAbout() {
        try {
            const res = await fetch('/api/admin/about')
            const data: About[] = await res.json()
            if (data.length > 0) {
                const about = data[0]
                setAboutId(about.id)
                reset({
                    title: about.title || '',
                    description: about.description || '',
                    image: about.image || '',
                    resumeUrl: about.resumeUrl || '',
                })
                // Extract filename from URL if exists
                if (about.resumeUrl) {
                    const urlParts = about.resumeUrl.split('/')
                    setResumeFileName(urlParts[urlParts.length - 1] || 'Resume')
                }
            }
        } catch (error) {
            console.error('Failed to fetch about:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(data: AboutFormData) {
        setIsSaving(true)
        setMessage(null)

        try {
            const method = aboutId ? 'PUT' : 'POST'
            const url = aboutId ? `/api/admin/about?id=${aboutId}` : '/api/admin/about'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                const result = await res.json()
                if (result.length > 0) {
                    setAboutId(result[0].id)
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

    async function handleResumeUpload(file: File) {
        setIsUploading(true)
        setMessage(null)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (data.url) {
                setValue('resumeUrl', data.url)
                setResumeFileName(file.name)
                setMessage({ type: 'success', text: 'Resume uploaded successfully!' })
            } else {
                setMessage({ type: 'error', text: 'Failed to upload resume' })
            }
        } catch (error) {
            console.error('Upload failed:', error)
            setMessage({ type: 'error', text: 'Failed to upload resume' })
        } finally {
            setIsUploading(false)
        }
    }

    function removeResume() {
        setValue('resumeUrl', '')
        setResumeFileName(null)
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
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">Section Title</label>
                            <Input
                                placeholder="About Me"
                                className="bg-zinc-900 border-zinc-700 text-white"
                                {...register('title')}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-400">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-zinc-300">Description *</label>
                            <Textarea
                                placeholder="Write about yourself, your journey, and what you're passionate about..."
                                rows={8}
                                className="bg-zinc-900 border-zinc-700 text-white"
                                {...register('description')}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-400">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Resume Upload Section */}
                        <div className="space-y-3">
                            <label className="text-sm text-zinc-300">Resume / CV</label>

                            {resumeUrl ? (
                                <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
                                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white font-medium truncate">
                                            {resumeFileName || 'Resume'}
                                        </p>
                                        <p className="text-xs text-zinc-500">Uploaded successfully</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                                            title="View Resume"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={removeResume}
                                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 rounded-lg transition-colors"
                                            title="Remove Resume"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="cursor-pointer block">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleResumeUpload(file)
                                        }}
                                    />
                                    <div className="flex flex-col items-center justify-center gap-3 p-6 bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-lg hover:border-cyan-500/50 hover:bg-zinc-800/50 transition-colors">
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                                                <p className="text-sm text-zinc-400">Uploading resume...</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                                                    <Upload className="h-6 w-6 text-zinc-400" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm text-white font-medium">
                                                        Click to upload your resume
                                                    </p>
                                                    <p className="text-xs text-zinc-500 mt-1">
                                                        PDF, DOC, or DOCX (Max 10MB)
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </label>
                            )}
                            <input type="hidden" {...register('resumeUrl')} />
                            {errors.resumeUrl && (
                                <p className="text-sm text-red-400">{errors.resumeUrl.message}</p>
                            )}
                        </div>

                        {/* Hidden image field - keeping for schema compatibility */}
                        <input type="hidden" {...register('image')} />

                        {message && (
                            <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message.text}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={isSaving || isUploading}
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
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
