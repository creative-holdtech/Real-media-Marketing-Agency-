import type { CollectionConfig } from 'payload'

import {
  contactFields,
  ctaFields,
  heroFields,
  pageSectionsField,
  statFields,
} from '../fields/shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Site content',
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
      admin: { description: 'Internal page name in admin' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL key: home, about, contact, services, products, cases, audit, seo, blog',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: heroFields,
            },
          ],
        },
        {
          label: 'Sections',
          fields: [pageSectionsField],
        },
        {
          label: 'Stats & cards',
          fields: [
            {
              name: 'stats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: statFields,
            },
            {
              name: 'metaCards',
              type: 'array',
              labels: { singular: 'Card', plural: 'Meta cards' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: contactFields,
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: ctaFields,
            },
          ],
        },
      ],
    },
  ],
}
