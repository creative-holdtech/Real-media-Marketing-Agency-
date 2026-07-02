import { motion, useReducedMotion, type Variants } from "framer-motion";

import { sectionHeadline, sectionHeadlineAccent } from "@/components/framer-section";
import { cn } from "@/lib/utils";

const INTRO_LINE_1 = "Be seen. Be trusted. Be profitable.";
const INTRO_LINE_2 = "Be found. Be chosen. Be expressive.";

const INTRO_ARIA_LABEL = `${INTRO_LINE_1} ${INTRO_LINE_2}`;

const DESCRIPTOR_ROWS = [
  ["seen.", "trusted.", "profitable."],
  ["found.", "chosen.", "expressive."],
] as const;

const CINE_EASE = [0.16, 1, 0.3, 1] as const;
const INTRO_EASE = [0.22, 1, 0.36, 1] as const;
const SOFT_SETTLE = [0.2, 0.85, 0.24, 1] as const;

const WORD_STAGGER = 0.09;
const ROW_GAP = 0.18;
const ROW_2_DELAY = 0.16 + WORD_STAGGER * 3 + ROW_GAP;

export const servicesScreenTwoStage: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

export const servicesScreenTwoItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: INTRO_EASE },
  },
};

const introPhraseStage: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const phraseRow: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(12px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: CINE_EASE,
      staggerChildren: WORD_STAGGER,
      delayChildren: 0.04,
    },
  },
};

const phraseRow2: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(12px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.76,
      ease: CINE_EASE,
      staggerChildren: WORD_STAGGER,
      delayChildren: ROW_2_DELAY,
    },
  },
};

const phraseShell: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.992,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: SOFT_SETTLE,
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

const beReveal: Variants = {
  hidden: { opacity: 0, y: 4, scale: 0.975, letterSpacing: "0.01em" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    letterSpacing: "0em",
    transition: { duration: 0.3, ease: INTRO_EASE },
  },
};

const descriptorReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 16,
    y: 2,
    clipPath: "inset(0 100% 0 0)",
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: CINE_EASE },
  },
};

function StaticHeadline() {
  return (
    <>
      <span className="block text-pretty">{INTRO_LINE_1}</span>
      <span className={cn(sectionHeadlineAccent, "block text-pretty")}>{INTRO_LINE_2}</span>
    </>
  );
}

function BePhrase({
  descriptor,
  muted = false,
}: {
  descriptor: string;
  muted?: boolean;
}) {
  return (
    <motion.span
      className="inline-flex items-baseline whitespace-nowrap"
      variants={phraseShell}
      style={{ transformOrigin: "50% 100%" }}
    >
      <motion.span
        className="inline text-white"
        variants={beReveal}
        aria-hidden
      >
        Be&nbsp;
      </motion.span>
      <motion.span
        className={cn(
          "inline text-[var(--rm-text-subtle)]",
          "motion-reduce:filter-none",
        )}
        variants={descriptorReveal}
      >
        {descriptor}
      </motion.span>
    </motion.span>
  );
}

function BeRow({
  descriptors,
  muted = false,
  rowVariants,
}: {
  descriptors: string[];
  muted?: boolean;
  rowVariants?: Variants;
}) {
  return (
    <motion.span
      className={cn("block text-pretty", muted && sectionHeadlineAccent)}
      variants={rowVariants ?? phraseRow}
    >
      <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-[0.35em] gap-y-0 md:flex-nowrap">
        {descriptors.map((descriptor) => (
          <BePhrase key={descriptor} descriptor={descriptor} muted={muted} />
        ))}
      </span>
    </motion.span>
  );
}

function AnimatedHeadline() {
  return (
    <>
      <BeRow descriptors={[...DESCRIPTOR_ROWS[0]]} />
      <BeRow descriptors={[...DESCRIPTOR_ROWS[1]]} muted rowVariants={phraseRow2} />
    </>
  );
}

const introHeadlineClass = cn(sectionHeadline, "m-0 w-full max-w-none text-white");

export function ServicesIntroHeader() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h2 id="services-intro-heading" className={introHeadlineClass}>
        <StaticHeadline />
      </h2>
    );
  }

  return (
    <motion.h2
      id="services-intro-heading"
      className={introHeadlineClass}
      aria-label={INTRO_ARIA_LABEL}
      variants={introPhraseStage}
    >
      <AnimatedHeadline />
    </motion.h2>
  );
}
