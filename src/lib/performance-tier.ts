/** Safari WebKit — heavy filter/canvas + Lenis often tanks frame rate on Mac. */
export function isSafariEngine() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox/i.test(ua);
}

export function prefersNativeScroll() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 991px), (pointer: coarse)").matches || isSafariEngine()
  );
}

export type TrustScenePerformanceProfile = {
  canvasGlow: boolean;
  particleMorphBlur: boolean;
  /** Minimum ms between animation frames (0 = uncapped). */
  minFrameMs: number;
};

export function getTrustScenePerformanceProfile(): TrustScenePerformanceProfile {
  if (typeof window === "undefined") {
    return { canvasGlow: false, particleMorphBlur: false, minFrameMs: 0 };
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const safari = isSafariEngine();
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = mem !== undefined && mem <= 4;

  if (reduced) {
    return { canvasGlow: false, particleMorphBlur: false, minFrameMs: 0 };
  }

  if (safari || lowMemory) {
    return { canvasGlow: false, particleMorphBlur: false, minFrameMs: 32 };
  }

  return { canvasGlow: false, particleMorphBlur: false, minFrameMs: 0 };
}
