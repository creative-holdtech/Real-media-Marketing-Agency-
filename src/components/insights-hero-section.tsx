import { Link } from "@tanstack/react-router";

import {
  FramerPrimaryButton,
  FramerTag,
  PlusIcon,
  sectionContainer,
  sectionHeaderGrid,
  sectionShell,
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
      className="group flex flex-col gap-4"
    >
      <div className="aspect-[0.793] overflow-hidden rounded-3xl bg-white/5">
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-[-0.04em] text-white/45">
          {post.category.toUpperCase()} · {post.date.toUpperCase()} · {post.read.toUpperCase()}
        </p>
        <h3 className="text-[20px] font-semibold leading-[1.4] tracking-[-0.04em] text-white md:text-[22px]">
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
      className="group block py-2 md:py-0"
    >
      <h3 className="text-[20px] font-semibold leading-[1.35] tracking-[-0.04em] text-white transition-colors group-hover:text-white/80 md:text-[22px]">
        {post.title}
      </h3>
      <p className="mt-3 text-xs font-medium tracking-[-0.04em] text-white/45">
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
    <section className={sectionShell} aria-labelledby="insights-heading">
      <div className={sectionContainer}>
        <div className={sectionHeaderGrid}>
          <div className="reveal">
            <FramerTag>Insights</FramerTag>
          </div>

          <div className="reveal md:col-span-2 md:max-w-[64%]" data-delay="1">
            <TextReveal
              text="This quarter we are writing on positioning under pressure, pricing in regulated markets, and why agency reporting is theater."
              className="w-[92%] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[110%] tracking-[-0.06em]"
            />
          </div>
        </div>

        <div className="reveal grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch md:gap-3" data-delay="2">
          <div className="flex flex-col py-4 md:max-w-[360px] md:pt-4">
            <div className="flex w-[80%] items-start justify-between">
              <PlusIcon />
              <PlusIcon />
            </div>
          </div>

          <BlogTile post={firstPost} />
          <BlogTile post={secondPost} />
        </div>

        {thirdPost ? (
          <div
            className="reveal grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-3 md:items-end md:gap-3 md:border-t-0 md:pt-0"
            data-delay="3"
          >
            <div className="hidden md:block" />
            <BlogListItem post={thirdPost} />
            <div className="flex md:justify-end">
              <FramerPrimaryButton to="/blog">All articles →</FramerPrimaryButton>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
