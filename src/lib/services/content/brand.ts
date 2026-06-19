import type { ServiceContent } from "../types";

export const brandService: ServiceContent = {
  slug: "brand",
  name: "Marketing & Brand Strategy",
  shortName: "Brand Strategy",
  tagline: "Making everyone tell the same story.",
  accent: "#e8a23a",
  hero: {
    word: "chosen",
    paragraphs: [
      "Many companies have a product worth buying. Few can explain why it’s the one worth choosing, trying to be everything to everyone.",
      'We don’t sell marketing strategies. We build positioning your market remembers and, most importantly, your team can easily explain. By aligning your brand with market reality, we give an answer to “Why you?” question.',
    ],
    primaryCta: "Test my brand",
  },
  blocks: [
    {
      n: "01",
      title: "Positioning & Brand Strategy",
      subtitle: "Making everyone tell the same story",
      sections: [
        {
          heading: "Where we dig",
          items: [
            "Deep-dive interviews: with your team and (if possible) with clients.",
            "Market and competitor research: communication and presence.",
          ],
        },
        {
          heading: "Finding the right positioning",
          items: [
            "Unpacking DNA: founding idea, hidden strengths, what makes it uniquely yours.",
            "Mapping: where you stand today and where you can credibly compete.",
          ],
        },
        {
          heading: "What you keep",
          items: [
            "Brand platform: manifesto, positioning, communication idea.",
            "Brand toolkit: expressions, messaging, media planning.",
            "Verbal identity: tone of voice, descriptors, brand development zone.",
          ],
        },
      ],
      notes: [
        "Marketing is only as strong as its delivery. Without consistent market presence and ongoing confirmation, even the sharpest strategy stays a document.",
      ],
    },
    {
      n: "02",
      title: "Messaging & TOV",
      subtitle: "Locking in your character",
      sections: [
        {
          heading: "What we shape",
          items: [
            "Manifesto & story: narrative and legend behind your brand.",
            "Strategic message: the one thing you stand for.",
            "Brand descriptors: who you are in one line.",
            "Key messages: what you say to your audiences.",
            "Verbal identity: value set, tone of voice, usage examples.",
          ],
        },
        {
          heading: "How we ground it",
          items: [
            "Team onboarding: live examples and hands-on guidance to ensure your team uses it, instead of dumping a document in a drawer.",
          ],
        },
      ],
    },
    {
      n: "03",
      title: "Communication Strategy & GTM",
      subtitle: "Claiming your space",
      sections: [
        {
          heading: "Comms",
          items: [
            "Creative concept & mapping: core communication idea and channel matrix.",
            "Expression system: custom projects to land the idea and build brand association.",
          ],
        },
        {
          heading: "GTM",
          items: [
            "Channel tactics: customized action plans for every channel.",
            "Market layout: geographic breakdown, media planning, and budgeting.",
            "Action plan: a specific playbook to launch or scale in your target regions.",
          ],
        },
      ],
      cta: "Free marketing audit",
    },
  ],
  outcomes: {
    title: "Outgrowing the borders",
    items: [
      {
        title: "People are staying",
        body: "Employee LTV jumps to 84% (up from 60%). Your team genuinely understands what the brand stands for and feels proud to build it, cutting your turnover costs.",
      },
      {
        title: "Market learns your name",
        body: "Brand awareness surges from 10% to 25% through systematic communication. You stop being an unknown player and gain a solid presence in your industry.",
      },
      {
        title: "New brands capture the turf",
        body: "You secure 12% of the market share within the first 1.5 years of launch. No slow build-ups — the brand enters and aggressively takes its piece of the pie from day one.",
      },
      {
        title: "Sales cycles cut down",
        body: "You don’t waste time explaining who you are. The system sparks immediate interest in the product, making you memorable and clearly separated from competition.",
      },
    ],
  },
  socialProof: {
    title: "You enter the game…",
    cases: [
      {
        quote:
          "We finally look and sound like ourselves. It feels like we jumped three levels up. We’ve finally moved out of the old setup and running on a completely different engine now.",
        attribution: "NDA",
        metrics: [
          { value: "84%", label: "Employee LTV · Up from 60% with genuine pride in the brand" },
          { value: "10% → 25%", label: "Awareness surge through systematic communication" },
          { value: "12%", label: "Market share within the first 1.5 years of launch" },
          { value: "2M views", label: "72,165 likes · Top-performing post went viral" },
        ],
      },
    ],
  },
  closingQuote: "Strong brands force the competition to change their plans.",
  footerCta: "Build marketing engine",
};
