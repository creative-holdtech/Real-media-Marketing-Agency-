import type { ServiceContent } from "../types";

export const smmService: ServiceContent = {
  slug: "smm",
  name: "Social Media Marketing",
  shortName: "SMM",
  tagline: "Replacing the cold pitch.",
  accent: "#7c5cff",
  hero: {
    word: "seen",
    paragraphs: [
      "You may not believe that social media impacts your deals. That's ok. We can show you.",
      "But if you just want posting to simulate activity — that's not us.",
      "We tactically choose platforms and turn them into a channel for comms, reputation, and sales. When decision-makers check your profiles, they see a future partner, not another generic page.",
    ],
    primaryCta: "Test my socials",
  },
  blocks: [
    {
      n: "01",
      title: "Strategy & Content",
      subtitle: "Replacing the cold pitch",
      sections: [
        {
          heading: "Where we dig",
          items: [
            "5–10 competitors: dissecting ToV, formats, and frequency; finding gaps your brand can own.",
            "Comms SWOT: a look at your visuals, consistency, expertise, formats, ToV, and reach.",
            "3-to-6-month hypotheses: a list of strategic experiments with clear expected outcomes.",
          ],
        },
        {
          heading: "How we build",
          items: [
            "Content pillars: 4–6 core topics translated into specific formats.",
            "Channel plan: adapted, incl. the CEO/Head's personal brand (if needed).",
            "Strategy reviews: quarterly analytics and updating the tactics.",
          ],
        },
        {
          heading: "What you keep",
          items: [
            'Your Tone of Voice: a practical guide with 3–5 brand voice traits and clear "Do / Don\'t" examples.',
            "Creative solutions: ready-to-use templates, patterns, font pairings, Reels covers, highlights, and motion.",
          ],
        },
      ],
      notes: [
        "Our team covers every role and niche from start to finish.",
        "We don't wait for the quarter to end. If something stops converting, we rewire the strategy and test new hypotheses immediately.",
      ],
    },
    {
      n: "02",
      title: "Posting & Channels management",
      subtitle: "Putting the strategy to work",
      sections: [
        {
          heading: "What goes live monthly",
          items: [
            "Scheduled content: a fixed volume of posts, Reels, and stories, as agreed in the contract.",
            "Copy & storytelling: posts, captions, carousels, CTAs, hashtags. Edited and proofread to match your Tone of Voice.",
            "Visuals & design: template adaptation, carousel design, Reels covers, highlights, infographics, banners. All in a unified brand book style.",
            "Situational content: daily trend monitoring. When a trend hits the mark, we adapt it and deploy outside the plan.",
            "Profile maintenance: keeping your bio, links, navigation, and highlights clean and updated.",
            "Monthly reporting: an actionable breakdown of your core performance metrics.",
          ],
        },
        {
          heading: "How we back it up",
          items: [
            "Ongoing monitoring of stats, comments, niche feedback, and shares.",
            "Regular syncs (weekly or monthly) to review the data and keep the system on track.",
          ],
        },
      ],
    },
    {
      n: "03",
      title: "Analytics & Reporting",
      subtitle: "Proving the ROI and adjusting the system",
      sections: [
        {
          heading: "Inside the report",
          items: [
            "MoM metrics: reach, views, profile visits, and clicks now vs. the previous month.",
            "Audience: new follower count, growth percentage, key sources (Reels, shares, ads).",
            "Top-performers: best posts ranked by reach, ER, and conversion into actions.",
            "Demographics: age, gender, and GEO changes compared to the past month.",
            "Collabs: clear data for every partner post or integration.",
            "Plan execution: exact numbers on scheduled and extra content published.",
            "Insights & hypotheses: what worked, what failed, new patterns discovered.",
          ],
        },
      ],
      notes: ["Executive summary + next month's action plan."],
      cta: "Free SMM audit",
    },
  ],
  outcomes: {
    title: "System that closes deals",
    items: [
      {
        title: "Content stops eating cash",
        body: "Channels bring in early leads. You get the upfront trust that turns profile views into business actions, making your socials a metrics driver, not an expense.",
      },
      {
        title: "First inbound leads",
        body: "Partnerships and client inquiries come to you directly. You see exactly what triggered the request, with a clear ROI on every channel.",
      },
      {
        title: "You don't fund theories",
        body: "A hypothesis-tested plan for the upcoming quarter. You get a stop-list to protect your budget, and a clean funnel with a measurable CPL.",
      },
      {
        title: "You own the system",
        body: "Now you have a functional asset instead of buying SMM services. An engine that carries your brand, brings in partners, leads, and is ready to scale.",
      },
    ],
  },
  socialProof: {
    title: "Your social media is capable of…",
    cases: [
      {
        quote:
          "We raised 2,000,000 UAH in donations just from our posts, and supporters started to reach out to us on their own.",
        attribution: "Charitable Foundation",
        metrics: [
          { value: "2,000,000 UAH", label: "Raised in donations through content" },
          { value: "10,100", label: "Subscribers in a year · +2,525% audience growth" },
          { value: "1M", label: "Organic Reels views with zero paid advertising" },
          { value: "2M views", label: "72,165 likes · Top-performing post went viral" },
        ],
      },
      {
        quote:
          "In just three months, our engagement rate went through the roof. The final numbers are well above our expectations.",
        attribution: "NDA",
        metrics: [
          { value: "140% → 241% → 175%", label: "ER dynamics over three months" },
          { value: "48,844 views", label: "From the top-performing Reels" },
        ],
      },
      {
        label: "Personal brand launch · Bringing the Head of Affiliate into the spotlight",
        quote:
          "Launching on multiple platforms all at once really paid off. Our Insta reach grew nearly fourfold in just a month, and the ad performance was way ahead of what we've seen before.",
        attribution: "NDA",
        metrics: [
          { value: "46,700 → 175,500", label: "Monthly Instagram reach growth (×3.7)" },
          { value: "3% CTR", label: "In ad performance · 3–6× higher than niche average" },
          { value: "9", label: "Media collabs successfully launched and executed" },
        ],
      },
    ],
  },
  closingQuote: "Your client is reading your feed right now. While you hesitate.",
  footerCta: "Build SMM engine",
};
