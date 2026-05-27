import { Link } from "@tanstack/react-router";

import {
  pricingCardSurface,
  sectionContainer,
  sectionShell,
  textCardBody,
  textMeta,
} from "@/components/framer-section";
import { homepageEngagements, type Engagement, type EngagementStep } from "@/lib/engagements";

const ctaPrimary =
  "inline-flex rm-touch items-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold tracking-[-0.04em] text-[#efeee9] transition-[background-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-neutral-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efeee9]";

const ctaSecondary =
  "inline-flex rm-touch items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efeee9] rounded-full px-1";

function PricingStep({ step, showAuditLink }: { step: EngagementStep; showAuditLink?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <p className={`uppercase ${textMeta}`}>
        {step.code} — {step.title}:
      </p>
      <p className={textCardBody}>
        {showAuditLink ? (
          <>
            <Link
              to="/audit"
              className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efeee9] rounded-sm"
            >
              Free audit
            </Link>
            {step.body.replace(/^Free audit/i, "")}
          </>
        ) : (
          step.body
        )}
      </p>
    </div>
  );
}

function PricingCard({ engagement }: { engagement: Engagement }) {
  return (
    <article className={`flex flex-col overflow-hidden ${pricingCardSurface}`}>
      <div className="flex flex-col gap-6 border-b border-neutral-300/80 p-6 md:p-8">
        <div className="flex flex-col gap-2">
          <p className={`uppercase ${textMeta}`}>{engagement.name}</p>
          <p className="text-xl font-semibold leading-snug tracking-[-0.03em] text-neutral-900 md:text-2xl">
            {engagement.time}
          </p>
        </div>
        <p className={`max-w-prose ${textCardBody}`}>{engagement.intro}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        {engagement.steps.map((step) => (
          <PricingStep
            key={`${engagement.id}-${step.code}`}
            step={step}
            showAuditLink={engagement.id === "sprint" && step.code === "01"}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-300/80 p-6 md:p-8">
        <Link to="/products" className={ctaSecondary}>
          Compare formats →
        </Link>
        <Link
          to="/contact"
          search={{ engagement: engagement.id }}
          className={ctaPrimary}
        >
          {engagement.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="engage" aria-labelledby="engage-heading" className={sectionShell}>
      <h2 id="engage-heading" className="sr-only">
        Engagement formats
      </h2>
      <div className={sectionContainer}>
        <div className="reveal grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2" data-delay="1">
          {homepageEngagements.map((engagement) => (
            <PricingCard key={engagement.id} engagement={engagement} />
          ))}
        </div>
      </div>
    </section>
  );
}
