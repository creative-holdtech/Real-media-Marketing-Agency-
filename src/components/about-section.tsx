import {
  bodyCopy,
  bodyCopyStrong,
  sectionContainer,
  sectionInnerStack,
  sectionShell,
} from "@/components/framer-section";
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

const metaCards = [
  {
    label: "Our products",
    value: "Sprint (from 4 weeks)\nMarathon (2+ months)",
    className: "md:col-start-2 md:row-start-1",
  },
  {
    label: "Markets",
    value: "EU · UK · MENA · GCC",
    className: "md:col-start-3 md:row-start-1",
  },
  {
    label: "Sectors",
    value: "Fintech · AI SaaS · Cybersecurity · iGaming",
    className: "md:col-start-2 md:row-start-2",
  },
  {
    label: "Reporting",
    value: "Pipeline and revenue, weekly",
    className: "md:col-start-3 md:row-start-2",
  },
] as const;

const bigStats = [
  { to: 50, suffix: "+", label: "Projects shipped for funded teams" },
  { prefix: "$", to: 10, suffix: "M+", label: "Capital raised by founders we worked with" },
] as const;

export function AboutSection() {
  const { ref, inView } = useSectionInView<HTMLElement>();

  return (
    <section ref={ref} id="studio" aria-label="Studio overview">
      <StudioTrustBand
        inView={inView}
        stats={[
          {
            value: <BigStatValue to={bigStats[0].to} suffix={bigStats[0].suffix} start={inView} />,
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
            tag="Marketing agency"
            title="We don't bring ideas. We come with a plan."
            srTitle="We don't bring ideas. We come with a plan."
            lead={
              <div className={sectionInnerStack}>
                <p className={cn(bodyCopyStrong, "border-l-2 border-white/20 pl-4 md:pl-5")}>
                  A team of senior experts who know Fintech, AI SaaS, Cybersecurity, and iGaming
                  inside out.
                </p>
                <ul className="flex flex-col gap-3 pt-1">
                  {[
                    "10 practitioners to make your product seen, trusted, and bought.",
                    "No corporate layers. Clear deliverables only.",
                    "Decisions in hours, not weeks. Output you can ship the same day.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[0.3em] shrink-0 text-sm text-white/30">—</span>
                      <span className={bodyCopy}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />

          <MarketingContentGrid>
            <ChapterSpacer chapter="02" />
            {metaCards.map((card) => (
              <MetaCard key={card.label} {...card} />
            ))}
          </MarketingContentGrid>
        </div>
      </div>
    </section>
  );
}
