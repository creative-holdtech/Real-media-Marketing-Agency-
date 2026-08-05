import { Link } from "@tanstack/react-router";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  BtnArrow,
  borderSoft,
  btnPrimary,
  heroStandfirst,
  sectionChapterNumeral,
  textMeta,
  textSubtle,
  textValue,
} from "@/components/framer-section";
import { HeroAmbientGlow, HeroScrollCue } from "@/components/services-hero";
import { aboutSectors } from "@/content/about";
import { cn } from "@/lib/utils";

const SPACES = aboutSectors.items.map((item) => ({
  n: item.n,
  title: item.title,
}));

const easeOut = [0.22, 1, 0.36, 1] as const;

const heroFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: easeOut } },
};

const heroRise: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const heroTitle: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const railStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const railItem: Variants = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

/**
 * About hero — split editorial frame (recording layout) expressed in home tokens:
 * rm-title-hero-lead / rm-type-display-muted, Pattern A 16/24, btnPrimary, HeroAmbientGlow.
 */
export function AboutHeroSplit() {
  const reduce = Boolean(useReducedMotion());
  const motionOn = !reduce;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        id="about-top"
        className="rm-about-hero relative isolate bg-black"
        style={{ scrollMarginTop: "var(--rm-header-offset)" }}
        initial={motionOn ? "hidden" : false}
        animate="visible"
      >
        <HeroAmbientGlow />

        <div className={cn("rm-about-hero__frame", borderSoft)}>
          <div className="rm-about-hero__main">
            <m.p className={cn("rm-about-hero__tag gap-1", textMeta)} variants={heroFade}>
              <span className="rm-about-hero__tag-dot" aria-hidden />
              About — Marketing agency
            </m.p>

            <m.h1
              id="page-title"
              className="rm-about-hero__title rm-title-hero-lead"
              variants={heroTitle}
            >
              <m.span className="block" variants={heroTitleLine}>
                R—M is a marketing
              </m.span>
              <m.span className="block" variants={heroTitleLine}>
                agency for founders
              </m.span>
              <m.span className="block rm-type-display-muted" variants={heroTitleLine}>
                building in EU and MENA.
              </m.span>
            </m.h1>

            {/* Pattern A: title → standfirst 16 · standfirst → CTA 24 — no auto-push to floor */}
            <m.p
              className={cn(
                heroStandfirst,
                "rm-about-hero__lead mx-0 max-w-[28ch] text-left",
              )}
              variants={heroRise}
            >
              We go deep where our work compounds.
            </m.p>

            <m.div className="rm-about-hero__cta-wrap mt-6" variants={heroRise}>
              <Link to="/audit" className={cn(btnPrimary, "group gap-2")}>
                Get audit
                <BtnArrow />
              </Link>
            </m.div>
          </div>

          <aside className={cn("rm-about-hero__rail", borderSoft)} aria-label="Four spaces">
            <m.p className={cn(textMeta, textSubtle)} variants={heroFade}>
              Four spaces
            </m.p>

            {/* Static index — not jump links (QA: scroll-to-verticals felt pointless) */}
            <m.ul className={cn("rm-about-hero__rail-list", borderSoft)} variants={railStagger}>
              {SPACES.map((space) => (
                <m.li key={space.n} variants={railItem}>
                  <div className="rm-about-hero__rail-row">
                    <span className={cn(sectionChapterNumeral, textSubtle)}>{space.n}</span>
                    <span className={cn(textValue, "font-medium")}>{space.title}</span>
                  </div>
                </m.li>
              ))}
            </m.ul>

            <m.p className={cn("rm-about-hero__rail-markets", textMeta, textSubtle)} variants={heroFade}>
              Markets / EU · MENA
            </m.p>
          </aside>
        </div>

        <m.div className="rm-about-hero__bar" variants={heroFade}>
          <p className={cn(textMeta, textSubtle)}>Spaces / 04</p>
          <HeroScrollCue label="Scroll" />
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
