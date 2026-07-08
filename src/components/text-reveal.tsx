import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type RefObject,
} from "react";

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia("(max-width: 991px), (pointer: coarse)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMobile() {
  return window.matchMedia("(max-width: 991px), (pointer: coarse)").matches;
}

function getMobileServer() {
  return false;
}

type TextRevealProps = {
  text: string;
  className?: string;
  baseColor?: string;
  revealColor?: string;
  /** Color wipe (headlines) or opacity fade (long-form quotes). */
  variant?: "color" | "opacity";
  /** Lift, deblur, and brighter cascade — editorial quotes. */
  expressive?: boolean;
  /** Fires once when scroll reveal completes or when motion is skipped. */
  onComplete?: () => void;
  /** When set, used as the visible heading id for `aria-labelledby` on the section. */
  id?: string;
  ariaLabel?: string;
  /** Semantic element — use h2 for section headings in long-form pages. */
  as?: "p" | "h2" | "h3" | "span";
};

const CHUNK_SIZE = 3;
const EXPRESSIVE_CHUNK_SIZE = 2;
const OPACITY_BASE = 0.34;
const OPACITY_BASE_EXPRESSIVE = 0.14;
const OPACITY_REVEAL = 1;

function chunkWords(words: string[], size: number) {
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks;
}

function RevealChunk({
  children,
  progress,
  range,
  variant,
  baseColor,
  revealColor,
  expressive,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  variant: "color" | "opacity";
  baseColor: string;
  revealColor: string;
  expressive?: boolean;
}) {
  const color = useTransform(progress, range, [baseColor, revealColor]);
  const opacity = useTransform(
    progress,
    range,
    [expressive ? OPACITY_BASE_EXPRESSIVE : OPACITY_BASE, OPACITY_REVEAL],
  );
  const y = useTransform(progress, range, expressive ? [18, 0] : [0, 0]);
  const blur = useTransform(progress, range, expressive ? [10, 0] : [0, 0]);
  const brightness = useTransform(progress, range, expressive ? [0.72, 1.18] : [1, 1]);
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness})`;

  const style =
    variant === "color"
      ? { color }
      : expressive
        ? { opacity, y, filter }
        : { opacity };

  return (
    <motion.span style={style} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function TextReveal({
  text,
  className,
  baseColor = "rgb(153, 153, 153)",
  revealColor = "rgb(255, 255, 255)",
  variant = "color",
  expressive = false,
  onComplete,
  id,
  ariaLabel,
  as: Tag = "p",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, getMobileServer);
  const ref = useRef<HTMLElement>(null);
  const [complete, setComplete] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: expressive ? ["start 0.9", "start 0.36"] : ["start 0.92", "start 0.35"],
    layoutEffect: false,
  });

  const chunks = useMemo(
    () => chunkWords(text.trim().split(/\s+/), expressive ? EXPRESSIVE_CHUNK_SIZE : CHUNK_SIZE),
    [text, expressive],
  );
  const HeadingTag = Tag as ElementType;
  const skipMotion = reduce || mobile;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.98 && !complete) {
      setComplete(true);
      onComplete?.();
    }
  });

  useEffect(() => {
    if (skipMotion) {
      setComplete(true);
      onComplete?.();
      return;
    }
    // Landing already scrolled past the trigger range (anchor jump, back/forward
    // cache) fires no scroll event, so the reveal would otherwise stay frozen
    // mid-animation until the user scrolls again. Recheck once measured.
    const raf = requestAnimationFrame(() => {
      if (scrollYProgress.get() >= 0.98) {
        setComplete(true);
        onComplete?.();
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [skipMotion, onComplete, scrollYProgress]);

  if (skipMotion || complete) {
    return (
      <HeadingTag
        id={id}
        className={className}
        style={variant === "opacity" ? undefined : { color: revealColor }}
        aria-label={ariaLabel}
      >
        {text}
      </HeadingTag>
    );
  }

  return (
    <HeadingTag
      id={id}
      ref={ref as RefObject<HTMLElement>}
      className={className}
      aria-label={ariaLabel}
    >
      {chunks.map((chunk, index) => {
        const start = index / chunks.length;
        const end = Math.min(1, (index + (expressive ? 1.5 : 1.2)) / chunks.length);
        return (
          <RevealChunk
            key={`${chunk}-${index}`}
            progress={scrollYProgress}
            range={[start, end]}
            variant={variant}
            baseColor={baseColor}
            revealColor={revealColor}
            expressive={expressive && variant === "opacity"}
          >
            {chunk}
          </RevealChunk>
        );
      })}
    </HeadingTag>
  );
}
