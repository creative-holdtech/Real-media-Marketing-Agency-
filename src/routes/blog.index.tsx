import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { archive, featured, posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — R-M" },
      {
        name: "description",
        content:
          "Essays, field notes and strategic frameworks from R-M on positioning, growth and brand systems.",
      },
      { property: "og:title", content: "Blog — R-M" },
      {
        property: "og:description",
        content:
          "Essays, field notes and strategic frameworks from R-M on positioning, growth and brand systems.",
      },
      { property: "og:image", content: featured.image },
    ],
  }),
  component: BlogPage,
});

const categories = [
  "All",
  "Strategy",
  "Growth Strategy",
  "Positioning",
  "Performance",
  "Brand",
  "Field Notes",
];

function BlogPage() {
  useReveal();
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

  const filterSource = active === "All" ? archive : posts;
  const filtered = filterSource.filter((p) => active === "All" || p.category === active);

  const tickerWords = [
    "Brand systems",
    "Strategy",
    "Positioning",
    "Performance",
    "SEO",
    "PR",
    "SMM",
    "Design",
    "Field notes",
    "EU · MENA",
  ];

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
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/5"
      >
        <div
          className="h-full w-full bg-rm-accent origin-left"
          style={{ transform: `scaleX(${progress / 100})`, transition: "transform 80ms linear" }}
        />
      </div>

      <SiteHeader variant="dark" />

      <main id="main">
        {/* TICKER */}
        <div className="marquee overflow-hidden border-b border-white/5 pt-24 md:pt-28" aria-hidden>
          <div className="marquee-track flex gap-12 whitespace-nowrap py-3 text-[11px] uppercase tracking-[0.3em] text-white/30">
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w}
                <span className="inline-block w-1 h-1 rounded-full bg-rm-accent/60" />
              </span>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <section
          className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-12 md:pb-20"
          aria-labelledby="page-title"
        >
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-3 reveal">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                Blog — season · 2026
              </p>
              <p className="mt-4 text-[12px] text-white/30">Issued by marketing geeks</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1
                id="page-title"
                className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.95] tracking-[-0.035em] font-medium text-white"
              >
                Field notes on
                <br />
                <span className="font-light text-white/60 drift inline-block">
                  building brands that last.
                </span>
              </h1>
              <p
                className="reveal mt-10 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed rm-body"
                data-delay="2"
              >
                Essays, frameworks and quiet observations from our work with founders across the EU
                and MENA. Published when there is something worth saying.
              </p>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section aria-label="Filter articles" className="sticky top-[88px] z-40 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-wrap items-center gap-2"
          >
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={resultsId}
                  onClick={() => setActive(c)}
                  className={`rm-btn px-4 ${
                    isActive
                      ? "rm-btn-primary border border-white"
                      : "rm-btn-secondary text-white/70 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURED */}
        <section
          aria-labelledby="featured-heading"
          className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-16 md:pb-24"
        >
          <div className="flex items-end justify-between mb-10">
            <h2
              id="featured-heading"
              className="text-[11px] uppercase tracking-[0.2em] text-white/40"
            >
              Featured · Editor's selection
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/30 hidden md:inline">
              Editor's selection
            </span>
          </div>

          <article className="group relative grid grid-cols-12 gap-6 md:gap-12 reveal rounded-3xl">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              aria-label={`Read essay: ${featured.title}`}
              className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none"
            >
              <span className="sr-only">{featured.title}</span>
            </Link>
            <div className="col-span-12 md:col-span-7">
              <figure className="hover-zoom card-cover aspect-[5/4] relative rm-media-card">
                <img
                  src={featured.image}
                  alt=""
                  width={1280}
                  height={1024}
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  }}
                />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-rm-surface/60 backdrop-blur-md border border-white/15 text-white">
                  Featured · {featured.read}
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 transition-all duration-500 text-[11px] uppercase tracking-[0.25em] px-3 py-2 rounded-full bg-rm-accent text-black font-medium"
                >
                  Read essay →
                </span>
              </figure>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
                <span className="text-rm-accent">{featured.category}</span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                <time dateTime={featured.dateISO}>{featured.date}</time>
              </div>
              <h3
                id="featured-title"
                className="text-[32px] md:text-[48px] leading-[1.02] tracking-[-0.02em] font-medium text-white group-hover:text-white/95 transition-colors"
              >
                {featured.title}
              </h3>
              <p className="mt-6 text-[15px] rm-body leading-relaxed max-w-md">
                {featured.excerpt}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div
                  aria-hidden
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e85d3a] to-[#4a4a6e] grid place-items-center text-[11px] font-medium text-white"
                >
                  R
                </div>
                <div className="text-[12px] text-white/50">
                  <div className="text-white/80">{featured.author}</div>
                  <div>{featured.read}</div>
                </div>
                <span
                  aria-hidden
                  className="ml-auto text-[13px] text-white/80 group-hover:text-rm-accent transition-colors"
                >
                  Read essay →
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* ARCHIVE GRID */}
        <section
          aria-labelledby="archive-heading"
          className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10"
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">Archive</p>
              <h2
                id="archive-heading"
                className="text-[24px] md:text-[32px] tracking-[-0.02em] font-medium"
              >
                {active === "All" ? "All entries" : active}
                <span className="text-white/30"> · {filtered.length}</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span>Sorted by</span>
              <span className="text-white/80">Latest ↓</span>
            </div>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {filtered.length} article{filtered.length === 1 ? "" : "s"} found
            {active !== "All" ? ` in ${active}` : ""}
            .
          </p>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-white/15 rounded-3xl py-24 text-center">
              <p className="text-[14px] text-white/50">
                Nothing here yet. Try another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActive("All");
                }}
                className="mt-6 rm-touch text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-rm-accent focus-visible:text-rm-accent rounded-full px-4 py-2"
              >
                Reset filters →
              </button>
            </div>
          ) : (
            <ul
              id={resultsId}
              role="list"
              aria-label="Article archive"
              className="grid grid-cols-12 gap-6 md:gap-8"
            >
              {filtered.map((p, i) => (
                <li
                  key={p.slug}
                  className="col-span-12 sm:col-span-6 lg:col-span-4 reveal"
                  data-delay={String(Math.min(i + 1, 5))}
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    aria-label={`Read article: ${p.title}`}
                    className="group h-full flex flex-col rounded-3xl focus-visible:outline-none"
                  >
                    <article className="h-full flex flex-col">
                      <figure className="hover-zoom card-cover aspect-[4/3] relative rm-media-card mb-6">
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="w-full h-full object-cover"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                          }}
                        />
                        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-rm-surface/70 backdrop-blur-md border border-white/15 text-white/90">
                          {p.category}
                        </span>
                        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-rm-surface/70 backdrop-blur-md border border-white/15 text-white/75">
                          {p.read}
                        </span>
                        <span
                          aria-hidden
                          className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white text-black font-medium"
                        >
                          Read →
                        </span>
                      </figure>

                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
                          <span aria-hidden>{p.n}</span>
                          <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                          <time dateTime={p.dateISO}>{p.date}</time>
                        </div>
                        <h3
                          id={`post-${p.n}-title`}
                          className="text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] font-medium text-white/90 group-hover:text-white transition-colors"
                        >
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[14px] rm-muted leading-relaxed line-clamp-3">
                          {p.excerpt}
                        </p>
                        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[12px] text-white/60 group-hover:text-white transition-colors">
                            Read article
                          </span>
                          <span
                            aria-hidden
                            className="text-[16px] text-white/40 group-hover:text-rm-accent group-hover:translate-x-1 transition-all"
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {filtered.length > 0 && (
            <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Showing {filtered.length} of {filterSource.length} entries
              </span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[13px] px-6 py-3 rounded-full border border-white/20 hover:border-white hover:-translate-y-0.5 transition-all min-h-[44px] inline-flex items-center cursor-pointer"
              >
                Back to top ↑
              </button>
            </div>
          )}
        </section>

        {/* BIG TYPE STATEMENT */}
        <section
          aria-hidden
          className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-28 border-t border-white/10 overflow-hidden"
        >
          <p className="text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.05em] font-medium text-white/[0.06] whitespace-nowrap">
            Quiet · Clarity · Compounding
          </p>
        </section>

        {/* NEWSLETTER */}
        <section
          aria-labelledby="subscribe-heading"
          className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-24 border-t border-white/10"
        >
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-7 reveal">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">Subscribe</p>
              <h2
                id="subscribe-heading"
                className="text-[36px] md:text-[64px] leading-[1] tracking-[-0.025em] font-medium"
              >
                Quiet dispatches.
                <br />
                <span className="font-light text-white/60">Once a month, at most.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 reveal" data-delay="2">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function NewsletterForm() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSubmitted(true);
      }}
      aria-describedby={`${emailId}-hint ${emailId}-status`}
    >
      <div className="flex items-center gap-2 border border-white/15 focus-within:border-white/60 rounded-full px-5 py-2 transition-colors">
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="flex-1 bg-transparent text-[15px] placeholder:text-white/30 outline-none rounded-md"
        />
        <button
          type="submit"
          className="rm-touch text-[12px] uppercase tracking-[0.2em] text-white bg-rm-accent hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black transition-colors px-4 rounded-full"
        >
          Subscribe →
        </button>
      </div>
      <p id={`${emailId}-hint`} className="mt-4 text-[12px] text-white/40 leading-relaxed">
        No tracking pixels. No drip funnels. Unsubscribe in one click.
      </p>
      <p
        id={`${emailId}-status`}
        role="status"
        aria-live="polite"
        className={`mt-2 text-[12px] ${submitted ? "text-rm-accent" : "sr-only"}`}
      >
        {submitted ? "Thanks — you're on the list." : ""}
      </p>
    </form>
  );
}
