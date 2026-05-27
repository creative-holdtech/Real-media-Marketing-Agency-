import { Link } from "@tanstack/react-router";

import {
  FramerPrimaryButton,
  FramerTag,
  sectionContainer,
  sectionHeaderContent,
  sectionHeaderGrid,
  sectionShell,
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
    footerLeft: "CPA Network / Tequila",
    footerRight: "Read Case →",
    progress: 35,
  },
  {
    key: "featured-currency-exchange",
    to: "/cases" as const,
    tag: "Cryptocurrency exchange / Currency",
    title:
      "We scaled user base across EMEA, Americas, and APAC through 270+ influencer videos across finance, tech, and economics channels.",
    label: "New accounts created in in 6 mo",
    metric: "+30 878",
    footerLeft: "Cryptocurrency exchange",
    footerRight: "Read Case →",
    progress: 72,
  },
] as const;

function InnerTag({ children }: { children: string }) {
  return (
    <span className="inline-flex max-w-full rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-semibold leading-[1.35] tracking-[0.08em] text-neutral-500">
      <span className="text-balance">{children}</span>
    </span>
  );
}

function CaseProgressBar({
  value,
  footerLeft,
  footerRight,
}: {
  value: number;
  footerLeft: string;
  footerRight: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative h-2.5 w-full overflow-visible rounded-full bg-neutral-200">
        <div
          className="relative h-full rounded-full bg-rm-accent"
          style={{ width: `${Math.min(100, Math.max(8, value))}%` }}
        >
          <span
            aria-hidden
            className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-rm-accent"
          />
        </div>
      </div>

      <div className="w-full border-b-2 border-neutral-200 pt-2" />

      <div className="flex w-full items-center justify-between gap-3 text-[16px] font-medium leading-[1.3] tracking-[-0.04em] text-neutral-900">
        <span className="min-w-0 flex-1 text-balance text-[14px] md:text-[16px]">{footerLeft}</span>
        <span className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-700">
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
  footerLeft,
  footerRight,
  progress,
}: {
  to: "/cases";
  tag: string;
  title: string;
  label: string;
  metric: string;
  footerLeft: string;
  footerRight: string;
  progress: number;
}) {
  return (
    <Link
      to={to}
      className="group flex aspect-[0.77] min-h-[420px] flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-white px-6 pb-6 pt-8 md:min-h-[478px]"
    >
      <div className="flex flex-col gap-6">
        <InnerTag>{tag}</InnerTag>
        <p className="text-[24px] font-semibold leading-[1.3] tracking-[-0.04em] text-neutral-900">
          {title}
        </p>
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center text-center">
          <p className="text-[18px] font-medium leading-[1.3] tracking-[-0.04em] text-neutral-500 md:text-[20px]">
            {label}
          </p>
          <p className="mt-1 text-[32px] font-semibold leading-[1.3] tracking-[-0.04em] text-neutral-900 tabular-nums">
            {metric}
          </p>
        </div>

        <CaseProgressBar value={progress} footerLeft={footerLeft} footerRight={footerRight} />
      </div>
    </Link>
  );
}

export function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className={sectionShell}>
      <div className={`${sectionContainer} gap-16 md:gap-20`}>
        <div className={sectionHeaderGrid}>
          <div className="reveal">
            <FramerTag>Selected case studies</FramerTag>
          </div>

          <div className={sectionHeaderContent} data-delay="1">
            <h2 id="cases-heading" className="sr-only">
              Selected case studies
            </h2>
            <TextReveal
              text="Results we deliver."
              className="w-[92%] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[110%] tracking-[-0.06em]"
            />
          </div>
        </div>

        <div className="reveal grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch md:gap-3" data-delay="2">
          <div className="flex flex-col justify-end md:max-w-[360px]">
            <FramerPrimaryButton to="/cases">View all cases →</FramerPrimaryButton>
          </div>

          {featuredCases.map((item) => (
            <CaseBentoCard key={item.key} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
