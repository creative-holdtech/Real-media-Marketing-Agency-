import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/motion-bits";
import {
  BtnArrow,
  FlipLabel,
  bandSubtitle,
  btnOutlineOnLight,
  btnPrimaryOnLight,
  ctaBandCopyStack,
  sectionHeadline,
  sectionHeroActionsRow,
  sectionInner,
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
  sectionClassName?: string;
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
  sectionClassName,
}: Partial<CTAProps> & { title?: string }) {
  const primaryText = (primaryLabel ?? "").replace(/\s*→$/, "");
  const secondaryText = (secondaryLabel ?? "").replace(/\s*→$/, "");
  return (
    <section
      id="cta"
      aria-labelledby="unified-cta-heading"
      className={cn(sectionShell, "rm-section-light", sectionClassName)}
    >
      <div className={cn(sectionInner, "flex flex-col items-center text-center")}>
        {eyebrow ? (
          <Reveal duration={0.5}>
            <p className={cn(textMeta, "mb-4")}>{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal duration={0.5}>
          <div className={cn("mx-auto w-full max-w-lg", ctaBandCopyStack)}>
            <h2 id="unified-cta-heading" className={cn("m-0", sectionHeadline)}>
              {title}
            </h2>
            {titleAccent ? <p className={cn("m-0", bandSubtitle)}>{titleAccent}</p> : null}
          </div>
        </Reveal>
        <Reveal delay={0.1} duration={0.5}>
          <div className={cn(sectionHeroActionsRow, "justify-center")}>
            {primaryHref ? (
              <a
                href={primaryHref}
                className={cn(btnPrimaryOnLight, "group gap-2")}
                aria-label={primaryText}
              >
                <FlipLabel text={primaryText} />
                <BtnArrow />
              </a>
            ) : (
              <Link
                to={primaryTo ?? "/audit"}
                className={cn(btnPrimaryOnLight, "group gap-2")}
                aria-label={primaryText}
              >
                <FlipLabel text={primaryText} />
                <BtnArrow />
              </Link>
            )}
            {secondaryHref ? (
              <a
                href={secondaryHref}
                className={cn(btnOutlineOnLight, "group gap-2")}
                aria-label={secondaryText}
              >
                <FlipLabel text={secondaryText} />
                <BtnArrow />
              </a>
            ) : (
              <Link
                to={secondaryTo ?? "/cases"}
                className={cn(btnOutlineOnLight, "group gap-2")}
                aria-label={secondaryText}
              >
                <FlipLabel text={secondaryText} />
                <BtnArrow />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
