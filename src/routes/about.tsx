import { createFileRoute, Link } from "@tanstack/react-router";


import { MobileMenu } from "@/components/mobile-menu";
import { useReveal } from "@/hooks/use-reveal";
import { ScrollProgressBar, MagneticButton, TiltCard, ParallaxImage } from "@/components/motion-bits";


import nicheAi from "@/assets/niche-ai.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import nicheB2b from "@/assets/niche-b2b.jpg";
import teamRm from "@/assets/team-rm.jpg";
import teamAl from "@/assets/team-al.jpg";
import teamSk from "@/assets/team-sk.jpg";
import teamJd from "@/assets/team-jd.jpg";

const nicheCovers: Record<"ai" | "fintech" | "hospitality" | "b2b", string> = {
  ai: nicheAi,
  fintech: nicheFintech,
  hospitality: nicheHospitality,
  b2b: nicheB2b,
};
const teamPhotos = [teamRm, teamAl, teamSk, teamJd];


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

// 8.4 — Niches — ElevenLabs-style grainy gradient covers.
type NicheIllustration = "ai" | "fintech" | "hospitality" | "b2b";
type Gradient = {
  // Soft, photographic grainy gradients — ElevenLabs blog energy.
  // Each is rendered as layered radial-gradients + SVG fractal noise overlay.
  stops: { color: string; x: string; y: string; r: string }[];
  base: string;
  caption?: string;
};

const gradients: Record<NicheIllustration, Gradient> = {
  // Deep ocean blue → teal — AI / intelligence
  ai: {
    base: "#0b2a4a",
    stops: [
      { color: "#1d6fb8", x: "78%", y: "22%", r: "62%" },
      { color: "#3aa0d6", x: "30%", y: "70%", r: "55%" },
      { color: "#0a1e36", x: "10%", y: "10%", r: "50%" },
    ],
    caption: "AI",
  },
  // Emerald → moss → blue — trust + finance
  fintech: {
    base: "#0f3a2e",
    stops: [
      { color: "#3aa776", x: "70%", y: "65%", r: "60%" },
      { color: "#1f6f8a", x: "20%", y: "30%", r: "55%" },
      { color: "#0a2520", x: "90%", y: "100%", r: "45%" },
    ],
    caption: "Fintech",
  },
  // Sunset coral → peach → magenta — hospitality / lifestyle
  hospitality: {
    base: "#7a2a2a",
    stops: [
      { color: "#e8865a", x: "30%", y: "30%", r: "60%" },
      { color: "#d94a6a", x: "80%", y: "70%", r: "55%" },
      { color: "#f2c08a", x: "20%", y: "85%", r: "40%" },
    ],
    caption: "Lifestyle",
  },
  // Indigo → violet → slate — enterprise B2B
  b2b: {
    base: "#1a1f3a",
    stops: [
      { color: "#5560a8", x: "75%", y: "30%", r: "55%" },
      { color: "#8a6fb8", x: "25%", y: "65%", r: "55%" },
      { color: "#0e1226", x: "90%", y: "90%", r: "45%" },
    ],
    caption: "B2B",
  },
};

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

