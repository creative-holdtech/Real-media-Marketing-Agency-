import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

import {
  sectionHeadline,
  sectionHeadlineAccent,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

const INTRO_LINE_1 = "Be seen. Be trusted.";
const INTRO_LINE_2 = "Be profitable. Be found.";
const INTRO_LINE_3 = "Be chosen. Be expressive.";
const FULL_HEADLINE = `${INTRO_LINE_1} ${INTRO_LINE_2} ${INTRO_LINE_3}`;

const DESCRIPTOR_ROWS = [
  ["seen.", "trusted."],
  ["profitable.", "found."],
  ["chosen.", "expressive."],
] as const;

const CINE_EASE = [0.16, 1, 0.3, 1] as const;
const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

const WORD_STAGGER = 0.13;
const ROW_GAP = 0.28;
const SCROLL_SETTLE_MS = 280;

const ROW_2_DELAY = 0.06 + WORD_STAGGER + 0.55 + ROW_GAP;
const ROW_3_DELAY = ROW_2_DELAY + WORD_STAGGER + 0.55 + ROW_GAP;

/** Play once after scroll settles — avoids flick-through and duplicate layers */
function useSettledInView(ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref, {
    amount: 0.55,
    margin: "0px 0px -12% 0px",
    once: true,
  });
  const [play, setPlay] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    if (!inView || armed.current) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (armed.current) return;
        armed.current = true;
        setPlay(true);
      }, SCROLL_SETTLE_MS);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("wheel", schedule, { passive: true });
    window.addEventListener("touchmove", schedule, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("wheel", schedule);
      window.removeEventListener("touchmove", schedule);
    };
  }, [inView]);

  return { play, inView };
}

const stage: Variants = {
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

const phraseRow3: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: WORD_STAGGER, delayChildren: ROW_3_DELAY },
  },
};

const wordShell: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

const scaffoldReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: INTRO_EASE },
  },
};

const descriptorReveal: Variants = {
  hidden: {
    opacity: 0,
    y: "0.5em",
    filter: "blur(9px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.92, ease: CINE_EASE },
  },
};

function StaticHeadline() {
  return (
    <>
      <span className="block text-pretty">{INTRO_LINE_1}</span>
      <span className="block text-pretty">{INTRO_LINE_2}</span>
      <span className={cn(sectionHeadlineAccent, "block text-pretty")}>{INTRO_LINE_3}</span>
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
        className={cn("inline", muted ? "text-white/28" : "text-white/40")}
        variants={scaffoldReveal}
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
      className={cn("flex flex-wrap gap-x-[0.4em] text-pretty", muted && sectionHeadlineAccent)}
      variants={rowVariants ?? phraseRow}
    >
      {descriptors.map((descriptor) => (
        <BePhrase key={descriptor} descriptor={descriptor} muted={muted} />
      ))}
    </motion.span>
  );
}

function AnimatedHeadline() {
  return (
    <motion.span
      className="flex w-full flex-col gap-4"
      variants={stage}
      initial="hidden"
      animate="show"
    >
      <BeRow descriptors={[...DESCRIPTOR_ROWS[0]]} />
      <BeRow descriptors={[...DESCRIPTOR_ROWS[1]]} rowVariants={phraseRow2} />
      <BeRow descriptors={[...DESCRIPTOR_ROWS[2]]} muted rowVariants={phraseRow3} />
    </motion.span>
  );
}

export function ServicesIntroHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { play, inView } = useSettledInView(ref);

  return (
    <header
      ref={ref}
      className="flex w-full max-w-[36rem] flex-col items-start text-left"
    >
      {reduce ? (
        <h2
          id="services-intro-heading"
          className={cn(sectionHeadline, "m-0 flex w-full flex-col gap-4 text-balance text-white")}
        >
          <StaticHeadline />
        </h2>
      ) : (
        <h2
          id="services-intro-heading"
          className={cn(
            sectionHeadline,
            "m-0 w-full min-h-[4.5rem] text-balance text-white md:min-h-[5rem]",
          )}
          aria-label={FULL_HEADLINE}
        >
          {play ? (
            <AnimatedHeadline />
          ) : (
            <span className="sr-only">{FULL_HEADLINE}</span>
          )}
        </h2>
      )}
    </header>
  );
}
