export type CaseMetric = { value: string; label: string };

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
};

export const cases: CaseStudy[] = [
  {
    slug: "nebula-ai",
    client: "Nebula AI",
    niche: "AI SaaS",
    format: "Marathon",
    duration: "9 months",
    preview:
      "Re-positioning and inbound system for an AI workflow platform scaling into enterprise.",
    headline: "How R-M helped Nebula AI turn inbound into a predictable channel.",
    heroMetrics: [
      { value: "+340%", label: "Organic traffic" },
      { value: "4.1×", label: "Qualified demos" },
      { value: "$2.4M", label: "ARR influenced" },
      { value: "9 mo", label: "Engagement" },
    ],
    primaryMetric: { value: "+340%", label: "Organic traffic in 6 mo" },
    situation:
      "Nebula AI had clear product traction with mid-market teams but no repeatable acquisition channel. Sales relied entirely on founder network and one paid loop with rising CAC.",
    challenge:
      "Positioning was diluted across three personas, the site read like a feature list, and content output had no thesis. Inbound contribution to pipeline was under 8%.",
    work: [
      {
        title: "Strategic positioning",
        body: "Narrowed ICP to two beachhead segments, rewrote the category narrative, and built a messaging architecture the team could ship against weekly.",
      },
      {
        title: "Site rebuild",
        body: "Replaced the marketing site with a thesis-led system: clear hero, segmented proof, and three deeply-built use-case pages instead of fifteen shallow ones.",
      },
      {
        title: "Content engine",
        body: "Published an opinionated weekly cadence aimed at the buyer, not the algorithm. Built distribution loops via founder POVs and partner co-writes.",
      },
    ],
    resultMetrics: [
      { value: "+340%", label: "Organic traffic" },
      { value: "4.1×", label: "Qualified demos / mo" },
      { value: "31%", label: "Inbound share of pipeline" },
      { value: "−42%", label: "Blended CAC" },
    ],
    resultsBody:
      "Inbound moved from a side channel to a core growth lever. The team now ships against a shared narrative, and sales conversations open with the buyer already pre-sold on the thesis.",
    quote: {
      text: "It is the first time marketing and product have been telling the same story. The pipeline followed within two quarters.",
      who: "Maya R.",
      role: "Co-founder, Nebula AI",
    },
    accent: "#7c5cff",
  },
  {
    slug: "vault-fintech",
    client: "Vault",
    niche: "Fintech",
    format: "Marathon",
    duration: "12 months",
    preview:
      "Repositioning + acquisition system redesign for a scaling EU fintech.",
    headline: "How R-M helped Vault rebuild acquisition from positioning up.",
    heroMetrics: [
      { value: "+312%", label: "Qualified leads" },
      { value: "2.7×", label: "Activation rate" },
      { value: "−38%", label: "CAC" },
      { value: "12 mo", label: "Engagement" },
    ],
    primaryMetric: { value: "+312%", label: "Qualified leads in 12 mo" },
    situation:
      "Vault was scaling across three EU markets with a strong product but blurry brand. Paid was carrying 80% of growth and unit economics were tightening.",
    challenge:
      "The team had outgrown the original positioning. New buyer segments were ignored, the funnel leaked at activation, and brand felt indistinguishable from incumbents.",
    work: [
      {
        title: "Repositioning",
        body: "Built a sharper category claim, defined two distinct ICPs, and pressure-tested the narrative with twelve buyer interviews before any creative work.",
      },
      {
        title: "Funnel redesign",
        body: "Rebuilt the acquisition flow end-to-end: landing systems per segment, qualification logic, and an onboarding sequence that compounded activation.",
      },
      {
        title: "Brand system",
        body: "Delivered a brand system with editorial weight — typography, motion language, and visual codes that the in-house team could extend without us.",
      },
    ],
    resultMetrics: [
      { value: "+312%", label: "Qualified leads" },
      { value: "2.7×", label: "Activation rate" },
      { value: "−38%", label: "Blended CAC" },
      { value: "+58%", label: "LTV / CAC" },
    ],
    resultsBody:
      "Vault moved from paid-dependent growth to a balanced acquisition mix, with brand pulling its weight across organic, partnerships and paid. The team now owns the system.",
    quote: {
      text: "They rebuilt how we talk about ourselves and how we acquire. Two things that used to be separate problems.",
      who: "David K.",
      role: "Head of Growth, Vault",
    },
    accent: "#e85d3a",
  },
  {
    slug: "sentinel-security",
    client: "Sentinel",
    niche: "Cybersecurity",
    format: "Sprint",
    duration: "10 weeks",
    preview:
      "Narrative + launch system for a cybersecurity vendor entering the EU mid-market.",
    headline: "How R-M helped Sentinel land in EU mid-market with a category narrative.",
    heroMetrics: [
      { value: "+185%", label: "Demo requests" },
      { value: "9", label: "Tier-1 press hits" },
      { value: "62%", label: "Win rate vs incumbents" },
      { value: "10 wk", label: "Engagement" },
    ],
    primaryMetric: { value: "+185%", label: "Demo requests in 10 wk" },
    situation:
      "Sentinel had a strong technical product but was entering a saturated EU mid-market against entrenched incumbents with bigger budgets.",
    challenge:
      "The team had ten weeks to land a credible narrative, ship a launch site, and equip sales — without diluting the technical credibility that mattered to security buyers.",
    work: [
      {
        title: "Narrative work",
        body: "Defined a category position that reframed the conversation away from feature comparisons and toward operating model — where Sentinel actually wins.",
      },
      {
        title: "Launch system",
        body: "Designed and shipped a launch site, a buyer-grade pitch deck, and a press package coordinated with the product GA.",
      },
      {
        title: "Sales enablement",
        body: "Built objection-handling playbooks and a discovery framework that turned the narrative into a repeatable sales motion.",
      },
    ],
    resultMetrics: [
      { value: "+185%", label: "Demo requests" },
      { value: "9", label: "Tier-1 press hits" },
      { value: "62%", label: "Win rate vs incumbents" },
      { value: "3.4×", label: "Pipeline / target" },
    ],
    resultsBody:
      "Sentinel landed the EU launch with a narrative buyers and analysts repeated back to them. The sales team closed against larger incumbents using the same language we built in week one.",
    quote: {
      text: "Ten weeks in we had a position, a site, and a sales motion that all said the same thing. That alignment is what won the early deals.",
      who: "Lukas P.",
      role: "CMO, Sentinel",
    },
    accent: "#3b82f6",
  },
  {
    slug: "ace-igaming",
    client: "ACE",
    niche: "iGaming",
    format: "Marathon",
    duration: "8 months",
    preview:
      "Creative direction and funnel optimization across multiple MENA GEOs.",
    headline: "How R-M helped ACE 4.7× ROAS across MENA GEOs.",
    heroMetrics: [
      { value: "4.7×", label: "ROAS" },
      { value: "+220%", label: "FTD volume" },
      { value: "−48%", label: "CPA" },
      { value: "8 mo", label: "Engagement" },
    ],
    primaryMetric: { value: "4.7×", label: "ROAS across MENA" },
    situation:
      "ACE was running aggressive paid across MENA with strong volume but unstable economics. Creative cycles were short and the funnel was leaking between click and FTD.",
    challenge:
      "High-risk niche, restrictive ad environments, and four GEOs each behaving differently. The team needed a system, not a one-off campaign.",
    work: [
      {
        title: "Creative direction",
        body: "Set up a per-GEO creative system with a clear hierarchy: hero concepts, iteration patterns, and a kill-criteria the team could run weekly.",
      },
      {
        title: "Funnel optimization",
        body: "Rebuilt the click-to-FTD path: landing variants per GEO, a sharper qualification step, and a re-engagement loop for drop-offs.",
      },
      {
        title: "Measurement",
        body: "Replaced vanity dashboards with a cohort view tied to FTD and 30-day deposit value — so creative decisions tracked to real economics.",
      },
    ],
    resultMetrics: [
      { value: "4.7×", label: "ROAS" },
      { value: "+220%", label: "FTD volume" },
      { value: "−48%", label: "CPA" },
      { value: "+3.1×", label: "30-day deposit value" },
    ],
    resultsBody:
      "ACE moved from chasing volume to optimizing for deposit value. The creative system now runs in-house and scales across new GEOs without losing efficiency.",
    quote: {
      text: "R-M built a creative and funnel system we still run today. The numbers held after they left, which is the only test that matters.",
      who: "Omar S.",
      role: "Head of Acquisition, ACE",
    },
    accent: "#c9a84c",
  },
];

export const caseNiches = ["All", "AI SaaS", "Fintech", "Cybersecurity", "iGaming"] as const;
export type CaseNiche = (typeof caseNiches)[number];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function getOtherCases(slug: string, count = 3) {
  return cases.filter((c) => c.slug !== slug).slice(0, count);
}
