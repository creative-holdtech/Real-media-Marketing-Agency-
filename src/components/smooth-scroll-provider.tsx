import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion/react";

/** Matches DreamLab — https://www.enterdreamlab.com/ */
const dreamlabEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const lenisOptions = {
  duration: 1.2,
  easing: dreamlabEasing,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 2,
  autoRaf: false,
  anchors: {
    duration: 1.2,
    easing: dreamlabEasing,
  },
};

type LenisHandle = {
  lenis?: {
    raf: (time: number) => void;
  };
};

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const lenisRef = useRef<LenisHandle | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [enabled]);

  if (!enabled) return children;

  return (
    <ReactLenis root ref={lenisRef} options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
