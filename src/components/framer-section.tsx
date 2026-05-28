import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ——— Layout (4 / 8 / 16 / 24 / 32 / 48 scale) ——— */
export const sectionShell =
  "border-b border-[var(--rm-border-soft)] bg-[var(--rm-surface-raised)] px-6 py-16 md:px-10 md:py-20";
export const sectionContainer =
  "mx-auto flex w-full max-w-[1280px] flex-col gap-8 md:gap-12";
export const sectionGap = "gap-6 md:gap-8";
export const sectionInnerStack = "flex flex-col gap-4 md:gap-6";
export const sectionHeaderGrid = `grid grid-cols-1 items-start ${sectionGap} md:grid-cols-3`;
export const sectionHeaderContent = "reveal md:col-span-2 md:max-w-prose";
export const sectionContentGrid = `grid grid-cols-1 ${sectionGap} md:grid-cols-3 md:items-stretch`;
export const sectionGridSpacer = "hidden md:block";
export const sectionActionRow = "flex justify-end pt-2";

/* ——— Typography (modular scale: 12 / 14 / 16 / 18 / 20 / 24 / 30) ——— */
export const sectionHeadline =
  "text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--rm-ink)] md:text-3xl md:leading-[1.12]";
export const textMeta =
  "text-xs font-medium uppercase tracking-[0.08em] text-[var(--rm-text-muted)]";
export const textLabel = "text-sm font-medium text-[var(--rm-text-muted)]";
export const textValue =
  "text-base font-normal leading-relaxed text-[var(--rm-ink)] md:text-lg md:leading-[1.6]";
export const textMetric =
  "text-2xl font-semibold leading-none tracking-[-0.03em] text-[var(--rm-ink)] tabular-nums md:text-3xl";
export const textCardBody =
  "text-sm font-normal leading-relaxed text-[var(--rm-text-body)] md:text-base md:leading-[1.65]";
export const textBlogMeta = textMeta;
export const sectionChapterNumeral =
  "text-xs font-semibold tabular-nums tracking-[0.12em] text-white/35";
export const bodyCopy =
  "max-w-prose text-base font-normal leading-relaxed text-[var(--rm-text-body)] md:text-lg md:leading-[1.65]";
export const bodyCopyStrong =
  "max-w-prose text-base font-medium leading-relaxed text-[var(--rm-ink)] md:text-lg md:leading-[1.65]";

/* ——— Surfaces ——— */
export const surfaceCardShell =
  "overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)] text-[var(--rm-ink)] shadow-none transition-[border-color,background-color] duration-200 md:rounded-[2rem]";
export const surfaceCardPadding = "p-6 md:p-8";
export const surfaceCardSeparator = "bg-[var(--rm-border-soft)]";
export const surfaceCardTitle =
  "text-xl font-semibold leading-snug tracking-[-0.03em] text-[var(--rm-ink)] md:text-2xl";
export const surfaceCardTitleMd = surfaceCardTitle;
export const surfaceCardTitleLg = surfaceCardTitle;
export const sectionPill =
  "inline-flex max-w-full rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-medium tracking-[0.06em] text-[var(--rm-text-muted)] normal-case";
export const interactiveSurfaceCard =
  "rm-interactive-surface cursor-pointer transition-[border-color,background-color,transform] duration-200 ease-out hover:border-[var(--rm-border-strong)] motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)] active:translate-y-0";

/** @deprecated Use surfaceCardShell */
export const pricingCardSurface = surfaceCardShell;
/** @deprecated Use interactiveSurfaceCard */
export const interactiveWhiteCard = interactiveSurfaceCard;

/* ——— Buttons ——— */
const btnBase =
  "inline-flex rm-touch cursor-pointer items-center justify-center rounded-full text-sm transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline-none motion-safe:hover:-translate-y-0.5 active:scale-[0.98]";
export const btnPrimary = cn(
  btnBase,
  "w-fit bg-white px-6 py-3 font-semibold tracking-[-0.04em] text-black hover:bg-[#efeeea] focus-visible:ring-2 focus-visible:ring-[#efeeea] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
);
export const btnPrimarySm = cn(
  btnBase,
  "bg-white px-5 py-2.5 font-semibold tracking-[-0.04em] text-black hover:bg-[#efeeea] focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-float)]",
);
export const btnOutline = cn(
  btnBase,
  "border border-[var(--rm-border-strong)] px-6 py-3 font-medium text-[var(--rm-ink)] hover:border-white focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
);
export const btnGhostLink = cn(
  btnBase,
  "min-h-11 px-2 font-medium text-[var(--rm-text-muted)] hover:bg-transparent hover:text-[var(--rm-ink)] focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-float)] motion-safe:hover:translate-y-0 active:scale-100",
);

export function FramerTag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-[var(--rm-border-soft)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-[var(--rm-text-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  tag,
  children,
  className,
}: {
  tag: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(sectionHeaderGrid, className)}>
      <div className="reveal">
        <FramerTag>{tag}</FramerTag>
      </div>
      {children ? <div className={sectionHeaderContent}>{children}</div> : null}
    </div>
  );
}

export function FramerPrimaryButton({
  children,
  to,
  href,
  className,
}: {
  children: ReactNode;
  to: "/blog" | "/cases" | "/contact" | "/audit" | "/about" | "/services" | "/products";
  href?: string;
  className?: string;
}) {
  const classes = cn(btnPrimary, className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

export function FramerOutlineButton({
  children,
  to,
  href,
  className,
}: {
  children: ReactNode;
  to: "/blog" | "/cases" | "/contact" | "/audit" | "/about" | "/services" | "/products";
  href?: string;
  className?: string;
}) {
  const classes = cn(btnOutline, className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d="M16 8V24M8 16H24" stroke="rgb(122, 122, 122)" strokeWidth="1.5" />
    </svg>
  );
}

export function PlusRow({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={`flex w-full max-w-[320px] items-start justify-between ${className ?? ""}`}>
      {Array.from({ length: count }).map((_, i) => (
        <PlusIcon key={i} />
      ))}
    </div>
  );
}
