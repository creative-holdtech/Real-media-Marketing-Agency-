import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
type NicheIllustration = "ai" | "fintech" | "hospitality" | "b2b";
const niches: {
  n: string;
  title: string;
  body: string;
  illustration: NicheIllustration;
}[] = [
  {
    n: "01",
    title: "AI SaaS",
    body: "Positioning, pricing and launch systems for AI-native products fighting for category leadership.",
    illustration: "ai",
  },
  {
    n: "02",
    title: "Fintech + Web3",
    body: "Trust-led brand systems and growth for regulated finance, neobanks, and on-chain primitives.",
    illustration: "fintech",
  },
  {
    n: "03",
    title: "Hospitality + Lifestyle",
    body: "Flagship identity and storytelling for hotels, restaurants and lifestyle labels across EU and MENA.",
    illustration: "hospitality",
  },
  {
    n: "04",
    title: "B2B Platforms",
    body: "Repositioning legacy B2B and enterprise platforms into sharper, founder-grade narratives.",
    illustration: "b2b",
  },
];

function NicheArt({ kind }: { kind: NicheIllustration }) {
  // Quiet, architectural line illustrations.
  // Single ink colour (#1a1a1a), no chromatic accent. Hairline strokes.
  const grid = (
    <defs>
      <pattern id={`grid-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="0.4" opacity="0.08" />
      </pattern>
    </defs>
  );
  const bg = <rect width="320" height="180" fill={`url(#grid-${kind})`} />;
  const ink = "#1a1a1a";

  if (kind === "ai") {
    const nodes: [number, number][] = [
      [70, 90], [115, 55], [115, 125], [160, 90],
      [205, 55], [205, 125], [250, 90],
    ];
    const edges: [number, number][] = [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6],
    ];
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
        {grid}{bg}
        <g stroke={ink} strokeWidth="0.6" fill="none" opacity="0.55">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 3 ? 3 : 2}
            fill={ink}
            opacity={i === 3 ? 1 : 0.55}
          />
        ))}
      </svg>
    );
  }

  if (kind === "fintech") {
    const bars = [
      { x: 115, h: 22 }, { x: 133, h: 34 }, { x: 151, h: 30 },
      { x: 169, h: 48 }, { x: 187, h: 62 }, { x: 205, h: 78 },
    ];
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
        {grid}{bg}
        <circle cx="160" cy="90" r="62" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.55" />
        <line x1="105" y1="138" x2="220" y2="138" stroke={ink} strokeWidth="0.6" opacity="0.35" />
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x - 4}
            y={138 - b.h}
            width="8"
            height={b.h}
            fill={ink}
            opacity={i === bars.length - 1 ? 1 : 0.55}
          />
        ))}
      </svg>
    );
  }

  if (kind === "hospitality") {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
        {grid}{bg}
        <g fill="none" stroke={ink} strokeWidth="0.6">
          <path d="M70 130 A90 90 0 0 1 250 130" opacity="0.85" />
          <path d="M90 130 A70 70 0 0 1 230 130" opacity="0.55" />
          <path d="M110 130 A50 50 0 0 1 210 130" opacity="0.35" />
          <path d="M130 130 A30 30 0 0 1 190 130" opacity="0.2" />
        </g>
        <line x1="50" y1="130" x2="270" y2="130" stroke={ink} strokeWidth="0.8" />
      </svg>
    );
  }

  // b2b — modular stacked system blocks
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
      {grid}{bg}
      <g fill="none" stroke={ink} strokeWidth="0.6" opacity="0.55">
        <rect x="100" y="40" width="50" height="30" />
        <rect x="160" y="40" width="50" height="30" />
        <rect x="100" y="78" width="110" height="30" />
        <rect x="100" y="116" width="50" height="30" />
        <rect x="160" y="116" width="50" height="30" />
      </g>
      <rect x="160" y="78" width="50" height="30" fill={ink} opacity="0.9" />
    </svg>
  );
}



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
                <article className="group h-full flex flex-col rounded-3xl bg-[#f5f3ee] text-[#0d0d0d] overflow-hidden hover:-translate-y-1 transition-transform duration-500 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]">
                  {/* Top bar: number + tag */}
                  <div className="flex items-center justify-between px-6 pt-5 text-[11px] uppercase tracking-[0.25em] text-[#0d0d0d]/50 tabular-nums">
                    <span>{n.n}</span>
                    <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#e85d3a]" />
                  </div>

                  {/* Illustration */}
                  <div className="px-4 pt-3 pb-2">
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-white border border-[#0d0d0d]/8">
                      <NicheArt kind={n.illustration} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="px-6 pt-3 pb-7 flex-1 flex flex-col">
                    <h3 className="text-[20px] md:text-[22px] leading-[1.15] tracking-[-0.015em] font-medium">
                      {n.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] text-[#0d0d0d]/60 leading-relaxed flex-1">
                      {n.body}
                    </p>
                  </div>
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
  return (
    <section
      aria-labelledby="mission-heading"
      className="border-t border-white/10 px-6 md:px-12 max-w-[1440px] mx-auto py-20 md:py-32"
    >
      {/* Swiss-style header: 12-col grid, meta left, title right */}
      <div className="grid grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3 reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            <span aria-hidden>[ </span>8.2 — Mission &amp; approach<span aria-hidden> ]</span>
          </p>
          <p className="mt-4 text-[12px] text-white/30 tabular-nums">
            03 principles
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 reveal" data-delay="2">
          <h2
            id="mission-heading"
            className="text-[36px] sm:text-[56px] md:text-[80px] leading-[0.95] tracking-[-0.03em] font-medium text-white"
          >
            How we work.<br />
            <span className="italic font-light text-white/60">Three principles.</span>
          </h2>
        </div>
      </div>

      {/* Pillars — clean 12-col rows, numbered, generous whitespace */}
      <ol role="list" className="border-t border-white/10">
        {pillars.map((p, i) => (
          <li
            key={p.n}
            className="reveal grid grid-cols-12 gap-6 md:gap-12 items-start border-b border-white/10 py-10 md:py-16"
            data-delay={String(Math.min(i + 1, 5))}
          >
            <div className="col-span-3 md:col-span-2">
              <div className="text-[40px] md:text-[64px] leading-none font-medium tracking-[-0.03em] text-white tabular-nums">
                {p.n}
              </div>
            </div>
            <div className="col-span-9 md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#e85d3a]">
                {p.tag}
              </p>
            </div>
            <div className="col-span-12 md:col-span-7">
              <h3 className="text-[24px] md:text-[40px] leading-[1.05] tracking-[-0.02em] font-medium text-white">
                {p.title}
              </h3>
              <p className="mt-5 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-white/60">
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}


