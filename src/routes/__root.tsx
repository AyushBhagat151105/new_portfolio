import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { PortfolioSEO } from '../components/seo'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        title: 'Ayush Bhagat | Full Stack Developer & Creative Technologist',
      },
      {
        name: 'description',
        content: 'Portfolio of Ayush Bhagat - A passionate Full Stack Developer crafting modern web experiences with React, TypeScript, and cutting-edge technologies. Explore my projects, skills, and creative work.',
      },
      {
        name: 'keywords',
        content: 'Ayush Bhagat, Full Stack Developer, Web Developer, React Developer, TypeScript, JavaScript, Portfolio, Frontend Developer, Backend Developer, Software Engineer, Node.js, Next.js, TanStack, Tailwind CSS',
      },
      {
        name: 'author',
        content: 'Ayush Bhagat',
      },
      {
        name: 'creator',
        content: 'Ayush Bhagat',
      },
      {
        name: 'publisher',
        content: 'Ayush Bhagat',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      // Geo targeting
      {
        name: 'geo.region',
        content: 'IN',
      },
      {
        name: 'geo.placename',
        content: 'India',
      },
      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://ayushbhagat.live',
      },
      {
        property: 'og:title',
        content: 'Ayush Bhagat | Full Stack Developer & Creative Technologist',
      },
      {
        property: 'og:description',
        content: 'A passionate Full Stack Developer crafting modern web experiences with React, TypeScript, and cutting-edge technologies. Explore my projects, skills, and creative work.',
      },
      {
        property: 'og:image',
        content: 'https://ayushbhagat.live/og-image.png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://ayushbhagat.live/og-image.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:image:alt',
        content: 'Ayush Bhagat - Full Stack Developer Portfolio',
      },
      {
        property: 'og:site_name',
        content: 'Ayush Bhagat Portfolio',
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      // Twitter / X
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@ayushbhagat',
      },
      {
        name: 'twitter:creator',
        content: '@ayushbhagat',
      },
      {
        name: 'twitter:title',
        content: 'Ayush Bhagat | Full Stack Developer & Creative Technologist',
      },
      {
        name: 'twitter:description',
        content: 'A passionate Full Stack Developer crafting modern web experiences with React, TypeScript, and cutting-edge technologies.',
      },
      {
        name: 'twitter:image',
        content: 'https://ayushbhagat.live/og-image.png',
      },
      {
        name: 'twitter:image:alt',
        content: 'Ayush Bhagat - Full Stack Developer Portfolio',
      },
      // Theme Color for various platforms
      {
        name: 'theme-color',
        content: '#09090b',
      },
      {
        name: 'msapplication-TileColor',
        content: '#09090b',
      },
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml',
      },
      // Mobile app capable
      {
        name: 'application-name',
        content: 'Ayush Bhagat Portfolio',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Ayush Bhagat',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      // Security
      {
        name: 'referrer',
        content: 'origin-when-cross-origin',
      },
      // Format detection
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      // Favicons
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/logo512.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logo192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/logo192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/logo192.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/logo192.png',
      },
      {
        rel: 'mask-icon',
        href: '/logo512.png',
        color: '#06b6d4',
      },
      // Manifest & Sitemap
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'sitemap',
        type: 'application/xml',
        href: '/sitemap.xml',
      },
      // Canonical URL
      {
        rel: 'canonical',
        href: 'https://ayushbhagat.live',
      },
      // DNS Prefetch & Preconnect for performance
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://res.cloudinary.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://res.cloudinary.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  return <Outlet />
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* Structured Data (JSON-LD) */}
        <PortfolioSEO />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
