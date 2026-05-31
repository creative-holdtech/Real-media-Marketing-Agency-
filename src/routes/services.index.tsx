import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import {
  bodyCopy,
  pageHeroContainer,
  sectionContainer,
  textMeta,
} from "@/components/framer-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { serviceCardIntro } from "@/lib/services";
import { getServicesList } from "@/lib/payload/services-cms";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  loader: async () => ({
    page: await getPageContent("services"),
    servicesList: await getServicesList(),
  }),
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = page?.metaTitle ?? "Services — Strategy, Brand, Growth | R-M";
    const description =
      page?.metaDescription ??
      "Six disciplines, one operating system. Brand strategy, SMM, PR, Performance, SEO and Design — engineered to compound.";
    return buildPageHead({ title, description, pathname: "/services" });
  },
  component: ServicesIndex,
});

function ServicesIndex() {
  useReveal();
  const { page, servicesList } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const titleLines = hero?.titleLines ?? ["Six disciplines.", "One operating system."];

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      <section className={cn(pageHeroContainer, "rm-services-hero pb-14 md:pb-20")}>
        <div aria-hidden className="rm-services-hero__ambient" />
        <div className="relative flex flex-col gap-6 md:gap-8">
          <p className={cn("reveal", textMeta)}>{hero?.tag ?? `Services · ${servicesList.length} disciplines`}</p>
          <h1 className="reveal rm-services-hero__title max-w-[14ch] md:max-w-none">
            {titleLines[0]}{" "}
            <span className="font-light text-white/55">{titleLines[1] ?? ""}</span>
          </h1>
          {hero?.body ? (
            <p className={cn("reveal max-w-[42rem]", bodyCopy)} data-delay="2">
              {hero.body}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 pb-24 md:px-12 md:pb-32">
        <div className={cn(sectionContainer, "max-w-[1280px] pt-14 md:pt-20")}>
          <div className="reveal mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <p className={textMeta}>Choose your entry point</p>
              <p className="max-w-[36ch] text-sm leading-relaxed text-[var(--rm-text-body)] md:text-base">
                Be seen. Be trusted. Be profitable. Be found. Be chosen. Be expressive.
              </p>
            </div>
            <p className={cn(textMeta, "tabular-nums")}>01 — 06</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {servicesList.map((s, i) => (
              <Link
                key={s.slug}
                to={s.slug === "smm" ? "/services/smm" : "/services/$slug"}
                params={s.slug === "smm" ? undefined : { slug: s.slug }}
                className={cn(
                  "rm-services-card reveal group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                )}
                data-delay={String((i % 4) + 1)}
                style={{ "--service-accent": s.accent } as CSSProperties}
              >
                <div className="rm-services-card__accent" aria-hidden />

                <div className="flex items-start justify-between gap-4 px-6 pt-6 md:px-8 md:pt-8">
                  <span className="text-xs font-medium tabular-nums tracking-[0.14em] text-white/30 capitalize">
                    Be {s.hero.word}
                  </span>
                  <span className={textMeta}>{s.shortName}</span>
                </div>

                <div className="flex flex-col gap-2 px-6 pt-5 md:px-8 md:pt-6">
                  <h2 className="text-[1.625rem] font-medium leading-[1.08] tracking-[-0.035em] text-white md:text-[2rem]">
                    {s.name}
                  </h2>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
                    {s.tagline}
                  </p>
                </div>

                <p className="mt-5 px-6 text-sm leading-[1.65] text-[var(--rm-text-body)] md:px-8 md:text-[15px]">
                  {serviceCardIntro(s)}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 px-6 py-4 md:mt-8 md:px-8 md:py-5">
                  <span className="text-xs text-white/45">
                    {s.blocks.length} blocks · {s.hero.primaryCta}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-200 group-hover:text-white">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UnifiedCTA
        title={cta?.title ?? "Not sure where to start?"}
        titleAccent={cta?.titleAccent ?? "Book a free audit — we will tell you."}
        primaryLabel={cta?.primaryLabel}
        primaryTo={cta?.primaryUrl}
        secondaryLabel={cta?.secondaryLabel}
        secondaryTo={cta?.secondaryUrl}
      />
      <SiteFooter />
    </div>
  );
}
