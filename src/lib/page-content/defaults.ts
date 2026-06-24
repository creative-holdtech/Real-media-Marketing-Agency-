import type { PageContent } from "./types";

export const PAGE_DEFAULTS: Record<string, PageContent> = {
  home: {
    slug: "home",
    metaTitle: "R-M — Marketing Agency",
    metaDescription: "R-M is a marketing agency for founders building in EU and MENA.",
    hero: {
      tag: "R-M agency",
      titleLines: ["Strategic marketing engine", "for competitive B2B landscapes."],
      subheading: "Creating environment where your product becomes the obvious choice.",
      body: "",
      ctaPrimaryLabel: "Start a project →",
      ctaPrimaryUrl: "/contact",
      ctaSecondaryLabel: "See the work",
      ctaSecondaryUrl: "/cases",
    },
    sections: {
      studio: {
        tag: "Marketing agency",
        heading: "We don't bring ideas. We come with a plan.",
        body: "A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming inside out.",
        bullets: [
          "10 practitioners to make your product seen, trusted, and bought.",
          "No corporate layers. Clear deliverables only.",
          "Decisions in hours, not weeks. Output you can ship the same day.",
        ],
      },
    },
    stats: [
      { value: "50", suffix: "+", label: "Projects shipped for funded teams", animateTo: 50 },
      {
        prefix: "$",
        value: "10",
        suffix: "M+",
        label: "Capital raised by founders we worked with",
        animateTo: 10,
      },
    ],
    metaCards: [
      { label: "Our products", value: "Sprint (from 4 weeks)\nMarathon (2+ months)" },
      { label: "Markets", value: "EU · UK · MENA · GCC" },
      { label: "Sectors", value: "Fintech · AI SaaS · Cybersecurity · iGaming" },
      { label: "Reporting", value: "Pipeline and revenue, weekly" },
    ],
    cta: {
      title: "Tell us what needs fixing",
      titleAccent: "New launch, a raise, or marketing that doesn\u2019t perform.",
      primaryLabel: "Get free audit →",
      primaryUrl: "/audit",
      secondaryLabel: "See case studies →",
      secondaryUrl: "/cases",
    },
  },
  about: {
    slug: "about",
    metaTitle: "About — R-M Studio",
    metaDescription:
      "R-M is a strategic marketing agency for founders in Fintech, AI SaaS, Cybersecurity, and iGaming.",
    hero: {
      tag: "R—M marketing agency · est. 2025",
      titleLines: ["Strategic partnership", "for founders who build to scale"],
      subheading:
        "A focused team for Fintech, AI SaaS, Cybersecurity, and iGaming. 10 senior experts. No outsourcing.",
      ctaPrimaryLabel: "Book free audit →",
      ctaPrimaryUrl: "/audit",
      ctaSecondaryLabel: "Our core areas",
      ctaSecondaryUrl: "#verticals",
    },
    sections: {
      manifesto: {
        tag: "The position",
        heading: "We're not a hands-off vendor.",
        bullets: [
          "But an extension of your team, wired into market context.",
          "We killed the generic agency layers to ship execution focused on the outcomes that show up on your cap table.",
        ],
      },
      verticals: {
        tag: "Spaces",
        heading: "Four spaces we lock into.",
        body: "We go deep where our work compounds.",
        items: [
          {
            title: "AI SaaS",
            body: "Positioning, pricing models, launch execution for AI-native software to capture early category authority.",
          },
          {
            title: "Fintech + Web3",
            body: "Brand architecture, positioning, growth infrastructure for regulated finance and web3 protocols to secure user conviction.",
          },
          {
            title: "Cybersecurity",
            body: "Positioning, category strategy, demand generation for DevSecOps and security tools to scale enterprise pipeline.",
          },
          {
            title: "iGaming",
            body: "Brand architecture, acquisition strategy, retention infrastructure for entertainment and gaming platforms to maximize user LTV.",
          },
        ],
      },
    },
    cta: {
      title: "Time to align your marketing with your cap table.",
      primaryLabel: "Get free audit",
      primaryUrl: "/audit",
      secondaryLabel: "See case studies",
      secondaryUrl: "/cases",
    },
  },
  contact: {
    slug: "contact",
    sections: {},
    metaTitle: "Contact — Let's talk | R—M",
    metaDescription:
      "Short message, sharp answer. We reply within one business day across CET / GST timezones.",
    hero: {
      titleLines: ["Let's", "talk."],
      subheading: "Short message, sharp answer. We reply within one business day.",
    },
    contact: {
      eyebrow: "The conversation starts here",
      email: "info@realmedia.ink",
      location: "Warsaw · EU · MENA",
      locationNote: "Operating across CET / GST",
      formPlaceholder: "Tell us what you are building and where you are stuck.",
      submitLabel: "Send message →",
      submitSuccessLabel: "Message sent — we'll reply soon",
      socialLinks: [
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/company/real-media-corp/",
        },
        {
          label: "Instagram",
          url: "https://www.instagram.com/realmedia.corp",
        },
        {
          label: "Dribbble",
          url: "https://dribbble.com/realmedia26",
        },
      ],
    },
  },
  services: {
    slug: "services",
    sections: {},
    metaTitle: "Services — Strategy, Brand, Growth | R-M",
    metaDescription:
      "Six disciplines, one operating system. Brand strategy, SMM, PR, Performance, SEO and Design — engineered to compound.",
    hero: {
      tag: "Services · 6 disciplines",
      titleLines: ["Six disciplines.", "One operating system."],
      body: "Real Media works at the deeper levels of market context — how trust is built, how customers compare options, and how purchase decisions are made. Choose the entry point that matches what you need to ship this quarter.",
    },
    cta: {
      title: "Tell us what needs fixing",
      titleAccent: "New launch, a raise, or marketing that doesn\u2019t perform.",
      primaryLabel: "Get free audit",
      primaryUrl: "/audit",
      secondaryLabel: "See case studies",
      secondaryUrl: "/cases",
    },
  },
  cases: {
    slug: "cases",
    sections: {
      work: {
        tag: "Case studies",
        heading: "Three engagements.",
      },
    },
    metaTitle: "Case Studies — Work That Ships | R-M",
    metaDescription:
      "Selected brand, product, and growth work for AI SaaS, Fintech, Cybersecurity, and iGaming teams.",
    hero: {
      tag: "Case studies · R—M",
      titleLines: ["Selected work", "proven to ship"],
      subheading:
        "Identity, websites, funnels, and platforms for Fintech, iGaming, and Web3 brands.",
      ctaPrimaryLabel: "Book free audit →",
      ctaPrimaryUrl: "/audit",
      ctaSecondaryLabel: "See the work",
      ctaSecondaryUrl: "#work",
    },
    cta: {
      title: "Tell us what needs fixing",
      titleAccent: "New launch, a raise, or marketing that doesn\u2019t perform.",
      primaryLabel: "Get free audit",
      primaryUrl: "/audit",
      secondaryLabel: "See services",
      secondaryUrl: "/services",
    },
  },
  products: {
    slug: "products",
    metaTitle: "Products — Sprint & Marathon | R—M",
    metaDescription: "Sprint from 4 weeks or Marathon from 2 months.",
    sections: {
      sprint: {
        tag: "Sprint",
        heading: "High-impact marketing for fast raises and tight deadlines.",
        body: "from 4 weeks · tactical retainer",
      },
      marathon: {
        tag: "Marathon",
        heading: "Full-funnel marketing partnership for category leaders.",
        body: "from 2 months · strategic retainer",
      },
    },
    cta: {
      title: "Tell us what needs fixing",
      primaryLabel: "Get free audit",
      primaryUrl: "/audit",
      secondaryLabel: "See case studies",
      secondaryUrl: "/cases",
    },
  },
  audit: {
    slug: "audit",
    metaTitle: "Free Marketing Audit — up to 7 days | R—M",
    metaDescription:
      "Free marketing audit with hard data and no pitch. Senior experts analyse your pipeline and deliver a prioritised 90-day plan in up to 7 days.",
    hero: {
      tag: "Free · No obligation · up to 7 days",
      titleLines: ["Free marketing audit.", "Hard data. No pitch."],
    },
    sections: {
      "hero-bullets": {
        bullets: [
          "Senior experts analysing your current pipeline tracks",
          "A clear breakdown of what's blocking your growth",
          "Prioritised 90-day action plan, channel by channel",
          "No strings attached — execute with us or in-house",
        ],
      },
      includes: {
        heading: "What's included",
        items: [
          {
            title: "SMM",
            body: "Audience quality, narrative consistency, 30-day cadence plan tied to inbound.",
          },
          {
            title: "PR",
            body: "Authority angles, target media shortlist, placement plan for the next quarter.",
          },
          {
            title: "SEO",
            body: "Commercial intent map, technical health check, 3-pillar compounding roadmap.",
          },
          {
            title: "Performance",
            body: "Attribution setup, channel performance audit, payback-aware budget reshape.",
          },
          {
            title: "Design",
            body: "Visual identity asset check, consistency alignment, product first-impression audit.",
          },
          {
            title: "Marketing",
            body: "Positioning clarity, ICP fit, funnel leak analysis, 90-day priority stack.",
          },
        ],
      },
      steps: {
        items: [
          {
            title: "You submit",
            body: "Three minutes to fill the form below — context, channels, what needs fixing.",
          },
          {
            title: "We diagnose",
            body: "Senior expert reviews your setup and talks to your representative if needed.",
          },
          {
            title: "You get the plan",
            body: "Concrete, prioritised recommendations in a 6–10 page document. Ready to execute.",
          },
        ],
      },
    },
  },
  blog: {
    slug: "blog",
    sections: {},
  },
};

export function getPageDefaults(slug: string): PageContent {
  return PAGE_DEFAULTS[slug] ?? { slug, sections: {} };
}
