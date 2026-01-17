import { z } from 'zod'

// Login Schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})
export type LoginFormData = z.infer<typeof loginSchema>

// Hero Section Schema
export const heroSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  subtitle: z.string().max(100, 'Subtitle must be less than 100 characters').optional().or(z.literal('')),
  description: z.string().max(500, 'Description must be less than 500 characters').optional().or(z.literal('')),
  image: z.string().optional().or(z.literal('')),
  ctaText: z.string().max(50, 'CTA text must be less than 50 characters').optional().or(z.literal('')),
  ctaUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})
export type HeroFormData = z.infer<typeof heroSchema>

// About Section Schema
export const aboutSchema = z.object({
  title: z.string().max(100, 'Title must be less than 100 characters').optional().or(z.literal('')),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be less than 2000 characters'),
  image: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  resumeUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})
export type AboutFormData = z.infer<typeof aboutSchema>

// Project Schema
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional().or(z.literal('')),
  image: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  techStack: z.string().max(200, 'Tech stack must be less than 200 characters').optional().or(z.literal('')),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
})
export type ProjectFormData = z.infer<typeof projectSchema>

// Skill Schema
export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  category: z.string().min(1, 'Category is required'),
  proficiency: z.number().int().min(0).max(100),
  icon: z.string().max(50, 'Icon must be less than 50 characters').optional().or(z.literal('')),
  order: z.number().int().min(0).optional(),
})
export type SkillFormData = z.infer<typeof skillSchema>

// Experience Schema
export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required').max(100, 'Company must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  location: z.string().max(100, 'Location must be less than 100 characters').optional().or(z.literal('')),
  order: z.number().int().min(0).optional(),
})
export type ExperienceFormData = z.infer<typeof experienceSchema>

// Contact Schema
export const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  location: z.string().max(100, 'Location must be less than 100 characters').optional().or(z.literal('')),
  github: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  twitter: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})
export type ContactFormData = z.infer<typeof contactSchema>
