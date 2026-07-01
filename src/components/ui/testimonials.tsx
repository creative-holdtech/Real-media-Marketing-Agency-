import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useSyncExternalStore } from "react";

import quoteBg from "@/assets/engage-bg.jpg";
import {
  FramerTag,
  sectionInner,
  sectionContentGrid,
  siteGutter,
  textGhost,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";
import { cn } from "@/lib/utils";

/** Shared editorial quote body — manifesto + case studies */
export const quoteStatementClass = "rm-quote-editorial__text";

const QUOTE_MOTION_EASE = [0.22, 1, 0.36, 1] as const;
const QUOTE_IN_VIEW_MARGIN = "0px 0px -6% 0px" as const;

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
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(-6%) scale(1.08)", "translateY(6%) scale(1.08)"],
  );

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.img
        src={quoteBg}
        alt=""
        loading="lazy"
        style={parallax ? { transform } : { transform: "scale(1.04)" }}
        className="rm-quote-bg__img absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgb(8,8,8)]/58" />
      <div className="rm-quote-bg__vignette" />
    </div>
  );
}

/** Full-bleed quote block — image + parallax (default) or flat surface. */
export function QuoteGradientSection({
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  innerClassName,
  background = "image",
}: {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** `solid` — no photo/gradient backdrop (e.g. About manifesto). */
  background?: "image" | "solid";
}) {
  return (
    <section
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        `relative flex min-h-[min(560px,72svh)] flex-col overflow-hidden border-b border-[var(--rm-border-soft)] ${siteGutter}`,
        background === "solid" && "bg-[var(--rm-surface-raised)]",
        className,
      )}
    >
      {background === "image" ? <QuoteBackground /> : null}
      <div
        className={cn(
          "relative z-[1] flex w-full flex-1 flex-col justify-center py-20 md:py-28",
          sectionInner,
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function QuoteMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("rm-quote-mark", className)}>
      &ldquo;
    </span>
  );
}

function QuoteEditorialLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: QUOTE_IN_VIEW_MARGIN });
  const showChrome = reduce || inView;
  const motionOff = { duration: 0 } as const;
  const enterFast = { duration: 0.22, ease: QUOTE_MOTION_EASE } as const;

  return (
    <motion.p
      ref={ref}
      className={cn("rm-quote-editorial__lead", className)}
      initial={false}
      animate={
        showChrome
          ? { opacity: 1, transform: "translateY(0)" }
          : { opacity: 0, transform: "translateY(8px)" }
      }
      transition={reduce ? motionOff : enterFast}
    >
      {children}
    </motion.p>
  );
}

type QuoteEditorialProps = {
  lead?: ReactNode;
  quote: string;
  quoteId?: string;
  quoteAriaLabel?: string;
  attribution?: { name: string; role: string };
  afterQuote?: ReactNode;
  editorialClassName?: string;
};

/** One in-view observer — tag, accent, quote, attribution share choreography. */
function QuoteEditorial({
  lead,
  quote,
  quoteId,
  quoteAriaLabel,
  attribution,
  afterQuote,
  editorialClassName,
}: QuoteEditorialProps) {
  const reduce = useReducedMotion();
  const blockRef = useRef<HTMLQuoteElement>(null);
  const inView = useInView(blockRef, { once: true, margin: QUOTE_IN_VIEW_MARGIN });
  const [quoteComplete, setQuoteComplete] = useState(false);

  const showChrome = reduce || inView;
  const showAttribution = reduce || quoteComplete;
  const motionOff = { duration: 0 } as const;
  const enterFast = { duration: 0.22, ease: QUOTE_MOTION_EASE } as const;
  const enterQuote = { duration: 0.28, ease: QUOTE_MOTION_EASE } as const;

  const isManifesto = editorialClassName?.includes("manifesto");
  const isTestimonial = editorialClassName?.includes("testimonial");
  const blockquoteCols =
    lead || isTestimonial ? "md:col-span-2 md:col-start-2" : "md:col-span-3 md:col-start-1";

  return (
    <div className={cn("rm-quote-editorial w-full", sectionContentGrid, editorialClassName)}>
      {lead ? (
        <QuoteEditorialLead
          className={cn(
            "md:col-start-1 md:row-start-1 md:self-start",
            isManifesto && "flex flex-col gap-6 md:gap-8",
          )}
        >
          {lead}
        </QuoteEditorialLead>
      ) : null}

      <blockquote
        ref={blockRef}
        className={cn("rm-quote-editorial__blockquote md:row-start-1", blockquoteCols)}
      >
        <div className="rm-quote-editorial__text-wrap">
          <motion.span
            aria-hidden
            className="rm-quote-editorial__accent"
            initial={false}
            animate={showChrome ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }}
            transition={reduce ? motionOff : enterQuote}
            style={{ transformOrigin: "top center" }}
          />
          <TextReveal
            id={quoteId}
            text={quote}
            ariaLabel={quoteAriaLabel}
            className={quoteStatementClass}
            variant="opacity"
            expressive
            onComplete={() => setQuoteComplete(true)}
          />
        </div>

        {attribution ? (
          <motion.footer
            className="rm-quote-editorial__footer"
            initial={false}
            animate={
              showAttribution
                ? { opacity: 1, transform: "translateY(0)" }
                : { opacity: 0, transform: "translateY(10px)" }
            }
            transition={reduce ? motionOff : enterQuote}
          >
            <cite className="rm-quote-editorial__name">{attribution.name}</cite>
            <span className="rm-quote-editorial__role">{attribution.role}</span>
          </motion.footer>
        ) : null}

        {afterQuote}
      </blockquote>
    </div>
  );
}

type TestimonialSectionProps = {
  quote?: string;
  authorName?: string;
  authorRole?: string;
};

const defaultQuote =
  "Working with Real Media has been an excellent experience for Finup. They are reliable, creative, and always professional in their approach. We're happy to recommend them as a fantastic team to work with";

export default function TestimonialSection({
  quote = defaultQuote,
  authorName = "Nikita",
  authorRole = "PR, FinUp",
}: TestimonialSectionProps) {
  return (
    <QuoteGradientSection
      aria-label="Client testimonial"
      className="rm-testimonial"
      innerClassName="rm-testimonial__inner"
    >
      <QuoteEditorial
        editorialClassName="rm-quote-editorial--testimonial"
        lead={
          <>
            <FramerTag className="rm-quote-editorial__tag">Client voice</FramerTag>
            <QuoteMark className="rm-quote-editorial__mark" />
          </>
        }
        quote={quote}
        attribution={{ name: authorName, role: authorRole }}
      />
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

/** About manifesto — same editorial quote treatment as home testimonial. */
export function ManifestoQuoteSection({
  tag,
  titleId,
  srTitle,
  thesis,
  bullets,
}: ManifestoQuoteSectionProps) {
  return (
    <QuoteGradientSection ariaLabelledBy={titleId}>
      <QuoteEditorial
        editorialClassName="rm-quote-editorial--manifesto"
        lead={
          <>
            <FramerTag>{tag}</FramerTag>
            <QuoteMark />
          </>
        }
        quote={thesis}
        quoteId={titleId}
        quoteAriaLabel={srTitle}
        afterQuote={
          <ul className="mt-10 flex flex-col gap-4 md:mt-12">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className={cn("mt-[0.35em] shrink-0 text-sm", textGhost)} aria-hidden>
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
        }
      />
    </QuoteGradientSection>
  );
}
