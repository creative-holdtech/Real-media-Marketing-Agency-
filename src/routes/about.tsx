import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { Reveal, TiltCard } from "@/components/motion-bits";
import { useReveal } from "@/hooks/use-reveal";

import teamRm from "@/assets/team-rm.jpg";
import teamAl from "@/assets/team-al.jpg";
import teamSk from "@/assets/team-sk.jpg";
import teamJd from "@/assets/team-jd.jpg";
import heroBloom from "@/assets/hero-bloom.jpg";
import nicheAi from "@/assets/niche-ai.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import nicheB2b from "@/assets/niche-b2b.jpg";

const teamPhotos = [teamRm, teamAl, teamSk, teamJd];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — R-M Studio" },
      {
        name: "description",
        content:
          "R-M is a strategic marketing agency for founders in Fintech, AI SaaS, Cybersecurity, and iGaming. Ten senior experts. No outsourcing.",
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
    blurb:
      "Designs the marks, type and motion that make the work unmistakable in feed, deck and product.",
    photo: teamSk,
  },
  {
    initials: "JD",
    name: "J. Dovgan",
    role: "Brand Designer",
    spec: "Identity · Motion",
    city: "Lisbon",
    blurb:
      "Designs the marks, type and motion that make the work unmistakable in feed, deck and product.",
    photo: teamJd,
  },
];

const verticals = [
  {
    n: "01",
    title: "AI SaaS",
    body: "Positioning, pricing models, launch execution for AI-native software to capture early category authority.",
    img: nicheAi,
  },
  {
    n: "02",
    title: "Fintech + Web3",
    body: "Brand architecture, positioning, growth infrastructure for regulated finance and web3 protocols to secure user conviction.",
    img: nicheFintech,
  },
  {
    n: "03",
    title: "Cybersecurity",
    body: "Positioning, category strategy, demand generation for DevSecOps and security tools to scale enterprise pipeline.",
    img: nicheHospitality,
  },
  {
    n: "04",
    title: "iGaming",
    body: "Brand architecture, acquisition strategy, retention infrastructure for entertainment and gaming platforms to maximize user LTV.",
    img: nicheB2b,
  },
];

const numbers = [
  {
    value: "€10M",
    label: "Raised by founder teams we positioned and packaged.",
    tag: "Capital raised 2025—2026",
  },
  {
    value: "50",
    label: "End-to-end identity + GTM, since 2025.",
    tag: "Projects shipped",
  },
  {
    value: "92%",
    label: "On year and beyond.",
    tag: "Retention",
  },
  {
    value: "2y",
    label: "Independent.",
    tag: "Operating",
  },
];

