import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
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
  /** When set, used as the visible heading id for `aria-labelledby` on the section. */
  id?: string;
  ariaLabel?: string;
  /** Semantic element — use h2 for section headings in long-form pages. */
  as?: "p" | "h2" | "h3";
};

const CHUNK_SIZE = 3;

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
  baseColor,
  revealColor,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseColor: string;
  revealColor: string;
}) {
  const color = useTransform(progress, range, [baseColor, revealColor]);
  return (
    <motion.span style={{ color }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function TextReveal({
  text,
  className,
  baseColor = "rgb(153, 153, 153)",
  revealColor = "rgb(255, 255, 255)",
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
    offset: ["start 0.92", "start 0.35"],
  });

  const chunks = useMemo(() => chunkWords(text.trim().split(/\s+/), CHUNK_SIZE), [text]);
  const HeadingTag = Tag as ElementType;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.98) setComplete(true);
  });

  if (reduce || mobile || complete) {
    return (
      <HeadingTag
        id={id}
        className={className}
        style={{ color: revealColor }}
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
        const end = Math.min(1, (index + 1.2) / chunks.length);
        return (
          <RevealChunk
            key={`${chunk}-${index}`}
            progress={scrollYProgress}
            range={[start, end]}
            baseColor={baseColor}
            revealColor={revealColor}
          >
            {chunk}
          </RevealChunk>
        );
      })}
    </HeadingTag>
  );
}
