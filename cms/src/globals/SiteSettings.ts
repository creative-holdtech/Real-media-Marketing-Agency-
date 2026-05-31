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

Sitemap: https://refined-narrative-lab.vercel.app/sitemap.xml`,
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
  ],
}
