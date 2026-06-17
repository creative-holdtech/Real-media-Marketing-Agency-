import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { SplitDisplayTitle } from "@/components/ds-templates";
import {
  BtnArrow,
  bodyCopy,
  FramerTag,
  interactiveSurfaceCard,
  pageHeroContainer,
  sectionContainer,
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

      <section className={cn(pageHeroContainer, "rm-services-hero pb-14 md:pb-20")}>
        <div aria-hidden className="rm-services-hero__ambient" />
        <div className="relative flex flex-col gap-6 md:gap-8">
          <p className="reveal">
            <FramerTag>{hero?.tag ?? `Services · ${servicesList.length} disciplines`}</FramerTag>
          </p>
          <div className="reveal max-w-[14ch] md:max-w-none">
            <SplitDisplayTitle lines={titleLines} className="text-white" />
          </div>
          {hero?.body ? (
            <p className={cn("reveal max-w-[42rem]", bodyCopy)} data-delay="2">
              {hero.body}
            </p>
          ) : null}
        </div>
      </section>

      <section className={cn(sectionShell, "border-t border-white/10")}>
        <div className={cn(sectionContainer, "pt-2 md:pt-4")}>
          <div className="reveal mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3">
              <p className={textMeta}>Choose your entry point</p>
              <p className={cn(bodyCopy, "max-w-[36ch]")}>
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
                  <div className="flex items-start justify-between gap-4">
                    <span className={cn(textMeta, "capitalize text-white/55")}>
                      Be {s.hero.word}
                    </span>
                    <span className={textMeta}>{s.shortName}</span>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 md:mt-6">
                    <h2 className={cn(subsectionTitle, "text-white")}>{s.name}</h2>
                    <p className={textMeta}>{s.tagline}</p>
                  </div>

                  <p className={cn(bodyCopy, "mt-5 flex-1 text-[var(--rm-text-body)]")}>
                    {serviceCardIntro(s)}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-5 md:mt-8">
                    <span className={cn(textMeta, "normal-case tracking-normal text-white/45")}>
                      {s.blocks.length} blocks · {s.hero.primaryCta.replace(/\s*→$/, "")}
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
