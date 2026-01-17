import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, User, FolderKanban, Wrench, Briefcase, Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
    component: AdminDashboard,
})

const sections = [
    {
        title: 'Hero Section',
        description: 'Edit your main headline, subtitle, and call-to-action',
        icon: Sparkles,
        url: '/admin/hero',
        color: 'from-violet-500 to-purple-500',
    },
    {
        title: 'About',
        description: 'Update your bio and personal information',
        icon: User,
        url: '/admin/about',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Projects',
        description: 'Manage your portfolio projects',
        icon: FolderKanban,
        url: '/admin/projects',
        color: 'from-emerald-500 to-green-500',
    },
    {
        title: 'Skills',
        description: 'Update your technical skills and expertise',
        icon: Wrench,
        url: '/admin/skills',
        color: 'from-orange-500 to-amber-500',
    },
    {
        title: 'Experience',
        description: 'Manage your work experience history',
        icon: Briefcase,
        url: '/admin/experience',
        color: 'from-pink-500 to-rose-500',
    },
    {
        title: 'Contact',
        description: 'Update your contact information and social links',
        icon: Mail,
        url: '/admin/contact',
        color: 'from-indigo-500 to-blue-500',
    },
]

function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-zinc-400 mt-2">
                    Manage your portfolio content from here. Select a section to edit.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                    <Link key={section.title} to={section.url}>
                        <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200 cursor-pointer group">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color} group-hover:scale-110 transition-transform duration-200`}>
                                    <section.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-white group-hover:text-white">
                                        {section.title}
                                    </CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        {section.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>

            <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                    <CardTitle className="text-white">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-400 space-y-2">
                    <p>✨ <strong>Hero Section:</strong> This is the first thing visitors see - make it count!</p>
                    <p>📁 <strong>Projects:</strong> Feature your best work first by adjusting the order.</p>
                    <p>🎯 <strong>Skills:</strong> Group related skills together for better organization.</p>
                    <p>🔗 <strong>Contact:</strong> Make it easy for potential clients to reach you.</p>
                </CardContent>
            </Card>
        </div>
    )
}
