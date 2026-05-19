import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { cases, getCase, getOtherCases, type CaseStudy } from "@/lib/cases";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }): { study: CaseStudy } => {
    const study = getCase(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return { meta: [{ title: "Case not found — R-M" }] };
    return {
      meta: [
        { title: `${s.client} — ${s.primaryMetric.value} ${s.primaryMetric.label} | R-M` },
        { name: "description", content: s.headline },
        { property: "og:title", content: `${s.client} — ${s.primaryMetric.value} ${s.primaryMetric.label}` },
        { property: "og:description", content: s.headline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">Case not found</h1>
        <p className="mt-6 text-white/60">This case study does not exist.</p>
        <Link
          to="/cases"
          className="inline-block mt-10 text-[13px] px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors"
        >
          View all cases →
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-medium">Something went wrong</h1>
        <p className="mt-4 text-white/60 text-sm">{error.message}</p>
        <Link to="/cases" className="inline-block mt-8 text-[13px] underline">Back to cases</Link>
      </div>
    </div>
  ),
  component: CaseDetail,
});

function CaseDetail() {
  useReveal();
  const { study: c } = Route.useLoaderData();
  const others = getOtherCases(c.slug, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black overflow-x-hidden">
      <SiteHeader variant="dark" />

      {/* HERO ~60vh */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-20 md:pt-28 pb-20 md:pb-24 min-h-[60vh] flex flex-col justify-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background: `radial-gradient(50% 60% at 25% 30%, ${c.accent}33, transparent 70%), radial-gradient(45% 55% at 80% 70%, #ffffff10, transparent 70%)`,
          }}
        />

        <Link
          to="/cases"
          className="reveal text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors mb-10 w-fit"
        >
          ← All cases
        </Link>

        <div className="reveal flex items-center gap-3 mb-8" data-delay="1">
          <span
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl text-white font-semibold tracking-tight text-[18px]"
            style={{ background: `${c.accent}40`, border: `1px solid ${c.accent}80` }}
          >
            {c.client.slice(0, 1)}
          </span>
          <span className="text-[14px] text-white/70">{c.client}</span>
          <span className="text-white/30">·</span>
          <span className="text-[12px] uppercase tracking-[0.18em] text-white/50">
            {c.niche}
          </span>
          <span className="text-white/30">·</span>
          <span className="text-[12px] uppercase tracking-[0.18em] text-white/50">
            {c.format} · {c.duration}
          </span>
        </div>

        <h1
          className="reveal text-[40px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.04em] font-medium text-white max-w-[1200px]"
          data-delay="2"
        >
          {c.headline}
        </h1>

        <div
          className="reveal mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          data-delay="3"
        >
          {c.heroMetrics.map((m) => (
            <div key={m.label}>
              <div className="text-[40px] md:text-[56px] lg:text-[64px] font-medium tracking-[-0.04em] leading-none text-white">
                {m.value}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/55">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTEXT */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-6 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">The task</p>
            <h2 className="text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] font-medium">
              <span className="italic font-light text-white/60">What stood</span> in front of {c.client}.
            </h2>
            <p className="mt-8 text-[16px] text-white/70 leading-relaxed max-w-[52ch]">
              {c.situation}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 reveal" data-delay="2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">The challenge</p>
            <h2 className="text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] font-medium">
              <span className="italic font-light text-white/60">Why it was</span> hard to move.
            </h2>
            <p className="mt-8 text-[16px] text-white/70 leading-relaxed max-w-[52ch]">
              {c.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DID — vertical timeline */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-4 reveal">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">The work</p>
            <h2 className="text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] font-medium">
              What we<br />
              <span className="italic font-light text-white/60">actually did.</span>
            </h2>
          </div>
          <ol className="col-span-12 md:col-span-8 relative">
            <span
              aria-hidden
              className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10"
            />
            {c.work.map((w, i) => (
              <li
                key={w.title}
                className="relative pl-14 pb-14 last:pb-0 reveal"
                data-delay={String((i % 3) + 1)}
              >
                <span
                  className="absolute left-0 top-1 w-8 h-8 rounded-full border border-white/20 grid place-items-center text-[12px] text-white/70 bg-[#0a0a0a]"
                  style={{ borderColor: `${c.accent}80` }}
                >
                  0{i + 1}
                </span>
                <h3 className="text-[22px] md:text-[28px] font-medium tracking-[-0.01em] text-white">
                  {w.title}
                </h3>
                <p className="mt-4 text-[15px] md:text-[16px] text-white/65 leading-relaxed max-w-[60ch]">
                  {w.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RESULTS */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="reveal">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">The result</p>
          <h2 className="text-[36px] md:text-[64px] leading-[1] tracking-[-0.02em] font-medium max-w-[20ch]">
            Numbers the team<br />
            <span className="italic font-light text-white/60">still runs on.</span>
          </h2>
        </div>

        <div className="reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12" data-delay="2">
          {c.resultMetrics.map((m) => (
            <div key={m.label}>
              <div className="text-[48px] md:text-[72px] lg:text-[88px] font-medium tracking-[-0.04em] leading-none text-white">
                {m.value}
              </div>
              <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/55">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 md:gap-12">
          <p className="reveal col-span-12 md:col-span-7 text-[16px] md:text-[18px] text-white/70 leading-relaxed max-w-[55ch]">
            {c.resultsBody}
          </p>
          <blockquote
            className="reveal col-span-12 md:col-span-5 border-l-2 pl-6 md:pl-8"
            style={{ borderColor: c.accent }}
            data-delay="2"
          >
            <p className="text-[18px] md:text-[22px] leading-[1.4] tracking-[-0.01em] text-white/85 italic font-light">
              “{c.quote.text}”
            </p>
            <footer className="mt-6 text-[12px] uppercase tracking-[0.18em] text-white/50">
              {c.quote.who} — {c.quote.role}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* OTHER CASES */}
      {others.length > 0 && (
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-t border-white/10">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-[28px] md:text-[40px] leading-[1] tracking-[-0.02em] font-medium">
              Other<br />
              <span className="italic font-light text-white/60">projects.</span>
            </h2>
            <Link
              to="/cases"
              className="hidden md:inline-block text-[13px] text-white/60 hover:text-white border-b border-white/20 pb-1"
            >
              View all cases →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/cases/$slug"
                params={{ slug: o.slug }}
                className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 40%, ${o.accent}55, transparent 60%)`,
                    }}
                  />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                    {o.client}
                  </span>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[48px] md:text-[64px] font-medium tracking-[-0.04em] leading-none text-white">
                      {o.primaryMetric.value}
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                      {o.primaryMetric.label}
                    </div>
                  </div>
                </figure>
                <div className="p-6 flex items-center justify-between gap-4">
                  <span className="text-[12px] text-white/55">{o.niche}</span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

export const _allCaseSlugs = cases.map((c) => c.slug);
