import type { ServiceContent } from "../types";

export const performanceService: ServiceContent = {
  slug: "performance",
  name: "Performance Marketing",
  shortName: "Performance",
  tagline: "Structure before spend.",
  accent: "#3ae8a6",
  hero: {
    word: "profitable",
    paragraphs: [
      "Performance isn't a metric. It's a commitment. Every channel, creative, and budget decision is accountable to one thing — whether the campaign is profitable.",
      "We don't tick boxes in the ads manager. We connect analytics, media buying, and CRO into a performance engine. From the first traffic test to stable, predictable lead flow with a clear ROI on every channel.",
    ],
    primaryCta: "Test my campaigns",
  },
  blocks: [
    {
      n: "01",
      title: "Audit & Launch Strategy",
      subtitle: "Structure before spend",
      sections: [
        {
          heading: "Where we dig",
          items: [
            "Current campaigns: what's live, what's wasting budget, what has potential.",
            "Analytics & tracking: is the data you're acting on solid and accurate.",
            "Active funnel: where leads drop off and why.",
            "Optimization: what to fix, cut, or scale before launch.",
          ],
        },
        {
          heading: "Choosing the channels",
          items: [
            "We analyze your niche and product, factor in the budget, and define which channels to start with and what inventory to run.",
          ],
        },
      ],
    },
    {
      n: "02",
      title: "Campaign Management & Optimization",
      subtitle: "Feeding the funnel",
      sections: [
        {
          heading: "Monthly ops",
          items: [
            "Creative briefs: specs and direction for every new creative, ready for production.",
            "Campaign launches: new campaigns deployed within agreed budgets, on schedule.",
            "Optimization: scaling what works, cutting what doesn't, refreshing creatives.",
            "Performance analytics: ongoing tracking across all active campaigns.",
            "Funnel briefs: specs for new landing pages and funnel updates based on live data.",
            "Reporting: clear breakdown of what ran, what performed, and what's coming next.",
          ],
        },
        {
          heading: "How we test",
          items: [
            "Every hypothesis runs on a capped budget and a 7-day window. New creatives, updated landing pages, tracked against CTR, CR, CPL, ROI. For longer sales cycles, we measure CPL and lead quality with direct input from your sales team.",
          ],
        },
      ],
    },
    {
      n: "03",
      title: "Analytics & Attribution",
      subtitle: "Closing the loop on every conversion",
      sections: [
        {
          heading: "Inside the report",
          items: [
            "API tracking: ad networks get richer data for lookalike targeting.",
            "Data transfer: browser and CRM events passed directly through API.",
            "Reporting: live dashboards in Looker Studio.",
            "Mobile: AppsFlyer integrated when app event tracking is needed.",
          ],
        },
      ],
      cta: "Free performance audit",
    },
  ],
  outcomes: {
    title: "Paid media that pays back",
    items: [
      {
        title: "Your CPL just got cut in half",
        body: "From $75 to $30 per lead in 30 days. Qualified lead rate went from 0 to 40–50%. A market that felt too expensive to compete in opened up.",
      },
      {
        title: "Scaling stopped being a trade-off",
        body: "Daily lead volume went from 30 to 90. CPA dropped from $50 to $30. Controlled growth shouldn't come at the cost of quality. Or budget.",
      },
      {
        title: "Market entry that pays for itself",
        body: "First month in. ROAS 2.3–2.7 in the US market. SaaS B2B with a 3+ month user lifecycle. The funnel was profitable before the user lifecycle even completed.",
      },
      {
        title: "Paid finds the audience. Organic keeps it.",
        body: "Together they cover the funnel end to end — demand generated and demand captured.",
      },
    ],
  },
  socialProof: {
    title: "You close the bid…",
    cases: [
      {
        quote:
          "We used to look at our lead cost and wonder if we were just burning cash. Now the baseline is clear, and the quality is actually there.",
        attribution: "NDA",
        metrics: [
          {
            value: "$75 → $30",
            label: "CPL in 30 days · Qualified lead rate from zero to 50% within the first month",
          },
        ],
      },
      {
        quote:
          "Everyone told us the US market would eat our budget for at least six months before we'd see a dime. We broke even in week three.",
        attribution: "NDA",
        metrics: [
          {
            value: "2.7 ROAS",
            label:
              "US market entry · First month in. Profitable funnel with a 3+ month user lifecycle",
          },
        ],
      },
      {
        quote:
          "Our biggest fear was that scaling up would just bring us weak leads at a higher price. But we tripled the volume, and it stayed totally clean.",
        attribution: "NDA",
        metrics: [
          {
            value: "3× volume",
            label: "Daily leads from 30 to 90 while cutting CPA from $50 to $30",
          },
        ],
      },
    ],
  },
  closingQuote: "The clicks will happen anyway. Make them yours.",
  footerCta: "Build performance engine",
};
