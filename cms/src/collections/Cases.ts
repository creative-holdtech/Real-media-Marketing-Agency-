import type { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Case study',
    plural: 'Case studies',
  },
  admin: {
    useAsTitle: 'client',
    defaultColumns: ['client', 'slug', 'niche', '_status', 'updatedAt'],
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
    { name: 'client', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL: /cases/your-slug' },
    },
    {
      name: 'niche',
      type: 'select',
      required: true,
      options: [
        { label: 'AI SaaS', value: 'AI SaaS' },
        { label: 'Fintech', value: 'Fintech' },
        { label: 'Cybersecurity', value: 'Cybersecurity' },
        { label: 'iGaming', value: 'iGaming' },
      ],
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      options: [
        { label: 'Sprint', value: 'Sprint' },
        { label: 'Marathon', value: 'Marathon' },
      ],
    },
    { name: 'duration', type: 'text', required: true },
    { name: 'preview', type: 'textarea', required: true },
    { name: 'headline', type: 'text', required: true },
    { name: 'situation', type: 'textarea', required: true },
    { name: 'challenge', type: 'textarea', required: true },
    { name: 'resultsBody', type: 'textarea', required: true },
    { name: 'accent', type: 'text', defaultValue: '#7c5cff' },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroMetrics',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'primaryMetric',
      type: 'group',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'work',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'resultMetrics',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'quote',
      type: 'group',
      fields: [
        { name: 'text', type: 'textarea', required: true },
        { name: 'who', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
  ],
}
