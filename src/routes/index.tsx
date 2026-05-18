import { createFileRoute } from "@tanstack/react-router";
import heroBloom from "@/assets/hero-bloom.jpg";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

const nav = ["Services", "Products", "Case Studies", "Insights", "About"];

const facts = [
  ["40+", "Projects delivered"],
  ["4", "Core industries"],
  ["EU+MENA", "Active markets"],
  ["Tier 1–3", "Experience"],
  ["1 team", "Strategy + execution"],
];

const metrics = [
  ["01", "40+", "Launched projects"],
  ["02", "04", "Industries mastered"],
  ["03", "EU·MENA", "Markets"],
  ["04", "High-risk", "Niche expertise"],
  ["05", "Long-term", "Growth focus"],
];

const testimonials = [
  {
    quote:
      "R-M helped us rebuild the way we communicate our value. The clarity alone changed how clients perceived our brand.",
    who: "Founder",
    company: "Fintech Company",
  },
  {
    quote:
      "Their process feels less like outsourcing and more like having an internal strategic team.",
    who: "COO",
    company: "Performance Agency",
  },
  {
    quote:
      "They move fast, stay structured, and understand difficult markets better than most agencies we worked with.",
    who: "Head of Growth",
    company: "iGaming Brand",
  },
];

const cases = [
  {
    metric: "+312%",
    label: "Qualified leads",
    sector: "Fintech / EU Market",
    desc: "Complete repositioning and acquisition system redesign for a scaling fintech company.",
  },
  {
    metric: "4.7×",
    label: "ROAS increase",
    sector: "iGaming / MENA",
    desc: "Strategic creative direction and funnel optimization across multiple GEOs.",
  },
];

