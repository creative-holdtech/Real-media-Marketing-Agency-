import { payloadFetch } from "./client";
import type { PayloadSiteSettingsGlobal } from "./types";

const defaultRobots = `User-agent: *
Allow: /

Sitemap: https://refined-narrative-lab.vercel.app/sitemap.xml`;

export async function fetchSiteSettings(): Promise<PayloadSiteSettingsGlobal | null> {
  return payloadFetch<PayloadSiteSettingsGlobal>("/api/globals/site-settings?depth=0", {
    revalidate: 120,
  });
}

export async function fetchRobotsTxt(): Promise<string> {
  const settings = await fetchSiteSettings();
  return settings?.robotsTxt?.trim() || defaultRobots;
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
