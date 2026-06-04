import type { ReactNode } from "react";

import { bodyCopy, surfaceCardPadding, textLabel } from "@/components/framer-section";
import { SurfaceCard } from "@/components/surface-card";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetaCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <SurfaceCard interactive className={cn("min-h-0 md:min-h-[200px]", className)}>
      <CardContent className={cn("flex h-full flex-col justify-between gap-0", surfaceCardPadding)}>
        <p className={textLabel}>{label}</p>
        <div className="mt-auto border-t border-[var(--rm-border-soft)] pt-5">
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
