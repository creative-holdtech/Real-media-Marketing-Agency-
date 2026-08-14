import { motion, useReducedMotion } from "framer-motion";

import { EASE_ENTER, DURATION_ENTER } from "@/components/framer-section";

type TextRevealProps = {
  text: string;
  className?: string;
  /** When set, used as the visible heading id for `aria-labelledby` on the section. */
  id?: string;
  ariaLabel?: string;
  /** Semantic element — use h2 for section headings in long-form pages. */
  as?: "p" | "h2" | "h3" | "span";
};

/**
 * Headline reveal — fades and rises into place once, the same key as every
 * other section entrance on the site (opacity 0→1, y 16→0, EASE_ENTER,
 * once on scroll-into-view). Used to be a scroll-scrubbed per-word color
 * sweep (gray→white as you scrolled past it); that read as its own
 * mechanic, distinct from the fade+rise used everywhere else, so it's gone.
 */
export function TextReveal({ text, className, id, ariaLabel, as: Tag = "p" }: TextRevealProps) {
  const reduce = useReducedMotion();
  const motionProps = {
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    whileInView: reduce ? undefined : ({ opacity: 1, y: 0 } as const),
    viewport: { once: true, amount: 0.3 } as const,
    transition: { duration: DURATION_ENTER, ease: EASE_ENTER },
  };

  switch (Tag) {
    case "h2":
      return (
        <motion.h2 id={id} aria-label={ariaLabel} className={className} {...motionProps}>
          {text}
        </motion.h2>
      );
    case "h3":
      return (
        <motion.h3 id={id} aria-label={ariaLabel} className={className} {...motionProps}>
          {text}
        </motion.h3>
      );
    case "span":
      return (
        <motion.span id={id} aria-label={ariaLabel} className={className} {...motionProps}>
          {text}
        </motion.span>
      );
    default:
      return (
        <motion.p id={id} aria-label={ariaLabel} className={className} {...motionProps}>
          {text}
        </motion.p>
      );
  }
}
