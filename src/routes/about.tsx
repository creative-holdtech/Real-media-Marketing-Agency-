import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";

import { MobileMenu } from "@/components/mobile-menu";
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

const nav: { label: string; href?: string; to?: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
];

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

      {/* ============= NAV ============= */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
        <nav
          aria-label="Primary"
          className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-5 md:pl-2 pr-2"
        >
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[11px] uppercase tracking-[0.18em] font-medium px-3 py-1.5">
              <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-black" />
              R—M / The studio
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
            <a
              href="/#contact"
              className="hidden md:inline-block text-[12px] uppercase tracking-[0.18em] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-colors"
            >
              Book an audit
            </a>
            <MobileMenu />
          </div>
        </nav>
      </header>

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

        {/* ============= DESIRE — TESTIMONIAL CAROUSEL ============= */}
        <TestimonialCarousel />

        {/* ============= ACTION — CTA ============= */}
        <CTASection />
      </main>

      <Footer />
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
                className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-colors"
              >
                Book an audit
                <span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton
                href="#verticals"
                strength={10}
                className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
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
                  transition: "flex-grow 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <img
                  src={v.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[1100ms] ease-out"
                  style={{
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
                  className="absolute inset-0 flex items-end p-6 transition-opacity duration-500"
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
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-opacity duration-700 delay-200"
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
  const featured = [team[0], team[1], team[3]];
  return (
    <section
      aria-labelledby="team-heading"
      className="bg-[#0a0a0a] text-white border-t border-white/10 relative"
    >
      <div className="relative px-6 md:px-12 max-w-[1320px] mx-auto py-16 md:py-20">
        {/* Tight editorial heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10 reveal-fade">
          <h2
            id="team-heading"
            className="font-medium text-white tracking-[-0.035em] leading-[0.98]"
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontWeight: 500,
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
            }}
          >
            The people who ship the work.
          </h2>
          <p className="max-w-[36ch] text-[13px] md:text-[14px] leading-[1.55] text-white/55">
            Three senior operators. Every engagement is led, not delegated.
          </p>
        </div>

        {/* 3 equal cards, B&W, fit one screen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {featured.map((person, i) => (
            <a
              key={person.initials}
              href="/#contact"
              className="reveal group relative overflow-hidden rounded-xl bg-white/[0.04] aspect-[3/4] md:aspect-[3/4]"
              data-delay={String(i + 1)}
            >
              <img
                src={teamPhotos[team.indexOf(person)]}
                alt={`${person.name}, ${person.role}`}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] brightness-95 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/70 tabular-nums">
                {String(i + 1).padStart(2, "0")} / {person.city}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3
                  className="text-white font-medium tracking-[-0.015em] leading-[1.05]"
                  style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)" }}
                >
                  {person.name}
                </h3>
                <p className="mt-1.5 text-[12px] text-white/65">
                  {person.role}
                </p>
              </div>
            </a>
          ))}
        </div>
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
                    x: offset * 28,
                    y: offset * 14,
                    scale: 1 - offset * 0.06,
                    opacity: offset > 2 ? 0 : 1 - offset * 0.25,
                    zIndex: 10 - offset,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  className="absolute top-0 left-0 w-[220px] md:w-[280px] aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
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
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-white/15 text-white hover:bg-white/5 transition-colors flex items-center justify-center"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-white/15 text-white hover:bg-white/5 transition-colors flex items-center justify-center"
              >
                →
              </button>
              <div className="ml-4 flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === i ? "w-10 bg-white" : "w-4 bg-white/25"}`}
                  />
                ))}
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
              className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-colors"
            >
              Book an audit
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton
              href="mailto:hello@r-m.studio"
              strength={10}
              className="inline-flex items-center h-12 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              hello@r-m.studio
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
function Footer() {
  return (
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
  );
}
