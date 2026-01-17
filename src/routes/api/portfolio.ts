import { createFileRoute } from '@tanstack/react-router'
import { db } from '@/db'
import { hero, about, projects, skills, experience, contact } from '@/db/schema'

export const Route = createFileRoute('/api/portfolio')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const [heroData, aboutData, projectsData, skillsData, experienceData, contactData] =
            await Promise.all([
              db.select().from(hero).limit(1),
              db.select().from(about).limit(1),
              db.select().from(projects).orderBy(projects.order),
              db.select().from(skills).orderBy(skills.order),
              db.select().from(experience).orderBy(experience.order),
              db.select().from(contact).limit(1),
            ])

          return Response.json({
            hero: heroData[0] || null,
            about: aboutData[0] || null,
            projects: projectsData,
            skills: skillsData,
            experience: experienceData,
            contact: contactData[0] || null,
          })
        } catch (error) {
          console.error('Portfolio API Error:', error)
          return Response.json({ error: 'Internal server error' }, { status: 500 })
        }
      },
    },
  },
})
