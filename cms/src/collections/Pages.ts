import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path without leading slash, e.g. about or services/seo',
      },
    },
    {
      name: 'heroHeading',
      type: 'text',
    },
    {
      name: 'heroSubheading',
      type: 'textarea',
    },
    {
      name: 'body',
      type: 'richText',
    },
  ],
}
