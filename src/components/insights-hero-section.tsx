import { Link } from "@tanstack/react-router";

import { BlogPostCard } from "@/components/blog-post-card";
import { triggerPageTransition } from "@/components/page-transition";
import {
  BtnArrow,
  FlipLabel,
  btnOutlineOnDark,
  FramerTag,
  sectionGap,
  sectionHeadline,
  sectionHeroActionsRow,
  sectionInner,
  sectionLabelHeadlineStack,
  sectionShell,
} from "@/components/framer-section";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

type InsightsHeroSectionProps = {
  posts: Post[];
};

const FEATURED_SLUGS = [
  "cybersecurity-trust-building",
  "b2b-performance-marketing",
  "buyers-compare-safe-decisions",
] as const;

export function InsightsHeroSection({ posts }: InsightsHeroSectionProps) {
  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );

  if (featured.length < 2) return null;

  return (
    <section className={cn(sectionShell, "rm-section-insights")} aria-labelledby="insights-heading">
      <div className={sectionInner}>
        <div className={cn("flex w-full flex-col items-center", sectionGap)}>
          <header className="flex w-full flex-col items-center text-center">
            <div className={cn(sectionLabelHeadlineStack, "w-full items-center")}>
              <div className="reveal">
                <FramerTag>Insights</FramerTag>
              </div>
              <h2
                id="insights-heading"
                className={cn(
                  sectionHeadline,
                  "reveal m-0 mx-auto max-w-[18ch] text-balance text-center text-white",
                )}
                data-delay="1"
              >
                Field notes on building brands that last.
              </h2>
            </div>
            <div className={cn(sectionHeroActionsRow, "reveal justify-center")} data-delay="2">
              <Link
                to="/blog"
                className={cn(btnOutlineOnDark, "group gap-2")}
                aria-label="All articles"
                onClick={(event) => {
                  event.preventDefault();
                  triggerPageTransition("/blog");
                }}
              >
                <FlipLabel text="All articles" />
                <BtnArrow />
              </Link>
            </div>
          </header>

          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((post, i) => (
              <div key={post.slug} className="reveal" data-delay={String(Math.min(i + 1, 5))}>
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
