/** Frozen copy for /about — do not edit wording without client sign-off. */

export const aboutMeta = {
  title: "About — R-M Studio",
  description:
    "R-M is a strategic marketing agency for founders in Fintech, AI SaaS, Cybersecurity, and iGaming. Ten senior experts. No outsourcing.",
  ogTitle: "About — R-M Studio",
  ogDescription:
    "Senior strategy and brand for founders who ship. Four operators, four cities, zero subcontractors.",
} as const;

export const aboutHero = {
  tag: "R—M marketing agency · est. 2025",
  titleLine1: "Strategic partnership",
  titleLine2: "for founders who build to scale",
  lead:
    "A focused team for Fintech, AI SaaS, Cybersecurity, and iGaming. 10 senior experts. No outsourcing.",
  ctaPrimary: "Book free audit →",
  ctaSecondary: "Our core areas",
} as const;

export const aboutMetrics = {
  tag: "By the numbers",
  title: "Ten years. Compounded across founder teams.",
  subtitle: "Numbers that describe the agency better than any deck slide.",
  items: [
    {
      id: "capital",
      value: "€10M",
      label: "Raised by founder teams we positioned and packaged.",
      tag: "Capital raised 2025—2026",
      animate: false,
    },
    {
      id: "projects",
      value: "50",
      label: "End-to-end identity + GTM, since 2025.",
      tag: "Projects shipped",
      animate: true,
      numericTarget: 50,
      suffix: "",
    },
    {
      id: "retention",
      value: "92%",
      label: "On year and beyond.",
      tag: "Retention",
      animate: true,
      numericTarget: 92,
      suffix: "%",
    },
    {
      id: "operating",
      value: "2y",
      label: "Independent.",
      tag: "Operating",
      animate: false,
    },
  ],
} as const;

export const aboutPosition = {
  tag: "The position",
  srHeading: "Manifesto",
  lines: [
    "We're not a hands-off vendor.",
    "But an extension of your team, wired into market context.",
    "We killed the generic agency layers to ship execution focused on the outcomes that show up on your cap table.",
  ],
} as const;

export const aboutSectors = {
  tag: "Verticals",
  title: "Four spaces we lock into.",
  subtitle: "We go deep where our work compounds.",
  items: [
    {
      id: "ai-saas",
      n: "01",
      title: "AI SaaS",
      body: "Positioning, pricing models, launch execution for AI-native software to capture early category authority.",
      imageKey: "ai",
    },
    {
      id: "fintech",
      n: "02",
      title: "Fintech + Web3",
      body: "Brand architecture, positioning, growth infrastructure for regulated finance and web3 protocols to secure user conviction.",
      imageKey: "fintech",
    },
    {
      id: "cyber",
      n: "03",
      title: "Cybersecurity",
      body: "Positioning, category strategy, demand generation for DevSecOps and security tools to scale enterprise pipeline.",
      imageKey: "b2b",
    },
    {
      id: "igaming",
      n: "04",
      title: "iGaming",
      body: "Brand architecture, acquisition strategy, retention infrastructure for entertainment and gaming platforms to maximize user LTV.",
      imageKey: "hospitality",
    },
  ],
} as const;

export const aboutPersonnel = {
  tag: "Team",
  title: "The people who ship the work.",
  subtitle: "Ten senior operators. Every engagement is led, not delegated.",
  members: [
    {
      id: "rm",
      initials: "RM",
      name: "R. Mirza",
      role: "Founder · Strategy",
      spec: "Positioning · GTM",
      city: "Kyiv",
      blurb:
        "Founder-led strategy and positioning. Twelve years turning ambiguous markets into sharp, defensible narratives.",
      photoKey: "rm",
    },
    {
      id: "al",
      initials: "AL",
      name: "A. Levchenko",
      role: "Creative Director",
      spec: "Brand systems",
      city: "Berlin",
      blurb:
        "Brand systems with operational teeth. Identity, art direction and motion built to scale across every surface.",
      photoKey: "al",
    },
    {
      id: "sk",
      initials: "SK",
      name: "S. Karim",
      role: "Performance Lead",
      spec: "Paid · Lifecycle",
      city: "Dubai",
      blurb:
        "Designs the marks, type and motion that make the work unmistakable in feed, deck and product.",
      photoKey: "sk",
    },
    {
      id: "jd",
      initials: "JD",
      name: "J. Dovgan",
      role: "Brand Designer",
      spec: "Identity · Motion",
      city: "Lisbon",
      blurb:
        "Designs the marks, type and motion that make the work unmistakable in feed, deck and product.",
      photoKey: "jd",
    },
  ],
} as const;

export const aboutCta = {
  title: "Time to align your marketing with your cap table.",
  titleAccent: "",
} as const;
