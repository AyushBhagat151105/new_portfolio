import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import {
  AnimatedText,
  AnimatedSection,
  AnimatedButton,
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
  Sparkles,
} from 'lucide-react'
import type { Hero, About, Project, Skill, Experience, Contact } from '@/db/schema'
import { ShaderLines } from '@/components/shader-lines'
import { Footer } from '@/components/footer'

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
      {/* Hero Section - Re-imagined */}
      {data?.hero && (
        <section className="min-h-screen flex items-center relative overflow-hidden bg-black">
          <ShaderLines />

          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-[1]" />

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-40 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Greeting badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 backdrop-blur-md rounded-full text-sm text-zinc-400 mb-6 border border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for opportunities
                </motion.div>

                {/* Main heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <motion.span
                    className="block text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Hi, I'm
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {data.hero.title || 'Creative Developer'}
                  </motion.span>
                </h1>

                {/* Subtitle */}
                {data.hero.subtitle && (
                  <motion.p
                    className="text-xl md:text-2xl text-zinc-400 mb-6 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {data.hero.subtitle}
                  </motion.p>
                )}

                {/* Description */}
                {data.hero.description && (
                  <motion.p
                    className="text-lg text-zinc-500 max-w-lg mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {data.hero.description}
                  </motion.p>
                )}

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {data.hero.ctaUrl && (
                    <AnimatedButton
                      href={data.hero.ctaUrl}
                      className="inline-flex items-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-white/10 transition-all"
                    >
                      {data.hero.ctaText || 'Get in touch'}
                      <ArrowRight className="h-5 w-5" />
                    </AnimatedButton>
                  )}
                  <motion.a
                    href="#bento"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-medium text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View my work
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right - Profile Visual */}
              <motion.div
                className="order-1 lg:order-2 flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-amber-500/30 rounded-3xl blur-3xl scale-110" />

                  {/* Profile image container */}
                  {data.hero.image ? (
                    <div className="relative">
                      {/* Decorative border */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-transparent to-amber-500 rounded-3xl opacity-50" />
                      <img
                        src={data.hero.image}
                        alt="Profile"
                        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl object-cover border-2 border-zinc-800"
                      />
                    </div>
                  ) : (
                    /* Placeholder visual if no image */
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 flex items-center justify-center">
                      <span className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                        {(data.hero.title || 'A')[0]}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

        </section>
      )}

      {/* Bento Grid Section - Combining About, Projects, Skills & Experience */}
      <AnimatedSection id="bento" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-amber-100 bg-clip-text text-transparent">
              About & Work
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              A glimpse into my journey, skills, and the projects I've crafted
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* About Me - Large Feature Card */}
            {data?.about && (
              <motion.div
                variants={fadeUp}
                className="lg:col-span-8 lg:row-span-2 group"
              >
                <div className="relative h-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl p-8 border border-zinc-800 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                  {/* Decorative gradient orb */}
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-cyan-500/20 to-amber-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-8 h-full">
                    {data.about.image && (
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                          <img
                            src={data.about.image}
                            alt="Profile"
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-2 ring-zinc-700 group-hover:ring-cyan-500/50 transition-all"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium w-fit mb-4">
                        <Sparkles className="h-3 w-3" />
                        About Me
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {data.about.title || "Hey, I'm a Developer"}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                        {data.about.description}
                      </p>
                      {data.about.resumeUrl && (
                        <motion.a
                          href={data.about.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium group/link"
                          whileHover={{ x: 5 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Download Resume
                          <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills Card */}
            {data?.skills && data.skills.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="lg:col-span-4 lg:row-span-1 group"
              >
                <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-800/80 rounded-3xl p-6 border border-zinc-800 hover:border-amber-500/30 transition-all duration-500 overflow-hidden min-h-[200px]">
                  {/* Decorative gradient */}
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />

                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium mb-4">
                      Skills & Expertise
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.slice(0, 8).map((skill, index) => (
                        <motion.span
                          key={skill.id}
                          className="px-3 py-1.5 text-sm bg-zinc-800/80 text-zinc-300 rounded-lg border border-zinc-700/50 hover:border-amber-500/50 hover:text-white transition-all cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                      {data.skills.length > 8 && (
                        <span className="px-3 py-1.5 text-sm bg-zinc-800/50 text-zinc-500 rounded-lg">
                          +{data.skills.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Experience Card */}
            {data?.experience && data.experience.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="lg:col-span-4 lg:row-span-1 group"
              >
                <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-800/80 rounded-3xl p-6 border border-zinc-800 hover:border-violet-500/30 transition-all duration-500 overflow-hidden min-h-[200px]">
                  {/* Decorative gradient */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />

                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-sm font-medium mb-4">
                      <Briefcase className="h-3 w-3" />
                      Experience
                    </span>
                    <div className="space-y-3">
                      {data.experience.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="border-l-2 border-zinc-700 pl-4 hover:border-violet-500 transition-colors">
                          <h4 className="font-semibold text-white text-sm">{exp.role}</h4>
                          <p className="text-violet-400 text-xs">{exp.company}</p>
                          <p className="text-zinc-500 text-xs">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Featured Projects */}
            {data?.projects && data.projects.length > 0 && (
              <>
                {/* Main Featured Project - Large */}
                <motion.div
                  variants={fadeUp}
                  className="lg:col-span-6 lg:row-span-2 group"
                >
                  <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-800/80 rounded-3xl border border-zinc-800 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden min-h-[400px]">
                    {data.projects[0]?.image && (
                      <div className="absolute inset-0">
                        <img
                          src={data.projects[0].image}
                          alt={data.projects[0].title || ''}
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
                      </div>
                    )}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium w-fit mb-4">
                        Featured Project
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {data.projects[0]?.title}
                      </h3>
                      <p className="text-zinc-400 mb-4 line-clamp-2">
                        {data.projects[0]?.description}
                      </p>
                      {data.projects[0]?.techStack && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {data.projects[0].techStack.split(',').slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-zinc-800/80 text-zinc-400 rounded-md border border-zinc-700/50"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {data.projects[0]?.liveUrl && (
                          <motion.a
                            href={data.projects[0].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-xl transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </motion.a>
                        )}
                        {data.projects[0]?.githubUrl && (
                          <motion.a
                            href={data.projects[0].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl border border-zinc-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Secondary Projects - Smaller Cards */}
                {data.projects.slice(1, 3).map((project) => (
                  <motion.div
                    key={project.id}
                    variants={fadeUp}
                    className="lg:col-span-3 group"
                  >
                    <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-800/80 rounded-3xl border border-zinc-800 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden min-h-[200px]">
                      {project.image && (
                        <div className="absolute inset-0">
                          <img
                            src={project.image}
                            alt={project.title || ''}
                            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-zinc-900/70" />
                        </div>
                      )}
                      <div className="relative z-10 h-full flex flex-col justify-end p-6">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-zinc-500 text-sm line-clamp-2 mb-3">
                          {project.description}
                        </p>
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
                              whileHover={{ x: 3 }}
                            >
                              <ExternalLink className="h-3 w-3" />
                              Demo
                            </motion.a>
                          )}
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-400 hover:text-white text-sm flex items-center gap-1"
                              whileHover={{ x: 3 }}
                            >
                              <Github className="h-3 w-3" />
                              Code
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* More Projects Card */}
                {data.projects.length > 3 && (
                  <motion.div
                    variants={fadeUp}
                    className="lg:col-span-6 group"
                  >
                    <Link to="/projects" className="block">
                      <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-800/80 rounded-3xl p-6 border border-zinc-800 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden min-h-[160px]">
                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                          <p className="text-zinc-400 mb-2">
                            +{data.projects.length - 3} more projects
                          </p>
                          <span className="inline-flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 font-medium">
                            View All Projects
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Redesigned Footer - Get In Touch */}
      {data?.contact && (
        <footer id="contact" className="relative py-12 sm:py-16 md:py-24 bg-zinc-950 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            <div className="absolute bottom-1/2 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
              {/* Left Side - CTA */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for opportunities
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                  <span className="text-white">Let's</span>{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                    work together
                  </span>
                </h2>
                <p className="text-zinc-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md">
                  Have a project in mind or want to discuss potential collaborations? I'd love to hear from you.
                </p>
                {data.contact.email && (
                  <motion.a
                    href={`mailto:${data.contact.email}`}
                    className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden xs:inline">Send me an</span> Email
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                )}
              </motion.div>

              {/* Right Side - Contact Info & Socials */}
              <motion.div
                className="space-y-4 sm:space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Contact Details */}
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
                  {data.contact.email && (
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-zinc-500 text-xs sm:text-sm">Email</p>
                        <a href={`mailto:${data.contact.email}`} className="text-white hover:text-cyan-400 transition-colors font-medium text-sm sm:text-base truncate block">
                          {data.contact.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {data.contact.phone && (
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs sm:text-sm">Phone</p>
                        <p className="text-white font-medium text-sm sm:text-base">{data.contact.phone}</p>
                      </div>
                    </div>
                  )}
                  {data.contact.location && (
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs sm:text-sm">Location</p>
                        <p className="text-white font-medium text-sm sm:text-base">{data.contact.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Links - Stack on very small screens */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-4">
                  {data.contact.github && (
                    <motion.a
                      href={data.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 group-hover:text-white transition-colors" />
                      <span className="text-zinc-400 group-hover:text-white transition-colors font-medium text-sm sm:text-base">GitHub</span>
                    </motion.a>
                  )}
                  {data.contact.linkedin && (
                    <motion.a
                      href={data.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                      <span className="text-zinc-400 group-hover:text-white transition-colors font-medium text-sm sm:text-base">LinkedIn</span>
                    </motion.a>
                  )}
                  {data.contact.twitter && (
                    <motion.a
                      href={data.contact.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl sm:rounded-2xl hover:border-sky-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 group-hover:text-sky-400 transition-colors" />
                      <span className="text-zinc-400 group-hover:text-white transition-colors font-medium text-sm sm:text-base">Twitter</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
              className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-zinc-500 text-xs sm:text-sm text-center md:text-left">
                © {new Date().getFullYear()} All rights reserved. Built with ♥
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <a href="#" className="text-zinc-500 hover:text-white text-xs sm:text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-zinc-500 hover:text-white text-xs sm:text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
            </motion.div>
          </div>
        </footer>
      )}

      {!data?.contact && (
        <Footer minimal />
      )}
    </div>
  )
}
