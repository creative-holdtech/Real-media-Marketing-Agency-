import { useRef, useState } from "react";
import {
  motion,
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
  const normalized = Math.min(1, Math.max(0, (progress - 0.04) / 0.92));
  const raw = normalized * lastItem;
  const step = Math.min(lastItem, Math.floor(raw));
  if (step === lastItem) return lastItem;

  const local = raw - step;
  if (local <= 0.66) return step;
  if (local >= 0.94) return step + 1;

  const transition = (local - 0.66) / 0.28;
  const eased = transition * transition * (3 - 2 * transition);
  return step + eased;
}

export function AboutStatsScroll() {
  const reduce = useReducedMotion();

  if (reduce) return <AboutStatsSection />;
  return <StatsScene />;
}

function StatsScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 32,
    mass: 0.32,
    restDelta: 0.001,
  });
  const position = useTransform(smoothProgress, steppedPosition);

  return (
    <section
      ref={sectionRef}
      id="numbers"
      aria-labelledby="numbers-heading"
      className="relative h-[440vh] border-y border-white/10 bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden pt-[var(--rm-header-offset)]">
        <div className="relative mx-auto h-full max-w-[1240px] bg-black">
          <h2 id="numbers-heading" className="sr-only">
            {aboutMetrics.title}
          </h2>

          <div className="absolute inset-0" aria-hidden="true">
            {items.map((item, index) => (
              <StatSlide
                key={item.id}
                index={index}
                position={position}
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

          <span className="sr-only">
            {items.map((item) => `${item.value}. ${item.tag}. ${item.label} `).join("")}
          </span>
        </div>
      </div>
    </section>
  );
}

function StatSlide({
  index,
  position,
  item,
}: {
  index: number;
  position: MotionValue<number>;
  item: (typeof items)[number];
}) {
  const [counterStarted, setCounterStarted] = useState(false);
  useMotionValueEvent(position, "change", (current) => {
    if (!counterStarted && Math.abs(current - index) < 0.08) setCounterStarted(true);
  });
  const y = useTransform(position, (current) => `${(index - current) * 0.82}em`);
  const opacity = useTransform(
    position,
    [index - 0.9, index - 0.22, index - 0.06, index + 0.12, index + 0.62],
    [0, 0.12, 1, 1, 0],
  );
  const scale = useTransform(position, [index - 1, index, index + 1], [0.88, 1, 0.88]);
  const copyOpacity = useTransform(
    position,
    [index - 0.56, index - 0.16, index + 0.16, index + 0.56],
    [0, 1, 1, 0],
  );
  const copyY = useTransform(position, [index - 0.6, index, index + 0.6], [26, 0, -26]);
  const copyFilter = useTransform(
    position,
    [index - 0.56, index, index + 0.56],
    ["blur(3px) brightness(0.72)", "blur(0px) brightness(1.18)", "blur(3px) brightness(0.72)"],
  );
  return (
    <motion.div
      className="rm-trust-ecosystem__fg-stat rm-trust-ecosystem__fg-stat--center absolute left-1/2 top-1/2 w-[min(86%,34rem)] -translate-x-1/2 -translate-y-1/2"
      style={{ y, opacity, scale, willChange: "transform, opacity" }}
    >
      <p className="rm-trust-ecosystem__fg-stat-value" data-count-stat={index}>
        {item.animate && item.numericTarget != null ? (
          <BigStatValue
            prefix={"prefix" in item ? item.prefix : undefined}
            to={item.numericTarget}
            suffix={item.suffix ?? ""}
            start={counterStarted}
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
          style={{ opacity: copyOpacity, y: copyY, filter: copyFilter, willChange: "transform, opacity, filter" }}
        >
          {item.tag}
        </motion.p>
        <motion.p
          className="text-balance text-[clamp(1.15rem,2.1vw,2rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white"
          style={{ opacity: copyOpacity, y: copyY, filter: copyFilter, willChange: "transform, opacity, filter" }}
        >
          {item.label}
        </motion.p>
      </div>
    </motion.div>
  );
}

function ProgressMark({ index, position }: { index: number; position: MotionValue<number> }) {
  const scaleX = useTransform(position, [index - 0.55, index, index + 0.55], [0.35, 1, 0.35]);
  const opacity = useTransform(position, [index - 0.55, index, index + 0.55], [0.28, 0.92, 0.28]);

  return (
    <motion.span
      className="h-px w-8 origin-left bg-white"
      style={{ scaleX, opacity, willChange: "transform, opacity" }}
    />
  );
}
