import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

const nav = ["Services", "Products", "Case Studies", "Insights", "About"];

type Fact = {
  value: string;
  label: string;
  caption?: string;
  count?: { to: number; suffix?: string };
};

const facts: Fact[] = [
  { value: "40+", label: "Projects delivered", caption: "Since 2019", count: { to: 40, suffix: "+" } },
  { value: "04", label: "Core industries", count: { to: 4, suffix: "" } },
  { value: "EU+MENA", label: "Active markets" },
  { value: "Tier 1–3", label: "Niche experience" },
  { value: "1 team", label: "Strategy + execution", caption: "One studio, end-to-end" },
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

function StatValue({ fact, start }: { fact: Fact; start: boolean }) {
  const counted = useCountUp(fact.count?.to ?? 0, start && !!fact.count);
  if (fact.count) {
    return (
      <>
        {counted}
        {fact.count.suffix ?? ""}
      </>
    );
  }
  // Non-numeric: stack two-word values onto two lines for Swiss rhythm
  const parts = fact.value.split(/[\s+]/).filter(Boolean);
  if (parts.length >= 2) {
    return (
      <span className="block leading-[0.92]">
        <span className="block">{parts[0]}</span>
        <span className="block text-white/55">
          {fact.value.includes("+") ? "+" : ""}
          {parts.slice(1).join(" ")}
        </span>
      </span>
    );
  }
  return <>{fact.value}</>;
}

const metrics = [
  ["01", "40+", "Launched projects"],
  ["02", "04", "Industries mastered"],
  ["03", "EU·MENA", "Markets"],
  ["04", "High-risk", "Niche expertise"],
  ["05", "Long-term", "Growth focus"],
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

const cases = [
  {
    metric: "+312%",
    label: "Qualified leads",
    sector: "Fintech / EU Market",
    desc: "Complete repositioning and acquisition system redesign for a scaling fintech company.",
  },
  {
    metric: "4.7×",
    label: "ROAS increase",
    sector: "iGaming / MENA",
    desc: "Strategic creative direction and funnel optimization across multiple GEOs.",
  },
];

const articles = [
  ["Growth Strategy", "Why most scaling brands fail after rapid growth"],
  ["Positioning", "The difference between visibility and market authority"],
  ["Performance", "How structured systems outperform aggressive tactics"],
];

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      {/* HERO with full-bleed gradient + pill nav */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Gradient background — sage green → deep indigo/violet (reference) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #b8c2a3 0%, #8a9885 22%, #4a4a6e 55%, #1e1a3a 80%, #0a0a0a 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 45% at 25% 30%, rgba(168,180,150,0.55), transparent 70%), radial-gradient(50% 55% at 70% 55%, rgba(45,30,80,0.75), transparent 70%), radial-gradient(40% 35% at 85% 20%, rgba(120,135,110,0.4), transparent 70%), radial-gradient(45% 40% at 15% 85%, rgba(30,20,60,0.7), transparent 70%)",
          }}
        />
        {/* Heavy analog grain — base layer */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.55] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* Coarser grain — second pass for editorial film texture */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>\")",
          }}
        />

        {/* Pill NAV */}
        <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
          <nav className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-2 pr-2">
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[12px] font-medium px-3 py-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e85d3a]" />
                Trusted by ambitious brands EU → MENA
              </span>
            </div>
            <a
              href="#"
              className="absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px]"
            >
              R—M<span className="text-[#e85d3a]">.</span>
            </a>
            <div className="flex items-center gap-1">
              <ul className="hidden md:flex items-center gap-6 text-[13px] text-white/70 mr-4">
                {nav.map((n) => (
                  <li key={n}>
                    <a href="#" className="hover:text-white transition-colors">
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="text-[13px] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors"
              >
                Get Audit
              </a>
            </div>
          </nav>
        </header>

        {/* Hero content */}
        <div className="relative max-w-[1320px] mx-auto px-6 md:px-12 pt-40 md:pt-52 pb-24 flex flex-col items-center text-center">
          <h1 className="reveal text-[52px] sm:text-[80px] md:text-[120px] lg:text-[148px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
            Marketing systems
            <br />
            that <span className="italic font-light text-white/80">feel inevitable</span>
          </h1>
          <p className="reveal mt-10 max-w-[640px] text-[15px] md:text-[17px] leading-relaxed text-white/70" data-delay="2">
            We turn ambitious brands into category leaders through strategy,
            positioning and execution under one team. Trusted by 40+ founders
            across the EU and MENA.
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="3">
            <a
              href="#"
              className="text-[13px] px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 hover:-translate-y-0.5"
            >
              Start Project →
            </a>
            <a
              href="#"
              className="text-[13px] px-6 py-3 rounded-full border border-white/20 text-white hover:border-white hover:-translate-y-0.5"
            >
              View Case Studies
            </a>
          </div>

          {/* Swipe indicator */}
          <div className="reveal-fade mt-24 md:mt-32 text-[12px] uppercase tracking-[0.25em] text-white/50 flex items-center gap-2">
            Scroll to explore
            <span className="inline-block animate-bounce">↓</span>
          </div>
        </div>

        {/* Trusted-by strip at bottom of hero */}
        <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[1320px] mx-auto px-6 md:px-12 py-6 flex items-center gap-8 md:gap-14 overflow-x-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 whitespace-nowrap">
              Trusted by
              <br />
              visionaries
            </span>
            {["supercharge", "firmable", "ElitaGenetics", "andromeda", "veraty", "WORKYARD", "earlywork.", "advance vc"].map(
              (b) => (
                <span
                  key={b}
                  className="text-[15px] md:text-[17px] font-medium text-white/55 whitespace-nowrap tracking-tight hover:text-white transition-colors"
                >
                  {b}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Facts — Swiss-style indicators */}
      <StatsStrip />

      {/* METRICS + ABOUT */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
              [ 02 — About ]
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
              {metrics.map(([n, big, label], i) => (
                <li
                  key={n}
                  className="grid grid-cols-12 items-baseline py-6 group hover:bg-white/[0.02] transition-colors reveal"
                  data-delay={String(Math.min(i + 1, 5))}
                >
                  <span className="col-span-2 text-[11px] text-white/30 tracking-[0.2em]">
                    {n}
                  </span>
                  <span className="col-span-5 text-2xl md:text-3xl font-medium tracking-tight group-hover:text-[#e85d3a] transition-colors">
                    {big}
                  </span>
                  <span className="col-span-5 text-[13px] text-white/50 text-right md:text-left">
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
          [ 03 — Voices ]
        </p>
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="col-span-12 md:col-span-4 border-t border-white/15 pt-8 reveal"
              data-delay={String(i + 1)}
            >
              <blockquote className="text-[20px] md:text-[22px] leading-[1.3] tracking-[-0.01em] font-light text-white/90">
                <span className="text-[#e85d3a] mr-1">“</span>
                {t.quote}
                <span className="text-[#e85d3a] ml-1">”</span>
              </blockquote>
              <figcaption className="mt-10 text-[12px] uppercase tracking-[0.18em] text-white/40">
                {t.who} — <span className="text-white/70">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
            [ 04 — Products ]
          </p>
          <h2 className="col-span-12 md:col-span-9 text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
            Choose the level<br />
            of support you need<br />
            <span className="italic font-light text-white/60">right now.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-px bg-white/10 border border-white/10">
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
            },
          ].map((p, i) => (
            <article
              key={p.name}
              className="col-span-12 md:col-span-6 bg-[#0a0a0a] p-8 md:p-12 flex flex-col reveal"
              data-delay={String(i + 1)}
            >
              <div className="flex items-baseline justify-between mb-12">
                <h3 className="text-[40px] md:text-[56px] font-medium tracking-[-0.03em] leading-none">
                  {p.name}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {p.tag}
                </span>
              </div>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-md mb-10">
                {p.desc}
              </p>
              <ul className="space-y-3 mb-10">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="text-[14px] text-white/80 flex gap-3 border-b border-white/5 pb-3"
                  >
                    <span className="text-[#e85d3a]">—</span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between pt-8">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Timeline
                  </div>
                  <div className="text-[14px] mt-1">{p.time}</div>
                </div>
                <a
                  href="#"
                  className="text-[13px] px-5 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  Learn More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
              [ 05 — Cases ]
            </p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Results we<br />
              <span className="italic font-light text-white/60">deliver.</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-block text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Cases →
          </a>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {cases.map((c, i) => (
            <article
              key={i}
              className="col-span-12 md:col-span-6 group cursor-pointer reveal"
              data-delay={String(i + 1)}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 mb-8 relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.01]">
                <div
                  className="absolute inset-0 opacity-60 mix-blend-screen"
                  style={{
                    background:
                      i === 0
                        ? "radial-gradient(circle at 30% 40%, #e85d3a55, transparent 60%), radial-gradient(circle at 70% 70%, #4a6b8a44, transparent 60%)"
                        : "radial-gradient(circle at 70% 30%, #c9a84c55, transparent 60%), radial-gradient(circle at 30% 70%, #5a8a5c44, transparent 60%)",
                  }}
                />
                <div className="absolute top-6 left-6 text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Case 0{i + 1}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between">
                  <div className="text-[56px] md:text-[80px] font-medium tracking-[-0.04em] leading-none text-white">
                    {c.metric}
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/70 text-right">
                    {c.label}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[12px] uppercase tracking-[0.18em] text-white/40">
                  {c.sector}
                </span>
                <span className="text-[12px] text-white/60 group-hover:text-[#e85d3a] transition-colors">
                  Read Case →
                </span>
              </div>
              <p className="text-[15px] text-white/70 leading-relaxed max-w-md">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
            [ 06 — Insights ]
          </p>
          <h2 className="col-span-12 md:col-span-9 text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
            From our<br />
            <span className="italic font-light text-white/60">insights.</span>
          </h2>
        </div>

        <ul className="border-t border-white/15">
          {articles.map(([cat, title], i) => (
            <li key={i} className="reveal" data-delay={String(i + 1)}>
              <a
                href="#"
                className="grid grid-cols-12 items-baseline gap-4 py-8 border-b border-white/15 group hover:bg-white/[0.02] -mx-4 px-4 transition-all duration-500 hover:px-6"
              >
                <span className="col-span-2 md:col-span-1 text-[11px] text-white/30 tracking-[0.2em]">
                  0{i + 1}
                </span>
                <span className="col-span-10 md:col-span-3 text-[12px] uppercase tracking-[0.18em] text-white/50">
                  {cat}
                </span>
                <span className="col-span-10 md:col-span-7 text-[20px] md:text-[28px] font-medium tracking-[-0.01em] leading-tight group-hover:text-[#e85d3a] transition-colors">
                  {title}
                </span>
                <span className="hidden md:block col-span-1 text-[12px] text-white/40 text-right group-hover:text-white">
                  Read →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href="#"
            className="text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Articles →
          </a>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <h2 className="text-[44px] md:text-[88px] lg:text-[120px] leading-[0.95] tracking-[-0.03em] font-medium reveal">
          Let's build<br />
          something that<br />
          <span className="italic font-light text-white/50">lasts.</span>
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="#"
            className="text-[13px] px-6 py-4 rounded-full bg-[#e85d3a] text-white font-medium hover:bg-white hover:text-black transition-colors"
          >
            Get Free Audit →
          </a>
          <a
            href="#"
            className="text-[13px] px-6 py-4 rounded-full border border-white/15 hover:border-white transition-colors"
          >
            hello@r-m.studio
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 pb-10 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="text-3xl font-semibold tracking-tight">
              R—M<span className="text-[#e85d3a]">.</span>
            </div>
            <p className="mt-5 text-[14px] text-white/55 leading-relaxed max-w-xs">
              Strategic growth partner for ambitious brands operating in
              competitive industries.
            </p>
            <div className="mt-8 flex gap-5 text-[12px] uppercase tracking-[0.18em] text-white/40">
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Behance</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">
              Work
            </div>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Products</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">
              Studio
            </div>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contacts</a></li>
              <li><a href="#" className="hover:text-white">Audit</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">
              Located
            </div>
            <div className="text-[14px] text-white/70">
              Kyiv — EU — MENA
            </div>
            <div className="mt-5 text-[12px] text-white/40 leading-relaxed">
              Operating across CET / GST timezones for partners in finance,
              iGaming, performance, and lifestyle.
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/30">
          <span>© R-M 2025</span>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <span>Vol. 01 — Made with intent</span>
        </div>
      </footer>
    </div>
  );
}

function StatsStrip() {
  const { ref, inView } = useInView<HTMLElement>();

  const colSpan = ["md:col-span-3", "md:col-span-2", "md:col-span-3", "md:col-span-2", "md:col-span-2"];

  return (
    <section
      ref={ref}
      aria-labelledby="indicators-heading"
      className="px-6 md:px-12 max-w-[1440px] mx-auto pt-24 pb-12"
    >
      {/* Header row */}
      <div className="flex items-end justify-between text-[11px] uppercase tracking-[0.25em] text-white/55 font-mono">
        <h2 id="indicators-heading" className="flex items-center gap-2">
          <span aria-hidden>§ 02 / Indicators</span>
          <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-[#e85d3a]" />
        </h2>
        <span className="hidden sm:inline text-white/35">Updated · MMV·MMXXVI</span>
      </div>

      {/* Top hairline — draws in */}
      <div className="relative mt-4 h-px bg-white/10 overflow-hidden">
        <span
          aria-hidden
          className={`absolute inset-0 bg-white/40 origin-left transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
            inView ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-12">
        {facts.map((f, i) => (
          <article
            key={f.label}
            className={`group relative ${colSpan[i]} px-5 md:px-6 pt-8 md:pt-10 pb-8 md:pb-10 border-white/10 ${
              i > 0 ? "md:border-l" : ""
            } ${i % 2 === 1 ? "border-l md:border-l" : ""} ${
              i < facts.length - 1 ? "border-b md:border-b-0" : ""
            } reveal`}
            data-delay={String(Math.min(i + 1, 5))}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono mb-6 md:mb-10">
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 inline-block">
                0{i + 1}
              </span>
              <span aria-hidden className="w-6 h-px bg-white/20" />
            </div>

            <div
              className="font-medium text-white tracking-[-0.04em] leading-[0.92]"
              style={{ fontSize: "clamp(44px, 6.4vw, 96px)" }}
            >
              <StatValue fact={f} start={inView} />
            </div>

            <div className="relative mt-6 md:mt-8 h-px bg-white/10 overflow-hidden">
              <span
                aria-hidden
                className={`absolute inset-0 bg-white/30 origin-left transition-transform duration-700 ease-out motion-reduce:transition-none ${
                  inView ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: inView ? `${200 + i * 80}ms` : "0ms" }}
              />
            </div>

            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/60 leading-snug max-w-[22ch]">
              {f.label}
            </p>

            {f.caption ? (
              <p className="mt-2 text-[11px] italic text-white/35 leading-snug">{f.caption}</p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="relative h-px bg-white/10 overflow-hidden">
        <span
          aria-hidden
          className={`absolute inset-0 bg-white/40 origin-left transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
            inView ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transitionDelay: inView ? "500ms" : "0ms" }}
        />
      </div>
    </section>
  );
}

