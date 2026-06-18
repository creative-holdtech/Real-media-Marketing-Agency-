const TRUST_SCENE_VH_DESKTOP = 420;
const TRUST_SCENE_VH_MOBILE = 360;

function sceneVhForViewport() {
  if (typeof window === "undefined") return TRUST_SCENE_VH_DESKTOP;
  return window.matchMedia("(max-width: 767px)").matches
    ? TRUST_SCENE_VH_MOBILE
    : TRUST_SCENE_VH_DESKTOP;
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

function sceneScrollablePx(sceneVh: number) {
  return (sceneVh / 100) * window.innerHeight - window.innerHeight;
}

function sceneProgress(rectTop: number, scrollable: number, pinLeadPx: number) {
  if (scrollable <= 0) return rectTop <= pinLeadPx ? 1 : 0;
  return clamp(0, 1, (pinLeadPx - rectTop) / (scrollable + pinLeadPx));
}

/**
 * Scroll progress for the pinned trust scene (0–1).
 *
 * The sticky band can fill the viewport while the outer scene's rect.top is still
 * above the pin-lead threshold — that used to leave scroll ≈ 0, curtain at 100%,
 * and brand particles at opacity 0. We blend in viewport presence so the
 * constellation is visible as soon as the scene is on screen.
 */
export function computeTrustSceneProgress(sceneEl: HTMLElement): number {
  const scrollable = sceneScrollablePx(sceneVhForViewport());
  const pinLeadPx = window.innerHeight * 0.22;
  const rect = sceneEl.getBoundingClientRect();
  const base = sceneProgress(rect.top, scrollable, pinLeadPx);

  const vh = window.innerHeight;
  const viewportFill = clamp(0, 1, (vh - Math.max(0, rect.top)) / vh);

  // Sticky field is actively presented (scene spans most of the viewport).
  const stickyPresented = rect.top <= pinLeadPx + 12 && rect.bottom >= vh * 0.68;
  if (stickyPresented || viewportFill > 0.7) {
    const presence = Math.max(base, 0.042 + viewportFill * 0.045);
    return clamp(0, 1, presence);
  }

  // Scene scrolling into view — ramp early so brands appear before full pin.
  if (rect.top < vh * 0.92 && rect.bottom > vh * 0.18) {
    const approach = clamp(0, 1, 1 - rect.top / (vh * 0.88));
    return Math.max(base, approach * 0.085);
  }

  return base;
}
