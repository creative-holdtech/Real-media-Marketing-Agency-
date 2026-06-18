import { Link } from "@tanstack/react-router";

import { MagneticButton, Reveal } from "@/components/motion-bits";
import {
  BtnArrow,
  bodyCopy,
  btnOutline,
  btnPrimary,
  sectionContainer,
  sectionHeadline,
  sectionHeadlineLead,
  sectionShell,
  textMeta,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

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
  title = "Tell us what needs fixing",
  titleAccent = "New launch, a raise, or marketing that doesn\u2019t perform.",
  primaryLabel = "Get free audit →",
  primaryTo = "/audit",
  primaryHref,
  secondaryLabel = "See case studies →",
  secondaryTo = "/cases",
  secondaryHref,
}: Partial<CTAProps> & { title?: string }) {
  return (
    <section id="cta" aria-labelledby="unified-cta-heading" className={sectionShell}>
      <div className={cn(sectionContainer, "items-center text-center")}>
        {eyebrow ? (
          <Reveal duration={0.5}>
            <p className={cn("mb-2", textMeta)}>{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal duration={0.5}>
          <h2
            id="unified-cta-heading"
            className={cn("mx-auto max-w-lg text-balance", sectionHeadlineLead)}
          >
            <span className={cn("block", sectionHeadline)}>{title}</span>
            {titleAccent ? <span className={cn("block", bodyCopy)}>{titleAccent}</span> : null}
          </h2>
        </Reveal>
        <Reveal delay={0.1} duration={0.5}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {primaryHref ? (
              <MagneticButton
                href={primaryHref}
                strength={8}
                className={cn(btnPrimary, "group gap-2")}
              >
                {primaryLabel?.replace(/\s*→$/, "")}
                <BtnArrow />
              </MagneticButton>
            ) : (
              <Link to={primaryTo ?? "/audit"} className={cn(btnPrimary, "group gap-2")}>
                {primaryLabel?.replace(/\s*→$/, "")}
                <BtnArrow />
              </Link>
            )}
            {secondaryHref ? (
              <MagneticButton
                href={secondaryHref}
                strength={6}
                className={cn(btnOutline, "group gap-2")}
              >
                {secondaryLabel?.replace(/\s*→$/, "")}
                <BtnArrow />
              </MagneticButton>
            ) : (
              <Link to={secondaryTo ?? "/cases"} className={cn(btnOutline, "group gap-2")}>
                {secondaryLabel?.replace(/\s*→$/, "")}
                <BtnArrow />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
