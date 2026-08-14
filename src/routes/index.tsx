import { lazy, Suspense, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  BtnArrow,
  FlipLabel,
  btnOutlineOnDark,
  btnPrimary,
  EASE_ENTER,
  heroCopyLayout,
  heroHeadlineLead,
  heroIntroStack,
  heroStandfirst,
  pageHeroContainer,
  sectionHeroActionsRow,
  siteChromeBand,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";
import { AboutSection } from "@/components/about-section";
import { CasesGridSection } from "@/components/cases-grid-section";
import { ServicesSection } from "@/components/services-section";
import { ServicesDisciplinesSection } from "@/components/services-disciplines-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import {
  HeroScrollStage,
  HomeScrollCinema,
  ScrollChapter,
} from "@/components/home-scroll-cinema";
import { CtaContactForm } from "@/components/cta-contact-form";
import { PagePreloader } from "@/components/page-preloader";
import { SectionShellSkeleton } from "@/components/section-shell-skeleton";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import TestimonialSection from "@/components/ui/testimonials";
import { usePreloaderDone } from "@/hooks/use-preloader-done";
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
    contact: await getPageContent("contact"),
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

/* ——— Hero entrance choreography (Motion) —————————————————————————————————
 * HERO_EASE = EASE_ENTER — the sitewide "reveal" curve (same one driving
 * .reveal/.reveal-fade everywhere else), not the sharp hover-snap curve this
 * used to borrow from mdx.so. That curve hangs near 0 for most of its
 * duration then snaps to rest in a short late burst — reads as sharp, not
 * fluid. EASE_ENTER accelerates out immediately and decelerates smoothly the
 * whole way to rest, so every element (fade, line-draw, title de-blur, rise)
 * glides continuously instead of "hanging then popping". Durations are a
 * touch longer than before for the same reason — a smooth curve needs a
 * little more time to read as smooth rather than merely quick. */
const HERO_EASE = EASE_ENTER;

const HERO_STAGE_DELAY_CHILDREN = 0.15;
const HERO_STAGE_STAGGER = 0.09;
const HERO_TITLE_STAGGER = 0.1;
const HERO_TITLE_LINE_DURATION = 0.75;

const heroStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: HERO_STAGE_STAGGER, delayChildren: HERO_STAGE_DELAY_CHILDREN } },
};
const heroFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: HERO_EASE } },
};
const heroLineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: HERO_EASE } },
};
// Headline rises line-by-line with a brief de-blur — the premium "settle".
const heroTitle: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: HERO_TITLE_STAGGER } },
};
const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: HERO_TITLE_LINE_DURATION, ease: HERO_EASE },
  },
};

/** Standfirst + actions start shortly after the LAST title line begins (not
 * after it fully settles) — a deliberate cascade/overlap, not a serial
 * wait-then-wait-then-wait queue. heroStage's staggerChildren only staggers
 * direct children's START times; it has no idea the title (a child with its
 * OWN nested per-line stagger) starts its last line later when it has 2
 * lines instead of 1. Left on `variants={heroRise}` (propagation), the
 * standfirst used to fire on a fixed stagger step that could land BEFORE the
 * last title line even started — reads as "wrong order". Waiting for the
 * line to fully finish first fixed that but made the whole reveal feel
 * serial/slow; starting just after it begins keeps the cascade fast while
 * still guaranteeing correct order regardless of headline length. */
