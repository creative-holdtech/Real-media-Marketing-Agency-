import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";

import {
  btnPrimary,
  sectionContainer,
  sectionHeadline,
  sectionHeadlineLead,
  sectionShell,
} from "@/components/framer-section";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

type InsightsHeroSectionProps = {
  posts: Post[];
};

const FEATURED_SLUGS = [
  "cross-border-fintech-scale",
  "cybersecurity-trust-building",
  "b2b-performance-marketing",
  "buyers-compare-safe-decisions",
] as const;

function InsightPreview({ post }: { post: Post }) {
  const reduce = useReducedMotion();

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="rm-insights-scroll-card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={`Read ${post.title}`}
    >
      <div className="rm-insights-scroll-card__media" aria-hidden>
        <motion.img
          src={post.image}
          alt=""
          loading="lazy"
          initial={reduce ? false : { opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rm-insights-scroll-card__img"
        />
        <div className="rm-insights-scroll-card__wash" />
      </div>

      <div className="rm-insights-scroll-card__content">
        <p className="rm-insights-scroll-card__kicker">{post.label.toUpperCase()}</p>
        <div className="rm-insights-scroll-card__bottom">
          <h3 className="rm-insights-scroll-card__title">{post.title}</h3>
          <span className="rm-insights-scroll-card__cta">Read essay →</span>
        </div>
      </div>
    </Link>
  );
}

export function InsightsHeroSection({ posts }: InsightsHeroSectionProps) {
  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );

  if (featured.length === 0) return null;

  return (
    <section className={cn(sectionShell, "rm-section-insights")} aria-labelledby="insights-heading">
      <div className={sectionContainer}>
        <div className="rm-insights-grid reveal">
          <aside className="rm-insights-grid__aside">
            <header className="rm-insights-grid__intro">
              <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-normal uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
                Insights
              </span>
              <div className={sectionHeadlineLead}>
                <h2
                  id="insights-heading"
                  className={cn(sectionHeadline, "max-w-none font-medium text-white md:leading-[1.15]")}
                >
                  Positioning under pressure, regulated pricing.
                  <br />
                  Why agency reporting is theater.
                </h2>
              </div>

              <div className="rm-insights-grid__intro-footer">
                <Link to="/blog" className={btnPrimary}>
                  All articles →
                </Link>
              </div>
            </header>
          </aside>

          <div className="rm-insights-grid__stack">
            {featured.map((post) => (
              <InsightPreview key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
