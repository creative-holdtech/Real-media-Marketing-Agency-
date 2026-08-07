import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  borderSoft,
  divideSoft,
  FramerTag,
  sectionHeadline,
  sectionInner,
  siteGutter,
  subsectionTitle,
  textCardBody,
  textGhost,
  textMeta,
  textSubtle,
} from "@/components/framer-section";
import { StudioTrustBand } from "@/components/studio-trust-band";
import { cn } from "@/lib/utils";
import type { PageContent } from "@/lib/page-content/types";
import { getPageDefaults } from "@/lib/page-content/defaults";

const defaultPage = getPageDefaults("home");

function RowArrow() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden className="shrink-0">
      <path
        d="M5.5 1L9 4M9 4L5.5 7M9 4H1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RowConnector() {
  return (
    <div className={cn("flex flex-1 items-center gap-0 mx-3 md:mx-5", textGhost)}>
      <div className="flex-1 h-px bg-[var(--rm-border-soft)]" />
      <RowArrow />
    </div>
  );
}

export function AboutSection({ page }: { page?: PageContent }) {
  const chapterRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const studio = page?.sections.studio ?? defaultPage.sections.studio;
  const stats = page?.stats ?? defaultPage.stats ?? [];
  const metaCards = page?.metaCards ?? defaultPage.metaCards ?? [];

  return (
    <section
      ref={chapterRef}
      id="studio"
      className="rm-studio-chapter"
      aria-label="Studio overview"
    >
      <StudioTrustBand
        chapterRef={chapterRef}
        inView={true}
        stats={stats.map((stat) => ({
          copy: stat.label,
          ...(stat.animateTo != null
            ? {
                countUp: {
                  to: stat.animateTo,
                  prefix: stat.prefix,
                  suffix: stat.suffix,
                },
              }
            : {
                value: `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`,
              }),
        }))}
      />

      <div className="rm-studio-chapter__body">
        <div className={cn("border-b bg-black pb-16 md:pb-20", borderSoft, siteGutter)}>
          <div className={cn(sectionInner, "rm-plan-scene flex flex-col gap-10 md:gap-14 py-16 md:py-20")}>

            {/* Ambient background decorations */}
            <div className="rm-plan-scene__ambient" aria-hidden="true">
              <div className="rm-plan-scene__grid" />
              <div className="rm-plan-scene__glow" />
              <div className="rm-plan-scene__axis" />
            </div>

            {/* ── Main: two-column grid ── */}
            <div className="reveal is-visible relative grid grid-cols-1 items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">

              {/* Left: tag + headline */}
              <div className="flex flex-col items-start gap-4">
                <FramerTag>{studio?.tag ?? "Marketing agency"}</FramerTag>
                <h2
                  className={cn(sectionHeadline, "m-0 max-w-[20ch] text-balance")}
                  aria-label={studio?.heading ?? ""}
                >
                  <span className="block text-pretty text-white">
                    {studio?.headingLines?.[0] ?? "We don't bring ideas."}
                  </span>
                  <span className={cn("block text-pretty", textSubtle)}>
                    {studio?.headingLines?.[1] ?? "We come with a plan."}
                  </span>
                </h2>
              </div>

              {/* Right: arrow-table rows */}
              <div
                className={cn(
                  "rm-plan-scene__cards reveal-fade flex flex-col border-t",
                  divideSoft,
                  borderSoft,
                )}
                data-delay="1"
              >
                {metaCards.map((card) => (
                  <motion.div
                    key={card.label}
                    className={cn("flex items-center border-b py-6 last:border-b-0", borderSoft)}
                    initial="rest"
                    whileHover={reduced ? "rest" : "hover"}
                    animate="rest"
                  >
                    {/* Label — animates right on row hover */}
                    <motion.span
                      className={cn(subsectionTitle, "w-32 shrink-0 md:w-40")}
                      variants={{
                        rest: { x: 0 },
                        hover: { x: 40 },
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    >
                      {card.label}
                    </motion.span>

                    {/* Growing line + arrowhead */}
                    <RowConnector />

                    {/* Value — paragraph style */}
                    <p className={cn(textCardBody, "m-0 max-w-[28ch] flex-1 whitespace-pre-line")}>
                      {card.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Bottom: bullets strip with dividers ── */}
            {studio?.bullets?.length ? (
              <div
                className={cn(
                  "reveal-fade border-t pt-6",
                  "flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-0",
                  borderSoft,
                )}
                data-delay="2"
              >
                {studio.bullets.map((bullet, i) => (
                  <>
                    <span key={bullet} className={cn(textMeta, "flex-1 text-center text-[var(--rm-text-subtle)]")}>
                      {bullet}
                    </span>
                    {i < (studio.bullets?.length ?? 0) - 1 && (
                      <span
                        key={`sep-${i}`}
                        aria-hidden
                        className={cn(textMeta, textGhost, "hidden shrink-0 select-none sm:inline")}
                      >
                        |
                      </span>
                    )}
                  </>
                ))}
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </section>
  );
}
