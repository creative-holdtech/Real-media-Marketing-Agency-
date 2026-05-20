import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { servicesList } from "@/lib/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Strategy, Brand, Growth | R-M" },
      {
        name: "description",
        content:
          "Six disciplines, one operating system. Brand strategy, SMM, PR, Performance, SEO and Design — engineered to compound.",
      },
      { property: "og:title", content: "Services — R-M Studio" },
      {
        property: "og:description",
        content: "Brand strategy, SMM, PR, Performance, SEO and Design — built to compound.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  useReveal();

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      {/* HERO */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-32 pb-16 md:pb-20 min-h-[55vh] flex flex-col justify-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 30%, rgba(232,93,58,0.18), transparent 70%), radial-gradient(45% 55% at 80% 70%, rgba(124,92,255,0.18), transparent 70%)",
          }}
        />
        <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
          Six disciplines.{" "}
          <span className="font-light text-white/70">One operating system.</span>
        </h1>
        <p
          className="reveal mt-8 max-w-[720px] text-[15px] md:text-[17px] leading-relaxed rm-body"
          data-delay="2"
        >
          We don't sell channel services. We install a marketing operating system — choose the entry
          point that matches what you need to ship this quarter.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-24 md:pb-32 border-t border-white/10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 [grid-auto-flow:dense]">
          {servicesList.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative flex flex-col rm-card overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] reveal"
              data-delay={String((i % 4) + 1)}
            >
              <figure className="relative aspect-video md:aspect-[16/10] overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 40%, ${s.accent}66, transparent 60%), radial-gradient(circle at 70% 70%, #ffffff10, transparent 60%)`,
                  }}
                />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-rm-surface/70 backdrop-blur-md border border-white/15 text-white/90">
                  {s.shortName}
                </span>
                <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
                  <div className="text-[28px] sm:text-[36px] md:text-[64px] font-medium tracking-[-0.04em] leading-[0.95] text-white max-w-[18ch]">
                    {s.name}
                  </div>
                  <div className="mt-2 md:mt-3 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/70">
                    {s.tagline}
                  </div>
                </div>
              </figure>
              <div className="p-4 md:p-8 flex flex-col gap-3 md:gap-5">
                <p className="text-[14px] md:text-[15px] rm-body leading-relaxed line-clamp-3 md:line-clamp-none">{s.heroIntro}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[12px] text-white/55">
                    {s.pillars.length} pillars · Retainer or sprint
                  </span>
                  <span className="inline-flex rm-touch items-center text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white text-black font-medium group-hover:bg-rm-accent group-hover:text-white transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <UnifiedCTA
        title="Not sure where to start?"
        titleAccent="Book a free audit — we'll tell you."
      />
      <SiteFooter />
    </div>
  );
}
