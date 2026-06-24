import insightsBg from "@/assets/insights-bg.png";
import { editorialHeroCopyLayout } from "@/components/editorial-hero-copy";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import {
  pageHeroContainer,
  sectionContainer,
  sectionGap,
  sectionHeaderGrid,
  sectionShell,
} from "@/components/framer-section";
import { SiteHeader } from "@/components/site-chrome";
import { CASES_SUBPAGE_HERO_ATMOSPHERE } from "@/lib/cases-gallery-config";
import { cn } from "@/lib/utils";

export function CasesCarouselSkeleton() {
  return (
    <div className="rm-page" aria-busy="true" aria-label="Loading case studies">
      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere imageSrc={insightsBg} underHeader className={CASES_SUBPAGE_HERO_ATMOSPHERE}>
        <section className="relative z-10 flex flex-1 items-center pb-12 pt-[var(--rm-header-offset)] md:pb-16">
          <div className={pageHeroContainer}>
            <div className={cn(editorialHeroCopyLayout, "gap-6")}>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 shrink-0 bg-white/[0.06]" aria-hidden />
                <div className="h-4 w-36 rounded-sm bg-white/[0.06]" />
              </div>
              <div className="flex w-full flex-col gap-3">
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
              <div
                className={cn(
                  "grid grid-cols-1 items-start md:col-span-2",
                  sectionGap,
                  "md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_auto]",
                )}
              >
                <div className="aspect-[16/10] rounded-md border border-[var(--rm-border-soft)] bg-white/[0.03]" />
                <div className="space-y-3">
                  <div className="h-7 w-2/3 rounded-sm bg-white/[0.06]" />
                  <div className="h-4 max-w-[38ch] rounded-sm bg-white/[0.04]" />
                  <div className="h-5 w-28 rounded-sm bg-white/[0.04]" />
                </div>
                <div className="space-y-2 md:text-right">
                  <div className="h-5 w-14 rounded-sm bg-white/[0.05] md:ml-auto" />
                  <div className="h-3 w-20 rounded-sm bg-white/[0.03] md:ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
