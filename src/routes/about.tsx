import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { ScrollProgressBar, MagneticButton } from "@/components/motion-bits";

import teamRm from "@/assets/team-rm.jpg";
import teamAl from "@/assets/team-al.jpg";
import teamSk from "@/assets/team-sk.jpg";
import teamJd from "@/assets/team-jd.jpg";
import heroBloom from "@/assets/hero-bloom.jpg";

const teamPhotos = [teamRm, teamAl, teamSk, teamJd];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — R-M Studio" },
      {
        name: "description",
        content:
          "R-M is a senior strategy and brand studio for founders shipping in AI, Fintech, Web3 and lifestyle. Four operators. No juniors.",
      },
      { property: "og:title", content: "About — R-M Studio" },
      {
        property: "og:description",
        content:
          "Senior strategy and brand for founders who ship. Four operators, four cities, zero subcontractors.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: AboutPage,
});


/* ------------------------------------------------------------------ */
/*  TEAM                                                               */
/* ------------------------------------------------------------------ */
const team = [
  { initials: "RM", name: "R. Mirza",     role: "Founder · Strategy",    spec: "Positioning · GTM",   city: "Kyiv"   },
  { initials: "AL", name: "A. Levchenko", role: "Creative Director",     spec: "Brand systems",       city: "Berlin" },
  { initials: "SK", name: "S. Karim",     role: "Performance Lead",      spec: "Paid · Lifecycle",    city: "Dubai"  },
  { initials: "JD", name: "J. Dovgan",    role: "Brand Designer",        spec: "Identity · Motion",   city: "Lisbon" },
];

/* ------------------------------------------------------------------ */
/*  VERTICALS — horizontal accordion                                   */
/* ------------------------------------------------------------------ */
const verticals = [
  {
    n: "01",
    title: "AI SaaS",
    body: "Positioning, pricing and launch systems for AI-native products fighting for category leadership.",
    img: "https://picsum.photos/seed/rm-vertical-ai-2/1200/1600",
  },
  {
    n: "02",
    title: "Fintech + Web3",
    body: "Trust-led brand systems and growth for regulated finance, neobanks, and on-chain primitives.",
    img: "https://picsum.photos/seed/rm-vertical-fintech-7/1200/1600",
  },
  {
    n: "03",
    title: "Hospitality",
    body: "Flagship identity and storytelling for hotels, restaurants and lifestyle labels across EU and MENA.",
    img: "https://picsum.photos/seed/rm-vertical-hospitality-3/1200/1600",
  },
  {
    n: "04",
    title: "B2B Platforms",
    body: "Repositioning legacy B2B and enterprise platforms into sharper, founder-grade narratives.",
    img: "https://picsum.photos/seed/rm-vertical-b2b-9/1200/1600",
  },
];

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    quote:
      "They rewrote our positioning in a week, and our next investor call was 40 minutes shorter. The deck did the work for us.",
    name: "Anna Kowalski",
    role: "Founder, Lendlayer",
    avatar: "https://picsum.photos/seed/rm-test-1/300/300",
  },
  {
    quote:
      "Six months in, CAC down 31%, brand search up 4×. Quiet, surgical work that compounds.",
    name: "Daniel Osei",
    role: "CEO, Quorum AI",
    avatar: "https://picsum.photos/seed/rm-test-2/300/300",
  },
  {
    quote:
      "Senior operators on every call. No theatre, no decks of decks — just decisions and shipping.",
    name: "Inès Marchetti",
    role: "Partner, Atlas Capital",
    avatar: "https://picsum.photos/seed/rm-test-3/300/300",
  },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
