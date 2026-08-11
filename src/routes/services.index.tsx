import { createFileRoute } from "@tanstack/react-router";
import { ServicesHero } from "@/components/services-hero";
import { ServicesSecondScreen } from "@/components/services-second-screen";
import { ScrollChapter } from "@/components/home-scroll-cinema";
import { PagePreloader } from "@/components/page-preloader";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { getServicesList } from "@/lib/payload/services-cms";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";

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

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

function ServicesIndex() {
  useReveal();
  const { page, servicesList } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const titleLines = hero?.titleLines ?? ["Six disciplines.", "One operating system."];

  return (
    <div className="rm-page min-h-screen bg-black selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />
      <SiteHeader variant="dark" overlay />

      <ServicesHero
        tag={hero?.tag ?? "Services"}
        titleLines={titleLines}
        body={hero?.body}
        headingId="services-hero-title"
        sectionClassName="bg-black"
      />

      <main id="main">
        <ServicesSecondScreen services={servicesList} />

        <ScrollChapter variant="reveal">
          <UnifiedCTA
            title={cta?.title}
            titleAccent={cta?.titleAccent}
            primaryLabel={cta?.primaryLabel}
            primaryTo={cta?.primaryUrl}
            secondaryLabel={cta?.secondaryLabel}
            secondaryTo={cta?.secondaryUrl}
          />
        </ScrollChapter>
      </main>

      <SiteFooter />
    </div>
  );
}
