# refined-narrative-lab

Marketing site for R—M (TanStack Start + Vite). Production deploys from `main` via Vercel.

## Setup

```bash
git clone https://github.com/juliiakruk0604/refined-narrative-lab.git
cd refined-narrative-lab
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:8080

## Payload CMS

Content admin lives in `cms/` (Payload 3 + Next.js + PostgreSQL). See `cms/README.md`.

### Quick local CMS setup

```bash
cd cms && docker compose up -d
cp .env.example .env   # set PAYLOAD_SECRET (openssl rand -hex 32)
npm install && npm run dev
# Admin: http://localhost:3001/admin

# Point the site at Payload (root .env)
PAYLOAD_URL=http://localhost:3001
```

### What you can edit in admin

| Section | Path in admin |
|---------|----------------|
| Blog posts + schedule publish | **Posts** |
| SEO meta (title, description) | Posts / Pages → SEO tab |
| Images + ALT | **Media** |
| Header & mobile menu | **Globals → Navigation** |
| Redirects | **Redirects** |
| robots.txt | **Globals → Site Settings** |

Scheduled posts: enable **Schedule publish** in the post sidebar. Vercel cron hits `/api/jobs/run` once daily at 09:00 UTC (set `CRON_SECRET` in CMS project).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run dev:cms` | Payload admin (port 3001) |
| `npm run build` | Generate SEO assets + production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run seo:generate` | Regenerate `public/sitemap.xml` and `robots.txt` |

## Deploy

| Project | URL / path |
|---------|------------|
| **Site** | https://rm-marketing-agency.vercel.app |
| **CMS** | Separate Vercel project from `cms/` |

Set `SITE_URL` and `VITE_SITE_URL` to your production domain. Set `PAYLOAD_URL` to the deployed CMS URL.

## Git workflow

- Conventional commits: `feat:`, `fix:`, `style:`, `chore:`.
- Do not commit `.env` — use `.env.example` as a template.
- PRs into `main` run CI (lint + build).
