import { useRef, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { sectionInner, siteChromeBand } from "@/components/framer-section";
import { HeroScrollStage } from "@/components/home-scroll-cinema";
import { PageEditorialHero } from "@/components/page-editorial-hero";
import { cn } from "@/lib/utils";

type ServicesHeroProps = {
  tag: string;
  titleLines: string[];
  body?: string;
  headingId?: string;
  sectionClassName?: string;
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
  headingId = "services-hero-title",
  sectionClassName,
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

      <section
        aria-labelledby={headingId}
        className="rm-services-hero__section relative z-10 flex min-h-0 flex-1 flex-col pt-[var(--rm-header-offset)]"
      >
        <div className={siteChromeBand}>
          <div className={cn(sectionInner, "relative pb-16 pt-6 md:pb-20 md:pt-8")}>
            <HeroScrollStage heroRef={heroRef} className="w-full">
              <PageEditorialHero
                layout="copy"
                tag={tag}
                titleLines={titleLines}
                body={body}
                bodyClassName="md:!w-[46ch] md:!max-w-[46ch]"
                headingId={headingId}
              />
            </HeroScrollStage>
          </div>
        </div>
      </section>
    </div>
  );
}
