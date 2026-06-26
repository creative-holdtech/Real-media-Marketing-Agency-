import { motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

import {
  FramerTag,
  BtnArrow,
  btnOutlineOnDark,
  btnPrimary,
  sectionContentGrid,
  sectionGap,
  sectionHeadline,
  sectionHeadlineLead,
  sectionIntroStack,
  sectionInner,
  borderSoft,
  sectionShell,
  subsectionTitle,
  textCardBody,
  textMeta,
  textSubtle,
  textGhost,
} from "@/components/framer-section";
import { homepageEngagements, type Engagement } from "@/lib/engagements";
import { cn } from "@/lib/utils";

type FormatId = "sprint" | "marathon";

const UNDERLINE_SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

/* Entrance is CSS-driven (see `.rm-engage-*` keyframes in styles.css). CSS
   animations start on first paint, and `content-visibility: auto` on the
   wrapping section defers that paint until the block scrolls into view — which
   makes the reveal reliable. (Motion's `whileInView` does NOT fire reliably
   inside a `content-visibility: auto` subtree — it freezes mid-animation.)
   Switching tabs swaps the text instantly; only the active underline animates. */

function StepBody({
  engagementId,
  step,
}: {
  engagementId: Engagement["id"];
  step: Engagement["steps"][number];
}) {
  const isSprintAudit = engagementId === "sprint" && step.code === "01";

  if (!isSprintAudit) {
    return <dd className={cn("m-0", textCardBody, textSubtle)}>{step.body}</dd>;
  }

  return (
    <dd className={cn("m-0", textCardBody, textSubtle)}>
      <Link
        to="/audit"
        className="font-medium text-white underline decoration-white/30 underline-offset-[3px] transition-colors duration-200 hover:decoration-white/70"
      >
        Free audit
      </Link>
      {step.body.replace(/^free audit/i, "")}
    </dd>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState<FormatId>("sprint");
  const reduce = useReducedMotion();
  const engagement = homepageEngagements.find((e) => e.id === active)!;
  const activeTabId = `engage-tab-${active}`;
  const panelId = "engage-panel";

  return (
    <section
      id="engage"
      aria-labelledby="engage-heading"
      className={cn(sectionShell, "relative overflow-hidden bg-black")}
    >
      <div className={sectionInner}>
        <div className={cn(sectionContentGrid, "items-start md:items-stretch")}>
          <div className="md:col-start-1 md:self-start">
            <FramerTag>Engagement formats</FramerTag>
          </div>
          <header className={cn(sectionIntroStack, "md:col-span-2 md:col-start-2")}>
            <h2 id="engage-heading" className={cn(sectionHeadline, "m-0 max-w-[22ch] text-white")}>
              <span className="block">Two ways to work with us.</span>
              <span className={cn("block", textSubtle)}>Both end in shipped revenue.</span>
            </h2>
          </header>

          {/* Tab switcher with sliding indicator */}
          <div
            role="tablist"
            aria-label="Engagement formats"
            className={cn(
              "flex flex-wrap items-end gap-x-8 gap-y-1 border-b md:col-span-2 md:col-start-2",
              borderSoft,
            )}
          >
            {homepageEngagements.map((e) => {
              const isActive = active === e.id;
              return (
                <button
                  key={e.id}
                  type="button"
                  id={`engage-tab-${e.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(e.id)}
                  className={cn(
                    "relative -mb-px cursor-pointer border-0 bg-transparent p-0 pb-2",
                    subsectionTitle,
                    "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black",
                    isActive ? "text-white" : cn(textGhost, "hover:text-[var(--rm-text-muted)]"),
                  )}
                >
                  {e.name}
                  {isActive ? (
                    <motion.span
                      layoutId="engage-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-white"
                      transition={reduce ? { duration: 0 } : UNDERLINE_SPRING}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Content — stable scaffold; entrance reveals once on scroll-in (CSS) */}
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={activeTabId}
            className="md:col-span-2 md:col-start-2"
          >
            <div className={cn("rm-engage-panel__grid flex flex-col", sectionGap)}>
              {/* Copy + timeline — one group; the steps' top margin sets the lead gap */}
              <div className="flex flex-col">
                <div className={cn("rm-engage-panel__lead min-w-0", sectionHeadlineLead)}>
                  <p className={textMeta}>
                    <span className={cn("tabular-nums", textSubtle)}>
                      {engagement.metricBig} {engagement.metricUnitLabel}
                    </span>
                    <span className={cn("mx-2", textGhost)}>·</span>
                    {engagement.metricUnitSub}
                  </p>

                  <p className="max-w-[48ch] rm-type-body rm-type-body-strong text-white">
                    {engagement.intro}
                  </p>
                </div>

                {/* Steps — horizontal timeline. mt separates from the lead; pt
                    reserves the rail band above the step text (the rail is
                    absolutely positioned, so mt — not pt — sets the lead gap). */}
                <div className="rm-engage-steps relative mt-10 pt-6 md:mt-14 md:pt-8">
                  <div
                    className="rm-engage-rail pointer-events-none absolute inset-x-0 top-[0.3125rem] hidden h-px md:block"
                    aria-hidden
                  >
                    <div className="h-full w-full bg-white/[0.08]" />
                    <div className="rm-engage-rail__fill absolute inset-0 origin-left bg-gradient-to-r from-white/45 via-white/25 to-white/10" />
                  </div>

                  <div className="grid gap-x-8 md:grid-cols-3 lg:gap-x-12">
                    {engagement.steps.map((step, i) => (
                      <dl
                        key={step.code}
                        style={{ "--i": i } as CSSProperties}
                        role="group"
                        aria-label={`${step.code} ${step.title}`}
                        className={cn(
                          "rm-engage-step group/step relative m-0 flex flex-col gap-1.5 py-5 first:pt-0 md:gap-2 md:py-0",
                          // Horizontal dividers only on mobile, where the rail is hidden.
                          "max-md:border-b max-md:last:border-b-0",
                          borderSoft,
                        )}
                      >
                        <span
                          aria-hidden
                          className="rm-engage-step__dot absolute left-0 top-[0.35rem] hidden size-1.5 rounded-full bg-white/25 ring-[3px] ring-black md:block md:-top-[1.95rem]"
                        />
                        <dt className="flex items-baseline gap-2.5">
                          <span className={cn(textMeta, textGhost, "rm-engage-step__code")}>
                            {step.code}
                          </span>
                          <span className={cn(textMeta, textSubtle, "rm-engage-step__title")}>
                            {step.title}
                          </span>
                        </dt>
                        <StepBody engagementId={engagement.id} step={step} />
                      </dl>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions — one sectionGap below copy+process group */}
              <div className="rm-engage-panel__actions flex max-w-full flex-wrap items-center justify-end gap-3 md:gap-4">
                <Link
                  to="/contact"
                  search={{ engagement: engagement.id }}
                  className={cn(
                    btnPrimary,
                    "group w-fit gap-2 bg-[#efeeea] hover:bg-white motion-safe:hover:translate-y-0",
                  )}
                >
                  {engagement.ctaLabel.replace(/\s*→$/, "")}
                  <BtnArrow />
                </Link>
                <Link
                  to="/products"
                  className={cn(
                    btnOutlineOnDark,
                    "group w-fit gap-2 motion-safe:hover:translate-y-0",
                  )}
                >
                  Compare formats
                  <BtnArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
