import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import { BlogPostImage } from "@/components/blog-post-image";
import { triggerPageTransition } from "@/components/page-transition";
import {
  BtnArrow,
  btnOutlineOnDark,
  FramerTag,
  sectionGap,
  sectionHeadline,
  sectionHeroActionsRow,
  sectionInner,
  sectionLabelHeadlineStack,
  sectionShell,
  subsectionTitle,
  textMeta,
} from "@/components/framer-section";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

type InsightsHeroSectionProps = {
  posts: Post[];
};

function insightPostPath(slug: string) {
  return `/blog/${slug}`;
}

const META_EASE = [0.22, 1, 0.36, 1] as const;

const insightMetaVariants = {
  hidden: { opacity: 0, zIndex: 0 },
  show: { opacity: 1, zIndex: 1 },
};

function InsightMetaTitle({ post }: { post: Post }) {
  if (post.titleLines?.length) {
    return (
      <span className={cn("rm-insights-meta__title", subsectionTitle)}>
        {post.titleLines.map((line, index) => (
          <span key={line} className={index > 0 ? "block" : undefined}>
            {line}
          </span>
        ))}
      </span>
    );
  }
  return <span className={cn("rm-insights-meta__title", subsectionTitle)}>{post.title}</span>;
}

function navigateToInsightPost(event: MouseEvent, slug: string) {
  event.preventDefault();
  triggerPageTransition(insightPostPath(slug));
}

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
  const motionId = INSIGHT_CARD_MOTION[post.slug as (typeof FEATURED_SLUGS)[number]] ?? "orbit";

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      onClick={(event) => navigateToInsightPost(event, post.slug)}
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
        <BlogPostImage
          post={post}
          frame="portrait"
          draggable={false}
          imgClassName="rm-insights-carousel__img pointer-events-none"
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
      setSlideWidth(Math.round(Math.min(248, Math.max(208, width * 0.44))));
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
      slideHeight: Math.round(slideWidth * 1.15),
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
      <div className={sectionInner}>
        <div className={cn("reveal rm-insights-stack flex w-full flex-col items-center", sectionGap)}>
          <header className="rm-insights-intro flex w-full flex-col items-center text-center">
            <div className={cn(sectionLabelHeadlineStack, "w-full items-center")}>
              <FramerTag>Insights</FramerTag>
              <h2
                id="insights-heading"
                className={cn(
                  sectionHeadline,
                  "m-0 mx-auto max-w-[18ch] text-balance text-center text-white",
                )}
              >
                Field notes on building brands that last.
              </h2>
            </div>
            <div className={cn(sectionHeroActionsRow, "justify-center")}>
              <Link
                to="/blog"
                className={cn(btnOutlineOnDark, "group gap-2")}
                onClick={(event) => {
                  event.preventDefault();
                  triggerPageTransition("/blog");
                }}
              >
                All articles
                <BtnArrow />
              </Link>
            </div>
          </header>

          <div ref={stageRef} className="rm-insights-stage">
            <p className="sr-only">
              Drag or use arrows to browse featured articles. Details for the selected article
              appear below the carousel.
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
              <AnimatePresence initial={false}>
                <motion.div
                  key={activePost.slug}
                  className="rm-insights-meta__panel"
                  variants={insightMetaVariants}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                  exit={reduce ? undefined : "hidden"}
                  transition={
                    reduce ? { duration: 0 } : { duration: 0.28, ease: META_EASE }
                  }
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: activePost.slug }}
                    className="rm-insights-meta__article"
                    onClick={(event) => navigateToInsightPost(event, activePost.slug)}
                  >
                    <span className="rm-insights-meta__kicker">{activePost.label}</span>
                    <InsightMetaTitle post={activePost} />
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
