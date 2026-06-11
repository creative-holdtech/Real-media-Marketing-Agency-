import { execSync } from 'node:child_process'

const hasDatabase = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)

if (process.env.PAYLOAD_PUSH_SCHEMA === 'true' && hasDatabase) {
  execSync('cross-env NODE_OPTIONS=--no-deprecation tsx src/scripts/push-schema.ts', {
    stdio: 'inherit',
  })
} else if (hasDatabase) {
  execSync('cross-env NODE_OPTIONS=--no-deprecation sh -c "yes | payload migrate"', {
    stdio: 'inherit',
  })
} else {
  console.warn('[ci] No POSTGRES_URL/DATABASE_URL — skipping payload migrate')
}

execSync('cross-env NODE_OPTIONS=--no-deprecation payload generate:importmap', {
  stdio: 'inherit',
})

execSync('cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" next build', {
  stdio: 'inherit',
})
