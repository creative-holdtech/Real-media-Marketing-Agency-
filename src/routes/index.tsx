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
  { to: 40, suffix: "+", label: "Projects delivered" },
  { prefix: "$", to: 120, suffix: "M+", label: "Capital secured by founder teams" },
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

const metrics = [
  ["40+", "Launched projects"],
  ["04", "Industries mastered"],
  ["EU·MENA", "Active markets"],
  ["High-risk", "Niche expertise"],
  ["Long-term", "Growth focus"],
];

const testimonials = [
  {
    quote:
      "R-M helped us rebuild the way we communicate our value. The clarity alone changed how clients perceived our brand.",
    who: "Founder",
    company: "Fintech Company",
  },
  {
    quote:
      "Their process feels less like outsourcing and more like having an internal strategic team.",
    who: "COO",
    company: "Performance Agency",
  },
  {
    quote:
      "They move fast, stay structured, and understand difficult markets better than most agencies we worked with.",
    who: "Head of Growth",
    company: "iGaming Brand",
  },
];

const cases = caseStudies.slice(0, 2).map((c) => ({
  slug: c.slug,
  metric: c.primaryMetric.value,
  label: c.primaryMetric.label,
  sector: `${c.niche} / ${c.client}`,
  desc: c.preview,
}));

const insightPosts = posts.slice(0, 3);

