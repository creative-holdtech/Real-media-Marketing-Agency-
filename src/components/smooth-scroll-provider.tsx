import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";

import { prefersNativeScroll } from "@/lib/performance-tier";

/** Lenis default lerp — buttery continuous scroll (not duration easing). */
const lenisOptions = {
  lerp: 0.075,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  syncTouch: false,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  autoRaf: false,
  anchors: {
    lerp: 0.075,
  },
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServer() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
}

function subscribeNativeScroll(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 991px), (pointer: coarse)");
  mq.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function getNativeScroll() {
  return prefersNativeScroll();
}

function getNativeScrollServer() {
  return false;
}

function usePreferNativeScroll() {
  return useSyncExternalStore(subscribeNativeScroll, getNativeScroll, getNativeScrollServer);
}

/** Re-measure Lenis after layout locks (preloader) release. */
export function LenisLayoutSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onLoadingEnd = () => {
      lenis.resize();
    };

    window.addEventListener("rm:loading-end", onLoadingEnd);
    return () => window.removeEventListener("rm:loading-end", onLoadingEnd);
  }, [lenis]);

  return null;
}

/** Reset scroll position when client-side route changes (Lenis keeps old scroll otherwise). */
function LenisScrollOnNavigate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

/** Same reset when Lenis is off (mobile / touch). */
function NativeScrollOnNavigate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const nativeScroll = usePreferNativeScroll();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduced || nativeScroll) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduced, nativeScroll]);

  if (reduced || nativeScroll) {
    return (
      <>
        <NativeScrollOnNavigate />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root ref={lenisRef} options={lenisOptions}>
      <LenisLayoutSync />
      <LenisScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}
