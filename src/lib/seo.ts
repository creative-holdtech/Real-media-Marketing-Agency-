/** Canonical site origin for SEO (no trailing slash). */
export function resolveSiteUrl(): string {
  const fromEnv =
    (typeof process !== "undefined" && process.env.SITE_URL) ||
    (typeof process !== "undefined" && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL
      ? String(import.meta.env.VITE_SITE_URL)
      : "");

  const url = fromEnv.trim() || "https://realmedia.ink";
  return url.replace(/\/$/, "");
}

export const DEFAULT_OG_PATH = "/og.png";

export function absoluteUrl(path: string, siteUrl = resolveSiteUrl()): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function defaultOgImage(siteUrl = resolveSiteUrl()): string {
  const fromEnv =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_OG_IMAGE_URL
      ? String(import.meta.env.VITE_OG_IMAGE_URL)
      : typeof process !== "undefined" && process.env.VITE_OG_IMAGE_URL
        ? process.env.VITE_OG_IMAGE_URL
        : "";
  return fromEnv.trim() || absoluteUrl(DEFAULT_OG_PATH, siteUrl);
}

type PageHeadInput = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
};

/** TanStack Router `head()` return shape — canonical, OG, Twitter, robots. */
export function buildPageHead(input: PageHeadInput) {
  const siteUrl = resolveSiteUrl();
  const path = input.pathname.startsWith("/") ? input.pathname : `/${input.pathname}`;
  const canonical = `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
  const image = input.image ? absoluteUrl(input.image, siteUrl) : defaultOgImage(siteUrl);

  const meta: Array<Record<string, string>> = [
    { title: input.title },
    { name: "description", content: input.description },
    {
      name: "robots",
      content: input.noindex
        ? "noindex,nofollow"
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: canonical },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:site_name", content: "R-M" },
    { property: "og:image", content: image },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@rm_agency" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.type === "article" && input.publishedTime) {
    meta.push({ property: "article:published_time", content: input.publishedTime });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function organizationJsonLd(siteUrl = resolveSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "R-M",
        url: siteUrl,
        logo: absoluteUrl("/favicon.svg", siteUrl),
        email: "info@realmedia.ink",
        sameAs: ["https://www.instagram.com/realmedia.corp", "https://dribbble.com/realmedia26"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "R-M — Marketing Agency",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  publishedTime: string;
  author?: string;
}) {
  const siteUrl = resolveSiteUrl();
  const url = absoluteUrl(input.pathname, siteUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image, siteUrl) : defaultOgImage(siteUrl),
    datePublished: input.publishedTime,
    author: {
      "@type": "Organization",
      name: input.author ?? "R-M Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "R-M",
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg", siteUrl) },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function caseStudyJsonLd(input: {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  client: string;
  year?: string;
}) {
  const siteUrl = resolveSiteUrl();
  const url = absoluteUrl(input.pathname, siteUrl);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image, siteUrl) : defaultOgImage(siteUrl),
    url,
    about: { "@type": "Organization", name: input.client },
    creator: {
      "@type": "Organization",
      name: "R-M",
      url: siteUrl,
    },
    datePublished: input.year ? `${input.year}-01-01` : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const siteUrl = resolveSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  };
}
