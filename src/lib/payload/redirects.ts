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

function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function matchRedirect(
  pathname: string,
  redirects: PayloadRedirectDoc[],
): PayloadRedirectDoc | undefined {
  const target = normalizePath(pathname);
  return redirects.find((r) => normalizePath(r.from) === target);
}
