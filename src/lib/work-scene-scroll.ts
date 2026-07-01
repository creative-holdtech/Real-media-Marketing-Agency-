/** Extra scroll distance (vh) for card crossfade — must exceed ~0 so Lenis can scrub. */
export const WORK_SCENE_SCROLL_VH = 48;

/** Breathing room after the last case before the next section. */
export const WORK_SCENE_RELEASE_VH = 5;

/** Overlap between adjacent preview cards (fraction of one segment). */
export const CROSSFADE_OVERLAP = 0.28;

/** Row is navigable once preview crossfade weight passes this. */
export const ROW_NAV_WEIGHT = 0.88;

export function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  const x = clamp(0, 1, t);
  return 1 - (1 - x) ** 3;
}

function easeInCubic(t: number) {
  const x = clamp(0, 1, t);
  return x ** 3;
}

const SCROLL_RATIO =
  WORK_SCENE_SCROLL_VH / (WORK_SCENE_SCROLL_VH + WORK_SCENE_RELEASE_VH);

/** Map raw track progress (incl. release runway) to 0–1 crossfade progress. */
export function motionProgressFromRaw(p: number) {
  if (p <= SCROLL_RATIO) return p / SCROLL_RATIO;
  return 1;
}

export function rawProgressFromMotion(motionP: number) {
  return motionP * SCROLL_RATIO;
}

export type CardWindow = {
  fadeInStart: number;
  fullStart: number;
  fullEnd: number;
  fadeOutEnd: number;
  peak: number;
  enterScale: number;
};

export function cardWindow(index: number, count: number): CardWindow {
  const seg = 1 / count;
  const sliceStart = index * seg;
  const sliceEnd = (index + 1) * seg;
  const overlap = seg * CROSSFADE_OVERLAP;

  return {
    fadeInStart: index === 0 ? 0 : sliceStart - overlap,
    fullStart: index === 0 ? 0 : sliceStart,
    fullEnd: index === count - 1 ? 1 : sliceEnd,
    fadeOutEnd: index === count - 1 ? 1 : sliceEnd + overlap,
    peak: (sliceStart + sliceEnd) / 2,
    enterScale: index === 0 ? 1 : 0.98,
  };
}

export function crossfadeOpacity(index: number, count: number, p: number) {
  const w = cardWindow(index, count);
  if (p < w.fadeInStart || p > w.fadeOutEnd) return 0;
  if (p >= w.fullStart && p <= w.fullEnd) return 1;
  if (p < w.fullStart) {
    const t = (p - w.fadeInStart) / Math.max(0.001, w.fullStart - w.fadeInStart);
    return clamp(0, 1, easeOutCubic(t));
  }
  const t = (p - w.fullEnd) / Math.max(0.001, w.fadeOutEnd - w.fullEnd);
  return clamp(0, 1, 1 - easeInCubic(t));
}

export function crossfadeScale(index: number, count: number, p: number) {
  const w = cardWindow(index, count);
  const opacity = crossfadeOpacity(index, count, p);
  if (opacity <= 0) return w.enterScale;
  if (p < w.fullStart && index > 0) {
    const t = easeOutCubic(
      (p - w.fadeInStart) / Math.max(0.001, w.fullStart - w.fadeInStart),
    );
    return w.enterScale + (1 - w.enterScale) * t;
  }
  if (p > w.fullEnd && index < count - 1) {
    const t = easeInCubic((p - w.fullEnd) / Math.max(0.001, w.fadeOutEnd - w.fullEnd));
    return 1 - (1 - w.enterScale) * t;
  }
  return 1;
}

/** Subtle blur bridge while two previews overlap (max 2px at opacity ≈ 0.5). */
export function crossfadeBlur(opacity: number) {
  if (opacity <= 0.12 || opacity >= 0.88) return 0;
  const mid = 1 - Math.abs(opacity - 0.5) * 2;
  return mid * 2;
}

export function crossfadeOpacities(count: number, p: number) {
  return Array.from({ length: count }, (_, i) => crossfadeOpacity(i, count, p));
}

/** Keep crossover brightness stable when overlapping windows sum > 1. */
export function normalizedCrossfadeOpacities(count: number, p: number) {
  const raw = crossfadeOpacities(count, p);
  const sum = raw.reduce((acc, value) => acc + value, 0);
  if (sum <= 1 || sum === 0) return raw;
  return raw.map((value) => value / sum);
}

export function activeCardIndex(p: number, count: number) {
  const opacities = normalizedCrossfadeOpacities(count, p);
  let best = 0;
  let bestOpacity = -1;
  opacities.forEach((opacity, index) => {
    if (opacity > bestOpacity) {
      bestOpacity = opacity;
      best = index;
    }
  });
  return best;
}

export function rowWeight(index: number, count: number, p: number) {
  return normalizedCrossfadeOpacities(count, p)[index] ?? 0;
}

export function previewWeight(index: number, count: number, motionP: number, hoverIndex: number | null) {
  const previewP = hoverIndex != null ? cardWindow(hoverIndex, count).peak : motionP;
  return normalizedCrossfadeOpacities(count, previewP)[index] ?? 0;
}

/** Clip progress rail at last case tick (not :last-child — rows may be wrapped). */
export function syncWorkRailEnd(indexEl: HTMLElement) {
  const progress = indexEl.querySelector<HTMLElement>(".rm-work-index-progress");
  const rows = indexEl.querySelectorAll<HTMLElement>(".rm-index__row");
  const lastRow = rows[rows.length - 1];
  const lastTick = lastRow?.querySelector<HTMLElement>(".rm-work-index-progress__tick-anchor");
  if (!progress || !lastTick) return;
  const indexTop = indexEl.getBoundingClientRect().top;
  const tickRect = lastTick.getBoundingClientRect();
  const endPx = Math.max(8, tickRect.top + tickRect.height / 2 - indexTop);
  indexEl.style.setProperty("--work-rail-end", `${endPx.toFixed(1)}px`);
}
