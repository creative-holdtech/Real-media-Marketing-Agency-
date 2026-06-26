import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ——— Layout (4 / 8 / 16 / 24 / 32 / 48 scale) ——— */
/** Shared horizontal gutter — outer full-bleed band only (never pair with max-w on the same node) */
export const siteGutter = "px-6 md:px-10";
/** Full-width chrome band — gutter on the outside of the grid column */
export const siteChromeBand = `w-full ${siteGutter}`;
/** Grid-aligned inner column — max-width only; parent must be siteChromeBand or sectionShell */
export const sectionInner = "mx-auto w-full max-w-[var(--rm-grid-max)]";
/** @deprecated Use sectionInner — padding belongs on siteChromeBand / sectionShell */
export const pageBand = sectionInner;
export const sectionShell = `border-b border-[var(--rm-border-soft)] bg-[var(--rm-surface-raised)] py-16 md:py-20 ${siteGutter}`;
/** Hero inner column — wrap with siteChromeBand on the parent */
export const pageHeroInner = cn(sectionInner, "relative pb-10 pt-2 md:pb-20 md:pt-8");
/** @deprecated Wrap with siteChromeBand; do not use alone on a padded band */
export const pageHeroContainer = pageHeroInner;
export const proseContainer = "mx-auto w-full max-w-[var(--rm-prose-max)]";
export const formContainer = "mx-auto w-full max-w-[var(--rm-form-max)]";
export const sectionGap = "gap-6 md:gap-8";
export const sectionInnerStack = "flex flex-col gap-4 md:gap-6";
/** Title → body spacing — 16px (8px grid) */
export const sectionHeadlineLead = "flex w-full flex-col gap-4";
export const sectionHeaderGrid = `grid grid-cols-1 items-start ${sectionGap} md:grid-cols-3`;
export const sectionHeaderContent = "reveal flex flex-col items-start md:col-span-2 md:max-w-prose";
/** 3-col editorial grid — intro + card blocks share one rhythm */
export const sectionContentGrid = `grid grid-cols-1 ${sectionGap} md:grid-cols-3 md:items-stretch`;
/** 2×2 card matrix in columns 2–3 (chapter watermark in column 1) */
export const sectionCardGrid = sectionContentGrid;
export const sectionGridSpacer = "hidden md:block";
export const sectionActionRow = "flex justify-end pt-2";
/** Vertical stack of 2+ section blocks — one gap source (24px / 32px) */
export const sectionStack = cn(sectionInner, "flex flex-col", sectionGap);
/** @deprecated Prefer sectionStack (multi-child) or sectionInner (single child) */
export const sectionContainer = sectionStack;
/** Copy block → action buttons — 32px; use once (not with parent flex/grid gap on the same axis) */
export const sectionActionsOffset = "mt-8";
export const sectionActionsRow = cn(
  sectionActionsOffset,
  "flex flex-wrap items-center gap-3 md:gap-4",
);
/** Hero-scale copy → actions — 40px (larger type band) */
export const sectionHeroActionsRow = cn(
  "mt-10 flex flex-wrap items-center gap-4",
);
/** Flex stack — tag → headline uses the same gap as sectionContentGrid rows. */
export const sectionTagLeadStack = cn("flex flex-col", sectionGap);
/**
 * Hero lines eyebrow → headline — 16px at all breakpoints.
 * Centered hero can't mirror desktop 3-col (tag beside headline); md:gap-8 reads too loose.
 */
export const heroTagLeadStack = "flex flex-col gap-4";
/** Centered hero intro — lines eyebrow + display headline. */
export const heroIntroStack = cn(heroTagLeadStack, "items-center text-center");
/** @deprecated Use sectionTagLeadStack / heroIntroStack */
export const heroEyebrowOffset = "mb-8";
/** Hero headline → standfirst — 24px (larger than sectionHeadlineLead) */
export const heroHeadlineLead = "flex w-full flex-col gap-6";
/** Shared section divider — one token sitewide */
export const borderSoft = "border-[var(--rm-border-soft)]";
/** List row separators — pair with divide-y */
export const divideSoft = "divide-[var(--rm-border-soft)]";

/* ——— Typography — 8px grid via .rm-type-* (styles.css) ——— */
export const textDisplay = "rm-type-display text-[var(--rm-ink)]";
export const textDisplayMuted = "rm-type-display-muted";
export const textNav = "rm-type-nav";
export const sectionHeadline = "rm-type-section-headline text-[var(--rm-ink)]";
export const textMeta = "rm-type-meta";
export const textLabel = "rm-type-body rm-type-body-strong text-[var(--rm-text-muted)]";
export const textValue = "rm-type-body text-[var(--rm-ink)]";
export const textMetric = "rm-type-section-headline tabular-nums text-[var(--rm-ink)]";
export const textCardBody = "rm-type-body text-[var(--rm-text-body)]";
export const textBlogMeta = textMeta;
export const sectionChapterNumeral = "rm-type-meta tabular-nums text-[var(--rm-text-ghost)]";
export const bodyCopy = "rm-type-body max-w-prose text-[var(--rm-text-body)]";
export const bodyCopyStrong = "rm-type-body rm-type-body-strong max-w-prose";
const standfirstType = "rm-type-body rm-type-body-strong text-balance text-white/90";
/** Centered band subtitle — insights meta title, CTA accent (42ch) */
export const bandSubtitle = cn(standfirstType, "mx-auto block max-w-[42ch]");
/** Left-aligned section standfirst — studio intro body */
export const sectionStandfirst = cn(standfirstType, "block w-full");
export const textSubtle = "text-[var(--rm-text-subtle)]";
export const textFaint = "text-[var(--rm-text-faint)]";
export const textGhost = "text-[var(--rm-text-ghost)]";
/** Hero centered copy column */
export const heroCopyLayout =
  "mx-auto flex w-full max-w-[36rem] flex-col items-center text-center";
