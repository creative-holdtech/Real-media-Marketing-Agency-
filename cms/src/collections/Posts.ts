import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'updatedAt'],
  },
  versions: {
    drafts: {
      schedulePublish: true,
      autosave: {
        interval: 500,
      },
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
        description: 'URL path: /blog/your-slug',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Strategy', value: 'Strategy' },
            { label: 'Positioning', value: 'Positioning' },
            { label: 'Performance', value: 'Performance' },
            { label: 'Brand systems', value: 'Brand systems' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Card kicker — e.g. Growth Strategy, Macro Trend',
          },
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          type: 'text',
          defaultValue: 'R-M Editorial',
          required: true,
        },
        {
          name: 'readTime',
          type: 'text',
          defaultValue: '6 min read',
          required: true,
          admin: {
            description: 'Display string, e.g. "8 min read"',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show as hero on /blog',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Display date; use Schedule in sidebar for future publish',
      },
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional image shown under this section heading',
          },
        },
        {
          name: 'paragraphs',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
