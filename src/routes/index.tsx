import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import TestimonialSection from "@/components/ui/testimonials";
import { useReveal } from "@/hooks/use-reveal";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  component: Index,
});

type BigStat = {
  prefix?: string;
  to: number;
  suffix?: string;
  label: string;
};

const bigStats: BigStat[] = [
  { to: 50, suffix: "+", label: "Projects shipped for funded teams" },
  { prefix: "$", to: 10, suffix: "M+", label: "Capital raised by founders we worked with" },
];

function useInView<T extends Element>(options?: IntersectionObserverInit) {
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
      { threshold: 0.25, ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, options]);
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

function BigStatValue({ stat, start }: { stat: BigStat; start: boolean }) {
  const n = useCountUp(stat.to, start);
  return (
    <>
      {stat.prefix ?? ""}
      {n}
      {stat.suffix ?? ""}
    </>
  );
}

const engagements = [
  {
    numeral: "I",
    name: "Sprint",
    time: "From 4 weeks",
    desc: "Fast start for brands that don't want to spend months on planning. We dive straight into execution, taking over your chosen channels from week one.",
    items: [
      {
        step: "01",
        label: "Setup",
        body: "Free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)",
      },
      {
        step: "02",
        label: "Run",
        body: "Weekly updates, monthly reports, on-demand analytics and recommendations",
      },
      {
        step: "03",
        label: "Handover",
        body: "Final deliverable with a clear roadmap and 100% asset & content ownership",
      },
    ],
    band: "From €18k",
    cta: "Scope a Sprint",
    href: "/contact",
  },
  {
    numeral: "II",
    name: "Marathon",
    time: "From 6 months",
    desc: "Strategy followed by execution. For brands launching from scratch, rebranding, or entering new markets. We build your positioning and run your marketing channels.",
    items: [
      {
        step: "01",
        label: "Strategy",
        body: "Deep-dive workshop, market analysis, brand positioning, and GTM planning",
      },
      {
        step: "02",
        label: "Execution",
        body: "Weekly strategy + creative cadence across your chosen channels",
      },
      {
        step: "03",
        label: "Reporting",
        body: "Pipeline-attributed reporting, monthly reviews, on-demand analytics",
      },
    ],
    band: "Retainer · scoped per quarter",
    cta: "Plan a Marathon",
    href: "/contact",
  },
];

