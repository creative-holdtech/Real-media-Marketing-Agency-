import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/mobile-menu";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — R-M Studio" },
      {
        name: "description",
        content:
          "R-M is a strategy and brand studio for ambitious founders across AI SaaS, Fintech, Web3 and lifestyle.",
      },
      { property: "og:title", content: "About — R-M Studio" },
      {
        property: "og:description",
        content:
          "R-M is a strategy and brand studio for ambitious founders across AI SaaS, Fintech, Web3 and lifestyle.",
      },
    ],
  }),
  component: AboutPage,
});

const nav: { label: string; href?: string; to?: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
];

// 8.2 — Mission / Approach pillars (rotating circle items)
const pillars = [
  {
    n: "01",
    tag: "Idea",
    title: "Sharp positioning, first.",
    body: "We start with the cleanest possible articulation of what the brand is, who it is for, and why it deserves to exist. Everything downstream — design, copy, growth — inherits that clarity.",
  },
  {
    n: "02",
    tag: "Approach",
    title: "Systems, not one-offs.",
    body: "Brand systems, growth loops, content engines. We build durable infrastructure that compounds quarter after quarter, instead of one launch that fades in a week.",
  },
  {
    n: "03",
    tag: "Result",
    title: "Numbers founders care about.",
    body: "Capital secured, qualified pipeline, lower CAC, defensible category position. Outcomes that move the cap table — not vanity impressions.",
  },
];

// 8.3 — Team
const team = [
  {
    initials: "RM",
    name: "R. Mirza",
    role: "Founder · Strategy",
    spec: "Positioning · GTM",
    city: "Kyiv",
  },
  {
    initials: "AL",
    name: "A. Levchenko",
    role: "Creative Director",
    spec: "Brand systems",
    city: "Berlin",
  },
  {
    initials: "SK",
    name: "S. Karim",
    role: "Performance Lead",
    spec: "Paid · Lifecycle",
    city: "Dubai",
  },
  {
    initials: "JD",
    name: "J. Dovgan",
    role: "Brand Designer",
    spec: "Identity · Motion",
    city: "Lisbon",
  },
];

// 8.4 — Niches
const niches = [
  {
    n: "01",
    title: "AI SaaS",
    body: "Positioning, pricing and launch systems for AI-native products fighting for category leadership.",
    accent: "#e85d3a",
  },
  {
    n: "02",
    title: "Fintech + Web3",
    body: "Trust-led brand systems and growth for regulated finance, neobanks, and on-chain primitives.",
    accent: "#c9a84c",
  },
  {
    n: "03",
    title: "Hospitality + Lifestyle",
    body: "Flagship identity and storytelling for hotels, restaurants and lifestyle labels across EU and MENA.",
    accent: "#5a8a5c",
  },
  {
    n: "04",
    title: "B2B Platforms",
    body: "Repositioning legacy B2B and enterprise platforms into sharper, founder-grade narratives.",
    accent: "#6c5ce7",
  },
];

