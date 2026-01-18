import { createFileRoute } from '@tanstack/react-router'
import { db } from '@/db'
import { hero, about, projects, skills, experience, contact } from '@/db/schema'
import { auth } from '@/lib/auth'

// API endpoint to initialize/seed the database
// Call this once after first deployment: GET /api/init?secret=YOUR_SECRET
export const Route = createFileRoute('/api/init')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const secret = url.searchParams.get('secret')
        
        // Security: require a secret to run initialization
        const expectedSecret = process.env.INIT_SECRET || process.env.BETTER_AUTH_SECRET
        if (secret !== expectedSecret) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        try {

          const results = {
            contentSeeded: false,
            adminCreated: false,
            message: 'Initialization complete'
          }

          // 1. Seed Content (if not exists)
          const existingHero = await db.select().from(hero).limit(1)
          if (existingHero.length === 0) {
            // Seed Hero
            await db.insert(hero).values({
              title: "Hi, I'm Ayush Bhagat",
              subtitle: 'Full Stack Developer',
              description: 'Frontend developer evolving into a full-stack engineer with Next.js, MongoDB, and Prisma — passionate about crafting elegant UIs with Tailwind and building seamless web experiences with React.',
              ctaText: 'View Projects',
              ctaUrl: '#projects',
            })

            // Seed About
            await db.insert(about).values({
              title: 'About Me',
              description: "I'm a passionate full-stack developer with a keen eye for creating elegant solutions...",
              image: '',
              resumeUrl: '',
            })

            // Seed Projects
            await db.insert(projects).values([
              {
                title: 'Own LeetCode',
                description: 'A platform for users to practice and improve their coding skills...',
                liveUrl: 'https://leetlab.ayushbhagat.live/',
                githubUrl: 'https://github.com/AyushBhagat151105/Let-Labe',
                techStack: 'Next.js, React, MongoDB, Prisma',
                featured: true,
                order: 1,
              },
               {
                title: 'RMS',
                description: 'Restaurant Management System (RMS) is a web application...',
                liveUrl: 'https://rmsf.ayushbhagat.live/',
                githubUrl: 'https://github.com/AyushBhagat151105/RMS',
                techStack: 'Next.js, React, MongoDB',
                featured: true,
                order: 2,
              },
              {
                title: 'Remote Interview Platform',
                description: 'A platform for conducting remote interviews...',
                liveUrl: 'https://remote-interview-platform.ayushbhagat.live/',
                githubUrl: 'https://github.com/AyushBhagat151105/remote-interview-platform',
                techStack: 'Next.js, WebRTC, React',
                featured: true,
                order: 3,
              },
            ])

             // Seed Skills
            await db.insert(skills).values([
              { name: 'React', category: 'Frontend', proficiency: 90, order: 1 },
              { name: 'Next.js', category: 'Frontend', proficiency: 85, order: 2 },
              { name: 'TypeScript', category: 'Frontend', proficiency: 80, order: 3 },
              { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, order: 4 },
              { name: 'Node.js', category: 'Backend', proficiency: 75, order: 5 },
              { name: 'MongoDB', category: 'Database', proficiency: 80, order: 6 },
              { name: 'Prisma', category: 'Database', proficiency: 75, order: 7 },
              { name: 'Git', category: 'Tools', proficiency: 85, order: 8 },
            ])

             // Seed Experience
            await db.insert(experience).values([
              {
                company: 'Freelance',
                role: 'Web Developer',
                description: 'Working on various client projects...',
                startDate: '2024-01',
                endDate: '',
                location: 'Remote',
                order: 1,
              },
              {
                company: 'University',
                role: 'BCA Student',
                description: 'Studied computer science fundamentals...',
                startDate: '2022-06',
                endDate: '',
                location: 'India',
                order: 2,
              },
            ])

            // Seed Contact
            await db.insert(contact).values({
              email: 'ayushnbhagat151105@gmail.com',
              phone: '',
              location: 'India',
              github: 'https://github.com/AyushBhagat151105',
              linkedin: 'https://www.linkedin.com/in/ayush-bhagat-99b7b82b3/',
              twitter: 'https://x.com/AyushBhaga1511',
              website: 'https://www.ayushbhagat.live/',
            })

            results.contentSeeded = true
          }

          // 2. Check/Create Admin User
          const adminEmail = process.env.ADMIN_EMAIL
          const adminPassword = process.env.ADMIN_PASSWORD
          const adminName = process.env.ADMIN_NAME || 'Admin'

          if (adminEmail && adminPassword) {
            try {
              // Try to create user - better-auth handles existing email check internally or throws
              // But we can wrap it or let it fail gracefully if user exists
               await auth.api.signUpEmail({
                body: {
                  email: adminEmail,
                  password: adminPassword,
                  name: adminName,
                }
              })
              results.adminCreated = true
            } catch (authError) {
              console.log('Admin user creation skipped (likely exists):', authError)
            }
          }

          return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })


        } catch (error) {
          console.error('Init error:', error)
          return new Response(JSON.stringify({ 
            error: 'Initialization failed',
            details: error instanceof Error ? error.message : 'Unknown error'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  },
})
