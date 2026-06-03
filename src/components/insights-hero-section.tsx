import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import { btnGhostLink } from "@/components/framer-section";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

type InsightsHeroSectionProps = {
  posts: Post[];
};

const FEATURED_SLUGS = [
  "cross-border-fintech-scale",
  "cybersecurity-trust-building",
  "b2b-performance-marketing",
  "buyers-compare-safe-decisions",
  "marketing-dark-social-attribution",
  "creation-vs-dominance",
] as const;

const INSIGHTS_CAROUSEL_CONFIG = {
  ...DRAGABLE_CAROUSEL_DEFAULTS,
  slideWidth: 280,
  slideHeight: 340,
  gap: 18,
  borderRadius: 24,
  perspective: 1400,
  rotateY: 48,
  depth: 140,
  inactiveScale: 0.84,
  inactiveOpacity: 0.7,
  snapDuration: 0.3,
  arrowColor: "rgba(255, 255, 255, 0.92)",
  arrowBg: "transparent",
  arrowSize: 44,
  dotColor: "rgba(255, 255, 255, 0.92)",
  dotInactiveOpacity: 0.42,
  dotSize: 7,
};

function InsightCarouselSlide({ post }: { post: Post }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="rm-insights-carousel__card block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-hidden
      tabIndex={-1}
    >
      <div className="rm-dragable-carousel__media rm-insights-carousel__media overflow-hidden">
        <img
          src={post.image}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
    </Link>
  );
}

export function InsightsHeroSection({ posts }: InsightsHeroSectionProps) {
  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const onSlideChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  if (featured.length < 2) return null;

  const activePost = featured[activeIndex] ?? featured[0];

  return (
    <section
      className={cn("rm-section-insights border-b border-[var(--rm-border-soft)] px-6 md:px-10")}
      aria-labelledby="insights-heading"
    >
      <div className="rm-insights-container reveal">
        <h2 id="insights-heading" className="rm-insights-heading">
          Insights
        </h2>

        <DragableCarousel
          ariaLabel="Featured articles"
          className="rm-insights-carousel__stage"
          clipSlides={false}
          config={INSIGHTS_CAROUSEL_CONFIG}
          dotsPosition="below-cards"
          onSlideChange={onSlideChange}
        >
          {featured.map((post) => (
            <InsightCarouselSlide key={post.slug} post={post} />
          ))}
        </DragableCarousel>

        <div className="rm-insights-meta" aria-live="polite">
          <Link
            to="/blog/$slug"
            params={{ slug: activePost.slug }}
            className="rm-insights-meta__article"
          >
            <span className="rm-insights-meta__kicker">{activePost.label}</span>
            <span className="rm-insights-meta__title">{activePost.title}</span>
          </Link>
          <Link to="/blog" className={cn(btnGhostLink, "rm-insights-meta__all")}>
            All articles
          </Link>
        </div>
      </div>
    </section>
  );
}
