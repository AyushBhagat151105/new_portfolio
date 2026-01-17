import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AnimatedText,
  AnimatedCard,
  AnimatedSection,
  AnimatedButton,
  StackedItem,
  FloatingElement,
  fadeUp,
  staggerContainer,
} from '@/components/motion'
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
  Sparkles,
} from 'lucide-react'
import type { Hero, About, Project, Skill, Experience, Contact } from '@/db/schema'
import { ShaderLines } from '@/components/shader-lines'

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
        <motion.div
          className="rounded-full h-12 w-12 border-b-2 border-cyan-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  const hasContent = data?.hero || data?.about || (data?.projects?.length ?? 0) > 0

  if (!hasContent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-8">
        <motion.div
          className="text-center space-y-6 max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FloatingElement>
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center text-3xl font-bold">
              P
            </div>
          </FloatingElement>
          <h1 className="text-4xl font-bold">Welcome to Your Portfolio</h1>
          <p className="text-zinc-400 text-lg">
            Your portfolio is ready! Head to the admin dashboard to add your content.
          </p>
          <Link to="/admin">
            <AnimatedButton className="inline-flex items-center gap-2 bg-white text-zinc-900 hover:bg-zinc-200 text-lg px-8 py-4 rounded-lg font-medium">
              Go to Admin Dashboard
              <ArrowRight className="h-5 w-5" />
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Hero Section */}
      {data?.hero && (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
          <ShaderLines />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-[1]" />

          <div className="container mx-auto px-6 py-24 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Profile Photo */}
              {data.hero.image && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full blur-xl opacity-60 animate-pulse" />
                    <img
                      src={data.hero.image}
                      alt="Profile"
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-zinc-900 shadow-2xl ring-2 ring-cyan-500/30"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md rounded-full text-sm text-cyan-400 mb-8 border border-cyan-500/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4" />
                Available for work
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
                <AnimatedText
                  text={data.hero.title || ''}
                  className="bg-gradient-to-r from-white via-cyan-100 to-amber-100 bg-clip-text text-transparent"
                />
              </h1>

              {data.hero.subtitle && (
                <motion.p
                  className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {data.hero.subtitle}
                </motion.p>
              )}

              {data.hero.description && (
                <motion.p
                  className="text-lg text-zinc-300 max-w-2xl mx-auto mb-8 drop-shadow-lg"
                  style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {data.hero.description}
                </motion.p>
              )}

              {data.hero.ctaText && data.hero.ctaUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <AnimatedButton
                    href={data.hero.ctaUrl}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-black font-semibold px-8 py-4 rounded-xl text-lg shadow-lg shadow-cyan-500/25"
                  >
                    {data.hero.ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </AnimatedButton>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      {data?.about && (
        <AnimatedSection id="about" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {data.about.title || 'About Me'}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-amber-500 mx-auto rounded-full" />
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {data.about.image && (
                  <motion.div
                    variants={fadeUp}
                    className="md:col-span-1"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      <img
                        src={data.about.image}
                        alt="Profile"
                        className="relative rounded-2xl w-full object-cover aspect-square"
                      />
                    </div>
                  </motion.div>
                )}
                <motion.div
                  variants={fadeUp}
                  className={data.about.image ? 'md:col-span-2' : 'md:col-span-3'}
                >
                  <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {data.about.description}
                  </p>
                  {data.about.resumeUrl && (
                    <motion.a
                      href={data.about.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Download Resume
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Projects Section */}
      {data?.projects && data.projects.length > 0 && (
        <AnimatedSection id="projects" className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-amber-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project, index) => (
                <AnimatedCard
                  key={project.id}
                  delay={index * 0.1}
                  className="group"
                >
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full hover:border-cyan-500/50 transition-colors">
                    {project.image && (
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title || ''}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      {project.description && (
                        <CardDescription className="text-zinc-400 line-clamp-3">
                          {project.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {project.techStack && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.split(',').map((tech, i) => (
                            <motion.span
                              key={i}
                              className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * i }}
                            >
                              {tech.trim()}
                            </motion.span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Skills Section - Badge Grid */}
      {data?.skills && data.skills.length > 0 && (
        <AnimatedSection id="skills" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-amber-500 mx-auto rounded-full" />
              <p className="text-zinc-400 mt-4">Technologies I work with daily</p>
            </motion.div>

            {/* Skill Badges Grid */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {data.skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="px-5 py-2.5 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full text-zinc-200 font-medium hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-white transition-all cursor-default"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Experience Section */}
      {data?.experience && data.experience.length > 0 && (
        <AnimatedSection id="experience" className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-amber-500 mx-auto rounded-full" />
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {data.experience.map((exp, index) => (
                <StackedItem key={exp.id} index={index}>
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-cyan-500/30 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-cyan-400" />
                            {exp.role}
                          </h3>
                          <p className="text-cyan-400 font-medium">{exp.company}</p>
                          {exp.location && (
                            <p className="text-zinc-500 flex items-center gap-2 text-sm mt-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm bg-zinc-800/50 px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4" />
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-zinc-400 whitespace-pre-wrap">{exp.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </StackedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Contact Section */}
      {data?.contact && (
        <AnimatedSection id="contact" className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-amber-500 mx-auto rounded-full" />
            </motion.div>

            <motion.div
              className="max-w-md mx-auto text-center space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="space-y-4">
                {data.contact.email && (
                  <motion.a
                    href={`mailto:${data.contact.email}`}
                    className="flex items-center justify-center gap-3 text-zinc-300 hover:text-white transition-colors group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                      <Mail className="h-5 w-5 text-cyan-400" />
                    </div>
                    {data.contact.email}
                  </motion.a>
                )}
                {data.contact.phone && (
                  <motion.p
                    className="flex items-center justify-center gap-3 text-zinc-300"
                    variants={fadeUp}
                  >
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Phone className="h-5 w-5 text-cyan-400" />
                    </div>
                    {data.contact.phone}
                  </motion.p>
                )}
                {data.contact.location && (
                  <motion.p
                    className="flex items-center justify-center gap-3 text-zinc-300"
                    variants={fadeUp}
                  >
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <MapPin className="h-5 w-5 text-cyan-400" />
                    </div>
                    {data.contact.location}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-center gap-6 pt-4">
                {data.contact.github && (
                  <motion.a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl border border-zinc-700 hover:border-cyan-500/50 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-6 w-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                  </motion.a>
                )}
                {data.contact.linkedin && (
                  <motion.a
                    href={data.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl border border-zinc-700 hover:border-cyan-500/50 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="h-6 w-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                  </motion.a>
                )}
                {data.contact.twitter && (
                  <motion.a
                    href={data.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl border border-zinc-700 hover:border-cyan-500/50 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="h-6 w-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="container mx-auto px-6 text-center text-zinc-500">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
