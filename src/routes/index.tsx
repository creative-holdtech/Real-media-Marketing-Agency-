import { lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";

import {
  BtnArrow,
  btnOutlineOnDark,
  btnPrimary,
  heroHeadlineLead,
  heroIntroStack,
  pageHeroContainer,
  sectionHeroActionsRow,
  siteChromeBand,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";
import { AboutSection } from "@/components/about-section";
import { CasesSection } from "@/components/cases-section";
import { ServicesSection } from "@/components/services-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { PagePreloader } from "@/components/page-preloader";
import { SectionShellSkeleton } from "@/components/section-shell-skeleton";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import TestimonialSection from "@/components/ui/testimonials";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { posts } from "@/lib/posts";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";
import heroBg from "@/assets/hero-bg.png";

const InsightsHeroSection = lazy(() =>
  import("@/components/insights-hero-section").then((m) => ({ default: m.InsightsHeroSection })),
);

export const Route = createFileRoute("/")({
  loader: async () => ({
    page: await getPageContent("home"),
  }),
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = page?.metaTitle ?? "R-M — Marketing Agency";
    const description =
      page?.metaDescription ?? "R-M is a marketing agency for founders building in EU and MENA.";
    const seo = buildPageHead({ title, description, pathname: "/" });
    return {
      meta: seo.meta,
      links: [
        ...seo.links,
        { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" },
      ],
    };
  },
  component: Index,
});

const insightPosts = posts;

/* ——— Hero entrance choreography (Motion) ——— */
const HERO_EASE = [0.22, 1, 0.36, 1] as const;

const heroStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const heroFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: HERO_EASE } },
};
const heroRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: HERO_EASE } },
};
const heroLineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: HERO_EASE } },
};
// Headline rises line-by-line with a brief de-blur — the premium "settle".
const heroTitle: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(7px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: HERO_EASE } },
};

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
  const reduce = useReducedMotion();
  const { page } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const titleLines = hero?.titleLines ?? [];

  return (
    <div className="rm-page rm-home selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />

      <SiteHeader variant="dark" overlay />

      {/* HERO — full-bleed photo, centered editorial copy */}
      <HeroAtmosphere imageSrc={hero?.image || heroBg} underHeader>
        <section
          aria-labelledby="home-hero-title"
          className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]"
        >
          <div className={siteChromeBand}>
            <div className={pageHeroContainer}>
            <motion.div
              className="rm-hero-copy mx-auto flex w-full max-w-[36rem] flex-col items-center text-center"
              variants={heroStage}
              initial={reduce ? false : "hidden"}
              animate="show"
            >
              <div className={cn(heroIntroStack, "w-full")}>
              {hero?.tag ? (
                <motion.p className="flex items-center justify-center gap-3" variants={heroFade}>
                  <motion.span
                    aria-hidden
                    className="h-px w-12 shrink-0 origin-center bg-white/60"
                    variants={heroLineDraw}
                  />
                  <span className="rm-type-meta text-[var(--rm-text-body)]">{hero.tag}</span>
                  <motion.span
                    aria-hidden
                    className="h-px w-12 shrink-0 origin-center bg-white/60"
                    variants={heroLineDraw}
                  />
                </motion.p>
              ) : null}
              <div className={heroHeadlineLead}>
              <motion.h1 id="home-hero-title" className="rm-title-hero-lead w-full text-balance" variants={heroTitle}>
                <span className="block">
                  <motion.span className="block" variants={heroTitleLine}>
                    {titleLines[0]}
                  </motion.span>
                </span>
                {titleLines.length > 1 ? (
                  <span className="block">
                    <motion.span className="block rm-type-display-muted" variants={heroTitleLine}>
                      {titleLines.slice(1).join(" ")}
                    </motion.span>
                  </span>
                ) : null}
              </motion.h1>
              {hero?.subheading ? (
                <motion.p className="rm-copy-standfirst mx-auto max-w-[36ch] text-pretty text-balance" variants={heroRise}>
                  {hero.subheading}
                </motion.p>
              ) : null}
              </div>
              </div>

              <motion.div className={cn(sectionHeroActionsRow, "justify-center")} variants={heroRise}>
                {hero?.ctaPrimaryLabel ? (
                  <Link
                    to={hero.ctaPrimaryUrl ?? "/contact"}
                    className={cn(btnPrimary, "group gap-2")}
                  >
                    {hero.ctaPrimaryLabel.replace(/\s*→$/, "")}
                    <BtnArrow />
                  </Link>
                ) : null}
                {hero?.ctaSecondaryLabel ? (
                  <Link
                    to={hero.ctaSecondaryUrl ?? "/cases"}
                    className={cn(btnOutlineOnDark, "group gap-2")}
                  >
                    {hero.ctaSecondaryLabel}
                    <BtnArrow />
                  </Link>
                ) : null}
              </motion.div>
            </motion.div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        <AboutSection page={page} />

        <div className="rm-defer-paint">
          <TestimonialSection />
        </div>

        <div className="rm-defer-paint">
          <ServicesSection />
        </div>

        <div className="rm-defer-paint">
          <CasesSection />
        </div>

        <Suspense
          fallback={
            <div className="rm-defer-paint">
              <SectionShellSkeleton blocks={2} minBlockHeight="320px" />
            </div>
          }
        >
          <div className="rm-defer-paint">
            <InsightsHeroSection posts={insightPosts} />
          </div>
        </Suspense>

        <UnifiedCTA
          title={cta?.title}
          titleAccent={cta?.titleAccent}
          primaryLabel={cta?.primaryLabel}
          primaryTo={cta?.primaryUrl}
          secondaryLabel={cta?.secondaryLabel}
          secondaryTo={cta?.secondaryUrl}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
