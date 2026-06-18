# R—M Payload CMS

Payload 3 + Next.js admin for the R—M marketing site. Deploy as a **separate Vercel project** from this folder.

## Local setup

```bash
# 1. Start Postgres
docker compose up -d

# 2. Configure env
cp .env.example .env
# PAYLOAD_SECRET: openssl rand -hex 32

# 3. Install & run
npm install
npm run dev
# Admin: http://localhost:3001/admin

# 4. Optional: seed sample posts
npm run seed
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `PAYLOAD_SECRET` | Auth/session secret |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_SERVER_URL` | Public CMS URL |
| `FRONTEND_URL` / `FRONTEND_URLS` | Marketing site origin(s) for CORS |
| `CRON_SECRET` | Bearer token for scheduled publish job |

## Deploy (Vercel)

1. Create a Vercel project with root directory `cms/`.
2. Set `DATABASE_URL` (e.g. Supabase Postgres or Neon).
3. Set `PAYLOAD_SECRET`, `CRON_SECRET`, `FRONTEND_URLS`.
4. Cron runs daily at 09:00 UTC (`cms/vercel.json`) → `POST /api/jobs/run`.

## Collections

- **Posts** — blog articles
- **Cases** — portfolio case studies
- **Pages** — future static pages
- **Media** — images and assets
- **Globals** — Navigation, Site Settings (robots.txt)
