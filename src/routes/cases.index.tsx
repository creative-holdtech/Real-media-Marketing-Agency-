import { createFileRoute } from "@tanstack/react-router";

import insightsBg from "@/assets/insights-bg.png";
import { CasesCarouselSkeleton } from "@/components/cases-carousel-skeleton";
import { CasesGallerySection } from "@/components/cases-gallery-section";
import { CmsFallbackBanner } from "@/components/cms-fallback-banner";
import { EditorialHeroCopy } from "@/components/editorial-hero-copy";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { PagePreloader } from "@/components/page-preloader";
import { bodyCopy, pageHeroContainer } from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { getPageDefaults } from "@/lib/page-content/defaults";
import { getCasesWithMeta } from "@/lib/payload/cases-cms";
import { casesGalleryHeaderProps, CASES_SUBPAGE_HERO_ATMOSPHERE } from "@/lib/cases-gallery-config";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/cases/")({
  loader: async () => {
    const [page, casesResult] = await Promise.all([getPageContent("cases"), getCasesWithMeta()]);
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
      links: [
        ...seo.links,
        { rel: "preload", as: "image", href: insightsBg, fetchPriority: "high" },
      ],
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
  const { page, cases: caseList, cmsFailed } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const casesDefaults = getPageDefaults("cases");

  const titleLines = hero?.titleLines ??
    casesDefaults.hero?.titleLines ?? ["Selected work", "proven to ship"];
  const heroSubheading =
    hero?.subheading ?? hero?.body ?? casesDefaults.hero?.subheading ?? casesDefaults.hero?.body;
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
        className={CASES_SUBPAGE_HERO_ATMOSPHERE}
      >
        <section
          aria-labelledby="page-title"
          className="relative z-10 flex flex-1 items-center pb-12 pt-[var(--rm-header-offset)] md:pb-16"
        >
          <div className={pageHeroContainer}>
            <EditorialHeroCopy
              id="page-title"
              reveal
              tag={heroTag}
              titleLines={titleLines}
              subheading={heroSubheading}
              primaryCta={
                ctaPrimaryLabel ? { label: ctaPrimaryLabel, to: ctaPrimaryUrl } : undefined
              }
              secondaryCta={
                ctaSecondaryLabel
                  ? ctaSecondaryUrl?.startsWith("#")
                    ? { label: ctaSecondaryLabel, href: ctaSecondaryUrl }
                    : { label: ctaSecondaryLabel, to: ctaSecondaryUrl }
                  : undefined
              }
            />
          </div>
        </section>
      </HeroAtmosphere>

      {cmsFailed ? <CmsFallbackBanner /> : null}

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
            <CasesGallerySection {...casesGalleryHeaderProps(workSection)} cases={caseList} />
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
