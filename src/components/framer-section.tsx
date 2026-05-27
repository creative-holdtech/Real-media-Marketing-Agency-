import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const sectionShell =
  "border-b border-white/10 bg-[#0a0a0a] px-5 py-[clamp(3.5rem,8vw,5rem)] md:px-10";
export const sectionContainer =
  "mx-auto flex w-full max-w-[1280px] flex-col gap-[clamp(2rem,4vw,2.75rem)]";
export const sectionHeaderGrid = "grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-2.5";
export const sectionHeaderContent = "reveal md:col-span-2 md:max-w-[64%]";
export const sectionContentGrid = "grid grid-cols-1 gap-2 md:grid-cols-3 md:items-stretch md:gap-2";
export const sectionGridSpacer = "hidden md:block";
export const sectionActionRow = "flex justify-end";
export const sectionHeadline =
  "text-[clamp(1.625rem,2.6vw,2.375rem)] font-semibold leading-[1.12] tracking-[-0.06em]";
export const textMeta = "text-xs font-medium uppercase tracking-[0.08em] text-neutral-500";
export const textMetric =
  "text-2xl font-semibold leading-none tracking-[-0.04em] text-neutral-900 tabular-nums md:text-3xl";
export const textCardBody = "text-sm leading-relaxed text-neutral-600 md:text-base";
export const textBlogMeta = "text-xs font-medium tracking-[-0.04em] text-white/45";
export const sectionChapterNumeral =
  "text-[11px] font-semibold tabular-nums tracking-[0.14em] text-white/35";
export const pricingCardSurface = "rounded-3xl bg-[#efeee9]";
export const interactiveWhiteCard =
  "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/12 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efeee9] active:translate-y-0";
export const bodyCopy =
  "text-[18px] font-medium leading-[1.3] tracking-[-0.04em] text-white/60 md:text-[20px]";
export const bodyCopyStrong =
  "text-[18px] font-medium leading-[1.3] tracking-[-0.04em] text-white md:text-[20px]";

export function FramerTag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-white/50">
      {children}
    </span>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
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

export function FramerPrimaryButton({
  children,
  to,
  href,
}: {
  children: ReactNode;
  to: "/blog" | "/cases" | "/contact" | "/audit" | "/about" | "/services" | "/products";
  href?: string;
}) {
  const className =
    "inline-flex rm-touch w-fit items-center rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-[-0.04em] text-black transition-[background-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#efeeea] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efeeea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return null;
}
