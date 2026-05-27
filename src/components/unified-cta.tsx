import { Link } from "@tanstack/react-router";

import { MagneticButton, Reveal } from "@/components/motion-bits";
import { bodyCopy, sectionHeadline, sectionShell } from "@/components/framer-section";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  primaryLabel?: string;
  primaryTo?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  secondaryHref?: string;
};

export function UnifiedCTA({
  eyebrow,
  title = "Tell us what's stuck",
  titleAccent = "Bring us a launch, a raise, or a stalled funnel.",
  primaryLabel = "Get free audit",
  primaryTo = "/audit",
  primaryHref,
  secondaryLabel = "See case studies",
  secondaryTo = "/cases",
  secondaryHref,
}: Partial<CTAProps> & { title?: string }) {
  return (
    <section
      id="cta"
      aria-labelledby="unified-cta-heading"
      className={sectionShell}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
        {eyebrow ? (
          <Reveal duration={0.5}>
            <p className="mb-8 text-[11px] uppercase tracking-[0.28em] text-white/45">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal duration={0.5}>
          <h2 id="unified-cta-heading" className={`text-balance ${sectionHeadline} text-white`}>
            <span className="block">{title}</span>
            {titleAccent ? (
              <span className={`mt-3 block font-normal ${bodyCopy}`}>{titleAccent}</span>
            ) : null}
          </h2>
        </Reveal>
        <Reveal delay={0.1} duration={0.5}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {primaryHref ? (
              <MagneticButton
                href={primaryHref}
                strength={8}
                className="inline-flex rm-touch items-center rounded-full bg-white px-6 py-3.5 text-[13px] font-medium text-black transition-[background-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#efeeea]"
              >
                {primaryLabel}
              </MagneticButton>
            ) : (
              <Link
                to={primaryTo ?? "/audit"}
                className="inline-flex rm-touch items-center rounded-full bg-white px-6 py-3.5 text-[13px] font-medium text-black transition-[background-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#efeeea]"
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryHref ? (
              <MagneticButton
                href={secondaryHref}
                strength={6}
                className="inline-flex rm-touch items-center rounded-full border border-white/20 px-6 py-3.5 text-[13px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
              >
                {secondaryLabel}
              </MagneticButton>
            ) : (
              <Link
                to={secondaryTo ?? "/cases"}
                className="inline-flex rm-touch items-center rounded-full border border-white/20 px-6 py-3.5 text-[13px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
