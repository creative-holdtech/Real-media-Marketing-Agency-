import type { ReactNode } from "react";

import {
  bodyCopy,
  FramerTag,
  sectionContainer,
  sectionCardGrid,
  sectionGridSpacer,
  sectionHeadline,
  sectionHeadlineLead,
  sectionInnerStack,
  sectionShell,
  SectionHeader,
  textSubtle,
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

/** Empty grid cell preserving studio chapter layout (optional watermark numeral). */
export function ChapterSpacer({ chapter, className }: { chapter?: string; className?: string }) {
  return (
    <div
      className={cn(
        sectionGridSpacer,
        "md:col-start-1 md:row-span-2 md:row-start-1 md:flex md:items-end md:pb-2",
        className,
      )}
      aria-hidden
    >
      {chapter ? (
        <span className="pointer-events-none select-none text-[clamp(5rem,8vw,8rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.05]">
          {chapter}
        </span>
      ) : null}
    </div>
  );
}

/** Standard section intro: tag + scroll headline + lead (home `SectionHeader` rhythm). */
export function MarketingSectionIntro({
  tag,
  title,
  titleLines,
  titleId,
  srTitle,
  lead,
  contentClassName,
}: {
  tag: string;
  title: string;
  titleLines?: string[];
  titleId?: string;
  srTitle?: string;
  lead?: ReactNode;
  contentClassName?: string;
}) {
  const lines =
    titleLines && titleLines.length >= 2
      ? titleLines
      : title.includes(". ")
        ? [title.slice(0, title.indexOf(". ") + 1), title.slice(title.indexOf(". ") + 2)]
        : null;

  const headline = lines ? (
    <h2
      id={titleId}
      className={cn(sectionHeadline, "m-0 max-w-[22ch] text-balance")}
      aria-label={srTitle ?? lines.join(" ")}
    >
      <span className="block text-pretty">
        <TextReveal text={lines[0]} as="span" className="text-inherit" ariaLabel={lines[0]} />
      </span>
      <span className={cn("block text-pretty", textSubtle)}>{lines[1]}</span>
    </h2>
  ) : (
    <TextReveal id={titleId} text={title} className={sectionHeadline} ariaLabel={srTitle} />
  );

  return (
    <SectionHeader tag={tag} contentClassName={contentClassName}>
      {lead ? (
        <div className={sectionHeadlineLead}>
          {headline}
          {lead}
        </div>
      ) : (
        headline
      )}
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
    <div className={cn("reveal", sectionCardGrid, className)} data-delay={delay}>
      {children}
    </div>
  );
}

/** Chapter numeral in label column (about page flow 01–04). */
export function ChapterNumeral({ chapter, className }: { chapter: string; className?: string }) {
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
  chapterAtBottom = false,
  children,
}: {
  tag: string;
  chapter?: string;
  /** Pin chapter watermark to column bottom (e.g. verticals + image panel). */
  chapterAtBottom?: boolean;
  children?: ReactNode;
}) {
  const numeral = chapter ? (
    <ChapterNumeral
      chapter={chapter}
      className={cn(
        "hidden md:block",
        chapterAtBottom && "text-[clamp(5rem,8vw,8rem)] text-white/[0.05]",
      )}
    />
  ) : null;

  return (
    <div className={cn("flex flex-col gap-6 md:gap-8", chapterAtBottom && "md:h-full")}>
      <div className="reveal shrink-0">
        <FramerTag>{tag}</FramerTag>
      </div>
      {!chapterAtBottom ? numeral : null}
      {children ? (
        <div className={cn(chapterAtBottom && "flex min-h-0 flex-1 flex-col")}>{children}</div>
      ) : null}
      {chapterAtBottom ? (
        <div className="mt-auto hidden shrink-0 md:flex md:items-end md:pb-2">{numeral}</div>
      ) : null}
    </div>
  );
}

export { bodyCopy, sectionHeadlineLead, sectionInnerStack };
