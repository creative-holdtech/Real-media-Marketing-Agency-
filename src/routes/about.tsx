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

      <main id="main">
        {/* TICKER */}
        <div className="marquee overflow-hidden border-b border-white/5 pt-24 md:pt-28" aria-hidden>
          <div className="marquee-track flex gap-12 whitespace-nowrap py-4 text-[11px] uppercase tracking-[0.28em] text-white/55">
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w}
                <span className="inline-block w-1 h-1 rounded-full bg-white/25" />
              </span>
            ))}
          </div>
        </div>

        {/* 8.1 — HERO */}
        <section
          aria-labelledby="page-title"
          className="px-6 md:px-12 max-w-[1280px] mx-auto pt-16 md:pt-24 pb-24 md:pb-32 min-h-[72vh] flex flex-col justify-center"
        >
          <div className="grid grid-cols-12 gap-5">
            <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.28em] leading-[1] mb-6 md:mb-0" style={{ color: "var(--accent-red)" }}>
              Who we are
            </p>
            <div className="col-span-12 md:col-span-10 md:col-start-3">
              <h1
                id="page-title"
                className="text-[44px] sm:text-[72px] md:text-[104px] leading-[1.02] tracking-[-0.035em] font-medium text-white"
              >
                A small studio for{" "}
                <span className="font-light text-white/45 inline">
                  founders who actually ship.
                </span>
              </h1>
              <p className="mt-8 max-w-[640px] text-[16px] md:text-[18px] leading-[1.6] text-white/70">
                R-M is a strategy and brand studio for AI, Fintech, Web3 and
                lifestyle operators. Two cells, one studio. Senior on every call.
              </p>

              <div
                className="reveal mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
                data-delay="2"
              >
                <MagneticButton
                  href="/#contact"
                  className="inline-flex items-center gap-2 h-12 px-6 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-colors"
                >
                  Book an audit
                  <span aria-hidden>→</span>
                </MagneticButton>
                <MagneticButton
                  href="#cases"
                  strength={10}
                  className="inline-flex items-center gap-2 h-12 px-6 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/15 text-white/85 hover:bg-white/5 transition-colors"
                >
                  Selected work
                </MagneticButton>
                <span className="inline-flex items-center h-12 pl-4 ml-1 border-l border-white/10 text-[11px] uppercase tracking-[0.28em] leading-[1] text-white/55 tabular-nums">
                  47 brands · €280M raised · 7 yrs
                </span>
              </div>
            </div>
          </div>
        </section>




        {/* 8.2 — MISSION & APPROACH (rotating pillars) */}
        <SpinPillars />

        {/* 8.3 — TEAM — ElevenLabs-style dark, clean card grid */}
        <section
          aria-labelledby="team-heading"
          className="bg-[#0a0a0a] text-white border-t border-white/10"
        >
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-32">
            <div className="grid grid-cols-12 gap-5 mb-16 md:mb-20 reveal-fade">
              <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.28em] leading-[1] text-white/55 mb-4 md:mb-0">
                The team
              </p>
              <div className="col-span-12 md:col-span-7 md:col-start-3">
                <h2
                  id="team-heading"
                  className="text-[36px] sm:text-[48px] md:text-[64px] leading-[1.02] tracking-[-0.03em] font-medium text-white"
                >
                  Who actually{" "}
                  <span className="font-light text-white/45 inline">does the work.</span>
                </h2>
              </div>
              <p className="col-span-12 md:col-span-3 md:col-start-10 text-[14px] md:text-[15px] leading-[1.55] text-white/60">
                A small, senior team. Every project is led by the people whose names you see below — no juniors, no handoffs.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-10 md:col-start-3 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <a href="/#contact" className="reveal group block relative overflow-hidden rounded-xl bg-white/5 aspect-[4/5] lg:aspect-auto lg:min-h-[480px]">
                  <img
                    src={teamPhotos[0]}
                    alt={`${team[0].name}, ${team[0].role}`}
                    loading="lazy"
                    width={1200}
                    height={1400}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-[1.03] transition-transform duration-[900ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-white/70 mb-3 tabular-nums">
                      01 · {team[0].city}
                    </div>
                    <h3 className="text-[24px] md:text-[28px] leading-[1.1] tracking-[-0.01em] font-medium text-white max-w-[20ch]">
                      {team[0].name} — {team[0].role}
                    </h3>
                    <p className="mt-3 text-[13px] md:text-[14px] text-white/70">
                      {team[0].spec}
                    </p>
                  </div>
                </a>

                <ul role="list" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
                  {team.slice(1).map((m, idx) => {
                    const i = idx + 1;
                    return (
                      <li key={m.name} className="reveal group lg:flex-1" data-delay={String(i + 1)}>
                        <a href="/#contact" className="relative block h-full overflow-hidden rounded-xl bg-white/5">
                          <div className="flex h-full min-h-[140px]">
                            <div className="relative w-[40%] lg:w-[45%] shrink-0 overflow-hidden">
                              <img
                                src={teamPhotos[i]}
                                alt={`${m.name}, ${m.role}`}
                                loading="lazy"
                                width={400}
                                height={400}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-[1.04] transition-transform duration-[900ms] ease-out"
                              />
                            </div>
                            <div className="flex-1 p-4 md:p-5 flex flex-col justify-end">
                              <div className="text-[10px] uppercase tracking-[0.28em] text-white/45 mb-1.5 tabular-nums">
                                {String(i + 1).padStart(2, "0")} · {m.city}
                              </div>
                              <h3 className="text-[15px] md:text-[17px] leading-[1.25] tracking-[-0.01em] font-medium text-white">
                                {m.name}
                              </h3>
                              <p className="mt-1 text-[12px] md:text-[13px] leading-[1.45] text-white/60">
                                {m.role}
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 8.4 — NICHES — ElevenLabs strict editorial list */}
        <section
          aria-labelledby="niches-heading"
          className="bg-[#0a0a0a] text-white border-t border-white/10"
        >
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-32">
            <div className="grid grid-cols-12 gap-5 mb-16 md:mb-20 reveal-fade">
              <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.28em] leading-[1] text-white/55 mb-4 md:mb-0">
                Our niches
              </p>
              <h2
                id="niches-heading"
                className="col-span-12 md:col-span-7 md:col-start-3 text-[36px] sm:text-[48px] md:text-[64px] leading-[1.02] tracking-[-0.03em] font-medium text-white"
              >
                Four verticals.{" "}
                <span className="font-light text-white/45 inline">Where we go deep.</span>
              </h2>
              <p className="col-span-12 md:col-span-3 md:col-start-10 text-[14px] md:text-[15px] leading-[1.55] text-white/60">
                We don't chase categories. These are the rooms we already know — and where our work compounds.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-5">
              <ul role="list" className="col-span-12 md:col-span-10 md:col-start-3 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                {niches.map((n, i) => (
                  <li key={n.n} className="reveal" data-delay={String(Math.min(i + 1, 5))}>
                    <a
                      href="/#contact"
                      aria-label={`Discuss ${n.title} engagement`}
                      className="group block"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#ececec] mb-4">
                        <img
                          src={nicheCovers[n.illustration]}
                          alt={`${n.title} — minimalist mark`}
                          loading="lazy"
                          width={800}
                          height={800}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.28em] text-white/55 mb-2 tabular-nums">
                        {n.n} · Vertical
                      </div>
                      <h3 className="text-[16px] md:text-[17px] leading-[1.3] tracking-[-0.01em] font-medium text-white group-hover:text-white/80 transition-colors">
                        {n.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-white/60">
                        {n.body}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8.5 — CTA / Ending — normalized */}
        <section
          aria-labelledby="cta-heading"
          className="bg-[#0a0a0a] text-white border-t border-white/10"
        >
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 md:py-32">
            <div className="grid grid-cols-12 gap-5 reveal-fade">
              <p className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-[0.28em] leading-[1] mb-4 md:mb-0" style={{ color: "var(--accent-red)" }}>
                Ending
              </p>
              <div className="col-span-12 md:col-span-10 md:col-start-3">
                <h2
                  id="cta-heading"
                  className="text-[36px] sm:text-[48px] md:text-[64px] leading-[1] tracking-[-0.03em] font-medium text-white"
                >
                  <span className="block">A functional tool</span>
                  <span className="block text-white/75 font-light">built to generate growth,</span>
                  <span className="block">attract clients and sharpen</span>
                  <span className="block text-white/40 font-light">the expertise founders ship.</span>
                </h2>

                <p className="mt-10 max-w-[520px] text-[15px] md:text-[16px] leading-[1.6] text-white/65">
                  Ready to scale your brand? Let's build something bold together.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 h-12 px-6 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-colors"
                  >
                    Book an audit
                    <span aria-hidden>→</span>
                  </a>
                  <a
                    href="mailto:hello@r-m.studio"
                    className="inline-flex items-center h-12 px-6 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/15 text-white/85 hover:bg-white/5 transition-colors"
                  >
                    hello@r-m.studio
                  </a>
                </div>
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


