import { Link } from "@tanstack/react-router";

import { BlogPostImage } from "@/components/blog-post-image";
import { surfaceCardTitle, textCardBody, textMeta } from "@/components/framer-section";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function PostMetaLine({ post }: { post: Post }) {
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

/** Conventional blog card — image, meta line, title, excerpt, "Read article".
 * Shared between the archive grid (/blog) and the home page's Insights teaser. */
export function BlogPostCard({ post, className }: { post: Post; className?: string }) {
  const containImage = post.imageFit === "contain";

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={cn(
        "group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className,
      )}
    >
      <article className="flex h-full flex-col">
        <figure
          className={cn(
            "hover-zoom card-cover relative mb-4 aspect-[3/2] overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)]",
            containImage && "flex items-center justify-center",
          )}
        >
          <BlogPostImage
            post={post}
            frame="landscape"
            width={1024}
            height={768}
            className={containImage ? "p-4" : undefined}
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
  );
}
