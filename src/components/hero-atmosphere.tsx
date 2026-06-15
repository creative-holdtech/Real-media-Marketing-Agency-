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
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

/** Max pointer drift (px) for the about-hero photo. Kept tiny — barely there. */
const POINTER_DRIFT_X = 11;
const POINTER_DRIFT_Y = 7;

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
  /** Shown if primary image fails (e.g. deck slide not exported yet) */
  fallbackImageSrc?: string;
  children: ReactNode;
  /** Pull hero under sticky header so background reaches the top edge */
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

  useEffect(() => {
    setSrc(imageSrc);
  }, [imageSrc]);

  const reduce = useReducedMotion();
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, getMobileServer);
  const parallax = !reduce && !mobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    // Defer measurement to post-hydration to avoid Motion's
    // "ref defined but not hydrated" warning during SSR hydration.
    layoutEffect: false,
  });

  const isAboutPhoto = className?.includes("rm-hero-atmosphere--about-photo");
  // About hero is a composed studio group shot — no scroll drift (framing must
  // stay exact); instead it gets a subtle pointer parallax for life.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isAboutPhoto ? "0%" : "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], isAboutPhoto ? [1, 1] : [1.04, 1.1]);

  // Pointer drift (about-hero only). Springs idle at 0 on touch/reduced motion.
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.4 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.4 });
  const pointerActive = parallax && isAboutPhoto;

  const onPointerMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!pointerActive) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      // Image drifts opposite the cursor — a gentle "window" parallax.
      pointerX.set(-nx * POINTER_DRIFT_X * 2);
      pointerY.set(-ny * POINTER_DRIFT_Y * 2);
    },
    [pointerActive, pointerX, pointerY],
  );
  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const imgStyle = parallax
    ? isAboutPhoto
      ? // Tiny baseline scale gives the drift headroom so no black edge shows.
        { x: pointerX, y: pointerY, scale: 1.035 }
      : { y, scale }
    : undefined;

  return (
    <div
      ref={ref}
      onMouseMove={pointerActive ? onPointerMove : undefined}
      onMouseLeave={pointerActive ? onPointerLeave : undefined}
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
