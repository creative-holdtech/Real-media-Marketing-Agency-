import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headerLinks',
      type: 'array',
      labels: {
        singular: 'Header link',
        plural: 'Header links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal path (/blog) or external URL',
          },
        },
        {
          name: 'sub',
          type: 'text',
          admin: {
            description: 'Mobile menu subtitle',
          },
        },
      ],
    },
    {
      name: 'dropdownLinks',
      type: 'array',
      labels: {
        singular: 'Dropdown link',
        plural: 'Dropdown links',
      },
      admin: {
        description: 'Optional extra links for dropdown menus',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'parent',
          type: 'text',
          admin: {
            description: 'Parent header label, e.g. Services',
          },
        },
      ],
    },
  ],
}
