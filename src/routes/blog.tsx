import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { useReveal } from "@/hooks/use-reveal";

import blogFeatured from "@/assets/blog-featured.jpg";
import blog01 from "@/assets/blog-01.jpg";
import blog02 from "@/assets/blog-02.jpg";
import blog03 from "@/assets/blog-03.jpg";
import blog04 from "@/assets/blog-04.jpg";
import blog05 from "@/assets/blog-05.jpg";
import blog06 from "@/assets/blog-06.jpg";

export const Route = createFileRoute("/blog")({
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
    ],
  }),
  component: BlogPage,
});

const nav = ["Services", "Products", "Case Studies", "Insights", "About"];

const categories = ["All", "Strategy", "Positioning", "Performance", "Brand", "Field Notes"];

const featured = {
  category: "Growth Strategy",
  date: "May 12, 2026",
  read: "9 min read",
  title: "Why most scaling brands fail after rapid growth",
  excerpt:
    "Velocity hides fragility. A study of forty teams who hit traction — and the structural decisions that decided who survived the second year.",
  author: "R-M Editorial",
  image: blogFeatured,
};

type Post = {
  n: string;
  category: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
  image: string;
};

const posts: Post[] = [
  {
    n: "01",
    category: "Positioning",
    date: "Apr 28, 2026",
    read: "6 min",
    title: "The difference between visibility and market authority",
    excerpt:
      "Attention is rented. Authority compounds. Notes on the long arc of positioning in saturated categories.",
    image: blog01,
  },
  {
    n: "02",
    category: "Performance",
    date: "Apr 14, 2026",
    read: "7 min",
    title: "How structured systems outperform aggressive tactics",
    excerpt:
      "A quiet operating model beats a loud campaign — measured across two quarters of paid acquisition in MENA.",
    image: blog02,
  },
  {
    n: "03",
    category: "Brand",
    date: "Mar 30, 2026",
    read: "5 min",
    title: "Restraint as a competitive advantage",
    excerpt:
      "On editing, negative space, and what brands give up when they say everything at once.",
    image: blog03,
  },
  {
    n: "04",
    category: "Field Notes",
    date: "Mar 11, 2026",
    read: "4 min",
    title: "Notes from Riyadh: building inside high-velocity markets",
    excerpt:
      "Three weeks with founders building in MENA — patterns, contradictions, and what European studios still misread.",
    image: blog04,
  },
  {
    n: "05",
    category: "Strategy",
    date: "Feb 22, 2026",
    read: "8 min",
    title: "The compounding cost of a vague offer",
    excerpt:
      "Most growth problems are positioning problems wearing a performance-marketing costume.",
    image: blog05,
  },
  {
    n: "06",
    category: "Brand",
    date: "Feb 03, 2026",
    read: "6 min",
    title: "A taxonomy of trust signals",
    excerpt:
      "Logos, numbers, voices, silence — a working list of the signals that actually move sophisticated buyers.",
    image: blog06,
  },
];

