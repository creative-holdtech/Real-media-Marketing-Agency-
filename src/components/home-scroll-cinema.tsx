import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";

import { prefersNativeScroll } from "@/lib/performance-tier";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: null, label: "Intro", short: "00" },
  { id: "studio", label: "Studio", short: "01" },
  { id: "voice", label: "Voice", short: "02" },
  { id: "engage", label: "Engage", short: "03" },
  { id: "work", label: "Work", short: "04" },
  { id: "insights", label: "Insights", short: "05" },
  { id: "cta", label: "Start", short: "06" },
] as const;

function subscribeCoarse(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 991px), (pointer: coarse)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getCoarse() {
  return window.matchMedia("(max-width: 991px), (pointer: coarse)").matches;
}

function getCoarseServer() {
  return false;
}

export function useCinemaMotion() {
  const reduce = useReducedMotion();
  const coarse = useSyncExternalStore(subscribeCoarse, getCoarse, getCoarseServer);
  return !reduce && !coarse && !prefersNativeScroll();
}

function useActiveChapter(enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.42;
      let next = 0;

      for (let i = CHAPTERS.length - 1; i >= 0; i -= 1) {
        const chapter = CHAPTERS[i];
        if (!chapter.id) {
          if (window.scrollY < probe) next = 0;
          continue;
        }
        const el = document.getElementById(chapter.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) {
          next = i;
          break;
        }
      }

      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return active;
}

/** Fixed overlays — progress, ambient field, chapter rail. No transforms on sticky ancestors. */
export function HomeScrollCinema() {
  const enabled = useCinemaMotion();
  const { scrollYProgress } = useScroll({ layoutEffect: false });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });
  const activeChapter = useActiveChapter(enabled);

  const glowY = useTransform(progress, [0, 1], ["-12%", "108%"]);
  const glowYb = useTransform(progress, [0, 1], ["6%", "126%"]);
  const glowOpacity = useTransform(progress, [0, 0.12, 0.5, 0.88, 1], [0.18, 0.28, 0.22, 0.26, 0.16]);
  const barGlow = useTransform(progress, (v) => `0 0 18px rgba(239, 238, 234, ${0.15 + v * 0.35})`);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[58] h-[3px] bg-white/[0.04]"
      >
        <motion.div
          className="h-full origin-left bg-[#efeeea]"
          style={{ scaleX: progress, boxShadow: barGlow }}
        />
      </div>

      <motion.div
        aria-hidden
        className="rm-scroll-cinema__ambient pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        style={{ opacity: glowOpacity }}
      >
        <motion.div className="rm-scroll-cinema__orb rm-scroll-cinema__orb--a" style={{ y: glowY }} />
        <motion.div className="rm-scroll-cinema__orb rm-scroll-cinema__orb--b" style={{ y: glowYb }} />
      </motion.div>

      <nav
        aria-label="Page progress"
        className="rm-scroll-cinema__rail pointer-events-none fixed right-6 top-1/2 z-[57] hidden -translate-y-1/2 md:block lg:right-10"
      >
        <ol className="flex flex-col gap-2">
          {CHAPTERS.map((chapter, index) => {
            const isActive = index === activeChapter;
            return (
              <li key={chapter.short} className="flex items-center justify-end gap-2">
                <span
                  className={cn(
                    "block h-1 w-1 rounded-full transition-[transform,background-color,opacity] duration-500",
                    isActive ? "scale-150 bg-[#efeeea] opacity-100" : "bg-white/25 opacity-60",
                  )}
                  aria-hidden
                />
                <span className="sr-only">
                  {chapter.label}
                  {isActive ? " (current)" : ""}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
      <HomeScrollVignette progress={progress} />
    </>
  );
}

type ScrollChapterProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * plain — chapter divider only (sticky scenes, carousels, interactive cards).
   * reveal — subtle opacity + 12px settle on copy blocks, no 3D (readable).
   */
  variant?: "plain" | "reveal";
};

/**
 * Section boundary + optional editorial settle. Never applies perspective/scale —
 * that warps cards, hurts readability, and breaks calm UX on interactive blocks.
 */
export function ScrollChapter({ children, className, id, variant = "plain" }: ScrollChapterProps) {
  const enabled = useCinemaMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.94", "end 0.06"],
    layoutEffect: false,
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.5 });
  const lineScale = useTransform(progress, [0, 0.28], [0, 1]);
  const y = useTransform(progress, [0, 0.42, 1], variant === "reveal" ? [12, 0, -8] : [0, 0, 0]);
  const opacity = useTransform(progress, [0, 0.18, 0.82, 1], variant === "reveal" ? [0.72, 1, 1, 0.88] : [1, 1, 1, 1]);

  return (
    <div ref={ref} id={id} className={cn("relative", className)}>
      {enabled ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 z-[2] h-px origin-center bg-gradient-to-r from-transparent via-white/18 to-transparent md:inset-x-10"
          style={{ scaleX: lineScale, opacity: lineScale }}
        />
      ) : null}
      {enabled && variant === "reveal" ? (
        <motion.div style={{ y, opacity }}>{children}</motion.div>
      ) : (
        children
      )}
    </div>
  );
}

type HeroScrollStageProps = {
  heroRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  className?: string;
};

/** Hero copy lifts and fades on scroll — no velocity skew (keeps headline legible). */
export function HeroScrollStage({ heroRef, children, className }: HeroScrollStageProps) {
  const enabled = useCinemaMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.4 });

  const y = useTransform(progress, [0, 1], enabled ? [0, -48] : [0, 0]);
  const opacity = useTransform(progress, [0, 0.62, 1], enabled ? [1, 0.72, 0] : [1, 1, 1]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

/** Scroll-scrubbed page vignette tied to global progress (home only). */
function HomeScrollVignette({ progress }: { progress: MotionValue<number> }) {
  const enabled = useCinemaMotion();
  const opacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 0.12, 0.12, 0.18]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.55)_100%)]"
      style={{ opacity }}
    />
  );
}
