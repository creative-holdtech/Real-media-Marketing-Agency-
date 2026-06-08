import type { ReactNode } from "react";

import { bodyCopy, surfaceCardPadding, textLabel } from "@/components/framer-section";
import { SurfaceCard } from "@/components/surface-card";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PlanCardMotion = "timeline" | "globe" | "spectrum" | "signal";

export function MetaCard({
  label,
  value,
  className,
  motionId,
}: {
  label: string;
  value: string;
  className?: string;
  /** Plan-scene card identity — ambient hover motion (see styles.css). */
  motionId?: PlanCardMotion;
}) {
  return (
    <SurfaceCard
      interactive
      data-plan-motion={motionId}
      className={cn(
        "rm-plan-card relative min-h-0 overflow-hidden md:min-h-[200px]",
        motionId && `rm-plan-card--${motionId}`,
        className,
      )}
    >
      {motionId ? (
        <>
          <div className="rm-plan-card__sheen" aria-hidden="true" />
          <div className="rm-plan-card__trace" aria-hidden="true" />
        </>
      ) : null}
      <CardContent
        className={cn(
          "relative z-[1] flex h-full flex-col justify-between gap-0",
          surfaceCardPadding,
        )}
      >
        <p className={textLabel}>{label}</p>
        <div className="rm-plan-card__divider mt-auto border-t border-[var(--rm-border-soft)] pt-5">
          <p className="whitespace-pre-line text-lg font-normal leading-snug text-[var(--rm-ink)] md:text-xl md:leading-[1.35]">
            {value}
          </p>
        </div>
      </CardContent>
    </SurfaceCard>
  );
}

/** About metrics — same card shell as home MetaCard, trust-band scale for the figure. */
export function MetricCard({
  tag,
  headline,
  description,
  className,
}: {
  tag: string;
  headline: ReactNode;
  description: string;
  className?: string;
}) {
  return (
    <SurfaceCard interactive className={cn("min-h-0 md:min-h-[200px]", className)}>
      <CardContent className={cn("flex h-full flex-col justify-between gap-0", surfaceCardPadding)}>
        <p className={textLabel}>{tag}</p>
        <div className="mt-auto border-t border-[var(--rm-border-soft)] pt-5">
          <p className="rm-metric-card__value">{headline}</p>
          <p className={cn(bodyCopy, "mt-3 max-w-[28ch] text-pretty")}>{description}</p>
        </div>
      </CardContent>
    </SurfaceCard>
  );
}
