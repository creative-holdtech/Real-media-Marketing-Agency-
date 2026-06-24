import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import {
  BtnArrow,
  bodyCopy,
  FramerTag,
  interactiveSurfaceCard,
  pageBand,
  pageHeroContainer,
  sectionInner,
  siteChromeBand,
  sectionPill,
  sectionShell,
  surfaceCardPadding,
  surfaceCardShell,
  textMeta,
  subsectionTitle,
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

      <section className={cn(siteChromeBand, "rm-services-hero relative pb-14 md:pb-20")}>
        <div aria-hidden className="rm-services-hero__ambient" />
        <div className={cn(pageHeroContainer, "relative")}>
        <div className="relative flex flex-col gap-6 md:gap-8">
          <p className="reveal">
            <FramerTag>{hero?.tag ?? `Services · ${servicesList.length} disciplines`}</FramerTag>
          </p>
          <h1 className="reveal rm-type-display ml-[-0.04em] max-w-[14ch] text-white md:max-w-none">
            <span className="block">{titleLines[0]}</span>
            <span className="block font-light text-[var(--rm-text-subtle)]">{titleLines[1] ?? ""}</span>
          </h1>
          {hero?.body ? (
            <p className={cn("reveal max-w-[42rem]", bodyCopy)} data-delay="2">
              {hero.body}
            </p>
          ) : null}
        </div>
        </div>
      </section>

      <section className={cn(sectionShell, "border-t border-[var(--rm-border-soft)]")}>
        <div className={cn(sectionInner, "flex flex-col gap-8 pt-2 md:gap-12 md:pt-4")}>
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="flex flex-col gap-3">
              <p className={textMeta}>Choose your entry point</p>
              <p className={cn(bodyCopy, "max-w-[36ch]")}>
                Be seen. Be trusted. Be profitable. Be found. Be chosen. Be expressive.
              </p>
            </div>
            <p className={cn(textMeta, "tabular-nums shrink-0")}>01 — 06</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {servicesList.map((s, i) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className={cn(
                  surfaceCardShell,
                  interactiveSurfaceCard,
                  "reveal group flex min-h-[18rem] flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                )}
                data-delay={String((i % 4) + 1)}
                style={{ "--service-accent": s.accent } as CSSProperties}
              >
                <div
                  className="absolute inset-y-0 left-0 w-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ background: s.accent }}
                  aria-hidden
                />

                <div className={cn(surfaceCardPadding, "flex h-full flex-col pb-5 md:pb-6")}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={cn(textMeta, "capitalize text-[var(--rm-text-muted)]")}>
                      Be {s.hero.word}
                    </span>
                    <span className={cn(sectionPill, "uppercase")}>{s.shortName}</span>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 border-t border-[var(--rm-border-soft)] pt-5 md:mt-6 md:pt-6">
                    <p className={textMeta}>{s.tagline}</p>
                    <h2 className={cn(subsectionTitle, "text-white md:text-[1.75rem]")}>
                      {s.name}
                    </h2>
                  </div>

                  <p className={cn(bodyCopy, "mt-5 flex-1 text-[var(--rm-text-body)]")}>
                    {serviceCardIntro(s)}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-5 md:mt-8">
                    <span className={cn(textMeta, "normal-case tracking-normal text-[var(--rm-text-subtle)]")}>
                      {s.blocks.length} blocks
                    </span>
                    <span className="inline-flex items-center gap-2 rm-type-body font-medium text-white/70 transition-colors duration-200 group-hover:text-white">
                      View
                      <BtnArrow />
                    </span>
                  </div>
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
