/** Frozen copy for /about — do not edit wording without client sign-off. */

export const aboutMeta = {
  title: "About — R-M Studio",
  description:
    "R-M is a strategic marketing agency for founders in Fintech, AI SaaS, Cybersecurity, and iGaming. Ten senior experts. No outsourcing.",
  ogTitle: "About — R-M Studio",
  ogDescription:
    "A focused team for Fintech, AI SaaS, Cybersecurity, and iGaming. 10 senior experts. No outsourcing.",
} as const;

export const aboutHero = {
  tag: "R—M marketing agency · est. 2025",
  titleLine1: "Strategic partnership",
  titleLine2: "for founders who build to scale",
  lead: "A focused team for Fintech, AI SaaS, Cybersecurity, and iGaming. 10 senior experts. No outsourcing.",
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
      value: "€10M+",
      label: "Raised by founder teams we positioned and packaged.",
      tag: "Capital raised by our clients in 2025–2026",
      animate: true,
      numericTarget: 10,
      prefix: "€",
      suffix: "M+",
    },
    {
      id: "projects",
      value: "50+",
      label: "End-to-end identity + GTM, since 2025.",
      tag: "Projects shipped",
      animate: true,
      numericTarget: 50,
      suffix: "+",
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
      animate: true,
      numericTarget: 2,
      suffix: "y",
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
  tag: "Spaces",
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

export const aboutTeam = {
  tag: "Team",
  title: "The people who ship the work.",
  subtitle: "Seven active operators. Every engagement is led, not delegated.",
  members: [
    {
      id: "tamara",
      name: "Tamara",
      role: "Project Holder",
      status: "Active",
      lead: true,
      photoKey: "07",
      bio: "Takes full ownership of projects from initial concept to successful launch. Coordinates the team, tracks key milestones, and ensures goals are met on schedule.",
    },
    {
      id: "veronica",
      name: "Veronica",
      role: "Head of Strategy",
      status: "Active",
      photoKey: "04",
      bio: "Builds strategies that thrive in regulated environments and highly competitive markets. Finds the exact leverage points in complex niches where standard approaches fail.",
    },
    {
      id: "sasha",
      name: "Sasha",
      role: "SMM Manager",
      status: "Active",
      photoKey: "05",
      bio: "Manages brand presence and communication across key social platforms and communities. Adapts content formats to fit highly competitive and fast-moving verticals.",
    },
    {
      id: "vlad",
      name: "Vlad",
      role: "Performance Marketing Manager",
      status: "Active",
      photoKey: "03",
      bio: "Sets up and optimizes paid traffic campaigns in highly competitive niches. Keeps client acquisition costs under control while pushing for peak conversion volume.",
    },
    {
      id: "kirill",
      name: "Kirill",
      role: "Head of Sales",
      status: "Active",
      photoKey: "01",
      bio: "Converts key prospects into long-term partners and focuses on steady revenue generation. Ensures the sales team moves fast and keeps conversion rates consistent.",
    },
    {
      id: "nadia",
      name: "Nadia",
      role: "Operational Manager",
      status: "Active",
      photoKey: "02",
      bio: "Keeps daily ops running smoothly and ensures projects are delivered on time. Coordinates internal workflows and resources to keep the team focused and efficient.",
    },
    {
      id: "yulia",
      name: "Yulia",
      role: "Designer",
      status: "Active",
      photoKey: "06",
      bio: "Creates clean, sharp visuals that grab attention in highly competitive markets. Combines strong aesthetics with clear logic to turn ideas into working layouts.",
    },
  ],
} as const;

export const aboutCta = {
  title: "Time to align your marketing with your cap table.",
  titleAccent: "",
} as const;
