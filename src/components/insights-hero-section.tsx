import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import { btnGhostLink, sectionHeadline, sectionShell, textMeta } from "@/components/framer-section";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

type InsightsHeroSectionProps = {
  posts: Post[];
};

const FEATURED_SLUGS = [
  "cybersecurity-trust-building",
  "b2b-performance-marketing",
  "buyers-compare-safe-decisions",
  "marketing-dark-social-attribution",
  "creation-vs-dominance",
] as const;

/** Per-card motion identity — Premium personality, active-slide only (see styles.css). */
const INSIGHT_CARD_MOTION: Record<(typeof FEATURED_SLUGS)[number], string> = {
  "cybersecurity-trust-building": "scan",
  "b2b-performance-marketing": "pipeline",
  "buyers-compare-safe-decisions": "balance",
  "marketing-dark-social-attribution": "ripple",
  "creation-vs-dominance": "pulse",
};

function InsightCarouselSlide({ post }: { post: Post }) {
  const motionId =
    INSIGHT_CARD_MOTION[post.slug as (typeof FEATURED_SLUGS)[number]] ?? "orbit";

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="rm-insights-carousel__card block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-hidden
      tabIndex={-1}
    >
      <div
        className={cn(
          "rm-dragable-carousel__media rm-insights-carousel__media overflow-hidden",
          `rm-insights-carousel__media--${motionId}`,
        )}
        data-insight-motion={motionId}
      >
        <div className="rm-insights-carousel__sheen" aria-hidden="true" />
        <div className="rm-insights-carousel__wash" aria-hidden="true" />
        <img
          src={post.image}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className={cn(
            "rm-insights-carousel__img pointer-events-none",
            motionId === "pulse"
              ? "max-h-full max-w-full object-contain"
              : "h-full w-full object-cover",
          )}
        />
      </div>
    </Link>
  );
}

export function InsightsHeroSection({ posts }: InsightsHeroSectionProps) {
  const reduce = useReducedMotion();
  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(248);

  const onSlideChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.clientWidth;
      setSlideWidth(Math.round(Math.min(280, Math.max(232, width * 0.52))));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const carouselConfig = useMemo(
    () => ({
      ...DRAGABLE_CAROUSEL_DEFAULTS,
      slideWidth,
      slideHeight: Math.round(slideWidth * 1.25),
      gap: 16,
      borderRadius: 18,
      perspective: 1800,
      rotateY: 26,
      depth: 72,
      inactiveScale: 0.92,
      inactiveOpacity: 0.62,
      snapDuration: 0.55,
      arrowColor: "rgba(255, 255, 255, 0.9)",
      arrowBg: "rgba(255, 255, 255, 0.08)",
      arrowSize: 38,
      dotColor: "rgba(255, 255, 255, 0.92)",
      dotInactiveOpacity: 0.24,
      dotSize: 6,
      loop: true,
    }),
    [slideWidth],
  );

  if (featured.length < 2) return null;

  const activePost = featured[activeIndex] ?? featured[0];

  return (
    <section className={cn(sectionShell, "rm-section-insights")} aria-labelledby="insights-heading">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center">
        <div className="reveal rm-insights-stack flex w-full flex-col items-center">
          <header className="rm-insights-intro">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-normal uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
                Insights
              </span>
              <h2
                id="insights-heading"
                className={cn(
                  sectionHeadline,
                  "mx-auto max-w-[18ch] text-balance text-center font-medium text-white md:leading-[1.12]",
                )}
              >
                Field notes on building brands that last.
              </h2>
            </div>
            <Link to="/blog" className={cn(btnGhostLink, "mx-auto w-fit")}>
              All articles →
            </Link>
          </header>

          <div ref={stageRef} className="rm-insights-stage">
            <p className="sr-only">
              Drag or use arrows to browse featured articles. Details for the selected article appear below the
              carousel.
            </p>

            <DragableCarousel
              ariaLabel="Featured articles"
              className="rm-insights-carousel__stage"
              clipSlides={false}
              config={carouselConfig}
              dotsPosition="below-cards"
              onSlideChange={onSlideChange}
            >
              {featured.map((post) => (
                <InsightCarouselSlide key={post.slug} post={post} />
              ))}
            </DragableCarousel>

            <div className="rm-insights-meta" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activePost.slug}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.42, ease: [0.4, 0, 0.2, 1] }
                  }
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: activePost.slug }}
                    className="rm-insights-meta__article"
                  >
                    <span className="rm-insights-meta__kicker">{activePost.label}</span>
                    <span className="rm-insights-meta__title">{activePost.title}</span>
                    <span className={cn(textMeta, "rm-insights-meta__line")}>
                      {activePost.date} · {activePost.read}
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
