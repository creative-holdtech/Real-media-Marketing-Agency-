import type { ReactNode } from "react";

import {
  bodyCopy,
  FramerTag,
  pageHeroContainer,
  sectionContainer,
  sectionHeadline,
  sectionShell,
  siteGutter,
  textMeta,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

/** Canonical split display title — home / services / audit pattern */
export function SplitDisplayTitle({
  id,
  lines,
  className,
  mutedClassName,
}: {
  id?: string;
  lines: readonly string[];
  className?: string;
  mutedClassName?: string;
}) {
  const [primary, ...rest] = lines;
  const muted = rest.join(" ");

  return (
    <h1 id={id} className={cn("rm-type-display text-white", className)}>
      <span className="block">{primary}</span>
      {muted ? (
        <span className={cn("block rm-type-display-muted", mutedClassName)}>{muted}</span>
      ) : null}
    </h1>
  );
}

/** Page hero band — same grid as home */
export function PageHero({
  tag,
  title,
  titleLines,
  children,
  className,
  ambient,
}: {
  tag?: string;
  title?: ReactNode;
  titleLines?: readonly string[];
  children?: ReactNode;
  className?: string;
  ambient?: ReactNode;
}) {
  return (
    <section className={cn("relative isolate", className)}>
      {ambient}
      <div className={cn(pageHeroContainer, "pb-14 md:pb-20")}>
        {tag ? (
          <p className="reveal mb-6 md:mb-8">
            <FramerTag>{tag}</FramerTag>
          </p>
        ) : null}
        {titleLines ? <SplitDisplayTitle lines={titleLines} className="reveal" /> : null}
        {title ? <div className="reveal">{title}</div> : null}
        {children}
      </div>
    </section>
  );
}

/** Standard page section — shell + container */
export function PageSection({
  id,
  ariaLabelledBy,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  ariaLabelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={cn(sectionShell, className)}>
      <div className={cn(sectionContainer, containerClassName)}>{children}</div>
    </section>
  );
}

/** Section headline with optional muted second line */
export function SectionSplitHeadline({
  id,
  primary,
  muted,
  className,
}: {
  id?: string;
  primary: string;
  muted?: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn(sectionHeadline, "text-white", className)}>
      <span className="block">{primary}</span>
      {muted ? <span className="block rm-type-display-muted">{muted}</span> : null}
    </h2>
  );
}

/** Narrow form / prose band inside the editorial grid */
export function NarrowBand({
  as: Tag = "section",
  id,
  className,
  children,
  maxWidth = "form",
}: {
  as?: "section" | "div";
  id?: string;
  className?: string;
  children: ReactNode;
  maxWidth?: "form" | "prose";
}) {
  const max = maxWidth === "form" ? "max-w-[var(--rm-form-max)]" : "max-w-[var(--rm-prose-max)]";

  return (
    <Tag id={id} className={cn("mx-auto w-full", max, siteGutter, "py-16 md:py-24", className)}>
      {children}
    </Tag>
  );
}

export function SectionLead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn(bodyCopy, className)}>{children}</p>;
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn(textMeta, "mb-4 md:mb-6", className)}>{children}</p>;
}
