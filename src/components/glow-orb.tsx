import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

import { cn } from "@/lib/utils";

/** Exact conic gradient from the Figma export (Ellipse 1.svg), used verbatim. */
export const GLOW_GRADIENT =
  "conic-gradient(from 90deg, rgba(6, 2, 0, 1) 0deg, rgba(144, 71, 27, 1) 233.654deg, rgba(230, 199, 153, 1) 360deg)";
const ORB_NUDGE_STRENGTH = 22;

/**
 * The Figma ellipse — shared visual across the Services/Disciplines orb and the
 * CTA form's ambient glow. Breathes continuously (CSS loop, scale + drift,
 * GPU-only), and nudges a few px toward wherever the pointer moves while
 * hovering it (same small-offset idea as MagneticButton, not a full
 * cursor-follow). Both skip under prefers-reduced-motion.
 */
export function GlowOrb({
  className,
  breathe = true,
}: {
  className?: string;
  /** Off for scroll-scale-driven usages (Disciplines) — a second GPU keyframe
   * animation layered on top of a JS-driven scale transform doubles compositing
   * cost right when scroll performance matters most, risking dropped frames. */
  breathe?: boolean;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 70, damping: 16, mass: 0.5 });

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * ORB_NUDGE_STRENGTH);
    my.set(((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * ORB_NUDGE_STRENGTH);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("relative mx-auto aspect-square", className)}
    >
      <div
        aria-hidden
        data-header-surface="dark"
        className={cn(
          "size-full rounded-full blur-[50px]",
          !reduce && breathe && "[animation:rm-orb-breathe_9s_ease-in-out_infinite]",
        )}
        style={{ background: GLOW_GRADIENT }}
      />
    </motion.div>
  );
}
