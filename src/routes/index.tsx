import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { AboutSection } from "@/components/about-section";
import { CasesSection } from "@/components/cases-section";
import { ServicesSection } from "@/components/services-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { InsightsHeroSection } from "@/components/insights-hero-section";
import { PagePreloader } from "@/components/page-preloader";
import { UnifiedCTA } from "@/components/unified-cta";
import TestimonialSection from "@/components/ui/testimonials";
import { useReveal } from "@/hooks/use-reveal";
import { posts } from "@/lib/posts";
import heroBg from "@/assets/hero-bg.png";

export const Route = createFileRoute("/")({
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
      <a href="#main" className="skip-link">Skip to content</a>
      <AmbientBlobs />
      <PagePreloader />

      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere imageSrc={heroBg} underHeader>
      {/* HERO */}
      <section className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-10 pt-2 md:px-12 md:pb-20 md:pt-8">
          <div className="rm-hero-copy mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
            <p className="reveal mb-8 w-fit rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/65">
              R-M marketing agency
            </p>
            <h1 className="reveal w-full text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:text-[58px] lg:text-[64px]">
              <span className="block text-balance">Strategy and</span>
              <span className="block text-balance">execution for</span>
              <span className="block text-balance">founders raising</span>
              <span className="block text-balance font-light text-white/48">in EU and MENA.</span>
            </h1>
            <p
              className="reveal mt-7 max-w-[34ch] text-balance text-[16px] font-medium leading-[1.45] tracking-[-0.025em] text-white/92 md:text-[18px]"
              data-delay="2"
            >
              We create market environment where your product becomes the obvious choice.
            </p>
            <p
              className="reveal mt-4 max-w-[34ch] text-balance text-[16px] font-medium leading-[1.45] tracking-[-0.025em] text-white/92 md:text-[18px]"
              data-delay="2"
            >
              In the last twelve months our clients raised $10M+, shipped 50 launches, and received
              industry awards.
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center justify-center gap-3"
              data-delay="3"
            >
              <Link
                to="/contact"
                className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-[#efeeea] hover:-translate-y-0.5 transition-[background-color,transform] duration-150 ease-out"
              >
                Start a project →
              </Link>
              <Link
                to="/cases"
                className="inline-flex rm-touch items-center text-[13px] px-6 py-3.5 rounded-full border border-white/20 text-white hover:border-white hover:-translate-y-0.5 transition-all duration-300"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>
      </HeroAtmosphere>

      <main id="main">

      <AboutSection />

      <TestimonialSection />

      <ServicesSection />

      <CasesSection />

      <InsightsHeroSection posts={insightPosts} />

      <UnifiedCTA />
      </main>

      <SiteFooter />
    </div>
  );
}
