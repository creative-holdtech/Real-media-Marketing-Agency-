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
      "01 — SETUP: free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)",
      "02 — RUN: weekly updates, monthly reports, on-demand analytics and recommendations",
      "03 — HANDOVER: final deliverable with a clear roadmap and 100% asset & content ownership",
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
      "01 — STRATEGY: deep-dive workshop, market analysis, brand positioning, and GTM planning",
      "02 — EXECUTION: weekly strategy + creative cadence across your chosen channels",
      "03 — REPORTING: pipeline-attributed reporting, monthly reviews, on-demand analytics",
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(82% 88% at 45% 58%, rgba(127,31,29,0.2) 0%, rgba(24,18,18,0.08) 38%, transparent 70%), linear-gradient(180deg, rgba(20,18,18,0.4) 0%, rgba(7,7,7,0.94) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[54%]"
          style={{
            background:
              "radial-gradient(68% 88% at 57% 28%, rgba(205,188,174,0.05) 0%, rgba(18,17,18,0.12) 45%, rgba(0,0,0,0.42) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.2] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="relative z-10 flex min-h-[calc(min(880px,100svh-1.5rem)-9.5rem)] flex-col justify-end md:min-h-[calc(min(880px,100svh-1.5rem)-12rem)]">
          <div className="mx-auto flex w-full max-w-[980px] flex-col">
            <p className="reveal mb-8 w-fit rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/65 md:ml-[43%]">
              / R-M marketing agency
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

      {/* STUDIO */}
      <section
        id="about"
        className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 border-t border-white/10"
      >
        <div className="relative grid grid-cols-12 gap-x-6 gap-y-12 md:min-h-[620px] md:gap-x-12">
          <div className="reveal col-span-12 md:col-span-8">
            <p className="mb-8 w-fit rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/45 md:ml-[9%]">
              Marketing agency
            </p>
            <h2 className="text-[40px] font-medium leading-[0.93] tracking-[-0.045em] text-white sm:text-[52px] md:text-[68px] lg:text-[78px]">
              <span className="block max-w-[9ch]">We don't</span>
              <span className="block max-w-[10ch] md:ml-[18%]">bring ideas.</span>
              <span className="block max-w-[11ch] font-light text-white/48 md:ml-[7%]">
                We come
              </span>
              <span className="block max-w-[10ch] font-light text-white/48 md:ml-[31%]">
                with a plan.
              </span>
            </h2>
          </div>

          <div className="reveal col-span-12 md:absolute md:left-[39%] md:top-[58%] md:w-[34ch]" data-delay="1">
            <p className="text-[16px] font-medium leading-[1.1] tracking-[-0.025em] text-white/88 md:text-[19px]">
              A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming inside
              out.{" "}
              <span className="font-light text-white/48">
                10 practitioners to make your product seen, trusted, and bought. No corporate layers.
                Clear deliverables only.
              </span>
            </p>
            <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.35] tracking-[-0.01em] text-white/38">
              Decisions in hours. Output you can ship the same day.
            </p>
          </div>

          <dl className="reveal col-span-12 grid gap-x-6 gap-y-8 border-t border-white/10 pt-6 sm:grid-cols-2 md:absolute md:right-0 md:top-[8%] md:w-[38%] md:border-t-0 md:pt-0">
            {[
              {
                key: "Sectors",
                value: "Fintech · AI SaaS · Cybersecurity · iGaming",
              },
              {
                key: "Markets",
                value: "EU · UK · MENA · GCC",
              },
              {
                key: "Our products",
                value: "Sprint · Marathon",
              },
              {
                key: "Reporting",
                value: "Pipeline and revenue, weekly",
              },
            ].map((item, i) => (
              <div key={item.key} className="border-t border-white/10 pt-5" data-delay={String(i + 1)}>
                <dt className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/34">
                  {item.key}
                </dt>
                <dd className="text-[17px] leading-[1.06] tracking-[-0.02em] text-white/84 md:text-[20px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TestimonialSection />

      {/* ENGAGE — numbered chapters, horizontal split with vertical rule. No card chrome. */}
      <section id="engage" className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24">
          <h2 className="text-[40px] md:text-[64px] leading-[0.98] tracking-[-0.03em] font-medium max-w-[20ch] reveal">
            Two ways to work with us. Both end in shipped revenue.
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-20 pb-24 grid grid-cols-1 md:grid-cols-2 md:divide-x divide-white/10">
          {engagements.map((e, i) => (
            <div
              key={e.name}
              className={`reveal flex flex-col gap-8 ${i === 0 ? "pb-12 md:pb-0 md:pr-12 border-b md:border-b-0 border-white/10" : "pt-12 md:pt-0 md:pl-12"}`}
              data-delay={String(i + 1)}
            >
              <div className="flex items-baseline gap-5">
                <span className="text-[64px] md:text-[88px] leading-none font-light text-rm-accent tracking-[-0.035em]">
                  {e.numeral}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em] leading-none">
                    {e.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {e.time}
                  </span>
                </div>
              </div>

              <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed max-w-[44ch]">
                {e.desc}
              </p>

              <ul className="flex flex-col">
                {e.items.map((it) => (
                  <li
                    key={it}
                    className="text-[14px] md:text-[15px] text-white/85 py-4 border-t border-white/10 last:border-b"
                  >
                    {it}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-[12px] uppercase tracking-[0.2em] text-white/45">
                  {e.band}
                </span>
                <Link
                  to="/contact"
                  className="inline-flex rm-touch items-center text-[12px] uppercase tracking-[0.22em] px-5 py-3 rounded-full bg-white text-black font-medium hover:bg-rm-accent hover:text-white transition-colors"
                >
                  {e.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASES — kept editorial: eyebrow + h2 (anchor #2) */}
      <section
        id="cases"
        className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 border-t border-white/10"
      >
        <div className="flex items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
              Selected case studies
            </p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Results we
              <br />
              <span className="font-light text-white/60">deliver.</span>
            </h2>
          </div>
          <Link
            to="/cases"
            className="hidden md:inline-block text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Cases →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredCases.map((c, i) => (
            <Link
              key={c.key}
              to="/cases"
              className="group relative flex flex-col rm-card overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-500 reveal"
              data-delay={String(i + 1)}
            >
              <figure className="relative aspect-[4/3] overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.01]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{
                    background:
                      i === 0
                        ? "radial-gradient(circle at 30% 40%, #8a1a1a55, transparent 60%), radial-gradient(circle at 70% 70%, #3a586a55, transparent 60%)"
                        : "radial-gradient(circle at 70% 30%, #6a6a6a44, transparent 60%), radial-gradient(circle at 30% 70%, #4a7a5055, transparent 60%)",
                  }}
                />
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-rm-surface/70 backdrop-blur-md border border-white/15 text-white/80">
                  {c.sector}
                </span>
                <div className="absolute bottom-5 left-5 right-5 flex items-baseline justify-between gap-4">
                  <div className="text-[56px] md:text-[80px] font-medium tracking-[-0.04em] leading-none text-white">
                    {c.metric}
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/80 text-right max-w-[40%]">
                    {c.label}
                  </div>
                </div>
              </figure>
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <p className="text-[15px] text-white/75 leading-relaxed">{c.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[12px] text-white/60 group-hover:text-white transition-colors">
                    {c.sector}
                  </span>
                  <span className="inline-flex rm-touch items-center text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white text-black font-medium group-hover:bg-rm-accent group-hover:text-white transition-colors">
                    Read Case →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            to="/cases"
            className="text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Cases →
          </Link>
        </div>
      </section>

      {/* JOURNAL — sentence-into-layout, 3-row list, no card chrome */}
      <section
        id="insights"
        className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 border-t border-white/10"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-20">
          <h2 className="col-span-12 md:col-span-9 text-[28px] md:text-[44px] leading-[1.15] tracking-[-0.02em] font-light text-white/80 reveal">
            This quarter we are writing on
            <span className="text-white font-medium">
              {" "}
              positioning under pressure, pricing in regulated markets, and why agency reporting is
              theater.
            </span>
          </h2>
          <div className="col-span-12 md:col-span-3 md:text-right md:self-end">
            <Link
              to="/blog"
              className="text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
            >
              All articles →
            </Link>
          </div>
        </div>

        <ul role="list" className="divide-y divide-white/10 border-y border-white/10">
          {insightPosts.map((p, i) => (
            <li key={p.slug} className="reveal" data-delay={String(i + 1)}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                aria-label={`Read article: ${p.title}`}
                className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-6 md:py-8 hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-sm"
              >
                <div className="col-span-2 md:col-span-1 text-[11px] uppercase tracking-[0.22em] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-7 md:col-span-7 flex flex-col gap-2">
                  <h3 className="text-[18px] md:text-[24px] leading-[1.2] tracking-[-0.015em] font-medium text-white/90 group-hover:text-rm-accent transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
                    <span>{p.category}</span>
                    <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                    <time dateTime={p.dateISO}>{p.date}</time>
                    <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{p.read}</span>
                  </div>
                </div>
                <figure className="col-span-3 md:col-span-4 aspect-[16/10] rm-media-card">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width={640}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* UNIFIED CTA */}
      <UnifiedCTA
        eyebrow="Tell us what needs fixing"
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
