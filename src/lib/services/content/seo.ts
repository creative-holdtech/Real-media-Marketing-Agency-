import type { ServiceContent } from "../types";

export const seoService: ServiceContent = {
  slug: "seo",
  name: "SEO",
  shortName: "SEO",
  tagline: "What search engines see.",
  accent: "#e85d3a",
  hero: {
    word: "found",
    paragraphs: [
      "Someone is searching exactly what you sell. Right now. They'll click the first relevant result and close with whoever shows up.",
      "We don't chase page rankings. We build an organic demand engine by fusing SEO, Google Business Profile, and GEO optimization. A system that doesn't invoice you every time it brings in a lead.",
      "Your website matures from a business card into an acquisition channel: stable inbound flow in 4–6 months, CAC 2–4× lower than paid channels, and a sales team working with leads that are already warm.",
    ],
    primaryCta: "Check my website",
  },
  blocks: [
    {
      n: "01",
      title: "Technical SEO & Audit",
      subtitle: "What search engines see",
      sections: [
        {
          heading: "Things we check",
          items: [
            "Crawlability & indexation: robots.txt, sitemap.xml, canonical tags, noindex/nofollow, crawl budget leaks audited via Screaming Frog and Sitebulb.",
            "Core Web Vitals & page speed: LCP, INP, CLS against real CrUX data and lab tests. Critical rendering path, lazy-loading, WebP/AVIF, font-display.",
            "Structured data: Organization, Product, FAQ, BreadcrumbList, SoftwareApplication, Review. Missing markup implemented for rich snippets and AI Overviews.",
            "Technical health: spam database, code optimization, page structure, analytics setup.",
          ],
        },
        {
          heading: "Things we find in B2B SaaS",
          items: [
            "Wrong server responses, broken or missing site structure, key pages not indexed, broken buttons and links, forms that don't submit, keyword-stuffed copy, product pages blocked by robots.txt.",
          ],
        },
      ],
    },
    {
      n: "02",
      title: "Content & Keyword Strategy",
      subtitle: "Get there before your competitors do",
      sections: [
        {
          heading: "Things we build",
          items: [
            "Content clusters: grouped by topic entities, not keywords — covering what competitors miss but buyers search for.",
            "Comparison content: review articles paired with comparison pages to capture solution-aware and vendor-aware searches.",
            "Quick wins first: we identify where top positions are reachable and move in before the competition notices the opportunity.",
          ],
        },
        {
          heading: "How we back it up",
          items: [
            "Full behavioral analytics stack: complete picture of how users move through your site.",
            "Competitor and niche analysis: identifying missing blocks and pages that cost you conversions.",
          ],
        },
      ],
    },
    {
      n: "03",
      title: "Link Building & Domain Authority",
      subtitle: "Placed where your buyers look",
      sections: [
        {
          heading: "Inside the report",
          items: [
            "Search Everywhere Optimisation: links built across all traffic channels, beyond simple search.",
            "Donor requirements: traffic, topical relevance, authority. Each source vetted for spam and manipulation.",
            "Link guarantee: we take responsibility for every placement throughout a fixed post-publication period.",
          ],
        },
      ],
      cta: "Free SEO audit",
    },
  ],
  outcomes: {
    title: "Inbound on autopilot",
    items: [
      {
        title: "Organic becomes the top source",
        body: "Pipeline grows. Ad budget doesn't. Within 6 months, organic generates 30–50% of all MQLs. 12 inbound demos became 40 — 12 from paid, 28 from organic. 2.3× more demos. Same spend.",
      },
      {
        title: "Leads get cheaper every month",
        body: "CAC drops 40–60%. Qualified lead from paid in B2B SaaS: $200–$600. From organic over 6–12 months: $40–$150 including SEO costs. And the gap keeps widening — paid CPC only goes up, content keeps working.",
      },
      {
        title: "Prospects arrive already sold",
        body: 'Top-3 on commercial queries, present in AI Overviews. Prospects tell your sales team: "I read your article on X — that\'s why I booked the demo." Deals close faster. Trust is built before the first call.',
      },
    ],
    extra: {
      title: "How organic outperforms paid (same budget)",
      items: [
        {
          title: "The Compounding Effect",
          body: "An article you publish today will bring in more traffic 18 months from now than it did in week one. By year three, every dollar you put in returns $8 to $15. Organic simply keeps stacking up.",
        },
        {
          title: "Auction Independence",
          body: "When a heavy-funded competitor invades your niche, your CAC doesn't spike. When Apple changes its privacy rules again, your marketing doesn't break. You simply step out of the bidding war.",
        },
        {
          title: "Winning AI Overviews",
          body: "We know how to get your brand inside Google's AI answers. Paid ads can't buy their way in there. AI only cares about real authority. Getting featured gives you a free 17–35% boost in high-intent traffic.",
        },
      ],
    },
  },
  socialProof: {
    title: "You end the search…",
    cases: [
      {
        quote:
          "We were shown something we'd been ignoring for too long. Positions started climbing almost immediately after the changes.",
        attribution: "Marketing Team Lead, Nux",
        metrics: [
          {
            value: "2.3×",
            label: "Pipeline growth · Inbound more than doubled in 6 months with flat paid budget",
          },
          { value: "30–50%", label: "Of all MQLs from organic search" },
          { value: "+28", label: "Inbound demos · 12 paid-only → 40 total (12 paid + 28 organic)" },
        ],
      },
    ],
  },
  closingQuote: "If you are not the answer, someone else is.",
  footerCta: "Build SEO engine",
};
