import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { HeroWebGL } from "@/components/hero-webgl";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { cases as caseStudies } from "@/lib/cases";
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
  { to: 40, suffix: "+", label: "Projects shipped for funded teams" },
  { prefix: "$", to: 120, suffix: "M+", label: "Capital raised by founders we worked with" },
];

// Real attributed quotes pulled from case studies — no anonymous filler.
const testimonials = caseStudies.slice(0, 3).map((c) => ({
  quote: c.quote.text,
  who: c.quote.who,
  role: c.quote.role,
  client: c.client,
}));

const featureQuote = testimonials[0];

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
    time: "2–4 weeks",
    desc: "Four weeks, fixed price. We rewrite the positioning, ship the funnel, and hand you a launch your team can run alone.",
    items: [
      "Positioning + messaging architecture",
      "Landing or funnel design + build",
      "Launch assets and handover",
    ],
    band: "From €18k",
    cta: "Scope a Sprint",
    href: "/contact",
  },
  {
    numeral: "II",
    name: "Marathon",
    time: "6+ months",
    desc: "An embedded team for 6+ months. Strategy, creative and paid run on one weekly cadence, reported in pipeline — never impressions.",
    items: [
      "Weekly strategy + creative cadence",
      "Performance + organic growth systems",
      "Pipeline-attributed reporting",
    ],
    band: "Retainer · scoped per quarter",
    cta: "Plan a Marathon",
    href: "/contact",
  },
];

const insightPosts = posts.slice(0, 3);
const featuredCases = caseStudies.slice(0, 2).map((c) => ({
  slug: c.slug,
  metric: c.primaryMetric.value,
  label: c.primaryMetric.label,
  sector: `${c.niche} / ${c.client}`,
  desc: c.preview,
}));

function Index() {
  useReveal();
  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      {/* HERO */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-20 md:pt-28 pb-16 md:pb-24 min-h-[62vh] md:min-h-[78vh] flex flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(50% 60% at 22% 28%, rgba(232,93,58,0.20), transparent 70%), radial-gradient(45% 55% at 78% 68%, rgba(124,92,255,0.18), transparent 70%)",
          }}
        />
        <HeroWebGL />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <p className="reveal text-[11px] uppercase tracking-[0.25em] text-white/50 mb-10">
          R-M Studio · Berlin → Dubai
        </p>
        <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
          Strategy and execution for founders{" "}
          <span className="font-light text-white/70">raising in EU and MENA.</span>
        </h1>
        <p
          className="reveal mt-8 max-w-[640px] text-[16px] md:text-[18px] leading-relaxed text-white/80"
          data-delay="2"
        >
          Positioning, growth and performance under one weekly cadence. In the last twelve months
          our clients raised $120M+, shipped 40 launches, and had two acquired.
        </p>

        <div className="reveal mt-12 flex flex-wrap items-center gap-3" data-delay="3">
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
                  "Nebula AI",
                  "Orbital Pay",
                  "Ridgeline Security",
                  "Highline Gaming",
                  "Veraty",
                  "Advance VC",
                  "Earlywork",
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

      {/* STUDIO — kept editorial: eyebrow + h2 (anchor #1) */}
      <section
        id="about"
        className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">The studio</p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Built for teams
              <br />
              <span className="font-light text-white/60">that ship every week.</span>
            </h2>
            <p className="mt-10 text-[15px] text-white/75 leading-relaxed max-w-md">
              Eight operators. No account managers, no junior layer. We have built and sold
              companies in fintech, AI and regulated markets — the same lanes you are in now. We
              work in your standup, on your roadmap, against your numbers.
            </p>
            <p className="mt-4 text-[15px] text-white/60 leading-relaxed max-w-md">
              Decisions in hours, not weeks. Output you can ship the same day.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <dl className="grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-10 md:gap-y-14">
              {[
                ["Sectors", "Fintech · AI SaaS · Cybersecurity · iGaming"],
                ["Markets", "EU · UK · MENA · GCC"],
                ["Engagement", "Sprint (4 weeks) or Marathon (6+ months)"],
                ["Reporting", "Pipeline and revenue, weekly"],
              ].map(([k, v]) => (
                <div key={k} className="reveal">
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-3">
                    {k}
                  </dt>
                  <dd className="text-[16px] md:text-[18px] text-white/85 leading-snug tracking-[-0.01em]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — open with one oversize pulled quote, supporting two below */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <figure className="max-w-[1100px] reveal">
          <blockquote className="text-[32px] sm:text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.025em] font-light text-white/95">
            <span className="text-rm-accent">“</span>
            {featureQuote.quote}
            <span className="text-rm-accent">”</span>
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.2em] text-white/45">
            <span className="text-white/80">{featureQuote.who}</span>
            <span>·</span>
            <span>{featureQuote.role}</span>
            <span>·</span>
            <span className="text-white/65">{featureQuote.client}</span>
          </figcaption>
        </figure>

        <ul className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {testimonials.slice(1).map((t, i) => (
            <li key={t.who + i} className="reveal" data-delay={String(i + 1)}>
              <p className="text-[18px] md:text-[20px] leading-[1.45] tracking-[-0.01em] text-white/80 font-light">
                {t.quote}
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-white/40">
                <span className="text-white/70">{t.who}</span> · {t.role} · {t.client}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ENGAGE — numbered chapters, horizontal split with vertical rule. No card chrome. */}
      <section id="engage" className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-32">
          <h2 className="text-[40px] md:text-[64px] leading-[0.98] tracking-[-0.03em] font-medium max-w-[20ch] reveal">
            Two ways to work with us. Both end in shipped revenue.
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-20 md:mt-28 pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-2 md:divide-x divide-white/10">
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
                    className="text-[14px] md:text-[15px] text-white/85 py-4 border-t border-white/10 last:border-b flex gap-4"
                  >
                    <span className="text-rm-accent shrink-0">—</span>
                    <span>{it}</span>
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
        className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10"
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
              key={c.slug}
              to="/cases/$slug"
              params={{ slug: c.slug }}
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
                        ? "radial-gradient(circle at 30% 40%, #e85d3a66, transparent 60%), radial-gradient(circle at 70% 70%, #4a6b8a55, transparent 60%)"
                        : "radial-gradient(circle at 70% 30%, #c9a84c66, transparent 60%), radial-gradient(circle at 30% 70%, #5a8a5c55, transparent 60%)",
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
        className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10"
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
        eyebrow="Tell us what's stuck"
        title="Bring us a launch, a raise,"
        titleAccent="or a stalled funnel."
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
      className="px-6 md:px-12 max-w-[1440px] mx-auto pt-20 md:pt-28 pb-20 md:pb-28"
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