function GrainyGradient({
  kind,
  showCaption = false,
  className = "",
}: {
  kind: NicheIllustration;
  showCaption?: boolean;
  className?: string;
}) {
  const g = gradients[kind];
  const bg = [
    ...g.stops.map(
      (s) => `radial-gradient(circle at ${s.x} ${s.y}, ${s.color} 0%, transparent ${s.r})`,
    ),
    `linear-gradient(135deg, ${g.base}, ${g.base})`,
  ].join(", ");
  const noiseId = `n-${kind}`;
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: bg }} />
      {/* Grain overlay — fine fractal noise, low opacity */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-50"
      >
        <filter id={noiseId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>
      {/* Soft vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      {showCaption && g.caption && (
        <div className="absolute bottom-3 right-4 text-white/80 text-[11px] uppercase tracking-[0.28em]">
          {g.caption}
        </div>
      )}
    </div>
  );
}

// Swiss / Galaxy-grade line glyphs — one per niche, line-only on bone white.
// Strokes redraw on card hover via .niche-glyph .glyph-anim (see styles.css).
function NicheGlyph({ kind }: { kind: NicheIllustration }) {
  const stroke = "#0a0a0a";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 0.6,
    vectorEffect: "non-scaling-stroke" as const,
    className: "glyph-anim",
    strokeDasharray: "400",
    strokeDashoffset: "0",
  };
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="niche-glyph absolute inset-0 w-full h-full">
      <g opacity="0.08" stroke={stroke} strokeWidth="0.25">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={10 + i * 10} y1="10" x2={10 + i * 10} y2="90" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="10" y1={10 + i * 10} x2="90" y2={10 + i * 10} />
        ))}
      </g>


      {kind === "ai" && (
        <g {...common}>
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="6" />
          <ellipse cx="50" cy="50" rx="34" ry="14" />
          <ellipse cx="50" cy="50" rx="34" ry="14" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="34" ry="14" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="1.2" fill={stroke} />
        </g>
      )}

      {kind === "fintech" && (
        <g {...common}>
          {[[50,30],[34,42],[66,42],[50,54],[34,66],[66,66]].map(([cx,cy],i)=>(
            <polygon key={i} points={`${cx},${cy-8} ${cx+7},${cy-4} ${cx+7},${cy+4} ${cx},${cy+8} ${cx-7},${cy+4} ${cx-7},${cy-4}`} />
          ))}
          <line x1="50" y1="30" x2="34" y2="42" />
          <line x1="50" y1="30" x2="66" y2="42" />
          <line x1="34" y1="42" x2="50" y2="54" />
          <line x1="66" y1="42" x2="50" y2="54" />
          <line x1="50" y1="54" x2="34" y2="66" />
          <line x1="50" y1="54" x2="66" y2="66" />
          {[[50,30],[34,42],[66,42],[50,54],[34,66],[66,66]].map(([cx,cy],i)=>(
            <circle key={`d${i}`} cx={cx} cy={cy} r="0.9" fill={stroke} />
          ))}
        </g>
      )}

      {kind === "hospitality" && (
        <g {...common}>
          <line x1="14" y1="78" x2="86" y2="78" />
          <path d="M28,78 L28,52 A22,22 0 0 1 72,52 L72,78" />
          <line x1="28" y1="62" x2="72" y2="62" strokeDasharray="0.8 1.6" />
          <circle cx="50" cy="52" r="10" />
          <circle cx="50" cy="52" r="4" />
          <circle cx="50" cy="52" r="0.9" fill={stroke} />
          <line x1="28" y1="78" x2="28" y2="82" />
          <line x1="50" y1="78" x2="50" y2="82" />
          <line x1="72" y1="78" x2="72" y2="82" />
        </g>
      )}

      {kind === "b2b" && (
        <g {...common}>
          <polygon points="50,22 74,34 74,58 50,70 26,58 26,34" />
          <polygon points="50,34 62,40 62,52 50,58 38,52 38,40" />
          <line x1="50" y1="22" x2="50" y2="34" />
          <line x1="26" y1="34" x2="38" y2="40" />
          <line x1="74" y1="34" x2="62" y2="40" />
          <line x1="50" y1="58" x2="50" y2="70" />
          <line x1="14" y1="80" x2="86" y2="80" strokeDasharray="0.8 1.6" />
          <circle cx="50" cy="22" r="0.9" fill={stroke} />
          <circle cx="26" cy="58" r="0.9" fill={stroke} />
          <circle cx="74" cy="58" r="0.9" fill={stroke} />
        </g>
      )}

      <text x="14" y="16" fontSize="2.4" fill={stroke} opacity="0.5" fontFamily="ui-sans-serif, system-ui" letterSpacing="0.6">
        R—M / {kind.toUpperCase()}
      </text>
    </svg>
  );
}





function AboutPage() {
  useReveal();

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
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#efeeea] selection:text-black">
      <a href="#main" className="skip-link">Skip to content</a>

      <ScrollProgressBar />


      {/* Pill NAV */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
        <nav aria-label="Primary" className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-5 md:pl-2 pr-2">
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[11px] uppercase tracking-[0.18em] font-medium px-3 py-1.5">
              <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-black" />
              About / R—M Studio
            </span>
            <Link to="/" aria-label="R-M home" className="sm:hidden font-semibold tracking-tight text-[15px] text-white">
              R—M<span aria-hidden>.</span>
            </Link>
          </div>
          <Link to="/" aria-label="R-M home" className="hidden md:block absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px]">
            R—M<span aria-hidden>.</span>
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
            <a href="/#contact" className="hidden md:inline-block text-[12px] uppercase tracking-[0.18em] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-colors">
              Book an audit
            </a>
            <MobileMenu />
          </div>
        </nav>
      </header>

      <main id="main" className="font-mono-tac">
        {/* ============ SYSTEM TICKER ============ */}
        <div className="marquee overflow-hidden border-b border-white/15 pt-24 md:pt-28 bg-[#0a0a0a]" aria-hidden>
          <div className="marquee-track flex gap-10 whitespace-nowrap py-2.5 text-[10px] uppercase tracking-[0.32em] text-white/60">
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="text-[#E61919]">▌</span>{w}
                <span className="text-white/30">///</span>
              </span>
            ))}
          </div>
        </div>

        {/* ============ 01 — IDENT / HERO ============ */}
        <section
          aria-labelledby="page-title"
          className="relative border-b border-white/15 tac-scanlines"
        >
          <div className="relative tac-noise px-6 md:px-12 max-w-[1320px] mx-auto pt-10 md:pt-14 pb-14 md:pb-20">
            {/* Top status bar */}
            <div className="grid grid-cols-12 gap-px bg-white/15 border border-white/15 mb-10 md:mb-14 text-[10px] uppercase tracking-[0.28em]">
              {[
                ["UNIT", "R—M / 00"],
                ["STATUS", <><span className="inline-block w-1.5 h-1.5 bg-[#E61919] mr-2 tac-blink" />OPERATIONAL</>],
                ["LAT", "50.4501°N"],
                ["LON", "30.5234°E"],
                ["REV", "2.6 / 2026"],
                ["SIG", "—— ATX-09"],
              ].map(([k, v], i) => (
                <div key={i} className="col-span-6 md:col-span-2 bg-[#0a0a0a] px-3 py-2.5 flex items-center justify-between gap-3">
                  <span className="text-white/45">{k}</span>
                  <span className="text-white">{v as React.ReactNode}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-5 items-end">
              <div className="col-span-12 md:col-span-3">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#E61919] mb-3">
                  [ FILE — 001 / ABOUT ]
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 leading-[1.6]">
                  CLASSIFIED:&nbsp;PUBLIC<br/>
                  DEPT:&nbsp;STRATEGY&nbsp;//&nbsp;BRAND<br/>
                  CREW:&nbsp;04&nbsp;OPERATORS<br/>
                  RANGE:&nbsp;EU&nbsp;/&nbsp;MENA
                </p>
              </div>

              <h1
                id="page-title"
                className="col-span-12 md:col-span-9 font-mega uppercase text-white"
                style={{ fontSize: "clamp(3.5rem, 11vw, 11.5rem)" }}
              >
                R—M<br/>
                <span className="text-[#E61919]">STUDIO/</span><span className="text-white/35">OPS.</span>
              </h1>
            </div>

            {/* Strike rule */}
            <div className="mt-10 md:mt-14 h-[2px] bg-[#E61919] w-full" />

            <div className="grid grid-cols-12 gap-5 mt-8">
              <p className="col-span-12 md:col-span-5 text-[13px] leading-[1.7] text-white/80 uppercase tracking-[0.04em]">
                &gt;&gt; A SMALL UNIT FOR FOUNDERS WHO SHIP. STRATEGY AND BRAND OPS FOR AI, FINTECH, WEB3, AND LIFESTYLE OPERATORS. TWO CELLS, ONE STUDIO. SENIOR ON EVERY CALL.
              </p>
              <div className="col-span-12 md:col-span-4 md:col-start-7 text-[10px] uppercase tracking-[0.28em] text-white/55 space-y-2">
                <div className="flex justify-between border-b border-white/15 pb-1.5"><span>BRANDS DEPLOYED</span><span className="text-white tabular-nums">47</span></div>
                <div className="flex justify-between border-b border-white/15 pb-1.5"><span>CAPITAL SECURED</span><span className="text-white tabular-nums">€280M</span></div>
                <div className="flex justify-between border-b border-white/15 pb-1.5"><span>OP. RANGE</span><span className="text-white tabular-nums">7 YRS</span></div>
                <div className="flex justify-between"><span>FAILURE RATE</span><span className="text-[#E61919] tabular-nums">0.00%</span></div>
              </div>
              <div className="col-span-12 md:col-span-3 flex md:justify-end items-end">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-5 py-3.5 bg-[#E61919] text-[#0a0a0a] text-[11px] uppercase tracking-[0.24em] font-bold hover:bg-white transition-colors"
                >
                  REQ. AUDIT <span className="font-mono-tac">▶▶</span>
                </a>
              </div>
            </div>

            {/* Crosshairs at corners */}
            <span className="tac-crosshair" style={{ top: 8, left: 8 }} />
            <span className="tac-crosshair" style={{ top: 8, right: 8 }} />
            <span className="tac-crosshair" style={{ bottom: 8, left: 8 }} />
            <span className="tac-crosshair" style={{ bottom: 8, right: 8 }} />
          </div>
        </section>

        {/* ============ 02 — DOCTRINE / APPROACH ============ */}
        <section
          aria-labelledby="mission-heading"
          className="border-b border-white/15 bg-[#0a0a0a]"
        >
          <div className="px-6 md:px-12 max-w-[1320px] mx-auto py-16 md:py-24">
            <div className="grid grid-cols-12 gap-5 mb-12 md:mb-16">
              <p className="col-span-12 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-[#E61919]">
                &lt; SECTION 02 / DOCTRINE &gt;
              </p>
              <h2
                id="mission-heading"
                className="col-span-12 md:col-span-9 font-mega uppercase text-white"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                THREE PRINCIPLES.<br/>
                <span className="text-white/35">NO EXCEPTIONS.</span>
              </h2>
            </div>

            <ol role="list" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 border border-white/15">
              {pillars.map((p) => (
                <li
                  key={p.n}
                  className="relative bg-[#0a0a0a] p-6 md:p-8 min-h-[320px] flex flex-col"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/45 mb-8 pb-3 border-b border-white/15">
                    <span>[ P—{p.n} / {p.tag.toUpperCase()} ]</span>
                    <span className="text-[#E61919] tac-blink">●</span>
                  </div>
                  <div
                    className="font-mega text-[#E61919] mb-6"
                    style={{ fontSize: "clamp(4rem, 9vw, 7rem)" }}
                  >
                    {p.n}
                  </div>
                  <h3 className="text-[18px] md:text-[20px] uppercase tracking-[-0.01em] font-bold text-white leading-[1.15] mb-4">
                    {p.title}
                  </h3>
                  <p className="text-[12px] leading-[1.7] text-white/70 uppercase tracking-[0.02em] mt-auto">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 03 — PERSONNEL / TEAM ============ */}
        <section
          aria-labelledby="team-heading"
          className="border-b border-white/15 bg-[#0a0a0a]"
        >
          <div className="px-6 md:px-12 max-w-[1320px] mx-auto py-16 md:py-24">
            <div className="grid grid-cols-12 gap-5 mb-10 md:mb-14">
              <p className="col-span-12 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-[#E61919]">
                &lt; SECTION 03 / PERSONNEL &gt;
              </p>
              <h2
                id="team-heading"
                className="col-span-12 md:col-span-6 font-mega uppercase text-white"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                CREW<br/><span className="text-white/35">ROSTER.</span>
              </h2>
              <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.22em] leading-[1.7] text-white/60 self-end">
                &gt;&gt; FOUR OPERATORS. ZERO JUNIORS. ZERO HANDOFFS. EVERY ENGAGEMENT LED BY THE NAMES BELOW.
              </p>
            </div>

            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15">
              {team.map((m, i) => (
                <li key={m.name} className="bg-[#0a0a0a] group">
                  <a href="/#contact" className="block">
                    <div className="relative aspect-[3/4] overflow-hidden border-b border-white/15">
                      <img
                        src={teamPhotos[i]}
                        alt={`${m.name}, ${m.role}`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 tac-scanlines opacity-60 pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-white bg-black/60 backdrop-blur-sm">
                        <span>ID—{String(i + 1).padStart(3, "0")}</span>
                        <span className="text-[#E61919]">● REC</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-white/70 bg-black/60 backdrop-blur-sm flex justify-between">
                        <span>{m.initials}</span>
                        <span>{m.city.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-5">
                      <div className="text-[18px] uppercase tracking-[-0.01em] font-bold text-white leading-[1.1]">
                        {m.name}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/55">
                        {m.role}
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/15 text-[10px] uppercase tracking-[0.28em] text-[#E61919]">
                        SPEC / {m.spec}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 04 — VERTICALS / NICHES ============ */}
        <section
          aria-labelledby="niches-heading"
          className="border-b border-white/15 bg-[#0a0a0a] tac-scanlines"
        >
          <div className="px-6 md:px-12 max-w-[1320px] mx-auto py-16 md:py-24">
            <div className="grid grid-cols-12 gap-5 mb-12 md:mb-16">
              <p className="col-span-12 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-[#E61919]">
                &lt; SECTION 04 / OP. THEATERS &gt;
              </p>
              <h2
                id="niches-heading"
                className="col-span-12 md:col-span-9 font-mega uppercase text-white"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                FOUR VERTICALS.<br/>
                <span className="text-white/35">WHERE WE GO DEEP.</span>
              </h2>
            </div>

            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.28em] text-white/45 border-y border-white/15">
                  <th className="py-3 px-2 w-[60px] font-normal">N°</th>
                  <th className="py-3 px-2 w-[28%] font-normal">VERTICAL</th>
                  <th className="py-3 px-2 font-normal">DOCTRINE</th>
                  <th className="py-3 px-2 w-[80px] font-normal text-right">SIG</th>
                </tr>
              </thead>
              <tbody>
                {niches.map((n) => (
                  <tr
                    key={n.n}
                    className="border-b border-white/15 hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="py-6 px-2 align-top text-[#E61919] font-bold tabular-nums text-[14px]">
                      {n.n}
                    </td>
                    <td className="py-6 px-2 align-top">
                      <div className="text-[20px] md:text-[26px] uppercase tracking-[-0.02em] font-bold text-white leading-[1] mb-2">
                        {n.title}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                        UNIT—{n.illustration.toUpperCase()}
                      </div>
                    </td>
                    <td className="py-6 px-2 align-top text-[12px] leading-[1.65] text-white/70 uppercase tracking-[0.02em]">
                      {n.body}
                    </td>
                    <td className="py-6 px-2 align-top text-right text-[10px] uppercase tracking-[0.28em] text-white/55 tabular-nums">
                      <span className="inline-flex items-center gap-2 group-hover:text-[#E61919]">
                        ENGAGE <span>▶</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============ 05 — TRANSMISSION / CTA ============ */}
        <section
          aria-labelledby="cta-heading"
          className="relative border-b border-white/15 bg-[#0a0a0a] overflow-hidden"
        >
          <div className="absolute inset-0 tac-grid-bg opacity-40 pointer-events-none" />
          <div className="relative px-6 md:px-12 max-w-[1320px] mx-auto py-20 md:py-32">
            <div className="grid grid-cols-12 gap-5 mb-10">
              <p className="col-span-12 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-[#E61919]">
                &lt; SECTION 05 / TRANSMISSION &gt;
              </p>
              <div className="col-span-12 md:col-span-9 text-[10px] uppercase tracking-[0.28em] text-white/45 md:text-right tabular-nums">
                CH 09 — 2400 BAUD — ENCRYPTED — STAND BY ▌
              </div>
            </div>

            <h2
              id="cta-heading"
              className="font-mega uppercase text-white mb-12"
              style={{ fontSize: "clamp(2.75rem, 10vw, 10rem)" }}
            >
              REQUEST<br/>
              <span className="text-[#E61919]">CONTACT./</span><br/>
              <span className="text-white/30">END TRANSMISSION.</span>
            </h2>

            <div className="grid grid-cols-12 gap-5 items-end border-t-2 border-[#E61919] pt-8">
              <p className="col-span-12 md:col-span-6 text-[13px] leading-[1.7] text-white/80 uppercase tracking-[0.04em]">
                &gt;&gt; READY TO SCALE? OPEN A CHANNEL. WE RESPOND WITHIN 24H AT ANY LATITUDE.
              </p>
              <div className="col-span-12 md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[#E61919] text-[#0a0a0a] text-[11px] uppercase tracking-[0.24em] font-bold hover:bg-white transition-colors"
                >
                  BOOK AUDIT <span>▶▶</span>
                </a>
                <a
                  href="mailto:hello@r-m.studio"
                  className="inline-flex items-center gap-3 px-6 py-4 border border-white/30 text-white text-[11px] uppercase tracking-[0.24em] font-bold hover:border-[#E61919] hover:text-[#E61919] transition-colors"
                >
                  HELLO@R-M.STUDIO
                </a>
              </div>
            </div>
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
                <li><a href="/#cases" className="hover:text-white transition-colors">Case studies</a></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-white/45 mb-4">Resources</h3>
              <ul className="space-y-3 text-[14px] text-white/75">
                <li><Link to="/blog" className="hover:text-white transition-colors">Journal</Link></li>
                <li><a href="/#insights" className="hover:text-white transition-colors">Insights</a></li>
                <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
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

function SpinPillars() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="border-t border-white/10 px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-32"
    >
      <div className="grid grid-cols-12 gap-5 mb-16 md:mb-24 reveal-fade">
        <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.28em] leading-[1] mb-4 md:mb-0" style={{ color: "var(--accent-red)" }}>
          Mission &amp; approach
        </p>
        <h2
          id="mission-heading"
          className="col-span-12 md:col-span-10 md:col-start-3 text-[36px] sm:text-[56px] md:text-[80px] leading-[1.02] tracking-[-0.03em] font-medium text-white"
        >
          How we work.{" "}
          <span className="font-light text-white/45 inline">Three principles.</span>
        </h2>
      </div>

      <ol role="list" className="border-t border-white/10">
        {pillars.map((p, i) => (
          <li
            key={p.n}
            className="reveal-fade grid grid-cols-12 gap-5 items-start border-b border-white/10 py-10 md:py-16"
            data-delay={String(Math.min(i + 1, 5))}
          >
            <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.28em] text-white/55 tabular-nums">
              P / {p.n} — {p.tag}
            </p>
            <div className="col-span-12 md:col-span-10 md:col-start-3">
              <div className="flex items-baseline gap-6">
                <span className="text-[40px] md:text-[64px] leading-none font-medium tracking-[-0.03em] text-white tabular-nums">
                  {p.n}
                </span>
                <h3 className="text-[24px] md:text-[40px] leading-[1.05] tracking-[-0.02em] font-medium text-white">
                  {p.title}
                </h3>
              </div>
              <p className="mt-5 max-w-[640px] text-[15px] md:text-[16px] leading-[1.65] text-white/70">
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}


