import { useEffect, useRef, useState } from "react";

import {
  bodyCopy,
  bodyCopyStrong,
  sectionContainer,
  sectionContentGrid,
  sectionGridSpacer,
  sectionHeadline,
  sectionInnerStack,
  sectionShell,
  SectionHeader,
  surfaceCardPadding,
  textLabel,
  textValue,
} from "@/components/framer-section";
import { SurfaceCard } from "@/components/surface-card";
import { CardContent } from "@/components/ui/card";
import { TextReveal } from "@/components/text-reveal";
import { TrustStatsDiagram } from "@/components/trust-stats-diagram";
import { usePauseWhenOffscreen } from "@/hooks/use-pause-when-offscreen";
import { cn } from "@/lib/utils";

const metaCards = [
  {
    label: "Our products",
    value: "Sprint (from 4 weeks)\nMarathon (2+ months)",
    className: "md:col-start-2 md:row-start-1",
  },
  {
    label: "Markets",
    value: "EU · UK · MENA · GCC",
    className: "md:col-start-3 md:row-start-1",
  },
  {
    label: "Sectors",
    value: "Fintech · AI SaaS · Cybersecurity · iGaming",
    className: "md:col-start-2 md:row-start-2",
  },
  {
    label: "Reporting",
    value: "Pipeline and revenue, weekly",
    className: "md:col-start-3 md:row-start-2",
  },
] as const;

const trustBrands = [
  "Empresex",
  "TEQUILA",
  "WHITEBIT",
  "CAPITAL.COM",
  "CURRENCY",
  "POCKET SPACE",
  "UNIT CITY",
  "1inch",
] as const;

const bigStats = [
  { to: 50, suffix: "+", label: "Projects shipped for funded teams" },
  { prefix: "$", to: 10, suffix: "M+", label: "Capital raised by founders we worked with" },
] as const;

function useInView<T extends Element>(threshold = 0.25) {
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

function BigStatValue({
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

function MetaCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <SurfaceCard interactive className={`min-h-[220px] md:min-h-[240px] ${className ?? ""}`}>
      <CardContent className={cn("flex h-full flex-col justify-between gap-0", surfaceCardPadding)}>
        <p className={textLabel}>{label}</p>
        <div className="mt-auto border-t border-[var(--rm-border-soft)] pt-5">
          <p className="whitespace-pre-line text-lg font-normal leading-snug text-[var(--rm-ink)] md:text-xl md:leading-[1.35]">
            {value}
          </p>
        </div>
      </CardContent>
    </SurfaceCard>
  );
}

export function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const { ref: marqueeRef, paused: marqueePaused } = usePauseWhenOffscreen<HTMLDivElement>();

  return (
    <section ref={ref} id="studio" aria-label="Studio overview">
      <div className="rm-trust-stats border-b border-white/10 bg-[#0a0a0a] px-6 md:px-10">
        <div className="rm-trust-stats__inner mx-auto w-full max-w-[1280px]">
          <div className="rm-trust-stats__marquee reveal">
            <div
              ref={marqueeRef}
              className={[
                "marquee relative w-full overflow-hidden",
                marqueePaused ? "marquee--paused" : "",
              ]
                .filter(Boolean)
                .join(" ")}
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
            <TrustStatsDiagram
              stats={[
                {
                  value: (
                    <BigStatValue to={bigStats[0].to} suffix={bigStats[0].suffix} start={inView} />
                  ),
                  copy: bigStats[0].label,
                },
                {
                  value: (
                    <BigStatValue
                      prefix={bigStats[1].prefix}
                      to={bigStats[1].to}
                      suffix={bigStats[1].suffix}
                      start={inView}
                    />
                  ),
                  copy: bigStats[1].label,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={sectionShell}>
        <div className={sectionContainer}>
          <SectionHeader tag="Marketing agency">
            <h2 className="sr-only">We don&apos;t bring ideas. We come with a plan.</h2>
            <TextReveal
              text="We don't bring ideas. We come with a plan."
              className={sectionHeadline}
            />

            <div className={cn(sectionInnerStack, "mt-6 md:mt-10")}>
              <p className={cn(bodyCopyStrong, "border-l-2 border-white/20 pl-4 md:pl-5")}>
                A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming
                inside out.
              </p>
              <ul className="flex flex-col gap-3 pt-1">
                {[
                  "10 practitioners to make your product seen, trusted, and bought.",
                  "No corporate layers. Clear deliverables only.",
                  "Decisions in hours, not weeks. Output you can ship the same day.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[0.3em] shrink-0 text-sm text-white/30">—</span>
                    <span className={bodyCopy}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionHeader>

          <div className={`reveal ${sectionContentGrid} sm:grid-cols-2`} data-delay="1">
            <div
              className="hidden md:flex md:col-start-1 md:row-span-2 md:row-start-1 md:items-end md:pb-2"
              aria-hidden
            >
              <span className="select-none text-[clamp(5rem,8vw,8rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.05] pointer-events-none">
                02
              </span>
            </div>

            {metaCards.map((card) => (
              <MetaCard key={card.label} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
