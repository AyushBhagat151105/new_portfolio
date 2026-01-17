import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { skillSchema, type SkillFormData } from '@/lib/schemas'
import type { Skill } from '@/db/schema'

export const Route = createFileRoute('/admin/skills')({
  component: SkillsManager,
})

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']

function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      category: '',
      proficiency: 80,
      icon: '',
      order: 0,
    },
  })

  const proficiency = watch('proficiency')

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    try {
      const res = await fetch('/api/admin/skills')
      const data = await res.json()
      setSkills(data)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(data: SkillFormData) {
    setIsSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/admin/skills?id=${editingId}` : '/api/admin/skills'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setDialogOpen(false)
        resetForm()
        fetchSkills()
      }
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' })
      fetchSkills()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  function openEdit(skill: Skill) {
    setEditingId(skill.id)
    reset({
      name: skill.name || '',
      category: skill.category || '',
      proficiency: skill.proficiency || 80,
      icon: skill.icon || '',
      order: skill.order || 0,
    })
    setDialogOpen(true)
  }

  function openNew() {
    resetForm()
    setDialogOpen(true)
  }

  function resetForm() {
    setEditingId(null)
    reset({
      name: '',
      category: '',
      proficiency: 80,
      icon: '',
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
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-zinc-400 mt-2">Manage your technical skills and expertise.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-white text-zinc-900 hover:bg-zinc-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingId ? 'Edit Skill' : 'New Skill'}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Add your technical skills.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Name *</label>
                <Input
                  placeholder="React"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Category *</label>
                <select
                  className="w-full h-10 px-3 rounded-md bg-zinc-800 border border-zinc-700 text-white"
                  {...register('category')}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-400">{errors.category.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Proficiency ({proficiency}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                  value={proficiency}
                  onChange={(e) => setValue('proficiency', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">Order</label>
                <Input
                  type="number"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  {...register('order', { valueAsNumber: true })}
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-white text-zinc-900 hover:bg-zinc-200"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Skill'}
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
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Category</TableHead>
                <TableHead className="text-zinc-400">Proficiency</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.length === 0 ? (
                <TableRow className="border-zinc-700">
                  <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                    No skills yet. Add your first skill!
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill) => (
                  <TableRow key={skill.id} className="border-zinc-700 hover:bg-zinc-800">
                    <TableCell className="text-white font-medium">{skill.name}</TableCell>
                    <TableCell className="text-zinc-400">{skill.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <span className="text-zinc-400 text-sm">{skill.proficiency}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(skill)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(skill.id)}
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
