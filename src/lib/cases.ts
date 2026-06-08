import aboutHero from "@/assets/about-hero.png";
import engageBg from "@/assets/engage-bg.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import { caseAsset, deckImage } from "@/lib/case-deck-images";

export type CaseMetric = { value: string; label: string };

export type CaseSectionVisual = { src: string; alt: string };

export type CaseRichContent = {
  titleLines: [string, string];
  subline: string;
  /** Optional second hero paragraph — narrative framing under the subline */
  heroNote?: string;
  /** Optional figure per narrative section */
  visuals?: Partial<
    Record<"overview" | "challenge" | "identity" | "deliverables", CaseSectionVisual>
  >;
  /** Pixel logo or mark shown in identity section */
  logo?: CaseSectionVisual;
  /** Campaign / SMM gallery (case study proof) */
  gallery?: CaseSectionVisual[];
  galleryHeading?: string;
  galleryLead?: string;
  meta: {
    client: string;
    scope: string;
    year: string;
    status: string;
  };
  overview: {
    heading: string;
    body: string;
    scope: string[];
  };
  problem: {
    heading: string;
    body: string;
    cards: { title: string; body: string }[];
  };
  identity: {
    heading: string;
    typeface: { label: string; body: string };
    colors: {
      principle: string;
      items: { name: string; meaning: string }[];
    };
    logo: string;
    keyVisual: string;
  };
  deliverables: {
    heading: string;
    items: { title: string; body: string }[];
  };
  platform: {
    heading: string;
    body: string;
    features: { title: string; body: string }[];
  };
  closing: {
    titleLines: [string, string];
    subline: string;
    primaryLabel: string;
    primaryTo: string;
    secondaryLabel: string;
    secondaryTo: string;
  };
};

export type CaseStudy = {
  slug: string;
  client: string;
  niche: "AI SaaS" | "Fintech" | "Cybersecurity" | "iGaming";
  format: "Sprint" | "Marathon";
  duration: string;
  preview: string; // one-liner under card
  headline: string; // Hero of case page
  heroMetrics: CaseMetric[];
  primaryMetric: CaseMetric; // big metric on the card
  situation: string;
  challenge: string;
  work: { title: string; body: string }[];
  resultMetrics: CaseMetric[];
  resultsBody: string;
  quote: { text: string; who: string; role: string };
  accent: string; // hex used for glow
  coverImage: string;
  /** Full-bleed photo shown on home index hover (falls back to coverImage) */
  previewImage?: string;
  heroImage: string;
  /** Used when deck PNG is not exported yet */
  fallbackCover?: string;
  fallbackHero?: string;
  /** Deliverable tags shown on portfolio cover */
  coverScope?: string[];
  /** Logo-only cover: typographic hero instead of photo atmosphere */
  coverTreatment?: "logo" | "photo";
  layout?: "standard" | "rich";
  rich?: CaseRichContent;
};