function AboutPage() {
  useReveal();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tickerWords = [
    "About",
    "Studio",
    "Strategy",
    "Brand systems",
    "EU · MENA",
    "Since 2019",
    "Quiet · Clarity · Compounding",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      <a href="#main" className="skip-link">Skip to content</a>

      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/5"
      >
        <div
          className="h-full bg-[#e85d3a] origin-left"
          style={{ width: `${progress}%`, transition: "width 80ms linear" }}
        />
      </div>

      {/* Pill NAV */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
        <nav aria-label="Primary" className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-5 md:pl-2 pr-2">
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[12px] font-medium px-3 py-1.5">
              <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-[#e85d3a]" />
              About — the studio behind R-M
            </span>
            <Link to="/" aria-label="R-M home" className="sm:hidden font-semibold tracking-tight text-[15px] text-white">
              R—M<span aria-hidden className="text-[#e85d3a]">.</span>
            </Link>
          </div>
          <Link to="/" aria-label="R-M home" className="hidden md:block absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px]">
            R—M<span aria-hidden className="text-[#e85d3a]">.</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-6 text-[13px] text-white/70 mr-4">
              {nav.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="hover:text-white transition-colors">{n.label}</a>
                </li>
              ))}
              <li>
                <Link to="/about" aria-current="page" className="text-white">About</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Journal</Link>
              </li>
            </ul>
            <a href="/#contact" className="hidden md:inline-block text-[13px] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors">
              Get Audit
            </a>
            <MobileMenu />
          </div>
        </nav>
      </header>

      <main id="main">
        {/* TICKER */}
        <div className="marquee overflow-hidden border-b border-white/5 pt-24 md:pt-28" aria-hidden>
          <div className="marquee-track flex gap-12 whitespace-nowrap py-3 text-[11px] uppercase tracking-[0.3em] text-white/30">
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w}
                <span className="inline-block w-1 h-1 rounded-full bg-[#e85d3a]/60" />
              </span>
            ))}
          </div>
        </div>

        {/* 8.1 — HERO */}
        <section
          aria-labelledby="page-title"
          className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-20 md:pb-28 min-h-[60vh] flex flex-col justify-center"
        >
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-3 reveal">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                <span aria-hidden>[ </span>8.1 — Who we are<span aria-hidden> ]</span>
              </p>
              <p className="mt-4 text-[12px] text-white/30">Studio №01 · Since 2019</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 id="page-title" className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.95] tracking-[-0.035em] font-medium text-white">
                A small studio for<br />
                <span className="italic font-light text-white/60 drift inline-block">
                  founders who actually ship.
                </span>
              </h1>
              <p className="reveal mt-10 max-w-[620px] text-[15px] md:text-[17px] leading-relaxed text-white/65" data-delay="2">
                R-M is a strategy and brand studio working with operators across
                AI SaaS, Fintech, Web3 and lifestyle. We help founders position
                sharply, launch cleanly, and compound year over year — instead
                of chasing quarterly noise.
              </p>
              <p className="reveal mt-4 max-w-[620px] text-[15px] md:text-[17px] leading-relaxed text-white/55" data-delay="3">
                Two cells, one studio. Senior on every call.
              </p>
            </div>
          </div>
        </section>

        {/* 8.2 — MISSION & APPROACH (rotating pillars) */}
        <SpinPillars />

        {/* 8.3 — TEAM */}
        <section
          aria-labelledby="team-heading"
          className="px-6 md:px-12 max-w-[1440px] mx-auto py-20 md:py-28 border-t border-white/10"
        >
          <div className="flex flex-col items-center text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              <span aria-hidden>[ </span>8.3 — Team<span aria-hidden> ]</span>
            </p>
            <h2 id="team-heading" className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Who actually does the work.
            </h2>
          </div>
          <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((m, i) => (
              <li key={m.name} className="reveal" data-delay={String(Math.min(i + 1, 5))}>
                <article className="group h-full flex flex-col rounded-3xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-500">
                  <figure className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
                    <div aria-hidden className="absolute inset-0 grid place-items-center text-[140px] font-medium text-white/[0.06] tracking-tight">
                      {m.initials}
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/85">
                      {m.city}
                    </span>
                    <a
                      href="#"
                      aria-label={`${m.name} on LinkedIn`}
                      className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/85 hover:bg-[#e85d3a] hover:text-white hover:border-transparent transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.74 1.85-2.74 3.76V24h-5V8z" />
                      </svg>
                    </a>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-[18px] font-medium text-white leading-tight">{m.name}</div>
                      <div className="text-[12px] text-white/65 mt-1">{m.role}</div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#e85d3a] mt-2">{m.spec}</div>
                    </div>
                  </figure>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* 8.4 — NICHES */}
        <section
          aria-labelledby="niches-heading"
          className="px-6 md:px-12 max-w-[1440px] mx-auto py-20 md:py-28 border-t border-white/10"
        >
          <div className="flex flex-col items-center text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              <span aria-hidden>[ </span>8.4 — Our niches<span aria-hidden> ]</span>
            </p>
            <h2 id="niches-heading" className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Four verticals.<br />
              <span className="italic font-light text-white/60">Where we go deep.</span>
            </h2>
          </div>
          <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {niches.map((n, i) => (
              <li key={n.n} className="reveal" data-delay={String(Math.min(i + 1, 5))}>
                <article
                  className="group h-full flex flex-col rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8 hover:border-white/25 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
                    style={{ background: n.accent }}
                  />
                  <div className="relative flex items-center justify-between mb-10">
                    <span
                      className="w-10 h-10 grid place-items-center rounded-full text-[12px] font-medium"
                      style={{ background: `${n.accent}22`, color: n.accent, border: `1px solid ${n.accent}55` }}
                    >
                      {n.n}
                    </span>
                    <span aria-hidden className="w-2 h-2 rounded-full" style={{ background: n.accent }} />
                  </div>
                  <h3 className="relative text-[22px] md:text-[24px] leading-[1.15] tracking-[-0.015em] font-medium text-white">
                    {n.title}
                  </h3>
                  <p className="relative mt-4 text-[14px] text-white/55 leading-relaxed flex-1">
                    {n.body}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* 8.5 — CTA */}
        <section
          aria-labelledby="cta-heading"
          className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10"
        >
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-8 reveal">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
                <span aria-hidden>[ </span>8.5 — Work with us<span aria-hidden> ]</span>
              </p>
              <h2 id="cta-heading" className="text-[36px] md:text-[64px] leading-[1] tracking-[-0.025em] font-medium">
                Have a brand worth<br />
                <span className="italic font-light text-white/60">building carefully?</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 reveal flex flex-col gap-3" data-delay="2">
              <a
                href="/#contact"
                className="text-center text-[14px] px-6 py-4 rounded-full bg-[#e85d3a] text-white font-medium hover:bg-white hover:text-black transition-colors"
              >
                Book an audit →
              </a>
              <a
                href="mailto:hello@r-m.studio"
                className="text-center text-[12px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors py-2"
              >
                hello@r-m.studio
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 border-t border-white/10">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-between gap-6 text-[12px] text-white/40">
          <span>© R-M 2026</span>
          <ul className="flex items-center gap-6">
            <li><Link to="/" className="hover:text-white transition-colors rounded-md">← Back home</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Journal</Link></li>
            <li><span aria-label="Locations">Kyiv / EU / MENA</span></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

function SpinPillars() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const count = pillars.length;
  const active = Math.min(count - 1, Math.floor(progress * count * 0.999));
  const step = 360 / count;
  const rotation = -progress * (count - 1) * step;


  return (
    <section
      ref={wrapRef}
      aria-labelledby="mission-heading"
      className="relative border-t border-white/10"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span aria-hidden>[ </span>8.2 — Mission & approach<span aria-hidden> ]</span>
            </p>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/30 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          <h2 id="mission-heading" className="sr-only">Mission and approach</h2>

          <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
            {/* Rotating circle — LEFT */}
            <div className="col-span-12 md:col-span-6 relative">
              <div
                className="relative mx-auto"
                style={{ width: "min(560px, 88vw)", aspectRatio: "1 / 1" }}
                aria-hidden
              >
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-[8%] rounded-full border border-white/[0.05]" />
                <div className="absolute inset-[20%] rounded-full border border-white/[0.03]" />

                {/* rotating numbers */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {pillars.map((p, i) => {
                    const angle = i * step;
                    const isActive = i === active;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translateX(44%) rotate(${-angle - rotation}deg) translate(-50%, -50%)`,
                          transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <div
                          className="font-medium tracking-[-0.04em] leading-none transition-all duration-700"
                          style={{
                            fontSize: isActive ? "clamp(72px, 12vw, 180px)" : "clamp(28px, 4.5vw, 64px)",
                            color: isActive ? "#e8e6e1" : "rgba(232,230,225,0.14)",
                          }}
                        >
                          {p.n}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* anchor dot at 3 o'clock */}
                <span
                  className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#e85d3a]"
                  style={{ transform: "translateX(44%) translate(-50%, -50%)" }}
                />
              </div>
            </div>

            {/* Active content — slides in from the RIGHT */}
            <div className="col-span-12 md:col-span-6 relative min-h-[220px] md:min-h-[320px] overflow-hidden">
              {pillars.map((p, i) => {
                const isActive = i === active;
                // direction: items after active sit off-right, before active off-left
                const offset = i === active ? 0 : i > active ? 60 : -60;
                return (
                  <div
                    key={p.n}
                    aria-hidden={!isActive}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateX(${offset}px)`,
                      transition:
                        "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="text-[11px] uppercase tracking-[0.25em] text-[#e85d3a] mb-5">
                      {p.tag}
                    </div>
                    <h3 className="text-[32px] md:text-[56px] leading-[1.02] tracking-[-0.025em] font-medium text-white">
                      {p.title}
                    </h3>
                    <p className="mt-6 text-[15px] md:text-[17px] text-white/60 leading-relaxed max-w-md">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
