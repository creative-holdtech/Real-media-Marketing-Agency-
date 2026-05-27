import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

import {
  btnPrimary,
  sectionContainer,
  sectionShell,
  textCardBody,
  textMeta,
} from "@/components/framer-section";
import { homepageEngagements, type Engagement, type EngagementStep } from "@/lib/engagements";
import { cn } from "@/lib/utils";

function PricingStep({
  step,
  index,
  showAuditLink,
}: {
  step: EngagementStep;
  index: number;
  showAuditLink?: boolean;
}) {
  return (
    <motion.div
      className="flex gap-5 border-t border-white/[0.08] pt-5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.15 + index * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="mt-[0.15em] shrink-0 tabular-nums text-xs font-semibold tracking-[0.12em] text-white/25">
        {step.code}
      </span>
      <div className="flex flex-col gap-1.5">
        <p className={cn("uppercase", textMeta)}>{step.title}</p>
        <p className={textCardBody}>
          {showAuditLink ? (
            <>
              <Link
                to="/audit"
                className="font-medium text-white/80 underline decoration-white/25 underline-offset-2 transition-colors hover:text-white hover:decoration-white/50 rounded-sm focus-visible:outline-none"
              >
                Free audit
              </Link>
              {step.body.replace(/^free audit/i, "")}
            </>
          ) : (
            step.body
          )}
        </p>
      </div>
    </motion.div>
  );
}

function EngagementPanel({ engagement }: { engagement: Engagement }) {
  return (
    <motion.div
      key={engagement.id}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
    >
      {/* Left: intro */}
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col gap-3">
          <p
            className="font-semibold text-[var(--rm-ink)]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.045em" }}
          >
            {engagement.time}
          </p>
          <p className={cn("max-w-[38ch]", textCardBody)}>{engagement.intro}</p>
        </div>

        <Link
          to="/contact"
          search={{ engagement: engagement.id }}
          className={cn(btnPrimary, "self-start mt-2")}
        >
          {engagement.ctaLabel}
        </Link>

        <Link
          to="/products"
          className="self-start text-sm font-medium text-[var(--rm-text-muted)] underline-offset-4 transition-colors hover:text-[var(--rm-ink)] hover:underline"
        >
          Compare formats →
        </Link>
      </motion.div>

      {/* Right: steps */}
      <div className="flex flex-col gap-0">
        {engagement.steps.map((step, i) => (
          <PricingStep
            key={`${engagement.id}-${step.code}`}
            step={step}
            index={i}
            showAuditLink={engagement.id === "sprint" && step.code === "01"}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState<"sprint" | "marathon">("sprint");
  const engagement = homepageEngagements.find((e) => e.id === active)!;

  return (
    <section id="engage" aria-labelledby="engage-heading" className={sectionShell}>
      <div className={sectionContainer}>

        {/* Header row */}
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3 md:gap-8">
          <div className="hidden md:flex md:items-end" aria-hidden>
            <span
              className="select-none pointer-events-none font-bold leading-none text-white/[0.05]"
              style={{ fontSize: "clamp(5rem, 8vw, 8rem)", letterSpacing: "-0.06em" }}
            >
              03
            </span>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[var(--rm-text-muted)]">
              Engagement formats
            </span>
            <h2
              id="engage-heading"
              className="font-semibold text-[var(--rm-ink)]"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
            >
              Two ways to work with us
            </h2>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          <div className="flex md:flex-col md:items-start md:pt-2">
            {/* Tab pills */}
            <div className="relative flex gap-2 rounded-full border border-[var(--rm-border-soft)] p-1 md:flex-col md:rounded-2xl md:gap-1">
              {homepageEngagements.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setActive(e.id)}
                  className="relative z-10 flex-1 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 md:flex-none md:rounded-xl md:px-4 md:py-3 md:text-left"
                  style={{
                    color: active === e.id ? "var(--rm-ink)" : "var(--rm-text-muted)",
                  }}
                >
                  {/* animated bg pill */}
                  {active === e.id && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-full bg-white/[0.08] md:rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative">{e.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated panel */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <EngagementPanel key={active} engagement={engagement} />
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
