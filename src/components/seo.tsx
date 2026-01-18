/**
 * SEO Components and Utilities
 * Provides structured data (JSON-LD) and meta tag utilities for robust SEO
 */

// Person Schema for the portfolio owner
export function PersonSchema() {
    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ayush Bhagat",
        "alternateName": "Ayush",
        "description": "Full Stack Developer specializing in React, TypeScript, and modern web technologies",
        "url": "https://ayushbhagat.live",
        "image": "https://ayushbhagat.live/og-image.png",
        "jobTitle": "Full Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "sameAs": [
            "https://github.com/AyushBhagat151105",
            "https://linkedin.com/in/ayushbhagat",
            "https://twitter.com/ayushbhagat"
        ],
        "knowsAbout": [
            "React",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Full Stack Development",
            "Web Development",
            "Frontend Development",
            "Backend Development"
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
        />
    )
}

// Website Schema
export function WebsiteSchema() {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ayush Bhagat Portfolio",
        "alternateName": "Ayush Bhagat - Full Stack Developer",
        "url": "https://ayushbhagat.live",
        "description": "Portfolio of Ayush Bhagat - A passionate Full Stack Developer crafting modern web experiences with React, TypeScript, and cutting-edge technologies.",
        "inLanguage": "en-US",
        "publisher": {
            "@type": "Person",
            "name": "Ayush Bhagat"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://ayushbhagat.live/projects?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
    )
}

// Professional Service Schema (for freelance/consulting)
export function ProfessionalServiceSchema() {
    const serviceData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Ayush Bhagat - Web Development Services",
        "description": "Professional web development services including React applications, full-stack development, and modern web solutions.",
        "url": "https://ayushbhagat.dev",
        "image": "https://ayushbhagat.dev/og-image.png",
        "priceRange": "$$",
        "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
        },
        "serviceType": [
            "Web Development",
            "Frontend Development",
            "Backend Development",
            "Full Stack Development",
            "React Development",
            "UI/UX Implementation"
        ],
        "provider": {
            "@type": "Person",
            "name": "Ayush Bhagat"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
        />
    )
}

// Breadcrumb Schema
interface BreadcrumbItem {
    name: string
    url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
    )
}

// Project/Creative Work Schema
interface ProjectSchemaProps {
    name: string
    description: string
    url?: string
    image?: string
    technologies?: string[]
    dateCreated?: string
}

export function ProjectSchema({ name, description, url, image, technologies, dateCreated }: ProjectSchemaProps) {
    const projectData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": name,
        "description": description,
        "url": url,
        "image": image,
        "author": {
            "@type": "Person",
            "name": "Ayush Bhagat"
        },
        "dateCreated": dateCreated,
        "keywords": technologies?.join(", ")
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(projectData) }}
        />
    )
}

// FAQ Schema (useful for common questions)
interface FAQItem {
    question: string
    answer: string
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
    )
}

// Collection Page Schema (for projects listing)
export function CollectionPageSchema({
    name,
    description,
    url,
    itemCount
}: {
    name: string
    description: string
    url: string
    itemCount: number
}) {
    const collectionData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": name,
        "description": description,
        "url": url,
        "numberOfItems": itemCount,
        "author": {
            "@type": "Person",
            "name": "Ayush Bhagat"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }}
        />
    )
}

// Complete SEO wrapper with all schemas
export function PortfolioSEO() {
    return (
        <>
            <PersonSchema />
            <WebsiteSchema />
            <ProfessionalServiceSchema />
        </>
    )
}