function BlogPage() {
  useReveal();
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      {/* Pill NAV */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 reveal-fade">
        <nav className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl pl-2 pr-2">
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 text-black text-[12px] font-medium px-3 py-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e85d3a]" />
              Journal — dispatches from R-M
            </span>
          </div>
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px]"
          >
            R—M<span className="text-[#e85d3a]">.</span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-6 text-[13px] text-white/70 mr-4">
              {nav.map((n) => (
                <li key={n}>
                  <a href="#" className="hover:text-white transition-colors">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="text-[13px] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors"
            >
              Get Audit
            </a>
          </div>
        </nav>
      </header>

      {/* HEADER / EYEBROW */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-36 md:pt-48 pb-12 md:pb-20">
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-3 reveal">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
              [ Journal — 2026 ]
            </p>
            <p className="mt-4 text-[12px] text-white/30">
              Issue №14
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.95] tracking-[-0.035em] font-medium text-white">
              Field notes on<br />
              <span className="italic font-light text-white/60">
                building brands that last.
              </span>
            </h1>
            <p
              className="reveal mt-10 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-white/60"
              data-delay="2"
            >
              Essays, frameworks and quiet observations from our work with
              founders across the EU and MENA. Published when there is
              something worth saying.
            </p>
          </div>
        </div>
      </section>

      {/* TOOLBAR — search + categories */}
      <section className="sticky top-[88px] z-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 border border-white/10 bg-black/60 backdrop-blur-xl rounded-2xl p-3">
          {/* Search */}
          <div className="flex items-center gap-3 flex-1 px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4 text-white/40"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search essays, frameworks, ideas…"
              className="flex-1 bg-transparent text-[14px] placeholder:text-white/30 text-white outline-none py-2"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto md:border-l md:border-white/10 md:pl-3">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`text-[12px] px-3.5 py-2 rounded-full border whitespace-nowrap transition-colors ${
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
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            [ 01 — Featured ]
          </p>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/30 hidden md:inline">
            Editor's selection
          </span>
        </div>

        <a
          href="#"
          className="grid grid-cols-12 gap-6 md:gap-12 group cursor-pointer reveal"
        >
          <div className="col-span-12 md:col-span-7 hover-zoom">
            <div className="aspect-[5/4] relative overflow-hidden border border-white/10 bg-[#111]">
              <img
                src={featured.image}
                alt={featured.title}
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
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white">
                Featured · {featured.read}
              </span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
              <span className="text-[#e85d3a]">{featured.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{featured.date}</span>
            </div>
            <h2 className="text-[32px] md:text-[48px] leading-[1.02] tracking-[-0.02em] font-medium text-white">
              {featured.title}
            </h2>
            <p className="mt-6 text-[15px] text-white/60 leading-relaxed max-w-md">
              {featured.excerpt}
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e85d3a] to-[#4a4a6e] grid place-items-center text-[11px] font-medium text-white">
                R
              </div>
              <div className="text-[12px] text-white/50">
                <div className="text-white/80">{featured.author}</div>
                <div>{featured.read}</div>
              </div>
              <span className="ml-auto link-underline text-[13px] text-white/80">
                Read essay →
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* ARTICLES GRID */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
              [ 02 — Archive ]
            </p>
            <h3 className="text-[24px] md:text-[32px] tracking-[-0.02em] font-medium">
              {active === "All" ? "All entries" : active}
              <span className="text-white/30"> · {filtered.length}</span>
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span>Sorted by</span>
            <span className="text-white/80">Latest ↓</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-white/15 rounded-2xl py-24 text-center">
            <p className="text-[14px] text-white/50">
              Nothing here yet. Try another category or clear the search.
            </p>
            <button
              onClick={() => {
                setActive("All");
                setQuery("");
              }}
              className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-[#e85d3a]"
            >
              Reset filters →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {filtered.map((p, i) => (
              <a
                href="#"
                key={p.n}
                className="col-span-12 sm:col-span-6 lg:col-span-4 group reveal flex flex-col"
                data-delay={String(Math.min(i + 1, 5))}
              >
                <div className="hover-zoom aspect-[4/3] relative overflow-hidden border border-white/10 bg-[#111] mb-6">
                  <img
                    src={p.image}
                    alt={p.title}
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
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                    {p.category}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70">
                    {p.read}
                  </span>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">
                    <span>{p.n}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{p.date}</span>
                  </div>
                  <h4 className="text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] font-medium text-white/90 group-hover:text-white transition-colors">
                    {p.title}
                  </h4>
                  <p className="mt-3 text-[14px] text-white/55 leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[12px] text-white/60 group-hover:text-white transition-colors">
                      Read
                    </span>
                    <span className="text-[16px] text-white/40 group-hover:text-[#e85d3a] group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              Showing {filtered.length} of {posts.length} entries
            </span>
            <a
              href="#"
              className="text-[13px] px-6 py-3 rounded-full border border-white/20 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              Load more →
            </a>
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-7 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
              [ 03 — Subscribe ]
            </p>
            <h2 className="text-[36px] md:text-[64px] leading-[1] tracking-[-0.025em] font-medium">
              Quiet dispatches.<br />
              <span className="italic font-light text-white/60">
                Once a month, at most.
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 reveal" data-delay="2">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-b border-white/20 pb-3"
            >
              <input
                type="email"
                placeholder="you@studio.com"
                className="flex-1 bg-transparent text-[15px] placeholder:text-white/30 outline-none"
              />
              <button
                type="submit"
                className="text-[12px] uppercase tracking-[0.2em] text-white/80 hover:text-[#e85d3a] transition-colors"
              >
                Subscribe →
              </button>
            </form>
            <p className="mt-4 text-[12px] text-white/40 leading-relaxed">
              No tracking pixels. No drip funnels. Unsubscribe in one click.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-6 text-[12px] text-white/40">
          <span>© R-M 2026</span>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">
              ← Back home
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Kyiv / EU / MENA
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
