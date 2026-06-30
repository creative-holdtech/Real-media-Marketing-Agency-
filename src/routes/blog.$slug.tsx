import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { BlogPostImage } from "@/components/blog-post-image";
import {
  btnOutline,
  btnPrimary,
  btnPrimarySm,
  bodyCopy,
  sectionContainer,
  sectionHeadline,
  sectionShell,
  surfaceCardTitle,
  textCardBody,
  textLabel,
  textMeta,
} from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { getPost as getCmsPost } from "@/lib/payload/posts";
import { JsonLd } from "@/components/json-ld";
import { articleJsonLd, buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getCmsPost(params.slug);
    if (!post) throw notFound();
    const allPosts = await import("@/lib/payload/posts").then((m) => m.getPosts());
    return { post, allPosts };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — R-M" }] };
    const title = post.metaTitle ?? `${post.title} — R-M`;
    const description = post.metaDescription ?? post.excerpt;
    return buildPageHead({
      title,
      description,
      pathname: `/blog/${params.slug}`,
      image: post.image,
      type: "article",
      publishedTime: post.dateISO,
    });
  },
  notFoundComponent: () => (
    <div className="rm-page grid place-items-center px-6 text-[var(--rm-ink)]">
      <div className="max-w-md text-center">
        <p className={cn("mb-6", textMeta)}>404 — Not found</p>
        <h1 className={sectionHeadline}>
          This essay <span className="font-normal text-[var(--rm-text-muted)]">doesn't exist.</span>
        </h1>
        <Link to="/blog" className={cn("mt-10", btnOutline)}>
          ← Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="rm-page grid place-items-center px-6 text-center text-[var(--rm-ink)]">
      <div>
        <p className={cn("mb-6", textCardBody)}>{error.message}</p>
        <button type="button" onClick={reset} className={btnOutline}>
          Try again
        </button>
      </div>
    </div>
  ),
  component: ArticlePage,
});

type Section = { id: string; label: string; paragraphs: string[]; image?: string };

function buildSections(body: string[]): Section[] {
  const labels = [
    "Introduction",
    "Patterns we keep seeing",
    "What changes at scale",
    "Closing notes",
  ];
  if (body.length <= 1) return [{ id: "s-1", label: labels[0], paragraphs: body }];
  const buckets = Math.min(labels.length, Math.max(2, Math.ceil(body.length / 2)));
  const perBucket = Math.ceil(body.length / buckets);
  return Array.from({ length: buckets }, (_, i) => ({
    id: `s-${i + 1}`,
    label: labels[i] ?? `Section ${i + 1}`,
    paragraphs: body.slice(i * perBucket, (i + 1) * perBucket),
  })).filter((s) => s.paragraphs.length > 0);
}