/** Hero / CTA standfirst under display headline */
export const heroStandfirst =
  "rm-copy-standfirst mx-auto max-w-[36ch] text-pretty text-balance";
export const heroSubcopy = "rm-type-body text-[var(--rm-text-body)]";
export const heroSubcopyStrong = "rm-type-body rm-type-body-strong text-[var(--rm-ink)]";
/** Section intro block — tag column + headline column */
export const sectionIntroStack = "flex flex-col gap-4";

/* ——— Chrome (light header/footer variant) ——— */
export const chromeLightInk = "text-[var(--rm-light-ink)]";
export const chromeLightMuted = "text-[var(--rm-light-muted)]";
export const chromeLightBorder = "border-[var(--rm-light-border)]";
export const chromeLightSurface = "bg-[var(--rm-light-surface)]";

/* ——— Surfaces ——— */
export const surfaceCardShell =
  "overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)] text-[var(--rm-ink)] shadow-none transition-[border-color,background-color] duration-200 md:rounded-[2rem]";
export const surfaceCardPadding = "p-6 md:p-8";
export const surfaceCardSeparator = "bg-[var(--rm-border-soft)]";
export const surfaceCardTitle = "rm-type-subsection text-[var(--rm-ink)]";
/** H3 — list items, timeline steps, divider rows (below section headlines) */
export const subsectionTitle = "rm-type-subsection text-[var(--rm-ink)]";
export const surfaceCardTitleMd = surfaceCardTitle;
export const surfaceCardTitleLg = surfaceCardTitle;
export const sectionPill =
  "rm-type-tag inline-flex max-w-full rounded-full border border-[var(--rm-border-soft)] px-3 py-1 normal-case text-[var(--rm-text-muted)]";
export const interactiveSurfaceCard =
  "rm-interactive-surface cursor-pointer transition-[border-color,background-color] duration-200 ease-out hover:border-[var(--rm-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]";

/** @deprecated Use surfaceCardShell */
export const pricingCardSurface = surfaceCardShell;
/** @deprecated Use interactiveSurfaceCard */
export const interactiveWhiteCard = interactiveSurfaceCard;

/* ——— Buttons ——— */
const btnBase =
  "inline-flex rm-touch cursor-pointer items-center justify-center rounded-full rm-type-body font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline-none motion-safe:hover:-translate-y-0.5 active:scale-[0.98]";
export const btnPrimary = cn(
  btnBase,
  "w-fit bg-white px-6 py-3 text-black hover:bg-[#efeeea] focus-visible:ring-2 focus-visible:ring-[#efeeea] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
);
export const btnPrimarySm = cn(
  btnBase,
  "shrink-0 bg-white px-4 py-2 text-black hover:bg-[#efeeea] focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-float)]",
);
export const btnOutline = cn(
  btnBase,
  "border border-[var(--rm-border-strong)] px-6 py-3 text-[var(--rm-ink)] hover:border-white focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
);
/** Ghost CTA on dark bands (hero, cases footer link). */
export const btnOutlineOnDark = cn(
  btnOutline,
  "border-white/30 text-white hover:border-white/70 hover:bg-white/[0.04]",
);
export const btnGhostLink = cn(
  btnBase,
  "group min-h-11 gap-2 px-2 text-[var(--rm-text-muted)] hover:bg-transparent hover:text-[var(--rm-ink)] focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-float)] motion-safe:hover:translate-y-0 active:scale-100",
);

const btnArrowMotion =
  "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px] motion-reduce:group-hover:translate-x-0";

export function BtnArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("inline-block shrink-0", btnArrowMotion, className)}
      width="16"
      height="16"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5h11M9.5 4l4.5 4.5L9.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Canonical CTA with arrow — single interaction pattern */
export function CtaButton({
  children,
  to,
  href,
  variant = "primary",
  className,
  onClick,
}: {
  children: ReactNode;
  to?: "/blog" | "/cases" | "/contact" | "/audit" | "/about" | "/services" | "/products";
  href?: string;
  variant?: "primary" | "outline" | "outlineDark" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const styles = {
    primary: btnPrimary,
    outline: btnOutline,
    outlineDark: btnOutlineOnDark,
    ghost: btnGhostLink,
  }[variant];
  const classes = cn(styles, "group gap-2", className);
  const label = typeof children === "string" ? children.replace(/\s*→$/, "") : children;

  const content = (
    <>
      {label}
      {variant !== "ghost" ? <BtnArrow /> : <span aria-hidden>→</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}

export function FramerTag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "rm-type-tag inline-block rounded-full border border-[var(--rm-border-soft)] px-4 py-2 text-[var(--rm-text-muted)]",
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
  contentClassName,
}: {
  tag: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className={cn(sectionHeaderGrid, className)}>
      <div className="reveal">
        <FramerTag>{tag}</FramerTag>
      </div>
      {children ? (
        <div className={cn(sectionHeaderContent, contentClassName)}>{children}</div>
      ) : null}
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
  return (
    <CtaButton to={to} href={href} variant="primary" className={className}>
      {children}
    </CtaButton>
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
  return (
    <CtaButton to={to} href={href} variant="outline" className={className}>
      {children}
    </CtaButton>
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
