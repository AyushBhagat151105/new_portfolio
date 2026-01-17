import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Loader2, Star, Upload, Image, X } from 'lucide-react'
import { projectSchema, type ProjectFormData } from '@/lib/schemas'
import type { Project } from '@/db/schema'

export const Route = createFileRoute('/admin/projects')({
  component: ProjectsManager,
})

function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      techStack: '',
      featured: false,
      order: 0,
    },
  })

  const featured = watch('featured')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const res = await fetch('/api/admin/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(data: ProjectFormData) {
    setIsSaving(true)
    setMessage(null)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/admin/projects?id=${editingId}` : '/api/admin/projects'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Project saved successfully!' })
        setDialogOpen(false)
        resetForm()
        fetchProjects()
      } else {
        setMessage({ type: 'error', text: 'Failed to save project' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  function openEdit(project: Project) {
    setEditingId(project.id)
    reset({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      techStack: project.techStack || '',
      featured: project.featured || false,
      order: project.order || 0,
    })
    setPreviewUrl(project.image || null)
    setDialogOpen(true)
  }

  function openNew() {
    resetForm()
    setDialogOpen(true)
  }

  function resetForm() {
    setEditingId(null)
    setPreviewUrl(null)
    reset({
      title: '',
      description: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      techStack: '',
      featured: false,
      order: 0,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-zinc-400 mt-2">Manage your portfolio projects.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-white text-zinc-900 hover:bg-zinc-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingId ? 'Edit Project' : 'New Project'}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Fill in the project details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Title *</label>
                <Input
                  placeholder="My Awesome Project"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Description</label>
                <Textarea
                  placeholder="Describe your project..."
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-red-400">{errors.description.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Project Image</label>
                <div className="space-y-3">
                  {/* Upload Button */}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (!file) return

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
                        }}
                      />
                      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm text-white transition-colors">
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </div>
                    </label>
                    {previewUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setValue('image', '')
                          setPreviewUrl(null)
                        }}
                        className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Image Preview */}
                  {previewUrl ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-zinc-700">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-40 rounded-lg border-2 border-dashed border-zinc-700 text-zinc-500">
                      <div className="text-center">
                        <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No image uploaded</p>
                      </div>
                    </div>
                  )}

                  {/* Hidden input for form */}
                  <input type="hidden" {...register('image')} />
                </div>
                {errors.image && (
                  <p className="text-sm text-red-400">{errors.image.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">Live URL</label>
                  <Input
                    placeholder="https://myproject.com"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    {...register('liveUrl')}
                  />
                  {errors.liveUrl && (
                    <p className="text-sm text-red-400">{errors.liveUrl.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">GitHub URL</label>
                  <Input
                    placeholder="https://github.com/user/repo"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    {...register('githubUrl')}
                  />
                  {errors.githubUrl && (
                    <p className="text-sm text-red-400">{errors.githubUrl.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Tech Stack (comma separated)</label>
                <Input
                  placeholder="React, TypeScript, Node.js"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  {...register('techStack')}
                />
                {errors.techStack && (
                  <p className="text-sm text-red-400">{errors.techStack.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-300">Order</label>
                  <Input
                    type="number"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    {...register('order', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setValue('featured', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-300">Featured Project</span>
                  </label>
                </div>
              </div>
              {message && (
                <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message.text}
                </p>
              )}
              <DialogFooter>
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
                    'Save Project'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700 hover:bg-transparent">
                <TableHead className="text-zinc-400">Title</TableHead>
                <TableHead className="text-zinc-400">Tech Stack</TableHead>
                <TableHead className="text-zinc-400">Featured</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow className="border-zinc-700">
                  <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                    No projects yet. Add your first project!
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id} className="border-zinc-700 hover:bg-zinc-800">
                    <TableCell className="text-white font-medium">{project.title}</TableCell>
                    <TableCell className="text-zinc-400">{project.techStack}</TableCell>
                    <TableCell>
                      {project.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(project)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
                          className="text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
