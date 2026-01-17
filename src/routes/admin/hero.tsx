import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2, Upload, User, X } from 'lucide-react'
import { heroSchema, type HeroFormData } from '@/lib/schemas'
import type { Hero } from '@/db/schema'

export const Route = createFileRoute('/admin/hero')({
  component: HeroManager,
})

function HeroManager() {
  const [heroId, setHeroId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      ctaText: '',
      ctaUrl: '',
    },
  })

  useEffect(() => {
    fetchHero()
  }, [])

  async function fetchHero() {
    try {
      const res = await fetch('/api/admin/hero')
      const data: Hero[] = await res.json()
      if (data.length > 0) {
        const hero = data[0]
        setHeroId(hero.id)
        setPreviewUrl(hero.image || null)
        reset({
          title: hero.title || '',
          subtitle: hero.subtitle || '',
          description: hero.description || '',
          image: hero.image || '',
          ctaText: hero.ctaText || '',
          ctaUrl: hero.ctaUrl || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch hero:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(data: HeroFormData) {
    setIsSaving(true)
    setMessage(null)

    try {
      const method = heroId ? 'PUT' : 'POST'
      const url = heroId ? `/api/admin/hero?id=${heroId}` : '/api/admin/hero'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        const result = await res.json()
        if (result.length > 0) {
          setHeroId(result[0].id)
        }
        setMessage({ type: 'success', text: 'Hero section saved successfully!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save hero section' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleImageUpload(file: File) {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setValue('image', data.url)
        setPreviewUrl(data.url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
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
        <h1 className="text-3xl font-bold text-white">Hero Section</h1>
        <p className="text-zinc-400 mt-2">
          This is the first thing visitors see on your portfolio.
        </p>
      </div>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white">Hero Content</CardTitle>
          <CardDescription className="text-zinc-400">
            Edit your main headline, profile photo, and call-to-action button
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-300">Profile Photo</label>
              <div className="flex items-start gap-4">
                {/* Preview */}
                <div className="relative">
                  {previewUrl ? (
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-zinc-700 group">
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setValue('image', '')
                          setPreviewUrl(null)
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-500">
                      <User className="h-12 w-12" />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex-1 space-y-2">
                  <label className="cursor-pointer inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file)
                      }}
                    />
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm text-white transition-colors">
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </div>
                  </label>
                  <p className="text-xs text-zinc-500">
                    Recommended: Square image, at least 400x400px
                  </p>
                  <input type="hidden" {...register('image')} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300">Title *</label>
              <Input
                placeholder="Hi, I'm John Doe"
                className="bg-zinc-900 border-zinc-700 text-white"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300">Subtitle</label>
              <Input
                placeholder="Full Stack Developer"
                className="bg-zinc-900 border-zinc-700 text-white"
                {...register('subtitle')}
              />
              {errors.subtitle && (
                <p className="text-sm text-red-400">{errors.subtitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300">Description</label>
              <Textarea
                placeholder="A brief introduction about yourself..."
                rows={4}
                className="bg-zinc-900 border-zinc-700 text-white"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">CTA Button Text</label>
                <Input
                  placeholder="View My Work"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  {...register('ctaText')}
                />
                {errors.ctaText && (
                  <p className="text-sm text-red-400">{errors.ctaText.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">CTA Button URL</label>
                <Input
                  placeholder="#projects"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  {...register('ctaUrl')}
                />
                {errors.ctaUrl && (
                  <p className="text-sm text-red-400">{errors.ctaUrl.message}</p>
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
