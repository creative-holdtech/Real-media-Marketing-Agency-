import type { CollectionConfig } from 'payload'

import { sectionItemFields } from '../fields/shared'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', '_status', 'updatedAt'],
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
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL: /services/your-slug' },
    },
    { name: 'shortName', type: 'text', required: true },
    { name: 'tagline', type: 'textarea', required: true },
    { name: 'accent', type: 'text', defaultValue: '#7c5cff' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'word', type: 'text', required: true, admin: { description: 'Hero word after "Be"' } },
        {
          name: 'paragraphs',
          type: 'array',
          minRows: 1,
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        { name: 'primaryCta', type: 'text', defaultValue: 'Book free audit →' },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      labels: { singular: 'Block', plural: 'Service blocks' },
      fields: [
        { name: 'n', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
        {
          name: 'sections',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          name: 'notes',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
        { name: 'cta', type: 'text' },
      ],
    },
    {
      name: 'outcomes',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
            {
              name: 'bullets',
              type: 'array',
              fields: [{ name: 'text', type: 'text' }],
            },
          ],
        },
        {
          name: 'extraTitle',
          type: 'text',
        },
        {
          name: 'extraItems',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialProof',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'cases',
          type: 'array',
          fields: [
            { name: 'quote', type: 'textarea' },
            { name: 'attribution', type: 'text' },
            { name: 'label', type: 'text' },
            {
              name: 'metrics',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    { name: 'closingQuote', type: 'textarea' },
    { name: 'footerCta', type: 'text' },
    {
      name: 'cardImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional image for /services index card' },
    },
    {
      name: 'gallery',
      type: 'array',
      admin: { description: 'Optional extra images inside service page' },
      fields: sectionItemFields,
    },
  ],
}
