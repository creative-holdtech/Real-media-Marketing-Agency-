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
  siteGutter,
  textGhost,
  textMeta,
  textSubtle,
  textValue,
} from "@/components/framer-section";
import { HeroAmbientGlow } from "@/components/services-hero";
import { aboutHero, aboutSectors } from "@/content/about";
import { cn } from "@/lib/utils";

const SPACES = aboutSectors.items.map((item) => ({
  n: item.n,
  title: item.title,
}));

const MARQUEE = SPACES.map((s) => s.title).join("  ·  ");

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ...spring, delay: 0.04 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const brandIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...spring, delay: 0.06 },
  },
};

const indexStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } },
};

const indexItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: spring },
};

/**
 * About hero — Index Spine (local award alt).
 * One composition: site ambient · vertical spine · brand plane · floor index · kinetic band.
 * RM palette only. Backup: AboutHeroSplit.
 */
export function AboutHero() {
  const reduce = Boolean(useReducedMotion());
  const motionOn = !reduce;

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="about-top"
        className="rm-about-spine relative isolate bg-black"
        style={{ scrollMarginTop: "var(--rm-header-offset)" }}
        aria-labelledby="page-title"
        initial={motionOn ? "hidden" : false}
        animate="visible"
      >
        <HeroAmbientGlow />

        <div className={cn("rm-about-spine__shell", siteGutter)}>
          <div className={cn("rm-about-spine__stage", borderSoft)}>
            <m.p className={cn("rm-about-spine__spine", textMeta, textSubtle)} variants={fade} aria-hidden>
              About
            </m.p>

            <div className="rm-about-spine__main">
              <m.header className="rm-about-spine__meta" variants={fade}>
                <p className={cn(textMeta, textSubtle)}>Marketing agency</p>
                <p className={cn(textMeta, textSubtle)}>EU · MENA</p>
              </m.header>

              <m.p className="rm-about-spine__brand" variants={brandIn} aria-hidden>
                R—M
              </m.p>

              <m.h1 id="page-title" className="rm-about-spine__title" variants={rise}>
                <span className="block">R—M is a marketing agency for founders</span>
                <span className="block rm-about-spine__title-muted">building in EU and MENA.</span>
              </m.h1>

              <m.div className="rm-about-spine__action" variants={rise}>
                <p className={cn(heroStandfirst, "rm-about-spine__lead mx-0 max-w-[32ch] text-left")}>
                  {aboutHero.lead}
                </p>
                <Link to="/audit" className={cn(btnPrimary, "group gap-2 shrink-0")}>
                  Get audit
                  <BtnArrow />
                </Link>
              </m.div>
            </div>

            <m.div
              className={cn("rm-about-spine__index", borderSoft)}
              aria-label="Four spaces"
              variants={indexStagger}
            >
              {SPACES.map((space) => (
                <m.div key={space.n} className="rm-about-spine__cell" variants={indexItem}>
                  <span className="rm-about-spine__n">{space.n}</span>
                  <span className={cn(textValue, "rm-about-spine__space")}>{space.title}</span>
                </m.div>
              ))}
            </m.div>

            <div className={cn("rm-about-spine__marquee", borderSoft)} aria-hidden>
              {motionOn ? (
                <m.div
                  className="rm-about-spine__marquee-track"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                >
                  <span className={cn(textMeta, textGhost)}>{MARQUEE}</span>
                  <span className={cn(textMeta, textGhost)}>{MARQUEE}</span>
                  <span className={cn(textMeta, textGhost)}>{MARQUEE}</span>
                  <span className={cn(textMeta, textGhost)}>{MARQUEE}</span>
                </m.div>
              ) : (
                <p className={cn("rm-about-spine__marquee-static", textMeta, textGhost)}>{MARQUEE}</p>
              )}
            </div>
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
