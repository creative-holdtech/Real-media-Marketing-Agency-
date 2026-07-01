import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  sectionHeadline,
  sectionHeadlineAccent,
  textMeta,
} from "@/components/framer-section";
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

const WORD_STAGGER = 0.13;
const ROW_GAP = 0.28;
const ROW_2_DELAY = 0.06 + WORD_STAGGER * 3 + 0.55 + ROW_GAP;

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
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const phraseRow: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: WORD_STAGGER, delayChildren: 0.06 },
  },
};

const phraseRow2: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: WORD_STAGGER, delayChildren: ROW_2_DELAY },
  },
};

const wordShell: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
};

const scaffoldReveal: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: INTRO_EASE } },
};

const descriptorReveal: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.92, ease: CINE_EASE },
  },
};

const entryRail: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.7, ease: CINE_EASE },
  },
};

const entryLabelReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: INTRO_EASE, delay: 0.08 } },
};

const entryStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
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
      variants={wordShell}
      style={{ transformOrigin: "50% 100%" }}
    >
      <motion.span
        className={cn("inline text-[var(--rm-text-faint)]", muted && "text-[var(--rm-text-ghost)]")}
        variants={scaffoldReveal}
        aria-hidden
      >
        Be&nbsp;
      </motion.span>
      <motion.span
        className={cn("inline", muted ? "text-[var(--rm-text-subtle)]" : "text-white")}
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
      <span className="inline-flex min-w-0 flex-nowrap items-baseline gap-x-[0.35em]">
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

const introHeadlineClass = cn(sectionHeadline, "m-0 max-w-[22ch] text-balance text-white");

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

export function ServicesEntryHandoff({
  label = "Choose your entry point",
  visibleCount,
  totalCount,
}: {
  label?: string;
  visibleCount?: number;
  totalCount?: number;
}) {
  const reduce = useReducedMotion();
  const counter =
    visibleCount != null && totalCount != null && totalCount > visibleCount
      ? `${visibleCount} of ${totalCount}`
      : null;

  const copy = (
    <>
      <div className="h-px w-full max-w-[12rem] bg-white/20" aria-hidden />
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className={cn(textMeta, "m-0 normal-case")}>{label}</p>
        {counter ? (
          <p className={cn(textMeta, "m-0")} aria-label={`Showing ${counter} disciplines`}>
            {counter}
          </p>
        ) : null}
      </div>
    </>
  );

  if (reduce) {
    return <div className="flex flex-col gap-2">{copy}</div>;
  }

  return (
    <motion.div variants={entryStage} className="flex origin-left flex-col gap-2">
      <motion.div
        className="h-px w-full max-w-[12rem] bg-white/18"
        aria-hidden
        variants={entryRail}
        style={{ transformOrigin: "0% 50%" }}
      />
      <motion.div
        className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
        variants={entryLabelReveal}
      >
        <p className={cn(textMeta, "m-0 normal-case")}>{label}</p>
        {counter ? (
          <p className={cn(textMeta, "m-0")} aria-label={`Showing ${counter} disciplines`}>
            {counter}
          </p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
