import { lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import {
  btnOutline,
  btnPrimary,
  bodyCopy,
  heroSubcopyStrong,
  FramerTag,
  pageHeroContainer,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";
import { AboutSection } from "@/components/about-section";
import { CasesSection } from "@/components/cases-section";
import { ServicesSection } from "@/components/services-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { PagePreloader } from "@/components/page-preloader";
import { SectionShellSkeleton } from "@/components/section-shell-skeleton";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import TestimonialSection from "@/components/ui/testimonials";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { posts } from "@/lib/posts";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";
import heroBg from "@/assets/hero-bg.png";

const InsightsHeroSection = lazy(() =>
  import("@/components/insights-hero-section").then((m) => ({ default: m.InsightsHeroSection })),
);

export const Route = createFileRoute("/")({
  loader: async () => ({
    page: await getPageContent("home"),
  }),
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = page?.metaTitle ?? "R-M — Marketing Agency";
    const description =
      page?.metaDescription ?? "R-M is a marketing agency for founders building in EU and MENA.";
    const seo = buildPageHead({ title, description, pathname: "/" });
    return {
      meta: seo.meta,
      links: [...seo.links, { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" }],
    };
  },
  component: Index,
});

const insightPosts = posts;

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

function Index() {
  useReveal();
  const { page } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const titleLines = hero?.titleLines ?? [];

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />

      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere imageSrc={hero?.image || heroBg} underHeader>
        {/* HERO */}
        <section className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]">
          <div className={pageHeroContainer}>
            <div className="rm-hero-copy mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
              {hero?.tag ? (
                <p className="reveal mb-8 w-fit">
                  <FramerTag>{hero.tag}</FramerTag>
                </p>
              ) : null}
              <h1 className="reveal w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:text-[58px] lg:text-[64px]">
                {titleLines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className={cn(
                      "block text-balance",
                      index === titleLines.length - 1 && titleLines.length > 1
                        ? "font-light text-white/48"
                        : undefined,
                    )}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              {hero?.subheading ? (
                <p className={cn("reveal mt-7 max-w-[34ch] text-balance text-center", heroSubcopyStrong)} data-delay="2">
                  {hero.subheading}
                </p>
              ) : null}
              {hero?.body ? (
                <p className={cn("reveal mt-4 max-w-[34ch] text-balance text-center", bodyCopy)} data-delay="2">
                  {hero.body}
                </p>
              ) : null}

              <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4" data-delay="3">
                {hero?.ctaPrimaryLabel ? (
                  <Link to={hero.ctaPrimaryUrl ?? "/contact"} className={btnPrimary}>
                    {hero.ctaPrimaryLabel}
                  </Link>
                ) : null}
                {hero?.ctaSecondaryLabel ? (
                  <Link to={hero.ctaSecondaryUrl ?? "/cases"} className={btnOutline}>
                    {hero.ctaSecondaryLabel}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        <AboutSection page={page} />

        <div className="rm-defer-paint">
          <TestimonialSection />
        </div>

        <div className="rm-defer-paint">
          <ServicesSection />
        </div>

        <div className="rm-defer-paint">
          <CasesSection />
        </div>

        <Suspense
          fallback={
            <div className="rm-defer-paint">
              <SectionShellSkeleton blocks={2} minBlockHeight="320px" />
            </div>
          }
        >
          <div className="rm-defer-paint">
            <InsightsHeroSection posts={insightPosts} />
          </div>
        </Suspense>

        <UnifiedCTA
          title={cta?.title}
          titleAccent={cta?.titleAccent}
          primaryLabel={cta?.primaryLabel}
          primaryTo={cta?.primaryUrl}
          secondaryLabel={cta?.secondaryLabel}
          secondaryTo={cta?.secondaryUrl}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
