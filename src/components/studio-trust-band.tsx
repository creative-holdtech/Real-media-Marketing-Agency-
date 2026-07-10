import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { TrustParticleEcosystem, type TrustStat } from "@/components/trust-particle-ecosystem";

export const trustBrands = [
  "Empresex",
  "TEQUILA",
  "WHITEBIT",
  "CAPITAL.COM",
  "CURRENCY",
  "POCKET SPACE",
  "UNIT CITY",
  "1inch",
] as const;

export function useSectionInView<T extends Element>(_threshold = 0) {
  const ref = useRef<T | null>(null);
  return { ref, inView: true };
}

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

export function BigStatValue({
  prefix,
  to,
  suffix,
  start,
  duration,
}: {
  prefix?: string;
  to: number;
  suffix?: string;
  start: boolean;
  duration?: number;
}) {
  const n = useCountUp(to, start, duration);
  return (
    <>
      {prefix ?? ""}
      {n}
      <span style={{ marginLeft: "0.04em" }}>{suffix ?? ""}</span>
    </>
  );
}

type StudioTrustBandProps = {
  stats: TrustStat[];
  inView: boolean;
  chapterRef?: RefObject<HTMLElement | null>;
};

export function StudioTrustBand({ stats, inView, chapterRef }: StudioTrustBandProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sceneRef} className="rm-trust-scene">
      <div className="rm-trust-scene__bridge rm-trust-scene__bridge--top" aria-hidden="true" />
      <div className="rm-trust-scene__sticky">
        <TrustParticleEcosystem
          stats={stats}
          inView={inView}
          active
          sceneRef={sceneRef}
          chapterRef={chapterRef}
        />
      </div>
    </div>
  );
}
