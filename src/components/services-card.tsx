import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import {
  BtnArrow,
  bodyCopy,
  btnOutlineOnDark,
  sectionPill,
  surfaceCardPadding,
  textMeta,
  subsectionTitle,
} from "@/components/framer-section";
import { serviceCardIntro } from "@/lib/services";
import type { ServiceContent } from "@/lib/services/types";
import { cn } from "@/lib/utils";

export function ServiceCardContent({
  service: s,
  variant = "default",
}: {
  service: ServiceContent;
  variant?: "default" | "compact" | "deck";
}) {
  const compact = variant === "compact";
  const deck = variant === "deck";

  return (
    <>
      <div
        className="absolute inset-y-0 left-0 w-[3px] opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ background: s.accent }}
        aria-hidden
      />

      <div
        className={cn(
          "flex h-full min-h-0 flex-col",
          deck ? "gap-0 p-4 md:p-5" : compact ? "gap-0 p-4 md:p-5" : surfaceCardPadding,
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3">
          <span
            className={cn(
              "font-medium text-[var(--rm-text-muted)]",
              deck || compact ? "text-[15px] md:text-[16px]" : "text-[18px]",
            )}
          >
            Be {s.hero.word}
          </span>
          <span className={cn(sectionPill, "uppercase", (compact || deck) && "text-[10px]")}>
            {s.shortName}
          </span>
        </div>

        <div
          className={cn(
            "flex shrink-0 flex-col gap-0.5 border-t border-[var(--rm-border-soft)]",
            deck || compact ? "mt-3 pt-3" : "mt-6 pt-6",
          )}
        >
          <p className={cn(textMeta, deck && "text-[10px]")}>{s.tagline}</p>
          <h2
            className={cn(
              subsectionTitle,
              "text-white",
              compact
                ? "text-base leading-snug md:text-lg"
                : deck
                  ? "text-base leading-snug md:text-[1.125rem]"
                  : "md:text-[1.75rem]",
            )}
          >
            {s.name}
          </h2>
        </div>

        <p
          className={cn(
            bodyCopy,
            "min-h-0 text-[var(--rm-text-body)]",
            deck || compact
              ? "mt-3 line-clamp-2 text-[13px] leading-snug md:text-sm"
              : "mt-6 flex-1",
          )}
        >
          {serviceCardIntro(s)}
        </p>

        <div
          className={cn(
            "mt-auto flex shrink-0 justify-end",
            deck ? "pt-3" : compact ? "mt-4" : "mt-8",
          )}
        >
          <span
            className={cn(
              btnOutlineOnDark,
              "rm-deck-card-front__cta gap-2",
              (deck || compact) && "px-4 py-2 text-xs md:text-sm",
              compact && !deck && "text-xs",
            )}
          >
            View
            <BtnArrow />
          </span>
        </div>
      </div>
    </>
  );
}

export function ServiceCard({
  service: s,
  className,
  style,
  children,
  variant = "default",
}: {
  service: ServiceContent;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  variant?: "default" | "compact" | "deck";
}) {
  const compact = variant === "compact";
  const deck = variant === "deck";

  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className={cn(
        "overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-black text-[var(--rm-ink)] shadow-none md:rounded-[2rem]",
        "group relative flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "transition-[box-shadow,border-color] duration-300",
        deck
          ? "h-full min-h-0 overflow-hidden hover:border-white/[0.18] hover:shadow-[0_24px_56px_rgb(0_0_0_/_0.55)]"
          : compact
            ? "min-h-[11.5rem]"
            : "min-h-[18rem]",
        className,
      )}
      style={{ "--service-accent": s.accent, ...style } as CSSProperties}
    >
      {children ?? <ServiceCardContent service={s} variant={variant} />}
    </Link>
  );
}
