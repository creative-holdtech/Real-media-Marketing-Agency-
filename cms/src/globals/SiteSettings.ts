import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'R-M — Marketing Agency',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
    },
    {
      name: 'robotsTxt',
      type: 'textarea',
      admin: {
        description: 'Full robots.txt content served at /robots.txt on the public site',
      },
      defaultValue: `User-agent: *
Allow: /

Sitemap: https://realmedia.ink/sitemap.xml`,
    },
    {
      name: 'blogMetaTitle',
      type: 'text',
      defaultValue: 'Blog — R-M',
    },
    {
      name: 'blogMetaDescription',
      type: 'textarea',
    },
    {
      name: 'blogIndex',
      type: 'group',
      label: 'Blog page copy',
      fields: [
        { name: 'seasonLabel', type: 'text', defaultValue: 'Blog — season · 2026' },
        { name: 'issuedBy', type: 'text', defaultValue: 'Issued by marketing nerds' },
        { name: 'titleLine1', type: 'text', defaultValue: 'Field notes on' },
        { name: 'titleLine2', type: 'text', defaultValue: 'building brands that last.' },
        { name: 'lead', type: 'textarea' },
        { name: 'featuredLabel', type: 'text', defaultValue: 'Featured' },
        { name: 'archiveLabel', type: 'text', defaultValue: 'Archive' },
        { name: 'allEntriesLabel', type: 'text', defaultValue: 'All entries' },
        { name: 'emptyArchive', type: 'text', defaultValue: 'Nothing here yet. Try another category.' },
        { name: 'resetFilters', type: 'text', defaultValue: 'Reset filters →' },
      ],
    },
  ],
}
