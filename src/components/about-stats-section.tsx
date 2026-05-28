import {
  bodyCopy,
  sectionContainer,
  sectionHeadline,
  sectionHeadlineLead,
  sectionShell,
  SectionHeader,
} from "@/components/framer-section";
import { MarketingContentGrid } from "@/components/marketing-section";
import { MetaCard } from "@/components/meta-card";
import { cn } from "@/lib/utils";

const metricCards = [
  {
    label: "helped our clients earn 2025—2026",
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
  return (
    <section id="numbers" aria-labelledby="numbers-heading" className={sectionShell}>
      <div className={sectionContainer}>
        <SectionHeader tag="By the numbers">
          <div className={sectionHeadlineLead}>
            <p id="numbers-heading" className={cn(sectionHeadline, "reveal whitespace-pre-line")}>
              {"Ten years.\nCompounded across founder teams."}
            </p>
            <p className={cn(bodyCopy, "reveal")} data-delay="1">
              Numbers that describe the agency better than any deck slide.
            </p>
          </div>
        </SectionHeader>

        <MarketingContentGrid>
          {metricCards.map((card) => (
            <MetaCard
              key={card.label}
              label={card.label}
              value={card.value}
              className={card.className}
            />
          ))}
        </MarketingContentGrid>
      </div>
    </section>
  );
}