const insightPosts = posts.slice(0, 3);
const featuredCases = [
  {
    key: "tequila-cpa",
    metric: "+35%",
    label: "Brand growth in 6 mo",
    sector: "CPA Network / Tequila CPA",
    desc: "We built Tequila CPA Network's brand from the ground up, grew their partner base, and hit all key launch targets.",
  },
  {
    key: "currency",
    metric: "+30 878",
    label: "New accounts created in in 6 mo",
    sector: "Cryptocurrency exchange, / Currency",
    desc: "We scaled user base across EMEA, Americas, and APAC through 270+ influencer videos across finance, tech, and economics channels.",
  },
];

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <AmbientBlobs />
      <SiteHeader variant="dark" />

      {/* HERO */}
      <section className="relative mx-auto min-h-[min(880px,calc(100svh-1.5rem))] max-w-[1440px] overflow-hidden px-6 pb-14 pt-20 md:px-12 md:pb-20 md:pt-28">

        <div className="relative z-10 flex min-h-[calc(min(880px,100svh-1.5rem)-9.5rem)] flex-col justify-end md:min-h-[calc(min(880px,100svh-1.5rem)-12rem)]">
          <div className="mx-auto flex w-full max-w-[980px] flex-col">
                  <p className="reveal mb-8 w-fit rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/65 md:ml-[43%]">
                    / R-M
            </p>
            <h1 className="reveal w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:text-[62px] lg:text-[70px]">
              <span className="block max-w-[11ch] text-balance md:ml-[4%]">Strategy and</span>
              <span className="block max-w-[13ch] text-balance md:ml-[23%]">execution for</span>
              <span className="block max-w-[14ch] text-balance md:ml-[10%]">founders raising</span>
              <span className="block max-w-[13ch] text-balance font-light text-white/48 md:ml-[36%]">
                in EU and MENA.
              </span>
            </h1>
            <p
              className="reveal mt-7 max-w-[34ch] text-balance text-[16px] font-medium leading-[1.08] tracking-[-0.025em] text-white/92 md:ml-[31%] md:text-[19px]"
              data-delay="2"
            >
              We create market environment where your product becomes the obvious choice.{" "}
              <span className="font-light text-white/45">
                In the last twelve months our clients raised $10M+, shipped 50 launches, and received
                industry awards.
              </span>
            </p>
          </div>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3 md:ml-[43%]"
            data-delay="3"
          >
            <Link
              to="/contact"
              className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-rm-accent hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >
              Start a project →
            </Link>
            <Link
              to="/cases"
              className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full border border-white/20 text-white hover:border-white hover:-translate-y-0.5 transition-all duration-300"
            >
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-12 md:py-16 border-t border-white/10">
        <div className="flex items-center gap-8 md:gap-12">
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-white/40 whitespace-nowrap shrink-0">
            Working with
            <br />
            founders at
          </span>
          <div
            className="marquee relative flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="marquee-track flex items-center gap-10 md:gap-14 w-max">
              {Array.from({ length: 2 }).flatMap((_, dup) =>
                [
                  "Empresex",
                  "TEQUILA",
                  "WHITEBIT",
                  "CAPITAL.COM",
                  "CURRENCY",
                  "POCKET SPACE",
                  "UNIT CITY",
                  "1inch",
                ].map((b) => (
                  <span
                    key={`${dup}-${b}`}
                    aria-hidden={dup === 1}
                    className="text-[14px] md:text-[16px] font-medium text-white/45 hover:text-white whitespace-nowrap tracking-tight transition-colors"
                  >
                    {b}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsStrip />

      {/* STUDIO — tight container, generous side padding, aligned grid */}
      <section
        id="about"
        className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          {/* Chapter rule */}
          <div className="reveal flex items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-white/60">
            <span className="text-white">The studio</span>
            <span aria-hidden className="h-px flex-1 bg-white/15" />
            <span className="hidden whitespace-nowrap md:inline">Berlin → Dubai · Est. 2017</span>
          </div>

          {/* Ladder headline — contained, percent-based cascade */}
          <h2
            className="reveal mt-14 font-medium leading-[0.92] tracking-[-0.04em] text-white md:mt-20"
            style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
          >
            <span className="block">We don't</span>
            <span className="block pl-[12%] font-light text-white/55">bring ideas.</span>
            <span className="block pl-[4%]">We come</span>
            <span className="block pl-[20%] font-light text-white/55">
              with a <em className="italic font-medium text-white">plan.</em>
            </span>
          </h2>

          {/* Body + meta — aligned 7/5 grid, no gap column */}
          <div className="mt-16 grid grid-cols-12 gap-x-10 gap-y-12 md:mt-24">
            <div className="reveal col-span-12 md:col-span-7" data-delay="1">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Manifesto</p>
              <p className="mt-6 max-w-[58ch] text-[18px] font-medium leading-[1.5] tracking-[-0.015em] text-white">
                A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming
                inside out.
              </p>
              <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.65] tracking-[-0.01em] text-white/60">
                10 practitioners to make your product seen, trusted, and bought. No corporate
                layers. Clear deliverables only. Decisions in hours, not weeks. Output you can ship
                the same day.
              </p>
            </div>

            <dl className="reveal col-span-12 md:col-span-5" data-delay="2">
              {[
                { k: "Sectors", v: "Fintech · AI SaaS · Cybersecurity · iGaming" },
                { k: "Markets", v: "EU · UK · MENA · GCC" },
                { k: "Products", v: "Sprint · Marathon" },
                { k: "Reporting", v: "Pipeline & revenue, weekly" },
              ].map((item, i) => (
                <div
                  key={item.k}
                  className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/15 py-4 last:border-b"
                  data-delay={String(i + 1)}
                >
                  <dt className="w-24 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {item.k}
                  </dt>
                  <dd className="text-[15px] leading-[1.4] tracking-[-0.01em] text-white">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* ENGAGE — matches About container/rhythm, monochrome */}
      <section
        id="engage"
        className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          {/* Chapter rule */}
          <div className="reveal flex items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-white/60">
            <span className="text-white">How we work</span>
            <span aria-hidden className="h-px flex-1 bg-white/15" />
            <span className="hidden whitespace-nowrap md:inline">Sprint or Marathon</span>
          </div>

          {/* Headline — same scale as About */}
          <h2
            className="reveal mt-14 max-w-[18ch] font-medium leading-[0.95] tracking-[-0.04em] text-white md:mt-20"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Two ways to work with us.{" "}
            <span className="text-white/55">
              Both end in <em className="italic font-medium text-white">shipped revenue.</em>
            </span>
          </h2>

          {/* Two cards split by vertical rule */}
          <div className="mt-16 grid grid-cols-1 gap-y-12 md:mt-24 md:grid-cols-2 md:gap-x-16 md:divide-x md:divide-white/15">
            {engagements.map((e, i) => (
              <div
                key={e.name}
                className={`reveal flex flex-col gap-9 ${i === 1 ? "md:pl-16" : ""}`}
                data-delay={String(i + 1)}
              >
                {/* Header — monochrome numeral + name + time */}
                <header className="flex items-baseline gap-5">
                  <span className="text-[56px] font-light leading-none tracking-[-0.04em] text-white/30 md:text-[72px]">
                    {e.numeral}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-[28px] font-medium leading-none tracking-[-0.02em] text-white md:text-[36px]">
                      {e.name}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                      {e.time}
                    </span>
                  </div>
                </header>

                {/* Description — constrained reading width */}
                <p className="max-w-[44ch] text-[16px] leading-[1.55] tracking-[-0.01em] text-white/65 md:text-[17px]">
                  {e.desc}
                </p>

                {/* Items — step / label / body grid */}
                <ul>
                  {e.items.map((it) => (
                    <li
                      key={it.step}
                      className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-white/15 py-4 last:border-b sm:grid-cols-[2rem_5rem_1fr]"
                    >
                      <span className="text-[11px] uppercase tracking-[0.24em] text-white/40 sm:self-baseline">
                        {it.step}
                      </span>
                      <span className="col-start-2 text-[11px] uppercase tracking-[0.24em] text-white/60 sm:col-start-2 sm:self-baseline">
                        {it.label}
                      </span>
                      <span className="col-span-2 text-[14px] leading-[1.45] tracking-[-0.01em] text-white sm:col-span-1 sm:col-start-3 md:text-[15px]">
                        {it.body}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer — band + CTA, no color */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {e.band}
                  </span>
                  <Link
                    to="/contact"
                    className="rm-touch inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-black transition-colors hover:bg-white/85"
                  >
                    {e.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES — editorial table-of-contents, metric IS the visual */}
      <section
        id="cases"
        className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          {/* Chapter rule */}
          <div className="reveal flex items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-white/60">
            <span className="text-white">Selected work</span>
            <span aria-hidden className="h-px flex-1 bg-white/15" />
            <Link to="/cases" className="hidden whitespace-nowrap text-white/60 hover:text-white md:inline">
              View all cases →
            </Link>
          </div>

          {/* Headline — italic accent */}
          <h2
            className="reveal mt-14 max-w-[14ch] font-medium leading-[0.95] tracking-[-0.04em] text-white md:mt-20"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Results we{" "}
            <span className="font-light text-white/55">
              <em className="italic font-medium text-white">deliver.</em>
            </span>
          </h2>

          {/* Case index — magazine spread per row */}
          <ul className="mt-16 md:mt-24">
            {featuredCases.map((c, i) => {
              const [industry, client] = c.sector.split("/").map((s) => s.trim());
              return (
                <li key={c.key} className="reveal border-t border-white/15 last:border-b" data-delay={String(i + 1)}>
                  <Link
                    to="/cases"
                    className="group block py-10 transition-colors duration-300 hover:bg-white/[0.025] md:py-16"
                  >
                    {/* Per-case rule — index, label, divider, industry */}
                    <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-white/55">
                      <span aria-hidden className="h-px w-8 bg-white/30 transition-[width] duration-500 group-hover:w-16" />
                      <span className="font-medium tabular-nums text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/70">Case study</span>
                      <span aria-hidden className="h-px flex-1 bg-white/15" />
                      <span className="hidden whitespace-nowrap md:inline">{industry}</span>
                    </div>

                    {/* Main row — metric anchor + client/desc/CTA */}
                    <div className="mt-10 grid grid-cols-12 items-start gap-x-6 gap-y-8 md:mt-14 md:gap-x-10">
                      {/* Metric — dominant visual */}
                      <div className="col-span-12 flex flex-col md:col-span-7">
                        <span
                          className="whitespace-nowrap font-medium leading-[0.85] tracking-[-0.045em] tabular-nums text-white"
                          style={{ fontSize: "clamp(64px, 10vw, 144px)" }}
                        >
                          {c.metric}
                        </span>
                        <span className="mt-4 text-[11px] uppercase tracking-[0.24em] text-white/60">
                          {c.label}
                        </span>
                      </div>

                      {/* Client + body + CTA circle */}
                      <div className="col-span-12 flex flex-col gap-6 md:col-span-5 md:pt-2">
                        <h3 className="text-[26px] font-medium leading-[1.1] tracking-[-0.025em] text-white md:text-[32px]">
                          {client}
                        </h3>
                        <p className="max-w-[46ch] text-[15px] leading-[1.6] tracking-[-0.01em] text-white/65 md:text-[16px]">
                          {c.desc}
                        </p>

                        <div className="mt-2 flex items-center gap-5">
                          <span
                            aria-hidden
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-[18px] text-white transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black"
                          >
                            →
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.24em] text-white/60 transition-colors group-hover:text-white">
                            Read case
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile fallback link */}
          <div className="reveal mt-12 md:hidden" data-delay="3">
            <Link to="/cases" className="text-[12px] uppercase tracking-[0.24em] text-white/60 hover:text-white">
              View all cases →
            </Link>
          </div>
        </div>
      </section>

      {/* JOURNAL — matches About/Engage/Cases system */}
      <section
        id="insights"
        className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          {/* Headline — italic accent on last word */}
          <h2
            className="reveal max-w-[24ch] font-medium leading-[1.05] tracking-[-0.03em] text-white md:pr-40"
            style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
          >
            <span className="font-light text-white/55">This quarter we are writing on </span>
            positioning under pressure, pricing in regulated markets, and why agency reporting{" "}
            <span className="font-light text-white/55">is </span>
            <em className="italic font-medium text-white">theater.</em>
          </h2>
          <div className="reveal mt-8 flex justify-end">
            <Link to="/blog" className="text-[12px] uppercase tracking-[0.24em] text-white/60 hover:text-white">
              All articles →
            </Link>
          </div>

          {/* Featured + secondary — varied emphasis, magazine spread */}
          <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16 md:gap-x-10">
            {/* Featured — lead story, cols 1-7 */}
            {insightPosts[0] && (
              <article className="reveal col-span-12 md:col-span-7">
                <Link
                  to="/blog/$slug"
                  params={{ slug: insightPosts[0].slug }}
                  aria-label={`Read article: ${insightPosts[0].title}`}
                  className="group block"
                >
                  <figure className="relative aspect-[4/3] overflow-hidden transition-colors duration-500">
                    <img
                      src={insightPosts[0].image}
                      alt=""
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.28em] text-white/70">
                      ── 01 · Lead story
                    </span>
                  </figure>

                  <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/55">
                    <span>{insightPosts[0].category}</span>
                    <span aria-hidden>/</span>
                    <time dateTime={insightPosts[0].dateISO}>{insightPosts[0].date}</time>
                    <span aria-hidden>/</span>
                    <span>{insightPosts[0].read}</span>
                  </div>

                  <h3
                    className="mt-5 max-w-[20ch] font-medium leading-[1.05] tracking-[-0.025em] text-white"
                    style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
                  >
                    {insightPosts[0].title}
                  </h3>

                  <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/60 transition-colors group-hover:text-white">
                    Read article
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </article>
            )}

            {/* Secondary — cols 8-12, stacked compact rows */}
            <div className="col-span-12 flex flex-col divide-y divide-white/15 md:col-span-5">
              {insightPosts.slice(1).map((p, idx) => {
                const index = idx + 2; // 02, 03
                return (
                  <article
                    key={p.slug}
                    className="reveal"
                    data-delay={String(index)}
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`Read article: ${p.title}`}
                      className="group grid grid-cols-12 gap-x-4 py-7 transition-colors duration-300 hover:bg-white/[0.025] md:py-9"
                    >
                      {/* Ghost numeral */}
                      <span
                        aria-hidden
                        className="col-span-2 font-light leading-none tracking-[-0.04em] text-white/15 transition-colors duration-500 group-hover:text-white/40"
                        style={{ fontSize: "clamp(28px, 2.4vw, 40px)" }}
                      >
                        {String(index).padStart(2, "0")}
                      </span>

                      {/* Title + meta */}
                      <div className="col-span-10 flex flex-col gap-3">
                        <h3 className="text-[17px] font-medium leading-[1.25] tracking-[-0.015em] text-white md:text-[19px]">
                          {p.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] uppercase tracking-[0.24em] text-white/50">
                          <span>{p.category}</span>
                          <span aria-hidden>/</span>
                          <time dateTime={p.dateISO}>{p.date}</time>
                          <span aria-hidden>/</span>
                          <span>{p.read}</span>
                        </div>
                        <span className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/40 transition-colors group-hover:text-white">
                          Read
                          <span
                            aria-hidden
                            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mobile fallback link */}
          <div className="reveal mt-12 md:hidden">
            <Link to="/blog" className="text-[12px] uppercase tracking-[0.24em] text-white/60 hover:text-white">
              All articles →
            </Link>
          </div>
        </div>
      </section>

      {/* UNIFIED CTA */}
      <UnifiedCTA
        eyebrow="Start the brief"
        title="New launch, a raise,"
        titleAccent="or marketing that doesn't perform."
      />

      <SiteFooter />
    </div>
  );
}

function StatsStrip() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-label="Key indicators"
      className="px-6 md:px-12 max-w-[1440px] mx-auto pt-20 md:pt-28 pb-20 md:pb-28 border-t border-white/10"
    >
      <div className="grid grid-cols-2 gap-x-6 md:gap-x-16 gap-y-12">
        {bigStats.map((s, i) => (
          <div key={s.label} className="reveal" data-delay={String(i + 1)}>
            <div
              className="font-medium text-white tracking-[-0.04em] leading-[0.92]"
              style={{ fontSize: "clamp(56px, 11vw, 160px)" }}
            >
              <BigStatValue stat={s} start={inView} />
            </div>
            <p className="mt-4 md:mt-6 text-[14px] md:text-[16px] text-white/55 leading-snug max-w-[24ch]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
