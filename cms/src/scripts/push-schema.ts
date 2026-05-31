import { config as loadEnv } from 'dotenv'

loadEnv({ path: process.env.ENV_FILE || '.env' })
if (process.env.ENV_FILE) {
  loadEnv({ path: '.env.local', override: true })
}

import { getPayload } from 'payload'

// Drizzle push only runs when NODE_ENV !== 'production' (see @payloadcms/db-postgres connect)
process.env.NODE_ENV = 'development'
process.env.PAYLOAD_PUSH_SCHEMA = 'true'

const { default: config } = await import('../payload.config.js')

const payload = await getPayload({ config })
await payload.db.destroy?.()
console.log('[push-schema] Database schema synced.')
process.exit(0)
