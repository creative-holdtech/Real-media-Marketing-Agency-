import { execSync } from 'node:child_process'

const hasDatabase = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)

if (hasDatabase) {
  execSync('cross-env NODE_OPTIONS=--no-deprecation payload migrate', {
    stdio: 'inherit',
  })
} else {
  console.warn('[ci] No POSTGRES_URL/DATABASE_URL — skipping payload migrate')
}

execSync(
  'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" next build',
  { stdio: 'inherit' },
)
