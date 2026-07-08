import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  FramerTag,
  heroEyebrowStack,
  heroHeadlineLead,
  heroStandfirst,
  pageHeroContainer,
  sectionHeroActionsRow,
  siteChromeBand,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

const heroStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const heroFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: HERO_EASE } },
};
const heroTitle: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: HERO_EASE },
  },
};
/**
 * Body + actions reveal together, after both title lines settle. Uses
 * initial/animate (not variants) so it opts out of heroStage's
 * staggerChildren orchestration entirely — Framer adds parent stagger
 * delay and a child's own transition.delay together, so a variant-based
 * delay here would just shift both further apart instead of syncing them.
 */
const HERO_BODY_ACTIONS_DELAY = 0.48;
const heroRiseWithTitleHidden = { opacity: 0, y: 22 };
const heroRiseWithTitleShow = { opacity: 1, y: 0 };
const heroRiseWithTitleTransition = {
  duration: 0.8,
  ease: HERO_EASE,
  delay: HERO_BODY_ACTIONS_DELAY,
};

type PageEditorialHeroProps = {
  tag: string;
  titleLines: string[];
  body?: ReactNode;
  bodyClassName?: string;
  headingId?: string;
  actions?: ReactNode;
  /**
   * `atmosphere` — child of HeroAtmosphere (Home / About pattern).
   * `standalone` — self-contained band with header offset.
   * `copy` — inner copy only; parent supplies section chrome.
   */
  layout?: "atmosphere" | "standalone" | "copy";
  /** Vertical alignment when `layout="atmosphere"`. */
  align?: "center" | "start";
  sectionClassName?: string;
};

/**
 * Left-aligned editorial hero — Pattern A tokens, Home entrance choreography.
 */
export function PageEditorialHero({
  tag,
  titleLines,
  body,
  bodyClassName,
  headingId = "page-hero-title",
  actions,
  layout = "standalone",
  align = "center",
  sectionClassName,
}: PageEditorialHeroProps) {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const line1 = titleLines[0] ?? "";
  const line2 = titleLines[1];

  const copy = (
    <div
      className={cn(heroEyebrowStack, "rm-hero-copy w-full max-w-[36rem] items-start text-left")}
    >
      {motionOn ? (
        <motion.p variants={heroFade}>
          <FramerTag>{tag}</FramerTag>
        </motion.p>
      ) : (
        <p>
          <FramerTag>{tag}</FramerTag>
        </p>
      )}

      <div className={heroHeadlineLead}>
        {motionOn ? (
          <motion.h1
            id={headingId}
            className="rm-title-hero-lead w-full text-white"
            variants={heroTitle}
          >
            <span className="block text-balance">
              <motion.span className="block" variants={heroTitleLine}>
                {line1}
              </motion.span>
            </span>
            {line2 ? (
              <span className="block">
                <motion.span
                  className="block text-balance rm-type-display-muted md:whitespace-nowrap"
                  variants={heroTitleLine}
                >
                  {line2}
                </motion.span>
              </span>
            ) : null}
          </motion.h1>
        ) : (
          <h1 id={headingId} className="rm-title-hero-lead w-full text-white">
            <span className="block text-balance">{line1}</span>
            {line2 ? (
              <span className="block text-balance rm-type-display-muted md:whitespace-nowrap">
                {line2}
              </span>
            ) : null}
          </h1>
        )}

        {body ? (
          motionOn ? (
            <motion.p
              className={cn(heroStandfirst, bodyClassName, "mx-0 text-left")}
              initial={heroRiseWithTitleHidden}
              animate={heroRiseWithTitleShow}
              transition={heroRiseWithTitleTransition}
            >
              {body}
            </motion.p>
          ) : (
            <p className={cn(heroStandfirst, bodyClassName, "mx-0 text-left")}>{body}</p>
          )
        ) : null}
      </div>

      {actions ? (
        motionOn ? (
          <motion.div
            className={sectionHeroActionsRow}
            initial={heroRiseWithTitleHidden}
            animate={heroRiseWithTitleShow}
            transition={heroRiseWithTitleTransition}
          >
            {actions}
          </motion.div>
        ) : (
          <div className={sectionHeroActionsRow}>{actions}</div>
        )
      ) : null}
    </div>
  );

  const copyBlock = motionOn ? (
    <motion.div variants={heroStage} initial="hidden" animate="show">
      {copy}
    </motion.div>
  ) : (
    copy
  );

  if (layout === "copy") {
    return copyBlock;
  }

  if (layout === "atmosphere") {
    return (
      <section
        aria-labelledby={headingId}
        className={cn(
          "relative z-10 flex flex-1 pt-[var(--rm-header-offset)]",
          align === "center" ? "items-center" : "items-start",
          sectionClassName,
        )}
      >
        <div className={siteChromeBand}>
          <div className={pageHeroContainer}>{copyBlock}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(siteChromeBand, "relative pt-[var(--rm-header-offset)]", sectionClassName)}
    >
      <div className={pageHeroContainer}>{copyBlock}</div>
    </section>
  );
}
