import type { ReactNode } from "react";

import {
  bodyCopy,
  FramerTag,
  sectionContainer,
  sectionContentGrid,
  sectionGridSpacer,
  sectionHeadline,
  sectionInnerStack,
  sectionShell,
  SectionHeader,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";
import { cn } from "@/lib/utils";

/** Page section shell — same as home section blocks. */
export function MarketingSection({
  id,
  ariaLabelledBy,
  className,
  children,
}: {
  id?: string;
  ariaLabelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={cn(sectionShell, className)}>
      <div className={sectionContainer}>{children}</div>
    </section>
  );
}

/** Watermark chapter numeral in content grid (home studio pattern). */
export function ChapterSpacer({
  chapter,
  className,
}: {
  chapter: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        sectionGridSpacer,
        "md:col-start-1 md:row-span-2 md:row-start-1 md:flex md:items-end md:pb-2",
        className,
      )}
      aria-hidden
    >
      <span className="pointer-events-none select-none text-[clamp(5rem,8vw,8rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.05]">
        {chapter}
      </span>
    </div>
  );
}

/** Standard section intro: tag + scroll headline + lead (home `SectionHeader` rhythm). */
export function MarketingSectionIntro({
  tag,
  title,
  titleId,
  srTitle,
  lead,
}: {
  tag: string;
  title: string;
  titleId?: string;
  srTitle?: string;
  lead?: ReactNode;
}) {
  return (
    <SectionHeader tag={tag}>
      <TextReveal
        id={titleId}
        text={title}
        className={sectionHeadline}
        ariaLabel={srTitle}
      />
      {lead ? (
        <div className={cn(sectionInnerStack, "mt-6 w-full md:mt-10")}>{lead}</div>
      ) : null}
    </SectionHeader>
  );
}

export function MarketingContentGrid({
  className,
  children,
  delay = "1",
}: {
  className?: string;
  children: ReactNode;
  delay?: string;
}) {
  return (
    <div
      className={cn("reveal", sectionContentGrid, "sm:grid-cols-2", className)}
      data-delay={delay}
    >
      {children}
    </div>
  );
}

/** Chapter numeral in label column (about page flow 01–04). */
export function ChapterNumeral({
  chapter,
  className,
}: {
  chapter: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none select-none text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.05]",
        className,
      )}
      aria-hidden
    >
      {chapter}
    </span>
  );
}

export function MarketingTagColumn({
  tag,
  chapter,
  children,
}: {
  tag: string;
  chapter?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:gap-8")}>
      <div className="reveal">
        <FramerTag>{tag}</FramerTag>
      </div>
      {chapter ? <ChapterNumeral chapter={chapter} className="hidden md:block" /> : null}
      {children}
    </div>
  );
}

export { bodyCopy, sectionInnerStack };
