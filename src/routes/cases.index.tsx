import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { caseNiches, cases, type CaseNiche } from "@/lib/cases";

export const Route = createFileRoute("/cases/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Results We Deliver | R-M" },
      {
        name: "description",
        content:
          "Selected work for AI SaaS, Fintech, Cybersecurity and iGaming teams. Real metrics, real engagements.",
      },
      { property: "og:title", content: "Case Studies — R-M" },
      {
        property: "og:description",
        content:
          "Selected work for AI SaaS, Fintech, Cybersecurity and iGaming teams.",
      },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  useReveal();
  const [niche, setNiche] = useState<CaseNiche>("All");

  const filtered = useMemo(
    () => (niche === "All" ? cases : cases.filter((c) => c.niche === niche)),
    [niche],
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black overflow-x-hidden">
      <SiteHeader variant="dark" />

      {/* HERO ~50vh */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-32 pb-16 md:pb-20 min-h-[50vh] flex flex-col justify-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 30%, rgba(232,93,58,0.18), transparent 70%), radial-gradient(45% 55% at 80% 70%, rgba(124,92,255,0.18), transparent 70%)",
          }}
        />
        <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
          Results our{" "}
          <span className="italic font-light text-white/70">clients ship.</span>
        </h1>
        <p
          className="reveal mt-8 max-w-[640px] text-[15px] md:text-[17px] leading-relaxed text-white/65"
          data-delay="2"
        >
          Engagements with founders and growth teams across AI SaaS, Fintech,
          Cybersecurity and iGaming. Each case is a system we built — and the
          numbers it produced.
        </p>

        {/* Niche filter pills */}
        <div
          className="reveal mt-12 flex flex-wrap items-center gap-2"
          data-delay="3"
        >
          {caseNiches.map((n) => {
            const active = n === niche;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setNiche(n)}
                className={`text-[12px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.97] ${
                  active
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </section>

      {/* CASES GRID */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-32 md:pb-48 border-t border-white/10 pt-16 md:pt-20">
        {filtered.length === 0 ? (
          <p className="text-white/50 text-[15px]">No cases in this niche yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 [grid-auto-flow:dense]">
            {filtered.map((c, i) => (
              <Link
                key={c.slug}
                to="/cases/$slug"
                params={{ slug: c.slug }}
                className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] reveal"
                data-delay={String((i % 4) + 1)}
              >
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 40%, ${c.accent}55, transparent 60%), radial-gradient(circle at 70% 70%, #ffffff10, transparent 60%)`,
                    }}
                  />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                    {c.client}
                  </span>
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/70">
                    {c.niche}
                  </span>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[64px] md:text-[96px] font-medium tracking-[-0.04em] leading-none text-white">
                      {c.primaryMetric.value}
                    </div>
                    <div className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/75">
                      {c.primaryMetric.label}
                    </div>
                  </div>
                </figure>
                <div className="p-6 md:p-8 flex flex-col gap-5">
                  <p className="text-[15px] text-white/75 leading-relaxed">
                    {c.preview}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[12px] text-white/55">
                      {c.format} · {c.duration}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white text-black font-medium group-hover:bg-[#e85d3a] group-hover:text-white transition-colors">
                      Read case →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
