import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { GlassPointsSection } from "@/components/glass-points-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { PagePreloader } from "@/components/page-preloader";
import { UnifiedCTA } from "@/components/unified-cta";
import TestimonialSection from "@/components/ui/testimonials";
import { useReveal } from "@/hooks/use-reveal";
import { posts } from "@/lib/posts";
import heroBg from "@/assets/hero-bg.png";

export const Route = createFileRoute("/")({
  component: Index,
});

type BigStat = {
  prefix?: string;
  to: number;
  suffix?: string;
  label: string;
};

const bigStats: BigStat[] = [
  { to: 50, suffix: "+", label: "Projects shipped for funded teams" },
  { prefix: "$", to: 10, suffix: "M+", label: "Capital raised by founders we worked with" },
];

function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
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
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(target);
      return;
    }
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

function BigStatValue({ stat, start }: { stat: BigStat; start: boolean }) {
  const n = useCountUp(stat.to, start);
  return (
    <>
      {stat.prefix ?? ""}
      {n}
      {stat.suffix ?? ""}
    </>
  );
}

const engagements = [
  {
    name: "Sprint",
    time: "From 4 weeks",
    desc: "Fast start for brands that don't want to spend months on planning. We dive straight into execution, taking over your chosen channels from week one.",
    items: [
      {
        step: "01",
        label: "Setup",
        body: "free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)",
      },
      {
        step: "02",
        label: "Run",
        body: "weekly updates, monthly reports, on-demand analytics and recommendations",
      },
      {
        step: "03",
        label: "Handover",
        body: "final deliverable with a clear roadmap and 100% asset & content ownership",
      },
    ],
  },
  {
    name: "Marathon",
    time: "From 2 months",
    desc: "Strategy followed by execution. For brands launching from scratch, rebranding, or entering new markets. We build your positioning and run your marketing channels.",
    items: [
      {
        step: "01",
        label: "Strategy",
        body: "deep-dive workshop, market analysis, brand positioning, and GTM planning",
      },
      {
        step: "02",
        label: "Execution",
        body: "full-scale execution across SMM, PR, SEO, Performance, and active Brand Management",
      },
      {
        step: "03",
        label: "Handover",
        body: "final brand guidelines, operational channels, 100% asset & content ownership",
      },
    ],
  },
];

const insightPosts = posts.slice(0, 3);

