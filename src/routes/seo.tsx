import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ScrollProgressBar, MagneticButton, Reveal } from "@/components/motion-bits";

export const Route = createFileRoute("/seo")({
  head: () => ({
    meta: [
      { title: "SEO — Intent, Compound, Authority · R—M Studio" },
      {
        name: "description",
        content:
          "We don't sell SEO traffic. We build category authority — compounding intent, leadership content, and a search footprint that owns the conversation.",
      },
      { property: "og:title", content: "SEO that compounds — R—M Studio" },
      {
        property: "og:description",
        content:
          "Anti-agency SEO for founders. Intent strategy, leadership content, and authority footprint built to compound.",
      },
    ],
  }),
  component: SeoPage,
});


const ROTATE = ["INTENT", "COMPOUND", "LEADERSHIP", "AUTHORITY"];

const services = [
  {
    n: "01",
    kicker: "Strategy",
    title: "Intent map, not keyword list.",
    body:
      "We reverse-engineer the buying journey of your ICP — from category-defining searches to bottom-funnel comparisons. The output is a living intent map, not a 4 000-row keyword spreadsheet nobody opens.",
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
    body:
      "Pieces written with your senior operators — opinionated, original, sourced. Each one earns links because it deserves them. We ship long-form pillars, comparison hubs and POV essays — never templated 'top 10' filler.",
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
    body:
      "Technical foundation, schema, programmatic surfaces and a digital-PR layer that places your founders in the rooms their buyers already read. Built once. Compounds quarterly.",
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
    body:
      "Sales conversations start at consideration, not education. Demo-ready leads instead of cold MQLs.",
  },
  {
    n: "02",
    title: "Lower CAC, quarter over quarter.",
    body:
      "Organic share of pipeline grows while paid spend flattens. Compounding becomes a P&L line.",
  },
  {
    n: "03",
    title: "Category gravity.",
    body:
      "Your name shows up in the SERP, in podcasts, in the analyst notes. Buyers arrive already convinced.",
  },
  {
    n: "04",
    title: "Defensible moat.",
    body:
      "Search authority is one of the hardest assets to copy. Once you own the intent layer, competitors rent traffic — you own it.",
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
      if (t) { clearInterval(t); t = null; }
    };
    const onVis = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => { stop(); document.removeEventListener("visibilitychange", onVis); };
  }, [reduce]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#efeeea] selection:text-black overflow-x-hidden">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgressBar />

      <SiteHeader variant="dark" />

      <main id="main">
        {/* HERO */}
        <section
          aria-labelledby="page-title"
          className="relative isolate overflow-hidden min-h-[88vh] flex flex-col justify-center pt-28 md:pt-32 pb-24 md:pb-32"
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

          <div className="relative px-6 md:px-12 max-w-[1360px] mx-auto w-full text-center">
            <h1
              id="page-title"
              className="mx-auto max-w-6xl text-[44px] sm:text-[80px] md:text-[112px] leading-[0.98] tracking-[-0.04em] font-medium text-white"
            >
              SEO built on{" "}
              <span className="relative inline-block align-baseline w-[6.2ch] md:w-[7.6ch] h-[1em] text-left overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rIndex}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.2em" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.2em" }}
                    transition={{ duration: reduce ? 0.2 : 0.24, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 bg-gradient-to-br from-white via-white to-white/55 bg-clip-text text-transparent font-semibold"
                  >
                    {ROTATE[rIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span className="font-light text-white/55">— not keyword sludge.</span>
            </h1>

            <p className="mx-auto mt-10 max-w-[640px] text-[16px] md:text-[19px] leading-[1.6] text-white/72">
              We don't rent you traffic. We build the intent map, leadership content
              and authority footprint that make organic your most defensible channel.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href="#contact"
                strength={8}
                className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                Get an audit
              </MagneticButton>
              <MagneticButton
                href="#services"
                strength={6}
                className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                How we work
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF MARQUEE */}
        <section aria-label="Trusted by" className="border-y border-white/10 bg-black/40">
          <div className="overflow-hidden">
            <div className="flex gap-12 whitespace-nowrap py-5 text-[11px] uppercase tracking-[0.28em] text-white/55 animate-[marquee_38s_linear_infinite]">
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
        <section className="border-b border-white/10">
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-36">
            <Reveal duration={0.5}>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-8 tabular-nums">
                Our position
              </p>
            </Reveal>
            <Reveal delay={0.05} duration={0.5}>
              <h2 className="max-w-5xl text-[40px] sm:text-[64px] md:text-[88px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
                We don't sell SEO traffic.{" "}
                <span className="font-light text-white/45">
                  We build category authority that compounds for years after the engagement ends.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <p className="mt-10 max-w-[680px] text-[15px] md:text-[17px] leading-[1.7] text-white/65">
                The market is loaded with agencies optimising for impressions, anchor-text spam and
                AI-generated word count. That model dies on every Google update. Ours doesn't —
                because authority earned by real operators on real intent is the moat algorithms reward.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SERVICES — alternating */}
        <section id="services" aria-label="What we do">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.n}
                className="border-b border-white/10"
              >
                <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-36">
                  <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
                    <Reveal className="md:col-span-7" duration={0.5}>
                      <div className="flex items-baseline gap-5 mb-6">
                        <span className="text-[48px] md:text-[72px] leading-none font-light tracking-[-0.04em] text-white/25 tabular-nums">
                          {s.n}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                          {s.kicker}
                        </span>
                      </div>
                      <h3 className="text-[32px] md:text-[56px] leading-[1.02] tracking-[-0.03em] font-medium text-white max-w-[18ch]">
                        {s.title}
                      </h3>
                      <p className="mt-6 max-w-[60ch] text-[15px] md:text-[17px] leading-[1.7] text-white/70">
                        {s.body}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="text-[12px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border border-white/15 text-white/75 hover:border-white/35 hover:text-white transition-[color,border-color,transform] duration-150 ease-out active:scale-[0.97]"
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
              </article>
            );
          })}
        </section>

        {/* OUTCOMES — gapless bento */}
        <section aria-labelledby="outcomes-heading" className="border-b border-white/10 bg-[#070707]">
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-32">
            <Reveal duration={0.5}>
              <h2
                id="outcomes-heading"
                className="max-w-4xl text-[40px] sm:text-[64px] md:text-[80px] leading-[1.02] tracking-[-0.035em] font-medium text-white"
              >
                What changes in the business.{" "}
                <span className="font-light text-white/45">Four shifts.</span>
              </h2>
            </Reveal>

            <div className="mt-16 grid grid-flow-dense grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
              {outcomes.map((o, i) => {
                const span = i === 0
                  ? "col-span-2 md:col-span-3 md:row-span-2"
                  : i === 1
                  ? "col-span-2 md:col-span-3"
                  : "col-span-1 md:col-span-3";
                return (
                  <Reveal
                    key={o.n}
                    delay={i * 0.05}
                    className={`${span} rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-6 md:p-10 overflow-hidden relative`}
                   duration={0.5}>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-5 tabular-nums">{o.n}</div>
                    <h3 className={`${i === 0 ? "text-[28px] md:text-[44px]" : "text-[22px] md:text-[30px]"} leading-[1.05] tracking-[-0.03em] font-medium text-white`}>
                      {o.title}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[14px] md:text-[15px] leading-[1.65] text-white/65">
                      {o.body}
                    </p>
                    {i === 0 && (
                      <div
                        aria-hidden
                        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-50 blur-3xl"
                        style={{ background: "radial-gradient(circle, rgba(255,75,40,0.28), transparent 70%)" }}
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
              background:
                "radial-gradient(50% 60% at 30% 40%, rgba(80,60,255,0.18), transparent 70%), #0a0a0a",
            }}
          />
          <div className="px-6 md:px-12 max-w-[1200px] mx-auto py-28 md:py-40">
            <Reveal duration={0.5}>
              <blockquote className="text-[28px] sm:text-[40px] md:text-[56px] leading-[1.15] tracking-[-0.025em] font-medium text-white max-w-[22ch] md:max-w-[26ch]">
                <span className="text-white/35">"</span>
                Six months in, organic is 64% of pipeline. It's the first agency relationship
                that actually built an asset instead of renting one.
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
                  <p className="text-[15px] font-medium text-white">Anna K.</p>
                  <p className="text-[13px] text-white/55">Head of Growth · Series-B Fintech</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA BANNER */}
        <section
          id="contact"
          aria-labelledby="cta-heading"
          className="relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 50%, rgba(255,75,40,0.22), transparent 70%), #060606",
            }}
          />
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-28 md:py-40 text-center">
            <Reveal duration={0.5}>
              <h2
                id="cta-heading"
                className="mx-auto max-w-5xl text-[44px] sm:text-[72px] md:text-[104px] leading-[0.98] tracking-[-0.04em] font-medium text-white"
              >
                Ready to own the search?{" "}
                <span className="font-light text-white/55">Let's audit yours.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} duration={0.5}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton
                  href="mailto:hello@r-m.studio?subject=SEO%20audit"
                  strength={8}
                  className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
                >
                  Get an audit
                </MagneticButton>
                <MagneticButton
                  href="/cases"
                  strength={6}
                  className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
                >
                  See case studies
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0a0a] border-t border-white/10 text-white">
        <div className="px-6 md:px-12 max-w-[1280px] mx-auto pt-20 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-6 pb-16 border-b border-white/10">
            <div className="col-span-2 md:col-span-4">
              <Link to="/" className="text-[18px] font-medium tracking-[-0.01em] text-white">
                R-M Studio
              </Link>
              <p className="mt-4 text-[14px] leading-[1.6] text-white/55 max-w-[280px]">
                Strategy and brand studio for ambitious founders. Kyiv · EU · MENA.
              </p>
            </div>
            <div className="col-span-1 md:col-span-2 md:col-start-6">
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-white/45 mb-4">Studio</h3>
              <ul className="space-y-3 text-[14px] text-white/75">
                <li><a href="/#products" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="/cases" className="hover:text-white transition-colors">Case studies</a></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-white/45 mb-4">Resources</h3>
              <ul className="space-y-3 text-[14px] text-white/75">
                <li><Link to="/blog" className="hover:text-white transition-colors">Journal</Link></li>
                <li><a href="/#insights" className="hover:text-white transition-colors">Insights</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-white/45 mb-4">Contact</h3>
              <ul className="space-y-3 text-[14px] text-white/75">
                <li><a href="mailto:hello@r-m.studio" className="hover:text-white transition-colors">hello@r-m.studio</a></li>
                <li><a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://x.com" className="hover:text-white transition-colors">Twitter / X</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/45">
            <span>© R-M Studio 2026 · All rights reserved.</span>
            <ul className="flex items-center gap-6">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><span>Kyiv / EU / MENA</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Abstract CSS visuals per service (no stock photos) ---------- */
