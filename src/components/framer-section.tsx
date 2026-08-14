import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ——— Motion (single source of truth — mirrors --rm-ease-… and --rm-motion-… in styles.css) ——— */
/** Entrance ease — matches --rm-ease-enter; used by .reveal, Reveal, hero + preloader choreography.
 * CSS's own "ease" curve: progress tracks time closely and evenly the whole
 * way through (5% at 10%, 54% at 50%, 97.5% at 90%) instead of front-loading
 * — the old [0.22,1,0.36,1] hit 70% of the way there in the first ~15% of
 * the duration, so most reveals read as a quick pop followed by a long,
 * imperceptible tail rather than something you can watch move. */
export const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const;
/** Hover/UI ease — matches --rm-ease-out. */
export const EASE_OUT = [0.2, 0, 0, 1] as const;
/** Exit ease — matches --rm-ease-in. */
export const EASE_IN = [0.4, 0, 1, 1] as const;
/** Seconds — matches --rm-motion-ui (160ms) */
export const DURATION_UI = 0.16;
/** Seconds — matches --rm-motion-standard (240ms) */
export const DURATION_STANDARD = 0.24;
/** Seconds — matches --rm-motion-editorial (480ms) */
export const DURATION_EDITORIAL = 0.48;
/** Seconds — matches --rm-motion-enter (550ms), the .reveal/Reveal default */
export const DURATION_ENTER = 0.55;
/** Seconds — matches the .reveal[data-delay] 80ms step */
export const STAGGER_STEP = 0.08;
/**
 * Hover/interaction ease — sourced verbatim from mdx.so's shipped CSS
 * (cubic-bezier(.625,.05,0,1), used on every hover transform there: arrow
 * slides, underline retracts, char flips). Deliberately distinct from
 * EASE_ENTER — hover is a sharper, faster deceleration than page entrances.
 */
export const EASE_HOVER = [0.625, 0.05, 0, 1] as const;
/** Seconds — mdx.so's standard hover *transform* duration (arrow slide, underline scaleX). */
export const DURATION_HOVER = 0.6;
/** Seconds — mdx.so's hover *color* duration (always faster than the transform it accompanies). */
export const DURATION_HOVER_FAST = 0.3;

/* ——— Layout (4 / 8 / 16 / 24 / 32 / 48 scale) ——— */
/** Motion tokens: --rm-ease-out, --rm-ease-enter, --rm-motion-ui (160ms), --rm-motion-standard (240ms), --rm-motion-editorial (480ms) — see styles.css :root */
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
/** Standfirst → supporting list — 16px, matches sectionHeadlineLead */
export const sectionLeadStack = "flex flex-col gap-4";
/** Section headline → standfirst / lead block — 8px */
export const sectionHeadlineLead = "flex w-full flex-col gap-2";
/** In-panel kicker (meta, metric) → standfirst — 16px */
export const sectionPanelLead = "flex flex-col gap-4";
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
/** Action row inside a flex/grid gap parent — no extra mt on the same axis */
export const sectionActionsInline = "flex flex-wrap items-center gap-3 md:gap-4";
/** Hero-scale copy → standfirst/CTA row — 32px */
export const sectionHeroActionsRow = cn(
  "mt-8 flex flex-wrap items-center gap-4",
);
/** Flex stack — tag → headline, 8px sitewide. */
export const sectionTagLeadStack = "flex flex-col gap-2";
/**
 * Hero eyebrow → headline block — 8px sitewide.
 * Centered hero intro; do not use heroTagLeadStack (16px) here.
 */
export const heroEyebrowStack = "flex flex-col gap-2";
export const heroIntroStack = cn(heroEyebrowStack, "w-full items-center text-center");
/** @deprecated Use sectionTagLeadStack / heroIntroStack */
export const heroEyebrowOffset = "mb-8";
/** Hero display headline → standfirst — 16px */
export const heroHeadlineLead = "flex w-full flex-col gap-4";
/** Centered CTA band — h2 → standfirst — 8px, matches section-intro rhythm */
export const ctaBandCopyStack = "flex w-full flex-col gap-2 text-balance";
/** Meta / label → headline in one column — 8px sitewide. */
export const sectionLabelHeadlineStack = "flex flex-col gap-2";
/** Meta tag → headline block when stacked in one grid column — 16px */
export const sectionTagHeadlineColumn = "flex flex-col gap-4";
/** Shared section divider — one token sitewide */
export const borderSoft = "border-[var(--rm-border-soft)]";
/** List row separators — pair with divide-y */
export const divideSoft = "divide-[var(--rm-border-soft)]";
/** Panel zone separator — border + 32/48px pad */
export const sectionZoneDivider = cn("border-t pt-8 md:pt-12", borderSoft);
/** Panel zone separator inside a gap parent — parent gap handles space above the rule, pt matches it below */
export const sectionZoneDividerNested = cn("border-t pt-8", borderSoft);
/** Products — format chooser column */
export const productsFormatColumn = cn("flex flex-col", sectionGap);
/** Products — detail panel interior — uniform 32px rhythm between all zones */
export const productsPanelStack = "flex flex-col gap-8";
export const productsZoneStack = "flex flex-col gap-6";
export const productsChoiceGrid = "grid gap-4 sm:grid-cols-2";
export const productsOperatingGrid = cn("grid sm:grid-cols-3", sectionGap);
export const textInk = "text-[var(--rm-ink)]";

