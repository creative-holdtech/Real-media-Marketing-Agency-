import { useRef } from "react";

import {
  bodyCopy,
  bodyCopyStrong,
  sectionContainer,
  sectionInnerStack,
  sectionShell,
} from "@/components/framer-section";
import {
  ChapterSpacer,
  MarketingContentGrid,
  MarketingSectionIntro,
} from "@/components/marketing-section";
import { MetaCard } from "@/components/meta-card";
import { StudioTrustBand, useSectionInView } from "@/components/studio-trust-band";
import type { PageContent } from "@/lib/page-content/types";
import { getPageDefaults } from "@/lib/page-content/defaults";

const defaultPage = getPageDefaults("home");

export function AboutSection({ page }: { page?: PageContent }) {
  const chapterRef = useRef<HTMLElement>(null);
  const { ref, inView } = useSectionInView<HTMLElement>();
  const studio = page?.sections.studio ?? defaultPage.sections.studio;
  const stats = page?.stats ?? defaultPage.stats ?? [];
  const metaCards = page?.metaCards ?? defaultPage.metaCards ?? [];

  return (
    <section ref={chapterRef} id="studio" className="rm-studio-chapter" aria-label="Studio overview">
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
        <div className={sectionShell}>
        <div className={sectionContainer}>
          <MarketingSectionIntro
            tag={studio?.tag ?? "Marketing agency"}
            title={studio?.heading ?? ""}
            srTitle={studio?.heading ?? ""}
            lead={
              <div className={sectionInnerStack}>
                {studio?.body ? <p className={bodyCopyStrong}>{studio.body}</p> : null}
                {studio?.bullets?.length ? (
                  <ul className="flex flex-col gap-3 pt-1">
                    {studio.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[0.3em] shrink-0 text-sm text-white/30">—</span>
                        <span className={bodyCopy}>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            }
          />

          <MarketingContentGrid>
            <ChapterSpacer chapter="02" />
            {metaCards.map((card, index) => (
              <MetaCard
                key={card.label}
                label={card.label}
                value={card.value}
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
          </MarketingContentGrid>
        </div>
      </div>
      </div>
    </section>
  );
}