/* ------------------------------------------------------------------ */
/*  SPLIT REVEAL                                                       */
/* ------------------------------------------------------------------ */
function SplitReveal({
  children,
  className,
  delay = 0,
  wordDelay = 0.045,
}: {
  children: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}) {
  const words = children.split(" ");
  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "0.4em", filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ duration: 0.65, delay: delay + i * wordDelay, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

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

  return (
    <div className="rm-page bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader variant="dark" />

      <main id="main">
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
          title="Time to align your marketing with your cap table."
          titleAccent=""
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
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const imgRef = useRef<HTMLDivElement>(null);
  const imgMouseX = useMotionValue(0);
  const imgMouseY = useMotionValue(0);
  const imgSpringX = useSpring(imgMouseX, { stiffness: 40, damping: 20 });
  const imgSpringY = useSpring(imgMouseY, { stiffness: 40, damping: 20 });
  const imgRotateX = useTransform(imgSpringY, v => -v * 0.5);
  const imgRotateY = useTransform(imgSpringX, v => v * 0.5);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${springX}px ${springY}px, rgba(215,170,80,0.1) 0%, transparent 70%)`;

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    const imgRect = imgRef.current?.getBoundingClientRect();
    if (imgRect) {
      imgMouseX.set(((e.clientX - imgRect.left) / imgRect.width - 0.5) * 12);
      imgMouseY.set(((e.clientY - imgRect.top) / imgRect.height - 0.5) * 8);
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      aria-labelledby="page-title"
      className="relative overflow-hidden border-b border-white/10 px-5 md:px-10 pt-[200px] pb-20 md:pt-[280px] md:pb-28"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: spotlight }}
      />
      <div className="relative z-20 max-w-[1520px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 items-end">
          <div className="md:col-span-1">
            <Reveal>
              <Tag>R—M marketing agency · est. 2025</Tag>
            </Reveal>
          </div>
          <div className="md:col-span-2 flex flex-col gap-8">
            <h1
              id="page-title"
              className="text-[64px] md:text-[120px] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
            >
              <SplitReveal wordDelay={0.05}>Strategic partnership</SplitReveal>
              <br />
              <span className="font-normal text-white/40">
                <SplitReveal delay={0.25} wordDelay={0.04}>for founders who build to scale</SplitReveal>
              </span>
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
              <Reveal delay={0.4}>
                <p className="text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/60 max-w-[480px]">
                  A focused team for Fintech, AI SaaS, Cybersecurity, and iGaming. 10 senior experts.
                  No outsourcing.
                </p>
              </Reveal>
              <Reveal delay={0.55}>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    to="/audit"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-white rounded-full px-6 py-3 hover:bg-white/85 transition-colors duration-200"
                  >
                    Book free audit →
                  </Link>
                  <a
                    href="#verticals"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                  >
                    Our core areas
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal delay={0.3} y={24}>
          <div
            ref={imgRef}
            className="mt-20 md:mt-28 w-full h-[480px] md:h-[640px] rounded-2xl overflow-hidden"
            style={{ perspective: 1000 }}
          >
            <motion.img
              src={heroBloom}
              alt=""
              className="w-full h-full object-cover"
              style={{
                rotateX: imgRotateX,
                rotateY: imgRotateY,
                scale: 1.04,
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  NUMBERS                                                            */
/* ================================================================== */
function NumbersSection() {
  return (
    <section
      aria-labelledby="numbers-heading"
      className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40"
    >
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
              Ten years.{" "}
              <span className="text-white/40 font-normal">Compounded across founder teams.</span>
            </h2>
            <p
              className="reveal text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/55 max-w-[48ch]"
              data-delay="1"
            >
              Numbers that describe the agency better than any deck slide.
            </p>
          </div>
        </div>

        {/* Number tiles — white cards on dark bg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-1">
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
                {n.tag}
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
const manifestoLines = [
  "We're not a hands-off vendor.",
  "But an extension of your team, wired into market context.",
  "We killed the generic agency layers to ship execution focused on the outcomes that show up on your cap table.",
];

function ManifestoSection() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>The position</Tag>
            <h2 id="manifesto-heading" className="sr-only">
              Manifesto
            </h2>
          </div>
          <p className="md:col-span-2 text-[28px] md:text-[48px] font-semibold leading-[1.2] tracking-[-0.05em] text-white">
            {manifestoLines.map((line, i) => (
              <motion.span
                key={i}
                className={`block ${i > 0 ? "mt-4" : ""} ${i === manifestoLines.length - 1 ? "text-white/45 font-normal" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
    </section>
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
              className="text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-white max-w-[18ch]"
            >
              <SplitReveal wordDelay={0.06}>Four spaces we lock into.</SplitReveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/55 max-w-[48ch]">
                We go deep where our work compounds.
              </p>
            </Reveal>
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
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/60 tabular-nums">
                      {v.n}
                    </span>
                    <span className="ml-4 text-[18px] font-semibold tracking-[-0.02em] text-white">
                      {v.title}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-opacity duration-300 delay-150"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 tabular-nums">
                    {v.n} · Vertical
                  </span>
                  <div>
                    <h3 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.04em] leading-[1.1] text-white">
                      {v.title}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.65] text-white/80">
                      {v.body}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="md:hidden grid grid-cols-1 gap-3">
          {verticals.map((v) => (
            <div
              key={v.n}
              className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={v.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover saturate-[0.4] brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-[0.32em] text-white/65 tabular-nums">
                  {v.n} · Vertical
                </span>
                <div>
                  <h3 className="text-white text-[24px] font-semibold tracking-[-0.03em] leading-[1.1]">
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
/*  TEAM                                                               */
/* ================================================================== */
function TeamSection() {
  return (
    <section
      aria-labelledby="team-heading"
      className="border-b border-white/10 px-5 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Team</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="team-heading"
              className="text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-white max-w-[20ch]"
            >
              <SplitReveal wordDelay={0.06}>The people who ship the work.</SplitReveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/55 max-w-[48ch]">
                Ten senior operators. Every engagement is led, not delegated.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3">
          {team.map((person, i) => (
            <motion.div
              key={person.initials}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard max={6} className="group bg-white rounded-2xl overflow-hidden h-full">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-[200px] flex-shrink-0 aspect-[4/3] md:aspect-auto md:h-[280px] overflow-hidden bg-neutral-100">
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-7 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-[13px] uppercase tracking-[0.18em] text-neutral-400 mb-3">
                        {person.city} · {person.spec}
                      </p>
                      <p className="text-[15px] leading-[1.65] text-neutral-500 max-w-[38ch]">
                        {person.blurb}
                      </p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-neutral-100">
                      <h3 className="text-[22px] font-semibold tracking-[-0.04em] leading-[1.1] text-neutral-900">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-neutral-400">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
