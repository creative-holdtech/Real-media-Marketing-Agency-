import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";

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
    links: [],
  }),
  component: AboutPage,
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const team = [
  {
    initials: "RM",
    name: "R. Mirza",
    role: "Founder · Strategy",
    spec: "Positioning · GTM",
    city: "Kyiv",
    blurb:
      "Founder-led strategy and positioning. Twelve years turning ambiguous markets into sharp, defensible narratives.",
    photo: teamRm,
  },
  {
    initials: "AL",
    name: "A. Levchenko",
    role: "Creative Director",
    spec: "Brand systems",
    city: "Berlin",
    blurb:
      "Brand systems with operational teeth. Identity, art direction and motion built to scale across every surface.",
    photo: teamAl,
  },
  {
    initials: "SK",
    name: "S. Karim",
    role: "Performance Lead",
    spec: "Paid · Lifecycle",
    city: "Dubai",
    blurb: "Designs the marks, type and motion that make the work unmistakable in feed, deck and product.",
    photo: teamSk,
  },
  {
    initials: "JD",
    name: "J. Dovgan",
    role: "Brand Designer",
    spec: "Identity · Motion",
    city: "Lisbon",
    blurb: "Designs the marks, type and motion that make the work unmistakable in feed, deck and product.",
    photo: teamJd,
  },
];

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
    img: "https://picsum.photos/seed/rm-vertical-restaurant-11/1200/1600",
  },
  {
    n: "04",
    title: "B2B Platforms",
    body: "Repositioning legacy B2B and enterprise platforms into sharper, founder-grade narratives.",
    img: "https://picsum.photos/seed/rm-vertical-office-22/1200/1600",
  },
];

const numbers = [
  { value: "€280M+", label: "Capital raised by founder teams we positioned, across seed to Series B." },
  { value: "47", label: "End-to-end brands shipped since 2019." },
  { value: "92%", label: "Retention on year two and beyond." },
];

