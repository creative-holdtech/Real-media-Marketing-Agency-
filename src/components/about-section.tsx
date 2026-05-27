import { useEffect, useRef, useState } from "react";

import {
  FramerTag,
  PlusIcon,
  bodyCopy,
  bodyCopyStrong,
  sectionContainer,
  sectionHeaderContent,
  sectionHeaderGrid,
  sectionHeadline,
  sectionShell,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";
import { TrustStatsDiagram } from "@/components/trust-stats-diagram";

const metaCards = [
  {
    label: "Sectors",
    value: "Fintech · AI SaaS · Cybersecurity · iGaming",
  },
  {
    label: "Our products",
    value: "Sprint (from 4 weeks)\nMarathon (2+ months)",
  },
  {
    label: "Markets",
    value: "EU · UK · MENA · GCC",
  },
  {
    label: "Reporting",
    value: "Pipeline and revenue, weekly",
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

function Tag({ children }: { children: string }) {
  return <FramerTag>{children}</FramerTag>;
}

function PlusIconLocal({ className }: { className?: string }) {
  return <PlusIcon className={className} />;
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-xl bg-white p-6 md:min-h-[220px]">
      <PlusIconLocal className="absolute right-6 top-6 z-[1] opacity-80" />
      <PlusIconLocal className="absolute bottom-6 right-6 z-[1] opacity-80" />

      <p className="relative z-[1] pr-12 text-balance text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.06em] text-black">
        {label}
      </p>

      <p className="relative z-[1] mt-6 max-w-[80%] whitespace-pre-line text-[18px] font-medium leading-[1.3] tracking-[-0.04em] text-black md:text-[20px]">
        {value}
      </p>
    </article>
  );
}

export function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="studio"
      aria-label="Studio overview"
      className={sectionShell}
    >
      <div className={sectionContainer}>
        <div className="flex w-full flex-col items-center gap-8 md:gap-10">
          <div className="rm-trust-stats__marquee-wrap w-full">
            <div className="rm-trust-stats__marquee reveal">
              <div
                className="marquee relative w-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <div className="marquee-track flex w-max items-center">
                  {Array.from({ length: 2 }).flatMap((_, dup) =>
                    trustBrands.map((b) => (
                      <span key={`${dup}-${b}`} aria-hidden={dup === 1} className="whitespace-nowrap">
                        {b}
                      </span>
                    )),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rm-trust-stats__diagram w-full reveal" data-delay="1">
            <TrustStatsDiagram
              topValue={
                <BigStatValue to={bigStats[0].to} suffix={bigStats[0].suffix} start={inView} />
              }
              topCopy={bigStats[0].label}
              bottomValue={
                <BigStatValue
                  prefix={bigStats[1].prefix}
                  to={bigStats[1].to}
                  suffix={bigStats[1].suffix}
                  start={inView}
                />
              }
              bottomCopy={bigStats[1].label}
            />
          </div>
        </div>

        <div className={sectionHeaderGrid}>
          <div className="reveal" data-delay="1">
            <Tag>Marketing agency</Tag>
          </div>

          <div className={`${sectionHeaderContent} flex flex-col gap-10`} data-delay="2">
            <TextReveal
              text="We don't bring ideas. We come with a plan."
              className={`w-full ${sectionHeadline}`}
            />

            <div className="flex max-w-[60%] flex-col gap-5">
              <p className={bodyCopyStrong}>
                A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming
                inside out.
              </p>
              <p className={bodyCopy}>
                10 practitioners to make your product seen, trusted, and bought.
              </p>
              <p className={bodyCopy}>No corporate layers. Clear deliverables only.</p>
              <p className={bodyCopy}>
                Decisions in hours, not weeks. Output you can ship the same day.
              </p>
            </div>
          </div>
        </div>

        <div
          className="reveal grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-2"
          data-delay="3"
        >
          <div className="relative hidden md:col-start-1 md:row-span-2 md:row-start-1 md:flex md:min-h-[200px] md:flex-col md:justify-between md:py-1">
            <PlusIconLocal className="opacity-80" />
            <PlusIconLocal className="opacity-80" />
            <PlusIconLocal className="opacity-80" />
          </div>

          {metaCards.map((card) => (
            <MetaCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