export const cases: CaseStudy[] = [
  {
    slug: "tequila-cpa",
    client: "Tequila",
    niche: "iGaming",
    format: "Marathon",
    duration: "6 months",
    preview:
      "iGaming CPA network — brand identity, web ecosystem, and performance creative engine built from the ground up.",
    headline: "How R-M helped Tequila turn brand into a partner acquisition engine.",
    heroMetrics: [
      { value: "+35%", label: "Brand growth" },
      { value: "300+", label: "Brand partners" },
      { value: "Tier 1–3", label: "GEO coverage" },
      { value: "6 mo", label: "Engagement" },
    ],
    primaryMetric: { value: "+35%", label: "Brand growth in 6 mo" },
    situation:
      "Tequila is a CPA network with in-house media buying, specialising in iGaming with 300+ brands across Tier-1, Tier-2, and Tier-3 regions — including Africa.",
    challenge:
      "The team needed a comprehensive audit of brand communications and a core go-to-market strategy aligned with two objectives: increasing brand awareness and attracting new partners to the network.",
    work: [
      {
        title: "Identity & branding",
        body: "Built Tequila's visual identity from the ground up — logo system, brand guidelines, and a distinctive voice that stands out in a crowded CPA market.",
      },
      {
        title: "Web & landing design",
        body: "Designed and shipped a conversion-focused site and landing system that explains the offer clearly to solo buyers and teams alike.",
      },
      {
        title: "Performance creatives & SMM",
        body: "Produced a high-volume stream of performance creatives and social content — from Buyer Awards campaigns to localized Instagram series.",
      },
    ],
    resultMetrics: [
      { value: "+35%", label: "Brand growth" },
      { value: "300+", label: "Active brand partners" },
      { value: "2", label: "Buyer Awards nominations" },
      { value: "Tier 1–3", label: "Markets activated" },
    ],
    resultsBody:
      "Tequila launched with a brand partners could trust — from Buyer Awards nominations to a creative system the in-house team still runs across social and performance channels.",
    quote: {
      text: "Partners know what Tequila stands for before the first call — the brand works in every GEO we run.",
      who: "Tequila CPA",
      role: "Partner network",
    },
    accent: "#4ade80",
    coverImage: caseAsset("tequila-cpa", "logo.png"),
    previewImage: caseAsset("tequila-cpa", "hover.jpg"),
    coverTreatment: "logo",
    heroImage: nicheHospitality,
    fallbackCover: engageBg,
    fallbackHero: nicheHospitality,
    coverScope: ["Identity & branding", "Web & landing", "Performance & SMM"],
    layout: "rich",
    rich: {
      titleLines: ["Brand system", "for a CPA network"],
      subline:
        "A CPA network with in-house media buying, specialising in iGaming — 300+ brands across Tier-1, Tier-2, and Tier-3 regions, including Africa.",
      heroNote:
        "TEQUILA had it all: strong offer, reliable team, and global coverage. But not yet the recognition. Together we closed that gap.",
      meta: {
        client: "Tequila CPA",
        scope: "Brand, Web, Performance & SMM",
        year: "2024",
        status: "Live · tequila.cpa",
      },
      overview: {
        heading: "Project overview",
        body: "Tequila is a CPA network with in-house media buying, specialising in the iGaming vertical and featuring over 300 brands across Tier-1, Tier-2, and Tier-3 regions, including Africa.\n\nWe built the brand from the ground up — identity, web, and a performance creative engine that helps the network stand out to solo buyers and teams alike.",
        scope: ["Identity & Branding", "Web & Landing Design", "Performance Creatives & SMM"],
      },
      problem: {
        heading: "The challenge",
        body: "Conduct a comprehensive audit of brand communications and develop a core go-to-market strategy aligned with key business objectives: increasing brand awareness and attracting new partners to the CPA network.\n\nTequila needed a brand partners could trust before the first deal — not another generic network look in a crowded iGaming market.",
        cards: [
          {
            title: "Brand awareness",
            body: "Raise visibility across Tier-1, Tier-2, and Tier-3 GEOs with a distinctive voice that reads instantly as Tequila — not interchangeable CPA noise.",
          },
          {
            title: "Partner acquisition",
            body: "Translate the network offer into a GTM system that attracts new partners and supports in-house media buying at scale.",
          },
          {
            title: "Buyer Awards recognition",
            body: "Build a brand presence strong enough to earn nominations for Best PR Campaign and Best Corporate Style at Buyer Awards 2023.",
          },
          {
            title: "Performance at volume",
            body: "Ship paid social and performance creatives at volume without losing the core message: run traffic without risks.",
          },
        ],
      },
      identity: {
        heading: "Visual execution",
        typeface: {
          label: "Block display + system sans",
          body: "A bold pixel-adjacent display wordmark paired with clean system typography — built to work on hoodies, landing pages, and Instagram carousels at equal weight.",
        },
        colors: {
          principle: "Desert green. High contrast. No decoration.",
          items: [
            { name: "Green", meaning: "cactus motif, iGaming energy, recognition" },
            { name: "Black", meaning: "authority, performance, night-market tone" },
            { name: "White", meaning: "clarity in dense offer copy" },
          ],
        },
        logo: "TEQUILA wordmark in a distinctive pixel block display — built for hoodies, landing pages, and Instagram carousels at equal weight.",
        keyVisual:
          "Desert green, high contrast, no decoration — a campaign world built for tequila.cpa across Tier 1–3 without generic CPA noise.",
      },
      deliverables: {
        heading: "Three deliverable tracks. One GTM system.",
        items: [
          {
            title: "Identity & Branding",
            body: "Logo system, brand guidelines, and merch-ready applications — from Buyer Awards campaigns to partner-facing decks.",
          },
          {
            title: "Web & Landing Design",
            body: "Conversion-focused site and landing system that explains the offer to solo buyers and teams — TRAFIK as the hero message.",
          },
          {
            title: "Performance Creatives & SMM",
            body: "High-volume Instagram and paid creative — campaign series, infrastructure storytelling, and localized variants across Tier 1–3.",
          },
        ],
      },
      platform: {
        heading: "Results the team still runs on",
        body: "The brand system shipped as a partner acquisition engine — not a one-off launch deck.",
        features: [
          {
            title: "+35% brand growth",
            body: "Six-month brand growth acceleration after the identity and GTM system went live.",
          },
          {
            title: "300+ brand partners",
            body: "Network scale across Tier-1, Tier-2, and Tier-3 regions including Africa.",
          },
          {
            title: "Buyer Awards 2023",
            body: "Nominated for Best PR Campaign and Best Corporate Style — brand proof in the iGaming buyer community.",
          },
          {
            title: "In-house creative system",
            body: "Performance and SMM templates the team extends without losing Tequila's voice.",
          },
        ],
      },
      closing: {
        titleLines: ["Ready for the next", "partner wave?"],
        subline:
          "If your network needs a brand that converts attention into partners — let's talk.",
        primaryLabel: "Book free audit →",
        primaryTo: "/audit",
        secondaryLabel: "View all cases",
        secondaryTo: "/cases",
      },
    },
  },
  {
    slug: "empresex",
    client: "Empresex",
    niche: "Fintech",
    format: "Marathon",
    duration: "2024",
    preview:
      "Licensed crypto exchange — brand identity, marketing site, mobile app, and web trading platform.",
    headline: "Not just an exchange. A new standard.",
    heroMetrics: [
      { value: "VASP", label: "Licensed in Czech Republic" },
      { value: "BTC · ETH · USDC", label: "Supported assets" },
      { value: "3 steps", label: "Path to trading" },
      { value: "Live", label: "empresex.io" },
    ],
    primaryMetric: { value: "4 surfaces", label: "Brand · web · app · platform" },
    situation:
      "Empresex is a licensed crypto exchange based in the Czech Republic. They turn complex crypto into simple, instant trades — fiat and digital currencies in seconds, with transparent fees and advanced security.",
    challenge:
      "The category rewards noise, but Empresex competes on clarity: predictable pricing, fast execution, and locked-down assets. The design had to express that promise across marketing, onboarding, mobile, and the live exchange.",
    work: [
      {
        title: "Identity & Branding",
        body: "Logo, icon mark, typographic system, colour palette, and brand guidelines aligned with Empresex positioning: transparent, secure, built for everyday use.",
      },
      {
        title: "Web & Landing Design",
        body: "Marketing site with planetary hero, value pillars, three-step onboarding, instant exchange preview, FAQ, press coverage, and blog — fully responsive.",
      },
      {
        title: "Mobile App",
        body: "Exchange, payment, transfer confirmation, and authentication flows designed for speed and clarity on the move.",
      },
      {
        title: "Exchange Platform",
        body: "Licensed trading dashboard with balance overview, instant conversion, verification flows, and a documented design system for the product team.",
      },
    ],
    resultMetrics: [
      { value: "4", label: "Product surfaces" },
      { value: "3", label: "Supported assets" },
      { value: "1", label: "Design system" },
      { value: "Live", label: "In production" },
    ],
    resultsBody:
      "Empresex now runs on one visual language from empresex.io through the exchange dashboard — transparent fees, fast execution, and security made visible at every step.",
    quote: {
      text: "We turn complex crypto into simple, instant trades. The design finally communicates that as clearly as the product does.",
      who: "Empresex",
      role: "Licensed exchange, Czech Republic",
    },
    accent: "#d4a853",
    coverImage: caseAsset("empresex", "logo.svg"),
    coverTreatment: "logo",
    heroImage: deckImage("empresex", "platform"),
    fallbackCover: engageBg,
    fallbackHero: aboutHero,
    coverScope: ["Identity", "Web", "Mobile app", "Exchange"],
    layout: "rich",
    rich: {
      titleLines: ["Not just an exchange.", "A new standard."],
      subline:
        "We turn complex crypto into simple, instant trades — a complete design system for identity, web, app, and exchange platform.",
      meta: {
        client: "Empresex, Czech Republic",
        scope: "Brand, Web, Mobile, Platform",
        year: "2024",
        status: "Live at empresex.io",
      },
      overview: {
        heading: "A next-generation crypto exchange built for trust",
        body: "Empresex is a next-generation crypto exchange — fast, intuitive, and reliable. Trade fiat and digital assets in seconds, with clarity and trust at every step.\n\nLicensed in the Czech Republic with a VASP permit, Empresex turns complex crypto into simple, instant trades. We partnered with the team to shape the full visual layer: brand identity, marketing site, mobile app, and web exchange platform — one coherent system from empresex.io through the live dashboard.",
        scope: ["Identity & Branding", "Web & Landing Design", "Mobile App", "Exchange Platform"],
      },
      problem: {
        heading: "Designing for clarity in a category that rewards noise",
        body: "Crypto exchanges often look loud, complex, and interchangeable. Empresex takes the opposite path: transparent fees, advanced security, fast execution, and a product built for real users — not hype.\n\nThe challenge was to translate that promise into a visual language that holds across every touchpoint. From the first visit to empresex.io through account verification and live trading, the experience needed to feel calm, credible, and unmistakably Empresex.\n\nThat meant building a system that could scale with the product — new assets, new flows, new markets — without losing the clarity that makes the brand work.",
        cards: [
          {
            title: "Trust before the first trade",
            body: "As a licensed VASP in the Czech Republic, Empresex leads with credibility. The visual system had to reinforce security and regulation from the very first screen.",
          },
          {
            title: "Simplicity as a product promise",
            body: "Empresex sells instant exchange — BTC, ETH, and USDC in seconds. The design had to make that speed and transparency feel obvious, not hidden behind complexity.",
          },
          {
            title: "One brand, four surfaces",
            body: "Marketing site, onboarding, mobile app, and exchange platform needed to read as one product — aligned with the three-step path from sign-up to limitless trading.",
          },
          {
            title: "Built to scale",
            body: "With press coverage, FAQ content, blog, and a growing feature set, the team needed tokens and components that kept the experience consistent as the platform evolved.",
          },
        ],
      },
      identity: {
        heading: "Building the visual language",
        typeface: {
          label: "Helvetica Neue",
          body: "Extended, clean, geometric — precision without coldness. We engineered three distinct, high-contrast visual concepts for Web3; after strategic alignment, we isolated the most commanding direction and refined it into a bold, uncompromising identity.",
        },
        colors: {
          principle: "Grayscale foundation. Gold reserved for action.",
          items: [
            { name: "Black", meaning: "space, depth, authority" },
            { name: "White", meaning: "clarity, simplicity, openness" },
            { name: "Secondary Gray", meaning: "financial data without visual fatigue" },
            { name: "Gold", meaning: "primary CTAs and direction only" },
          ],
        },
        logo: "Extended lowercase logotype with a four-pointed geometric star — direction in a complex financial landscape, approachability without sacrificing confidence.",
        keyVisual:
          "A planetary gradient — deep amber burning into dark space. The signature Gold Element is used intentionally and sparingly, reserved strictly for primary interactive components and CTAs.",
      },
      deliverables: {
        heading: "Four deliverables. One coherent system.",
        items: [
          {
            title: "Identity & Branding",
            body: "Logo, icon mark, typographic system, colour palette, and brand guidelines — aligned with Empresex positioning as a licensed, transparent exchange.",
          },
          {
            title: "Web & Landing Design",
            body: "Marketing site with planetary hero, Why Empresex pillars, three-step onboarding, instant exchange preview, media presence, FAQ, and blog. Fully responsive.",
          },
          {
            title: "Mobile App",
            body: "Exchange screen, payment flow, funds transfer confirmation, and authentication — designed for the same speed and clarity as the web product.",
          },
          {
            title: "Exchange Platform",
            body: "The full web dashboard: balance overview, budget statistics, quick transaction panel, withdrawal flow, multi-currency portfolio sidebar, recent transactions, and design system handoff for development.",
          },
        ],
      },
      platform: {
        heading: "Design approach",
        body: "We discarded purely decorative aesthetics to focus on usability. The strict grayscale foundation minimises visual fatigue when reading complex financial data. The signature Gold Element guides attention to primary actions across marketing and product.",
        features: [
          {
            title: "Instant exchange",
            body: "Convert Bitcoin, Ethereum, and USDC instantly — a clear conversion flow optimised for transparency and convenience, mirroring the live widget on empresex.io.",
          },
          {
            title: "Dashboard",
            body: "Total balance front and centre, budget statistics below, and quick-action panel for the most common operations — everything at a glance.",
          },
          {
            title: "Verification & onboarding",
            body: "A streamlined path from sign-up and email activation through KYC to live trading — designed to match Empresex five-minute verification promise.",
          },
          {
            title: "Design system",
            body: "A full token library and component set in Figma, documented and handed off so the platform could grow — new assets, flows, and markets — without breaking consistency.",
          },
        ],
      },
      closing: {
        titleLines: ["The next standard", "starts here"],
        subline:
          "If your product deserves a visual language that works as hard as your team does — let's talk.",
        primaryLabel: "Get in touch",
        primaryTo: "/contact",
        secondaryLabel: "View all cases",
        secondaryTo: "/cases",
      },
    },
  },
  {
    slug: "progresivo",
    client: "Progresivo",
    niche: "Fintech",
    format: "Marathon",
    duration: "9 months",
    preview:
      "LATAM educational academy — brand identity, web infrastructure, and scalable marketing assets.",
    headline: "How R-M helped Progresivo rebuild its brand for LATAM.",
    heroMetrics: [
      { value: "LATAM", label: "Primary market" },
      { value: "3", label: "Brand pillars" },
      { value: "1", label: "Design system" },
      { value: "9 mo", label: "Engagement" },
    ],
    primaryMetric: { value: "LATAM", label: "Market-focused rebrand" },
    situation:
      "Progresivo Academy needed a complete visual system transformation — consistency, scalability, and a high-impact digital presence across social and paid channels in LATAM.",
    challenge:
      "The brand had outgrown its original look. Social feeds, ad creatives, and landing pages needed one flexible identity that could scale without losing recognition in a fast-moving market.",
    work: [
      {
        title: "Visual identity refresh",
        body: "Rebuilt the brand foundation — colour palette, typography, modular elements, and aesthetic rules that scale from web interfaces to high-performance ad creatives.",
      },
      {
        title: "Guidelines & design system",
        body: "Developed social media guidelines and a content design system, centred on a signature line element that acts as a visual fingerprint in the feed.",
      },
      {
        title: "LATAM creative direction",
        body: "Applied a vibrant, high-energy palette tuned for LATAM audiences — built for feed recognition and paid conversion.",
      },
    ],
    resultMetrics: [
      { value: "1", label: "Unified brand system" },
      { value: "LATAM", label: "Market focus" },
      { value: "3", label: "Core deliverables" },
      { value: "9 mo", label: "Engagement" },
    ],
    resultsBody:
      "Progresivo now runs on one visual language across social, ads, and landing pages — with a system the in-house team can extend as new campaigns ship.",
    quote: {
      text: "One system from social to landing pages — our team ships new campaigns without losing the brand.",
      who: "Progresivo Academy",
      role: "LATAM academy",
    },
    accent: "#f43f5e",
    coverImage: caseAsset("progresivo", "logo.svg"),
    coverTreatment: "logo",
    heroImage: deckImage("progresivo", "platform"),
    fallbackCover: nicheFintech,
    fallbackHero: aboutHero,
    coverScope: ["Visual identity", "Design system", "LATAM creatives"],
    layout: "rich",
    rich: {
      titleLines: ["Visual system", "for LATAM scale."],
      subline:
        "Complete visual identity and digital ecosystem overhaul for Progresivo Academy — built for consistency, scalability, and high-impact presence in LATAM.",
      meta: {
        client: "Progresivo Academy",
        scope: "Brand, Social, Performance",
        year: "2024",
        status: "Live system",
      },
      overview: {
        heading: "Visual identity & digital ecosystem overhaul",
        body: "For Progresivo Academy, we executed a complete visual system transformation. Approaching this as a signature Real Media client case, we focused on three pillars: consistency, scalability, and high-impact digital presence.\n\nThe brand now operates under a clear set of rules that scale seamlessly from web interfaces to high-performance ad creatives across LATAM.",
        scope: [
          "Visual identity refresh",
          "Guidelines & design system",
          "LATAM creative direction",
        ],
      },
      problem: {
        heading: "Why the brand needed a reset",
        body: "Progresivo had outgrown its original look. Social feeds, ad creatives, and landing pages needed one flexible identity that could scale without losing recognition in a fast-moving LATAM market.\n\nGiven Progresivo's focus on LATAM, the system had to win attention in the feed without sacrificing credibility.",
        cards: [
          {
            title: "Consistency at scale",
            body: "One visual language across social, paid, and landing pages — no more one-off campaign aesthetics.",
          },
          {
            title: "Scalable design system",
            body: "Modular elements, typography, and colour rules the in-house team can extend as new campaigns ship.",
          },
          {
            title: "Signature line element",
            body: "A key brand marker that weaves visuals into a unified system — a visual fingerprint in a fast-moving social feed.",
          },
          {
            title: "LATAM colour strategy",
            body: "A vibrant, high-energy palette tuned for LATAM feeds while staying unmistakably Progresivo.",
          },
        ],
      },
      identity: {
        heading: "Strategic visual identity refresh",
        typeface: {
          label: "Extended grotesk system",
          body: "We rebuilt the brand foundation from the ground up — updated colour palette, typography, modular elements, and overall aesthetic for a modern, flexible identity.",
        },
        colors: {
          principle: "Colour as a strategic tool.",
          items: [
            { name: "Vibrant primaries", meaning: "feed recognition and paid conversion in LATAM" },
            { name: "Neutral base", meaning: "readability in long-form trust content" },
            { name: "Accent line", meaning: "signature marker across all compositions" },
          ],
        },
        logo: "Extended lowercase logotype with a distinctive slash mark — approachable, modern, and instantly recognisable in social thumbnails.",
        keyVisual:
          "The signature line element runs through social templates, ad frames, and landing modules — tying every touchpoint back to one Progresivo world.",
      },
      deliverables: {
        heading: "What we delivered",
        items: [
          {
            title: "Brand foundation",
            body: "Colour palette, typography, modular elements, and aesthetic rules — modern, flexible, and instantly recognisable across touchpoints.",
          },
          {
            title: "Social & content system",
            body: "Comprehensive social media guidelines and a content design system built around the signature line element.",
          },
          {
            title: "LATAM performance creatives",
            body: "High-energy ad and social templates tuned for LATAM audiences — built for recognition and conversion.",
          },
        ],
      },
      platform: {
        heading: "The solution in practice",
        body: "Four strategic layers — identity refresh, guidelines, line element, and LATAM colour — shipped as one operating system the team owns.",
        features: [
          {
            title: "Unified brand system",
            body: "One coherent visual language from feed to landing page — no drift between campaigns.",
          },
          {
            title: "Content design system",
            body: "Repeatable templates for social, stories, and paid — with the line element as the anchor.",
          },
          {
            title: "LATAM market focus",
            body: "Palette and composition rules tuned for regional feed behaviour and audience energy.",
          },
          {
            title: "Team-ready guidelines",
            body: "Documentation the in-house team uses to ship new creatives without losing quality.",
          },
        ],
      },
      closing: {
        titleLines: ["Build a brand", "that scales."],
        subline: "If your academy or product needs a visual system built for LATAM — let's talk.",
        primaryLabel: "Book free audit →",
        primaryTo: "/audit",
        secondaryLabel: "View all cases",
        secondaryTo: "/cases",
      },
    },
  },
];

export const caseNiches = ["All", "AI SaaS", "Fintech", "Cybersecurity", "iGaming"] as const;
export type CaseNiche = (typeof caseNiches)[number];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function getCaseCoverScope(study: CaseStudy): string[] {
  if (study.coverScope?.length) return study.coverScope.slice(0, 4);
  return study.work.slice(0, 3).map((item) => item.title);
}

export function getOtherCases(slug: string, count = 3) {
  return cases.filter((c) => c.slug !== slug).slice(0, count);
}
