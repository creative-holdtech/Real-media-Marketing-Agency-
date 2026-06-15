import { createFileRoute, Link } from "@tanstack/react-router";

import insightsBg from "@/assets/insights-bg.png";
import { CasesCarouselSkeleton } from "@/components/cases-carousel-skeleton";
import { CasesGallerySection } from "@/components/cases-gallery-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { PagePreloader } from "@/components/page-preloader";
import {
  bodyCopy,
  btnOutline,
  btnPrimary,
  FramerTag,
  heroSubcopyStrong,
  pageHeroContainer,
} from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { getPageDefaults } from "@/lib/page-content/defaults";
import { getCasesWithMeta } from "@/lib/payload/cases-cms";
import { casesGalleryHeaderProps } from "@/lib/cases-gallery-config";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cases/")({
  loader: async () => {
    const [page, casesResult] = await Promise.all([
      getPageContent("cases"),
      getCasesWithMeta(),
    ]);
    return { page, cases: casesResult.cases, cmsFailed: casesResult.cmsFailed };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const defaults = getPageDefaults("cases");
    const title = page?.metaTitle ?? defaults.metaTitle ?? "Case Studies — Work That Ships | R-M";
    const description =
      page?.metaDescription ??
      defaults.metaDescription ??
      "Selected brand, product, and growth work for AI SaaS, Fintech, Cybersecurity, and iGaming teams.";
    const seo = buildPageHead({ title, description, pathname: "/cases" });
    return {
      meta: seo.meta,
      links: [...seo.links, { rel: "preload", as: "image", href: insightsBg, fetchPriority: "high" }],
    };
  },
  pendingComponent: CasesCarouselSkeleton,
  component: CasesPage,
});

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

function CasesPage() {
  useReveal();
  const { page, cases: caseList } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const casesDefaults = getPageDefaults("cases");

  const titleLines =
    casesDefaults.hero?.titleLines ?? ["Work that ships", "for founders who build to scale"];
  const heroSubheading = casesDefaults.hero?.subheading ?? casesDefaults.hero?.body;
  const heroTag = hero?.tag ?? casesDefaults.hero?.tag ?? "Case studies · R—M";
  const workSection = casesDefaults.sections?.work;
  const heroDefaults = casesDefaults.hero;
  const ctaPrimaryLabel = hero?.ctaPrimaryLabel ?? heroDefaults?.ctaPrimaryLabel;
  const ctaPrimaryUrl = hero?.ctaPrimaryUrl ?? heroDefaults?.ctaPrimaryUrl ?? "/audit";
  const ctaSecondaryLabel = hero?.ctaSecondaryLabel ?? heroDefaults?.ctaSecondaryLabel;
  const ctaSecondaryUrl = hero?.ctaSecondaryUrl ?? heroDefaults?.ctaSecondaryUrl ?? "#work";

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />
      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere
        imageSrc={hero?.image || insightsBg}
        underHeader
        className="rm-hero-atmosphere--about-photo rm-hero-atmosphere--compact"
      >
        <section
          aria-labelledby="page-title"
          className="relative z-10 flex flex-1 items-center pb-12 pt-[var(--rm-header-offset)] md:pb-16"
        >
          <div className={pageHeroContainer}>
            <div className="rm-hero-copy mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
              <p className="reveal mb-8 w-fit">
                <FramerTag>{heroTag}</FramerTag>
              </p>
              <h1
                id="page-title"
                className="reveal w-full max-w-[16ch] text-balance text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:max-w-[18ch] md:text-[58px] lg:text-[64px]"
              >
                {titleLines.map((line) => (
                  <span key={line} className="block text-pretty">
                    {line}
                  </span>
                ))}
              </h1>
              {heroSubheading ? (
                <p
                  className={cn(
                    "reveal mt-7 max-w-[34ch] text-balance text-center",
                    heroSubcopyStrong,
                  )}
                  data-delay="2"
                >
                  {heroSubheading}
                </p>
              ) : null}
              <div
                className="reveal mt-10 flex flex-wrap items-center justify-center gap-4"
                data-delay="3"
              >
                {ctaPrimaryLabel ? (
                  <Link to={ctaPrimaryUrl} className={btnPrimary}>
                    {ctaPrimaryLabel}
                  </Link>
                ) : null}
                {ctaSecondaryLabel ? (
                  ctaSecondaryUrl?.startsWith("#") ? (
                    <a href={ctaSecondaryUrl} className={btnOutline}>
                      {ctaSecondaryLabel}
                    </a>
                  ) : (
                    <Link to={ctaSecondaryUrl} className={btnOutline}>
                      {ctaSecondaryLabel}
                    </Link>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        {caseList.length === 0 ? (
          <MarketingSection ariaLabelledBy="cases-empty-heading">
            <h2 id="cases-empty-heading" className="sr-only">
              No cases found
            </h2>
            <p className={bodyCopy}>No case studies available yet.</p>
          </MarketingSection>
        ) : (
          <div className="rm-defer-paint">
            <CasesGallerySection
              {...casesGalleryHeaderProps(workSection)}
              cases={caseList}
            />
          </div>
        )}

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