/* ——— Typography — 8px grid via .rm-type-* (styles.css) ——— */
export const textDisplay = "rm-type-display text-[var(--rm-ink)]";
export const textDisplayMuted = "rm-type-display-muted";
export const textNav = "rm-type-nav";
export const sectionHeadline = "rm-type-section-headline text-[var(--rm-ink)]";
/** h2 line 2 — same scale as sectionHeadline, muted ink only (not a subheading) */
export const sectionHeadlineAccent = "block text-pretty text-[var(--rm-text-subtle)]";
export const textMeta = "rm-type-meta";
export const textLabel = "rm-type-body rm-type-body-strong text-[var(--rm-text-muted)]";
export const textValue = "rm-type-body text-[var(--rm-ink)]";
export const textMetric = "rm-type-section-headline tabular-nums text-[var(--rm-ink)]";
export const textCardBody = "rm-type-body text-[var(--rm-text-body)]";
export const textBlogMeta = textMeta;
export const sectionChapterNumeral = "rm-type-meta tabular-nums text-[var(--rm-text-ghost)]";
export const bodyCopy = "rm-type-body max-w-prose text-[var(--rm-text-body)]";
export const bodyCopyStrong = "rm-type-body rm-type-body-strong max-w-prose";
/** Paragraph under section h2 — lead standfirst; width comes from section header column */
export const sectionSubheading = "rm-copy-standfirst block w-full";
/** Centered band standfirst — CTA, insights meta (42ch) */
export const bandSubtitle =
  "rm-copy-standfirst rm-copy-standfirst--band mx-auto block max-w-[42ch] text-balance";
/** @deprecated Use sectionSubheading */
export const sectionStandfirst = sectionSubheading;
export const textSubtle = "text-[var(--rm-text-subtle)]";
export const textFaint = "text-[var(--rm-text-faint)]";
export const textGhost = "text-[var(--rm-text-ghost)]";
/** Engage timeline — shared with home #engage (services-section) */
export const engageStepsShell = "rm-engage-steps relative pt-6 md:pt-8";
export const engageStepsLeadOffset = "mt-10 md:mt-14";
export const engageStepsGrid = "grid gap-x-8 md:grid-cols-3 lg:gap-x-12";
export const engageStepItem = cn(
  "rm-engage-step group/step relative m-0 flex flex-col gap-1.5 py-5 first:pt-0 md:gap-2 md:py-0",
  "max-md:border-b max-md:last:border-b-0",
  borderSoft,
);
export const engageStepCode = cn(textMeta, textGhost, "rm-engage-step__code");
export const engageStepTitle = cn(textLabel, textSubtle, "rm-engage-step__title");
/** Engage panel lead — meta + standfirst (home #engage) */
export const engagePanelLead = cn("rm-engage-panel__lead min-w-0", sectionPanelLead);
export const formatOperatingStrip = cn("m-0 border-y py-6", borderSoft, productsOperatingGrid);
export const subsectionTitleMuted = cn("rm-type-subsection", textSubtle);
export const productsProofGrid = "rm-proof-grid grid sm:grid-cols-3";
export const productsProofItem = "rm-proof-item flex flex-col gap-4";
/** Hero centered copy column */
export const heroCopyLayout =
  "mx-auto flex w-full max-w-[64rem] flex-col items-center text-center";
/** Hero / CTA standfirst under display headline */
export const heroStandfirst =
  "rm-copy-standfirst mx-auto max-w-[36ch] text-pretty text-balance";
export const heroSubcopy = "rm-type-body text-[var(--rm-text-body)]";
export const heroSubcopyStrong = "rm-type-body rm-type-body-strong text-[var(--rm-ink)]";
/** @deprecated Use sectionHeadlineLead */
export const sectionIntroStack = sectionHeadlineLead;

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
/**
 * Per-property stagger matches mdx.so exactly: color/background/border settle
 * in 300ms while the transform (hover lift) takes the full 600ms — see
 * EASE_HOVER. Shared by buttons and any interactive element with a color +
 * lift hover (social icons, etc.) so the pacing reads as one system.
 */
export const hoverColorTransform =
  "transition-[background-color_300ms_cubic-bezier(0.625,0.05,0,1),border-color_300ms_cubic-bezier(0.625,0.05,0,1),color_300ms_cubic-bezier(0.625,0.05,0,1),transform_600ms_cubic-bezier(0.625,0.05,0,1)]";
