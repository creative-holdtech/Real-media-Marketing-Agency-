import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";

import quoteBg from "@/assets/engage-bg.jpg";
import { FramerTag, sectionContainer } from "@/components/framer-section";
import { cn } from "@/lib/utils";

export const quoteStatementClass =
  "text-balance font-semibold text-[var(--rm-ink)]";

export const quoteStatementStyle = {
  fontSize: "clamp(1.35rem, 2.6vw, 2.1rem)",
  lineHeight: 1.22,
  letterSpacing: "-0.035em",
} as const;

function subscribeCoarse(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 991px), (pointer: coarse)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getCoarse() {
  return window.matchMedia("(max-width: 991px), (pointer: coarse)").matches;
}

function getCoarseServer() {
  return false;
}

function QuoteBackground() {
  const reduce = useReducedMotion();
  const coarse = useSyncExternalStore(subscribeCoarse, getCoarse, getCoarseServer);
  const parallax = !reduce && !coarse;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.img
        src={quoteBg}
        alt=""
        loading="lazy"
        style={parallax ? { y, scale: 1.12 } : { scale: 1.06 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgb(10,10,10)]/50" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

/** Full-bleed quote block — image + parallax (default) or flat surface. */
export function QuoteGradientSection({
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  background = "image",
}: {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
  /** `solid` — no photo/gradient backdrop (e.g. About manifesto). */
  background?: "image" | "solid";
}) {
  return (
    <section
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative flex min-h-[min(680px,80svh)] flex-col justify-center overflow-hidden border-b border-white/[0.06] px-6 py-24 md:px-10 md:py-32",
        background === "solid" && "bg-[var(--rm-surface-raised)]",
        className,
      )}
    >
      {background === "image" ? <QuoteBackground /> : null}
      <div className={cn("relative z-[1]", sectionContainer)}>{children}</div>
    </section>
  );
}

export function QuoteMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "select-none font-semibold leading-none text-white/10",
        className,
      )}
      style={{ fontSize: "clamp(6rem, 10vw, 10rem)", lineHeight: 1, letterSpacing: "-0.05em" }}
    >
      "
    </span>
  );
}

type TestimonialSectionProps = {
  quote?: string;
  authorName?: string;
  authorRole?: string;
};

const defaultQuote =
  "Working with Real Media has been an excellent experience for Finup. They are reliable, creative, and always professional in their approach. We’re happy to recommend them as a fantastic team to work with";

export default function TestimonialSection({
  quote = defaultQuote,
  authorName = "Nikita",
  authorRole = "PR  FinUp",
}: TestimonialSectionProps) {
  return (
    <QuoteGradientSection aria-label="Client testimonial">
      <div className="flex max-w-3xl flex-col gap-10 md:gap-12">
        <QuoteMark />

        <blockquote className="reveal -mt-6 m-0 border-0 p-0 md:-mt-8">
          <p className={quoteStatementClass} style={quoteStatementStyle}>
            {quote}
          </p>

          <footer className="mt-10 flex items-center gap-4 md:mt-12">
            <div className="h-px w-10 shrink-0 bg-white/25" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <cite className="not-italic text-sm font-semibold tracking-wide text-[var(--rm-ink)]">
                {authorName}
              </cite>
              <span className="text-xs uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
                {authorRole}
              </span>
            </div>
          </footer>
        </blockquote>
      </div>
    </QuoteGradientSection>
  );
}

type ManifestoQuoteSectionProps = {
  tag: string;
  titleId: string;
  srTitle: string;
  thesis: string;
  bullets: readonly string[];
};

/** About manifesto — same gradient quote treatment as home testimonial. */
export function ManifestoQuoteSection({
  tag,
  titleId,
  srTitle,
  thesis,
  bullets,
}: ManifestoQuoteSectionProps) {
  return (
    <QuoteGradientSection ariaLabelledBy={titleId}>
      <div className="flex max-w-3xl flex-col gap-10 md:gap-12">
        <p className="reveal w-fit">
          <FramerTag>{tag}</FramerTag>
        </p>

        <QuoteMark />

        <blockquote className="reveal -mt-6 m-0 border-0 p-0 md:-mt-8">
          <p
            id={titleId}
            className={quoteStatementClass}
            style={quoteStatementStyle}
            aria-label={srTitle}
          >
            {thesis}
          </p>

          <ul className="mt-10 flex flex-col gap-4 md:mt-12">
            {bullets.map((item, index) => (
              <li
                key={item}
                className="reveal flex items-start gap-3"
                data-delay={String(index + 1)}
              >
                <span className="mt-[0.35em] shrink-0 text-sm text-white/30" aria-hidden>
                  —
                </span>
                <span
                  className="text-pretty text-[var(--rm-text-muted)]"
                  style={{
                    fontSize: "clamp(0.95rem, 1.35vw, 1.05rem)",
                    lineHeight: 1.55,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </blockquote>
      </div>
    </QuoteGradientSection>
  );
}
