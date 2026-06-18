import insightsBg from "@/assets/insights-bg.png";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import {
  pageHeroContainer,
  sectionContainer,
  sectionGap,
  sectionHeaderGrid,
  sectionShell,
} from "@/components/framer-section";
import { SiteHeader } from "@/components/site-chrome";
import { cn } from "@/lib/utils";

export function CasesCarouselSkeleton() {
  return (
    <div className="rm-page" aria-busy="true" aria-label="Loading case studies">
      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere
        imageSrc={insightsBg}
        underHeader
        className="rm-hero-atmosphere--about-photo rm-hero-atmosphere--compact"
      >
        <section className="relative z-10 flex flex-1 items-center pb-12 pt-[var(--rm-header-offset)] md:pb-16">
          <div className={pageHeroContainer}>
            <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center gap-6">
              <div className="h-8 w-40 rounded-md bg-white/[0.06]" />
              <div className="flex w-full flex-col items-center space-y-3">
                <div className="h-10 w-full max-w-[14ch] rounded-md bg-white/[0.06] sm:h-12" />
                <div className="h-10 w-full max-w-[18ch] rounded-md bg-white/[0.05] sm:h-12" />
              </div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <section className={cn(sectionShell, "rm-cases-gallery")}>
        <div className={sectionContainer}>
          <div className={cn(sectionHeaderGrid, "items-end")}>
            <div className="hidden md:flex md:items-end" aria-hidden>
              <span className="h-16 w-12 rounded-sm bg-white/[0.03]" />
            </div>
            <div className={cn("flex flex-col gap-3 md:col-span-2")}>
              <div className="h-4 w-28 rounded-sm bg-white/[0.03]" />
              <div className="h-8 max-w-md rounded-sm bg-white/[0.05]" />
            </div>
          </div>
          <div className="border-t border-[var(--rm-border-soft)]">
            <div
              className={cn(
                "rm-cases-gallery__row border-b border-[var(--rm-border-soft)]",
                sectionGap,
                "grid grid-cols-1 md:grid-cols-3",
              )}
            >
              <div className="hidden md:block" />
              <div className={cn("grid grid-cols-1 md:col-span-2 md:grid-cols-2", sectionGap)}>
                <div className="aspect-[16/10] rounded-md border border-[var(--rm-border-soft)] bg-white/[0.03]" />
                <div className="space-y-3">
                  <div className="h-7 w-2/3 rounded-sm bg-white/[0.06]" />
                  <div className="h-4 max-w-[38ch] rounded-sm bg-white/[0.04]" />
                  <div className="h-5 w-28 rounded-sm bg-white/[0.04]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
