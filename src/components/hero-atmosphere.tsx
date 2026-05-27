import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type HeroAtmosphereProps = {
  imageSrc: string;
  children: ReactNode;
  /** Pull hero under sticky header so background reaches the top edge */
  underHeader?: boolean;
};

export function HeroAtmosphere({
  imageSrc,
  children,
  underHeader = false,
}: HeroAtmosphereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1]);

  return (
    <div
      ref={ref}
      className={[
        "rm-hero-atmosphere relative isolate flex flex-col",
        underHeader ? "rm-hero-atmosphere--under-header" : "",
        underHeader
          ? ""
          : "min-h-[min(720px,92svh)] md:min-h-[min(880px,calc(100svh-1.5rem))]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div aria-hidden className="rm-hero-atmosphere__bg">
        <motion.img
          src={imageSrc}
          alt=""
          width={1024}
          height={571}
          fetchPriority="high"
          decoding="async"
          className="rm-hero-atmosphere__bg-img"
          style={reduce ? undefined : { y, scale }}
        />
      </div>
      {children}
    </div>
  );
}
