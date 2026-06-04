import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

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
  });

  const isAboutPhoto = className?.includes("rm-hero-atmosphere--about-photo");
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isAboutPhoto ? "6%" : "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], isAboutPhoto ? [1, 1] : [1.04, 1.1]);

  return (
    <div
      ref={ref}
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
          width={1024}
          height={571}
          fetchPriority="high"
          decoding="async"
          className={cn(
            "rm-hero-atmosphere__bg-img",
            src.startsWith("/cases/") && "object-contain object-center bg-black",
          )}
          style={parallax ? { y, scale } : undefined}
          onError={() => {
            if (fallbackImageSrc && src !== fallbackImageSrc) setSrc(fallbackImageSrc);
          }}
        />
      </div>
      {children}
    </div>
  );
}
