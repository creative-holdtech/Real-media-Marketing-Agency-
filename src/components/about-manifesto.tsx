import type { ReactNode } from "react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

import { BtnArrow, FramerTag, btnPrimary } from "@/components/framer-section";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const CINE_EASE = [0.16, 1, 0.3, 1] as const;
const IN_VIEW_MARGIN = "0px 0px -8% 0px" as const;

const WORD_STAGGER = 0.09;
const ROW_GAP = 0.04;

function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  const shown = reduce || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const wordStage: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: WORD_STAGGER, delayChildren: 0.04 },
  },
};

const rowStage = (delayChildren: number): Variants => ({
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
      delayChildren,
    },
  },
});

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: CINE_EASE },
  },
};

function WordRow({
  text,
  muted,
  rowVariants,
}: {
  text: string;
  muted?: boolean;
  rowVariants: Variants;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("block text-pretty", muted ? "text-[var(--rm-text-subtle)]" : "text-white")}
      variants={rowVariants}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          variants={wordReveal}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

type AboutManifestoSectionProps = {
  tag: string;
  titleId: string;
  thesis: string;
  bullets: readonly string[];
};

/**
 * About manifesto — dark band. Keeps the page in the same black editorial
 * system as the home page while letting the statement breathe.
 */
export function AboutManifestoSection({
  tag,
  titleId,
  thesis,
  bullets,
}: AboutManifestoSectionProps) {
  const [correction, ...rest] = bullets;
  const standfirst = rest.join(" ");

  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });

  const thesisWordCount = thesis.split(" ").length;
  const correctionDelay = 0.04 + WORD_STAGGER * thesisWordCount + ROW_GAP;

  return (
    <section
      aria-labelledby={titleId}
      className="rm-manifesto-light relative overflow-hidden bg-black px-6 md:px-10"
    >
      <div aria-hidden className="rm-products-glow" />
      <div aria-hidden className="rm-manifesto-light__grain" />
      <div className="relative z-[1] mx-auto flex w-full max-w-[var(--rm-grid-max)] flex-col items-center pb-40 pt-16 text-center md:pb-64 md:pt-24">
        <FadeUp>
          <FramerTag className="border-white/10 text-[var(--rm-text-muted)]">{tag}</FramerTag>
        </FadeUp>

        {reduce ? (
          <h2 id={titleId} className="rm-manifesto-light__statement mt-6">
            <span className="block text-white">{thesis}</span>
            {correction ? (
              <span className="block text-[var(--rm-text-subtle)]">{correction}</span>
            ) : null}
          </h2>
        ) : (
          <motion.h2
            ref={ref}
            id={titleId}
            className="rm-manifesto-light__statement mt-6"
            variants={wordStage}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <WordRow text={thesis} rowVariants={rowStage(0.04)} />
            {correction ? (
              <WordRow text={correction} muted rowVariants={rowStage(correctionDelay)} />
            ) : null}
          </motion.h2>
        )}

        {standfirst ? (
          <FadeUp delay={0.08}>
            <p className="rm-copy-standfirst mt-6 max-w-[46ch] text-pretty text-[var(--rm-text-body)]">
              {standfirst}
            </p>
          </FadeUp>
        ) : null}

        <FadeUp delay={0.16} className="mt-8">
          <Link to="/audit" className={cn(btnPrimary, "group gap-2")}>
            Book free audit
            <BtnArrow />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
