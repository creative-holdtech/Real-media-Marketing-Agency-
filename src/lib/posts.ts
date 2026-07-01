import blog03 from "@/assets/blog-03.jpg";
import blog04 from "@/assets/blog-04.jpg";

/** Public cover art — synced to /public/blog/{slug}.jpg */
function blogCover(slug: string): string {
  return `/blog/${slug}.jpg`;
}

export type PostSection = {
  id: string;
  label: string;
  paragraphs: string[];
  image?: string;
};

export type Post = {
  slug: string;
  /** Filter bucket — Strategy, Positioning, Performance, Brand systems */
  category: string;
  /** Card kicker — Growth Strategy, Strategic Essay, Macro Trend, etc. */
  label: string;
  date: string;
  dateISO: string;
  read: string;
  title: string;
  /** Optional editorial line break for carousel / display headings. */
  titleLines?: string[];
  excerpt: string;
  image: string;
  imageAlt?: string;
  /** Card framing — use contain for tall mockups (e.g. phone screenshots). */
  imageFit?: "cover" | "contain";
  /**
   * Crop anchors so one asset works in portrait (home carousel) and landscape (blog cards).
   * Compose art center-weighted when possible — see CLAUDE.md blog image notes.
   */
  imageLayout?: {
    portrait?: string;
    landscape?: string;
  };
  author: string;
  featured?: boolean;
  body: string[];
  /** CMS sections with explicit headings (preferred over auto-split body) */
  sections?: PostSection[];
  metaTitle?: string;
  metaDescription?: string;
};

