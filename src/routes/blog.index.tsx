import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import { MobileMenu } from "@/components/mobile-menu";
import { useReveal } from "@/hooks/use-reveal";
import { archive, featured } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — R-M" },
      {
        name: "description",
        content:
          "Essays, field notes and strategic frameworks from R-M on positioning, growth and brand systems.",
      },
      { property: "og:title", content: "Journal — R-M" },
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

const nav: { label: string; href?: string; to?: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
  { label: "About", to: "/about" },
];
const categories = ["All", "Strategy", "Positioning", "Performance", "Brand", "Field Notes"];

function BlogPage() {
  useReveal();
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const searchId = useId();
  const resultsId = useId();

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

  const filtered = archive.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const tickerWords = [
    "Journal",
    "Strategy",
    "Positioning",
    "Performance",
    "Brand systems",
    "Field notes",
    "EU · MENA",
    "Since 2019",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      <a href="#main" className="skip-link">Skip to content</a>

      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/5"
      >
        <div
          className="h-full bg-[#e85d3a] origin-left"
          style={{ width: `${progress}%`, transition: "width 80ms linear" }}
        />
      </div>

      {/* Pill NAV */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
        <nav aria-label="Primary" className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-5 md:pl-2 pr-2">
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[12px] font-medium px-3 py-1.5">
              <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-[#e85d3a]" />
              Journal — dispatches from R-M
            </span>
            <Link to="/" aria-label="R-M home" className="sm:hidden font-semibold tracking-tight text-[15px] text-white">
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
        {/* TICKER */}
        <div className="marquee overflow-hidden border-b border-white/5 pt-24 md:pt-28" aria-hidden>
          <div className="marquee-track flex gap-12 whitespace-nowrap py-3 text-[11px] uppercase tracking-[0.3em] text-white/30">
            {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12">
                {w}
                <span className="inline-block w-1 h-1 rounded-full bg-[#e85d3a]/60" />
              </span>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-12 md:pb-20" aria-labelledby="page-title">
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-3 reveal">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                <span aria-hidden>[ </span>Journal — 2026<span aria-hidden> ]</span>
              </p>
              <p className="mt-4 text-[12px] text-white/30">Issue №14</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 id="page-title" className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.95] tracking-[-0.035em] font-medium text-white">
                Field notes on<br />
                <span className="italic font-light text-white/60 drift inline-block">
                  building brands that last.
                </span>
              </h1>
              <p className="reveal mt-10 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-white/60" data-delay="2">
                Essays, frameworks and quiet observations from our work with
                founders across the EU and MENA. Published when there is
                something worth saying.
              </p>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section aria-label="Filter and search articles" className="sticky top-[88px] z-40 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 border border-white/10 bg-black/70 backdrop-blur-xl rounded-3xl p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 flex-1 px-3">
              <label htmlFor={searchId} className="sr-only">Search articles</label>
              <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/40">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search essays, frameworks, ideas…"
                aria-controls={resultsId}
                className="flex-1 bg-transparent text-[14px] placeholder:text-white/30 text-white outline-none py-2 rounded-md"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-white focus-visible:text-white rounded-full px-2">
                  Clear
                </button>
              )}
            </form>
            <div role="tablist" aria-label="Filter by category" className="flex items-center gap-1.5 overflow-x-auto md:border-l md:border-white/10 md:pl-3">
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
                    className={`text-[12px] px-3.5 py-2 rounded-full border whitespace-nowrap transition-colors min-h-[36px] ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section aria-labelledby="featured-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="flex items-end justify-between mb-10">
            <h2 id="featured-heading" className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span aria-hidden>[ </span>01 — Featured<span aria-hidden> ]</span>
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
              <figure className="hover-zoom card-cover aspect-[5/4] relative overflow-hidden border border-white/10 bg-[#111] rounded-3xl">
                <img src={featured.image} alt="" width={1280} height={1024} className="w-full h-full object-cover" />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  }}
                />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white">
                  Featured · {featured.read}
                </span>
                <span aria-hidden className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 transition-all duration-500 text-[11px] uppercase tracking-[0.25em] px-3 py-2 rounded-full bg-[#e85d3a] text-black font-medium">
                  Read essay →
                </span>
              </figure>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
                <span className="text-[#e85d3a]">{featured.category}</span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                <time dateTime={featured.dateISO}>{featured.date}</time>
              </div>
              <h3 id="featured-title" className="text-[32px] md:text-[48px] leading-[1.02] tracking-[-0.02em] font-medium text-white group-hover:text-white/95 transition-colors">
                {featured.title}
              </h3>
              <p className="mt-6 text-[15px] text-white/60 leading-relaxed max-w-md">
                {featured.excerpt}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div aria-hidden className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e85d3a] to-[#4a4a6e] grid place-items-center text-[11px] font-medium text-white">R</div>
                <div className="text-[12px] text-white/50">
                  <div className="text-white/80">{featured.author}</div>
                  <div>{featured.read}</div>
                </div>
                <span aria-hidden className="ml-auto text-[13px] text-white/80 group-hover:text-[#e85d3a] transition-colors">
                  Read essay →
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* ARCHIVE GRID */}
        <section aria-labelledby="archive-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
                <span aria-hidden>[ </span>02 — Archive<span aria-hidden> ]</span>
              </p>
              <h2 id="archive-heading" className="text-[24px] md:text-[32px] tracking-[-0.02em] font-medium">
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
            {query ? ` matching ${query}` : ""}.
          </p>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-white/15 rounded-3xl py-24 text-center">
              <p className="text-[14px] text-white/50">
                Nothing here yet. Try another category or clear the search.
              </p>
              <button
                type="button"
                onClick={() => { setActive("All"); setQuery(""); }}
                className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-[#e85d3a] focus-visible:text-[#e85d3a] rounded-full px-4 py-2"
              >
                Reset filters →
              </button>
            </div>
          ) : (
            <ul id={resultsId} role="list" aria-label="Article archive" className="grid grid-cols-12 gap-6 md:gap-8">
              {filtered.map((p, i) => (
                <li key={p.slug} className="col-span-12 sm:col-span-6 lg:col-span-4 reveal" data-delay={String(Math.min(i + 1, 5))}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    aria-label={`Read article: ${p.title}`}
                    className="group h-full flex flex-col rounded-3xl focus-visible:outline-none"
                  >
                    <article className="h-full flex flex-col">
                      <figure className="hover-zoom card-cover aspect-[4/3] relative overflow-hidden border border-white/10 bg-[#111] mb-6 rounded-3xl">
                        <img src={p.image} alt="" loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                          }}
                        />
                        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                          {p.category}
                        </span>
                        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70">
                          {p.read}
                        </span>
                        <span aria-hidden className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white text-black font-medium">
                          Read →
                        </span>
                      </figure>

                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
                          <span aria-hidden>{p.n}</span>
                          <span aria-hidden className="w-1 h-1 rounded-full bg-white/20" />
                          <time dateTime={p.dateISO}>{p.date}</time>
                        </div>
                        <h3 id={`post-${p.n}-title`} className="text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] font-medium text-white/90 group-hover:text-white transition-colors">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[14px] text-white/55 leading-relaxed line-clamp-3">{p.excerpt}</p>
                        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[12px] text-white/60 group-hover:text-white transition-colors">Read article</span>
                          <span aria-hidden className="text-[16px] text-white/40 group-hover:text-[#e85d3a] group-hover:translate-x-1 transition-all">→</span>
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
                Showing {filtered.length} of {archive.length} entries
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
        <section aria-hidden className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-40 border-t border-white/10 overflow-hidden">
          <p className="text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.05em] font-medium text-white/[0.06] whitespace-nowrap">
            Quiet · Clarity · Compounding
          </p>
        </section>

        {/* NEWSLETTER */}
        <section aria-labelledby="subscribe-heading" className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-7 reveal">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
                <span aria-hidden>[ </span>03 — Subscribe<span aria-hidden> ]</span>
              </p>
              <h2 id="subscribe-heading" className="text-[36px] md:text-[64px] leading-[1] tracking-[-0.025em] font-medium">
                Quiet dispatches.<br />
                <span className="italic font-light text-white/60">Once a month, at most.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 reveal" data-delay="2">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 border-t border-white/10">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-between gap-6 text-[12px] text-white/40">
          <span>© R-M 2026</span>
          <ul className="flex items-center gap-6">
            <li><Link to="/" className="hover:text-white transition-colors rounded-md">← Back home</Link></li>
            <li><span className="opacity-70">Privacy</span></li>
            <li><span aria-label="Locations">Kyiv / EU / MENA</span></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

function NewsletterForm() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}
      aria-describedby={`${emailId}-hint ${emailId}-status`}
    >
      <div className="flex items-center gap-2 border border-white/15 focus-within:border-white/60 rounded-full px-5 py-2 transition-colors">
        <label htmlFor={emailId} className="sr-only">Email address</label>
        <input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="flex-1 bg-transparent text-[15px] placeholder:text-white/30 outline-none rounded-md"
        />
        <button type="submit" className="text-[12px] uppercase tracking-[0.2em] text-white bg-[#e85d3a] hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black transition-colors min-h-[36px] px-4 rounded-full">
          Subscribe →
        </button>
      </div>
      <p id={`${emailId}-hint`} className="mt-4 text-[12px] text-white/40 leading-relaxed">
        No tracking pixels. No drip funnels. Unsubscribe in one click.
      </p>
      <p id={`${emailId}-status`} role="status" aria-live="polite" className={`mt-2 text-[12px] ${submitted ? "text-[#e85d3a]" : "sr-only"}`}>
        {submitted ? "Thanks — you're on the list." : ""}
      </p>
    </form>
  );
}
