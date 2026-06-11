import { bodyCopy, sectionContainer, sectionShell } from "@/components/framer-section";
import {
  ChapterSpacer,
  MarketingContentGrid,
  MarketingSectionIntro,
} from "@/components/marketing-section";
import { MetricCard } from "@/components/meta-card";
import { BigStatValue, useSectionInView } from "@/components/studio-trust-band";
import { aboutMetrics } from "@/content/about";
import { cn } from "@/lib/utils";

const cardLayout: Record<(typeof aboutMetrics.items)[number]["id"], string> = {
  capital: "md:col-start-2 md:row-start-1",
  projects: "md:col-start-3 md:row-start-1",
  retention: "md:col-start-2 md:row-start-2",
  operating: "md:col-start-3 md:row-start-2",
};

export function AboutStatsSection() {
  const { ref, inView } = useSectionInView<HTMLElement>();

  return (
    <section id="numbers" ref={ref} aria-labelledby="numbers-heading" className={sectionShell}>
      <div className={sectionContainer}>
        <MarketingSectionIntro
          tag={aboutMetrics.tag}
          titleId="numbers-heading"
          title={aboutMetrics.title}
          lead={
            <p className={cn(bodyCopy, "reveal")} data-delay="1">
              {aboutMetrics.subtitle}
            </p>
          }
        />

        <MarketingContentGrid>
          <ChapterSpacer chapter="03" />
          {aboutMetrics.items.map((item) => (
            <MetricCard
              key={item.id}
              tag={item.tag}
              headline={
                item.animate && item.numericTarget != null ? (
                  <BigStatValue to={item.numericTarget} suffix={item.suffix ?? ""} start={inView} />
                ) : (
                  item.value
                )
              }
              description={item.label}
              className={cardLayout[item.id]}
            />
          ))}
        </MarketingContentGrid>
      </div>
    </section>
  );
}
