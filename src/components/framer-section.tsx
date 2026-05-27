import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const sectionShell =
  "border-b border-white/10 bg-[#0a0a0a] px-5 py-14 md:px-10 md:py-20";
export const sectionContainer = "mx-auto flex w-full max-w-[1280px] flex-col gap-10 md:gap-12";
export const sectionHeaderGrid = "grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-2.5";
export const sectionHeaderContent = "reveal md:col-span-2 md:max-w-[64%]";
export const sectionHeadline =
  "text-[clamp(1.625rem,2.6vw,2.375rem)] font-semibold leading-[1.12] tracking-[-0.06em]";
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
  to: "/blog" | "/cases" | "/contact" | "/audit" | "/about" | "/services";
  href?: string;
}) {
  const className =
    "inline-flex w-fit items-center rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-[-0.04em] text-black transition-colors hover:bg-white/85";

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
