import { useEffect, useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";

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

/** Reset scroll after navigation settles; lock position while a route is loading. */
function resetScrollTop(lenis?: ReturnType<typeof useLenis>) {
  lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function ScrollResetOnNavigate({ lenis }: { lenis?: ReturnType<typeof useLenis> }) {
  const locationKey = useRouterState({
    select: (s) => `${s.location.pathname}${JSON.stringify(s.location.search ?? {})}`,
  });
  const status = useRouterState({ select: (s) => s.status });
  const scrollLockY = useRef<number | null>(null);
  const settledLocationKey = useRef(locationKey);

  useLayoutEffect(() => {
    if (status === "pending") {
      scrollLockY.current ??= window.scrollY;
      const y = scrollLockY.current;
      lenis?.scrollTo(y, { immediate: true, force: true });
      window.scrollTo(0, y);
      return;
    }

    if (status !== "idle") return;

    if (locationKey !== settledLocationKey.current) {
      settledLocationKey.current = locationKey;
      scrollLockY.current = null;
      resetScrollTop(lenis);
      requestAnimationFrame(() => resetScrollTop(lenis));
    }
  }, [locationKey, status, lenis]);

  return null;
}

function LenisScrollOnNavigate() {
  const lenis = useLenis();
  return <ScrollResetOnNavigate lenis={lenis} />;
}

/** Same reset when Lenis is off (mobile / touch). */
function NativeScrollOnNavigate() {
  return <ScrollResetOnNavigate />;
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
