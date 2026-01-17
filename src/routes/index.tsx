import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
  ArrowRight,
  Briefcase,
  Calendar,
} from 'lucide-react'
import type { Hero, About, Project, Skill, Experience, Contact } from '@/db/schema'

interface PortfolioData {
  hero: Hero | null
  about: About | null
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  contact: Contact | null
}

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/portfolio')
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500" />
      </div>
    )
  }

  const hasContent = data?.hero || data?.about || (data?.projects?.length ?? 0) > 0

  if (!hasContent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl font-bold">
            P
          </div>
          <h1 className="text-4xl font-bold">Welcome to Your Portfolio</h1>
          <p className="text-zinc-400 text-lg">
            Your portfolio is ready! Head to the admin dashboard to add your content.
          </p>
          <Link to="/admin">
            <Button className="bg-white text-zinc-900 hover:bg-zinc-200 text-lg px-8 py-6">
              Go to Admin Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      {data?.hero && (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
          <div className="container mx-auto px-6 py-24 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {data.hero.title}
            </h1>
            {data.hero.subtitle && (
              <p className="text-2xl md:text-3xl text-violet-400 mb-6">{data.hero.subtitle}</p>
            )}
            {data.hero.description && (
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">{data.hero.description}</p>
            )}
            {data.hero.ctaText && data.hero.ctaUrl && (
              <a href={data.hero.ctaUrl}>
                <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-lg px-8 py-6">
                  {data.hero.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      {data?.about && (
        <section id="about" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {data.about.title || 'About Me'}
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
              {data.about.image && (
                <div className="w-64 h-64 rounded-2xl overflow-hidden flex-shrink-0 ring-4 ring-violet-500/20">
                  <img
                    src={data.about.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-6">
                <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {data.about.description}
                </p>
                {data.about.resumeUrl && (
                  <a href={data.about.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      Download Resume
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data?.projects && data.projects.length > 0 && (
        <section id="projects" className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  {project.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {project.title}
                      {project.featured && (
                        <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-400 rounded-full">
                          Featured
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.split(',').map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="border-zinc-700">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="text-zinc-400">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data?.skills && data.skills.length > 0 && (
        <section id="skills" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Skills</h2>
            <div className="max-w-4xl mx-auto">
              {/* Group by category */}
              {Object.entries(
                data.skills.reduce(
                  (acc, skill) => {
                    const cat = skill.category || 'Other'
                    if (!acc[cat]) acc[cat] = []
                    acc[cat].push(skill)
                    return acc
                  },
                  {} as Record<string, Skill[]>
                )
              ).map(([category, skills]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold text-violet-400 mb-4">{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-zinc-800/50 rounded-lg p-4 text-center hover:bg-zinc-800 transition-colors"
                      >
                        <p className="text-white font-medium mb-2">{skill.name}</p>
                        <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data?.experience && data.experience.length > 0 && (
        <section id="experience" className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Experience</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {data.experience.map((exp) => (
                <Card key={exp.id} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                        <p className="text-violet-400 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="text-zinc-500 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="mt-4 text-zinc-400 whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {data?.contact && (
        <section id="contact" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Get In Touch</h2>
            <div className="max-w-md mx-auto text-center space-y-8">
              <div className="space-y-4">
                {data.contact.email && (
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="flex items-center justify-center gap-3 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5 text-violet-400" />
                    {data.contact.email}
                  </a>
                )}
                {data.contact.phone && (
                  <p className="flex items-center justify-center gap-3 text-zinc-300">
                    <Phone className="h-5 w-5 text-violet-400" />
                    {data.contact.phone}
                  </p>
                )}
                {data.contact.location && (
                  <p className="flex items-center justify-center gap-3 text-zinc-300">
                    <MapPin className="h-5 w-5 text-violet-400" />
                    {data.contact.location}
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-4">
                {data.contact.github && (
                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                )}
                {data.contact.linkedin && (
                  <a
                    href={data.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {data.contact.twitter && (
                  <a
                    href={data.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="container mx-auto px-6 text-center text-zinc-500">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
