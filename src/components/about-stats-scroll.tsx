import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { AboutStatsSection } from "@/components/about-stats-section";
import { BigStatValue } from "@/components/studio-trust-band";
import { aboutMetrics } from "@/content/about";

const items = aboutMetrics.items;
const lastItem = items.length - 1;

function steppedPosition(progress: number) {
  const normalized = Math.min(1, Math.max(0, (progress - 0.04) / 0.8));
  const raw = normalized * lastItem;
  const step = Math.min(lastItem, Math.floor(raw));
  if (step === lastItem) return lastItem;

  const local = raw - step;
  if (local <= 0.75) return step;
  if (local >= 0.97) return step + 1;

  const transition = (local - 0.75) / 0.22;
  const eased = transition * transition * (3 - 2 * transition);
  return step + eased;
}

export function AboutStatsScroll({ id }: { id?: string } = {}) {
  const reduce = useReducedMotion();

  if (reduce) return <AboutStatsSection id={id} />;
  return <StatsScene id={id} />;
}

function StatsScene({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 36,
    mass: 0.28,
    restDelta: 0.001,
  });
  const position = useTransform(smoothProgress, steppedPosition);
  const sceneFade = useTransform(smoothProgress, [0.955, 0.995], [1, 0]);

  useMotionValueEvent(position, "change", (value) => {
    const next = Math.min(lastItem, Math.max(0, Math.round(value)));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="numbers-heading"
      className="relative h-[420vh] border-y border-white/10 bg-black text-white"
    >
      {/* IO target for PageSectionDots sits on this viewport-sized sticky div, not
          the tall scroll-track above — a section that tall reports a tiny
          intersectionRatio against its own bounding box for nearly its whole
          scroll range, which starved the "Numbers" dot of activation. */}
      <div id={id} className="sticky top-0 h-screen overflow-hidden pt-[var(--rm-header-offset)]">
        <motion.div
          className="relative mx-auto h-full max-w-[1240px] bg-black"
          style={{ opacity: sceneFade }}
        >
          <h2 id="numbers-heading" className="sr-only">
            {aboutMetrics.title}
          </h2>

          <div className="absolute inset-0" aria-hidden="true">
            {items.map((item, index) => (
              <StatSlide
                key={item.id}
                index={index}
                position={position}
                sectionProgress={scrollYProgress}
                item={item}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 md:bottom-6"
          >
            {items.map((item, index) => (
              <ProgressMark key={item.id} index={index} position={position} />
            ))}
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {activeItem.value}. {activeItem.tag}. {activeItem.label}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StatSlide({
  index,
  position,
  sectionProgress,
  item,
}: {
  index: number;
  position: MotionValue<number>;
  sectionProgress: MotionValue<number>;
  item: (typeof items)[number];
}) {
  const [counterStarted, setCounterStarted] = useState(false);
  /** Forces the slide to stay fully visible/settled for a fixed wall-clock
   * window once the counter starts — independent of scroll speed. Without
   * this, the scroll-position-driven fade below can finish before the
   * 1400ms count-up does, so the number never gets a moment to "land". */
  const holdGate = useMotionValue(0);
  useEffect(() => {
    /* sectionProgress guard: position sits at 0 while the section is still far
       below the viewport, which used to start slide 0's counter at page load —
       the count-up finished offscreen and the user never saw it (QA #315). */
    const maybeStart = () => {
      const current = position.get();
      if (sectionProgress.get() > 0.002 && current >= index - 0.32 && current < index + 0.55) {
        setCounterStarted(true);
      }
    };
    maybeStart();
    const unsubPosition = position.on("change", maybeStart);
    const unsubProgress = sectionProgress.on("change", maybeStart);
    return () => {
      unsubPosition();
      unsubProgress();
    };
  }, [index, position, sectionProgress]);
  useEffect(() => {
    if (!counterStarted) return;
    holdGate.set(1);
    const timeout = setTimeout(() => holdGate.set(0), 2000);
    return () => clearTimeout(timeout);
  }, [counterStarted, holdGate]);

  const y = useTransform(position, (current) => `${(index - current) * 0.82}em`);
  /* The hold only applies while this slide is still the one nearest the scroll
     position. Un-masked, a fast scroll left the previous slide pinned at full
     opacity for the whole 2s hold, ghosting two slides on top of each other
     for 1–3 seconds (QA #316). */
  const holdMask = useTransform(
    position,
    [index - 0.55, index - 0.35, index + 0.35, index + 0.55],
    [0, 1, 1, 0],
  );
  const hold = useTransform([holdGate, holdMask], (values: number[]) => values[0] * values[1]);
  /* Full-opacity keyframe must land at or before `index` — steppedPosition
     hard-clamps the LAST slide's position at exactly `lastItem` and never
     lets it exceed that, so a keyframe past `index` (e.g. index+0.04) was
     unreachable for the final card: it settled at ~83% opacity forever
     once the wall-clock hold expired, instead of the intended full 100%. */
  const scrollOpacity = useTransform(
    position,
    [index - 0.82, index - 0.24, index, index + 0.38, index + 0.74],
    [0, 0, 1, 1, 0],
  );
  const opacity = useTransform([scrollOpacity, hold], (values: number[]) =>
    Math.max(values[0], values[1]),
  );
  const visibility = useTransform(opacity, (value) => (value < 0.02 ? "hidden" : "visible"));
  const scale = useTransform(position, [index - 1, index, index + 1], [0.88, 1, 0.88]);
  const scrollCopyOpacity = useTransform(
    position,
    [index - 0.56, index - 0.16, index + 0.16, index + 0.56],
    [0, 1, 1, 0],
  );
  const copyOpacity = useTransform([scrollCopyOpacity, hold], (values: number[]) =>
    Math.max(values[0], values[1]),
  );
  const scrollCopyY = useTransform(position, [index - 0.6, index, index + 0.6], [26, 0, -26]);
  const copyY = useTransform([scrollCopyY, hold], (values: number[]) =>
    values[1] > 0.5 ? 0 : values[0],
  );
  return (
    <motion.div
      className="rm-trust-ecosystem__fg-stat rm-trust-ecosystem__fg-stat--center absolute left-1/2 top-1/2 w-[min(86%,34rem)] -translate-x-1/2 -translate-y-1/2"
      style={{ y, opacity, scale, visibility, willChange: "transform, opacity" }}
    >
      <p className="rm-trust-ecosystem__fg-stat-value" data-count-stat={index}>
        {item.animate && item.numericTarget != null ? (
          <BigStatValue
            prefix={"prefix" in item ? item.prefix : undefined}
            to={item.numericTarget}
            suffix={item.suffix ?? ""}
            start={counterStarted}
            duration={1100}
          />
        ) : (
          item.value
        )}
      </p>
      {/* Fixed-height reservoir — keeps the value's vertical anchor constant
          across slides no matter how many lines the tag/label wrap to. */}
      <div className="flex min-h-[7rem] flex-col justify-start sm:min-h-[8rem]">
        <motion.p
          className="rm-trust-ecosystem__fg-stat-copy mx-auto mb-4 max-w-[34ch] text-[var(--rm-text-muted)] sm:text-base"
          style={{ opacity: copyOpacity, y: copyY, willChange: "transform, opacity" }}
        >
          {item.tag}
        </motion.p>
        <motion.p
          className="text-balance text-[clamp(1.15rem,2.1vw,2rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white"
          style={{ opacity: copyOpacity, y: copyY, willChange: "transform, opacity" }}
        >
          {item.label}
        </motion.p>
      </div>
    </motion.div>
  );
}

function ProgressMark({ index, position }: { index: number; position: MotionValue<number> }) {
  const scale = useTransform(position, [index - 0.55, index, index + 0.55], [0.85, 1.2, 0.85]);
  const opacity = useTransform(position, [index - 0.55, index, index + 0.55], [0.28, 0.92, 0.28]);

  return (
    <motion.span
      className="block size-2 rounded-full bg-white"
      style={{ scale, opacity, willChange: "transform, opacity" }}
    />
  );
}
