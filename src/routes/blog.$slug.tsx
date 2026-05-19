import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { MobileMenu } from "@/components/mobile-menu";
import { useReveal } from "@/hooks/use-reveal";
import { archive, getPost, posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — R-M" }] };
    return {
      meta: [
        { title: `${post.title} — R-M Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">404 — Not in the journal</p>
        <h1 className="text-[40px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
          This essay <span className="italic font-light text-white/60">doesn't exist.</span>
        </h1>
        <Link to="/blog" className="mt-10 inline-flex items-center text-[13px] px-6 py-3 rounded-full border border-white/20 hover:border-white transition-all">
          ← Back to Journal
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6 text-center">
      <div>
        <p className="text-white/60 mb-6">{error.message}</p>
        <button onClick={reset} className="text-[13px] px-6 py-3 rounded-full border border-white/20 hover:border-white">Try again</button>
      </div>
    </div>
  ),
  component: ArticlePage,
});

const nav: { label: string; href?: string; to?: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/cases" },
  { label: "Insights", href: "/#insights" },
  { label: "About", to: "/about" },
];

type Section = { id: string; label: string; paragraphs: string[] };

function buildSections(body: string[]): Section[] {
  // Split the flat body into logical sections (ElevenLabs-style TOC).
  // Defensive: works for posts with any paragraph count.
  const labels = ["Introduction", "Patterns we keep seeing", "What changes at scale", "Closing notes"];
  if (body.length <= 1) return [{ id: "s-1", label: labels[0], paragraphs: body }];
  // Distribute paragraphs across up to 4 buckets.
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
  const { post } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState<string>("s-1");

  const sections = useMemo(() => buildSections(post.body), [post.body]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);

      // Active TOC item
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

  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(currentIndex + 1) % posts.length];
  const related = archive.filter((p) => p.slug !== post.slug).slice(0, 3);

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
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Reading progress */}
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/5"
      >
        <div className="h-full bg-[#e85d3a] origin-left" style={{ width: `${progress}%`, transition: "width 80ms linear" }} />
      </div>

      {/* NAV */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
        <nav aria-label="Primary" className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-2 pr-2">
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[12px] font-medium px-3 py-1.5 hover:bg-[#e85d3a] hover:text-white transition-colors"
            >
              <span aria-hidden>←</span>
              Back to Journal
            </Link>
            <Link to="/" aria-label="R-M home" className="sm:hidden font-semibold tracking-tight text-[15px] text-white pl-2">
              R—M<span aria-hidden className="text-[#e85d3a]">.</span>
            </Link>
          </div>
          <Link to="/" aria-label="R-M home" className="hidden md:block absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px]">
            R—M<span aria-hidden className="text-[#e85d3a]">.</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-6 text-[13px] text-white/70 mr-4">
              {nav.map((n) => (
                <li key={n.label}>
                  {n.to ? (
                    <Link to={n.to} className="hover:text-white transition-colors">{n.label}</Link>
                  ) : (
                    <a href={n.href} className="hover:text-white transition-colors">{n.label}</a>
                  )}
                </li>
              ))}
              <li>
                <Link to="/blog" aria-current="page" className="text-white">Journal</Link>
              </li>
            </ul>
            <a href="/#contact" className="hidden md:inline-block text-[13px] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors">
              Get Audit
            </a>
            <MobileMenu />
          </div>
        </nav>
      </header>

      <main id="main">
        <article aria-labelledby="article-title">
          {/* ===== Header (ElevenLabs-style: centered single column) ===== */}
          <header className="px-6 md:px-12 max-w-[920px] mx-auto pt-32 md:pt-40 pb-10 md:pb-14">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="reveal text-[14px] text-white/50 mb-10 flex flex-wrap items-center gap-2">
              <Link to="/blog" className="hover:text-white rounded-md">Blog</Link>
              <span aria-hidden className="text-white/30">/</span>
              <span className="text-white/70">{post.category}</span>
            </nav>

            {/* Title */}
            <h1
              id="article-title"
              className="reveal text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02] tracking-[-0.025em] font-medium text-white"
            >
              {post.title}
            </h1>

            {/* Meta row: Written by + Published */}
            <div className="reveal mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]" data-delay="2">
              <div>
                <div className="text-white/40 mb-1.5">Written by</div>
                <div className="text-white/90">{post.author}</div>
              </div>
              <div>
                <div className="text-white/40 mb-1.5">Published</div>
                <time dateTime={post.dateISO} className="text-white/90">{post.date}</time>
              </div>
            </div>

            <hr className="mt-10 border-t border-white/10" />

            {/* CTA row */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <div className="text-[12px] uppercase tracking-[0.25em] text-white/40">{post.read}</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  className="text-[13px] px-5 py-2.5 rounded-full border border-white/15 hover:border-white hover:text-white text-white/80 transition-colors min-h-[40px]"
                >
                  {copied ? "Copied ✓" : "Copy link"}
                </button>
                <a
                  href="/#contact"
                  className="text-[13px] px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors min-h-[40px] inline-flex items-center"
                >
                  Book an audit
                </a>
              </div>
            </div>
          </header>

          {/* ===== Body with sticky left TOC ===== */}
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto pb-20 md:pb-28 relative">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* Sticky TOC — left rail */}
              <aside aria-label="Table of contents" className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32">
                  <ol className="relative border-l border-white/10 pl-5 space-y-4">
                    {sections.map((s, i) => {
                      const isActive = activeId === s.id;
                      return (
                        <li key={s.id} className="relative">
                          <span
                            aria-hidden
                            className={`absolute -left-[23px] top-1.5 w-[3px] h-4 rounded-full transition-colors ${
                              isActive ? "bg-[#e85d3a]" : "bg-transparent"
                            }`}
                          />
                          <a
                            href={`#${s.id}`}
                            className={`block text-[13px] leading-[1.45] transition-colors ${
                              isActive ? "text-white" : "text-white/45 hover:text-white/80"
                            }`}
                          >
                            <span className="text-white/30 tabular-nums mr-2">
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

              {/* Article body */}
              <div className="col-span-12 lg:col-span-9">
                <div className="max-w-[720px] mx-auto">
                  {/* Lede / excerpt */}
                  <p className="text-[18px] md:text-[20px] leading-[1.55] text-white/85 mb-12">
                    {post.excerpt}
                  </p>

                  {/* Cover */}
                  <figure className="mb-14 -mx-2 sm:mx-0">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
                      <img
                        src={post.image}
                        alt=""
                        width={1280}
                        height={800}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </figure>

                  {/* Sections */}
                  {sections.map((section, sIdx) => (
                    <section key={section.id} aria-labelledby={`${section.id}-h`} className="mb-14">
                      <h2
                        id={section.id}
                        className="scroll-mt-32 text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.015em] font-medium text-white mb-6"
                      >
                        <span id={`${section.id}-h`}>{section.label}</span>
                      </h2>
                      <div className="space-y-6">
                        {section.paragraphs.map((para, i) => (
                          <p
                            key={i}
                            className={`text-[17px] md:text-[18px] leading-[1.7] text-white/75 ${
                              sIdx === 0 && i === 0
                                ? "first-letter:text-[56px] first-letter:font-medium first-letter:float-left first-letter:leading-[0.9] first-letter:mr-3 first-letter:mt-1 first-letter:text-[#e85d3a]"
                                : ""
                            }`}
                          >
                            {para}
                          </p>
                        ))}

                        {/* Pull quote after first section */}
                        {sIdx === 0 && (
                          <blockquote className="mt-10 border-l-2 border-[#e85d3a] pl-6">
                            <p className="text-[22px] md:text-[26px] leading-[1.3] tracking-[-0.01em] font-light italic text-white/90">
                              “The brands that compound are the ones willing to be boring on purpose.”
                            </p>
                          </blockquote>
                        )}
                      </div>
                    </section>
                  ))}

                  {/* Footer actions */}
                  <div className="mt-4 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to="/blog"
                      className="text-[13px] text-white/60 hover:text-white rounded-full px-4 py-2 border border-white/10 hover:border-white/40 transition-colors"
                    >
                      ← All entries
                    </Link>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={copyLink}
                        className="text-[13px] text-white/60 hover:text-white rounded-full px-4 py-2 border border-white/10 hover:border-white/40 transition-colors"
                      >
                        {copied ? "Link copied ✓" : "Copy link"}
                      </button>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-white/60 hover:text-white rounded-full px-4 py-2 border border-white/10 hover:border-white/40 transition-colors"
                      >
                        Share on X
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* NEXT ARTICLE */}
        <section aria-label="Next article" className="px-6 md:px-12 max-w-[1280px] mx-auto py-16 md:py-24 border-t border-white/10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-8">Up next</p>
          <Link
            to="/blog/$slug"
            params={{ slug: next.slug }}
            className="group grid grid-cols-12 gap-6 md:gap-12 items-center rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] focus-visible:bg-white/[0.04] transition-colors p-4 md:p-6"
          >
            <figure className="col-span-12 md:col-span-5 hover-zoom aspect-[5/4] md:aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
              <img src={next.image} alt="" loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
            </figure>
            <div className="col-span-12 md:col-span-7">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
                <span className="text-[#e85d3a]">{next.category}</span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                <time dateTime={next.dateISO}>{next.date}</time>
              </div>
              <h2 className="text-[28px] md:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-white/90 group-hover:text-white transition-colors">
                {next.title}
              </h2>
              <p className="mt-4 text-[14px] text-white/55 leading-relaxed max-w-xl">{next.excerpt}</p>
              <span aria-hidden className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-white/80 group-hover:text-[#e85d3a]">
                Read next <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </section>

        {/* RELATED */}
        <section aria-labelledby="related-heading" className="px-6 md:px-12 max-w-[1280px] mx-auto py-16 md:py-24 border-t border-white/10">
          <div className="flex items-end justify-between mb-12">
            <h2 id="related-heading" className="text-[24px] md:text-[32px] tracking-[-0.02em] font-medium">
              More from the Journal
            </h2>
            <Link to="/blog" className="text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white rounded-md">
              View all →
            </Link>
          </div>
          <ul role="list" className="grid grid-cols-12 gap-6 md:gap-8">
            {related.map((p) => (
              <li key={p.slug} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <article className="group h-full flex flex-col">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="block focus-visible:outline-none rounded-3xl">
                    <figure className="hover-zoom card-cover aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#111] mb-6">
                      <img src={p.image} alt="" loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
                    </figure>
                  </Link>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
                    <span className="text-[#e85d3a]">{p.category}</span>
                    <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                    <time dateTime={p.dateISO}>{p.date}</time>
                  </div>
                  <h3 className="text-[18px] md:text-[20px] leading-[1.2] tracking-[-0.015em] font-medium text-white/90 group-hover:text-white">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="link-underline rounded-md">{p.title}</Link>
                  </h3>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="px-6 md:px-12 max-w-[1280px] mx-auto py-16 border-t border-white/10">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-between gap-6 text-[12px] text-white/40">
          <span>© R-M 2026</span>
          <ul className="flex items-center gap-6">
            <li><Link to="/blog" className="hover:text-white transition-colors rounded-md">← Back to Journal</Link></li>
            <li><span className="opacity-70">Privacy</span></li>
            <li><span aria-label="Locations">Kyiv / EU / MENA</span></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
