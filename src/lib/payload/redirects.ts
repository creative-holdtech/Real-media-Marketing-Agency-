import type { PayloadListResponse, PayloadRedirectDoc } from "./types";
import { payloadFetch } from "./client";

let cachedRedirects: PayloadRedirectDoc[] | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 60_000;

export async function fetchRedirects(): Promise<PayloadRedirectDoc[]> {
  const now = Date.now();
  if (cachedRedirects && now - cacheTime < CACHE_TTL_MS) {
    return cachedRedirects;
  }

  const data = await payloadFetch<PayloadListResponse<PayloadRedirectDoc>>(
    "/api/redirects?limit=500",
    { revalidate: 60 },
  );

  cachedRedirects = data?.docs ?? [];
  cacheTime = now;
  return cachedRedirects;
}

export function matchRedirect(
  pathname: string,
  redirects: PayloadRedirectDoc[],
): PayloadRedirectDoc | undefined {
  return redirects.find((r) => r.from === pathname || r.from === `${pathname}/`);
}
