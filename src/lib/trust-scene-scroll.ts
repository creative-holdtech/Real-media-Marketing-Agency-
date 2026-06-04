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

export function computeTrustSceneProgress(sceneEl: HTMLElement): number {
  const scrollable = sceneScrollablePx(sceneVhForViewport());
  const pinLeadPx = window.innerHeight * 0.22;
  return sceneProgress(sceneEl.getBoundingClientRect().top, scrollable, pinLeadPx);
}
