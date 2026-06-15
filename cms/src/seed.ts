import 'dotenv/config'

import { getPayload } from 'payload'

import config from './payload.config'

const defaultNav = [
  { label: 'Services', url: '/services', sub: 'What we do' },
  { label: 'Cases', url: '/cases', sub: 'Selected work' },
  { label: 'Products', url: '/products', sub: 'Sprint & Marathon' },
  { label: 'About', url: '/about', sub: 'The studio' },
  { label: 'Blog', url: '/blog', sub: 'Notes & essays' },
  { label: 'Contact', url: '/contact', sub: 'Start a project' },
]

const seedPosts = [
  {
    title: 'Why cross-border fintechs fail to scale in EU & MENA markets',
    slug: 'cross-border-fintech-scale',
    category: 'Strategy',
    label: 'Growth Strategy',
    excerpt:
      'Regulatory fatigue, trust gaps, and localisation debt. A pattern study of twelve fintechs that entered both regions — and what separated the ones that survived.',
    author: 'R-M Editorial',
    readTime: '8 min read',
    featured: true,
    publishedAt: '2026-05-21T12:00:00.000Z',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          {
            text: "Every fintech that enters a second market does so believing the first market taught them everything they need to know. It didn't. The playbook that built your first ten thousand users in Western Europe is precisely the thing that will slow you down in MENA — and the reverse is equally true.",
          },
          {
            text: 'The teams we\'ve observed across both regions share a common failure mode: they export their positioning wholesale. Same website, same onboarding, same messaging hierarchy. They adjust the language and the currency symbol, and they call it localisation. The market notices immediately, even if the team doesn\'t.',
          },
        ],
      },
      {
        heading: 'Patterns we keep seeing',
        paragraphs: [
          {
            text: "Regulatory overhead is the visible problem. Licensing timelines, KYC requirements, and payment rail access vary enormously — and the teams that underestimate this don't fail loudly. They fail slowly, burning runway on compliance while the marketing budget sits unused, waiting for a product that can legally ship.",
          },
          {
            text: "The less visible problem is trust. Financial products require a level of institutional credibility that can't be manufactured in a press release. In MENA, this trust is often mediated through local partnerships — entities the market already knows. In EU, it's built through regulatory standing and editorial presence in specific publications.",
          },
        ],
      },
      {
        heading: 'What changes at scale',
        paragraphs: [
          {
            text: "What we've learned from the teams that scaled both regions is simple: they treated each market as a first market. Not an expansion. A launch. With its own ICP, its own trust architecture, and its own positioning. The operational overhead was significant. The compounding returns were worth it.",
          },
        ],
      },
    ],
  },
  {
    title: "Building trust in cybersecurity: Why technical features alone won't sell",
    slug: 'cybersecurity-trust-building',
    category: 'Positioning',
    label: 'Positioning',
    excerpt:
      'In a category where every vendor claims best-in-class detection rates, the brands that win are the ones that make buyers feel safe before the demo.',
    author: 'R-M Editorial',
    readTime: '6 min read',
    featured: false,
    publishedAt: '2026-05-05T12:00:00.000Z',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          {
            text: 'The cybersecurity buyer is the most skeptical buyer in B2B. They have been burned by vendors who overpromised, by platforms that created new attack surfaces, by dashboards that showed activity without producing safety.',
          },
        ],
      },
    ],
  },
]

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'posts', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Posts already seeded — skipping.')
    process.exit(0)
  }

  await payload.updateGlobal({
    slug: 'navigation',
    data: { headerLinks: defaultNav },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'R-M — Marketing Agency',
      blogMetaTitle: 'Blog — R-M',
      blogMetaDescription:
        'Essays on strategy, positioning, and performance from the R-M studio.',
    },
  })

  for (const post of seedPosts) {
    await payload.create({
      collection: 'posts',
      data: {
        ...post,
        category: post.category as 'Strategy' | 'Positioning' | 'Performance' | 'Brand systems',
        _status: 'published',
      },
      draft: false,
    })
    console.log(`Created post: ${post.slug}`)
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