function ServiceArt({ kind }: { kind: "intent" | "content" | "authority" }) {
  if (kind === "intent") {
    return (
      <div className="relative aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6">
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,75,40,0.35), transparent 45%), radial-gradient(circle at 70% 70%, rgba(80,60,255,0.3), transparent 50%)",
        }} />
        <div className="relative h-full flex flex-col justify-between">
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Intent map</div>
          <svg viewBox="0 0 200 200" className="w-full h-auto opacity-80">
            {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y) => (
              <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
            ))}
            <path d="M0 160 C 40 150, 60 110, 100 100 S 160 40, 200 20" stroke="white" strokeWidth="1.5" fill="none" />
            {[[40, 148], [100, 100], [160, 50]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="white" />
            ))}
          </svg>
          <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
            <span>Top</span><span className="text-center">Mid</span><span className="text-right">Bottom</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "content") {
    return (
      <div className="relative aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden bg-[#0c0c0c] p-6">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(80,60,255,0.5), transparent 70%)" }} />
        <div className="relative h-full flex flex-col gap-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Pillar / cluster</div>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/80 w-3/4" />
            <div className="h-2 rounded-full bg-white/30 w-full" />
            <div className="h-2 rounded-full bg-white/30 w-5/6" />
            <div className="h-2 rounded-full bg-white/15 w-2/3" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            {["POV essay", "Comparison", "Deep dive", "Pillar"].map((t) => (
              <div key={t} className="rounded-lg border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden bg-[#0a0a0a] p-6">
      <div className="absolute inset-0 opacity-50" style={{
        background:
          "conic-gradient(from 200deg at 60% 50%, rgba(255,75,40,0.25), transparent 30%, rgba(80,60,255,0.25), transparent 70%)",
      }} />
      <div className="relative h-full flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">Authority graph</div>
        <svg viewBox="0 0 200 200" className="w-full h-full mt-4 opacity-85">
          <circle cx="100" cy="100" r="6" fill="white" />
          {[
            [40, 50], [160, 60], [50, 150], [150, 150], [100, 30], [100, 170], [30, 100], [170, 100],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="100" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.18)" />
              <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.85)" />
            </g>
          ))}
        </svg>
        <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
          Entity · Schema · Backlinks
        </div>
      </div>
    </div>
  );
}