/* ------------------------------------------------------------------ */
/*  TAG                                                                */
/* ------------------------------------------------------------------ */
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/20 rounded-full px-4 py-1.5">
      {children}
    </span>
  );
}

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
    <div className="rm-page bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader variant="dark" />

      <main id="main">
        {/* ===== TICKER ===== */}
        <div className="marquee overflow-hidden border-b border-white/10 pt-24 md:pt-28" aria-hidden>
          <div className="marquee-track flex gap-12 whitespace-nowrap py-4 text-[11px] uppercase tracking-[0.28em] text-white/40">
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w}
                <span className="inline-block w-1 h-1 rounded-full bg-white/25" />
              </span>
            ))}
          </div>
        </div>

        {/* ===== HERO ===== */}
        <HeroSection />

        {/* ===== NUMBERS ===== */}
        <NumbersSection />

        {/* ===== MANIFESTO ===== */}
        <ManifestoSection />

        {/* ===== VERTICALS ===== */}
        <VerticalsSection />

        {/* ===== TEAM ===== */}
        <TeamSection />

        {/* ===== CTA ===== */}
        <UnifiedCTA
          eyebrow="The conversation starts here"
          title="Let's build something"
          titleAccent="that compounds."
          primaryLabel="Book a call"
          primaryTo="/contact"
          secondaryLabel="See case studies"
        />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function HeroSection() {
  return (
    <section
      aria-labelledby="page-title"
      className="border-b border-white/10 px-5 md:px-10 pt-[200px] pb-20 md:pt-[280px] md:pb-28"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 items-end">
          <div className="md:col-span-1" />
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <h1
                id="page-title"
                className="reveal text-[64px] md:text-[120px] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
              >
                A small studio
                <br />
                <span className="text-white/40 font-normal">for founders who actually ship.</span>
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
              <p className="reveal text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/60 max-w-[480px]" data-delay="1">
                Senior strategy, brand and growth for operators in AI, Fintech, Web3 and lifestyle.
                Four people. No juniors, no subcontractors.
              </p>
              <div className="reveal flex items-center gap-3 flex-wrap" data-delay="2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-white rounded-full px-6 py-3 hover:bg-white/85 transition-colors duration-200"
                >
                  Book an audit →
                </Link>
                <a
                  href="#verticals"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                >
                  See the verticals
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28 w-full h-[480px] md:h-[640px] rounded-2xl overflow-hidden">
          <img
            src={heroBloom}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  NUMBERS                                                            */
/* ================================================================== */
function NumbersSection() {
  return (
    <section aria-labelledby="numbers-heading" className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>By the numbers</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="numbers-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-white max-w-[18ch]"
            >
              Seven years.{" "}
              <span className="text-white/40 font-normal">Compounded across founder teams.</span>
            </h2>
            <p className="reveal text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/55 max-w-[48ch]" data-delay="1">
              Five numbers that describe the studio better than any deck slide.
            </p>
          </div>
        </div>

        {/* Number tiles — white cards on dark bg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-1">
          {numbers.map((n, i) => (
            <motion.div
              key={n.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0, 0, 1] }}
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[280px]"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
                {i === 0 ? "Capital raised" : i === 1 ? "Brands shipped" : "Retention"}
              </span>
              <div>
                <div className="text-[56px] md:text-[72px] font-semibold tracking-[-0.05em] leading-[0.9] text-neutral-900">
                  {n.value}
                </div>
                <p className="mt-4 text-[14px] leading-[1.6] text-neutral-500 max-w-[32ch]">
                  {n.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  MANIFESTO                                                          */
/* ================================================================== */
function ManifestoSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = [
    "We", "are", "not", "an", "agency.", "We", "are", "four", "operators", "with", "scar",
    "tissue,", "compounding", "the", "same", "playbook", "across", "ambitious", "founders",
    "—", "quietly,", "without", "the", "theatre,", "for", "the", "kind", "of", "outcomes",
    "that", "show", "up", "on", "the", "cap", "table.",
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="manifesto-heading"
      className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>The position</Tag>
            <h2 id="manifesto-heading" className="sr-only">Manifesto</h2>
          </div>
          <p className="md:col-span-2 text-[28px] md:text-[48px] font-semibold leading-[1.15] tracking-[-0.05em] text-white">
            {words.map((w, i) => (
              <ManifestoWord
                key={i}
                word={w}
                index={i}
                total={words.length}
                scrollYProgress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function ManifestoWord({
  word,
  index,
  total,
  scrollYProgress,
  reduce,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.4 / total);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const color = useTransform(scrollYProgress, [start, end], ["rgba(255,255,255,0.15)", "rgba(255,255,255,1)"]);

  return (
    <motion.span style={reduce ? undefined : { color }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

/* ================================================================== */
/*  VERTICALS                                                          */
/* ================================================================== */
function VerticalsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="verticals"
      aria-labelledby="verticals-heading"
      className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Verticals</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="verticals-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-white max-w-[18ch]"
            >
              Four rooms{" "}
              <span className="text-white/40 font-normal">we already know.</span>
            </h2>
            <p className="reveal text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/55 max-w-[48ch]" data-delay="1">
              We don't chase categories. We go deep where our work compounds.
            </p>
          </div>
        </div>

        {/* Desktop accordion */}
        <div className="hidden md:flex h-[520px] gap-2 rounded-2xl overflow-hidden border border-white/10">
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
                    filter: isActive
                      ? "saturate(0.9) brightness(0.85)"
                      : "saturate(0.15) brightness(0.6)",
                    transform: isActive ? "scale(1.02)" : "scale(1.08)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.65) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 flex items-end p-6 transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <div className="-rotate-90 origin-bottom-left translate-y-[-10px] whitespace-nowrap">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/60 tabular-nums">{v.n}</span>
                    <span className="ml-4 text-[18px] font-semibold tracking-[-0.02em] text-white">{v.title}</span>
                  </div>
                </div>
                <div
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-opacity duration-300 delay-150"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 tabular-nums">{v.n} · Vertical</span>
                  <div>
                    <h3 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.04em] leading-[1.1] text-white">
                      {v.title}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.65] text-white/80">{v.body}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="md:hidden grid grid-cols-1 gap-3">
          {verticals.map((v) => (
            <div key={v.n} className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10">
              <img src={v.img} alt="" className="absolute inset-0 w-full h-full object-cover saturate-[0.4] brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 tabular-nums">{v.n} · Vertical</span>
                <div>
                  <h3 className="text-white text-[24px] font-semibold tracking-[-0.03em] leading-[1.1]">{v.title}</h3>
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
/*  TEAM                                                               */
/* ================================================================== */
function TeamSection() {
  return (
    <section aria-labelledby="team-heading" className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Team</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="team-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-white max-w-[20ch]"
            >
              The people who ship the work.
            </h2>
            <p className="reveal text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/55 max-w-[48ch]" data-delay="1">
              Three senior operators. Every engagement is led, not delegated.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3">
          {team.slice(0, 3).map((person, i) => (
            <motion.div
              key={person.initials}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0, 0, 1] }}
              className="group bg-white rounded-2xl overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                  src={person.photo}
                  alt={`${person.name}, ${person.role}`}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-[15px] leading-[1.6] text-neutral-500 mb-4 max-w-[38ch]">
                  {person.blurb}
                </p>
                <h3 className="text-[22px] font-semibold tracking-[-0.04em] leading-[1.1] text-neutral-900">
                  {person.name}
                </h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-neutral-400">
                  {person.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
