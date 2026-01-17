import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// ============================================
// Authentication Tables (for better-auth)
// ============================================

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull(),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
})

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
})

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
})

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }),
})

// ============================================
// Portfolio Content Tables
// ============================================

// Hero Section
export const hero = sqliteTable('hero', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  ctaText: text('cta_text'),
  ctaUrl: text('cta_url'),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// About Section
export const about = sqliteTable('about', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  resumeUrl: text('resume_url'),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Projects
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  techStack: text('tech_stack'), // JSON array as string
  featured: integer('featured', { mode: 'boolean' }).default(false),
  order: integer('order').default(0),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Skills
export const skills = sqliteTable('skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category').notNull(), // e.g., "Frontend", "Backend", "Tools"
  proficiency: integer('proficiency').default(80), // 0-100
  icon: text('icon'), // Icon name from lucide
  order: integer('order').default(0),
})

// Work Experience
export const experience = sqliteTable('experience', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  company: text('company').notNull(),
  role: text('role').notNull(),
  description: text('description'),
  startDate: text('start_date').notNull(), // YYYY-MM format
  endDate: text('end_date'), // null = present
  location: text('location'),
  order: integer('order').default(0),
})

// Contact Information
export const contact = sqliteTable('contact', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email'),
  phone: text('phone'),
  location: text('location'),
  github: text('github'),
  linkedin: text('linkedin'),
  twitter: text('twitter'),
  website: text('website'),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Type exports for use in application
export type User = typeof user.$inferSelect
export type Session = typeof session.$inferSelect
export type Hero = typeof hero.$inferSelect
export type About = typeof about.$inferSelect
export type Project = typeof projects.$inferSelect
export type Skill = typeof skills.$inferSelect
export type Experience = typeof experience.$inferSelect
export type Contact = typeof contact.$inferSelect
