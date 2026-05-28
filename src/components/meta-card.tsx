import { surfaceCardPadding, textLabel } from "@/components/framer-section";
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
    <SurfaceCard interactive className={cn("min-h-[220px] md:min-h-[240px]", className)}>
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
