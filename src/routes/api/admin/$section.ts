import { createFileRoute } from '@tanstack/react-router'
import { db } from '@/db'
import { hero, about, projects, skills, experience, contact } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Admin API route for CRUD operations on portfolio sections
// GET: Fetch section data
// POST: Create new item
// PUT: Update item (with ?id= query param)
// DELETE: Delete item (with ?id= query param)

export const Route = createFileRoute('/api/admin/$section')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { section } = params as { section: string }

        try {
          let data: unknown

          switch (section) {
            case 'hero':
              data = await db.select().from(hero).limit(1)
              break
            case 'about':
              data = await db.select().from(about).limit(1)
              break
            case 'projects':
              data = await db.select().from(projects).orderBy(projects.order)
              break
            case 'skills':
              data = await db.select().from(skills).orderBy(skills.order)
              break
            case 'experience':
              data = await db.select().from(experience).orderBy(experience.order)
              break
            case 'contact':
              data = await db.select().from(contact).limit(1)
              break
            default:
              return Response.json({ error: 'Invalid section' }, { status: 400 })
          }

          return Response.json(data)
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({ error: 'Internal server error' }, { status: 500 })
        }
      },

      POST: async ({ request, params }) => {
        const { section } = params as { section: string }
        const body = await request.json()

        try {
          let result: unknown

          switch (section) {
            case 'hero':
              result = await db.insert(hero).values(body).returning()
              break
            case 'about':
              result = await db.insert(about).values(body).returning()
              break
            case 'projects':
              result = await db.insert(projects).values(body).returning()
              break
            case 'skills':
              result = await db.insert(skills).values(body).returning()
              break
            case 'experience':
              result = await db.insert(experience).values(body).returning()
              break
            case 'contact':
              result = await db.insert(contact).values(body).returning()
              break
            default:
              return Response.json({ error: 'Invalid section' }, { status: 400 })
          }

          return Response.json(result, { status: 201 })
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({ error: 'Internal server error' }, { status: 500 })
        }
      },

      PUT: async ({ request, params }) => {
        const { section } = params as { section: string }
        const url = new URL(request.url)
        const id = url.searchParams.get('id')
        const body = await request.json()

        if (!id) {
          return Response.json({ error: 'ID required' }, { status: 400 })
        }

        try {
          let result: unknown

          switch (section) {
            case 'hero':
              result = await db.update(hero).set(body).where(eq(hero.id, Number(id))).returning()
              break
            case 'about':
              result = await db.update(about).set(body).where(eq(about.id, Number(id))).returning()
              break
            case 'projects':
              result = await db.update(projects).set(body).where(eq(projects.id, Number(id))).returning()
              break
            case 'skills':
              result = await db.update(skills).set(body).where(eq(skills.id, Number(id))).returning()
              break
            case 'experience':
              result = await db.update(experience).set(body).where(eq(experience.id, Number(id))).returning()
              break
            case 'contact':
              result = await db.update(contact).set(body).where(eq(contact.id, Number(id))).returning()
              break
            default:
              return Response.json({ error: 'Invalid section' }, { status: 400 })
          }

          return Response.json(result)
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({ error: 'Internal server error' }, { status: 500 })
        }
      },

      DELETE: async ({ request, params }) => {
        const { section } = params as { section: string }
        const url = new URL(request.url)
        const id = url.searchParams.get('id')

        if (!id) {
          return Response.json({ error: 'ID required' }, { status: 400 })
        }

        try {
          switch (section) {
            case 'projects':
              await db.delete(projects).where(eq(projects.id, Number(id)))
              break
            case 'skills':
              await db.delete(skills).where(eq(skills.id, Number(id)))
              break
            case 'experience':
              await db.delete(experience).where(eq(experience.id, Number(id)))
              break
            default:
              return Response.json({ error: 'Cannot delete this section' }, { status: 400 })
          }

          return Response.json({ success: true })
        } catch (error) {
          console.error('API Error:', error)
          return Response.json({ error: 'Internal server error' }, { status: 500 })
        }
      },
    },
  },
})
