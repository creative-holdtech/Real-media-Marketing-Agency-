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
        content: "Selected work for AI SaaS, Fintech, Cybersecurity and iGaming teams.",
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
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      {/* HERO ~50vh */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-32 pb-20 md:pb-24 min-h-[56vh] flex flex-col justify-center border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 30%, rgba(232,93,58,0.18), transparent 70%), radial-gradient(45% 55% at 80% 70%, rgba(124,92,255,0.18), transparent 70%)",
          }}
        />
        <p className="reveal rm-eyebrow mb-8">Case studies</p>
        <h1 className="reveal rm-title-hero max-w-[14ch]">
          Results our <span className="font-light text-white/70">clients ship.</span>
        </h1>
        <p className="reveal mt-8 max-w-[640px] rm-copy-lead" data-delay="2">
          Engagements with founders and growth teams across AI SaaS, Fintech, Cybersecurity and
          iGaming. Each case is a system we built — and the numbers it produced.
        </p>

        {/* Niche filter pills */}
        <div className="reveal mt-12 flex flex-wrap items-center gap-2" data-delay="3">
          {caseNiches.map((n) => {
            const active = n === niche;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setNiche(n)}
                className={`rm-btn px-4 ${
                  active
                    ? "rm-btn-primary border border-white"
                    : "rm-btn-secondary text-white/70 hover:text-white"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </section>

      {/* CASES GRID */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-32 md:pb-48 pt-16 md:pt-20">
        {filtered.length === 0 ? (
          <div className="rm-card p-10">
            <p className="rm-copy-lead max-w-[44ch]">No cases in this niche yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 [grid-auto-flow:dense]">
            {filtered.map((c, i) => (
              <Link
                key={c.slug}
                to="/cases/$slug"
                params={{ slug: c.slug }}
                className={`group relative flex flex-col rm-card overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] reveal ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
                data-delay={String((i % 4) + 1)}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 scale-[1.02] group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/case-${c.slug}/1600/1000)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "grayscale(24%) contrast(108%) brightness(0.78)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-80"
                    style={{
                      background: `radial-gradient(circle at 30% 40%, ${c.accent}55, transparent 60%), radial-gradient(circle at 70% 70%, #ffffff10, transparent 60%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-rm-surface/70 backdrop-blur-md border border-white/15 text-white/90">
                    {c.client}
                  </span>
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-rm-surface/70 backdrop-blur-md border border-white/15 text-white/75">
                    {c.niche}
                  </span>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div
                      className={`${i === 0 ? "text-[76px] md:text-[128px]" : "text-[64px] md:text-[96px]"} font-medium tracking-[-0.04em] leading-none text-white`}
                    >
                      {c.primaryMetric.value}
                    </div>
                    <div className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/75">
                      {c.primaryMetric.label}
                    </div>
                  </div>
                </figure>
                <div className="p-6 md:p-8 flex flex-col gap-5">
                  <p className="rm-copy-lead text-[15px]">{c.preview}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-[12px] text-white/55">
                      {c.format} · {c.duration}
                    </span>
                    <span className="inline-flex rm-touch items-center text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white text-black font-medium group-hover:bg-rm-accent group-hover:text-white transition-colors">
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
