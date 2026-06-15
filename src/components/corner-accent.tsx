import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type CornerAccentProps = {
  className?: string;
  inset?: string;
  color?: string;
};

export function CornerAccent({
  className,
  inset = "12px",
  color = "rgba(255,255,255,0.45)",
}: CornerAccentProps) {
  const style = { "--inset": inset, color } as CSSProperties;

  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)} style={style}>
      <span className="absolute h-3 w-3 border-l border-t" style={{ left: "var(--inset)", top: "var(--inset)", borderColor: color }} />
      <span className="absolute h-3 w-3 border-r border-t" style={{ right: "var(--inset)", top: "var(--inset)", borderColor: color }} />
      <span className="absolute h-3 w-3 border-b border-l" style={{ bottom: "var(--inset)", left: "var(--inset)", borderColor: color }} />
      <span className="absolute h-3 w-3 border-b border-r" style={{ bottom: "var(--inset)", right: "var(--inset)", borderColor: color }} />
    </span>
  );
}
