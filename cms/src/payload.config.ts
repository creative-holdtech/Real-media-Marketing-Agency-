import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Cases } from './collections/Cases'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Redirects } from './collections/Redirects'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { buildCorsOrigins } from './lib/cors-origins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isDev = process.env.NODE_ENV !== 'production'

const payloadSecret = process.env.PAYLOAD_SECRET ?? ''
if (!payloadSecret && !isDev) {
  throw new Error('PAYLOAD_SECRET is required in production')
}

function getDatabaseAdapter() {
  if (process.env.POSTGRES_URL) {
    if (process.env.PAYLOAD_PUSH_SCHEMA === 'true') {
      return postgresAdapter({
        pool: {
          connectionString: process.env.POSTGRES_URL,
        },
        push: true,
      })
    }

    return vercelPostgresAdapter({
      pool: {
        connectionString: process.env.POSTGRES_URL,
      },
    })
  }

  if (process.env.DATABASE_URL) {
    return postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URL,
      },
      push: isDev,
    })
  }

  return sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${path.resolve(dirname, '../payload.db')}`,
    },
  })
}

const plugins = [
  seoPlugin({
    collections: ['posts', 'pages', 'services', 'cases'],
    uploadsCollection: 'media',
    generateTitle: ({ doc }) => {
      if ('title' in doc && typeof doc.title === 'string') {
        return `${doc.title} — R-M`
      }
      return 'R-M'
    },
    generateDescription: ({ doc }) => {
      if ('excerpt' in doc && typeof doc.excerpt === 'string') return doc.excerpt
      if ('heroSubheading' in doc && typeof doc.heroSubheading === 'string') {
        return doc.heroSubheading
      }
      return ''
    },
  }),
  ...(process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: {
            media: true,
          },
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
      ]
    : []),
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— R-M CMS',
    },
  },
  collections: [Users, Media, Posts, Pages, Services, Cases, Redirects],
  globals: [Navigation, SiteSettings],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: getDatabaseAdapter(),
  cors: buildCorsOrigins(),
  sharp,
  plugins,
  jobs: {
    access: {
      run: ({ req }) => {
        if (req.user) return true
        if (!process.env.CRON_SECRET) return false
        const auth = req.headers.get('authorization')
        return auth === `Bearer ${process.env.CRON_SECRET}`
      },
    },
  },
})
