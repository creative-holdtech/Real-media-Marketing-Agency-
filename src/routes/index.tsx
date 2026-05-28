import { lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import {
  btnOutline,
  btnPrimary,
  bodyCopy,
  bodyCopyStrong,
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
import heroBg from "@/assets/hero-bg.png";

const InsightsHeroSection = lazy(() =>
  import("@/components/insights-hero-section").then((m) => ({ default: m.InsightsHeroSection })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: heroBg, fetchPriority: "high" }],
  }),
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
  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />

      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere imageSrc={heroBg} underHeader>
        {/* HERO */}
        <section className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]">
          <div className={pageHeroContainer}>
            <div className="rm-hero-copy mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
              <p className="reveal mb-8 w-fit">
                <FramerTag>R-M marketing agency</FramerTag>
              </p>
              <h1 className="reveal w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:text-[58px] lg:text-[64px]">
                <span className="block text-balance">Strategy and</span>
                <span className="block text-balance">execution for</span>
                <span className="block text-balance">founders raising</span>
                <span className="block text-balance font-light text-white/48">in EU and MENA.</span>
              </h1>
              <p className={cn("reveal mt-7 max-w-[34ch] text-balance text-center", bodyCopyStrong)} data-delay="2">
                We create market environment where your product becomes the obvious choice.
              </p>
              <p className={cn("reveal mt-4 max-w-[34ch] text-balance text-center", bodyCopy)} data-delay="2">
                In the last twelve months our clients raised $10M+, shipped 50 launches, and
                received industry awards.
              </p>

              <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4" data-delay="3">
                <Link to="/contact" className={btnPrimary}>
                  Start a project →
                </Link>
                <Link to="/cases" className={btnOutline}>
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        <AboutSection />

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

        <UnifiedCTA />
      </main>

      <SiteFooter />
    </div>
  );
}
