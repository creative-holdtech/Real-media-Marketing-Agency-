import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  btnOutline,
  btnPrimary,
  bodyCopy,
  sectionHeadline,
  sectionHeadlineLead,
  sectionInnerStack,
  surfaceCardTitle,
  textCardBody,
  textMeta,
} from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { TextReveal } from "@/components/text-reveal";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { blogFilters, blogIndex, blogMeta } from "@/content/blog";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";
import {
  getArchivePosts,
  getFeaturedPost,
  getPosts,
} from "@/lib/payload/posts";
import { fetchBlogMeta } from "@/lib/payload/site-settings";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const allPosts = await getPosts();
    const featuredPost = await getFeaturedPost(allPosts);
    const archivePosts = await getArchivePosts(allPosts);
    const cmsBlogMeta = await fetchBlogMeta();
    return {
      posts: allPosts,
      featured: featuredPost,
      archive: archivePosts,
      cmsBlogMeta,
    };
  },
  head: ({ loaderData }) => {
    const featuredPost = loaderData?.featured;
    const cmsBlogMeta = loaderData?.cmsBlogMeta;
    return {
      meta: [
        { title: cmsBlogMeta?.title ?? blogMeta.title },
        { name: "description", content: cmsBlogMeta?.description ?? blogMeta.description },
        { property: "og:title", content: cmsBlogMeta?.title ?? blogMeta.ogTitle },
        {
          property: "og:description",
          content: cmsBlogMeta?.description ?? blogMeta.ogDescription,
        },
        { property: "og:image", content: featuredPost?.image ?? "" },
      ],
    };
  },
  component: BlogPage,
});

function TopicFilter({
  active,
  onChange,
  resultsId,
  className,
}: {
  active: string;
  onChange: (value: string) => void;
  resultsId: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label="Filter by topic"
      className={cn("flex flex-wrap justify-start gap-2", className)}
    >
      {blogFilters.map((category) => {
        const selected = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={resultsId}
            onClick={() => onChange(category)}
            className={cn(
              "relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              selected
                ? "text-black"
                : "border border-[var(--rm-border-soft)] text-[var(--rm-text-muted)] hover:text-[var(--rm-ink)]",
            )}
          >
            {!reduce && selected ? (
              <motion.span
                layoutId="blog-category-bg"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            ) : selected ? (
              <span className="absolute inset-0 rounded-full bg-white" aria-hidden />
            ) : null}
            <span className="relative">{category}</span>
          </button>
        );
      })}
    </div>
  );
}

function PostMetaLine({ post }: { post: Post }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", textMeta)}>
      <span>{post.label}</span>
      <span aria-hidden className="text-[var(--rm-border-strong)]">
        ·
      </span>
      <time dateTime={post.dateISO}>{post.date}</time>
      <span aria-hidden className="text-[var(--rm-border-strong)]">
        ·
      </span>
      <span>{post.read}</span>
    </div>
  );
}

function ArchiveCard({ post, delay }: { post: Post; delay: string }) {
  return (
    <li className="reveal" data-delay={delay}>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <article className="flex h-full flex-col">
          <figure className="hover-zoom card-cover relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)]">
            <img
              src={post.image}
              alt=""
              loading="lazy"
              width={1024}
              height={768}
              className="h-full w-full object-cover"
            />
          </figure>
          <PostMetaLine post={post} />
          <h3 className={cn("mt-3", surfaceCardTitle)}>{post.title}</h3>
          <p className={cn("mt-3 line-clamp-3 flex-1", textCardBody)}>{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--rm-text-muted)] transition-colors group-hover:text-[var(--rm-ink)]">
            Read article
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </article>
      </Link>
    </li>
  );
}

