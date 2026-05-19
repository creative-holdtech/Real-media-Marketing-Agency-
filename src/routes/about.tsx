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
          "R-M is a strategy and brand studio for ambitious founders. Field notes on how we work, who we are, and what we believe.",
      },
      { property: "og:title", content: "About — R-M Studio" },
      {
        property: "og:description",
        content:
          "R-M is a strategy and brand studio for ambitious founders. Field notes on how we work, who we are, and what we believe.",
      },
    ],
  }),
  component: AboutPage,
});

const nav: { label: string; href: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
];

const principles = [
  {
    n: "01",
    tag: "Strategy",
    title: "Position before production.",
    body: "We start with the sharpest articulation of what a brand actually is — then design, copy, and campaigns follow with discipline.",
    gradient:
      "radial-gradient(circle at 30% 20%, #e85d3a55, transparent 55%), radial-gradient(circle at 80% 80%, #4a6b8a44, transparent 60%)",
  },
  {
    n: "02",
    tag: "Velocity",
    title: "Compounding over spikes.",
    body: "Short engagements optimise for one launch. We design systems that get sharper every quarter, not louder every campaign.",
    gradient:
      "radial-gradient(circle at 75% 25%, #c9a84c55, transparent 55%), radial-gradient(circle at 20% 85%, #5a8a5c55, transparent 60%)",
  },
  {
    n: "03",
    tag: "Craft",
    title: "Taste is non-negotiable.",
    body: "Every surface — from a footer link to a flagship film — is shipped at the same standard. Quiet, considered, unmistakably ours.",
    gradient:
      "radial-gradient(circle at 25% 70%, #6c5ce755, transparent 55%), radial-gradient(circle at 80% 25%, #e8478a44, transparent 60%)",
  },
];

const team = [
  { initials: "RM", name: "R. Mirza", role: "Founder · Strategy", city: "Kyiv" },
  { initials: "AL", name: "A. Levchenko", role: "Creative Director", city: "Berlin" },
  { initials: "SK", name: "S. Karim", role: "Performance Lead", city: "Dubai" },
  { initials: "JD", name: "J. Dovgan", role: "Brand Designer", city: "Lisbon" },
];

