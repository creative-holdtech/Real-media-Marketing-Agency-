import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type HeroAtmosphereProps = {
  imageSrc: string;
  children: ReactNode;
};

export function HeroAtmosphere({ imageSrc, children }: HeroAtmosphereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);
  const sy = useSpring(y, { stiffness: 85, damping: 26, mass: 0.35 });
  const ss = useSpring(scale, { stiffness: 85, damping: 26, mass: 0.35 });

  return (
    <div
      ref={ref}
      className="rm-hero-atmosphere relative isolate flex min-h-[min(720px,92svh)] flex-col md:min-h-[min(880px,calc(100svh-1.5rem))]"
    >
      <div aria-hidden className="rm-hero-atmosphere__bg">
        <motion.img
          src={imageSrc}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="rm-hero-atmosphere__bg-img"
          style={reduce ? undefined : { y: sy, scale: ss }}
        />
      </div>
      {children}
    </div>
  );
}
