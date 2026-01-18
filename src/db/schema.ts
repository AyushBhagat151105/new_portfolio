import { pgTable, text, timestamp, boolean, integer, serial } from 'drizzle-orm/pg-core'

// ============================================
// Authentication Tables (for better-auth)
// ============================================

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

// ============================================
// Portfolio Content Tables
// ============================================

// Hero Section
export const hero = pgTable('hero', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  image: text('image'), // Profile photo URL
  ctaText: text('cta_text'),
  ctaUrl: text('cta_url'),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// About Section
export const about = pgTable('about', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  resumeUrl: text('resume_url'),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Projects
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  techStack: text('tech_stack'), // JSON array as string
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Skills
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(), // e.g., "Frontend", "Backend", "Tools"
  proficiency: integer('proficiency').default(80), // 0-100
  icon: text('icon'), // Icon name from lucide
  order: integer('order').default(0),
})

// Work Experience
export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  role: text('role').notNull(),
  description: text('description'),
  startDate: text('start_date').notNull(), // YYYY-MM format
  endDate: text('end_date'), // null = present
  location: text('location'),
  order: integer('order').default(0),
})

// Contact Information
export const contact = pgTable('contact', {
  id: serial('id').primaryKey(),
  email: text('email'),
  phone: text('phone'),
  location: text('location'),
  github: text('github'),
  linkedin: text('linkedin'),
  twitter: text('twitter'),
  website: text('website'),
  updatedAt: timestamp('updatedAt').defaultNow(),
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
