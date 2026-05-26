import { Link } from "@tanstack/react-router";

import insightsBg from "@/assets/insights-bg.png";
import { GlassPointsSection } from "@/components/glass-points-section";
import type { Post } from "@/lib/posts";

type InsightsHeroSectionProps = {
  posts: Post[];
};

function formatMeta(post: Post) {
  return `${post.category.toUpperCase()} · ${post.date.toUpperCase()} · ${post.read.toUpperCase()}`;
}

const FEATURED_SLUGS = [
  "cross-border-fintech-scale",
  "cybersecurity-trust-building",
  "b2b-performance-marketing",
] as const;

const insightsHeadline = (
  <>
    This quarter we are writing on positioning under pressure, pricing in regulated markets, and{" "}
    <span className="text-white/55">
      why agency reporting is{" "}
      <span className="font-medium text-white">theater.</span>
    </span>
  </>
);

export function InsightsHeroSection({ posts }: InsightsHeroSectionProps) {
  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );

  if (featured.length === 0) return null;

  return (
    <>
      <section id="insights-intro" className="rm-insights-builds" aria-labelledby="insights-intro-heading">
        <div id="insights-intro-heading" className="rm-glass-points__head">
          {insightsHeadline}
        </div>
      </section>

      <GlassPointsSection
        id="insights"
        layout="insights"
        backgroundImage={insightsBg}
        cards={featured.map((post, i) => ({
          slug: post.slug,
          index: String(i + 1).padStart(2, "0"),
          title: post.title,
          subtitle: formatMeta(post),
        }))}
        footer={
          <Link
            to="/blog"
            className="inline-flex rm-touch items-center rounded-full border border-white/20 px-6 py-3.5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white"
          >
            All articles →
          </Link>
        }
      />
    </>
  );
}
