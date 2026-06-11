/** Comma-separated list in FRONTEND_URLS, plus legacy FRONTEND_URL single value. */
export function getFrontendOrigins(): string[] {
  const fromList = (process.env.FRONTEND_URLS ?? '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean)

  const single = process.env.FRONTEND_URL?.trim()

  return [...new Set([...(single ? [single] : []), ...fromList])]
}

export function buildCorsOrigins(): string[] {
  return [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
    process.env.FRONTEND_URL || 'http://localhost:5173',
    ...getFrontendOrigins(),
    // Known production domains — extend via FRONTEND_URLS in production
    'https://realmedia.ink',
    'https://www.realmedia.ink',
    'https://rm-marketing-agency.vercel.app',
    'https://rm-marketing-agency-pi.vercel.app',
    'https://refined-narrative-lab.vercel.app',
  ].filter(Boolean)
}