const btnBase = cn(
  "inline-flex rm-touch cursor-pointer items-center justify-center rounded-full rm-type-body font-medium",
  hoverColorTransform,
  "focus-visible:outline-none motion-safe:hover:-translate-y-0.5 active:scale-[0.98]",
);
export const btnPrimary = cn(
  btnBase,
  "w-fit bg-white px-6 py-4 text-black hover:bg-[#efeeea] focus-visible:ring-2 focus-visible:ring-[#efeeea] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
);
export const btnPrimarySm = cn(
  btnBase,
  "shrink-0 bg-white px-4 py-3 text-black hover:bg-[#efeeea] focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-float)]",
);
export const btnOutline = cn(
  btnBase,
  "border border-[var(--rm-border-strong)] px-6 py-4 text-[var(--rm-ink)] hover:border-white focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
);
/** Ghost CTA on dark bands (hero, cases footer link). */
export const btnOutlineOnDark = cn(
  btnOutline,
  "border-white/30 text-white hover:border-white/70 hover:bg-white/[0.04]",
);
/**
 * btnPrimary/btnOutline hardcode white/black for the dark theme, so they
 * invert to invisible on a .rm-section-light surface — use these instead.
 */
export const btnPrimaryOnLight = cn(
  btnBase,
  "w-fit bg-[var(--rm-light-ink)] px-6 py-4 text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-light-surface)]",
);
export const btnOutlineOnLight = cn(
  btnBase,
  "border border-[var(--rm-light-border)] px-6 py-4 text-[var(--rm-light-ink)] hover:border-[var(--rm-light-ink)] focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-light-surface)]",
);
/**
 * Underline-draw link hover — invisible at rest; on hover it draws from the
 * center outward to both edges (scaleX 0 → 1, origin-center), not a plain
 * width grow from one side. Compose with a text-color class; the underline
 * tracks currentColor so it shifts with the hover color change. For text
 * links only — an icon-only link should use plain color hover.
 */
export const underlineHoverLink = cn(
  "relative inline-block",
  "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:content-['']",
  "after:transition-transform after:duration-[500ms] after:ease-[cubic-bezier(0.625,0.05,0,1)]",
  "hover:after:scale-x-100",
);

export const btnGhostLink = cn(
  btnBase,
  "group min-h-11 gap-2 px-2 text-[var(--rm-text-muted)] hover:bg-transparent hover:text-[var(--rm-ink)] focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-float)] motion-safe:hover:translate-y-0 active:scale-100",
);

/**
 * Arrow slide — mdx.so's technique: the icon carries a same-color drop-shadow
 * offset exactly one icon-width to the left (a costless duplicate, no extra
 * DOM). On hover the real icon slides right by that same width, so it exits
 * while the duplicate slides into the vacated slot — reads as one continuous
 * arrow, not a fade. 600ms / cubic-bezier(.625,.05,0,1), verbatim from source.
 */
const BTN_ARROW_SIZE = 16;

export function BtnArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn("relative inline-block h-4 w-4 shrink-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:translate-x-4 motion-reduce:group-hover:translate-x-0"
        style={{ filter: `drop-shadow(currentColor -${BTN_ARROW_SIZE}px 0 0)` }}
        width="16"
        height="16"
        viewBox="0 0 17 17"
        fill="none"
      >
        <path
          d="M3 8.5h11M9.5 4l4.5 4.5L9.5 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Text flip — mdx.so's other hover technique on the same buttons as BtnArrow:
 * the label sits in a one-line window with a duplicate copy stacked directly
 * beneath it; hovering slides the whole stack up by one line, so the label
 * reads as continuous motion rather than a fade. Same 600ms / EASE_HOVER as
 * the arrow. String labels only — a duplicated complex ReactNode risks
 * duplicate ids/interactive children, so those render plainly instead.
 */
export function FlipLabel({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="relative inline-block h-[1.6em] w-fit overflow-hidden align-bottom">
      <span className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[1.6em] motion-reduce:group-hover:translate-y-0">
        <span className="block h-[1.6em] whitespace-nowrap leading-[1.6em]">{text}</span>
        <span className="block h-[1.6em] whitespace-nowrap leading-[1.6em]">{text}</span>
      </span>
    </span>
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
  const rawLabel = typeof children === "string" ? children.replace(/\s*→$/, "") : children;
  const isFlippable = variant !== "ghost" && typeof rawLabel === "string";
  const label = isFlippable ? <FlipLabel text={rawLabel as string} /> : rawLabel;
  // FlipLabel's visible text is aria-hidden (it's a decorative duplicate stack),
  // so the accessible name has to come from aria-label instead of content.
  const a11yLabel = isFlippable ? (rawLabel as string) : undefined;

  const content = (
    <>
      {label}
      {variant !== "ghost" ? <BtnArrow /> : <span aria-hidden>→</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} aria-label={a11yLabel}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={a11yLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={a11yLabel}>
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
