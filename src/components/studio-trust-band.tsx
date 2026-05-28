import { useEffect, useRef, useState, type ReactNode } from "react";

import { TrustStatsDiagram } from "@/components/trust-stats-diagram";
import { usePauseWhenOffscreen } from "@/hooks/use-pause-when-offscreen";
import { cn } from "@/lib/utils";

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

export function useSectionInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold]);
  return { ref, inView };
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
}: {
  prefix?: string;
  to: number;
  suffix?: string;
  start: boolean;
}) {
  const n = useCountUp(to, start);
  return (
    <>
      {prefix ?? ""}
      {n}
      {suffix ?? ""}
    </>
  );
}

type TrustStat = {
  value: ReactNode;
  copy: string;
};

type StudioTrustBandProps = {
  stats: TrustStat[];
  inView: boolean;
};

export function StudioTrustBand({ stats, inView }: StudioTrustBandProps) {
  const { ref: marqueeRef, paused: marqueePaused } = usePauseWhenOffscreen<HTMLDivElement>();

  return (
    <div className="rm-trust-stats border-b border-[var(--rm-border-soft)] bg-[var(--rm-surface-raised)] px-6 md:px-10">
      <div className="rm-trust-stats__inner mx-auto w-full max-w-[1280px]">
        <div className="rm-trust-stats__marquee reveal">
          <div
            ref={marqueeRef}
            className={cn(
              "marquee relative w-full overflow-hidden",
              marqueePaused && "marquee--paused",
            )}
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            <div className="marquee-track flex w-max items-center">
              {Array.from({ length: 2 }).flatMap((_, dup) =>
                trustBrands.map((b) => (
                  <span
                    key={`${dup}-${b}`}
                    aria-hidden={dup === 1}
                    className="rm-trust-stats__marquee-brand whitespace-nowrap"
                  >
                    {b}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>

        <div className="rm-trust-stats__diagram reveal" data-delay="1">
          <TrustStatsDiagram stats={stats} />
        </div>
      </div>
    </div>
  );
}