const timeline = [
  { year: "2019", title: "Studio founded", body: "Started as a two-person practice in Kyiv working with early-stage founders." },
  { year: "2021", title: "EU expansion", body: "Opened a satellite cell in Berlin and began long-term retainers with category leaders." },
  { year: "2023", title: "MENA chapter", body: "First flagship launches across the Gulf — luxury, fintech, and lifestyle verticals." },
  { year: "2026", title: "40+ launches", body: "$120M+ in capital secured by founder teams we partnered with." },
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

        {/* HERO */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-12 md:pb-20" aria-labelledby="page-title">
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-3 reveal">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                <span aria-hidden>[ </span>About — 2026<span aria-hidden> ]</span>
              </p>
              <p className="mt-4 text-[12px] text-white/30">Studio №01</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 id="page-title" className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.95] tracking-[-0.035em] font-medium text-white">
                A small studio<br />
                <span className="italic font-light text-white/60 drift inline-block">
                  for ambitious founders.
                </span>
              </h1>
              <p className="reveal mt-10 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-white/60" data-delay="2">
                R-M is a strategy and brand studio working with operators across
                the EU and MENA. We help founders position sharply, launch
                cleanly, and compound year over year — not chase quarterly noise.
              </p>
            </div>
          </div>
        </section>

        {/* METRICS — scroll-driven rotating circle */}
        <SpinMetrics />


        {/* PRINCIPLES — blog-card style */}
        <section aria-labelledby="principles-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              <span aria-hidden>[ </span>02 — Principles<span aria-hidden> ]</span>
            </p>
            <h2 id="principles-heading" className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Three things we keep<br />
              <span className="italic font-light text-white/60">non-negotiable.</span>
            </h2>
          </div>
          <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {principles.map((p, i) => (
              <li key={p.n} className="reveal" data-delay={String(i + 1)}>
                <article className="group h-full flex flex-col rounded-3xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-500">
                  <figure className="aspect-[4/3] relative overflow-hidden">
                    <div aria-hidden className="absolute inset-0" style={{ backgroundImage: p.gradient }} />
                    <div aria-hidden className="absolute inset-0 mix-blend-screen" style={{ backgroundImage: p.gradient }} />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/85">
                      {p.tag}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/85">
                      {p.n}
                    </span>
                  </figure>
                  <div className="flex-1 flex flex-col p-6 md:p-8">
                    <h3 className="text-[22px] md:text-[24px] leading-[1.15] tracking-[-0.015em] font-medium text-white">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[14px] text-white/55 leading-relaxed flex-1">{p.body}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* TEAM */}
        <section aria-labelledby="team-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              <span aria-hidden>[ </span>03 — Team<span aria-hidden> ]</span>
            </p>
            <h2 id="team-heading" className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Small by design.<br />
              <span className="italic font-light text-white/60">Senior on every call.</span>
            </h2>
          </div>
          <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((m, i) => (
              <li key={m.name} className="reveal" data-delay={String(Math.min(i + 1, 5))}>
                <article className="group h-full flex flex-col rounded-3xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-500">
                  <figure className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
                    <div aria-hidden className="absolute inset-0 grid place-items-center text-[120px] font-medium text-white/[0.06] tracking-tight">
                      {m.initials}
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/85">
                      {m.city}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-[18px] font-medium text-white">{m.name}</div>
                      <div className="text-[12px] text-white/60 mt-1">{m.role}</div>
                    </div>
                  </figure>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* TIMELINE */}
        <section aria-labelledby="timeline-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              <span aria-hidden>[ </span>04 — Trajectory<span aria-hidden> ]</span>
            </p>
            <h2 id="timeline-heading" className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Seven quiet years.
            </h2>
          </div>
          <ul role="list" className="divide-y divide-white/10 border-y border-white/10">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                className="grid grid-cols-12 items-baseline py-6 md:py-8 group hover:bg-white/[0.02] transition-colors reveal"
                data-delay={String(Math.min(i + 1, 5))}
              >
                <span className="col-span-3 md:col-span-2 text-[20px] md:text-2xl font-medium tracking-tight group-hover:text-[#e85d3a] transition-colors">
                  {t.year}
                </span>
                <span className="col-span-9 md:col-span-4 text-[16px] md:text-[20px] text-white/90">
                  {t.title}
                </span>
                <span className="col-start-4 col-span-9 md:col-start-auto md:col-span-6 mt-2 md:mt-0 text-[14px] text-white/55 leading-relaxed">
                  {t.body}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* BIG TYPE STATEMENT */}
        <section aria-hidden className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-40 border-t border-white/10 overflow-hidden">
          <p className="text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.05em] font-medium text-white/[0.06] whitespace-nowrap">
            Quiet · Clarity · Compounding
          </p>
        </section>

        {/* CTA */}
        <section aria-labelledby="cta-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-8 reveal">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
                <span aria-hidden>[ </span>05 — Work with us<span aria-hidden> ]</span>
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

const spinMetrics = [
  { big: "40+", label: "Projects delivered", caption: "Launched across EU and MENA since 2019." },
  { big: "$120M+", label: "Capital secured", caption: "Raised by founder teams we partnered with." },
  { big: "04", label: "Industries mastered", caption: "Fintech, lifestyle, hospitality, B2B SaaS." },
  { big: "EU·MENA", label: "Markets", caption: "Two cells, one studio — Kyiv, Berlin, Dubai." },
];

function SpinMetrics() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when section enters the sticky window, 1 when it leaves.
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

  const count = spinMetrics.length;
  const active = Math.min(count - 1, Math.floor(progress * count * 0.999));
  // Place markers so the active item sits at the 3 o'clock anchor (angle 0).
  const step = 360 / count;
  const rotation = -progress * (count - 1) * step;

  return (
    <section
      ref={wrapRef}
      aria-labelledby="metrics-heading"
      className="relative border-t border-white/10"
      style={{ height: `${count * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center justify-between mb-10 md:mb-16">
            <h2 id="metrics-heading" className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span aria-hidden>[ </span>01 — By the numbers<span aria-hidden> ]</span>
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
            {/* Rotating circle */}
            <div className="col-span-12 md:col-span-7 relative">
              <div
                className="relative mx-auto"
                style={{ width: "min(560px, 90vw)", aspectRatio: "1 / 1" }}
                aria-hidden
              >
                {/* circle outline */}
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-[10%] rounded-full border border-white/[0.04]" />

                {/* rotating numbers */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {spinMetrics.map((m, i) => {
                    const angle = i * step;
                    const isActive = i === active;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translateX(46%) rotate(${-angle - rotation}deg) translate(-50%, -50%)`,
                          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <div
                          className="font-medium tracking-[-0.04em] leading-none transition-all duration-500"
                          style={{
                            fontSize: isActive ? "clamp(64px, 11vw, 160px)" : "clamp(28px, 4.5vw, 64px)",
                            color: isActive ? "#e8e6e1" : "rgba(232,230,225,0.18)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* anchor dot at 3 o'clock */}
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 rounded-full bg-[#e85d3a]"
                  style={{ transform: "translateX(46%) translate(-50%, -50%)" }}
                />
              </div>
            </div>

            {/* Active label + caption */}
            <div className="col-span-12 md:col-span-5 relative min-h-[180px] md:min-h-[260px]">
              {spinMetrics.map((m, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-500"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "translateY(0)" : "translateY(16px)",
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                >
                  <div className="text-[40px] md:text-[64px] leading-[1] tracking-[-0.02em] font-medium">
                    {m.big}
                  </div>
                  <div className="mt-4 text-[12px] uppercase tracking-[0.2em] text-[#e85d3a]">
                    {m.label}
                  </div>
                  <p className="mt-6 text-[15px] text-white/55 leading-relaxed max-w-sm">
                    {m.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
