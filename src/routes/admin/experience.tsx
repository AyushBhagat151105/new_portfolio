import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
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
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import type { Experience } from '@/db/schema'

export const Route = createFileRoute('/admin/experience')({
    component: ExperienceManager,
})

const emptyExperience: Partial<Experience> = {
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    order: 0,
}

function ExperienceManager() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingExp, setEditingExp] = useState<Partial<Experience>>(emptyExperience)

    useEffect(() => {
        fetchExperiences()
    }, [])

    async function fetchExperiences() {
        try {
            const res = await fetch('/api/admin/experience')
            const data = await res.json()
            setExperiences(data)
        } catch (error) {
            console.error('Failed to fetch experiences:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave() {
        setIsSaving(true)

        try {
            const method = editingExp.id ? 'PUT' : 'POST'
            const url = editingExp.id
                ? `/api/admin/experience?id=${editingExp.id}`
                : '/api/admin/experience'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingExp),
            })

            if (res.ok) {
                setDialogOpen(false)
                setEditingExp(emptyExperience)
                fetchExperiences()
            }
        } catch (error) {
            console.error('Save error:', error)
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this experience?')) return

        try {
            await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' })
            fetchExperiences()
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    function openEdit(exp: Experience) {
        setEditingExp(exp)
        setDialogOpen(true)
    }

    function openNew() {
        setEditingExp(emptyExperience)
        setDialogOpen(true)
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
                    <h1 className="text-3xl font-bold text-white">Experience</h1>
                    <p className="text-zinc-400 mt-2">Manage your work experience history.</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openNew} className="bg-white text-zinc-900 hover:bg-zinc-200">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Experience
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-zinc-700 max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                {editingExp.id ? 'Edit Experience' : 'New Experience'}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Add your work experience details.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-300">Company</label>
                                    <Input
                                        value={editingExp.company || ''}
                                        onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                                        placeholder="Acme Inc."
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-300">Role</label>
                                    <Input
                                        value={editingExp.role || ''}
                                        onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                                        placeholder="Senior Developer"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-300">Description</label>
                                <Textarea
                                    value={editingExp.description || ''}
                                    onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                                    placeholder="Describe your responsibilities and achievements..."
                                    rows={4}
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-300">Start Date (YYYY-MM)</label>
                                    <Input
                                        value={editingExp.startDate || ''}
                                        onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                                        placeholder="2022-01"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-300">End Date (leave empty for present)</label>
                                    <Input
                                        value={editingExp.endDate || ''}
                                        onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                                        placeholder="2024-01 or leave empty"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-300">Location</label>
                                    <Input
                                        value={editingExp.location || ''}
                                        onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                                        placeholder="San Francisco, CA"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-300">Order</label>
                                    <Input
                                        type="number"
                                        value={editingExp.order || 0}
                                        onChange={(e) => setEditingExp({ ...editingExp, order: Number(e.target.value) })}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-white text-zinc-900 hover:bg-zinc-200"
                            >
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Experience'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-700 hover:bg-transparent">
                                <TableHead className="text-zinc-400">Company</TableHead>
                                <TableHead className="text-zinc-400">Role</TableHead>
                                <TableHead className="text-zinc-400">Duration</TableHead>
                                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {experiences.length === 0 ? (
                                <TableRow className="border-zinc-700">
                                    <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                                        No experience entries yet. Add your first one!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                experiences.map((exp) => (
                                    <TableRow key={exp.id} className="border-zinc-700 hover:bg-zinc-800">
                                        <TableCell className="text-white font-medium">{exp.company}</TableCell>
                                        <TableCell className="text-zinc-400">{exp.role}</TableCell>
                                        <TableCell className="text-zinc-400">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openEdit(exp)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(exp.id)}
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
