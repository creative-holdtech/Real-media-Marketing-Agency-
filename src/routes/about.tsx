import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import heroBg from "@/assets/hero-bg.png";
import { AboutStatsSection } from "@/components/about-stats-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { MarketingSection, MarketingTagColumn } from "@/components/marketing-section";
import { ManifestoQuoteSection } from "@/components/ui/testimonials";
import { TeamSection } from "@/components/team-section";
import { PagePreloader } from "@/components/page-preloader";
import {
  bodyCopy,
  bodyCopyStrong,
  btnOutline,
  btnPrimary,
  FramerTag,
  pageHeroContainer,
  sectionGap,
  sectionHeaderContent,
  sectionHeaderGrid,
  sectionHeadline,
  sectionInnerStack,
  surfaceCardTitle,
  textCardBody,
  textMeta,
} from "@/components/framer-section";
import { SurfaceCard } from "@/components/surface-card";
import { TextReveal } from "@/components/text-reveal";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import nicheAi from "@/assets/niche-ai.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import nicheB2b from "@/assets/niche-b2b.jpg";

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
    links: [{ rel: "preload", as: "image", href: heroBg, fetchPriority: "high" }],
  }),
  component: AboutPage,
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
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

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
function AboutPage() {
  useReveal();

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />
      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere imageSrc={heroBg} underHeader>
        <section
          aria-labelledby="page-title"
          className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]"
        >
          <div className={pageHeroContainer}>
            <div className="rm-hero-copy mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
              <p className="reveal mb-8 w-fit">
                <FramerTag>R—M marketing agency · est. 2025</FramerTag>
              </p>
              <h1
                id="page-title"
                className="reveal w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:text-[58px] lg:text-[64px]"
              >
                <span className="block text-balance">Strategic partnership</span>
                <span className="block text-balance">for founders who build to scale</span>
              </h1>
              <p
                className={cn(
                  "reveal mt-7 max-w-[34ch] text-balance text-center",
                  bodyCopyStrong,
                )}
                data-delay="2"
              >
                A focused team for Fintech, AI SaaS, Cybersecurity, and iGaming. 10 senior
                experts. No outsourcing.
              </p>
              <div
                className="reveal mt-10 flex flex-wrap items-center justify-center gap-4"
                data-delay="3"
              >
                <Link to="/audit" className={btnPrimary}>
                  Book free audit →
                </Link>
                <a href="#verticals" className={btnOutline}>
                  Our core areas
                </a>
              </div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        <AboutStatsSection />

        <div className="rm-defer-paint">
          <ManifestoSection />
        </div>

        <div className="rm-defer-paint">
          <VerticalsSection />
        </div>

        <div className="rm-defer-paint">
          <TeamSection />
        </div>

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
/*  MANIFESTO                                                          */
/* ================================================================== */
const manifestoThesis = "We're not a hands-off vendor.";

const manifestoBullets = [
  "But an extension of your team, wired into market context.",
  "We killed the generic agency layers to ship execution focused on the outcomes that show up on your cap table.",
] as const;

function ManifestoSection() {
  return (
    <ManifestoQuoteSection
      tag="The position"
      titleId="manifesto-heading"
      srTitle="Manifesto"
      thesis={manifestoThesis}
      bullets={manifestoBullets}
    />
  );
}

/* ================================================================== */
/*  VERTICALS                                                          */
/* ================================================================== */
function VerticalsSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const sector = verticals[active];

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next = (index + 1) % verticals.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      next = (index - 1 + verticals.length) % verticals.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = verticals.length - 1;
    } else {
      return;
    }
    setActive(next);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  }, []);

  return (
    <MarketingSection id="verticals" ariaLabelledBy="verticals-heading">
      <div className={cn(sectionHeaderGrid, "md:items-stretch")}>
        <MarketingTagColumn tag="Verticals" chapter="03">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Verticals"
            className="hidden flex-col gap-1 md:flex"
          >
            {verticals.map((v, index) => {
              const selected = index === active;
              return (
                <button
                  key={v.n}
                  type="button"
                  role="tab"
                  id={`${panelId}-tab-${v.n}`}
                  aria-selected={selected}
                  aria-controls={`${panelId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rm-surface-raised",
                    selected
                      ? "border-[var(--rm-border-strong)] bg-[var(--rm-surface-float)] text-[var(--rm-ink)]"
                      : "border-transparent text-[var(--rm-text-muted)] hover:border-[var(--rm-border-soft)] hover:bg-white/[0.03] hover:text-[var(--rm-ink)]",
                  )}
                >
                  <span className={cn("block", textMeta)}>{v.n}</span>
                  <span className="mt-1.5 block text-sm font-medium tracking-[-0.02em]">
                    {v.title}
                  </span>
                </button>
              );
            })}
          </div>
        </MarketingTagColumn>

        <div className={cn("flex flex-col md:col-span-2", "gap-8 md:gap-12")}>
          <div className={sectionInnerStack}>
            <h2 id="verticals-heading" className="sr-only">
              Verticals
            </h2>
            <TextReveal text="Four spaces we lock into." className={sectionHeadline} />
            <p className={cn(bodyCopy, "reveal")} data-delay="1">
              We go deep where our work compounds.
            </p>
          </div>

          <div
            role="tabpanel"
            id={`${panelId}-panel`}
            aria-labelledby={`${panelId}-tab-${sector.n}`}
            className="relative hidden min-h-[360px] overflow-hidden rounded-2xl border border-[var(--rm-border-soft)] md:block"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={sector.n}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="absolute inset-0"
              >
                <img
                  src={sector.img}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <span className={cn(textMeta, "text-white/60")}>
                    {sector.n} · Vertical
                  </span>
                  <div>
                    <h3 className={cn(sectionHeadline, "max-w-none text-white")}>
                      {sector.title}
                    </h3>
                    <p className={cn(bodyCopy, "mt-4 max-w-[44ch] text-white/75")}>
                      {sector.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 md:hidden snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {verticals.map((v) => (
            <article
              key={v.n}
              className="relative h-[280px] w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-2xl border border-[var(--rm-border-soft)]"
            >
              <img
                src={v.img}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover saturate-[0.4] brightness-90"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <span className={cn(textMeta, "text-white/60")}>
                  {v.n} · Vertical
                </span>
                <div>
                  <h3 className={cn(surfaceCardTitle, "text-white")}>{v.title}</h3>
                  <p className={cn(textCardBody, "mt-3 text-white/75")}>{v.body}</p>
                </div>
              </div>
            </article>
          ))}
      </div>
    </MarketingSection>
  );
}
