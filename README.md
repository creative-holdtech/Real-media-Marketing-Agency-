# Real Media Marketing Agency

Marketing site for **R—M** (TanStack Start + Vite).

- **Repo:** https://github.com/creative-holdtech/Real-media-Marketing-Agency-
- **Production:** https://real-media-marketing-agency.vercel.app
- **Branch:** `main` → Vercel production

## Quick start

```bash
git clone https://github.com/creative-holdtech/Real-media-Marketing-Agency-.git
cd Real-media-Marketing-Agency-
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:8080

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local site (Vite) |
| `npm run build` | Production build + SEO assets |
| `npm run lint` | ESLint (`src/`) |
| `npm run format` | Prettier |
| `npm run seo:generate` | Regenerate `sitemap.xml` / `robots.txt` / OG |
| `npm run test:e2e` | Playwright e2e |
| `npm run deploy:site` | Deploy site to Vercel production |

## Project layout

```
src/           Site app (routes, components, styles)
public/        Static assets
cms/           Payload CMS (Next.js + PostgreSQL)
scripts/       Build / SEO helpers
tests/         Playwright specs
remotion/      Optional motion renders
```

## Payload CMS

Content admin lives in `cms/`. See `cms/README.md`.

```bash
cd cms && docker compose up -d
cp .env.example .env   # set PAYLOAD_SECRET
npm install && npm run dev
# Admin: http://localhost:3001/admin
```

In the site root `.env`, set `PAYLOAD_URL=http://localhost:3001`.

| Section | Admin path |
|---------|------------|
| Blog posts + schedule | **Posts** |
| SEO meta | Posts / Pages → SEO |
| Images + ALT | **Media** |
| Header / mobile menu | **Globals → Navigation** |
| Redirects | **Redirects** |
| robots.txt | **Globals → Site Settings** |

## Deploy

| App | Notes |
|-----|--------|
| **Site** | Vercel project `real-media-marketing-agency` |
| **CMS** | Separate Vercel project from `cms/` |

Set `SITE_URL` / `VITE_SITE_URL` to the production domain. Set `PAYLOAD_URL` to the deployed CMS.

## Git workflow

- Conventional commits: `feat:`, `fix:`, `style:`, `chore:`
- Never commit `.env` — use `.env.example`
- PRs into `main` run CI (lint + build)
- Keep agent scratch (`.agents/`, `.codex/`, `output/`, `.playwright-cli/`) out of git — already gitignored