function AboutPage() {
  useReveal();

  const tickerWords = [
    "Senior operators only",
    "Strategy + brand",
    "AI · Fintech · Web3 · Lifestyle",
    "Kyiv · Berlin · Dubai · Lisbon",
    "Independent since 2019",
    "Quiet · Clarity · Compounding",
  ];

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#efeeea] selection:text-black overflow-x-hidden w-full max-w-full"
      style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
    >
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgressBar />
      <SiteHeader variant="dark" />

      <main id="main">
        {/* ============= TICKER ============= */}
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

        {/* ============= ATTENTION — ASYMMETRIC HERO ============= */}
        <HeroAsymmetric />

        {/* ============= INTEREST — NUMBERS BENTO ============= */}
        <NumbersBento />

        {/* ============= DESIRE — MANIFESTO (scrub-reveal) ============= */}
        <ManifestoScrub />

        {/* ============= INTEREST — VERTICALS (horizontal accordion) ============= */}
        <VerticalsAccordion />

        {/* ============= DESIRE — TEAM BENTO ============= */}
        <TeamBento />


        {/* ============= ACTION — CTA ============= */}
        <CTASection />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ================================================================== */
/*  HERO — Artistic Asymmetry                                          */
/* ================================================================== */
function HeroAsymmetric() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={ref}
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden min-h-[92vh] flex flex-col justify-center pt-20 md:pt-28 pb-32 md:pb-48"
    >
      {/* Atmospheric background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={heroBloom}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25] grayscale contrast-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 30% 40%, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.9) 65%, #0a0a0a 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-50"
          style={{
            background:
              "radial-gradient(circle at 25% 35%, rgba(255,59,26,0.16), transparent 50%), radial-gradient(circle at 80% 65%, rgba(80,140,220,0.14), transparent 55%)",
          }}
        />
      </div>

      <div className="relative px-6 md:px-12 max-w-[1360px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* LEFT: massive headline, offset, asymmetric */}
          <div className="col-span-12 lg:col-span-8 relative z-10">
            <div className="reveal-fade text-[10px] uppercase tracking-[0.32em] text-white/45 tabular-nums mb-8 md:mb-12">
              R—M Studio · est. 2019
            </div>

            <h1
              id="page-title"
              className="reveal max-w-[18ch] font-medium text-white tracking-[-0.04em] leading-[0.92]"
              style={{
                fontFamily: '"Geist", system-ui, sans-serif',
                fontSize: "clamp(3rem, 7.2vw, 6.5rem)",
                fontWeight: 400,
              }}
            >
              A small studio<br />
              for founders{" "}
              <span
                className="font-light text-white/55 inline"
                style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
              >
                who actually ship.
              </span>
            </h1>

            <p
              className="reveal mt-10 max-w-[520px] text-[16px] md:text-[19px] leading-[1.65] text-white/72"
              data-delay="1"
            >
              Senior strategy, brand and growth for operators in AI, Fintech, Web3 and lifestyle.
              Four people. No juniors, no subcontractors.
            </p>

            <div
              className="reveal mt-12 flex flex-wrap items-center gap-x-4 gap-y-3"
              data-delay="2"
            >
              <MagneticButton
                href="/#contact"
                className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out will-change-transform"
              >
                Book an audit
                <span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton
                href="#verticals"
                strength={10}
                className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white hover:bg-white/5 active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out will-change-transform"
              >
                See the verticals
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT: floating asymmetric portrait, overlapping from bottom-right */}
          <div className="col-span-12 lg:col-span-4 relative lg:-mb-32 lg:translate-y-16">
            <motion.div
              style={
                reduce
                  ? undefined
                  : { y: sy, scale, opacity }
              }
              className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
            >
              <img
                src={teamRm}
                alt="R. Mirza, founder"
                className="absolute inset-0 w-full h-full object-cover saturate-[0.4] brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.32em] text-white/75 tabular-nums">
                Founder / Kyiv
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  className="text-white font-medium tracking-[-0.01em] leading-[1.1]"
                  style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)" }}
                >
                  R. Mirza
                </p>
                <p className="mt-1 text-[12px] text-white/65">Strategy · Positioning</p>
              </div>
            </motion.div>

            {/* Tiny floating meta plate */}
            <div className="hidden lg:flex absolute -bottom-6 -left-10 z-10 items-center gap-3 rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/75">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available · Q3 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  MANIFESTO — scrub-reveal paragraph                                 */
