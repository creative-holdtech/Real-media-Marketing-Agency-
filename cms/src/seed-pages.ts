import { config as loadEnv } from 'dotenv'

loadEnv({ path: process.env.ENV_FILE || '.env' })
if (process.env.ENV_FILE) {
  loadEnv({ path: '.env.local', override: true })
}

import { getPayload } from 'payload'

import { PAGE_DEFAULTS } from '../../src/lib/page-content/defaults'

function pageToPayload(slug: string) {
  const page = PAGE_DEFAULTS[slug]
  if (!page) return null

  return {
    title: page.metaTitle ?? slug,
    slug,
    hero: page.hero
      ? {
          tag: page.hero.tag,
          titleLines: page.hero.titleLines?.map((line) => ({ line })),
          subheading: page.hero.subheading,
          body: page.hero.body,
          ctaPrimaryLabel: page.hero.ctaPrimaryLabel,
          ctaPrimaryUrl: page.hero.ctaPrimaryUrl,
          ctaSecondaryLabel: page.hero.ctaSecondaryLabel,
          ctaSecondaryUrl: page.hero.ctaSecondaryUrl,
        }
      : undefined,
    sections: Object.entries(page.sections).map(([sectionKey, section]) => ({
      sectionKey,
      tag: section.tag,
      heading: section.heading,
      subheading: section.subheading,
      body: section.body,
      bullets: section.bullets?.map((text) => ({ text })),
      items: section.items?.map((item) => ({
        title: item.title,
        body: item.body,
        label: item.label,
        value: item.value,
        url: item.url,
      })),
    })),
    stats: page.stats?.map((stat) => ({
      prefix: stat.prefix,
      value: stat.value,
      suffix: stat.suffix,
      label: stat.label,
      animateTo: stat.animateTo,
    })),
    metaCards: page.metaCards,
    contact: page.contact,
    cta: page.cta,
    _status: 'published' as const,
  }
}

async function seedPages() {
  const { default: config } = await import('./payload.config.js')
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'pages', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Pages already seeded — skipping.')
    return
  }

  for (const slug of Object.keys(PAGE_DEFAULTS)) {
    const data = pageToPayload(slug)
    if (!data) continue
    await payload.create({
      collection: 'pages',
      data,
      draft: false,
    })
    console.log(`Created page: ${slug}`)
  }
}

seedPages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
