import type { PayloadMedia } from "@/lib/payload/types";

export type PageHeroContent = {
  tag?: string;
  titleLines?: string[];
  subheading?: string;
  body?: string;
  image?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryUrl?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryUrl?: string;
};

export type PageSectionItem = {
  title?: string;
  body?: string;
  label?: string;
  value?: string;
  url?: string;
  image?: string;
};

export type PageSectionContent = {
  tag?: string;
  heading?: string;
  /** Two-line section headline — line 2 renders muted like Engage. */
  headingLines?: string[];
  subheading?: string;
  body?: string;
  bullets?: string[];
  items?: PageSectionItem[];
};

export type PageStat = {
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
  animateTo?: number;
};

export type PageMetaCard = {
  label: string;
  value: string;
};

export type PageContactContent = {
  eyebrow?: string;
  email?: string;
  location?: string;
  locationNote?: string;
  formPlaceholder?: string;
  submitLabel?: string;
  submitSuccessLabel?: string;
  socialLinks?: { label: string; url: string }[];
};

export type PageCtaContent = {
  title?: string;
  titleAccent?: string;
  primaryLabel?: string;
  primaryUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
};

export type PageContent = {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  hero?: PageHeroContent;
  sections: Record<string, PageSectionContent>;
  stats?: PageStat[];
  metaCards?: PageMetaCard[];
  contact?: PageContactContent;
  cta?: PageCtaContent;
};

export type BlogIndexContent = {
  seasonLabel?: string;
  issuedBy?: string;
  titleLine1?: string;
  titleLine2?: string;
  lead?: string;
  featuredLabel?: string;
  archiveLabel?: string;
  allEntriesLabel?: string;
  emptyArchive?: string;
  resetFilters?: string;
};

export type PayloadPageDoc = {
  id: string;
  slug: string;
  title: string;
  hero?: {
    tag?: string | null;
    titleLines?: { line: string; id?: string }[] | null;
    subheading?: string | null;
    body?: string | null;
    image?: PayloadMedia | string | null;
    ctaPrimaryLabel?: string | null;
    ctaPrimaryUrl?: string | null;
    ctaSecondaryLabel?: string | null;
    ctaSecondaryUrl?: string | null;
  } | null;
  sections?:
    | {
        sectionKey: string;
        tag?: string | null;
        heading?: string | null;
        subheading?: string | null;
        body?: string | null;
        bullets?: { text: string; id?: string }[] | null;
        items?:
          | {
              title?: string | null;
              body?: string | null;
              label?: string | null;
              value?: string | null;
              url?: string | null;
              image?: PayloadMedia | string | null;
              id?: string;
            }[]
          | null;
        id?: string;
      }[]
    | null;
  stats?:
    | {
        prefix?: string | null;
        value: string;
        suffix?: string | null;
        label: string;
        animateTo?: number | null;
        id?: string;
      }[]
    | null;
  metaCards?: { label: string; value: string; id?: string }[] | null;
  contact?: {
    eyebrow?: string | null;
    email?: string | null;
    location?: string | null;
    locationNote?: string | null;
    formPlaceholder?: string | null;
    submitLabel?: string | null;
    submitSuccessLabel?: string | null;
    socialLinks?: { label: string; url: string; id?: string }[] | null;
  } | null;
  cta?: {
    title?: string | null;
    titleAccent?: string | null;
    primaryLabel?: string | null;
    primaryUrl?: string | null;
    secondaryLabel?: string | null;
    secondaryUrl?: string | null;
  } | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  } | null;
  _status?: "draft" | "published";
};

export type PayloadServiceDoc = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  accent?: string | null;
  hero: {
    word: string;
    paragraphs?: { text: string; id?: string }[] | null;
    primaryCta?: string | null;
  };
  blocks?:
    | {
        n: string;
        title: string;
        subtitle: string;
        sections?:
          | {
              heading: string;
              items?: { text: string; id?: string }[] | null;
              id?: string;
            }[]
          | null;
        notes?: { text?: string | null; id?: string }[] | null;
        cta?: string | null;
        id?: string;
      }[]
    | null;
  outcomes?: {
    title: string;
    items?:
      | {
          title: string;
          body: string;
          bullets?: { text?: string | null; id?: string }[] | null;
          id?: string;
        }[]
      | null;
    extraTitle?: string | null;
    extraItems?: { title: string; body: string; id?: string }[] | null;
  } | null;
  socialProof?: {
    title: string;
    cases?:
      | {
          quote?: string | null;
          attribution?: string | null;
          label?: string | null;
          metrics?: { value: string; label: string; id?: string }[] | null;
          id?: string;
        }[]
      | null;
  } | null;
  closingQuote?: string | null;
  footerCta?: string | null;
  cardImage?: PayloadMedia | string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  } | null;
  _status?: "draft" | "published";
};

export type PayloadCaseDoc = {
  id: string;
  slug: string;
  client: string;
  niche: "AI SaaS" | "Fintech" | "Cybersecurity" | "iGaming";
  format: "Sprint" | "Marathon";
  duration: string;
  preview: string;
  headline: string;
  situation: string;
  challenge: string;
  resultsBody: string;
  accent?: string | null;
  coverImage?: PayloadMedia | string | null;
  heroImage?: PayloadMedia | string | null;
  heroMetrics?: { value: string; label: string; id?: string }[] | null;
  primaryMetric?: { value: string; label: string } | null;
  work?: { title: string; body: string; id?: string }[] | null;
  resultMetrics?: { value: string; label: string; id?: string }[] | null;
  quote?: { text: string; who: string; role: string } | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  } | null;
  _status?: "draft" | "published";
};