/* ================================================================== */
function ManifestoScrub() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = [
    "We", "are", "not", "an", "agency.", "We", "are", "four", "operators",
    "with", "scar", "tissue,", "compounding", "the", "same", "playbook",
    "across", "ambitious", "founders", "—", "quietly,", "without", "the",
    "theatre,", "for", "the", "kind", "of", "outcomes", "that", "show", "up",
    "on", "the", "cap", "table.",
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="manifesto-heading"
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative"
    >
      <div className="px-6 md:px-12 max-w-[1320px] mx-auto py-32 md:py-48">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.32em] text-white/40 tabular-nums">
              The position
            </div>
            <h2 id="manifesto-heading" className="sr-only">Manifesto</h2>
          </div>

          <p
            className="col-span-12 md:col-span-9 font-medium tracking-[-0.025em] text-white leading-[1.12]"
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3.8vw, 3.5rem)",
            }}
          >
            {words.map((w, i) => {
              const start = i / words.length;
              const end = Math.min(1, start + 1.4 / words.length);
              const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
              return (
                <motion.span
                  key={i}
                  style={reduce ? undefined : { opacity }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  NUMBERS — gapless bento                                            */
/* ================================================================== */
function NumbersBento() {
  return (
    <section
      aria-labelledby="numbers-heading"
      className="border-t border-white/10 bg-[#0a0a0a]"
    >
      <div className="px-6 md:px-12 max-w-[1320px] mx-auto py-32 md:py-48">
        <h2 id="numbers-heading" className="sr-only">By the numbers</h2>

        <div className="grid grid-cols-12 gap-5 mb-16 md:mb-20 reveal-fade items-end">
          <div className="col-span-12 md:col-span-9">
            <p
              className="font-medium text-white tracking-[-0.035em] leading-[0.96]"
              style={{
                fontFamily: '"Geist", system-ui, sans-serif',
                fontWeight: 400,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              Seven years.{" "}
              <span
                className="font-light text-white/45"
                style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
              >
                Compounded across founder teams.
              </span>
            </p>
          </div>
          <p className="col-span-12 md:col-span-3 text-[14px] md:text-[15px] leading-[1.65] text-white/55 md:pb-3">
            Five numbers that describe the studio better than any deck slide.
          </p>
        </div>

        {/* Gapless bento — 4 cols x 2 rows = 8 cells. Pieces: 2x2 + 2x1 + 1x1 + 1x1 = 8 */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 [grid-auto-flow:dense] md:auto-rows-[minmax(180px,1fr)]">
          {/* Hero metric — capital raised — 2x2 */}
          <div className="reveal group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 md:col-span-2 md:row-span-2 p-7 md:p-10 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                Capital raised
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/35 tabular-nums">
                2019—2026
              </span>
            </div>
            <div>
              <div
                className="font-medium tracking-[-0.05em] text-white tabular-nums leading-[0.86]"
                style={{ fontSize: "clamp(80px, 14vw, 200px)" }}
              >
                €280<span className="text-white/30">M</span>
              </div>
              <p className="mt-5 max-w-[36ch] text-[13px] leading-[1.6] text-white/55">
                Raised by founder teams we positioned and packaged — across seed, Series A and Series B.
              </p>
            </div>
          </div>

          {/* Brands shipped — 2x1 wide */}
          <NumberCell
            label="Brands shipped"
            value="47"
            caption="End-to-end identity + GTM, since 2019."
            wide
            delay="1"
          />

          {/* Retention — 1x1 */}
          <NumberCell
            label="Retention"
            value="92"
            suffix="%"
            caption="On year two and beyond."
            delay="2"
          />

          {/* Operating — 1x1 */}
          <NumberCell
            label="Operating"
            value="7"
            suffix="y"
            caption="Independent."
            delay="3"
          />
        </div>
      </div>
    </section>
  );
}

function NumberCell({
  label,
  value,
  suffix,
  caption,
  wide,
  delay,
}: {
  label: string;
  value: string;
  suffix?: string;
  caption: string;
  wide?: boolean;
  delay: string;
}) {
  return (
    <div
      className={`reveal group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8 flex flex-col justify-between ${wide ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"}`}
      data-delay={delay}
    >
      <span className="text-[10px] uppercase tracking-[0.32em] text-white/45">{label}</span>
      <div>
        <div
          className="font-medium tracking-[-0.04em] text-white tabular-nums leading-[0.92]"
          style={{ fontSize: wide ? "clamp(64px, 9vw, 132px)" : "clamp(52px, 6vw, 84px)" }}
        >
          {value}
          {suffix && <span className="text-white/30">{suffix}</span>}
        </div>
        <p className="mt-4 text-[12px] leading-[1.55] text-white/55">{caption}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  VERTICALS — horizontal accordion                                   */
/* ================================================================== */
function VerticalsAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="verticals"
      aria-labelledby="verticals-heading"
      className="bg-[#0a0a0a] text-white border-t border-white/10"
    >
      <div className="px-6 md:px-12 max-w-[1360px] mx-auto py-32 md:py-48">
        <div className="grid grid-cols-12 gap-5 mb-16 md:mb-24 reveal-fade items-end">
          <h2
            id="verticals-heading"
            className="col-span-12 md:col-span-9 font-medium text-white tracking-[-0.04em] leading-[0.95]"
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
            }}
          >
            Four rooms{" "}
            <span
              className="font-light text-white/45"
              style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
            >
              we already know.
            </span>
          </h2>
          <p className="col-span-12 md:col-span-3 text-[14px] md:text-[15px] leading-[1.65] text-white/60 md:pb-3">
            We don't chase categories. We go deep where our work compounds.
          </p>
        </div>

        {/* Horizontal accordion — vertical slices that expand on hover/focus */}
        <div className="hidden md:flex h-[560px] gap-2 rounded-2xl overflow-hidden border border-white/10">
          {verticals.map((v, i) => {
            const isActive = i === active;
            return (
              <button
                key={v.n}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-expanded={isActive}
                className="relative h-full overflow-hidden text-left focus:outline-none"
                style={{
                  flexGrow: isActive ? 4 : 1,
                  transition: "flex-grow 450ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <img
                  src={v.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transition: "transform 700ms cubic-bezier(0.23,1,0.32,1), filter 500ms ease",
                    filter: isActive ? "saturate(0.85) brightness(0.85)" : "saturate(0.25) brightness(0.45)",
                    transform: isActive ? "scale(1.02)" : "scale(1.08)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.9) 100%)",
                  }}
                />

                {/* Vertical label (closed state) */}
                <div
                  className="absolute inset-0 flex items-end p-6 transition-opacity duration-300 ease-out"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <div className="-rotate-90 origin-bottom-left translate-y-[-10px] whitespace-nowrap">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/55 tabular-nums">
                      {v.n}
                    </span>
                    <span className="ml-4 text-[18px] font-medium tracking-[-0.01em] text-white">
                      {v.title}
                    </span>
                  </div>
                </div>

                {/* Open state */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-opacity duration-300 delay-150 ease-out"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 tabular-nums">
                      {v.n} · Vertical
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                      Open engagements
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-medium text-white tracking-[-0.02em] leading-[1.02]"
                      style={{
                        fontFamily: '"Geist", system-ui, sans-serif',
                        fontWeight: 400,
                        fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[14px] md:text-[15px] leading-[1.65] text-white/80">
                      {v.body}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile: simple stacked cards */}
        <div className="md:hidden grid grid-cols-1 gap-3">
          {verticals.map((v) => (
            <div key={v.n} className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10">
              <img
                src={v.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover saturate-[0.5] brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 tabular-nums">
                  {v.n} · Vertical
                </span>
                <div>
                  <h3
                    className="text-white font-medium tracking-[-0.02em] leading-[1.02]"
                    style={{ fontFamily: '"Geist", system-ui, sans-serif', fontWeight: 400, fontSize: "1.75rem" }}
                  >
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-white/80">{v.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  TEAM — gapless bento                                               */
/* ================================================================== */
function TeamBento() {
  const featured = [
    { person: team[0], bg: "#C2410C", blurb: "Founder-led strategy and positioning. Twelve years turning ambiguous markets into sharp, defensible narratives." },
    { person: team[1], bg: "#7C3AED", blurb: "Brand systems with operational teeth. Identity, art direction and motion built to scale across every surface." },
    { person: team[3], bg: "#DB2777", blurb: "Designs the marks, type and motion that make the work unmistakable in feed, deck and product." },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      aria-labelledby="team-heading"
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden"
    >
      <div className="relative max-w-[1320px] mx-auto px-6 md:px-12 py-32 md:py-48">
        {/* Heading — matches page typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24"
        >
          <h2
            id="team-heading"
            className="font-medium text-white tracking-[-0.035em] leading-[0.95] max-w-[14ch]"
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontWeight: 500,
              fontSize: "clamp(2.75rem, 7vw, 6rem)",
            }}
          >
            The people who ship the work.
          </h2>
          <p
            className="max-w-[34ch] text-white/55 leading-[1.55]"
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
            }}
          >
            Three senior operators. Every engagement is led, not delegated.
          </p>
        </motion.div>

        {/* Cards — horizontal 3-up with staggered reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {featured.map((item) => (
            <motion.div
              key={item.person.initials}
              variants={itemVariants}
              className="group flex flex-col"
            >
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5]"
                style={{ backgroundColor: item.bg }}
              >
                <img
                  src={teamPhotos[team.indexOf(item.person)]}
                  alt={`${item.person.name}, ${item.person.role}`}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-95 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06] will-change-transform"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl pointer-events-none" />
              </div>

              <div className="mt-6 md:mt-7 flex flex-col gap-4">
                <p
                  className="text-white/65 leading-[1.55] max-w-[40ch]"
                  style={{
                    fontFamily: '"Geist", system-ui, sans-serif',
                    fontSize: "clamp(0.9rem, 1vw, 0.98rem)",
                  }}
                >
                  {item.blurb}
                </p>
                <div>
                  <h3
                    className="text-white font-medium tracking-[-0.02em] leading-[1.05]"
                    style={{
                      fontFamily: '"Geist", system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
                    }}
                  >
                    {item.person.name}
                  </h3>
                  <p
                    className="mt-2 text-white/45"
                    style={{
                      fontFamily: '"Geist", system-ui, sans-serif',
                      fontSize: "12px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.person.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ================================================================== */
/*  TESTIMONIALS — overlapping portraits carousel                      */
/* ================================================================== */
function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden"
    >
      <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-32 md:py-48">
        <h2 id="testimonials-heading" className="sr-only">Founder testimonials</h2>

        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Overlapping portrait stack */}
          <div className="col-span-12 md:col-span-4 relative h-[280px] md:h-[360px]">
            {testimonials.map((tt, idx) => {
              const offset = (idx - i + testimonials.length) % testimonials.length;
              const isFront = offset === 0;
              return (
                <motion.div
                  key={idx}
                  animate={{
                    transform: `translate3d(${offset * 28}px, ${offset * 14}px, 0) scale(${1 - offset * 0.06})`,
                    opacity: offset > 2 ? 0 : 1 - offset * 0.25,
                    zIndex: 10 - offset,
                  }}
                  transition={{ type: "spring", duration: 0.55, bounce: 0.18 }}
                  className="absolute top-0 left-0 w-[220px] md:w-[280px] aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] will-change-transform"
                >
                  <img
                    src={tt.avatar}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover saturate-[0.5] brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {isFront && (
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[13px] font-medium text-white tracking-[-0.01em]">{tt.name}</p>
                      <p className="text-[11px] text-white/60 mt-0.5">{tt.role}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Quote */}
          <div className="col-span-12 md:col-span-8">
            <div className="text-[10px] uppercase tracking-[0.32em] text-white/40 tabular-nums mb-6">
              {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")} · Founders
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                className="font-medium text-white tracking-[-0.02em] leading-[1.18]"
                style={{
                  fontFamily: '"Geist", system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                }}
              >
                <span
                  className="not-italic"
                  style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
                >
                  "{t.quote}"
                </span>
              </motion.blockquote>
            </AnimatePresence>


            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-white/15 text-white hover:bg-white/5 active:scale-[0.94] transition-[transform,background-color] duration-150 ease-out flex items-center justify-center will-change-transform"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-white/15 text-white hover:bg-white/5 active:scale-[0.94] transition-[transform,background-color] duration-150 ease-out flex items-center justify-center will-change-transform"
              >
                →
              </button>
              <div className="ml-4 flex gap-2 items-center">
                {testimonials.map((_, idx) => {
                  const isActive = idx === i;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setI(idx)}
                      aria-label={`Show testimonial ${idx + 1}`}
                      className="h-1 w-10 rounded-full overflow-hidden bg-white/15"
                    >
                      <span
                        aria-hidden
                        className="block h-full w-full bg-white origin-left will-change-transform"
                        style={{
                          transform: `scaleX(${isActive ? 1 : 0.4})`,
                          opacity: isActive ? 1 : 0.35,
                          transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), opacity 200ms ease",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CTA                                                                */
/* ================================================================== */
function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(255,80,40,0.10), transparent 60%), radial-gradient(50% 40% at 20% 80%, rgba(80,140,220,0.08), transparent 60%)",
        }}
      />
      <div className="relative px-6 md:px-12 max-w-[1280px] mx-auto py-32 md:py-48">
        <div className="reveal-fade max-w-[14ch] md:max-w-[18ch]">
          <h2
            id="cta-heading"
            className="font-medium text-white tracking-[-0.04em] leading-[0.95]"
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 7rem)",
            }}
          >
            Let's build{" "}
            <span
              className="font-light text-white/45"
              style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
            >
              something that compounds.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-6 items-end">
          <p className="col-span-12 md:col-span-5 text-[15px] md:text-[17px] leading-[1.6] text-white/65">
            We open four to six engagements per year. The next intake is Q3 2026 — quiet, founder-led, senior on every call.
          </p>
          <div className="col-span-12 md:col-span-7 md:justify-self-end flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/#contact"
              className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out will-change-transform"
            >
              Book an audit
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton
              href="mailto:hello@r-m.studio"
              strength={10}
              className="inline-flex items-center h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white hover:bg-white/5 active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out will-change-transform"
            >
              hello@r-m.studio
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

