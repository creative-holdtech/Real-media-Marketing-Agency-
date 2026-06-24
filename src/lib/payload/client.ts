function resolvePayloadUrl(): string {
  const fromVite =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_PAYLOAD_URL
      ? String(import.meta.env.VITE_PAYLOAD_URL)
      : "";
  const fromProcess = process.env.PAYLOAD_URL ?? process.env.VITE_PAYLOAD_URL ?? fromVite;

  return fromProcess.replace(/\/$/, "");
}

function isLocalHostUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  } catch {
    return false;
  }
}

/** Localhost CMS URLs are only valid on the same machine (dev). */
function isPayloadUrlReachable(url: string): boolean {
  if (!url) return false;
  if (!isLocalHostUrl(url)) return true;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1";
  }

  if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    return false;
  }

  return true;
}

const PAYLOAD_URL = resolvePayloadUrl();
const PAYLOAD_FETCH_TIMEOUT_MS = 3_000;

export function isPayloadEnabled(): boolean {
  return PAYLOAD_URL.length > 0 && isPayloadUrlReachable(PAYLOAD_URL);
}

export function getPayloadUrl(): string {
  return PAYLOAD_URL;
}

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
};

export async function payloadFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number },
): Promise<T | null> {
  if (!isPayloadEnabled()) return null;

  const { revalidate, ...fetchInit } = init ?? {};

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PAYLOAD_FETCH_TIMEOUT_MS);

    const res = await fetch(`${PAYLOAD_URL}${path}`, {
      ...fetchInit,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchInit.headers,
      },
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[Payload] ${path} → ${res.status}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.warn("[Payload] fetch failed:", error);
    return null;
  }
}

export type { PayloadListResponse };
