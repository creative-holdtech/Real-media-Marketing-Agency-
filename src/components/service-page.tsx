import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ScrollProgressBar, MagneticButton, Reveal } from "@/components/motion-bits";
import { UnifiedCTA } from "@/components/unified-cta";
import type { ServiceContent } from "@/lib/services";

export function ServicePageView({ service: s }: { service: ServiceContent }) {
  const reduce = useReducedMotion();
  const [rIndex, setRIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setRIndex((i) => (i + 1) % s.rotate.length), 2400);
    return () => clearInterval(t);
  }, [reduce, s.rotate.length]);

  const accent = s.accent;

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
          aria-labelledby="service-title"
          className="relative isolate overflow-hidden pt-16 md:pt-24 pb-12 md:pb-20"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(60% 50% at 50% 35%, ${accent}33, transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(80,60,255,0.12), transparent 70%), #070707`,
            }}
          />
          <div className="relative px-6 md:px-12 max-w-[1360px] mx-auto w-full text-center">
            <Link
              to="/services"
              className="inline-block mb-10 rm-eyebrow hover:text-white transition-colors"
            >
              ← All services
            </Link>
            <h1 id="service-title" className="rm-title-hero mx-auto max-w-6xl">
              {s.heroTitlePrefix}{" "}
              <span className="relative inline-block align-baseline w-[7.6ch] md:w-[9ch] h-[1em] text-left overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rIndex}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.2em" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.2em" }}
                    transition={{ duration: reduce ? 0.2 : 0.24, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 text-white font-semibold"
                  >
                    {s.rotate[rIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span className="font-light text-white/55">{s.heroTitleSuffix}</span>
            </h1>

            <p className="rm-copy-lead mx-auto mt-10 max-w-[640px]">{s.heroIntro}</p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link to="/audit" className="rm-btn rm-btn-primary">
                Get free audit
              </Link>
              <a href="#pillars" className="rm-btn rm-btn-secondary">
                How we work
              </a>
            </div>
          </div>
        </section>

        {/* ANTI-POSITION */}
        <section className="border-y border-white/10">
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-36">
            <Reveal duration={0.5}>
              <p className="rm-eyebrow mb-8">Our position</p>
            </Reveal>
            <Reveal delay={0.05} duration={0.5}>
              <h2 className="rm-title-section max-w-5xl">
                {s.position.title}{" "}
                <span className="font-light text-white/45">{s.position.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <p className="mt-10 max-w-[680px] text-[15px] md:text-[17px] leading-[1.7] rm-body">
                {s.position.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* PILLARS — alternating */}
        <section id="pillars">
          {s.pillars.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <article key={p.n} className="border-b border-white/10">
                <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-36">
                  <div
                    className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
                  >
                    <Reveal className="md:col-span-7" duration={0.5}>
                      <div className="flex items-baseline gap-5 mb-6">
                        <span className="text-[48px] md:text-[72px] leading-none font-light tracking-[-0.04em] text-white/25 tabular-nums">
                          {p.n}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          {p.kicker}
                        </span>
                      </div>
                      <h3 className="text-[32px] md:text-[56px] leading-[1.02] tracking-[-0.03em] font-medium text-white max-w-[18ch]">
                        {p.title}
                      </h3>
                      <p className="mt-6 max-w-[60ch] text-[15px] md:text-[17px] leading-[1.7] text-white/70">
                        {p.body}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {p.deliverables.map((d) => (
                          <li
                            key={d}
                            className="text-[12px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border border-white/15 text-white/75 hover:border-white/35 hover:text-white transition-[color,border-color] duration-150"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    <Reveal delay={0.1} className="md:col-span-5" duration={0.5}>
                      <PillarArt index={i} accent={accent} />
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* OUTCOMES bento */}
        <section
          aria-labelledby="outcomes-heading"
          className="border-b border-white/10 bg-rm-surface"
        >
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-16 md:py-24">
            <Reveal duration={0.5}>
              <h2
                id="outcomes-heading"
                className="max-w-4xl text-[32px] sm:text-[48px] md:text-[60px] leading-[1.05] tracking-[-0.03em] font-medium text-white"
              >
                What changes in the business.{" "}
                <span className="font-light text-white/45">Four shifts.</span>
              </h2>
            </Reveal>

            <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {s.outcomes.map((o, i) => {
                return (
                  <Reveal
                    key={o.n}
                    delay={i * 0.05}
                    className="rm-card p-6 md:p-8 overflow-hidden relative transition-[border-color] duration-500 hover:border-white/25"
                    duration={0.5}
                  >
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-5 tabular-nums">
                      {o.n}
                    </div>
                    <h3
                      className="text-[20px] md:text-[26px] leading-[1.1] tracking-[-0.03em] font-medium text-white"
                    >
                      {o.title}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[14px] md:text-[15px] leading-[1.65] rm-body">
                      {o.body}
                    </p>
                    {i === 0 && (
                      <div
                        aria-hidden
                        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-50 blur-3xl"
                        style={{
                          background: `radial-gradient(circle, ${accent}48, transparent 70%)`,
                        }}
                      />
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(50% 60% at 30% 40%, ${accent}22, transparent 70%), #0a0a0a`,
            }}
          />
          <div className="px-6 md:px-12 max-w-[1200px] mx-auto py-28 md:py-28">
            <Reveal duration={0.5}>
              <blockquote className="text-[28px] sm:text-[40px] md:text-[56px] leading-[1.15] tracking-[-0.025em] font-medium text-white max-w-[22ch] md:max-w-[26ch]">
                <span className="text-white/35">"</span>
                {s.testimonial.quote}
                <span className="text-white/35">"</span>
              </blockquote>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <div className="mt-12 flex items-center gap-5">
                <div
                  aria-hidden
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/15"
                />
                <div>
                  <p className="text-[15px] font-medium text-white">{s.testimonial.who}</p>
                  <p className="text-[13px] text-white/55">{s.testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <UnifiedCTA
          eyebrow={s.shortName}
          title={`Ready to upgrade your ${s.shortName.toLowerCase()}?`}
          titleAccent="Let's start with a free audit."
        />
      </main>

      <SiteFooter />

      {/* Marquee + magnetic CSS reuses globals */}
      <style>{`
        .skip-link{position:absolute;left:-9999px}
        .skip-link:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem .75rem;border-radius:.5rem;z-index:100}
      `}</style>
    </div>
  );
}

/* Abstract per-pillar visuals (no stock photos) */
function PillarArt({ index, accent }: { index: number; accent: string }) {
  if (index === 0) {
    return (
      <div className="relative aspect-[4/5] rm-media-card p-6 transition-[border-color] duration-500 hover:border-white/25">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, ${accent}55, transparent 45%), radial-gradient(circle at 70% 70%, rgba(80,60,255,0.3), transparent 50%)`,
          }}
        />
        <div className="relative h-full flex flex-col justify-between">
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Strategy map</div>
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
          <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
            <span>Now</span>
            <span className="text-center">Next</span>
            <span className="text-right">Compound</span>
          </div>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative aspect-[4/5] rm-media-card p-6 transition-[border-color] duration-500 hover:border-white/25">
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-40"
          style={{ background: `radial-gradient(circle, ${accent}80, transparent 70%)` }}
        />
        <div className="relative h-full flex flex-col gap-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
            Production system
          </div>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/80 w-3/4" />
            <div className="h-2 rounded-full bg-white/30 w-full" />
            <div className="h-2 rounded-full bg-white/30 w-5/6" />
            <div className="h-2 rounded-full bg-white/15 w-2/3" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            {["Sprint 01", "Sprint 02", "Sprint 03", "Sprint 04"].map((t) => (
              <div
                key={t}
                className="rounded-lg border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70"
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
    <div className="relative aspect-[4/5] rm-media-card p-6 transition-[border-color] duration-500 hover:border-white/25">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `conic-gradient(from 200deg at 60% 50%, ${accent}40, transparent 30%, rgba(80,60,255,0.25), transparent 70%)`,
        }}
      />
      <div className="relative h-full flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
          Distribution graph
        </div>
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
        <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
          Channel · Loop · Compound
        </div>
      </div>
    </div>
  );
}
