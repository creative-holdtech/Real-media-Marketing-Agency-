import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";

import { sectionShell, textMeta } from "@/components/framer-section";
import { homepageEngagements, type Engagement } from "@/lib/engagements";
import { cn } from "@/lib/utils";

type FormatId = "sprint" | "marathon";

const panelSpring = { type: "spring", duration: 0.42, bounce: 0 } as const;
const sectionKicker =
  "inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-normal uppercase tracking-[0.1em] text-[var(--rm-text-muted)]";
const contentWidth = "w-full min-w-0";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("inline-block", className)}
      width="17"
      height="17"
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

function WordToggle({
  engagement,
  isActive,
  onSelect,
  tabId,
  panelId,
  reduce,
}: {
  engagement: Engagement;
  isActive: boolean;
  onSelect: () => void;
  tabId: string;
  panelId: string;
  reduce: boolean | null;
}) {
  return (
    <button
      type="button"
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      onClick={onSelect}
      className={cn(
        "kn-word group block cursor-pointer border-0 bg-transparent p-0 text-left",
        "text-[clamp(4rem,9vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.03em]",
        "origin-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        reduce
          ? isActive
            ? "text-white"
            : "text-white/24"
          : cn(
              "transition-[color,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isActive
                ? "text-white translate-x-0"
                : "text-white/24 hover:text-white/62 hover:translate-x-2",
            ),
      )}
    >
      {engagement.name}
    </button>
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

  return (
    <dd className="m-0 mt-2 max-w-[44ch] text-base leading-[1.65] text-white/[0.58]">
      {isSprintAudit ? (
        <>
          <Link
            to="/audit"
            className="font-medium text-white underline decoration-white/25 underline-offset-[3px] transition-colors hover:decoration-white/50"
          >
            Free audit
          </Link>
          {step.body.replace(/^free audit/i, "")}
        </>
      ) : (
        step.body
      )}
    </dd>
  );
}

function ContentPane({
  engagement,
  labelledBy,
  reduce,
}: {
  engagement: Engagement;
  labelledBy: string;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      key={engagement.id}
      aria-labelledby={labelledBy}
      initial={
        reduce ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduce ? undefined : { opacity: 0, y: -6, filter: "blur(4px)" }}
      transition={reduce ? { duration: 0 } : panelSpring}
      className="col-start-1 row-start-1 flex w-full flex-col will-change-[opacity,transform,filter]"
    >
      <article className="flex w-full flex-col border-t border-white/[0.08]">
        <header className="flex flex-col gap-5 border-b border-white/[0.08] py-8">
          <dl className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <dt className={textMeta}>Timeline</dt>
            <dd className="m-0 text-base font-medium text-white">{engagement.time}</dd>
          </dl>
          <p className="max-w-[44ch] text-base leading-[1.65] text-white/[0.58]">{engagement.intro}</p>
        </header>

        <dl className="flex flex-col">
          {engagement.steps.map((step) => (
            <div key={step.code} className="border-b border-white/[0.08] py-6 last:border-b-0">
              <dt className={cn(textMeta, "text-white/38")}>{step.title}</dt>
              <StepBody engagementId={engagement.id} step={step} />
            </div>
          ))}
        </dl>
      </article>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          to="/contact"
          search={{ engagement: engagement.id }}
          className={cn(
            "group inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-white px-6",
            "text-base font-semibold text-black tracking-[0.01em]",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          )}
        >
          {engagement.ctaLabel.replace(/\s*→$/, "")}
          <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </Link>
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors duration-300 hover:text-white/80 motion-reduce:transition-none"
          title={engagement.compareHint}
        >
          Compare formats
          <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState<FormatId>("sprint");
  const reduce = useReducedMotion();
  const panelId = useId();
  const engagement = homepageEngagements.find((e) => e.id === active)!;
  const activeTabId = `engage-tab-${active}`;

  return (
    <section
      id="engage"
      aria-labelledby="engage-heading"
      className={cn(sectionShell, "relative overflow-hidden bg-black")}
      style={{ paddingTop: "4.75rem", paddingBottom: "4.75rem" }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col items-start justify-center self-stretch md:min-h-full">
            <div
              role="tablist"
              aria-label="Engagement formats"
              className="flex w-full flex-col items-start gap-3 text-left"
            >
              <p className={textMeta}>Choose format</p>
              <div className="flex flex-col items-start gap-1.5">
                {homepageEngagements.map((e) => (
                  <WordToggle
                    key={e.id}
                    engagement={e}
                    isActive={active === e.id}
                    onSelect={() => setActive(e.id)}
                    tabId={`engage-tab-${e.id}`}
                    panelId={panelId}
                    reduce={reduce}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={cn("flex flex-col", contentWidth)}>
            <header className="flex max-w-[26.25rem] flex-col gap-3">
              <span className={sectionKicker}>Engagement formats</span>
              <h2
                id="engage-heading"
                className="m-0 text-[clamp(1.875rem,2.05vw,2.0625rem)] font-medium leading-[1.06] tracking-[-0.02em] text-white"
              >
                <span className="block">Two ways to work with us.</span>
                <span className="block">Both end in shipped revenue.</span>
              </h2>
              <p className="text-sm leading-relaxed text-white/45">
                Select Sprint or Marathon to see scope, timeline, and next step.
              </p>
            </header>

            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={activeTabId}
              className="mt-8 w-full"
            >
              <motion.div
                layout={!reduce}
                transition={reduce ? { duration: 0 } : panelSpring}
                className="grid w-full [&>*]:col-start-1 [&>*]:row-start-1"
              >
                <AnimatePresence initial={false} mode="sync">
                  <ContentPane
                    key={engagement.id}
                    engagement={engagement}
                    labelledBy={activeTabId}
                    reduce={reduce}
                  />
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
