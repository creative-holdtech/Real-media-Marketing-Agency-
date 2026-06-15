import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { sectionContainer, sectionShell, textMeta } from "@/components/framer-section";
import { homepageEngagements, type Engagement } from "@/lib/engagements";
import { cn } from "@/lib/utils";

type FormatId = "sprint" | "marathon";

const EASE = [0.22, 1, 0.36, 1] as const;
const UNDERLINE_SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("inline-block", className)}
      width="16"
      height="16"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5h11M9.5 4l4.5 4.5L9.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepBody({
  engagementId,
  step,
}: {
  engagementId: Engagement["id"];
  step: Engagement["steps"][number];
}) {
  const isSprintAudit = engagementId === "sprint" && step.code === "01";

  if (!isSprintAudit) {
    return <dd className="m-0 text-[0.9375rem] leading-[1.6] text-white/55">{step.body}</dd>;
  }

  return (
    <dd className="m-0 text-[0.9375rem] leading-[1.6] text-white/55">
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
        {/* Header */}
        <header className="flex max-w-[36rem] flex-col gap-3">
          <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-normal uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
            Engagement formats
          </span>
          <h2
            id="engage-heading"
            className="m-0 text-[clamp(1.5rem,1.9vw,1.9rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white"
          >
            <span className="block">Two ways to work with us.</span>
            <span className="block text-white/55">Both end in shipped revenue.</span>
          </h2>
        </header>

        {/* Tab switcher with sliding indicator */}
        <div
          role="tablist"
          aria-label="Engagement formats"
          className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-1 border-b border-white/12"
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
                  "text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-none tracking-[-0.03em]",
                  "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black",
                  isActive ? "text-white" : "text-white/30 hover:text-white/60",
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
        <div id={panelId} role="tabpanel" aria-labelledby={activeTabId} className="mt-12">
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
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                  <span className="tabular-nums">
                    {engagement.metricBig} {engagement.metricUnitLabel}
                  </span>
                  <span className="mx-2 text-white/25">·</span>
                  {engagement.metricUnitSub}
                </p>

                <p className="mt-5 max-w-[34ch] text-[clamp(1.0625rem,1.3vw,1.25rem)] font-medium leading-[1.5] tracking-[-0.005em] text-white/90">
                  {engagement.intro}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  <Link
                    to="/contact"
                    search={{ engagement: engagement.id }}
                    className={cn(
                      "group inline-flex h-[3.25rem] items-center gap-2.5 rounded-full bg-white px-6",
                      "text-[0.9375rem] font-semibold tracking-[0.01em] text-black",
                      "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
                      "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    )}
                  >
                    {engagement.ctaLabel.replace(/\s*→$/, "")}
                    <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px] motion-reduce:group-hover:translate-x-0" />
                  </Link>
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white/85 motion-reduce:transition-none"
                    title={engagement.compareHint}
                  >
                    Compare formats
                    <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
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
                      <span className="text-xs tabular-nums text-white/30">{step.code}</span>
                      <span className={cn(textMeta, "hidden text-white/70 sm:inline")}>
                        {step.title}
                      </span>
                    </dt>
                    <div className="flex flex-col gap-1.5">
                      <span className={cn(textMeta, "text-white/70 sm:hidden")}>{step.title}</span>
                      <StepBody engagementId={engagement.id} step={step} />
                    </div>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
