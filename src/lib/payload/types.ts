export type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
};

export type PayloadMedia = {
  id: string;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type PayloadPostSection = {
  heading: string;
  paragraphs?: { text: string; id?: string }[] | null;
  image?: PayloadMedia | string | null;
  id?: string;
};

export type PayloadPostDoc = {
  id: string;
  slug: string;
  title: string;
  category: string;
  label: string;
  excerpt: string;
  author: string;
  readTime: string;
  featured?: boolean | null;
  publishedAt: string;
  sections?: PayloadPostSection[] | null;
  featuredImage?: PayloadMedia | string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: PayloadMedia | string | null;
  } | null;
  _status?: "draft" | "published";
};

export type PayloadRedirectDoc = {
  id: string;
  from: string;
  to: string;
  type?: "301" | "302" | null;
};

export type PayloadNavLink = {
  label: string;
  url: string;
  sub?: string | null;
  id?: string;
};

export type PayloadNavigationGlobal = {
  headerLinks?: PayloadNavLink[] | null;
  dropdownLinks?: PayloadNavLink[] | null;
};

export type PayloadSiteSettingsGlobal = {
  siteName?: string | null;
  defaultMetaDescription?: string | null;
  robotsTxt?: string | null;
  blogMetaTitle?: string | null;
  blogMetaDescription?: string | null;
  blogIndex?: {
    seasonLabel?: string | null;
    issuedBy?: string | null;
    titleLine1?: string | null;
    titleLine2?: string | null;
    lead?: string | null;
    featuredLabel?: string | null;
    archiveLabel?: string | null;
    allEntriesLabel?: string | null;
    emptyArchive?: string | null;
    resetFilters?: string | null;
  } | null;
};
