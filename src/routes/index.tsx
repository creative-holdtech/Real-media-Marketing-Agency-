import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { InsightsHeroSection } from "@/components/insights-hero-section";
import { PagePreloader } from "@/components/page-preloader";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { posts } from "@/lib/posts";
import heroBg from "@/assets/hero-bg.png";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const trustBrands = [
  "Empresex", "TEQUILA", "WHITEBIT", "CAPITAL.COM",
  "CURRENCY", "POCKET SPACE", "UNIT CITY", "1inch",
];

const stats = [
  { value: "50+", label: "Projects shipped for funded teams" },
  { prefix: "$", value: "10M+", label: "Capital raised by founders we worked with" },
];

const engagements = [
  {
    name: "Sprint",
    time: "From 4 weeks",
    desc: "Fast start for brands that don't want to spend months on planning. We dive straight into execution, taking over your chosen channels from week one.",
    items: [
      { step: "01", label: "Setup", body: "free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)" },
      { step: "02", label: "Run", body: "weekly updates, monthly reports, on-demand analytics and recommendations" },
      { step: "03", label: "Handover", body: "final deliverable with a clear roadmap and 100% asset & content ownership" },
    ],
  },
  {
    name: "Marathon",
    time: "From 2 months",
    desc: "Strategy followed by execution. For brands launching from scratch, rebranding, or entering new markets. We build your positioning and run your marketing channels.",
    items: [
      { step: "01", label: "Strategy", body: "deep-dive workshop, market analysis, brand positioning, and GTM planning" },
      { step: "02", label: "Action", body: "full-scale execution across SMM, PR, SEO, Performance, and active Brand Management" },
      { step: "03", label: "Handover", body: "final brand guidelines, operational channels, 100% asset & content ownership" },
    ],
  },
];

const featuredCases = [
  {
    key: "featured-tequila-cpa-network",
    metric: "+35%",
    label: "Brand growth in 6 mo",
    sector: "CPA Network / Tequila CPA",
    desc: "We built Tequila CPA Network's brand from the ground up, grew their partner base, and hit all key launch targets.",
  },
  {
    key: "featured-currency-exchange",
    metric: "+30 878",
    label: "New accounts created in 6 mo",
    sector: "Cryptocurrency exchange / Currency",
    desc: "We scaled user base across EMEA, Americas, and APAC through 270+ influencer videos across finance, tech, and economics channels.",
  },
];

const insightPosts = posts.slice(0, 3);

/* ------------------------------------------------------------------ */
/*  UTILITIES                                                          */
/* ------------------------------------------------------------------ */
function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) { setInView(true); io.disconnect(); break; } } },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold]);
  return { ref, inView };
}

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setN(target); return; }
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

/* ------------------------------------------------------------------ */
/*  TAG                                                                */
/* ------------------------------------------------------------------ */
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neutral-500 border border-neutral-300 rounded-full px-4 py-1.5">
      {children}
    </span>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
