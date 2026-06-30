/** Resolved sticky header band in px (`--rm-header-offset`, usually 4.75rem). */
export function readHeaderOffsetPx() {
  if (typeof window === "undefined") return 76;

  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue("--rm-header-offset").trim();
  const rootPx = parseFloat(getComputedStyle(root).fontSize) || 16;

  if (raw.endsWith("rem")) return parseFloat(raw) * rootPx;
  if (raw.endsWith("px")) return parseFloat(raw);

  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 76;
}
