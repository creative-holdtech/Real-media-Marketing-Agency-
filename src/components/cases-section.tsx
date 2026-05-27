import { Link } from "@tanstack/react-router";

import {
  FramerPrimaryButton,
  FramerTag,
  sectionContainer,
  sectionHeaderContent,
  sectionHeaderGrid,
  sectionHeadline,
  sectionShell,
  textCardBody,
  textMeta,
  textMetric,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";

const featuredCases = [
  {
    key: "featured-tequila-cpa-network",
    to: "/cases" as const,
    tag: "CPA Network / Tequila CPA",
    title:
      "We built Tequila CPA Network's brand from the ground up, grew their partner base, and hit all key launch targets.",
    label: "Brand growth in 6 mo",
    metric: "+35%",
    footerRight: "Read Case →",
  },
  {
    key: "featured-currency-exchange",
    to: "/cases" as const,
    tag: "Cryptocurrency exchange / Currency",
    title:
      "We scaled user base across EMEA, Americas, and APAC through 270+ influencer videos across finance, tech, and economics channels.",
    label: "New accounts created in 6 mo",
    metric: "+30 878",
    footerRight: "Read Case →",
  },
] as const;

function progressFromMetric(metric: string) {
  const match = metric.match(/(\d+)\s*%/);
  return match ? Number(match[1]) : 65;
}

function InnerTag({ children }: { children: string }) {
  return (
    <span
      className={`inline-flex max-w-full rounded-full border border-neutral-200 px-3 py-1 ${textMeta} normal-case tracking-[0.06em]`}
    >
      <span className="text-balance">{children}</span>
    </span>
  );
}

function CaseProgressBar({ value, footerRight }: { value: number; footerRight: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-1 w-full overflow-visible rounded-full bg-neutral-200">
        <div
          className="relative h-full rounded-full bg-rm-accent"
          style={{ width: `${Math.min(100, Math.max(8, value))}%` }}
        >
          <span
            aria-hidden
            className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-rm-accent"
          />
        </div>
      </div>

      <div className="border-b border-neutral-200" />

      <div className="flex justify-end">
        <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-800">
          {footerRight}
        </span>
      </div>
    </div>
  );
}

function CaseBentoCard({
  to,
  tag,
  title,
  label,
  metric,
  footerRight,
}: {
  to: "/cases";
  tag: string;
  title: string;
  label: string;
  metric: string;
  footerRight: string;
}) {
  const progress = progressFromMetric(metric);

  return (
    <Link
      to={to}
      aria-label={`${tag}. ${metric} ${label}. ${title}`}
      className="group flex h-full flex-col gap-6 rounded-3xl bg-white p-6 transition-shadow hover:ring-1 hover:ring-neutral-200 md:p-8"
    >
      <div className="flex flex-col gap-4">
        <InnerTag>{tag}</InnerTag>
        <p className={`line-clamp-3 ${textCardBody}`}>{title}</p>
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className={textMeta}>{label}</p>
          <p className={textMetric}>{metric}</p>
        </div>

        <CaseProgressBar value={progress} footerRight={footerRight} />
      </div>
    </Link>
  );
}

export function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className={sectionShell}>
      <div className={sectionContainer}>
        <div className={sectionHeaderGrid}>
          <div className="reveal">
            <FramerTag>Selected case studies</FramerTag>
          </div>

          <div className={sectionHeaderContent} data-delay="1">
            <h2 id="cases-heading" className="sr-only">
              Selected case studies
            </h2>
            <TextReveal text="Results we deliver." className={`w-[92%] ${sectionHeadline}`} />
          </div>
        </div>

        <div className="reveal grid grid-cols-1 gap-2 md:grid-cols-3 md:items-stretch md:gap-2" data-delay="2">
          <div className="hidden md:block" />

          {featuredCases.map((item) => (
            <CaseBentoCard key={item.key} {...item} />
          ))}
        </div>

        <div className="reveal flex justify-end" data-delay="3">
          <FramerPrimaryButton to="/cases">View all cases →</FramerPrimaryButton>
        </div>
      </div>
    </section>
  );
}
