import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  FramerTag,
  heroEyebrowStack,
  heroHeadlineLead,
  heroStandfirst,
  pageHeroContainer,
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
const heroRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: HERO_EASE } },
};
const heroTitle: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: HERO_EASE },
  },
};

type PageEditorialHeroProps = {
  tag: string;
  titleLines: string[];
  body?: string;
  headingId?: string;
  /**
   * `atmosphere` — child of HeroAtmosphere (Home / About pattern).
   * `standalone` — self-contained band with header offset.
   */
  layout?: "atmosphere" | "standalone";
  sectionClassName?: string;
};

/**
 * Left-aligned editorial hero — Pattern A tokens, Home entrance choreography.
 */
export function PageEditorialHero({
  tag,
  titleLines,
  body,
  headingId = "page-hero-title",
  layout = "standalone",
  sectionClassName,
}: PageEditorialHeroProps) {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const line1 = titleLines[0] ?? "";
  const line2 = titleLines[1];

  const copy = (
    <div
      className={cn(
        heroEyebrowStack,
        "rm-hero-copy w-full max-w-[40rem] items-start text-left",
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
            className="rm-title-hero-lead w-full text-balance text-white"
            variants={heroTitle}
          >
            <span className="block">
              <motion.span className="block" variants={heroTitleLine}>
                {line1}
              </motion.span>
            </span>
            {line2 ? (
              <span className="block">
                <motion.span className="block rm-type-display-muted" variants={heroTitleLine}>
                  {line2}
                </motion.span>
              </span>
            ) : null}
          </motion.h1>
        ) : (
          <h1 id={headingId} className="rm-title-hero-lead w-full text-balance text-white">
            <span className="block">{line1}</span>
            {line2 ? <span className="block rm-type-display-muted">{line2}</span> : null}
          </h1>
        )}

        {body ? (
          motionOn ? (
            <motion.p
              className={cn("mx-0 max-w-[42rem] text-left", heroStandfirst)}
              variants={heroRise}
            >
              {body}
            </motion.p>
          ) : (
            <p className={cn("mx-0 max-w-[42rem] text-left", heroStandfirst)}>{body}</p>
          )
        ) : null}
      </div>
    </div>
  );

  const copyBlock = motionOn ? (
    <motion.div variants={heroStage} initial="hidden" animate="show">
      {copy}
    </motion.div>
  ) : (
    copy
  );

  if (layout === "atmosphere") {
    return (
      <section
        aria-labelledby={headingId}
        className={cn(
          "relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]",
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
      className={cn(
        siteChromeBand,
        "relative pt-[var(--rm-header-offset)]",
        sectionClassName,
      )}
    >
      <div className={pageHeroContainer}>{copyBlock}</div>
    </section>
  );
}
