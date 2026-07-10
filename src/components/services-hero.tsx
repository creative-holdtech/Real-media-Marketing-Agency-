import { useRef, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { sectionInner, siteChromeBand, textGhost, textMeta } from "@/components/framer-section";
import { HeroScrollStage } from "@/components/home-scroll-cinema";
import { PageEditorialHero } from "@/components/page-editorial-hero";
import { cn } from "@/lib/utils";

/** Centered-hero background glow — accent + neutral blobs on existing tokens. */
export function HeroAmbientGlow() {
  return (
    <div aria-hidden className="rm-hero-ambient">
      <div className="rm-hero-ambient__blob rm-hero-ambient__blob--a" />
      <div className="rm-hero-ambient__blob rm-hero-ambient__blob--b" />
    </div>
  );
}

/** Image-backed hero ambient — a soft glow render bled behind the copy. */
export function HeroAmbientImage({ src }: { src: string }) {
  return (
    <div aria-hidden className="rm-hero-ambient rm-hero-ambient--image">
      <img src={src} alt="" className="rm-hero-ambient__img" loading="eager" decoding="async" />
      <div className="rm-hero-ambient__veil" />
    </div>
  );
}

/** "Scroll to explore" affordance under a centered hero's actions row. */
export function HeroScrollCue({ label = "Scroll to explore" }: { label?: string }) {
  return (
    <div aria-hidden className="rm-hero-scrollcue">
      <span className={cn(textMeta, textGhost)}>{label}</span>
      <span className="rm-hero-scrollcue__dot" />
    </div>
  );
}

type ServicesHeroProps = {
  tag: string;
  titleLines: string[];
  body?: string;
  bodyClassName?: string;
  headingId?: string;
  actions?: ReactNode;
  sectionClassName?: string;
  /** Left-aligned by default (About pattern); "center" for a centered composition. */
  align?: "start" | "center";
  /** Decorative background layer (e.g. ambient glow blobs), behind the copy. */
  ambient?: ReactNode;
  /** Rendered under the actions row (e.g. a "scroll to explore" cue). */
  scrollCue?: ReactNode;
};

function ServicesHeroAmbient({
  enabled,
  heroRef,
}: {
  enabled: boolean;
  heroRef: RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.4,
  });
  const ambientOpacity = useTransform(progress, [0, 1], enabled ? [0.9, 0.45] : [0.9, 0.9]);

  if (!enabled) {
    return <div className="rm-services-hero__ambient" aria-hidden />;
  }

  return (
    <motion.div
      className="rm-services-hero__ambient"
      aria-hidden
      style={{ opacity: ambientOpacity }}
    />
  );
}

export function ServicesHero({
  tag,
  titleLines,
  body,
  bodyClassName,
  headingId = "services-hero-title",
  actions,
  sectionClassName,
  align = "start",
  ambient,
  scrollCue,
}: ServicesHeroProps) {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={heroRef}
      className={cn(
        "rm-hero-atmosphere rm-hero-atmosphere--under-header rm-hero-atmosphere--services relative isolate flex flex-col bg-black",
        sectionClassName,
      )}
    >
      <ServicesHeroAmbient enabled={motionOn} heroRef={heroRef} />
      {ambient}

      <section
        aria-labelledby={headingId}
        className="rm-services-hero__section relative z-10 flex min-h-0 flex-1 flex-col pt-[var(--rm-header-offset)]"
      >
        <div className={siteChromeBand}>
          <div className={cn(sectionInner, "relative pb-16 pt-6 md:pb-20 md:pt-8")}>
            <HeroScrollStage heroRef={heroRef} className="w-full">
              <PageEditorialHero
                layout="copy"
                align={align}
                tag={tag}
                titleLines={titleLines}
                body={body}
                bodyClassName={bodyClassName ?? "md:!w-[46ch] md:!max-w-[46ch]"}
                headingId={headingId}
                actions={actions}
              />
              {scrollCue}
            </HeroScrollStage>
          </div>
        </div>
      </section>
    </div>
  );
}
