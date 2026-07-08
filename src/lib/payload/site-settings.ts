import { blogIndex } from "@/content/blog";
import { resolveSiteUrl } from "@/lib/seo";
import type { BlogIndexContent } from "@/lib/page-content/types";
import { payloadFetch } from "./client";
import type { PayloadSiteSettingsGlobal } from "./types";

function defaultRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${resolveSiteUrl()}/sitemap.xml`;
}

export async function fetchSiteSettings(): Promise<PayloadSiteSettingsGlobal | null> {
  return payloadFetch<PayloadSiteSettingsGlobal>("/api/globals/site-settings?depth=0", {
    revalidate: 120,
  });
}

export async function fetchRobotsTxt(): Promise<string> {
  const settings = await fetchSiteSettings();
  return settings?.robotsTxt?.trim() || defaultRobotsTxt();
}

export async function fetchBlogMeta(): Promise<{ title: string; description: string }> {
  const settings = await fetchSiteSettings();
  return {
    title: settings?.blogMetaTitle ?? "Blog — R-M",
    description:
      settings?.blogMetaDescription ??
      "Essays on strategy, positioning, and performance from the R-M studio.",
  };
}

export async function fetchBlogIndexContent(): Promise<BlogIndexContent> {
  const settings = await fetchSiteSettings();
  const remote = settings?.blogIndex;
  return {
    seasonLabel: remote?.seasonLabel ?? blogIndex.seasonLabel,
    issuedBy: remote?.issuedBy ?? blogIndex.issuedBy,
    titleLine1: remote?.titleLine1 ?? blogIndex.titleLine1,
    titleLine2: remote?.titleLine2 ?? blogIndex.titleLine2,
    lead: remote?.lead ?? blogIndex.lead,
    featuredLabel: remote?.featuredLabel ?? blogIndex.featuredLabel,
    archiveLabel: remote?.archiveLabel ?? blogIndex.archiveLabel,
    allEntriesLabel: remote?.allEntriesLabel ?? blogIndex.allEntriesLabel,
    emptyArchive: remote?.emptyArchive ?? blogIndex.emptyArchive,
    resetFilters: remote?.resetFilters ?? blogIndex.resetFilters,
  };
}
