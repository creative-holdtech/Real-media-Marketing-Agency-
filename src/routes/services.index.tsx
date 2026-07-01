import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { sectionInner, siteGutter } from "@/components/framer-section";
import { ServicesCardDeckUnfold } from "@/components/services-card-deck-unfold";
import { ServicesHero } from "@/components/services-hero";
import { ServicesIntroHeader } from "@/components/services-intro-header";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
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

const SECTION_HANDOFF_EASE = [0.22, 1, 0.36, 1] as const;

function ServicesIndex() {
  useReveal();
  const reduce = useReducedMotion();
  const { page, servicesList } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const titleLines = hero?.titleLines ?? ["Six disciplines.", "One operating system."];

  return (
    <div className="rm-page min-h-screen bg-black selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" overlay />

      <ServicesHero
        tag={hero?.tag ?? "Services"}
        titleLines={titleLines}
        body={hero?.body}
        headingId="services-hero-title"
        sectionClassName="bg-black"
      />

      <section
        aria-labelledby="services-intro-heading"
        className={cn(siteGutter, "relative z-10 bg-black pb-16 md:pb-20")}
      >
        <div className={cn(sectionInner, "flex flex-col gap-8 md:gap-10")}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: SECTION_HANDOFF_EASE }}
          >
            <ServicesIntroHeader />
          </motion.div>

          <ServicesCardDeckUnfold services={servicesList} />
        </div>
      </section>

      <UnifiedCTA
        title={cta?.title}
        titleAccent={cta?.titleAccent}
        primaryLabel={cta?.primaryLabel}
        primaryTo={cta?.primaryUrl}
        secondaryLabel={cta?.secondaryLabel}
        secondaryTo={cta?.secondaryUrl}
        sectionClassName="border-0"
      />
      <SiteFooter />
    </div>
  );
}
