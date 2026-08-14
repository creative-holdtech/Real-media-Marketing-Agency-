import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  EASE_ENTER,
  FramerTag,
  heroEyebrowStack,
  heroHeadlineLead,
  heroIntroStack,
  heroStandfirst,
  pageHeroContainer,
  sectionHeroActionsRow,
  siteChromeBand,
} from "@/components/framer-section";
import { usePreloaderDone } from "@/hooks/use-preloader-done";
import { cn } from "@/lib/utils";

/* HERO_EASE = EASE_ENTER — same choreography constants AND easing as the home
 * hero (routes/index.tsx), kept in sync deliberately, not two systems. Used
 * to borrow EASE_HOVER (a sharp hang-then-snap curve) to match mdx.so; the
 * home hero moved off that for reading as sharp rather than smooth, so this
 * hero follows to stay in sync. */
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
const heroTitle: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: HERO_TITLE_STAGGER } },
};
const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: HERO_TITLE_LINE_DURATION, ease: HERO_EASE },
  },
};
/**
 * Body + actions start shortly after the LAST title line begins (not after
 * it fully settles) — a deliberate cascade/overlap, not a serial
 * wait-then-wait queue. Uses initial/animate (not variants) so it opts out
 * of heroStage's staggerChildren orchestration entirely — Framer adds parent
 * stagger delay and a child's own transition.delay together, so a
 * variant-based delay here would just shift both further apart instead of
 * syncing them. The delay is computed from the real line count (1 or 2)
 * instead of a fixed worst-case constant, so a short 1-line title doesn't
 * wait as long as a 2-line one — and starting just after the line begins
 * (instead of after it finishes) keeps the whole reveal fast instead of
 * feeling like a serial queue.
 */
function heroBodyDelay(titleLineCount: number) {
  const lastLineIndex = Math.max(0, Math.min(titleLineCount, 2) - 1);
  const titleStart = HERO_STAGE_DELAY_CHILDREN + HERO_STAGE_STAGGER;
  const lastLineStart = titleStart + lastLineIndex * HERO_TITLE_STAGGER;
  return lastLineStart + 0.18;
}
const heroRiseWithTitleHidden = { opacity: 0, y: 22 };
const heroRiseWithTitleShow = { opacity: 1, y: 0 };

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
  /**
   * Vertical alignment when `layout="atmosphere"`; horizontal text
   * alignment (left vs centered copy block) when `layout="copy"`.
   */
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
  align = "start",
  sectionClassName,
}: PageEditorialHeroProps) {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const heroReady = usePreloaderDone();
  const line1 = titleLines[0] ?? "";
  const line2 = titleLines[1];
  const centered = align === "center";
  const heroRiseWithTitleTransition = {
    duration: 0.65,
    ease: HERO_EASE,
    delay: heroBodyDelay(line2 ? 2 : 1),
  };

  const copy = (
    <div
      className={cn(
        centered ? heroIntroStack : heroEyebrowStack,
        "rm-hero-copy w-full",
        centered ? "mx-auto max-w-[56rem]" : "max-w-[36rem] items-start text-left",
      )}
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
            className={cn("rm-title-hero-lead w-full text-white", centered && "rm-title-hero-lead--centered")}
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
                  className={cn("block text-balance rm-type-display-muted", !centered && "md:whitespace-nowrap")}
                  variants={heroTitleLine}
                >
                  {line2}
                </motion.span>
              </span>
            ) : null}
          </motion.h1>
        ) : (
          <h1
            id={headingId}
            className={cn("rm-title-hero-lead w-full text-white", centered && "rm-title-hero-lead--centered")}
          >
            <span className="block text-balance">{line1}</span>
            {line2 ? (
              <span className={cn("block text-balance rm-type-display-muted", !centered && "md:whitespace-nowrap")}>
                {line2}
              </span>
            ) : null}
          </h1>
        )}

        {body ? (
          motionOn ? (
            <motion.p
              className={cn(heroStandfirst, bodyClassName, centered ? "mx-auto text-center" : "mx-0 text-left")}
              initial={heroRiseWithTitleHidden}
              animate={heroReady ? heroRiseWithTitleShow : heroRiseWithTitleHidden}
              transition={heroRiseWithTitleTransition}
            >
              {body}
            </motion.p>
          ) : (
            <p className={cn(heroStandfirst, bodyClassName, centered ? "mx-auto text-center" : "mx-0 text-left")}>
              {body}
            </p>
          )
        ) : null}
      </div>

      {actions ? (
        motionOn ? (
          <motion.div
            className={cn(sectionHeroActionsRow, centered && "justify-center")}
            initial={heroRiseWithTitleHidden}
            animate={heroReady ? heroRiseWithTitleShow : heroRiseWithTitleHidden}
            transition={heroRiseWithTitleTransition}
          >
            {actions}
          </motion.div>
        ) : (
          <div className={cn(sectionHeroActionsRow, centered && "justify-center")}>{actions}</div>
        )
      ) : null}
    </div>
  );

  const copyBlock = motionOn ? (
    <motion.div variants={heroStage} initial="hidden" animate={heroReady ? "show" : "hidden"}>
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
