import type { ComponentPropsWithoutRef } from "react";

import {
  interactiveSurfaceCard,
  surfaceCardPadding,
  surfaceCardShell,
} from "@/components/framer-section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SurfaceCardProps = ComponentPropsWithoutRef<typeof Card> & {
  interactive?: boolean;
  padding?: boolean;
};

export function SurfaceCard({
  className,
  interactive = false,
  padding = false,
  children,
  ...props
}: SurfaceCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col border-0",
        surfaceCardShell,
        interactive && interactiveSurfaceCard,
        padding && surfaceCardPadding,
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
