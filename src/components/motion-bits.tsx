import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

/* ---------- Smooth scroll progress bar ---------- */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.15 });
  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/5"
    >
      <motion.div style={{ scaleX, transformOrigin: "0% 50%" }} className="h-full bg-[#efeeea]" />
    </div>
  );
}

/* ---------- Magnetic button (cursor pull + press feedback) ---------- */
type MagneticProps = {
  as?: "a" | "button";
  href?: string;
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<HTMLMotionProps<"a">, "ref" | "children">;

export function MagneticButton({
  as = "a",
  children,
  className,
  strength = 14,
  ...rest
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set((dx / r.width) * strength);
    y.set((dy / r.height) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const Comp = (as === "button" ? motion.button : motion.a) as typeof motion.a;
  return (
    <Comp
      ref={ref as never}
      {...rest}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{ x: sx, y: sy, ...(rest.style ?? {}) }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Tilt card (3D parallax on hover) ---------- */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 16 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Parallax image (scroll-linked Y translate) ---------- */
export function ParallaxImage({
  src,
  alt,
  className,
  range = 40,
}: {
  src: string;
  alt: string;
  className?: string;
  range?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const sy = useSpring(y, { stiffness: 80, damping: 22, mass: 0.3 });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { y: sy, scale: 1.12 }}
        className={className}
      />
    </div>
  );
}

/* ---------- Reveal on view (replaces .reveal for motion-aware blocks) ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 8,
  duration = 0.55,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
