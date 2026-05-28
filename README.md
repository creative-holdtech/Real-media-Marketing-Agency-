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

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Deploy

- **Production:** https://refined-narrative-lab.vercel.app
- **Branch:** `main` only (PRs required)
- **Build:** see `vercel.json`

## Git workflow

- One canonical clone per machine (avoid duplicate folders with different SHAs).
- Conventional commits: `feat:`, `fix:`, `style:`, `chore:`.
- Do not commit `.env` or `.claude/` — use `.env.example` as a template.
