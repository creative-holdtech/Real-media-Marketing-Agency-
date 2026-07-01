export type ServiceCardData = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  accent: string;
  beWord: string;
  intro: string;
};

export const SERVICE_CARDS: ServiceCardData[] = [
  {
    slug: "brand",
    name: "Marketing & Brand Strategy",
    shortName: "Brand Strategy",
    tagline: "Making everyone tell the same story.",
    accent: "#e8a23a",
    beWord: "chosen",
    intro:
      "We build positioning your market remembers — and your team can explain.",
  },
  {
    slug: "smm",
    name: "Social Media Marketing",
    shortName: "SMM",
    tagline: "Replacing the cold pitch.",
    accent: "#7c5cff",
    beWord: "seen",
    intro: "Social media that shows up in the deals your team is already closing.",
  },
  {
    slug: "pr",
    name: "Public Relations",
    shortName: "PR",
    tagline: "Shaping the market context.",
    accent: "#3aa6e8",
    beWord: "trusted",
    intro: "Control the narrative before someone else writes it for you.",
  },
  {
    slug: "performance",
    name: "Performance Marketing",
    shortName: "Performance",
    tagline: "Structure before spend.",
    accent: "#3ae8a6",
    beWord: "profitable",
    intro: "Every channel accountable to whether the campaign is profitable.",
  },
  {
    slug: "seo",
    name: "SEO",
    shortName: "SEO",
    tagline: "What search engines see.",
    accent: "#e85d3a",
    beWord: "found",
    intro: "Organic demand that doesn't invoice you every time it brings a lead.",
  },
  {
    slug: "design",
    name: "Design",
    shortName: "Design",
    tagline: "Taking shape.",
    accent: "#e85d3a",
    beWord: "expressive",
    intro: "Visual authority that cuts through market noise.",
  },
];