function formatJournalMeta(category: string, date: string, read: string) {
  return `${category.toUpperCase()} · ${date.toUpperCase()} · ${read.toUpperCase()}`;
}
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

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">Skip to content</a>
      <AmbientBlobs />
      <PagePreloader />

      <HeroAtmosphere imageSrc={heroBg}>
        <SiteHeader variant="dark" overlay />

      {/* HERO */}
      <section className="relative z-10 flex flex-1 items-center">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-14 pt-4 md:px-12 md:pb-20 md:pt-8">
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
            <p
              className="reveal mt-7 max-w-[34ch] text-balance text-[16px] font-medium leading-[1.45] tracking-[-0.025em] text-white/92 md:text-[18px]"
              data-delay="2"
            >
              We create market environment where your product becomes the obvious choice.{" "}
              <span className="font-light text-white/45">
                In the last twelve months our clients raised $10M+, shipped 50 launches, and received
                industry awards.
              </span>
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center justify-center gap-3"
              data-delay="3"
            >
              <Link
                to="/contact"
                className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-[#efeeea] hover:-translate-y-0.5 transition-[background-color,transform] duration-150 ease-out"
              >
                Start a project →
              </Link>
              <Link
                to="/cases"
                className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full border border-white/20 text-white hover:border-white hover:-translate-y-0.5 transition-all duration-300"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>
      </HeroAtmosphere>

      <main id="main">

      {/* TRUST + STATS — one screen */}
      <TrustStatsScreen />

      {/* STUDIO — tight container, generous side padding, aligned grid */}
      <section
        id="about"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          <p className="reveal text-[11px] uppercase tracking-[0.24em] text-white/45">
            Marketing agency
          </p>

          {/* Ladder headline — contained, percent-based cascade */}
          <h2
            className="reveal mt-14 font-medium leading-[0.92] tracking-[-0.04em] text-white md:mt-20"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            <span className="block">We don't</span>
            <span className="block pl-[12%] font-light text-white/55">bring ideas.</span>
            <span className="block pl-[4%]">We come</span>
            <span className="block pl-[20%] font-light text-white/55">
              with a <span className="font-medium text-white">plan.</span>
            </span>
          </h2>

          {/* Body + meta — aligned 7/5 grid, no gap column */}
          <div className="mt-16 grid grid-cols-12 gap-x-0 md:gap-x-10 gap-y-12 md:mt-24">
            <div className="reveal col-span-12 md:col-span-7" data-delay="1">
              <p className="mt-6 w-full md:max-w-[58ch] text-[18px] font-medium leading-[1.5] tracking-[-0.015em] text-white">
                A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming
                inside out.
              </p>
              <p className="mt-4 w-full md:max-w-[58ch] text-[16px] leading-[1.65] tracking-[-0.01em] text-white/60">
                10 practitioners to make your product seen, trusted, and bought. No corporate
                layers. Clear deliverables only. Decisions in hours, not weeks. Output you can ship
                the same day.
              </p>
            </div>

            <dl className="reveal col-span-12 md:col-span-5 min-w-0" data-delay="2">
              {[
                { k: "Sectors", v: "Fintech · AI SaaS · Cybersecurity · iGaming" },
                { k: "Markets", v: "EU · UK · MENA · GCC" },
                { k: "Our products", v: "Sprint (from 4 weeks) · Marathon (2+ months)" },
                { k: "Reporting", v: "Pipeline and revenue, weekly" },
              ].map((item, i) => (
                <div
                  key={item.k}
                  className="grid grid-cols-[auto_1fr] gap-x-6 py-4"
                  data-delay={String(i + 1)}
                >
                  <dt className="w-24 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {item.k}
                  </dt>
                  <dd className="text-[15px] leading-[1.4] tracking-[-0.01em] text-white">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* ENGAGE — Ciridae-style glass cards over sticky background */}
      <GlassPointsSection
        id="engage"
        headline={
          <>
            Two ways to work with us.{" "}
            <span className="text-white/55">
              Both end in <span className="font-medium text-white">shipped revenue.</span>
            </span>
          </>
        }
        cards={engagements.map((e, i) => ({
          index: String(i + 1).padStart(2, "0"),
          title: e.name.toUpperCase(),
          subtitle: e.time,
          description: e.desc,
          steps: e.items,
        }))}
      />

      {/* CASES — metric-led index with clear hierarchy */}
      <section
        id="cases"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          <header className="reveal max-w-[16ch]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
              Selected case studies
            </p>
            <h2
              className="mt-4 font-medium leading-[0.95] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              <span className="block">Results we</span>
              <span className="block text-white/50">deliver.</span>
            </h2>
          </header>

          <ul className="mt-12 flex flex-col md:mt-16">
            {featuredCases.map((c, i) => {
              const industry = c.sector.split("/")[0]?.trim() ?? c.sector;
              return (
                <li
                  key={c.key}
                  className="reveal border-t border-white/10 py-12 first:border-t-0 first:pt-0 md:py-16"
                  data-delay={String(i + 1)}
                >
                  <Link
                    to="/cases"
                    aria-label={`View case: ${c.sector}`}
                    className="group block"
                  >
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.24em] text-white/45">
                      <span className="tabular-nums text-white/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{industry}</span>
                    </p>

                    <div className="mt-6 grid grid-cols-12 items-start gap-x-8 gap-y-6 md:mt-8 md:gap-x-12">
                      <div className="col-span-12 md:col-span-7">
                        <p
                          className="font-medium leading-[0.88] tracking-[-0.04em] tabular-nums text-white"
                          style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
                        >
                          {c.metric}
                        </p>
                        <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-white/45">
                          {c.label}
                        </p>
                      </div>

                      <div className="col-span-12 flex flex-col gap-4 md:col-span-5 md:gap-5">
                        <p className="max-w-[45ch] text-[15px] leading-[1.65] text-white/60 md:text-base">
                          {c.desc}
                        </p>
                        <span className="text-[11px] uppercase tracking-[0.24em] text-white/45 transition-colors group-hover:text-white/75">
                          Read case →
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="reveal mt-12 flex justify-center border-t border-white/10 pt-8 md:mt-16 md:pt-10" data-delay="3">
            <Link
              to="/cases"
              className="inline-flex rm-touch items-center rounded-full border border-white/20 px-6 py-3.5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
            >
              View all cases →
            </Link>
          </div>
        </div>
      </section>

      {/* JOURNAL — matches About/Engage/Cases system */}
      <section
        id="insights"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32"
      >
        <div className="relative mx-auto max-w-[1200px]">
          {/* Headline — italic accent on last word */}
          <h2
            className="reveal max-w-[24ch] font-medium leading-[1.05] tracking-[-0.03em] text-white md:pr-40"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            <span className="font-light text-white/55">This quarter we are writing on </span>
            positioning under pressure, pricing in regulated markets, and why agency reporting{" "}
            <span className="font-light text-white/55">is </span>
            <span className="font-medium text-white">theater.</span>
          </h2>

          {/* Featured + secondary — varied emphasis, magazine spread */}
          <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16 md:gap-x-10">
            {/* Featured — lead story, cols 1-7 */}
            {insightPosts[0] && (
              <article className="reveal col-span-12 md:col-span-7">
                <Link
                  to="/blog/$slug"
                  params={{ slug: insightPosts[0].slug }}
                  aria-label={`Read article: ${insightPosts[0].title}`}
                  className="group block"
                >
                  <figure className="relative aspect-[4/3] overflow-hidden transition-colors duration-500">
                    <img
                      src={insightPosts[0].image}
                      alt={`Cover image for: ${insightPosts[0].title}`}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </figure>

                  <div className="mt-8 text-[11px] uppercase tracking-[0.24em] text-white/45">
                    {formatJournalMeta(
                      insightPosts[0].category,
                      insightPosts[0].date,
                      insightPosts[0].read,
                    )}
                  </div>

                  <h3
                    className="mt-5 max-w-[20ch] font-medium leading-[1.05] tracking-[-0.025em] text-white"
                    style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
                  >
                    {insightPosts[0].title}
                  </h3>
                </Link>
              </article>
            )}

            {/* Secondary — cols 8-12, stacked compact rows */}
            {insightPosts.length > 1 && <div className="col-span-12 flex flex-col divide-y divide-white/15 md:col-span-5">
              {insightPosts.slice(1).map((p) => (
                  <article
                    key={p.slug}
                    className="reveal"
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`Read article: ${p.title}`}
                      className="group block py-7 transition-colors duration-300 hover:bg-white/[0.025] md:py-9"
                    >
                      <div className="flex flex-col gap-3">
                        <h3 className="text-[17px] font-medium leading-[1.25] tracking-[-0.015em] text-white md:text-[19px]">
                          {p.title}
                        </h3>
                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                          {formatJournalMeta(p.category, p.date, p.read)}
                        </div>
                      </div>
                    </Link>
                  </article>
              ))}
            </div>}
          </div>

          <div className="reveal mt-12 flex justify-center border-t border-white/10 pt-8 md:mt-16 md:pt-10">
            <Link
              to="/blog"
              className="inline-flex rm-touch items-center rounded-full border border-white/20 px-6 py-3.5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
            >
              All articles →
            </Link>
          </div>
        </div>
      </section>

      <UnifiedCTA
        title="Tell us what needs fixing"
        titleAccent="New launch, a raise, or marketing that doesn't perform."
      />

      </main>
      <SiteFooter />
    </div>
  );
}

const trustBrands = [
  "Empresex",
  "TEQUILA",
  "WHITEBIT",
  "CAPITAL.COM",
  "CURRENCY",
  "POCKET SPACE",
  "UNIT CITY",
  "1inch",
];

function TrustStatsScreen() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-label="Trusted partners and key results"
      className="rm-trust-stats px-6 sm:px-10 md:px-20 lg:px-32"
    >
      <div className="rm-trust-stats__inner mx-auto w-full max-w-[1200px]">
        <div className="rm-trust-stats__marquee-wrap">
          <p className="rm-trust-stats__kicker reveal">Trusted by teams at</p>
          <div className="rm-trust-stats__marquee reveal" data-delay="1">
            <div
              className="marquee relative w-full overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div className="marquee-track flex w-max items-center">
                {Array.from({ length: 2 }).flatMap((_, dup) =>
                  trustBrands.map((b) => (
                    <span
                      key={`${dup}-${b}`}
                      aria-hidden={dup === 1}
                      className="whitespace-nowrap"
                    >
                      {b}
                    </span>
                  )),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rm-trust-stats__stats">
          {bigStats.map((s, i) => (
            <div key={s.label} className="reveal" data-delay={String(i + 2)}>
              <p className="rm-trust-stats__stat-value">
                <BigStatValue stat={s} start={inView} />
              </p>
              <p className="rm-trust-stats__stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
