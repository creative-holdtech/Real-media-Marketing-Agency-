import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

/** About-hero: tiny "window" parallax (image drifts OPPOSITE cursor). */
const ABOUT_DRIFT_X = 11;
const ABOUT_DRIFT_Y = 7;

/**
 * Home / generic hero: image follows the cursor — like it's alive.
 * Values chosen so the image never exposes a black edge at 1024 px+ viewports
 * given the 1.06 base scale below (≈ 38 px headroom per side at 1280 px wide).
 */
const HOME_DRIFT_X = 20;
const HOME_DRIFT_Y = 14;

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

type HeroAtmosphereProps = {
  imageSrc: string;
  fallbackImageSrc?: string;
  children: ReactNode;
  underHeader?: boolean;
  className?: string;
};

export function HeroAtmosphere({
  imageSrc,
  fallbackImageSrc,
  children,
  underHeader = false,
  className,
}: HeroAtmosphereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState(imageSrc);

  useEffect(() => { setSrc(imageSrc); }, [imageSrc]);

  const reduce = useReducedMotion();
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, getMobileServer);
  const parallax = !reduce && !mobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const isAboutPhoto = className?.includes("rm-hero-atmosphere--about-photo");

  // Scroll parallax — home hero gets slightly more base scale (1.06) to give
  // the pointer drift headroom so edges never show.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isAboutPhoto ? "0%" : "12%"]);
  const scale = useTransform(
    scrollYProgress, [0, 1],
    isAboutPhoto ? [1, 1] : [1.06, 1.13],
  );

  // Pointer drift — shared spring, used for both hero variants.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.4 });
  const pointerY = useSpring(rawY, { stiffness: 100, damping: 20, mass: 0.4 });

  const onPointerMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;   // –0.5…+0.5
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;

      if (isAboutPhoto) {
        // Window parallax: image drifts OPPOSITE the cursor.
        rawX.set(-nx * ABOUT_DRIFT_X * 2);
        rawY.set(-ny * ABOUT_DRIFT_Y * 2);
      } else {
        // "Alive" parallax: image follows the cursor.
        rawX.set(nx * HOME_DRIFT_X * 2);
        rawY.set(ny * HOME_DRIFT_Y * 2);
      }
    },
    [isAboutPhoto, rawX, rawY],
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Build the final transform string on the GPU thread.
  //   about-photo : pointer drift only (no scroll drift, framing must stay exact)
  //   home/generic: pointer drift + scroll drift + scale
  const pointerDrift     = useMotionTemplate`translate3d(${pointerX}px, ${pointerY}px, 0) scale(1.035)`;
  const scrollPointerDrift = useMotionTemplate`translate3d(${pointerX}px, ${pointerY}px, 0) translateY(${y}) scale(${scale})`;

  const imgStyle = parallax
    ? { transform: isAboutPhoto ? pointerDrift : scrollPointerDrift }
    : undefined;

  return (
    <div
      ref={ref}
      onMouseMove={parallax ? onPointerMove : undefined}
      onMouseLeave={parallax ? onPointerLeave : undefined}
      className={cn(
        "rm-hero-atmosphere relative isolate flex flex-col",
        underHeader && "rm-hero-atmosphere--under-header",
        !underHeader && "min-h-[min(720px,92svh)] md:min-h-[min(880px,calc(100svh-1.5rem))]",
        className,
      )}
    >
      <div aria-hidden className="rm-hero-atmosphere__bg">
        <motion.img
          src={src}
          alt=""
          width={1920}
          height={1071}
          fetchPriority="high"
          decoding="async"
          className={cn(
            "rm-hero-atmosphere__bg-img",
            src.startsWith("/cases/") && "object-contain object-center bg-black",
          )}
          style={imgStyle}
          onError={() => {
            if (fallbackImageSrc && src !== fallbackImageSrc) setSrc(fallbackImageSrc);
          }}
        />
      </div>
      {children}
    </div>
  );
}
