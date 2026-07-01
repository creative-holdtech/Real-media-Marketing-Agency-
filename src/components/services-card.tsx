import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import {
  BtnArrow,
  bodyCopy,
  btnOutlineOnDark,
  interactiveSurfaceCard,
  sectionPill,
  surfaceCardPadding,
  surfaceCardShell,
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
  const isHomeShell = variant === "default";

  if (isHomeShell) {
    return (
      <>
        <div
          className="absolute inset-y-0 left-0 w-[2px] bg-[var(--service-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
        <div className={cn("relative z-[1] flex h-full min-h-0 flex-col gap-4 md:gap-5", surfaceCardPadding)}>
          <div className="flex items-center justify-between gap-3">
            <p className={cn(textMeta, "m-0")}>Be {s.hero.word}</p>
            <span className={cn(sectionPill, "uppercase")}>{s.shortName}</span>
          </div>
          <div className="mt-auto border-t border-[var(--rm-border-soft)] pt-5">
            <p className={cn(textMeta, "m-0")}>{s.tagline}</p>
            <h3 className={cn(subsectionTitle, "mt-2 text-white")}>{s.name}</h3>
            <p className={cn(bodyCopy, "mt-3 line-clamp-3 text-[var(--rm-text-body)]")}>
              {serviceCardIntro(s)}
            </p>
            <div className="mt-6 flex justify-end">
              <span className={cn(btnOutlineOnDark, "gap-2")}>
                View
                <BtnArrow />
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

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
          deck || compact ? "gap-0 p-4 md:p-6" : surfaceCardPadding,
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3">
          <span
            className={cn(
              "font-medium text-[var(--rm-text-muted)]",
              deck || compact ? "text-base" : "text-lg",
            )}
          >
            Be {s.hero.word}
          </span>
          <span className={cn(sectionPill, "uppercase", (compact || deck) && "text-xs")}>
            {s.shortName}
          </span>
        </div>

        <div
          className={cn(
            "flex shrink-0 flex-col gap-1 border-t border-[var(--rm-border-soft)]",
            deck || compact ? "mt-4 pt-4" : "mt-6 pt-6",
          )}
        >
          <p className={textMeta}>{s.tagline}</p>
          <h3
            className={cn(
              subsectionTitle,
              "text-white",
              compact || deck ? "text-base leading-snug md:text-lg" : "md:text-[1.75rem]",
            )}
          >
            {s.name}
          </h3>
        </div>

        <p
          className={cn(
            bodyCopy,
            "min-h-0 text-[var(--rm-text-body)]",
            deck || compact
              ? "mt-4 line-clamp-2 text-base leading-snug"
              : "mt-6 flex-1",
          )}
        >
          {serviceCardIntro(s)}
        </p>

        <div
          className={cn(
            "mt-auto flex shrink-0 justify-end",
            deck ? "pt-4" : compact ? "mt-4" : "mt-8",
          )}
        >
          <span
            className={cn(
              btnOutlineOnDark,
              "rm-deck-card-front__cta gap-2",
              (deck || compact) && "px-4 py-3 text-sm",
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
  const isHomeShell = variant === "default";

  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className={cn(
        "group relative flex cursor-pointer flex-col text-[var(--rm-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isHomeShell
          ? cn(
              surfaceCardShell,
              interactiveSurfaceCard,
              "min-h-0 overflow-hidden md:min-h-[200px]",
            )
          : cn(
              "overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-black shadow-none md:rounded-[2rem]",
              "transition-[box-shadow,border-color] duration-300",
              deck &&
                "h-full min-h-[8.5rem] hover:border-white/[0.18] hover:shadow-[0_24px_56px_rgb(0_0_0_/_0.55)] md:min-h-[11rem]",
              compact && "min-h-[11.5rem]",
              !deck && !compact && "min-h-[18rem]",
            ),
        className,
      )}
      style={{ "--service-accent": s.accent, ...style } as CSSProperties}
    >
      {children ?? <ServiceCardContent service={s} variant={variant} />}
    </Link>
  );
}
