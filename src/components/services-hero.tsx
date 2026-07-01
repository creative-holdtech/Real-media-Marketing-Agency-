import { useRef, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import {
  FramerTag,
  heroEyebrowStack,
  heroHeadlineLead,
  heroStandfirst,
  pageHeroContainer,
  siteChromeBand,
  textMeta,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

const CINE = [0.16, 1, 0.3, 1] as const;

type ServicesHeroProps = {
  tag: string;
  titleLines: string[];
  body?: string;
  entryLabel?: string;
  headingId?: string;
  sectionClassName?: string;
};

function useHeroScrollMotion(heroRef: RefObject<HTMLElement | null>, enabled: boolean) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.4,
  });

  const copyY = useTransform(progress, [0, 1], enabled ? [0, -36] : [0, 0]);
  const copyOpacity = useTransform(progress, [0.35, 0.95], enabled ? [1, 0] : [1, 1]);

  return { copyY, copyOpacity };
}

export function ServicesHero({
  tag,
  titleLines,
  body,
  entryLabel = "Choose your entry point",
  headingId = "services-hero-title",
  sectionClassName,
}: ServicesHeroProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const line1 = titleLines[0] ?? "";
  const line2 = titleLines[1];
  const scroll = useHeroScrollMotion(heroRef, !reduce);

  const copy = (
    <div
      className={cn(heroEyebrowStack, "rm-hero-copy w-full max-w-[42rem] items-start text-left")}
    >
      {reduce ? (
        <p>
          <FramerTag>{tag}</FramerTag>
        </p>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: CINE }}
        >
          <FramerTag>{tag}</FramerTag>
        </motion.p>
      )}

      <div className={heroHeadlineLead}>
        {reduce ? (
          <h1 id={headingId} className="rm-title-hero-lead flex w-full flex-col gap-1 text-white">
            <span className="block">{line1}</span>
            {line2 ? (
              <span
                className="block whitespace-nowrap rm-type-display-muted"
                style={{ opacity: 0.52 }}
              >
                {line2}
              </span>
            ) : null}
          </h1>
        ) : (
          <motion.h1
            id={headingId}
            className="rm-title-hero-lead flex w-full flex-col gap-1 text-white"
            aria-label={line2 ? `${line1} ${line2}` : line1}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: CINE, delay: 0.1 }}
          >
            <span className="block">{line1}</span>
            {line2 ? (
              <motion.span
                className="block whitespace-nowrap rm-type-display-muted"
                style={{ opacity: 0.52 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 0.52, y: 0 }}
                transition={{ duration: 0.75, ease: CINE, delay: 0.28 }}
              >
                {line2}
              </motion.span>
            ) : null}
          </motion.h1>
        )}

        {body ? (
          reduce ? (
            <p className={cn(heroStandfirst, "mx-0 max-w-[42ch] text-left text-pretty")}>{body}</p>
          ) : (
            <motion.p
              className={cn(heroStandfirst, "mx-0 max-w-[42ch] text-left text-pretty")}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: CINE, delay: 0.42 }}
            >
              {body}
            </motion.p>
          )
        ) : null}
      </div>

      {reduce ? (
        <div className="mt-8 flex flex-col gap-3">
          <div className="h-px w-full max-w-[12rem] bg-white/20" />
          <p className={textMeta}>{entryLabel}</p>
        </div>
      ) : (
        <motion.div
          className="mt-8 flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: CINE, delay: 0.55 }}
        >
          <div className="h-px w-full max-w-[12rem] bg-white/18" aria-hidden />
          <p className={textMeta}>{entryLabel}</p>
        </motion.div>
      )}
    </div>
  );

  return (
    <div
      ref={heroRef}
      className={cn(
        "rm-hero-atmosphere rm-hero-atmosphere--under-header rm-hero-atmosphere--services-black relative isolate flex flex-col bg-black",
        sectionClassName,
      )}
    >
      <section
        aria-labelledby={headingId}
        className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)] pb-12 md:pb-16"
      >
        <div className={siteChromeBand}>
          <div className={pageHeroContainer}>
            {reduce ? (
              copy
            ) : (
              <motion.div style={{ y: scroll.copyY, opacity: scroll.copyOpacity }}>
                {copy}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