const articles = [
  ["Growth Strategy", "Why most scaling brands fail after rapid growth"],
  ["Positioning", "The difference between visibility and market authority"],
  ["Performance", "How structured systems outperform aggressive tactics"],
];

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/70 border-b border-white/5">
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight text-base">
            R—M<span className="text-[#e85d3a]">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-[13px] text-white/60">
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
            Get Audit →
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-7 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-10">
              [ R-M Studio — Est. Strategy & Growth ]
            </p>
            <h1 className="text-[44px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] font-medium">
              We build marketing
              <br />
              systems that
              <br />
              <span className="italic font-light text-white/70">survive</span>{" "}
              beyond
              <br />
              trends.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8 flex flex-col justify-end reveal" data-delay="2">
            <p className="text-[14px] text-white/60 leading-relaxed max-w-sm mb-10">
              Strategy, positioning and execution under one team — built for
              ambitious brands operating in competitive industries across the
              EU and MENA.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="text-[13px] px-5 py-3 rounded-full bg-[#e85d3a] text-white font-medium hover:bg-white hover:text-black hover:-translate-y-0.5"
              >
                Start Project →
              </a>
              <a
                href="#"
                className="text-[13px] px-5 py-3 rounded-full border border-white/15 text-white hover:border-white hover:-translate-y-0.5"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-20 md:mt-28 relative aspect-[16/8] overflow-hidden rounded-sm reveal-scale hover-zoom">
          <img
            src={heroBloom}
            alt="Abstract chromatic bloom artwork"
            width={1280}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[11px] uppercase tracking-[0.2em] text-white/80">
            <span>Vol. 01 — Ethereal Visions</span>
            <span>2025 / Now</span>
          </div>
        </div>

        {/* Facts row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {facts.map(([k, v], i) => (
            <div
              key={v}
              className="bg-[#0a0a0a] p-6 reveal"
              data-delay={String(Math.min(i + 1, 5))}
            >
              <div className="text-2xl md:text-3xl font-medium tracking-tight">
                {k}
              </div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-white/40 mt-2">
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS + ABOUT */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">
              [ 02 — About ]
            </p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              A studio for brands<br />
              <span className="italic font-light text-white/60">
                that take risks.
              </span>
            </h2>
            <p className="mt-10 text-[15px] text-white/60 leading-relaxed max-w-md">
              R-M works with ambitious brands operating in competitive
              industries. We combine strategy, positioning, and execution into
              systems designed for long-term growth — not temporary spikes.
            </p>
            <p className="mt-4 text-[15px] text-white/60 leading-relaxed max-w-md">
              Fast decisions, clear structure, and deep industry understanding
              shape every project we take on.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {metrics.map(([n, big, label], i) => (
                <li
                  key={n}
                  className="grid grid-cols-12 items-baseline py-6 group hover:bg-white/[0.02] transition-colors reveal"
                  data-delay={String(Math.min(i + 1, 5))}
                >
                  <span className="col-span-2 text-[11px] text-white/30 tracking-[0.2em]">
                    {n}
                  </span>
                  <span className="col-span-5 text-2xl md:text-3xl font-medium tracking-tight group-hover:text-[#e85d3a] transition-colors">
                    {big}
                  </span>
                  <span className="col-span-5 text-[13px] text-white/50 text-right md:text-left">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-16">
          [ 03 — Voices ]
        </p>
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="col-span-12 md:col-span-4 border-t border-white/15 pt-8 reveal"
              data-delay={String(i + 1)}
            >
              <blockquote className="text-[20px] md:text-[22px] leading-[1.3] tracking-[-0.01em] font-light text-white/90">
                <span className="text-[#e85d3a] mr-1">“</span>
                {t.quote}
                <span className="text-[#e85d3a] ml-1">”</span>
              </blockquote>
              <figcaption className="mt-10 text-[12px] uppercase tracking-[0.18em] text-white/40">
                {t.who} — <span className="text-white/70">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
            [ 04 — Products ]
          </p>
          <h2 className="col-span-12 md:col-span-9 text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
            Choose the level<br />
            of support you need<br />
            <span className="italic font-light text-white/60">right now.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-px bg-white/10 border border-white/10">
          {[
            {
              name: "Sprint",
              tag: "Fast Execution",
              desc: "Fast execution for brands that need clarity, positioning, and launch-ready assets quickly.",
              items: [
                "Strategic positioning",
                "Landing page / funnel design",
                "Messaging structure",
                "Launch-ready delivery",
              ],
              time: "2–4 weeks",
            },
            {
              name: "Marathon",
              tag: "Long-Term Partnership",
              desc: "Long-term strategic partnership focused on scaling, optimization, and sustainable growth.",
              items: [
                "Ongoing strategy support",
                "Growth systems & optimization",
                "Creative & marketing execution",
                "Continuous performance improvements",
              ],
              time: "Ongoing partnership",
            },
          ].map((p, i) => (
            <article
              key={p.name}
              className="col-span-12 md:col-span-6 bg-[#0a0a0a] p-8 md:p-12 flex flex-col reveal"
              data-delay={String(i + 1)}
            >
              <div className="flex items-baseline justify-between mb-12">
                <h3 className="text-[40px] md:text-[56px] font-medium tracking-[-0.03em] leading-none">
                  {p.name}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {p.tag}
                </span>
              </div>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-md mb-10">
                {p.desc}
              </p>
              <ul className="space-y-3 mb-10">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="text-[14px] text-white/80 flex gap-3 border-b border-white/5 pb-3"
                  >
                    <span className="text-[#e85d3a]">—</span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between pt-8">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Timeline
                  </div>
                  <div className="text-[14px] mt-1">{p.time}</div>
                </div>
                <a
                  href="#"
                  className="text-[13px] px-5 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  Learn More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
              [ 05 — Cases ]
            </p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              Results we<br />
              <span className="italic font-light text-white/60">deliver.</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-block text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Cases →
          </a>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {cases.map((c, i) => (
            <article
              key={i}
              className="col-span-12 md:col-span-6 group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 mb-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-60 mix-blend-screen"
                  style={{
                    background:
                      i === 0
                        ? "radial-gradient(circle at 30% 40%, #e85d3a55, transparent 60%), radial-gradient(circle at 70% 70%, #4a6b8a44, transparent 60%)"
                        : "radial-gradient(circle at 70% 30%, #c9a84c55, transparent 60%), radial-gradient(circle at 30% 70%, #5a8a5c44, transparent 60%)",
                  }}
                />
                <div className="absolute top-6 left-6 text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Case 0{i + 1}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between">
                  <div className="text-[56px] md:text-[80px] font-medium tracking-[-0.04em] leading-none text-white">
                    {c.metric}
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/70 text-right">
                    {c.label}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[12px] uppercase tracking-[0.18em] text-white/40">
                  {c.sector}
                </span>
                <span className="text-[12px] text-white/60 group-hover:text-[#e85d3a] transition-colors">
                  Read Case →
                </span>
              </div>
              <p className="text-[15px] text-white/70 leading-relaxed max-w-md">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
            [ 06 — Insights ]
          </p>
          <h2 className="col-span-12 md:col-span-9 text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
            From our<br />
            <span className="italic font-light text-white/60">insights.</span>
          </h2>
        </div>

        <ul className="border-t border-white/15">
          {articles.map(([cat, title], i) => (
            <li key={i}>
              <a
                href="#"
                className="grid grid-cols-12 items-baseline gap-4 py-8 border-b border-white/15 group hover:bg-white/[0.02] -mx-4 px-4 transition-colors"
              >
                <span className="col-span-2 md:col-span-1 text-[11px] text-white/30 tracking-[0.2em]">
                  0{i + 1}
                </span>
                <span className="col-span-10 md:col-span-3 text-[12px] uppercase tracking-[0.18em] text-white/50">
                  {cat}
                </span>
                <span className="col-span-10 md:col-span-7 text-[20px] md:text-[28px] font-medium tracking-[-0.01em] leading-tight group-hover:text-[#e85d3a] transition-colors">
                  {title}
                </span>
                <span className="hidden md:block col-span-1 text-[12px] text-white/40 text-right group-hover:text-white">
                  Read →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a
            href="#"
            className="text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
          >
            View All Articles →
          </a>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <h2 className="text-[44px] md:text-[88px] lg:text-[120px] leading-[0.95] tracking-[-0.03em] font-medium">
          Let's build<br />
          something that<br />
          <span className="italic font-light text-white/50">lasts.</span>
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="#"
            className="text-[13px] px-6 py-4 rounded-full bg-[#e85d3a] text-white font-medium hover:bg-white hover:text-black transition-colors"
          >
            Get Free Audit →
          </a>
          <a
            href="#"
            className="text-[13px] px-6 py-4 rounded-full border border-white/15 hover:border-white transition-colors"
          >
            hello@r-m.studio
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 pb-10 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="text-3xl font-semibold tracking-tight">
              R—M<span className="text-[#e85d3a]">.</span>
            </div>
            <p className="mt-5 text-[14px] text-white/55 leading-relaxed max-w-xs">
              Strategic growth partner for ambitious brands operating in
              competitive industries.
            </p>
            <div className="mt-8 flex gap-5 text-[12px] uppercase tracking-[0.18em] text-white/40">
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Behance</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">
              Work
            </div>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Products</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">
              Studio
            </div>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contacts</a></li>
              <li><a href="#" className="hover:text-white">Audit</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">
              Located
            </div>
            <div className="text-[14px] text-white/70">
              Kyiv — EU — MENA
            </div>
            <div className="mt-5 text-[12px] text-white/40 leading-relaxed">
              Operating across CET / GST timezones for partners in finance,
              iGaming, performance, and lifestyle.
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/30">
          <span>© R-M 2025</span>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <span>Vol. 01 — Made with intent</span>
        </div>
      </footer>
    </div>
  );
}
