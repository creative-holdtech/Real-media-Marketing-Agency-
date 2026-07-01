import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ScrollProgressBar, MagneticButton, Reveal } from "@/components/motion-bits";
import {
  sectionHeadline,
  sectionInner,
  siteChromeBand,
  textCardBody,
  textFaint,
  textGhost,
  textMeta,
  textSubtle,
} from "@/components/framer-section";
import { buildPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/seo")({
  head: () =>
    buildPageHead({
      title: "SEO — Intent, Compound, Authority · R—M Studio",
      description:
        "We don't sell SEO traffic. We build category authority — compounding intent, leadership content, and a search footprint that owns the conversation.",
      pathname: "/seo",
    }),
  component: SeoPage,
});

const ROTATE = ["INTENT", "COMPOUND", "LEADERSHIP", "AUTHORITY"];

const services = [
  {
    n: "01",
    kicker: "Strategy",
    title: "Intent map, not keyword list.",
    body: "We reverse-engineer the buying journey of your ICP — from category-defining searches to bottom-funnel comparisons. The output is a living intent map, not a 4 000-row keyword spreadsheet nobody opens.",
    deliverables: [
      "ICP intent map",
      "Category narrative",
      "Topical authority blueprint",
      "Competitor gap audit",
      "12-month roadmap",
    ],
    art: "intent",
  },
  {
    n: "02",
    kicker: "Content",
    title: "Leadership content. Not SEO sludge.",
    body: "Pieces written with your senior operators — opinionated, original, sourced. Each one earns links because it deserves them. We ship long-form pillars, comparison hubs and POV essays — never templated 'top 10' filler.",
    deliverables: [
      "Founder POV essays",
      "Pillar / cluster hubs",
      "Comparison & alternative pages",
      "Editorial calendar",
      "Internal linking system",
    ],
    art: "content",
  },
  {
    n: "03",
    kicker: "Authority",
    title: "Footprint that compounds.",
    body: "Technical foundation, schema, programmatic surfaces and a digital-PR layer that places your founders in the rooms their buyers already read. Built once. Compounds quarterly.",
    deliverables: [
      "Core Web Vitals fix",
      "Schema & entity graph",
      "Programmatic templates",
      "Digital PR placements",
      "Quarterly authority review",
    ],
    art: "authority",
  },
];

const outcomes = [
  {
    n: "01",
    title: "Inbound that closes itself.",
    body: "Sales conversations start at consideration, not education. Demo-ready leads instead of cold MQLs.",
  },
  {
    n: "02",
    title: "Lower CAC, quarter over quarter.",
    body: "Organic share of pipeline grows while paid spend flattens. Compounding becomes a P&L line.",
  },
  {
    n: "03",
    title: "Category gravity.",
    body: "Your name shows up in the SERP, in podcasts, in the analyst notes. Buyers arrive already convinced.",
  },
  {
    n: "04",
    title: "Defensible moat.",
    body: "Search authority is one of the hardest assets to copy. Once you own the intent layer, competitors rent traffic — you own it.",
  },
];

const marqueeWords = [
  "Intent",
  "Compound",
  "Leadership",
  "Authority",
  "Anti-agency",
  "Built to compound",
  "EU · MENA",
  "Since 2019",
];