function ArticlePage() {
  useReveal();
  const { post, allPosts } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState("s-1");

  const sections = useMemo(
    () => (post.sections?.length ? post.sections : buildSections(post.body)),
    [post.body, post.sections],
  );

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);

      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];
      const above = offsets.filter((o) => o.top <= 140);
      const current = above.length ? above[above.length - 1] : offsets[0];
      if (current) setActiveId(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const next = allPosts[(currentIndex + 1) % allPosts.length];
  const related = allPosts.filter((p) => p.slug !== post.slug && !p.featured).slice(0, 2);

  const copyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription ?? post.excerpt,
          pathname: `/blog/${post.slug}`,
          image: post.image,
          publishedTime: post.dateISO,
          author: post.author,
        })}
      />
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
        <article aria-labelledby="article-title">
          <header className={cn(sectionShell, "border-b border-[var(--rm-border-soft)]")}>
            <div className={cn(sectionContainer, "max-w-[920px]")}>
              <nav
                aria-label="Breadcrumb"
                className={cn("reveal mb-8 flex flex-wrap items-center gap-2", textMeta)}
              >
                <Link to="/blog" className="rounded-md hover:text-[var(--rm-ink)]">
                  Blog
                </Link>
                <span aria-hidden>/</span>
                <span>{post.label}</span>
              </nav>

              <h1
                id="article-title"
                className={cn(
                  "reveal text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--rm-ink)] md:text-4xl lg:text-5xl",
                )}
              >
                {post.title}
              </h1>

              <div className="reveal mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" data-delay="1">
                <div>
                  <div className={textLabel}>Written by</div>
                  <div className="mt-1 text-[var(--rm-ink)]">{post.author}</div>
                </div>
                <div>
                  <div className={textLabel}>Published</div>
                  <time dateTime={post.dateISO} className="mt-1 block text-[var(--rm-ink)]">
                    {post.date}
                  </time>
                </div>
              </div>

              <div
                className="reveal mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-8"
                data-delay="2"
              >
                <span className={textMeta}>
                  {post.label} · {post.read}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={copyLink} className={btnOutline}>
                    {copied ? "Copied ✓" : "Copy link"}
                  </button>
                  <Link to="/audit" className={btnPrimary}>
                    Book free audit →
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <div className={cn(sectionShell, "border-b-0 py-0 md:py-0")}>
            <div className={cn(sectionContainer, "pt-12 pb-8 md:pt-16 md:pb-10")}>
              <div className="grid grid-cols-12 gap-8 lg:gap-12">
                <aside aria-label="Table of contents" className="hidden lg:col-span-3 lg:block">
                  <div className="sticky top-32">
                    <p className={cn("mb-4", textMeta)}>On this page</p>
                    <ol className="relative space-y-4 border-l border-[var(--rm-border-soft)] pl-5">
                      {sections.map((s, i) => {
                        const isActive = activeId === s.id;
                        return (
                          <li key={s.id} className="relative">
                            <span
                              aria-hidden
                              className={cn(
                                "absolute -left-[23px] top-1.5 h-4 w-[3px] rounded-full transition-colors",
                                isActive ? "bg-rm-accent" : "bg-transparent",
                              )}
                            />
                            <a
                              href={`#${s.id}`}
                              className={cn(
                                "block text-sm leading-snug transition-colors",
                                isActive
                                  ? "text-[var(--rm-ink)]"
                                  : "text-[var(--rm-text-muted)] hover:text-[var(--rm-ink)]",
                              )}
                            >
                              <span className="mr-2 tabular-nums text-[var(--rm-text-muted)]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {s.label}
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </aside>

                <div className="col-span-12 lg:col-span-9">
                  <div className="mx-auto max-w-[720px]">
                    <p className={cn("reveal mb-10", bodyCopy)}>{post.excerpt}</p>

                    <figure className="reveal mb-12 overflow-hidden rounded-3xl border border-[var(--rm-border-soft)]">
                      <div
                        className={cn(
                          "relative aspect-[16/10] bg-[var(--rm-surface-float)]",
                          post.imageFit === "contain" && "flex items-center justify-center",
                        )}
                      >
                        {post.image ? (
                          <BlogPostImage
                            post={post}
                            frame="landscape"
                            alt={post.imageAlt ?? post.title}
                            width={1280}
                            height={800}
                            className={post.imageFit === "contain" ? "p-6" : undefined}
                          />
                        ) : null}
                      </div>
                    </figure>

                    {sections.map((section) => (
                      <section
                        key={section.id}
                        aria-labelledby={`${section.id}-h`}
                        className="mb-12"
                      >
                        <h2
                          id={section.id}
                          className="scroll-mt-32 mb-6 text-xl font-semibold tracking-[-0.03em] text-[var(--rm-ink)] md:text-2xl"
                        >
                          <span id={`${section.id}-h`}>{section.label}</span>
                        </h2>
                        {section.image ? (
                          <figure className="mb-8 overflow-hidden rounded-2xl border border-[var(--rm-border-soft)]">
                            <img
                              src={section.image}
                              alt=""
                              loading="lazy"
                              width={1280}
                              height={800}
                              className="h-full w-full object-cover"
                            />
                          </figure>
                        ) : null}
                        <div className="space-y-6">
                          {section.paragraphs.map((para) => (
                            <p key={para.slice(0, 24)} className={textCardBody}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </section>
                    ))}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-8">
                      <Link to="/blog" className={btnOutline}>
                        ← All articles
                      </Link>
                      <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={copyLink} className={btnOutline}>
                          {copied ? "Link copied ✓" : "Copy link"}
                        </button>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={btnOutline}
                        >
                          Share on X
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <MarketingSection aria-label="Next article" className="!py-8 md:!py-10">
          <p className={cn("reveal mb-4", textMeta)}>Up next</p>
          <Link
            to="/blog/$slug"
            params={{ slug: next.slug }}
            className="reveal group grid grid-cols-1 gap-6 border border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)] p-5 transition-colors hover:border-[var(--rm-border-strong)] md:grid-cols-2 md:gap-8 md:p-6"
          >
            <figure className="hover-zoom relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--rm-border-soft)]">
              <img
                src={next.image}
                alt=""
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="flex flex-col justify-center">
              <p className={textMeta}>
                {next.label} · {next.date}
              </p>
              <h2 className={cn("mt-3", sectionHeadline)}>{next.title}</h2>
              <p className={cn("mt-3 max-w-prose", textCardBody)}>{next.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--rm-text-muted)] transition-colors group-hover:text-[var(--rm-ink)]">
                Read next
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </MarketingSection>

        {related.length > 0 ? (
          <MarketingSection ariaLabelledBy="related-heading" className="!py-8 md:!py-10">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-heading" className={sectionHeadline}>
                More articles
              </h2>
              <Link to="/blog" className={btnPrimarySm}>
                View all →
              </Link>
            </div>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <article>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                    >
                      <figure className="hover-zoom relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--rm-border-soft)]">
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="h-full w-full object-cover"
                        />
                      </figure>
                      <p className={textMeta}>
                        {p.label} · {p.date}
                      </p>
                      <h3 className={cn("mt-3", surfaceCardTitle)}>{p.title}</h3>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </MarketingSection>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