/** Six articles from PDF right column (first spread + later blog pages). */
export const posts: Post[] = [
  {
    slug: "cross-border-fintech-scale",
    category: "Strategy",
    label: "Growth Strategy",
    date: "May 21, 2026",
    dateISO: "2026-05-21",
    read: "8 min read",
    title: "Why cross-border fintechs fail to scale in EU & MENA markets",
    excerpt:
      "Regulatory fatigue, trust gaps, and localisation debt. A pattern study of twelve fintechs that entered both regions — and what separated the ones that survived.",
    image: blog04,
    imageAlt:
      "Brutalist exhibition poster with bold typography and architectural installation photography",
    imageLayout: { portrait: "50% 45%", landscape: "50% 48%" },
    author: "R-M Editorial",
    featured: true,
    body: [
      "Every fintech that enters a second market does so believing the first market taught them everything they need to know. It didn't. The playbook that built your first ten thousand users in Western Europe is precisely the thing that will slow you down in MENA — and the reverse is equally true.",
      "The teams we've observed across both regions share a common failure mode: they export their positioning wholesale. Same website, same onboarding, same messaging hierarchy. They adjust the language and the currency symbol, and they call it localisation. The market notices immediately, even if the team doesn't.",
      "Regulatory overhead is the visible problem. Licensing timelines, KYC requirements, and payment rail access vary enormously — and the teams that underestimate this don't fail loudly. They fail slowly, burning runway on compliance while the marketing budget sits unused, waiting for a product that can legally ship.",
      "The less visible problem is trust. Financial products require a level of institutional credibility that can't be manufactured in a press release. In MENA, this trust is often mediated through local partnerships — entities the market already knows. In EU, it's built through regulatory standing and editorial presence in specific publications. The teams who try to shortcut both end up with neither.",
      "What we've learned from the teams that scaled both regions is simple: they treated each market as a first market. Not an expansion. A launch. With its own ICP, its own trust architecture, and its own positioning. The operational overhead was significant. The compounding returns were worth it.",
    ],
  },
  {
    slug: "cybersecurity-trust-building",
    category: "Positioning",
    label: "Positioning",
    date: "May 05, 2026",
    dateISO: "2026-05-05",
    read: "6 min read",
    title: "Building trust in cybersecurity: Why technical features alone won't sell",
    titleLines: [
      "Building trust in cybersecurity:",
      "Why technical features alone won't sell",
    ],
    excerpt:
      "In a category where every vendor claims best-in-class detection rates, the brands that win are the ones that make buyers feel safe before the demo.",
    image: blogCover("cybersecurity-trust-building"),
    imageAlt:
      "Editorial photograph — black and white hands placing notes on a wall",
    imageLayout: { portrait: "50% 50%", landscape: "50% 50%" },
    author: "R-M Editorial",
    body: [
      "The cybersecurity buyer is the most skeptical buyer in B2B. They have been burned by vendors who overpromised, by platforms that created new attack surfaces, by dashboards that showed activity without producing safety. By the time they reach your website, they are already waiting to be disappointed.",
      "Most cybersecurity vendors respond to this by adding more proof. More certifications. More analyst mentions. More customer logos. More technical documentation. The problem is that every competitor is doing the same thing, which means the more you prove, the more you look like everyone else.",
      "The brands that break through are the ones who understand that trust in this category is not built by demonstrating capability. It is built by demonstrating restraint. They don't claim to solve everything. They are specific about what they won't do. They publish things that make the buyer smarter, not things that make the vendor look impressive.",
      "There is a phrase we use with clients in this space: earn the right to the demo. The demo is where your technical features live. Before the demo, the buyer is not evaluating your technology — they are evaluating whether you understand their situation. If your website, your content, and your outreach all feel like they were written for a different company's buyer, you will not get the call.",
      "The positioning work in cybersecurity is slow and unsexy. It involves saying fewer things, with more precision, to a smaller audience. It involves choosing one threat vector to own editorially and defending it consistently for twelve months. The teams that do this build a category position that is very hard to compete with. The teams that don't stay in the feature comparison loop indefinitely.",
    ],
  },
  {
    slug: "b2b-performance-marketing",
    category: "Performance",
    label: "Performance",
    date: "Apr 29, 2026",
    dateISO: "2026-04-29",
    read: "7 min read",
    title: "B2B performance marketing is broken: How to track pipeline instead of clicks",
    excerpt:
      "Clicks, impressions, and MQLs are metrics of activity, not outcomes. Here is what pipeline-attributed reporting actually looks like — and why most teams resist it.",
    image: blogCover("b2b-performance-marketing"),
    imageAlt:
      "Editorial photograph — concentric staircase sculpture with radiating floor lines",
    imageLayout: { portrait: "50% 50%", landscape: "50% 50%" },
    author: "R-M Editorial",
    body: [
      "The performance marketing dashboard looks healthy. CTR is up. CPL is down. The weekly report shows green everywhere. And yet the sales team is complaining that leads don't convert, and the CFO is asking why revenue isn't moving. This is not a coincidence. It is a measurement problem.",
      "B2B performance marketing was built on frameworks borrowed from e-commerce, where the purchase happens online, the attribution is clean, and a click genuinely represents intent. In B2B, none of those things are true. The purchase happens in a conversation, the attribution is disputed, and a click represents curiosity at best.",
      "The shift to pipeline-attributed reporting is uncomfortable for most marketing teams because it makes performance worse — at first. When you stop counting form fills and start counting deals influenced, the numbers drop. The team looks less productive. The agency looks less impressive. The CFO is briefly less confused and more concerned.",
      "But the teams that make this shift stop optimising for the wrong thing. They stop bidding on keywords that generate cheap leads from people who will never buy. They stop nurturing contacts who were never prospects. They start concentrating spend on the channels and messages that have traceable lines to revenue — even when those lines take six months to draw.",
      "The practical starting point is simpler than most vendors make it. You need three things: a CRM that tracks lead source, a sales team willing to log where conversations come from, and a marketing team willing to be evaluated on pipeline contribution rather than traffic. The first two are easy. The third requires a conversation about what marketing is actually for.",
    ],
  },
  {
    slug: "buyers-compare-safe-decisions",
    category: "Strategy",
    label: "Strategic Essay",
    date: "May 15, 2026",
    dateISO: "2026-05-15",
    read: "7 min read",
    title: 'How buyers compare options and the real cost of "safe" decisions',
    excerpt:
      "The market is flooded with identical promises. What is the only way out — and how to decode the deeper context of how your specific audience perceives value.",
    image: blogCover("buyers-compare-safe-decisions"),
    imageAlt:
      "Editorial photograph — Wassily chair in a shaft of light with a standing silhouette on the wall",
    imageLayout: { portrait: "50% 50%", landscape: "50% 50%" },
    author: "R-M Editorial",
    body: [
      "Sophisticated buyers rarely choose the best product. They choose the option that feels least risky to defend in a meeting. That gap — between actual superiority and perceived safety — is where most B2B brands lose deals they never knew were competitive.",
      "When every competitor claims the same outcomes with slightly different adjectives, buyers stop listening to claims and start scanning for signals of seriousness. Who sounds specific. Who names trade-offs. Who appears to understand the cost of being wrong.",
      "The real cost of a safe decision is not the missed upside on the winning vendor. It is the twelve months your team spends executing a strategy built for a buyer psychology you never diagnosed. You optimise for comparison tables when the buyer was already emotionally committed elsewhere.",
      "Decoding how your audience perceives value starts with one uncomfortable interview question: what would make you fire us? The answers cluster into fears, not features. Fears are positioning raw material. Features are just proof you read the brief.",
      "Brands that win comparison-heavy markets do not add more proof. They reduce the number of ways a buyer can feel stupid for choosing them. That is a copy problem, a pricing problem, and a sales enablement problem — but it is always a positioning problem first.",
    ],
  },
  {
    slug: "marketing-dark-social-attribution",
    category: "Performance",
    label: "Macro Trend",
    date: "May 10, 2026",
    dateISO: "2026-05-10",
    read: "6 min read",
    title: "How to measure marketing when buyers leave no footprints",
    excerpt:
      "Buyers research products in dark social and hit your site ready to buy. We explained how to implement self-reported attribution to save your best channels.",
    image: blogCover("marketing-dark-social-attribution"),
    imageAlt:
      "Editorial photograph — hand turning pages in a printed report",
    imageLayout: { portrait: "50% 50%", landscape: "50% 50%" },
    author: "R-M Editorial",
    body: [
      "Most of your pipeline arrives with a blank attribution field and a firm opinion already formed. They did not discover you in a keyword auction. They were sent a screenshot in a founder group chat, watched two podcast clips, and asked a peer who already uses you.",
      "Dark social is not a channel problem. It is a measurement problem wearing a channel costume. Teams cut budgets that produced the screenshot because the screenshot does not show up in last-click reporting.",
      "Self-reported attribution is crude and imperfect. It is also more honest than pretending a form fill on Tuesday explains a buying committee that started work in March. Ask where they first heard about you. Ask what convinced them. Log it with the same discipline as SQL stages.",
      "The teams that implement this well see an immediate shift in budget allocation. Podcasts, communities, and founder networks stop looking like hobbies. Brand work stops being judged only on direct response lag. You start funding the things that create conviction before the click.",
      "Measurement does not need to be perfect to be directionally true. It needs to be consistent enough that you stop optimising for the dashboard and start optimising for the buyer journey you actually have.",
    ],
  },
  {
    slug: "creation-vs-dominance",
    category: "Brand systems",
    label: "Market Watch",
    date: "May 20, 2026",
    dateISO: "2026-05-20",
    read: "6 min read",
    title: "Creation vs. dominance: finding your unfair advantage in a crowded market",
    excerpt:
      "You don't need to invent a new market to win. Here we break down strategies for positioning against established giants.",
    image: blog03,
    imageAlt: "Mobile portfolio mockup with abstract 3D sculpture and warm studio lighting",
    imageFit: "contain",
    imageLayout: { portrait: "50% 28%", landscape: "50% 35%" },
    author: "R-M Editorial",
    body: [
      "Early-stage teams are told to find a wedge. Later-stage teams are told to defend a moat. Almost nobody is told the middle truth: most markets reward a clear point of view long before they reward product superiority.",
      "Creation is the work of making a category legible — naming the problem, framing the stakes, publishing the vocabulary buyers will use in internal meetings. Dominance is the work of owning that vocabulary once it exists. Confusing the two is how startups market like incumbents and lose.",
      "You do not need a new market to win. You need a narrower story inside an existing market that incumbents cannot tell without cannibalising their own narrative. Giants sound generic because generic protects revenue lines.",
      "Positioning against established players is not a feature comparison exercise. It is a credibility transfer exercise. Who are you similar enough to for trust, and different enough from for attention? That line is your unfair advantage if you defend it consistently.",
      "Market watch is not prophecy. It is pattern recognition with discipline — noting which stories are getting tired, which claims are becoming table stakes, and which angles still produce a pause in the buyer's scroll. That pause is where you build.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const archive = posts.filter((p) => !p.featured);
export const featured = posts.find((p) => p.featured)!;

export function postsInCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category);
}