function heroBodyDelay(titleLineCount: number) {
  const lastLineIndex = Math.max(0, Math.min(titleLineCount, 2) - 1);
  const titleStart = HERO_STAGE_DELAY_CHILDREN + HERO_STAGE_STAGGER;
  const lastLineStart = titleStart + lastLineIndex * HERO_TITLE_STAGGER;
  return lastLineStart + 0.18;
}
const heroRiseHidden = { opacity: 0, y: 22 };
const heroRiseShow = { opacity: 1, y: 0 };

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
  const heroReady = usePreloaderDone();
  const heroRef = useRef<HTMLElement>(null);
  const { page, contact } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const titleLines = hero?.titleLines ?? [];

  return (
    <div className="rm-page rm-home selection:bg-[#90471B] selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <HomeScrollCinema />
      <PagePreloader />

      <SiteHeader variant="dark" overlay />

      {/* HERO — full-bleed photo, centered editorial copy */}
      <HeroAtmosphere imageSrc={hero?.image || heroBg} underHeader>
        <section
          ref={heroRef}
          aria-labelledby="home-hero-title"
          className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]"
        >
          <div className={siteChromeBand}>
            <div className={pageHeroContainer}>
            <HeroScrollStage heroRef={heroRef} className={heroCopyLayout}>
            <motion.div
              variants={heroStage}
              initial={reduce ? false : "hidden"}
              animate={heroReady ? "show" : "hidden"}
            >
              <div className={heroIntroStack}>
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
              <motion.h1
                id="home-hero-title"
                className="rm-title-hero-lead w-full text-balance -mt-4 md:-mt-[22px]"
                variants={heroTitle}
              >
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
                <motion.p
                  className={cn(heroStandfirst, "-mt-0.5")}
                  initial={reduce ? false : heroRiseHidden}
                  animate={heroReady ? heroRiseShow : heroRiseHidden}
                  transition={{ duration: 0.65, ease: HERO_EASE, delay: heroBodyDelay(titleLines.length) }}
                >
                  {hero.subheading}
                </motion.p>
              ) : null}
              </div>
              </div>

              <motion.div
                className={cn(sectionHeroActionsRow, "justify-center")}
                initial={reduce ? false : heroRiseHidden}
                animate={heroReady ? heroRiseShow : heroRiseHidden}
                transition={{ duration: 0.6, ease: HERO_EASE, delay: heroBodyDelay(titleLines.length) }}
              >
                {hero?.ctaPrimaryLabel ? (
                  <Link
                    to={hero.ctaPrimaryUrl ?? "/contact"}
                    className={cn(btnPrimary, "group gap-2")}
                    aria-label={hero.ctaPrimaryLabel.replace(/\s*→$/, "")}
                  >
                    <FlipLabel text={hero.ctaPrimaryLabel.replace(/\s*→$/, "")} />
                    <BtnArrow />
                  </Link>
                ) : null}
                {hero?.ctaSecondaryLabel ? (
                  <Link
                    to={hero.ctaSecondaryUrl ?? "/cases"}
                    className={cn(btnOutlineOnDark, "group gap-2")}
                    aria-label={hero.ctaSecondaryLabel}
                  >
                    <FlipLabel text={hero.ctaSecondaryLabel} />
                    <BtnArrow />
                  </Link>
                ) : null}
              </motion.div>
            </motion.div>
            </HeroScrollStage>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        <ScrollChapter variant="reveal">
          <AboutSection page={page} />
        </ScrollChapter>

        <div className="rm-defer-paint">
          {/* variant="plain" — TestimonialSection now drives its own once-triggered
              entrance (tag/accent/quote/attribution), so ScrollChapter's continuous
              scroll-scrubbed "reveal" wrapper would double-animate the same content
              with a different, non-once mechanic. */}
          <ScrollChapter id="voice" variant="plain" seam={false}>
            <TestimonialSection />
          </ScrollChapter>
        </div>

        <div className="rm-defer-paint">
          {/* variant="plain" — the pinned stage already drives its own entry/exit
              (copy fade, orb scale, wrapperBg). The generic "reveal" wrapper adds a
              translateY that doesn't shrink this chapter's own box (transforms don't
              affect layout), so a few px of the box's edge would go unfilled right at
              the exit — and since this section is also marked rm-section-light (for
              cursor/header theming), that gap falls back to .rm-defer-paint's light
              background instead of black, showing as a stray light line. */}
          <ScrollChapter id="disciplines" variant="plain" seam={false}>
            <ServicesDisciplinesSection />
          </ScrollChapter>
        </div>

        <div className="rm-defer-paint">
          {/* seam=false — the previous chapter (Disciplines) already bleeds edge-to-edge
              into black; the seam hairline would cut across that fade as a stray line.
              variant="plain" — the section's own tag/heading/CTA already reveal once via
              .reveal, so the continuous scroll-scrubbed wrapper would double-animate. */}
          <ScrollChapter variant="plain" seam={false}>
            <ServicesSection />
          </ScrollChapter>
        </div>

        <div className="rm-defer-paint">
          {/* seam=false — Engagement Formats (previous chapter) is bg-black edge-to-edge;
              the seam hairline would cut across that black bleed as a stray line.
              variant="plain" — cards/header already reveal once on their own. */}
          <ScrollChapter variant="plain" seam={false}>
            <CasesGridSection />
          </ScrollChapter>
        </div>

        <Suspense
          fallback={
            <div className="rm-defer-paint">
              <SectionShellSkeleton blocks={2} minBlockHeight="320px" />
            </div>
          }
        >
          <div className="rm-defer-paint">
            {/* seam=false — Cases Grid (previous chapter) is bg-black edge-to-edge;
                the seam hairline would cut across that black bleed as a stray line.
                variant="plain" — tag/heading/CTA/cards already reveal once on their own. */}
            <ScrollChapter id="insights" variant="plain" seam={false}>
              <InsightsHeroSection posts={insightPosts} />
            </ScrollChapter>
          </div>
        </Suspense>

        {/* variant="plain" — the form's own tag/heading/socials/form column already
            reveal once via .reveal, matching everywhere else on the site. */}
        <ScrollChapter variant="plain" seam={false}>
          <CtaContactForm cta={cta} contact={contact.contact} />
        </ScrollChapter>
      </main>

      <SiteFooter />
    </div>
  );
}
