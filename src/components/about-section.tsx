import { useRef } from "react";

import {
  borderSoft,
  sectionCardGrid,
  sectionStack,
  sectionSubheading,
  siteGutter,
  textGhost,
  textSubtle,
} from "@/components/framer-section";
import { ChapterSpacer, MarketingSectionIntro } from "@/components/marketing-section";
import { MetaCard, type PlanCardMotion } from "@/components/meta-card";
import { cn } from "@/lib/utils";
import { StudioTrustBand, useSectionInView } from "@/components/studio-trust-band";
import type { PageContent } from "@/lib/page-content/types";
import { getPageDefaults } from "@/lib/page-content/defaults";

const defaultPage = getPageDefaults("home");

/** Operating-brief card motions — one identity per meta card slot. */
const PLAN_CARD_MOTIONS: PlanCardMotion[] = ["timeline", "globe", "spectrum", "signal"];

export function AboutSection({ page }: { page?: PageContent }) {
  const chapterRef = useRef<HTMLElement>(null);
  const { ref, inView } = useSectionInView<HTMLElement>();
  const studio = page?.sections.studio ?? defaultPage.sections.studio;
  const stats = page?.stats ?? defaultPage.stats ?? [];
  const metaCards = page?.metaCards ?? defaultPage.metaCards ?? [];

  return (
    <section
      ref={chapterRef}
      id="studio"
      className="rm-studio-chapter"
      aria-label="Studio overview"
    >
      <StudioTrustBand
        chapterRef={chapterRef}
        inView={inView}
        stats={stats.map((stat) => ({
          copy: stat.label,
          ...(stat.animateTo != null
            ? {
                countUp: {
                  to: stat.animateTo,
                  prefix: stat.prefix,
                  suffix: stat.suffix,
                },
              }
            : {
                value: `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`,
              }),
        }))}
      />

      <div className="rm-studio-chapter__body">
        <div className={cn("border-b bg-black pb-16 md:pb-20", borderSoft, siteGutter)}>
          <div className={cn(sectionStack, "rm-plan-scene")}>
            <div className="rm-plan-scene__ambient" aria-hidden="true">
              <div className="rm-plan-scene__grid" />
              <div className="rm-plan-scene__glow" />
              <div className="rm-plan-scene__axis" />
            </div>

            <MarketingSectionIntro
              tag={studio?.tag ?? "Marketing agency"}
              title={studio?.heading ?? ""}
              titleLines={studio?.headingLines}
              srTitle={studio?.heading ?? ""}
              contentClassName="md:!w-[72ch] md:!max-w-[72ch]"
              lead={
                <>
                  {studio?.body ? (
                    <p className={cn(sectionSubheading, "rm-copy-standfirst--band reveal-fade m-0")} data-delay="1">
                      {studio.body}
                    </p>
                  ) : null}
                  {studio?.bullets?.length ? (
                    <ul className="rm-plan-bullets reveal flex w-full flex-col gap-2" data-delay="2">
                      {studio.bullets.map((item) => (
                        <li key={item} className="rm-plan-bullets__item flex items-start gap-3">
                          <span
                            className={cn(
                              "rm-plan-bullets__tick mt-[0.3em] shrink-0 text-sm",
                              textGhost,
                            )}
                          >
                            —
                          </span>
                          <span className={cn("rm-type-body w-full", textSubtle)}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              }
            />

            <div
              className={cn("reveal-fade rm-plan-scene__cards", sectionCardGrid)}
              data-delay="3"
            >
              <ChapterSpacer className="rm-plan-chapter" />
              {metaCards.map((card, index) => (
                <MetaCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  motionId={PLAN_CARD_MOTIONS[index] ?? "timeline"}
                  className={
                    index === 0
                      ? "md:col-start-2 md:row-start-1"
                      : index === 1
                        ? "md:col-start-3 md:row-start-1"
                        : index === 2
                          ? "md:col-start-2 md:row-start-2"
                          : "md:col-start-3 md:row-start-2"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