function SeoPage() {
  const reduce = useReducedMotion();
  const [rIndex, setRIndex] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (t) return;
      t = setInterval(() => setRIndex((i) => (i + 1) % ROTATE.length), 2400);
    };
    const stop = () => {
      if (t) {
        clearInterval(t);
        t = null;
      }
    };
    const onVis = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return (
    <div className="rm-page selection:bg-[#efeeea] selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />

      <SiteHeader variant="dark" />

      <main id="main">
        {/* HERO */}
        <section
          aria-labelledby="page-title"
          className="relative isolate overflow-hidden pt-16 md:pt-24 pb-12 md:pb-20"
        >
          {/* ambient bloom */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 35%, rgba(255,75,40,0.18), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(80,60,255,0.12), transparent 70%), #070707",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />

          <div className={cn(siteChromeBand, "relative text-center")}>
            <div className={sectionInner}>
            <h1 id="page-title" className="rm-title-hero mx-auto max-w-6xl">
              SEO built on{" "}
              <span className="relative inline-block align-baseline w-[6.2ch] md:w-[7.6ch] h-[1em] text-left overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rIndex}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.2em" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.2em" }}
                    transition={{ duration: reduce ? 0.2 : 0.24, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 text-white font-semibold"
                  >
                    {ROTATE[rIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span className="rm-type-display-muted">— not keyword sludge.</span>
            </h1>

            <p className="rm-copy-lead mx-auto mt-10 max-w-[640px]">
              We don't rent you traffic. We build the intent map, leadership content and authority
              footprint that make organic your most defensible channel.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href="#contact" strength={8} className="rm-btn rm-btn-primary">
                Get an audit
              </MagneticButton>
              <MagneticButton href="#services" strength={6} className="rm-btn rm-btn-secondary">
                How we work
              </MagneticButton>
            </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF MARQUEE */}
        <section
          aria-label="Trusted by"
          className="border-y border-[var(--rm-border-soft)] bg-rm-surface/40"
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "flex gap-12 whitespace-nowrap py-5 rm-type-tag animate-[marquee_38s_linear_infinite]",
                textSubtle,
              )}
            >
              {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
                <span key={i} className="flex items-center gap-12">
                  {w}
                  <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-white/25" />
                </span>
              ))}
            </div>
          </div>
          <style>{`@keyframes marquee {0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}} @media (prefers-reduced-motion: reduce){[class*="animate-[marquee"]{animation:none !important}}`}</style>
        </section>

        {/* ANTI-POSITION */}
        <section className="border-b border-[var(--rm-border-soft)]">
          <div className={cn(siteChromeBand, "py-24 md:py-36")}>
            <div className={sectionInner}>
            <Reveal duration={0.5}>
              <p className="rm-eyebrow mb-8 tabular-nums">Our position</p>
            </Reveal>
            <Reveal delay={0.05} duration={0.5}>
              <h2 className={cn(sectionHeadline, "max-w-5xl")}>
                We don't sell SEO traffic.{" "}
                <span className="rm-type-display-muted">
                  We build category authority that compounds for years after the engagement ends.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <p className={cn("mt-10 max-w-[680px]", textCardBody)}>
                The market is loaded with agencies optimising for impressions, anchor-text spam and
                AI-generated word count. That model dies on every Google update. Ours doesn't —
                because authority earned by real operators on real intent is the moat algorithms
                reward.
              </p>
            </Reveal>
            </div>
          </div>
        </section>

        {/* SERVICES — alternating */}
        <section id="services" aria-label="What we do">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article key={s.n} className="border-b border-[var(--rm-border-soft)]">
                <div className={cn(siteChromeBand, "py-24 md:py-36")}>
                  <div className={sectionInner}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
                  >
                    <Reveal className="md:col-span-7" duration={0.5}>
                      <div className="flex items-baseline gap-5 mb-6">
                        <span className="rm-type-display font-light text-[var(--rm-text-ghost)] tabular-nums leading-none">
                          {s.n}
                        </span>
                        <span className={cn("rm-type-meta", textFaint)}>{s.kicker}</span>
                      </div>
                      <h3 className={cn(sectionHeadline, "max-w-[18ch]")}>{s.title}</h3>
                      <p className={cn("mt-6 max-w-[60ch]", textCardBody)}>{s.body}</p>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="rm-type-tag rounded-full border border-[var(--rm-border-soft)] px-4 py-2 text-[var(--rm-text-body)] hover:border-[var(--rm-border-strong)] hover:text-white transition-[color,border-color,transform] duration-150 ease-out active:scale-[0.97]"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    <Reveal delay={0.1} className="md:col-span-5" duration={0.5}>
                      <ServiceArt kind={s.art as "intent" | "content" | "authority"} />
                    </Reveal>
                  </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* OUTCOMES — gapless bento */}
        <section
          aria-labelledby="outcomes-heading"
          className="border-b border-[var(--rm-border-soft)] bg-rm-surface"
        >
          <div className={cn(siteChromeBand, "py-24")}>
            <div className={sectionInner}>
            <Reveal duration={0.5}>
              <h2 id="outcomes-heading" className={cn(sectionHeadline, "max-w-4xl")}>
                What changes in the business.{" "}
                <span className="rm-type-display-muted">Four shifts.</span>
              </h2>
            </Reveal>

            <div className="mt-16 grid grid-flow-dense grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
              {outcomes.map((o, i) => {
                const span =
                  i === 0
                    ? "col-span-2 md:col-span-3 md:row-span-2"
                    : i === 1
                      ? "col-span-2 md:col-span-3"
                      : "col-span-1 md:col-span-3";
                return (
                  <Reveal
                    key={o.n}
                    delay={i * 0.05}
                    className={`${span} rm-card p-6 md:p-10 overflow-hidden relative transition-[border-color] duration-500 hover:border-[var(--rm-border-strong)]`}
                    duration={0.5}
                  >
                    <div className={cn("rm-type-meta mb-5 tabular-nums", textFaint)}>{o.n}</div>
                    <h3
                      className={
                        i === 0 ? "rm-title-section" : "rm-type-subsection text-[var(--rm-ink)]"
                      }
                    >
                      {o.title}
                    </h3>
                    <p className={cn("mt-4 max-w-[44ch]", textCardBody)}>{o.body}</p>
                    {i === 0 && (
                      <div
                        aria-hidden
                        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-50 blur-3xl"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(255,75,40,0.28), transparent 70%)",
                        }}
                      />
                    )}
                  </Reveal>
                );
              })}
            </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="relative overflow-hidden border-b border-[var(--rm-border-soft)]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 30% 40%, rgba(80,60,255,0.18), transparent 70%), var(--rm-surface)",
            }}
          />
          <div className={cn(siteChromeBand, "py-28")}>
            <div className={sectionInner}>
            <Reveal duration={0.5}>
              <blockquote className={cn(sectionHeadline, "max-w-[22ch] md:max-w-[26ch]")}>
                <span className="text-[var(--rm-text-ghost)]">"</span>
                Six months in, organic is 64% of pipeline. It's the first agency relationship that
                actually built an asset instead of renting one.
                <span className="text-[var(--rm-text-ghost)]">"</span>
              </blockquote>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <div className="mt-12 flex items-center gap-5">
                <div
                  aria-hidden
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/15"
                />
                <div>
                  <p className="rm-type-body rm-type-body-strong text-[var(--rm-ink)]">Anna K.</p>
                  <p className={cn("rm-type-body", textSubtle)}>
                    Head of Growth · Series-B Fintech
                  </p>
                </div>
              </div>
            </Reveal>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section id="contact" aria-labelledby="cta-heading" className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 50%, rgba(255,75,40,0.22), transparent 70%), var(--rm-surface)",
            }}
          />
          <div className={cn(siteChromeBand, "py-28 text-center")}>
            <div className={sectionInner}>
            <Reveal duration={0.5}>
              <h2 id="cta-heading" className="mx-auto max-w-5xl rm-title-hero">
                Ready to own the search?{" "}
                <span className="rm-type-display-muted">Let's audit yours.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton
                  href="mailto:info@realmedia.ink?subject=SEO%20audit"
                  strength={8}
                  className="rm-btn rm-btn-primary"
                >
                  Get an audit
                </MagneticButton>
                <MagneticButton href="/cases" strength={6} className="rm-btn rm-btn-secondary">
                  See case studies
                </MagneticButton>
              </div>
            </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------- Abstract CSS visuals per service (no stock photos) ---------- */
