export type EngagementStep = {
  code: string;
  title: string;
  body: string;
};

export type Engagement = {
  id: "sprint" | "marathon";
  name: string;
  time: string;
  intro: string;
  steps: EngagementStep[];
  ctaLabel: string;
  compareHint: string;
};

export const homepageEngagements: Engagement[] = [
  {
    id: "sprint",
    name: "Sprint",
    time: "From 4 weeks",
    intro:
      "Fast start for brands that don't want to spend months on planning. We dive straight into execution, taking over your chosen channels from week one.",
    steps: [
      {
        code: "01",
        title: "SETUP",
        body: "free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)",
      },
      {
        code: "02",
        title: "RUN",
        body: "weekly updates, monthly reports, on-demand analytics and recommendations",
      },
      {
        code: "03",
        title: "HANDOVER",
        body: "final deliverable with a clear roadmap and 100% asset & content ownership",
      },
    ],
    ctaLabel: "Scope a Sprint →",
    compareHint: "Tactical retainer",
  },
  {
    id: "marathon",
    name: "Marathon",
    time: "From 2 months",
    intro:
      "Strategy followed by execution. For brands launching from scratch, rebranding, or entering new markets. We build your positioning and run your marketing channels.",
    steps: [
      {
        code: "01",
        title: "STRATEGY",
        body: "deep-dive workshop, market analysis, brand positioning, and GTM planning",
      },
      {
        code: "02",
        title: "ACTION",
        body: "full-scale execution across SMM, PR, SEO, Performance, and active Brand Management",
      },
      {
        code: "03",
        title: "HANDOVER",
        body: "final brand guidelines, operational channels, 100% asset & content ownership",
      },
    ],
    ctaLabel: "Plan a Marathon →",
    compareHint: "Strategic partnership",
  },
];

export function engagementPrefillMessage(id: Engagement["id"] | undefined) {
  if (id === "sprint") {
    return "Interested in a Sprint engagement.\n\n";
  }
  if (id === "marathon") {
    return "Interested in a Marathon engagement.\n\n";
  }
  return "";
}
