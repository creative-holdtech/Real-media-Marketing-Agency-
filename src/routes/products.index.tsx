import { useState, useRef, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";

import {
  bodyCopy,
  btnPrimary,
  siteGutter,
  textFaint,
  textGhost,
  textSubtle,
} from "@/components/framer-section";

function PinFrame({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rm-pin-frame${active ? " rm-pin-frame--active" : ""}${className ? ` ${className}` : ""}`}
    >
      <span className="rm-pin-corner rm-pin-corner--tl" aria-hidden />
      <span className="rm-pin-corner rm-pin-corner--tr" aria-hidden />
      <span className="rm-pin-corner rm-pin-corner--bl" aria-hidden />
      <span className="rm-pin-corner rm-pin-corner--br" aria-hidden />
      {children}
    </div>
  );
}
import { cn } from "@/lib/utils";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { Reveal } from "@/components/motion-bits";
import { TextReveal } from "@/components/text-reveal";
import { useReveal } from "@/hooks/use-reveal";
import heroBg from "@/assets/hero-bg.png";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/products/")({
  head: () => {
    const seo = buildPageHead({
      title: "Products — Sprint & Marathon | R—M",
      description: "Sprint from 4 weeks or Marathon from 2 months.",
      pathname: "/products",
    });
    return {
      meta: seo.meta,
      links: [...seo.links, { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" }],
    };
  },
  component: ProductsPage,
});

const modes = {
  sprint: {
    tag: "Sprint",
    meta: "from 4 weeks · tactical retainer",
    headline: "High-impact marketing for fast raises and tight deadlines.",
    lead: "Sprint is a focused engagement with a clear scope and hard deadline. We embed into your workflow, deploy target channel mix, and move fast. You get weekly deliverables and clear data within a flexible monthly setup. Best suited for early-stage founders, growth leads preparing for a raise, and teams with solid traction looking for a breakthrough.",
    cta: "Scope a Sprint →",
    duration: "4+",
    format: "Tactical retainer",
    bestFor: "A defined challenge",
    cadence: "Daily check-ins",
    output: "Fixed deliverables",
    deliverables: [
      {
        title: "Positioning audit & fix",
        body: "We read everything your market sees—landing pages, decks, ads, socials—and rewrite the core pitch that should be doing 80% of the heavy lifting.",
      },
      {
        title: "Channel test stack",
        body: "Three high-probability distribution bets, deployed together over a two-week cycle. Hypothesis, creative, copy, and success metrics fully locked before launch.",
      },
      {
        title: "Conversion system review",
        body: "End-to-end funnel teardown: from first impression to signed deal. We isolate the single choke-point costing you the most and clear it.",
      },
    ],
  },
  marathon: {
    tag: "Marathon",
    meta: "from 2 months · strategic partnership",
    headline: "For founders building a category beyond a product.",
    lead: "Marathon is a foundational growth ecosystem. We replace the need for an in-house department to take over the entire function — from core strategy and positioning to long-term multi-channel execution. Built for Series A+ companies, ambitious scale-ups, and teams focusing on long-term growth as a board-level priority.",
    cta: "Start a Marathon →",
    duration: "2+",
    format: "Strategic partnership",
    bestFor: "Full brand build or market entry",
    cadence: "Weekly / Monthly strategy sessions",
    output: "Brand / GTM strategy",
    deliverables: [
      {
        title: "Market narrative architecture",
        body: "Your core message should never lose relevance. Every quarter, we analyze and update your positioning to match the current market reality.",
      },
      {
        title: "Finding new growth tracks",
        body: "Every month, we line up fresh channel and creative ideas. We track live performance, filter out the noise, and scale the top performers.",
      },
      {
        title: "Embedded Strategic Support",
        body: "Continuous C-level support for your launches, fundraises, and pivots. We operate inside your context, working alongside your core team.",
      },
    ],
  },
} as const;

type Mode = keyof typeof modes;

function ModeSwitcherCompact({ active, onChange }: { active: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="rm-mode-switcher" role="tablist" aria-label="Choose engagement format">
      {(["sprint", "marathon"] as Mode[]).map((m) => (
        <button
          key={m}
          role="tab"
          aria-selected={active === m}
          onClick={() => onChange(m)}
          className={cn("rm-mode-btn", active === m && "rm-mode-btn--active")}
        >
          <span className="rm-mode-btn__label">{modes[m].tag}</span>
          <span className="rm-mode-btn__bar" aria-hidden />
        </button>
      ))}
    </div>
  );
}

function SplitModeSwitcher({
  active,
  onChange,
  sectionRef,
}: {
  active: Mode;
  onChange: (m: Mode) => void;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.1"],
  });

  // Clamp slide distance to viewport width — prevents >20% jump on narrow screens
  const xOffset = useMemo(
    () => (typeof window !== "undefined" ? Math.round(Math.min(80, window.innerWidth * 0.13)) : 80),
    [],
  );

  const raw = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.4 });

  // Full transform strings — GPU-composited, not rAF/main-thread like x/y shorthands
  const sprintTransform = useTransform(
    raw,
    [0, 1],
    reduce
      ? ["translateX(0px)", "translateX(0px)"]
      : [`translateX(-${xOffset}px)`, "translateX(0px)"],
  );
  const marathonTransform = useTransform(
    raw,
    [0, 1],
    reduce
      ? ["translateX(0px)", "translateX(0px)"]
      : [`translateX(${xOffset}px)`, "translateX(0px)"],
  );
  const opacity = useTransform(raw, [0, 1], [0, 1]);
  const barScaleX = useTransform(raw, [0.2, 0.9], reduce ? [1, 1] : [0, 1]);
  // Ratcheted value — bar only ever increases, never shrinks on scroll-back
  const barRatchet = useMotionValue(0);
  useMotionValueEvent(barScaleX, "change", (v) => {
    if (v > barRatchet.get()) barRatchet.set(v);
  });
  const barTransform = useTransform(barRatchet, (v: number) => `scaleX(${v})`);

  return (
    <div
      className="rm-mode-switcher rm-mode-switcher--split"
      role="tablist"
      aria-label="Choose engagement format"
    >
      <motion.button
        role="tab"
        aria-selected={active === "sprint"}
        onClick={() => onChange("sprint")}
        className={cn("rm-mode-btn", active === "sprint" && "rm-mode-btn--active")}
        style={{ transform: sprintTransform, opacity }}
      >
        <span className="rm-mode-btn__label">Sprint</span>
        <span className="rm-mode-btn__meta">{modes.sprint.meta}</span>
        <motion.span
          className="rm-mode-btn__bar"
          aria-hidden
          style={
            active === "sprint" ? { transform: barTransform, transformOrigin: "left" } : undefined
          }
        />
      </motion.button>

      <motion.button
        role="tab"
        aria-selected={active === "marathon"}
        onClick={() => onChange("marathon")}
        className={cn("rm-mode-btn", active === "marathon" && "rm-mode-btn--active")}
        style={{ transform: marathonTransform, opacity }}
      >
        <span className="rm-mode-btn__label">Marathon</span>
        <span className="rm-mode-btn__meta">{modes.marathon.meta}</span>
        <motion.span
          className="rm-mode-btn__bar"
          aria-hidden
          style={
            active === "marathon" ? { transform: barTransform, transformOrigin: "left" } : undefined
          }
        />
      </motion.button>
    </div>
  );
}

function DeliverablesGrid({
  deliverables,
}: {
  deliverables: readonly { title: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-px border-t border-[var(--rm-border-soft)] sm:grid-cols-3">
      {deliverables.map((d, i) => (
        <Reveal key={d.title} delay={i * 0.08}>
          <div className="flex flex-col gap-4 px-0 py-8 sm:px-6 md:px-8 md:py-10 border-b border-[var(--rm-border-soft)] sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className={cn("rm-type-meta", textGhost)}>0{i + 1}</span>
            <h3 className="rm-type-tag text-[var(--rm-ink)]">{d.title}</h3>
            <p className={cn("rm-type-body max-w-prose", textFaint)}>{d.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CompareCards({ active, onChange }: { active: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-[var(--rm-border-soft)] sm:grid-cols-2">
      {(["sprint", "marathon"] as Mode[]).map((m) => {
        const d = modes[m];
        const isActive = active === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            aria-pressed={isActive}
            className={cn(
              "w-full text-left p-8 md:p-10 transition-all duration-300 cursor-pointer",
              isActive ? "bg-white/[0.04]" : "opacity-40 hover:opacity-70",
            )}
          >
            <div className="mb-6">
              <p className="rm-type-display text-[var(--rm-ink)]">{d.tag}</p>
              <p className={cn("mt-3 rm-type-body", textFaint)}>{d.meta}</p>
            </div>
            <dl className="flex flex-col gap-3 border-t border-[var(--rm-border-soft)] pt-6">
              {[
                { label: "Format", value: d.format },
                { label: "Best for", value: d.bestFor },
                { label: "Cadence", value: d.cadence },
                { label: "Output", value: d.output },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline gap-4">
                  <dt className={cn("rm-type-tag shrink-0", textGhost)}>{label}</dt>
                  <dd className="rm-type-body text-[var(--rm-text-muted)] text-right italic">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className={cn("mt-8 rm-type-body", textSubtle)}>
              {isActive ? d.cta : `Select ${d.tag}`}
            </div>
          </button>
        );
      })}
    </div>
  );
}

const WORD_EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

const wordVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.7,
      ease: WORD_EASE,
    },
  }),
};

const LINE1 = ["Choose", "the", "level"];
const LINE2 = ["of", "support", "you", "need"];

function HeroHeadline() {
  const reduce = useReducedMotion();
  const words = [...LINE1, ...LINE2, "right now."];

  return (
    <h1 id="products-heading" className="w-full rm-title-hero text-balance">
      <span className="block text-balance">
        {LINE1.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={reduce ? undefined : wordVariant}
            style={{ display: "inline-block", marginRight: "0.22em" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block text-balance">
        {LINE2.map((word, i) => (
          <motion.span
            key={word}
            custom={LINE1.length + i}
            initial="hidden"
            animate="visible"
            variants={reduce ? undefined : wordVariant}
            style={{ display: "inline-block", marginRight: "0.22em" }}
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          custom={words.length - 1}
          initial="hidden"
          animate="visible"
          variants={reduce ? undefined : wordVariant}
          className="rm-type-display-muted"
          style={{ display: "inline-block" }}
        >
          right now.
        </motion.span>
      </span>
    </h1>
  );
}

function ProductsPage() {
  useReveal();
  const [mode, setMode] = useState<Mode>("sprint");
  const switcherRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = switcherRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleModeChange(next: Mode) {
    if (next === mode) return;
    setMode(next);
  }

  const data = modes[mode];

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader variant="dark" overlay />

      {isSticky && (
        <div className="rm-sticky-mode-bar">
          <div className="mx-auto flex max-w-[var(--rm-grid-max)] items-center justify-end ">
            <ModeSwitcherCompact active={mode} onChange={handleModeChange} />
          </div>
        </div>
      )}

      <HeroAtmosphere imageSrc={heroBg} underHeader>
        <section
          className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]"
          aria-labelledby="products-heading"
        >
          <div className="relative mx-auto w-full max-w-[var(--rm-grid-max)] pb-10 pt-2 md:pb-20 md:pt-8 ">
            <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
              <HeroHeadline />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className={cn("mt-6 max-w-[34ch] text-balance text-center", bodyCopy)}
              >
                Both formats are built around your growth. One moves faster, the other goes deeper.
                Same quality, different scope.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="mt-10"
              >
                <button
                  onClick={() =>
                    document.getElementById("format")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={btnPrimary}
                >
                  See formats ↓
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        {/* Scroll-driven mode switcher */}
        <div
          ref={switcherRef}
          id="format"
          className="border-b border-[var(--rm-border-soft)] bg-[#000]"
          style={{ scrollMarginTop: "var(--rm-header-offset)" }}
        >
          <div className="mx-auto max-w-[var(--rm-grid-max)] overflow-hidden ">
            <SplitModeSwitcher active={mode} onChange={handleModeChange} sectionRef={switcherRef} />
          </div>
        </div>

        {/* Mode content */}
        <div className="rm-mode-panel" key={mode}>
          {/* Headline + lead */}
          <section className="border-b border-[var(--rm-border-soft)] bg-[#000]">
            <div className="mx-auto max-w-[var(--rm-grid-max)] py-16 md:py-24 ">
              <div className="grid grid-cols-12 gap-y-8 md:gap-16 items-start">
                <div className="col-span-12 md:col-span-7">
                  <TextReveal
                    text={data.headline}
                    className="rm-format-headline font-medium leading-[0.97] tracking-[-0.04em] text-white"
                  />
                </div>
                <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:pt-2">
                  <Reveal delay={0.1}>
                    <p className="rm-copy-lead">{data.lead}</p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <Link to="/contact" className={btnPrimary}>
                      {data.cta}
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* Deliverables — 3-column grid */}
          <section className="border-b border-[var(--rm-border-soft)] bg-[#000]">
            <div className="mx-auto max-w-[var(--rm-grid-max)] ">
              <DeliverablesGrid deliverables={data.deliverables} />
            </div>
          </section>
        </div>

        {/* Compare formats */}
        <section className="border-b border-[var(--rm-border-soft)] bg-[#000]">
          <div className="mx-auto max-w-[var(--rm-grid-max)] py-16 md:py-24 ">
            <Reveal>
              <p className="rm-eyebrow mb-10">Compare formats</p>
            </Reveal>
            <Reveal delay={0.08}>
              <PinFrame>
                <CompareCards active={mode} onChange={handleModeChange} />
              </PinFrame>
            </Reveal>
          </div>
        </section>

        <UnifiedCTA
          title="Not sure which one fits?"
          titleAccent="Let's figure it out together. Book a 30-minute call. We'll ask you three questions and tell you exactly which format makes sense — or why neither does."
          primaryLabel="Book a call"
          primaryTo="/contact"
          secondaryLabel="See case studies"
          secondaryTo="/cases"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
