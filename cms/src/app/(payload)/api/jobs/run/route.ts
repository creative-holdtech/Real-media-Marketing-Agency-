import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.jobs.run({ queue: 'default' })

  return Response.json({ ok: true, result })
}

export async function POST(request: Request) {
  return GET(request)
}
