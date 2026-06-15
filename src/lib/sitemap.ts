import { cases } from "@/lib/cases";
import { getPosts } from "@/lib/payload/posts";
import { getCases } from "@/lib/payload/cases-cms";
import { servicesList } from "@/lib/services";
import { resolveSiteUrl } from "@/lib/seo";

const STATIC_ROUTES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/products", changefreq: "monthly", priority: "0.8" },
  { path: "/cases", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/audit", changefreq: "monthly", priority: "0.8" },
  { path: "/seo", changefreq: "monthly", priority: "0.7" },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function buildSitemapXml(): Promise<string> {
  const siteUrl = resolveSiteUrl();
  const today = new Date().toISOString().slice(0, 10);
  const entries: string[] = [];

  for (const route of STATIC_ROUTES) {
    entries.push(urlEntry(`${siteUrl}${route.path}`, today, route.changefreq, route.priority));
  }

  for (const service of servicesList) {
    entries.push(
      urlEntry(`${siteUrl}/services/${service.slug}`, today, "monthly", "0.8"),
    );
  }

  const caseList = await getCases().catch(() => cases);
  for (const c of caseList) {
    entries.push(urlEntry(`${siteUrl}/cases/${c.slug}`, today, "monthly", "0.7"));
  }

  const posts = await getPosts().catch(() => [] as Awaited<ReturnType<typeof getPosts>>);
  for (const post of posts) {
    const lastmod = post.dateISO || today;
    entries.push(
      urlEntry(`${siteUrl}/blog/${post.slug}`, lastmod, "monthly", "0.6"),
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}
