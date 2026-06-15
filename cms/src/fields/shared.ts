import type { Field } from 'payload'

export const heroFields: Field[] = [
  {
    name: 'tag',
    type: 'text',
    admin: { description: 'Small label above the headline' },
  },
  {
    name: 'titleLines',
    type: 'array',
    labels: { singular: 'Line', plural: 'Headline lines' },
    admin: { description: 'Each line becomes one row in the hero headline' },
    fields: [{ name: 'line', type: 'text', required: true }],
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
  {
    name: 'body',
    type: 'textarea',
    admin: { description: 'Secondary paragraph under the subheading' },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    type: 'row',
    fields: [
      { name: 'ctaPrimaryLabel', type: 'text', label: 'Primary CTA label' },
      { name: 'ctaPrimaryUrl', type: 'text', label: 'Primary CTA URL' },
    ],
  },
  {
    type: 'row',
    fields: [
      { name: 'ctaSecondaryLabel', type: 'text', label: 'Secondary CTA label' },
      { name: 'ctaSecondaryUrl', type: 'text', label: 'Secondary CTA URL' },
    ],
  },
]

export const sectionItemFields: Field[] = [
  { name: 'title', type: 'text' },
  { name: 'body', type: 'textarea' },
  { name: 'label', type: 'text' },
  { name: 'value', type: 'text' },
  { name: 'url', type: 'text' },
  { name: 'image', type: 'upload', relationTo: 'media' },
]

export const pageSectionsField: Field = {
  name: 'sections',
  type: 'array',
  labels: { singular: 'Section', plural: 'Page sections' },
  admin: {
    description:
      'Use sectionKey to identify blocks (studio, manifesto, verticals, includes, sprint, marathon, etc.)',
  },
  fields: [
    {
      name: 'sectionKey',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. studio, manifesto, verticals, form, includes',
      },
    },
    { name: 'tag', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    { name: 'body', type: 'textarea' },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'items',
      type: 'array',
      fields: sectionItemFields,
    },
  ],
}

export const ctaFields: Field[] = [
  { name: 'title', type: 'text' },
  { name: 'titleAccent', type: 'textarea' },
  { name: 'primaryLabel', type: 'text' },
  { name: 'primaryUrl', type: 'text' },
  { name: 'secondaryLabel', type: 'text' },
  { name: 'secondaryUrl', type: 'text' },
]

export const contactFields: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'email', type: 'text' },
  { name: 'location', type: 'text' },
  { name: 'locationNote', type: 'text' },
  { name: 'formPlaceholder', type: 'textarea' },
  { name: 'submitLabel', type: 'text' },
  { name: 'submitSuccessLabel', type: 'text' },
  {
    name: 'socialLinks',
    type: 'array',
    fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'url', type: 'text', required: true },
    ],
  },
]

export const statFields: Field[] = [
  { name: 'prefix', type: 'text' },
  { name: 'value', type: 'text', required: true },
  { name: 'suffix', type: 'text' },
  { name: 'label', type: 'text', required: true },
  { name: 'animateTo', type: 'number', admin: { description: 'Optional counter target number' } },
]
