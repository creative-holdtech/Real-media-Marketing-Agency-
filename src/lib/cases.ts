import aboutHero from "@/assets/about-hero.png";
import engageBg from "@/assets/engage-bg.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import { caseAsset, caseGalleryImage, deckImage } from "@/lib/case-deck-images";

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
    periodLabel?: string;
    status: string;
  };
  overview: {
    heading: string;
    body: string;
    scope: string[];
    startingMetrics?: CaseMetric[];
  };
  problem: {
    heading: string;
    body: string;
    cards: { title: string; body: string }[];
  };
  identity?: {
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
  niche: "AI SaaS" | "Fintech" | "Web3 / Fintech" | "Cybersecurity" | "iGaming";
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
  /** object-position for home hover card — crops deck chrome (title bars, footer rules) */
  homePreviewPosition?: string;
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
  /** When false, hidden from home `#work` teaser (case page stays live). */
  homeFeatured?: boolean;
};

/** Display-normalized engagement length (sentence case, months label). */
export function formatCaseDuration(duration: string): string {
  const trimmed = duration.trim();
  if (!trimmed) return trimmed;

  const months = trimmed.match(/^(\d+)\s*months?$/i);
  if (months) return `${months[1]} months`;

  const upperMonths = trimmed.match(/^(\d+)\s*MONTHS?$/);
  if (upperMonths) return `${upperMonths[1]} months`;

  return trimmed;
}

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
      { value: "21%", label: "Brand awareness in niche" },
      { value: "317", label: "Social media followers" },
      { value: "~6,000", label: "Average content views" },
      { value: "3", label: "Media placements" },
    ],
    primaryMetric: { value: "+35%", label: "Brand growth in 6 mo." },
    situation:
      "Tequila is a CPA network with in-house media buying, specialising in iGaming with 300+ brands across Tier 1, Tier 2, and Tier 3 regions — including Africa.",
    challenge:
      "The team needed a comprehensive audit of brand communications and a core go-to-market strategy aligned with two objectives: increasing brand awareness and attracting new partners to the network.",
    work: [
      {
        title: "Identity & branding",
        body: "Built Tequila’s visual identity from the ground up — logo system, brand guidelines, and a distinctive voice that stands out in a crowded CPA market.",
      },
      {
        title: "Web & landing design",
        body: "Designed and shipped a conversion-focused site and landing system that explains the offer clearly to solo buyers and teams alike.",
      },
      {
        title: "Performance creatives and SMM",
        body: "Produced a high-volume stream of performance creatives and social content — from Buyer Awards campaigns to localized Instagram series.",
      },
    ],
    resultMetrics: [
      { value: "+35%", label: "Brand growth" },
      { value: "300+", label: "Active brand partners" },
      { value: "3", label: "Award categories" },
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
    previewImage: caseAsset("tequila-cpa", "hover.png"),
    homePreviewPosition: "50% 50%",
    coverTreatment: "logo",
    heroImage: nicheHospitality,
    fallbackCover: engageBg,
    fallbackHero: nicheHospitality,
    coverScope: ["Identity & branding", "Web & landing", "Performance and SMM"],
    layout: "rich",
    rich: {
      titleLines: ["Brand system", "for a CPA network"],
      subline:
        "Tequila had it all: strong offer, reliable team, and global coverage. But not yet the recognition. Together we closed that gap.",
      meta: {
        client: "Tequila CPA",
        scope: "Brand, Web, Performance and SMM",
        year: "2024",
        status: "Live · tequila.cpa",
      },
      overview: {
        heading: "Project intro",
        body: "TEQUILA CPA: in-house media buying, iGaming-focused; 300+ brands, 500+ offers.",
        startingMetrics: [
          { value: "21%", label: "Brand awareness in niche" },
          { value: "317", label: "Social media followers" },
          { value: "~6,000", label: "Avg content views" },
          { value: "3", label: "Media placements" },
        ],
        scope: ["Identity & Branding", "Web & Landing Design", "Performance Creatives and SMM"],
      },
      problem: {
        heading: "The challenge",
        body: "The iGaming affiliate market has a trust problem. Networks ghosting partners, offers going in unchecked, support tickets disappearing into the void. Buyers got burned enough times to develop a simple rule: stick to the names you know. Or work solo.\n\nTequila needed a brand partners could trust before the first deal — not another generic network look in a crowded iGaming market.\n\nTequila had vetted offers, infrastructure, and the team. But no recognition. In a market where reputation is the price of entry, that was the only thing that mattered.",
        cards: [
          {
            title: "Brand awareness",
            body: "Raise visibility across Tier 1, Tier 2, and Tier 3 — with a voice the market recognises as Tequila, not interchangeable CPA noise.",
          },
          {
            title: "Community recognition",
            body: "Build a strong presence inside the iGaming and Affiliate community — among buyers, networks, and industry players.",
          },
          {
            title: "Partner acquisition",
            body: "Turn brand visibility into inbound partner requests — new affiliates and teams coming in without cold outreach.",
          },
          {
            title: "Performance at volume",
            body: "Produce paid social and performance creatives at scale — consistent and on-brand across every campaign.",
          },
        ],
      },
      deliverables: {
        heading: "From brief to brand — three deliverable tracks. One GTM system.",
        items: [
          {
            title: "Identity & Branding",
            body: "Logo system, brand guidelines, merch-ready applications — all the team needs to show up consistently, from partner decks to conference booths.",
          },
          {
            title: "Web & Landing Design",
            body: "A site and landing system built around one goal: make the Tequila offer impossible to misread — whether it's a solo buyer or a full team.",
          },
          {
            title: "Performance Creatives and SMM",
            body: "Paid social at volume. Campaign series, expert content, infrastructure storytelling, inside- and cross-niche collabs.",
          },
        ],
      },
      platform: {
        heading: "The engine that keeps running",
        body: "Every part of this system focuses on one thing: driving long-term partnership value.",
        features: [
          {
            title: "+35% brand growth",
            body: "Six-month brand growth acceleration after the identity and GTM system went live.",
          },
          {
            title: "300+ brand partners",
            body: "Network scale across Tier 1, Tier 2, and Tier 3 regions including Africa.",
          },
          {
            title: "Industry recognition",
            body: "Nominated for Best: PR Campaign, Corporate Style, CPA Network. A continuous track record since 2023 across independent industry awards.",
          },
          {
            title: "System handover",
            body: "Tequila in-house team took over the SMM and performance templates, scaling them freely while keeping the original voice intact.",
          },
        ],
      },
      galleryHeading: "Campaign and SMM gallery",
      galleryLead:
        "Device mockups, seamless carousels, and performance frames — the live creative system we built for tequila.cpa across Tier 1–3.",
      gallery: [
        {
          src: caseGalleryImage("tequila-cpa", "kawasaki-carousel-mockup.png"),
          alt: "Kawasaki Ninja giveaway — seamless Instagram carousel across three screens",
        },
        {
          src: caseGalleryImage("tequila-cpa", "tequila-boost-mockup.png"),
          alt: "Tequila Boost contest landing page on tablet",
        },
        {
          src: caseGalleryImage("tequila-cpa", "peru-hub.png"),
          alt: "Peruvian market hub — GEO storytelling post",
        },
        {
          src: caseGalleryImage("tequila-cpa", "beach-cr.png"),
          alt: "CR conversion rate — beach scene creative",
        },
        {
          src: caseGalleryImage("tequila-cpa", "hr-experts.png"),
          alt: "HR experts recruitment creative",
        },
        {
          src: caseGalleryImage("tequila-cpa", "studio-bricks.png"),
          alt: "Studio bricks — brand editorial shoot",
        },
        {
          src: caseGalleryImage("tequila-cpa", "gym-product.png"),
          alt: "Gym product category creative",
        },
        {
          src: caseGalleryImage("tequila-cpa", "checklist-wave.png"),
          alt: "Checklist wave — onboarding series",
        },
      ],
      closing: {
        titleLines: ["Ready for the next", "partner wave?"],
        subline:
          "If your network needs a brand that converts attention into partners — let’s talk.",
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
    duration: "11 months",
    preview:
      "Licensed crypto exchange — a clear visual language across brand, web, app, and platform.",
    headline: "Clarity where the category defaults to noise.",
    heroMetrics: [
      { value: "VASP", label: "Licensed in Czech Republic" },
      { value: "BTC · ETH · USDC", label: "Supported assets" },
      { value: "3 steps", label: "Path to trading" },
      { value: "Live", label: "empresex.io" },
    ],
    primaryMetric: { value: "4 touchpoints", label: "Brand · web · app · platform" },
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
    previewImage: caseAsset("empresex", "hover.png"),
    homePreviewPosition: "50% 50%",
    coverTreatment: "logo",
    heroImage: deckImage("empresex", "cover"),
    fallbackCover: engageBg,
    fallbackHero: aboutHero,
    coverScope: ["Identity", "Web", "Mobile app", "Exchange"],
    layout: "rich",
    rich: {
      titleLines: ["Clarity where the category", "defaults to noise."],
      subline:
        "Crypto exchanges compete on complexity. Empresex bet on the opposite. We gave that bet a visual language.",
      meta: {
        client: "Empresex, Czech Republic",
        scope: "Brand, Web, Mobile, Platform",
        year: "2024",
        status: "Live at empresex.io",
      },
      overview: {
        heading: "Project intro",
        body: "The crypto exchange market is a crowded space. To say the least. Most exchanges look the same, promise the same, appear and disappear the same way. In a market where credibility is decided in seconds, looking the part isn't optional.\n\nEmpresex came in hot: licensed, transparent, and built for users — entering a niche that had seen too many projects that weren't.",
        scope: ["Identity & Branding", "Web & Landing Design", "Mobile App", "Exchange Platform"],
      },
      problem: {
        heading: "The challenge",
        body: "Empresex had outgrown its visual identity before it had fully launched. The product was licensed, fast, and built to last — but nothing on screen communicated that scale or security.\n\nThe product was ready. The team was ready. The brand wasn't.\n\nDesigning for intuitive crypto trading meant translating Empresex's focus on transparency, advanced security, and fast execution into a visual language that holds across every touchpoint. From the first website visit through account verification and live trading, the experience needed to feel calm, credible, and unmistakably Empresex.\n\nThe system also had to scale with the product — across new assets, flows, and markets — without losing the clarity that makes the brand work.",
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
        heading: "Four deliverables. One aligned system.",
        items: [
          {
            title: "Identity & Branding",
            body: "Logo, icons, typographic system, colour palette, and brand guidelines — built directly around Empresex's identity as a licensed, transparent exchange.",
          },
          {
            title: "Web & Landing Design",
            body: "Translating brand positioning into a high-trust digital experience: an interactive marketing site with product and instant-exchange previews, value propositions, and a three-step onboarding flow.",
          },
          {
            title: "Mobile App",
            body: "Streamlining crypto operations for small screens: exchange core, secure payment flows, funds transfer confirmation, and authentication, optimised for intuitive mobile UI.",
          },
          {
            title: "Exchange Platform",
            body: "Web dashboard with balance overview, budget statistics, quick transaction panel, withdrawal flow, multi-currency portfolio sidebar, and recent transactions — plus a smooth, production-ready design-system handoff.",
          },
        ],
      },
      platform: {
        heading: "Design approach",
        body: "A grayscale UI foundation reduces visual fatigue when reading financial data, while the signature Gold Element directs attention to primary user actions.",
        features: [
          {
            title: "Instant exchange",
            body: "An instant conversion interface for Bitcoin, Ethereum, and USDC — a clear, convenient flow designed to mirror the live website widget.",
          },
          {
            title: "Dashboard",
            body: "A data-driven layout putting total balance front and centre, with secondary budget statistics below and a quick-action panel for core operations.",
          },
          {
            title: "Verification & onboarding",
            body: "A step-by-step journey mapping registration, activation, and KYC into a fast, clear flow designed for a five-minute verification experience.",
          },
          {
            title: "Design system",
            body: "A production-ready Figma token library and component set, fully documented to keep design consistent across new flows and markets.",
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
    slug: "currency",
    client: "Currency",
    niche: "Web3 / Fintech",
    format: "Marathon",
    duration: "Live",
    preview:
      "Regulated crypto exchange — communication strategy, PR, SMM, influencer partnerships, and video content.",
    headline: "User acquisition through brand authority.",
    heroMetrics: [
      { value: "30,878", label: "New verified accounts" },
      { value: "120+", label: "Countries covered" },
      { value: "4", label: "Core channels" },
      { value: "Live", label: "Campaign status" },
    ],
    primaryMetric: { value: "30,878", label: "New verified accounts" },
    situation:
      "Currency is a regulated crypto exchange and digital asset platform operating across more than 120 countries, with coverage in the U.S. and Europe.",
    challenge:
      "Strict KYC makes the entry barrier unusually high. The acquisition system had to move beyond low-quality traffic, earn trust at every step, and convert high-intent users into active traders.",
    work: [
      {
        title: "PR & industry authority",
        body: "Built systematic visibility in Tier-1 and crypto-native media to establish trust for a regulated financial service and secure broad audience coverage.",
      },
      {
        title: "SMM & community infrastructure",
        body: "Turned social channels into an educational, trust-building hub for transparent product updates, market insight, and post-onboarding retention.",
      },
      {
        title: "Influencer partnerships & KOLs",
        body: "Used data-backed scouting and tailored activations with trusted analysts, traders, and industry leaders to reach warm, pre-vetted audiences.",
      },
      {
        title: "Content production & scale",
        body: "Produced and distributed short-form content and deep-dive product explainers that made platform security and features easier to understand.",
      },
    ],
    resultMetrics: [
      { value: "30,878", label: "New verified accounts" },
      { value: "120+", label: "Countries covered" },
      { value: "4", label: "Synchronized channels" },
      { value: "0", label: "Reliance on low-grade traffic" },
    ],
    resultsBody:
      "PR, social, influencer partnerships, and video now operate as one acquisition funnel — building authority, growing a high-quality audience, and reducing acquisition costs below standard crypto advertising.",
    quote: {
      text: "Every step of the user journey must earn trust and convert it into active users.",
      who: "R—M",
      role: "Acquisition principle",
    },
    accent: "#60a5fa",
    coverImage: nicheFintech,
    previewImage: nicheFintech,
    homePreviewPosition: "center center",
    coverTreatment: "photo",
    heroImage: nicheFintech,
    fallbackCover: nicheFintech,
    fallbackHero: aboutHero,
    coverScope: ["PR", "SMM", "Influencer marketing", "Production"],
    layout: "rich",
    rich: {
      titleLines: ["User acquisition", "through brand authority."],
      subline:
        "Communication strategy engineered for a regulated crypto exchange — scaling new account creation through synchronized media, content, and creator networks.",
      meta: {
        client: "Currency",
        scope: "PR, SMM, Influencer Marketing, Production",
        year: "120+ countries",
        periodLabel: "Coverage",
        status: "Live · regulated infrastructure",
      },
      overview: {
        heading: "Project intro",
        body: "The client is a regulated crypto exchange and digital asset platform. The goal was to move beyond low-quality traffic and build a high-intent, deeply engaged user base.\n\nFor a regulated exchange, the entry barrier is extremely high because of strict KYC. Every step of the user journey must earn trust and convert it into active users. We built a full-funnel marketing system that turned industry authority into user growth.",
        scope: ["PR", "SMM", "Influencer Marketing", "Content Production"],
      },
      problem: {
        heading: "Strategy & objectives",
        body: "The challenge was to create a communication system that brings in high-quality leads, builds institutional and retail trust, and keeps users engaged after onboarding.",
        cards: [
          {
            title: "High-LTV acquisition",
            body: "Drive qualified, high-intent users through the strict KYC funnel and convert them into active platform traders.",
          },
          {
            title: "Cross-channel authority",
            body: "Establish institutional and retail trust through verified industry media, cutting through standard crypto noise.",
          },
          {
            title: "Community engagement",
            body: "Turn passive social media viewers into active brand advocates and community members.",
          },
          {
            title: "Influence calibration",
            body: "Deploy highly targeted influencer collaborations to reach warm, pre-vetted crypto audiences.",
          },
        ],
      },
      deliverables: {
        heading: "Four channels. One acquisition engine.",
        items: [
          {
            title: "PR & Industry Authority",
            body: "Systematic publishing in Tier-1 and crypto-native media — building the trust required for a regulated financial service and securing broad audience coverage.",
          },
          {
            title: "SMM & Community Infrastructure",
            body: "Social channels became an educational and trust-building hub, with direct interaction, transparent product updates, and market insight designed to retain users post-onboarding.",
          },
          {
            title: "Influencer Partnerships & KOLs",
            body: "Data-backed influencer scouting and tailored activations with trusted crypto analysts, traders, and industry leaders for direct conversion.",
          },
          {
            title: "Content Production & Scale",
            body: "Targeted distribution of short-form content and deep-dive product explainers, lowering the entry barrier by demonstrating platform security and features.",
          },
        ],
      },
      platform: {
        heading: "Building a real audience in a fake traffic world",
        body: "An end-to-end communication engine designed to reach the right audience at every stage of the user journey.",
        features: [
          {
            title: "High-quality user growth",
            body: "More than 30,878 new verified accounts created with zero reliance on low-grade traffic.",
          },
          {
            title: "Unified communications ecosystem",
            body: "PR, social, influencer partnerships, and video working as one funnel.",
          },
          {
            title: "Sustainable CAC reduction",
            body: "Organic video, trusted KOLs, and sharp PR reduced acquisition costs below standard crypto advertising.",
          },
        ],
      },
      closing: {
        titleLines: ["Turn authority", "into active users."],
        subline:
          "If your regulated product needs high-intent growth without low-grade traffic — let's talk.",
        primaryLabel: "Book free audit →",
        primaryTo: "/audit",
        secondaryLabel: "View all cases",
        secondaryTo: "/cases",
      },
    },
  },
];

export const caseNiches = [
  "All",
  "AI SaaS",
  "Fintech",
  "Web3 / Fintech",
  "Cybersecurity",
  "iGaming",
] as const;
export type CaseNiche = (typeof caseNiches)[number];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

/** Cases shown in home `#work` scroll scene and index. */
export function getHomeFeaturedCases(): CaseStudy[] {
  return cases.filter((c) => c.homeFeatured !== false);
}

/** Home #work index — hover card + mobile thumb (deck/gallery photo, not logo). */
export function getCaseHomePreviewImage(study: CaseStudy): string {
  if (study.previewImage) return study.previewImage;
  const gallery = study.rich?.gallery?.[0]?.src;
  if (gallery) return gallery;
  if (study.fallbackCover) return study.fallbackCover;
  return deckImage(study.slug, "cover");
}

export function getCaseHomePreviewPosition(study: CaseStudy): string {
  return study.homePreviewPosition ?? "center center";
}

export function isCaseHomePreviewPhoto(src: string): boolean {
  return !/logo\.(svg|png)$/i.test(src) && !src.endsWith(".svg");
}

export function getCaseCoverScope(study: CaseStudy): string[] {
  if (study.coverScope?.length) return study.coverScope.slice(0, 4);
  return study.work.slice(0, 3).map((item) => item.title);
}

export function getOtherCases(slug: string, count = 3) {
  return cases.filter((c) => c.slug !== slug).slice(0, count);
}
