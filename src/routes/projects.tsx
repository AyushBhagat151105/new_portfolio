import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AnimatedSection,
    fadeUp,
    staggerContainer,
} from '@/components/motion'
import { Footer } from '@/components/footer'
import {
    Github,
    ExternalLink,
    ArrowLeft,
    Search,
    Filter,
    X,
    Layers,
    Code2,
    Sparkles,
} from 'lucide-react'
import type { Project } from '@/db/schema'

export const Route = createFileRoute('/projects')({
    component: ProjectsPage,
    head: () => ({
        meta: [
            {
                title: 'Projects | Ayush Bhagat - Full Stack Developer Portfolio',
            },
            {
                name: 'description',
                content: 'Explore my portfolio of projects including web applications, mobile apps, and creative experiments built with React, TypeScript, Node.js, and modern technologies.',
            },
            {
                name: 'keywords',
                content: 'Projects, Portfolio, Web Development, React Projects, TypeScript, Full Stack, Ayush Bhagat Projects, GitHub, Open Source',
            },
            {
                name: 'robots',
                content: 'index, follow',
            },
            // Open Graph
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:url',
                content: 'https://ayushbhagat.live/projects',
            },
            {
                property: 'og:title',
                content: 'Projects | Ayush Bhagat - Full Stack Developer',
            },
            {
                property: 'og:description',
                content: 'Explore my portfolio of projects including web applications, mobile apps, and creative experiments.',
            },
            {
                property: 'og:image',
                content: 'https://ayushbhagat.live/og-image.png',
            },
            // Twitter
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:title',
                content: 'Projects | Ayush Bhagat',
            },
            {
                name: 'twitter:description',
                content: 'Explore my portfolio of projects including web applications and creative experiments.',
            },
            {
                name: 'twitter:image',
                content: 'https://ayushbhagat.live/og-image.png',
            },
        ],
        links: [
            {
                rel: 'canonical',
                href: 'https://ayushbhagat.live/projects',
            },
        ],
    }),
})

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTech, setSelectedTech] = useState<string | null>(null)
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/api/portfolio')
                const json = await res.json()
                setProjects(json.projects || [])
            } catch (error) {
                console.error('Failed to fetch projects:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProjects()
    }, [])

    // Extract all unique technologies from projects
    const allTechnologies = Array.from(
        new Set(
            projects
                .flatMap((p) => (p.techStack ? p.techStack.split(',').map((t) => t.trim()) : []))
                .filter(Boolean)
        )
    ).slice(0, 10)

    // Filter projects based on search and selected tech
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            searchQuery === '' ||
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTech =
            selectedTech === null ||
            (project.techStack && project.techStack.toLowerCase().includes(selectedTech.toLowerCase()))

        return matchesSearch && matchesTech
    })

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="rounded-full h-12 w-12 border-2 border-cyan-500 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="text-zinc-400 text-sm">Loading projects...</span>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Header Section */}
            <header className="relative z-10 pt-8 pb-6 border-b border-zinc-800/50">
                <div className="container mx-auto px-6">
                    <Link to="/">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
                            whileHover={{ x: -5 }}
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                            <span className="text-sm font-medium">Back to Home</span>
                        </motion.div>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <AnimatedSection className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 backdrop-blur-md rounded-full text-sm text-zinc-400 mb-6 border border-zinc-800"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Layers className="h-4 w-4 text-cyan-400" />
                            <span>Portfolio Showcase</span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            <motion.span
                                className="block text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                My
                            </motion.span>
                            <motion.span
                                className="block bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Projects
                            </motion.span>
                        </h1>

                        {/* Description */}
                        <motion.p
                            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            A collection of projects I've crafted with passion, from web applications
                            to creative experiments. Each project represents a unique challenge solved.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-8 md:gap-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {projects.length}
                                </div>
                                <div className="text-sm text-zinc-500">Total Projects</div>
                            </div>
                            <div className="w-px h-12 bg-zinc-800 hidden md:block" />
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">
                                    {projects.filter((p) => p.featured).length}
                                </div>
                                <div className="text-sm text-zinc-500">Featured</div>
                            </div>
                            <div className="w-px h-12 bg-zinc-800 hidden md:block" />
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">
                                    {allTechnologies.length}+
                                </div>
                                <div className="text-sm text-zinc-500">Technologies</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Filter Section */}
            <section className="py-8 relative z-10 border-y border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <motion.div
                            className="relative w-full lg:w-96"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </motion.div>

                        {/* Tech Filters */}
                        <motion.div
                            className="flex flex-wrap gap-2 items-center justify-center lg:justify-end"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="text-zinc-500 text-sm flex items-center gap-2 mr-2">
                                <Filter className="h-4 w-4" />
                                Filter:
                            </span>
                            <motion.button
                                onClick={() => setSelectedTech(null)}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-all ${selectedTech === null
                                    ? 'bg-cyan-500 text-black font-medium'
                                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                All
                            </motion.button>
                            {allTechnologies.map((tech) => (
                                <motion.button
                                    key={tech}
                                    onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-all ${selectedTech === tech
                                        ? 'bg-cyan-500 text-black font-medium'
                                        : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {tech}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <AnimatedSection className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-6">
                                <Search className="h-6 w-6 text-zinc-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                            <p className="text-zinc-400">
                                Try adjusting your search or filter criteria
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        variants={fadeUp}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        onHoverStart={() => setHoveredProject(project.id)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                        className="group"
                                    >
                                        <div className="relative h-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800/80 rounded-3xl border border-zinc-800 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                                            {/* Project Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                {project.image ? (
                                                    <>
                                                        <img
                                                            src={project.image}
                                                            alt={project.title || ''}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                                                        <Code2 className="h-12 w-12 text-zinc-700" />
                                                    </div>
                                                )}

                                                {/* Featured Badge */}
                                                {project.featured && (
                                                    <div className="absolute top-4 left-4">
                                                        <motion.span
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs font-semibold rounded-full"
                                                            animate={{
                                                                boxShadow: hoveredProject === project.id
                                                                    ? '0 0 20px rgba(6, 182, 212, 0.5)'
                                                                    : '0 0 0px rgba(6, 182, 212, 0)',
                                                            }}
                                                        >
                                                            <Sparkles className="h-3 w-3" />
                                                            Featured
                                                        </motion.span>
                                                    </div>
                                                )}

                                                {/* Hover Overlay with Links */}
                                                <motion.div
                                                    className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center gap-4"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {project.liveUrl && (
                                                        <motion.a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <ExternalLink className="h-5 w-5" />
                                                        </motion.a>
                                                    )}
                                                    {project.githubUrl && (
                                                        <motion.a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white transition-colors"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Github className="h-5 w-5" />
                                                        </motion.a>
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Project Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-1">
                                                    {project.title}
                                                </h3>
                                                <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack */}
                                                {project.techStack && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.techStack
                                                            .split(',')
                                                            .slice(0, 4)
                                                            .map((tech, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-2.5 py-1 text-xs bg-zinc-800/80 text-zinc-400 rounded-md border border-zinc-700/50 group-hover:border-zinc-600 transition-colors"
                                                                >
                                                                    {tech.trim()}
                                                                </span>
                                                            ))}
                                                        {project.techStack.split(',').length > 4 && (
                                                            <span className="px-2.5 py-1 text-xs bg-zinc-800/50 text-zinc-500 rounded-md">
                                                                +{project.techStack.split(',').length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom Actions */}
                                            <div className="px-6 pb-6 flex items-center justify-between">
                                                <div className="flex gap-3">
                                                    {project.liveUrl && (
                                                        <motion.a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1.5 font-medium"
                                                            whileHover={{ x: 3 }}
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                            Live Demo
                                                        </motion.a>
                                                    )}
                                                </div>
                                                {project.githubUrl && (
                                                    <motion.a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-zinc-400 hover:text-white text-sm flex items-center gap-1.5"
                                                        whileHover={{ x: 3 }}
                                                    >
                                                        <Github className="h-3.5 w-3.5" />
                                                        Source
                                                    </motion.a>
                                                )}
                                            </div>

                                            {/* Decorative gradient on hover */}
                                            <motion.div
                                                className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none"
                                                animate={{
                                                    opacity: hoveredProject === project.id ? 0.8 : 0,
                                                    scale: hoveredProject === project.id ? 1.2 : 1,
                                                }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </AnimatedSection>

            {/* CTA Section */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl p-12 border border-zinc-800 overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-white">Interested in working</span>{' '}
                                <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                                    together?
                                </span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">

                                <Link to="/">
                                    <motion.button
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-2xl border border-zinc-700 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        Back to Home
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer minimal />
        </div>
    )
}
