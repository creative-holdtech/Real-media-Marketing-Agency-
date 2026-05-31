/**
 * Writes public/sitemap.xml and public/robots.txt at build time.
 * Vercel serves dist/client as static files — server.ts routes never run there.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  process.env.VITE_SITE_URL ||
  "https://realmedia.ink"
)
  .trim()
  .replace(/\/$/, "");

const PAYLOAD_URL = (process.env.PAYLOAD_URL || process.env.VITE_PAYLOAD_URL || "")
  .trim()
  .replace(/\/$/, "");

const STATIC_ROUTES = [
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

const SERVICE_SLUGS = ["brand", "smm", "pr", "performance", "seo", "design"];

const FALLBACK_CASE_SLUGS = ["nebula-ai", "vault-fintech", "sentinel-security", "ace-igaming"];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function fetchCmsSlugs() {
  if (!PAYLOAD_URL) return { cases: FALLBACK_CASE_SLUGS, posts: [] };

  try {
    const [casesData, postsData] = await Promise.all([
      fetchJson(
        `${PAYLOAD_URL}/api/cases?limit=100&where[_status][equals]=published&select[slug]=true`,
      ),
      fetchJson(
        `${PAYLOAD_URL}/api/posts?limit=100&where[_status][equals]=published&select[slug,publishedAt]=true&sort=-publishedAt`,
      ),
    ]);

    const cases =
      casesData.docs?.map((d) => d.slug).filter(Boolean) ?? FALLBACK_CASE_SLUGS;
    const posts =
      postsData.docs?.map((d) => ({
        slug: d.slug,
        dateISO: d.publishedAt?.slice(0, 10),
      })).filter((p) => p.slug) ?? [];

    return { cases, posts };
  } catch (err) {
    console.warn("[seo] CMS fetch failed, using static fallbacks:", err.message);
    return { cases: FALLBACK_CASE_SLUGS, posts: [] };
  }
}

async function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [];
  const { cases, posts } = await fetchCmsSlugs();

  for (const route of STATIC_ROUTES) {
    entries.push(urlEntry(`${SITE_URL}${route.path}`, today, route.changefreq, route.priority));
  }

  for (const slug of SERVICE_SLUGS) {
    entries.push(urlEntry(`${SITE_URL}/services/${slug}`, today, "monthly", "0.8"));
  }

  for (const slug of cases) {
    entries.push(urlEntry(`${SITE_URL}/cases/${slug}`, today, "monthly", "0.7"));
  }

  for (const post of posts) {
    entries.push(
      urlEntry(
        `${SITE_URL}/blog/${post.slug}`,
        post.dateISO || today,
        "monthly",
        "0.6",
      ),
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}

async function fetchRobotsTxt() {
  const sitemapLine = `Sitemap: ${SITE_URL}/sitemap.xml`;
  const fallback = `User-agent: *
Allow: /

${sitemapLine}
`;

  if (!PAYLOAD_URL) return fallback;

  try {
    const data = await fetchJson(`${PAYLOAD_URL}/api/globals/site-settings?depth=0`);
    let fromCms = data?.robotsTxt?.trim();
    if (fromCms) {
      fromCms = fromCms.replace(/^Sitemap:.*$/gm, "").trim();
      if (!/^Allow:\s*\//m.test(fromCms) && !/^Disallow:/m.test(fromCms)) {
        fromCms = `User-agent: *\nAllow: /\n\n${fromCms}`;
      }
      if (/^Disallow:\s*\/\s*$/m.test(fromCms)) {
        fromCms = fromCms.replace(/^Disallow:\s*\/\s*$/m, "Allow: /");
      }
      return `${fromCms}\n\n${sitemapLine}\n`;
    }
  } catch {
    /* use fallback */
  }

  return fallback;
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });

  const [sitemap, robots] = await Promise.all([buildSitemapXml(), fetchRobotsTxt()]);

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`[seo] Wrote public/sitemap.xml (${urlCount} URLs, site=${SITE_URL})`);
  console.log("[seo] Wrote public/robots.txt");
}

main().catch((err) => {
  console.error("[seo] Failed:", err);
  process.exit(1);
});
