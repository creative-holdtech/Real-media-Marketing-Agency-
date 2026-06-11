export type ServiceSlug = "smm" | "pr" | "performance" | "seo" | "brand" | "design";

export type ServiceSection = {
  heading: string;
  items: string[];
};

export type ServiceBlock = {
  n: string;
  title: string;
  subtitle: string;
  sections: ServiceSection[];
  notes?: string[];
  cta?: string;
};

export type ServiceOutcome = {
  title: string;
  body: string;
  bullets?: string[];
};

export type ServiceProofMetric = {
  value: string;
  label: string;
};

export type ServiceProofCase = {
  quote?: string;
  attribution?: string;
  label?: string;
  metrics: ServiceProofMetric[];
};

export type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  /** Card tagline on /services index */
  tagline: string;
  accent: string;
  hero: {
    word: string;
    paragraphs: string[];
    primaryCta: string;
  };
  blocks: ServiceBlock[];
  outcomes: {
    title: string;
    items: ServiceOutcome[];
    extra?: {
      title: string;
      items: ServiceOutcome[];
    };
  };
  socialProof: {
    title: string;
    cases: ServiceProofCase[];
  };
  closingQuote: string;
  footerCta: string;
};