function Index() {
  useReveal();
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      <SiteHeader variant="dark" />

      {/* HERO — editorial, matches /cases */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-20 md:pt-28 pb-20 md:pb-24 min-h-[78vh] flex flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(50% 60% at 22% 28%, rgba(232,93,58,0.20), transparent 70%), radial-gradient(45% 55% at 78% 68%, rgba(124,92,255,0.18), transparent 70%)",
          }}
        />
        {/* WebGL flow-field sits behind text */}
        <HeroWebGL />
        {/* Subtle film grain */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <p className="reveal text-[11px] uppercase tracking-[0.25em] text-white/50 mb-10">
          Studio · EU → MENA
        </p>
        <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
          Marketing systems that{" "}
          <span className="italic font-light text-white/70">feel inevitable.</span>
        </h1>
        <p
          className="reveal mt-8 max-w-[640px] text-[15px] md:text-[17px] leading-relaxed text-white/65"
          data-delay="2"
        >
          Strategy, positioning and execution under one team. Trusted by 40+
          founders building category leaders across the EU and MENA.
        </p>

        <div
          className="reveal mt-12 flex flex-wrap items-center gap-3"
          data-delay="3"
        >
          <a
            href="#contact"
            className="text-[13px] px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white hover:-translate-y-0.5 transition-all duration-300"
          >
            Start a project →
          </a>
          <Link
            to="/cases"
            className="text-[13px] px-6 py-3 rounded-full border border-white/20 text-white hover:border-white hover:-translate-y-0.5 transition-all duration-300"
          >
            View case studies
          </Link>
        </div>
      </section>

      {/* TRUSTED BY — quiet editorial strip */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-12 md:py-16 border-t border-white/10">
        <div className="flex items-center gap-8 md:gap-12">
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-white/40 whitespace-nowrap shrink-0">
            Trusted by<br />visionaries
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
                ["supercharge", "firmable", "ElitaGenetics", "andromeda", "veraty", "WORKYARD", "earlywork.", "advance vc"].map((b) => (
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

      {/* Facts — Swiss-style indicators */}
      <StatsStrip />


      {/* METRICS + ABOUT */}
      <section id="about" className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
              The studio
            </p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              A studio for brands<br />
              <span className="italic font-light text-white/60">
                that take risks.
              </span>
            </h2>
            <p className="mt-10 text-[15px] text-white/60 leading-relaxed max-w-md">
              R-M works with ambitious brands operating in competitive
              industries. We combine strategy, positioning, and execution into
              systems designed for long-term growth — not temporary spikes.
            </p>
            <p className="mt-4 text-[15px] text-white/60 leading-relaxed max-w-md">
              Fast decisions, clear structure, and deep industry understanding
              shape every project we take on.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {metrics.map(([big, label], i) => (
                <li
                  key={label}
                  className="grid grid-cols-12 items-baseline py-7 group hover:bg-white/[0.02] transition-colors reveal"
                  data-delay={String(Math.min(i + 1, 5))}
                >
                  <span className="col-span-7 text-3xl md:text-5xl font-medium tracking-[-0.02em] group-hover:text-[#e85d3a] transition-colors">
                    {big}
                  </span>
                  <span className="col-span-5 text-[13px] uppercase tracking-[0.2em] text-white/50 text-right">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-16">
          Voices from the field
        </p>
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {testimonials.map((t, i) => (
            <figure
              key={t.who + i}
              className="col-span-12 md:col-span-4 border-t border-white/15 pt-8 reveal flex flex-col gap-8"
              data-delay={String(i + 1)}
            >
              <blockquote className="text-[20px] md:text-[22px] leading-[1.35] tracking-[-0.01em] font-light text-white/90">
                <span className="text-[#e85d3a] mr-1">“</span>
                {t.quote}
                <span className="text-[#e85d3a] ml-1">”</span>
              </blockquote>
              <figcaption className="mt-auto text-[12px] uppercase tracking-[0.18em] text-white/40">
                {t.who} — <span className="text-white/70">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            How we engage
          </p>
          <h2 className="text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.02em] font-medium max-w-[18ch]">
            Choose the level of support{" "}
            <span className="italic font-light text-white/60">you need right now.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            {
              name: "Sprint",
              tag: "Fast Execution",
              desc: "Fast execution for brands that need clarity, positioning, and launch-ready assets quickly.",
              items: [
                "Strategic positioning",
                "Landing page / funnel design",
                "Messaging structure",
                "Launch-ready delivery",
              ],
              time: "2–4 weeks",
              gradient:
                "radial-gradient(circle at 30% 20%, #e85d3a55, transparent 55%), radial-gradient(circle at 80% 80%, #4a6b8a44, transparent 60%)",
            },
            {
              name: "Marathon",
              tag: "Long-Term Partnership",
              desc: "Long-term strategic partnership focused on scaling, optimization, and sustainable growth.",
              items: [
                "Ongoing strategy support",
                "Growth systems & optimization",
                "Creative & marketing execution",
                "Continuous performance improvements",
              ],
              time: "Ongoing partnership",
              gradient:
                "radial-gradient(circle at 75% 25%, #c9a84c55, transparent 55%), radial-gradient(circle at 20% 85%, #5a8a5c55, transparent 60%)",
            },
          ].map((p, i) => (
            <article
              key={p.name}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#111] p-8 md:p-10 overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-500 reveal"
              data-delay={String(i + 1)}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none transition-opacity duration-700 group-hover:opacity-90"
                style={{ background: p.gradient }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/60"
              />
              <div className="relative flex items-start justify-between gap-4 mb-8">
                <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/85">
                  {p.tag}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/70">
                  {p.time}
                </span>
              </div>
              <h3 className="relative text-[40px] md:text-[56px] font-medium tracking-[-0.03em] leading-none mb-6 text-white">
                {p.name}
              </h3>
              <p className="relative text-[14px] text-white/70 leading-relaxed max-w-md mb-8">
                {p.desc}
              </p>
              <ul className="relative space-y-3 mb-10">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="text-[14px] text-white/85 flex gap-3 border-b border-white/10 pb-3"
                  >
                    <span className="text-[#e85d3a]">—</span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-[12px] text-white/60 group-hover:text-white transition-colors">
                  Learn more
                </span>
                <Link
                  to="/audit"
                  className="text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors"
                >
                  Get Started →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
              Selected case studies
            </p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Results we<br />
              <span className="italic font-light text-white/60">deliver.</span>
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
          {cases.map((c, i) => (
            <Link
              key={c.slug}
              to="/cases/$slug"
              params={{ slug: c.slug }}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-500 reveal"
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
                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80">
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
                <span
                  aria-hidden
                  className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white text-black font-medium"
                >
                  Read →
                </span>
              </figure>
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <p className="text-[15px] text-white/75 leading-relaxed">
                  {c.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[12px] text-white/60 group-hover:text-white transition-colors">
                    {c.sector}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white text-black font-medium group-hover:bg-[#e85d3a] group-hover:text-white transition-colors">
                    Read Case →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section id="insights" className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            From the Journal
          </p>
          <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
            From our<br />
            <span className="italic font-light text-white/60">insights.</span>
          </h2>
        </div>

        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {insightPosts.map((p, i) => (
            <li key={p.slug} className="reveal" data-delay={String(i + 1)}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                aria-label={`Read article: ${p.title}`}
                className="group h-full flex flex-col rounded-3xl focus-visible:outline-none"
              >
                <article className="h-full flex flex-col">
                  <figure className="aspect-[4/3] relative overflow-hidden border border-white/10 bg-[#111] mb-6 rounded-3xl">
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70">
                      {p.read}
                    </span>
                    <span
                      aria-hidden
                      className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white text-black font-medium"
                    >
                      Read →
                    </span>
                  </figure>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
                      <time dateTime={p.dateISO}>{p.date}</time>
                      <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{p.category}</span>
                    </div>
                    <h3 className="text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] font-medium text-white/90 group-hover:text-white transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] text-white/55 leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            to="/blog"
            className="text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Articles →
          </Link>
        </div>
      </section>

      {/* UNIFIED CTA */}
      <UnifiedCTA
        eyebrow="The conversation starts here"
        title="Let's build something"
        titleAccent="that lasts."
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
          <div
            key={s.label}
            className="reveal"
            data-delay={String(i + 1)}
          >
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