function ServiceArt({ kind }: { kind: "intent" | "content" | "authority" }) {
  if (kind === "intent") {
    return (
      <div className="relative aspect-[4/5] rm-media-card p-6 transition-[border-color] duration-500 hover:border-[var(--rm-border-strong)]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,75,40,0.35), transparent 45%), radial-gradient(circle at 70% 70%, rgba(80,60,255,0.3), transparent 50%)",
          }}
        />
        <div className="relative h-full flex flex-col justify-between">
          <div className="rm-type-meta text-[var(--rm-text-muted)]">Intent map</div>
          <svg viewBox="0 0 200 200" className="w-full h-auto opacity-80">
            {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y) => (
              <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
            ))}
            <path
              d="M0 160 C 40 150, 60 110, 100 100 S 160 40, 200 20"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            {[
              [40, 148],
              [100, 100],
              [160, 50],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="white" />
            ))}
          </svg>
          <div className="grid grid-cols-3 gap-2 rm-type-tag text-[var(--rm-text-subtle)]">
            <span>Top</span>
            <span className="text-center">Mid</span>
            <span className="text-right">Bottom</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "content") {
    return (
      <div className="relative aspect-[4/5] rm-media-card p-6 transition-[border-color] duration-500 hover:border-[var(--rm-border-strong)]">
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(80,60,255,0.5), transparent 70%)" }}
        />
        <div className="relative h-full flex flex-col gap-4">
          <div className="rm-type-meta text-[var(--rm-text-muted)]">Pillar / cluster</div>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/80 w-3/4" />
            <div className="h-2 rounded-full bg-white/30 w-full" />
            <div className="h-2 rounded-full bg-white/30 w-5/6" />
            <div className="h-2 rounded-full bg-white/15 w-2/3" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            {["POV essay", "Comparison", "Deep dive", "Pillar"].map((t) => (
              <div
                key={t}
                className="rounded-lg border border-[var(--rm-border-soft)] px-3 py-2 rm-type-tag text-[var(--rm-text-body)]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/5] rm-media-card p-6 transition-[border-color] duration-500 hover:border-[var(--rm-border-strong)]">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "conic-gradient(from 200deg at 60% 50%, rgba(255,75,40,0.25), transparent 30%, rgba(80,60,255,0.25), transparent 70%)",
        }}
      />
      <div className="relative h-full flex flex-col">
        <div className="rm-type-meta text-[var(--rm-text-muted)]">Authority graph</div>
        <svg viewBox="0 0 200 200" className="w-full h-full mt-4 opacity-85">
          <circle cx="100" cy="100" r="6" fill="white" />
          {[
            [40, 50],
            [160, 60],
            [50, 150],
            [150, 150],
            [100, 30],
            [100, 170],
            [30, 100],
            [170, 100],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="100" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.18)" />
              <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.85)" />
            </g>
          ))}
        </svg>
        <div className="mt-2 rm-type-tag text-[var(--rm-text-subtle)]">
          Entity · Schema · Backlinks
        </div>
      </div>
    </div>
  );
}
