import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

const nav: { label: string; href: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
  { label: "About", href: "/#about" },
];

function ArticlePage() {
  useReveal();
  const { post } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

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
          </div>
          <Link to="/" aria-label="R-M home" className="absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px]">
            R—M<span aria-hidden className="text-[#e85d3a]">.</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-6 text-[13px] text-white/70 mr-4">
              {nav.map((n) => (
                <li key={n.label}><a href={n.href} className="hover:text-white transition-colors">{n.label}</a></li>
              ))}
              <li>
                <Link to="/blog" aria-current="page" className="text-white">Journal</Link>
              </li>
            </ul>
            <a href="/#contact" className="text-[13px] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors">
              Get Audit
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Article header */}
        <article aria-labelledby="article-title">
          <header className="px-6 md:px-12 max-w-[1100px] mx-auto pt-32 md:pt-44 pb-12 md:pb-16">
            <nav aria-label="Breadcrumb" className="reveal text-[11px] uppercase tracking-[0.25em] text-white/40 mb-10 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-white rounded-md">R-M</Link>
              <span aria-hidden>/</span>
              <Link to="/blog" className="hover:text-white rounded-md">Journal</Link>
              <span aria-hidden>/</span>
              <span className="text-[#e85d3a]">{post.category}</span>
            </nav>

            <h1 id="article-title" className="reveal text-[40px] sm:text-[60px] md:text-[84px] leading-[0.98] tracking-[-0.03em] font-medium text-white max-w-[18ch]">
              {post.title}
            </h1>

            <p className="reveal mt-10 max-w-[640px] text-[17px] md:text-[20px] leading-[1.5] text-white/70" data-delay="2">
              {post.excerpt}
            </p>

            <div className="reveal mt-12 flex flex-wrap items-center gap-6 text-[12px] text-white/50" data-delay="3">
              <div className="flex items-center gap-3">
                <div aria-hidden className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e85d3a] to-[#4a4a6e] grid place-items-center text-[11px] font-medium text-white">R</div>
                <div>
                  <div className="text-white/90">{post.author}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mt-0.5">Editorial team</div>
                </div>
              </div>
              <span aria-hidden className="hidden sm:inline w-px h-8 bg-white/10" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Published</div>
                <time dateTime={post.dateISO} className="text-white/90">{post.date}</time>
              </div>
              <span aria-hidden className="hidden sm:inline w-px h-8 bg-white/10" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Reading time</div>
                <div className="text-white/90">{post.read}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy article link"
                  className="text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/15 hover:border-white hover:text-white transition-colors min-h-[36px]"
                >
                  {copied ? "Copied ✓" : "Copy link"}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/15 hover:border-white hover:text-white transition-colors min-h-[36px]"
                >
                  Share →
                </a>
              </div>
            </div>
          </header>

          {/* Cover */}
          <figure className="reveal-fade px-6 md:px-12 max-w-[1320px] mx-auto">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
              <img src={post.image} alt="" width={1280} height={1024} className="w-full h-full object-cover" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
            </div>
            <figcaption className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/30">
              Cover · {post.category}
            </figcaption>
          </figure>

          {/* Body */}
          <div className="px-6 md:px-12 max-w-[1320px] mx-auto py-16 md:py-24 grid grid-cols-12 gap-6 md:gap-12">
            {/* Sticky meta sidebar */}
            <aside aria-label="Article meta" className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">In this essay</p>
                  <ul className="space-y-2 text-[13px] text-white/70">
                    <li><a href="#section-1" className="hover:text-white rounded-md">01 · Opening</a></li>
                    <li><a href="#section-2" className="hover:text-white rounded-md">02 · Patterns</a></li>
                    <li><a href="#section-3" className="hover:text-white rounded-md">03 · Closing</a></li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">Filed under</p>
                  <p className="text-[14px] text-[#e85d3a]">{post.category}</p>
                </div>
              </div>
            </aside>

            <div className="col-span-12 lg:col-span-9 lg:pl-8">
              <div className="prose-rm max-w-[68ch] space-y-8">
                {post.body.map((para: string, i: number) => (
                  <p
                    key={i}
                    id={i === 0 ? "section-1" : i === 1 ? "section-2" : i === 2 ? "section-3" : undefined}
                    className={`text-[17px] md:text-[19px] leading-[1.65] text-white/80 ${
                      i === 0
                        ? "first-letter:text-[64px] first-letter:font-medium first-letter:float-left first-letter:leading-[0.9] first-letter:mr-3 first-letter:mt-1 first-letter:text-[#e85d3a]"
                        : ""
                    }`}
                  >
                    {para}
                  </p>
                ))}

                {/* Pull quote */}
                <blockquote className="my-12 border-l-2 border-[#e85d3a] pl-6 md:pl-8">
                  <p className="text-[24px] md:text-[32px] leading-[1.25] tracking-[-0.015em] font-light italic text-white/90">
                    “The brands that compound are the ones willing to be boring on purpose.”
                  </p>
                </blockquote>

                <p className="text-[17px] md:text-[19px] leading-[1.65] text-white/80">
                  None of this is a prescription. It's a description of what we keep seeing — and what we keep wishing more founders saw earlier. If any of it lands, the rest of the journal is here for you.
                </p>
              </div>

              {/* Footer actions */}
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <Link to="/blog" className="text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white rounded-full px-4 py-2 border border-white/10 hover:border-white/40 transition-colors">
                  ← All entries
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white rounded-full px-4 py-2 border border-white/10 hover:border-white/40 transition-colors"
                  >
                    {copied ? "Link copied ✓" : "Copy link"}
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white rounded-full px-4 py-2 border border-white/10 hover:border-white/40 transition-colors"
                  >
                    Share on X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* NEXT ARTICLE */}
        <section aria-label="Next article" className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
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
        <section aria-labelledby="related-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
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

      <footer className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 border-t border-white/10">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-between gap-6 text-[12px] text-white/40">
          <span>© R-M 2026</span>
          <ul className="flex items-center gap-6">
            <li><Link to="/" className="hover:text-white transition-colors rounded-md">Home</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors rounded-md">Journal</Link></li>
            <li><a href="#" className="hover:text-white transition-colors rounded-md">Privacy</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
