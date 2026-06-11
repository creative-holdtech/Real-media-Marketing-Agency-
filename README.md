# refined-narrative-lab

Marketing site (TanStack Start + Vite). Production deploys from `main` via Vercel.

## Setup

```bash
git clone https://github.com/juliiakruk0604/refined-narrative-lab.git
cd refined-narrative-lab
npm install
cp .env.example .env
# Edit .env with your Supabase anon keys (Vercel → Project Settings → Environment Variables for production)
npm run dev
```

## Payload CMS

Content admin lives in `cms/` (Payload 3 + Next.js + PostgreSQL).

### Local setup

```bash
# 1. Start Postgres
cd cms && docker compose up -d

# 2. Configure env
cp cms/.env.example cms/.env
# Set PAYLOAD_SECRET (openssl rand -hex 32)

# 3. Install & run CMS
cd cms && npm install && npm run dev
# Admin: http://localhost:3001/admin

# 4. Seed sample posts (optional)
npm run seed --prefix cms

# 5. Point the site at Payload (root .env)
PAYLOAD_URL=http://localhost:3001
```

### What you can edit in admin

| Section                       | Path in admin               |
| ----------------------------- | --------------------------- |
| Blog posts + schedule publish | **Posts**                   |
| SEO meta (title, description) | Posts / Pages → SEO tab     |
| Images + ALT                  | **Media**                   |
| Header & mobile menu          | **Globals → Navigation**    |
| Redirects                     | **Redirects**               |
| robots.txt                    | **Globals → Site Settings** |
| Pages (future routes)         | **Pages**                   |

Scheduled posts: enable **Schedule publish** in the post sidebar. Vercel cron hits `/api/jobs/run` every minute (set `CRON_SECRET`).

### Deploy

- **Site:** Vercel (existing) — set `PAYLOAD_URL` to your CMS URL
- **CMS:** deploy `cms/` as separate Vercel project — set `DATABASE_URL` (Supabase Postgres), `PAYLOAD_SECRET`, `CRON_SECRET`

## Scripts

| Command           | Purpose                   |
| ----------------- | ------------------------- |
| `npm run dev`     | Local dev server          |
| `npm run dev:cms` | Payload admin (port 3001) |
| `npm run build`   | Production build          |
| `npm run lint`    | ESLint                    |
| `npm run format`  | Prettier                  |

## Deploy

- **Production:** https://refined-narrative-lab.vercel.app
- **Branch:** `main` only (PRs required)
- **Build:** see `vercel.json`

## Git workflow

- One canonical clone per machine (avoid duplicate folders with different SHAs).
- Conventional commits: `feat:`, `fix:`, `style:`, `chore:`.
- Do not commit `.env` or `.claude/` — use `.env.example` as a template.
