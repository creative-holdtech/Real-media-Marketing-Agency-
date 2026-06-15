export type EngagementStep = {
  code: string;
  title: string;
  body: string;
};

export type Engagement = {
  id: "sprint" | "marathon";
  name: string;
  index: string;
  time: string;
  intro: string;
  steps: EngagementStep[];
  ctaLabel: string;
  compareHint: string;
  metricBig: string;
  metricUnitLabel: string;
  metricUnitSub: string;
};

export const homepageEngagements: Engagement[] = [
  {
    id: "sprint",
    name: "Sprint",
    index: "01",
    metricBig: "4",
    metricUnitLabel: "Weeks",
    metricUnitSub: "to first ship",
    time: "From 4 weeks",
    intro:
      "Fast start for brands that don’t want to spend months on planning. We dive straight into execution, taking over your chosen channels from week one.",
    steps: [
      {
        code: "01",
        title: "SETUP",
        body: "Free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)",
      },
      {
        code: "02",
        title: "RUN",
        body: "Weekly updates, monthly reports, on-demand analytics and recommendations",
      },
      {
        code: "03",
        title: "HANDOVER",
        body: "Final deliverable with a clear roadmap and 100% asset & content ownership",
      },
    ],
    ctaLabel: "Scope a Sprint →",
    compareHint: "Tactical retainer",
  },
  {
    id: "marathon",
    name: "Marathon",
    index: "02",
    metricBig: "6",
    metricUnitLabel: "Months",
    metricUnitSub: "minimum runway",
    time: "From 6 months",
    intro:
      "Strategy followed by execution. For brands launching, rebranding, or new markets. We build positioning and run your marketing channels.",
    steps: [
      {
        code: "01",
        title: "STRATEGY",
        body: "Deep-dive workshop, market analysis, brand positioning, and GTM planning",
      },
      {
        code: "02",
        title: "ACTION",
        body: "Full-scale execution across SMM, PR, SEO, Performance, and active Brand Management",
      },
      {
        code: "03",
        title: "HANDOVER",
        body: "Final brand guidelines, operational channels, 100% asset & content ownership",
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
