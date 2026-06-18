import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

import {
  FramerTag,
  BtnArrow,
  btnPrimary,
  sectionContainer,
  sectionContentGrid,
  sectionHeadline,
  sectionIntroStack,
  sectionShell,
  subsectionTitle,
  textCardBody,
  textMeta,
  textSubtle,
  textFaint,
  textGhost,
} from "@/components/framer-section";
import { homepageEngagements, type Engagement } from "@/lib/engagements";
import { cn } from "@/lib/utils";

type FormatId = "sprint" | "marathon";

const EASE = [0.22, 1, 0.36, 1] as const;
const UNDERLINE_SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

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
      <div className={sectionContainer}>
        <div className={cn(sectionContentGrid, "items-start")}>
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
            className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-1 border-b border-white/12 md:col-span-2 md:col-start-2"
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
                    "relative -mb-px cursor-pointer border-0 bg-transparent p-0 pb-3",
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

          {/* Content */}
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={activeTabId}
            className="mt-12 md:col-span-2 md:col-start-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={engagement.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="grid gap-x-16 gap-y-12 md:grid-cols-[0.82fr_1fr]"
              >
                {/* Left: supporting metric, emphasized intro, CTA */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: 0.04 }}
                  className="flex flex-col"
                >
                  <p className={textMeta}>
                    <span className={cn("tabular-nums", textSubtle)}>
                      {engagement.metricBig} {engagement.metricUnitLabel}
                    </span>
                    <span className={cn("mx-2", textGhost)}>·</span>
                    {engagement.metricUnitSub}
                  </p>

                  <p
                    className={cn("mt-5 max-w-[34ch] rm-type-body rm-type-body-strong text-white")}
                  >
                    {engagement.intro}
                  </p>

                  <div className="mt-auto flex flex-wrap items-end gap-x-6 gap-y-3 pt-8">
                    <Link
                      to="/contact"
                      search={{ engagement: engagement.id }}
                      className={cn(btnPrimary, "group gap-2")}
                    >
                      {engagement.ctaLabel.replace(/\s*→$/, "")}
                      <BtnArrow />
                    </Link>
                    <Link
                      to="/products"
                      className={cn(
                        "group inline-flex items-center gap-2 rm-type-body font-medium",
                        textFaint,
                        "transition-colors duration-300 hover:text-white motion-reduce:transition-none",
                      )}
                      title={engagement.compareHint}
                    >
                      Compare formats
                      <BtnArrow className="group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>

                {/* Right: numbered steps */}
                <dl className="m-0 flex flex-col border-t border-white/10">
                  {engagement.steps.map((step, i) => (
                    <motion.div
                      key={step.code}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.5, ease: EASE, delay: 0.12 + i * 0.07 }
                      }
                      className="grid grid-cols-[2.25rem_1fr] gap-x-5 gap-y-1.5 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[6.5rem_1fr]"
                    >
                      <dt className="flex items-baseline gap-2.5">
                        <span className={cn(textMeta, textGhost)}>{step.code}</span>
                        <span className={cn(textMeta, "hidden sm:inline", textSubtle)}>
                          {step.title}
                        </span>
                      </dt>
                      <div className="flex flex-col gap-1.5">
                        <span className={cn(textMeta, "sm:hidden", textSubtle)}>{step.title}</span>
                        <StepBody engagementId={engagement.id} step={step} />
                      </div>
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
