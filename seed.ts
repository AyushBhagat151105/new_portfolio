import { db } from './src/db'
import { user, hero, about, projects, skills, experience, contact } from './src/db/schema'
import { eq } from 'drizzle-orm'

// This script creates an initial admin user and seeds portfolio data
// Run it ONCE with: bun run seed.ts (while dev server is running)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!
const ADMIN_NAME = process.env.ADMIN_NAME!

async function seed() {
  console.log('🌱 Seeding database...')

  // Check if admin already exists
  const existingUser = await db.select().from(user).where(eq(user.email, ADMIN_EMAIL)).limit(1)

  if (existingUser.length === 0) {
    // Create admin user via the auth API
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    })

    if (response.ok) {
      console.log('✅ Admin user created successfully!')
      console.log(`   Email: ${ADMIN_EMAIL}`)
      console.log(`   Password: ${ADMIN_PASSWORD}`)
    } else {
      const error = await response.text()
      console.log('❌ Failed to create admin user:', error)
    }
  } else {
    console.log('ℹ️  Admin user already exists, skipping...')
  }

  // Seed Hero section
  const existingHero = await db.select().from(hero).limit(1)
  if (existingHero.length === 0) {
    await db.insert(hero).values({
      title: "Hii I'm Ayush Bhagat",
      subtitle: 'Full Stack Developer',
      description:
        'Frontend developer evolving into a full-stack engineer with Next.js, MongoDB, and Prisma — passionate about crafting elegant UIs with Tailwind and building seamless web experiences with React.',
      ctaText: 'View Projects',
      ctaUrl: '#projects',
    })
    console.log('✅ Hero section seeded')
  }

  // Seed About section
  const existingAbout = await db.select().from(about).limit(1)
  if (existingAbout.length === 0) {
    await db.insert(about).values({
      title: 'About Me',
      description: `I'm a passionate full-stack developer with a keen eye for creating elegant solutions in the least amount of time. I specialize in building responsive web applications using modern technologies.

Location: India
Experience: New Comer
Education: BCA

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical blog posts.

What I Do:
• Building responsive and performant web applications
• Creating intuitive user interfaces with modern design principles
• Developing scalable backend solutions
• Optimizing applications for better performance`,
      image: '',
      resumeUrl: '',
    })
    console.log('✅ About section seeded')
  }

  // Seed Projects
  const existingProjects = await db.select().from(projects).limit(1)
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: 'Own LeetCode',
        description:
          'A platform for users to practice and improve their coding skills by solving coding challenges.',
        liveUrl: 'https://leetlab.ayushbhagat.live/',
        githubUrl: 'https://github.com/AyushBhagat151105/Let-Labe',
        techStack: 'Next.js, React, MongoDB, Prisma',
        featured: true,
        order: 1,
      },
      {
        title: 'RMS',
        description:
          'Restaurant Management System (RMS) is a web application that allows restaurants to manage their menus, QR code based Menu, manage staff, and more.',
        liveUrl: 'https://rmsf.ayushbhagat.live/',
        githubUrl: 'https://github.com/AyushBhagat151105/RMS',
        techStack: 'Next.js, React, MongoDB',
        featured: true,
        order: 2,
      },
      {
        title: 'Remote Interview Platform',
        description:
          'A platform for conducting remote interviews with features like video calls, coding challenges, and real-time collaboration.',
        liveUrl: 'https://remote-interview-platform.ayushbhagat.live/',
        githubUrl: 'https://github.com/AyushBhagat151105/remote-interview-platform',
        techStack: 'Next.js, WebRTC, React',
        featured: true,
        order: 3,
      },
    ])
    console.log('✅ Projects seeded')
  }

  // Seed Skills
  const existingSkills = await db.select().from(skills).limit(1)
  if (existingSkills.length === 0) {
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
    console.log('✅ Skills seeded')
  }

  // Seed Experience
  const existingExp = await db.select().from(experience).limit(1)
  if (existingExp.length === 0) {
    await db.insert(experience).values([
      {
        company: 'Freelance',
        role: 'Web Developer',
        description:
          'Working on various client projects, focusing on building modern web applications with React and Next.js.',
        startDate: '2024-01',
        endDate: '',
        location: 'Remote',
        order: 1,
      },
      {
        company: 'University',
        role: 'BCA Student',
        description:
          'Studied computer science fundamentals, programming, and software development principles.',
        startDate: '2022-06',
        endDate: '',
        location: 'India',
        order: 2,
      },
    ])
    console.log('✅ Experience seeded')
  }

  // Seed or Update Contact (with social links)
  const existingContact = await db.select().from(contact).limit(1)
  const contactData = {
    email: 'ayushnbhagat151105@gmail.com',
    phone: '',
    location: 'India',
    github: 'https://github.com/AyushBhagat151105',
    linkedin: 'https://www.linkedin.com/in/ayush-bhagat-99b7b82b3/',
    twitter: 'https://x.com/AyushBhaga1511',
    website: 'https://www.ayushbhagat.live/',
  }
  
  if (existingContact.length === 0) {
    await db.insert(contact).values(contactData)
    console.log('✅ Contact info seeded')
  } else {
    // Update existing contact with social links
    await db.update(contact).set(contactData).where(eq(contact.id, existingContact[0].id))
    console.log('✅ Contact info updated with social links')
  }

  console.log('\n🎉 Database seeding complete!')
  console.log('\n⚠️  IMPORTANT: Change your password after first login!')
  process.exit(0)
}

seed().catch(console.error)
