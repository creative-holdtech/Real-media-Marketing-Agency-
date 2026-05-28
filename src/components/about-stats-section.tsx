import { bodyCopy, sectionContainer, sectionShell } from "@/components/framer-section";
import { cn } from "@/lib/utils";
import {
  ChapterSpacer,
  MarketingContentGrid,
  MarketingSectionIntro,
} from "@/components/marketing-section";
import { MetaCard } from "@/components/meta-card";
import {
  BigStatValue,
  StudioTrustBand,
  useSectionInView,
} from "@/components/studio-trust-band";

const bigStats = [
  { to: 50, suffix: "", label: "End-to-end identity + GTM, since 2025." },
  { prefix: "€", to: 10, suffix: "M+", label: "Raised by founder teams we positioned and packaged." },
] as const;

const metricCards = [
  {
    label: "Capital raised 2025—2026",
    value: "€10M+\nRaised by founder teams we positioned and packaged.",
    className: "md:col-start-2 md:row-start-1",
  },
  {
    label: "Projects shipped",
    value: "50+\nEnd-to-end identity + GTM, since 2025.",
    className: "md:col-start-3 md:row-start-1",
  },
  {
    label: "Retention",
    value: "92%\nOn year and beyond.",
    className: "md:col-start-2 md:row-start-2",
  },
  {
    label: "Operating",
    value: "2y\nIndependent.",
    className: "md:col-start-3 md:row-start-2",
  },
] as const;

export function AboutStatsSection() {
  const { ref, inView } = useSectionInView<HTMLElement>();

  return (
    <section ref={ref} id="numbers" aria-labelledby="numbers-heading">
      <StudioTrustBand
        inView={inView}
        stats={[
          {
            value: <BigStatValue to={bigStats[0].to} suffix="+" start={inView} />,
            copy: bigStats[0].label,
          },
          {
            value: (
              <BigStatValue
                prefix={bigStats[1].prefix}
                to={bigStats[1].to}
                suffix={bigStats[1].suffix}
                start={inView}
              />
            ),
            copy: bigStats[1].label,
          },
        ]}
      />

      <div className={sectionShell}>
        <div className={sectionContainer}>
          <MarketingSectionIntro
            tag="By the numbers"
            title="Ten years. Compounded across founder teams."
            titleId="numbers-heading"
            lead={
              <p className={cn(bodyCopy, "reveal")} data-delay="1">
                Numbers that describe the agency better than any deck slide.
              </p>
            }
          />

          <MarketingContentGrid>
            <ChapterSpacer chapter="01" />
            {metricCards.map((card) => (
              <MetaCard key={card.label} label={card.label} value={card.value} className={card.className} />
            ))}
          </MarketingContentGrid>
        </div>
      </div>
    </section>
  );
}
