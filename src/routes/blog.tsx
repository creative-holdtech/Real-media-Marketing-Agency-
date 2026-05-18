import { createFileRoute, Link } from "@tanstack/react-router";

import { useReveal } from "@/hooks/use-reveal";

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
  author: "Editorial",
};

const posts = [
  {
    n: "01",
    category: "Positioning",
    date: "Apr 28, 2026",
    read: "6 min",
    title: "The difference between visibility and market authority",
    excerpt:
      "Attention is rented. Authority compounds. Notes on the long arc of positioning in saturated categories.",
  },
  {
    n: "02",
    category: "Performance",
    date: "Apr 14, 2026",
    read: "7 min",
    title: "How structured systems outperform aggressive tactics",
    excerpt:
      "A quiet operating model beats a loud campaign — measured across two quarters of paid acquisition in MENA.",
  },
  {
    n: "03",
    category: "Brand",
    date: "Mar 30, 2026",
    read: "5 min",
    title: "Restraint as a competitive advantage",
    excerpt:
      "On editing, negative space, and what brands give up when they say everything at once.",
  },
  {
    n: "04",
    category: "Field Notes",
    date: "Mar 11, 2026",
    read: "4 min",
    title: "Notes from Riyadh: building inside high-velocity markets",
    excerpt:
      "Three weeks with founders building in MENA — patterns, contradictions, and what European studios still misread.",
  },
  {
    n: "05",
    category: "Strategy",
    date: "Feb 22, 2026",
    read: "8 min",
    title: "The compounding cost of a vague offer",
    excerpt:
      "Most growth problems are positioning problems wearing a performance-marketing costume.",
  },
  {
    n: "06",
    category: "Brand",
    date: "Feb 03, 2026",
    read: "6 min",
    title: "A taxonomy of trust signals",
    excerpt:
      "Logos, numbers, voices, silence — a working list of the signals that actually move sophisticated buyers.",
  },
];

function BlogPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      {/* Pill NAV (matches index) */}
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
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pt-40 md:pt-52 pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-3 reveal">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
              [ Journal — 2026 ]
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
              founders across the EU and MENA. Published when there is something
              worth saying.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto border-t border-white/10 py-6">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 mr-4 whitespace-nowrap">
            Filter
          </span>
          {categories.map((c, i) => (
            <button
              key={c}
              className={`text-[12px] px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                i === 0
                  ? "border-white/80 bg-white text-black"
                  : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-10">
          [ 01 — Featured ]
        </p>
        <article className="grid grid-cols-12 gap-6 md:gap-12 group cursor-pointer reveal">
          <div className="col-span-12 md:col-span-7 hover-zoom">
            <div className="aspect-[4/3] md:aspect-[5/4] relative overflow-hidden border border-white/10">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #b8c2a3 0%, #8a9885 22%, #4a4a6e 55%, #1e1a3a 80%, #0a0a0a 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(55% 45% at 25% 30%, rgba(168,180,150,0.55), transparent 70%), radial-gradient(50% 55% at 70% 55%, rgba(45,30,80,0.75), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.5] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
              <span className="text-[#e85d3a]">{featured.category}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.read}</span>
            </div>
            <h2 className="text-[32px] md:text-[48px] leading-[1.02] tracking-[-0.02em] font-medium group-hover:text-white transition-colors">
              {featured.title}
            </h2>
            <p className="mt-6 text-[15px] text-white/60 leading-relaxed max-w-md">
              {featured.excerpt}
            </p>
            <div className="mt-10">
              <span className="link-underline text-[13px] text-white/80">
                Read the essay →
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* ARTICLES LIST */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24 border-t border-white/10">
        <div className="flex items-end justify-between mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            [ 02 — Archive ]
          </p>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            {posts.length} entries
          </span>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {posts.map((p, i) => (
            <li
              key={p.n}
              className="grid grid-cols-12 items-baseline gap-4 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors cursor-pointer reveal"
              data-delay={String(Math.min(i + 1, 5))}
            >
              <span className="col-span-2 md:col-span-1 text-[11px] text-white/30 tracking-[0.2em]">
                {p.n}
              </span>
              <span className="col-span-10 md:col-span-2 text-[11px] uppercase tracking-[0.2em] text-[#e85d3a]/80">
                {p.category}
              </span>
              <h3 className="col-span-12 md:col-span-6 text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.015em] font-medium text-white/90 group-hover:text-white">
                {p.title}
                <span className="block mt-2 text-[13px] md:text-[14px] font-normal text-white/50 leading-relaxed max-w-xl">
                  {p.excerpt}
                </span>
              </h3>
              <span className="col-span-6 md:col-span-2 text-[12px] text-white/40">
                {p.date}
                <br />
                <span className="text-white/30">{p.read}</span>
              </span>
              <span className="col-span-6 md:col-span-1 text-right text-[18px] text-white/40 group-hover:text-[#e85d3a] group-hover:translate-x-1 transition-all">
                →
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Page 01 / 04
          </span>
          <a
            href="#"
            className="text-[13px] px-6 py-3 rounded-full border border-white/20 hover:border-white hover:-translate-y-0.5 transition-all"
          >
            Load more →
          </a>
        </div>
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