function Index() {
  useReveal();

  return (
    <div className="rm-page selection:bg-neutral-900 selection:text-white">
      <a href="#main" className="skip-link">Skip to content</a>
      <PagePreloader />
      <SiteHeader variant="dark" overlay />

      {/* ===== HERO (keep as-is) ===== */}
      <HeroAtmosphere imageSrc={heroBg} underHeader>
        <section className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]">
          <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-10 pt-2 md:px-12 md:pb-20 md:pt-8">
            <div className="rm-hero-copy mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
              <p className="reveal mb-8 w-fit rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/65">
                R-M marketing agency
              </p>
              <h1 className="reveal w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:text-[58px] lg:text-[64px]">
                <span className="block text-balance">Strategy and</span>
                <span className="block text-balance">execution for</span>
                <span className="block text-balance">founders raising</span>
                <span className="block text-balance font-light text-white/48">in EU and MENA.</span>
              </h1>
              <p className="reveal mt-7 max-w-[34ch] text-balance text-[16px] font-medium leading-[1.45] tracking-[-0.025em] text-white/92 md:text-[18px]" data-delay="2">
                We create market environment where your product becomes the obvious choice.{" "}
                <span className="font-light text-white/45">
                  In the last twelve months our clients raised $10M+, shipped 50 launches, and received industry awards.
                </span>
              </p>
              <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="3">
                <Link to="/contact" className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-[#efeeea] hover:-translate-y-0.5 transition-[background-color,transform] duration-150 ease-out">
                  Start a project →
                </Link>
                <Link to="/cases" className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full border border-white/20 text-white hover:border-white hover:-translate-y-0.5 transition-all duration-300">
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      {/* ===== LIGHT SECTIONS ===== */}
      <main id="main" className="bg-[#f1f1f1]">
        <TrustSection />
        <AboutSection />
        <TestimonialSection />
        <ServicesSection />
        <CasesSection />
        <InsightsHeroSection posts={insightPosts} />
        <UnifiedCTA
          title="Tell us what needs fixing"
          titleAccent="New launch, a raise, or marketing that doesn't perform."
          primaryLabel="Get free audit"
          secondaryLabel="See case studies"
        />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ================================================================== */
/*  TRUST + STATS                                                      */
/* ================================================================== */
function StatTile({ stat, delay, start }: { stat: typeof stats[0]; delay: number; start: boolean }) {
  const num = parseInt(stat.value.replace(/\D/g, ""));
  const count = useCountUp(num, start);
  const display = `${stat.prefix ?? ""}${count}${stat.value.replace(/[0-9]/g, "")}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0, 0, 1] }}
      className="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[220px]"
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">{stat.label}</span>
      <div className="text-[72px] md:text-[96px] font-semibold tracking-[-0.05em] leading-[0.88] text-neutral-900">
        {display}
      </div>
    </motion.div>
  );
}

function TrustSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} aria-label="Trusted partners and key results" className="border-b border-neutral-300 px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16">
        {/* Brands marquee */}
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="marquee">
            <div className="marquee-track flex gap-12 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400 whitespace-nowrap">
              {[...trustBrands, ...trustBrands].map((b, i) => (
                <span key={i} className="flex items-center gap-12">
                  {b}
                  <span className="inline-block w-1 h-1 rounded-full bg-neutral-300" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-1">
          {stats.map((s, i) => (
            <StatTile key={s.label} stat={s} delay={i * 0.1} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ABOUT                                                              */
/* ================================================================== */
function AboutSection() {
  const meta = [
    { k: "Sectors", v: "Fintech · AI SaaS · Cybersecurity · iGaming" },
    { k: "Markets", v: "EU · UK · MENA · GCC" },
    { k: "Our products", v: "Sprint (from 4 weeks) · Marathon (2+ months)" },
    { k: "Reporting", v: "Pipeline and revenue, weekly" },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-neutral-300 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        {/* Tag + heading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>About us</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="about-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-neutral-900"
            >
              We don't{" "}
              <span className="text-neutral-400 font-normal">bring ideas.</span>
              <br />
              We come{" "}
              <span className="text-neutral-400 font-normal">with a </span>
              plan.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="reveal text-[18px] md:text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-neutral-900 max-w-[56ch]" data-delay="1">
                A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming inside out.
              </p>
              <p className="reveal text-[16px] leading-[1.65] tracking-[-0.01em] text-neutral-500 max-w-[56ch]" data-delay="2">
                10 practitioners to make your product seen, trusted, and bought. No corporate layers. Clear deliverables only. Decisions in hours, not weeks. Output you can ship the same day.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200 w-full" />

        {/* Meta grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div />
          <dl className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-0">
            {meta.map((item, i) => (
              <motion.div
                key={item.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0, 0, 1] }}
                className="border-t border-neutral-200 py-6 pr-8"
              >
                <dt className="text-[11px] uppercase tracking-[0.24em] text-neutral-400 mb-2">{item.k}</dt>
                <dd className="text-[15px] font-medium leading-[1.5] tracking-[-0.02em] text-neutral-900">{item.v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  TESTIMONIAL                                                        */
/* ================================================================== */
function TestimonialSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="border-b border-neutral-300 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Testimonials</Tag>
          </div>
          <div className="md:col-span-2">
            <h2 id="testimonials-heading" className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-neutral-900 max-w-[22ch]">
              Our work speaks loudest through the results it creates.
            </h2>
          </div>
        </div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.55, ease: [0.25, 0, 0, 1] }}
          className="bg-white rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <div className="flex flex-col gap-3">
              {/* 5 stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FF3300">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-[13px] uppercase tracking-[0.16em] text-neutral-400 font-semibold">Nikita PR</p>
              <p className="text-[13px] text-neutral-400">FinUp</p>
            </div>

            <blockquote className="md:col-span-2">
              <p className="text-[22px] md:text-[32px] font-semibold leading-[1.2] tracking-[-0.04em] text-neutral-900">
                "Working with Real Media has been an excellent experience for Finup. They are reliable, creative, and always professional in their approach. We're happy to recommend them as a fantastic team to work with."
              </p>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SERVICES (Sprint / Marathon)                                       */
/* ================================================================== */
function ServicesSection() {
  return (
    <section id="engage" aria-labelledby="services-heading" className="border-b border-neutral-300 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        {/* Tag + heading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Services</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="services-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-neutral-900"
            >
              Two ways to work{" "}
              <span className="text-neutral-400 font-normal">with us.</span>
            </h2>
            <p className="reveal text-[18px] md:text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-neutral-500 max-w-[52ch]" data-delay="1">
              Choose the engagement that fits your stage — a focused sprint or a full-scale marathon.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200 w-full" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-1">
          {engagements.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0, 0, 1] }}
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col gap-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.05em] leading-[1.1] text-neutral-900">
                    {e.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-semibold uppercase tracking-widest text-neutral-400">
                    {e.time}
                  </p>
                </div>
                <span className="text-[48px] font-semibold tracking-[-0.05em] leading-[0.9] text-neutral-200 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-[15px] leading-[1.65] text-neutral-500">{e.desc}</p>

              {/* Steps */}
              <div className="flex flex-col gap-0">
                {e.items.map((item, j) => (
                  <div key={item.step} className={`flex gap-5 py-5 ${j > 0 ? "border-t border-neutral-100" : ""}`}>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-300 tabular-nums pt-0.5 w-6 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 mb-1">{item.label}</p>
                      <p className="text-[13px] leading-[1.6] text-neutral-500">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CASES                                                              */
/* ================================================================== */
function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="border-b border-neutral-300 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        {/* Tag + heading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Cases</Tag>
          </div>
          <div className="md:col-span-2">
            <h2
              id="cases-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-neutral-900"
            >
              Results we{" "}
              <span className="text-neutral-400 font-normal">deliver.</span>
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200 w-full" />

        {/* Case rows */}
        <div className="flex flex-col">
          {featuredCases.map((c, i) => {
            const industry = c.sector.split("/")[0]?.trim() ?? c.sector;
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0, 0, 1] }}
                className={i > 0 ? "border-t border-neutral-200" : ""}
              >
                <Link to="/cases" aria-label={`View case: ${c.sector}`} className="group block py-10 md:py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
                    {/* Left: metric */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400 mb-3">
                        {String(i + 1).padStart(2, "0")} · {industry}
                      </p>
                      <p className="text-[56px] md:text-[72px] font-semibold tracking-[-0.05em] leading-[0.9] text-neutral-900 tabular-nums">
                        {c.metric}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-neutral-400">{c.label}</p>
                    </div>

                    {/* Right: description */}
                    <div className="md:col-span-2 flex flex-col gap-4 md:justify-end md:pt-16">
                      <p className="text-[15px] leading-[1.65] text-neutral-500 max-w-[52ch]">{c.desc}</p>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
                        Read Case →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="flex justify-start">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 border border-neutral-900 rounded-full px-5 py-2.5 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
          >
            View all cases →
          </Link>
        </div>
      </div>
    </section>
  );
}
