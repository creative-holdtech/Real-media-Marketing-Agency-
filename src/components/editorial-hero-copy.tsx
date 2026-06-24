import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import {
  BtnArrow,
  btnOutlineOnDark,
  btnPrimary,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

/** Home (/) hero copy block — shared typography + alignment tokens. */
export const editorialHeroCopyLayout =
  "rm-hero-copy flex w-full max-w-[36rem] flex-col items-start text-left";

type HeroCta = {
  label: string;
  to?: string;
  href?: string;
};

type EditorialHeroCopyProps = {
  id?: string;
  tag?: string;
  titleLines: string[];
  subheading?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  className?: string;
  reveal?: boolean;
  children?: ReactNode;
};

function HeroCtaLink({
  cta,
  variant,
}: {
  cta: HeroCta;
  variant: "primary" | "secondary";
}) {
  const label = cta.label.replace(/\s*→$/, "");
  const classes = cn(
    variant === "primary" ? btnPrimary : btnOutlineOnDark,
    "group gap-2",
  );
  const content = (
    <>
      {label}
      <BtnArrow />
    </>
  );

  if (cta.href) {
    return (
      <a href={cta.href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={cta.to ?? "/contact"} className={classes}>
      {content}
    </Link>
  );
}

export function EditorialHeroCopy({
  id,
  tag,
  titleLines,
  subheading,
  primaryCta,
  secondaryCta,
  className,
  reveal = false,
  children,
}: EditorialHeroCopyProps) {
  const revealClass = reveal ? "reveal" : undefined;

  return (
    <div className={cn(editorialHeroCopyLayout, className)}>
      {tag ? (
        <p className={cn(revealClass, "mb-8 flex items-center gap-3")}>
          <span aria-hidden className="h-px w-12 shrink-0 bg-white/60" />
          <span className="rm-type-meta text-[var(--rm-text-body)]">{tag}</span>
        </p>
      ) : null}

      <h1 id={id} className={cn(revealClass, "rm-title-hero-lead")}>
        {titleLines[0] ? (
          <span className="block text-pretty">{titleLines[0]}</span>
        ) : null}
        {titleLines.length > 1 ? (
          <span className="block text-pretty rm-type-display-muted">
            {titleLines.slice(1).join(" ")}
          </span>
        ) : null}
      </h1>

      {subheading ? (
        <p
          className={cn(
            revealClass,
            "rm-copy-standfirst mt-6 max-w-[42ch] text-pretty",
          )}
          data-delay={reveal ? "2" : undefined}
        >
          {subheading}
        </p>
      ) : null}

      {primaryCta || secondaryCta ? (
        <div
          className={cn(revealClass, "mt-10 flex flex-wrap items-center gap-4")}
          data-delay={reveal ? "3" : undefined}
        >
          {primaryCta ? <HeroCtaLink cta={primaryCta} variant="primary" /> : null}
          {secondaryCta ? <HeroCtaLink cta={secondaryCta} variant="secondary" /> : null}
        </div>
      ) : null}

      {children}
    </div>
  );
}