function BlogPage() {
  useReveal();
  const { featured, archive } = Route.useLoaderData();
  const [active, setActive] = useState("All");
  const [progress, setProgress] = useState(0);
  const resultsId = "archive-results";

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered =
    active === "All" ? archive : archive.filter((p) => p.category === active);

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5"
      >
        <div
          className="h-full w-full origin-left bg-rm-accent"
          style={{ transform: `scaleX(${progress / 100})`, transition: "transform 80ms linear" }}
        />
      </div>

      <SiteHeader variant="dark" />

      <main id="main" className="pt-[var(--rm-header-offset)]">
        <MarketingSection ariaLabelledBy="page-title" className="rm-blog-hero !pb-12 md:!pb-16">
          <div className={cn("reveal flex w-full flex-col items-start", sectionInnerStack)}>
            <div className="flex flex-col items-start gap-2">
              <p className={textMeta}>{blogIndex.seasonLabel}</p>
              <p className={textMeta}>{blogIndex.issuedBy}</p>
            </div>
            <h1 className="w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--rm-ink)] sm:text-[48px] md:text-[58px] lg:text-[64px]">
              <TextReveal
                id="page-title"
                text={blogIndex.titleLine1}
                className="m-0 block text-balance font-[inherit] text-[length:inherit] leading-[inherit] tracking-[inherit]"
                revealColor="rgb(255, 255, 255)"
              />
              <TextReveal
                text={blogIndex.titleLine2}
                className="m-0 block text-balance font-[inherit] text-[length:inherit] leading-[inherit] tracking-[inherit]"
                revealColor="rgb(255, 255, 255)"
              />
            </h1>
            <p className={cn(bodyCopy, "m-0 max-w-[42rem] text-pretty")}>{blogIndex.lead}</p>
            <TopicFilter active={active} onChange={setActive} resultsId={resultsId} className="w-full" />
          </div>
        </MarketingSection>

        {(active === "All" || featured.category === active) ? (
        <MarketingSection ariaLabelledBy="featured-heading" className="!pt-12 md:!pt-16">
          <p id="featured-heading" className={cn("reveal mb-6 md:mb-8", textMeta)}>
            {blogIndex.featuredLabel}
          </p>
          <article className="reveal group relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              aria-label={`Read article: ${featured.title}`}
              className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            >
              <span className="sr-only">{featured.title}</span>
            </Link>
            <figure className="hover-zoom card-cover relative aspect-[5/4] overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)]">
              <img
                src={featured.image}
                alt=""
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="flex flex-col justify-center">
              <PostMetaLine post={featured} />
              <h2 className={cn("mt-4", sectionHeadline)}>{featured.title}</h2>
              <p className={cn("mt-4 max-w-prose", textCardBody)}>{featured.excerpt}</p>
              <span className="relative z-10 mt-8 inline-flex">
                <span className={btnPrimary}>Read article →</span>
              </span>
            </div>
          </article>
        </MarketingSection>
        ) : null}

        <MarketingSection ariaLabelledBy="archive-heading">
          <div className={sectionHeadlineLead}>
            <p className={textMeta}>{blogIndex.archiveLabel}</p>
            <h2 id="archive-heading" className={sectionHeadline}>
              {active === "All" ? blogIndex.allEntriesLabel : active}
              <span className="text-[var(--rm-text-muted)]"> · {filtered.length}</span>
            </h2>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {filtered.length} article{filtered.length === 1 ? "" : "s"} found
            {active !== "All" ? ` in ${active}` : ""}.
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--rm-border-soft)] py-20 text-center">
              <p className={textCardBody}>{blogIndex.emptyArchive}</p>
              <button type="button" onClick={() => setActive("All")} className={cn("mt-6", btnOutline)}>
                {blogIndex.resetFilters}
              </button>
            </div>
          ) : (
            <ul
              id={resultsId}
              role="list"
              aria-label="Article archive"
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {filtered.map((post, index) => (
                <ArchiveCard
                  key={post.slug}
                  post={post}
                  delay={String(Math.min(index + 1, 5))}
                />
              ))}
            </ul>
          )}

          {filtered.length > 0 ? (
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className={textMeta}>
                Showing {filtered.length} of {archive.length} entries
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={btnOutline}
              >
                Back to top ↑
              </button>
            </div>
          ) : null}
        </MarketingSection>

        <UnifiedCTA />
      </main>

      <SiteFooter />
    </div>
  );
}
