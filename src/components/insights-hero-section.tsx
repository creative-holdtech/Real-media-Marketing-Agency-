import { Link } from "@tanstack/react-router";

import {
  FramerPrimaryButton,
  sectionActionRow,
  sectionChapterNumeral,
  sectionContainer,
  sectionContentGrid,
  sectionGridSpacer,
  sectionHeaderContent,
  sectionHeaderGrid,
  sectionHeadline,
  sectionShell,
  textBlogMeta,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";
import type { Post } from "@/lib/posts";

type InsightsHeroSectionProps = {
  posts: Post[];
};

const FEATURED_SLUGS = [
  "cross-border-fintech-scale",
  "cybersecurity-trust-building",
  "b2b-performance-marketing",
] as const;

function BlogTile({ post }: { post: Post }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      aria-label={`${post.category}. ${post.title}. ${post.read}`}
      className="group flex flex-col gap-4 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efeeea]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      <div className="rm-insight-tile aspect-[4/5] max-h-[280px] md:max-h-[320px]">
        <span className="rm-insight-tile__index" aria-hidden="true">
          {post.n}
        </span>
        <span className="rm-insight-tile__read" aria-hidden="true">
          {post.read}
        </span>
        <p className="rm-insight-tile__category">{post.category}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className={textBlogMeta}>
          {post.date.toUpperCase()}
        </p>
        <h3 className="text-[18px] font-semibold leading-[1.4] tracking-[-0.04em] text-white transition-colors group-hover:text-white/85 group-focus-visible:text-white/85 md:text-[20px]">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

function BlogListItem({ post }: { post: Post }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block rounded-xl py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efeeea]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] md:py-0"
    >
      <h3 className="text-[18px] font-semibold leading-[1.35] tracking-[-0.04em] text-white transition-colors group-hover:text-white/85 group-focus-visible:text-white/85 md:text-[20px]">
        {post.title}
      </h3>
      <p className={`mt-3 ${textBlogMeta}`}>
        {post.category.toUpperCase()} · {post.date.toUpperCase()} · {post.read.toUpperCase()}
      </p>
    </Link>
  );
}

export function InsightsHeroSection({ posts }: InsightsHeroSectionProps) {
  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );

  if (featured.length < 2) return null;

  const [firstPost, secondPost, thirdPost] = featured;

  return (
    <section className={`${sectionShell} rm-section-insights`} aria-labelledby="insights-heading">
      <div className={sectionContainer}>
        <div className={sectionHeaderGrid}>
          <div className="reveal">
            <p className={sectionChapterNumeral}>03</p>
          </div>

          <div className={sectionHeaderContent} data-delay="1">
            <h2 id="insights-heading" className="sr-only">
              Insights
            </h2>
            <TextReveal
              text="This quarter we are writing on positioning under pressure, pricing in regulated markets, and why agency reporting is theater."
              className={`w-[92%] max-w-prose ${sectionHeadline} leading-[1.2]`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className={`reveal ${sectionContentGrid}`} data-delay="2">
            <div className={sectionGridSpacer} />

            <BlogTile post={firstPost} />
            <BlogTile post={secondPost} />
          </div>

          {thirdPost ? (
            <div className={`reveal ${sectionContentGrid} md:items-end`} data-delay="3">
              <div className={sectionGridSpacer} />
              <BlogListItem post={thirdPost} />
              <div className={sectionActionRow}>
                <FramerPrimaryButton to="/blog">All articles →</FramerPrimaryButton>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
