import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";

import {
  btnPrimary,
  sectionContainer,
  sectionShell,
  textCardBody,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";
import { cn } from "@/lib/utils";

const featuredCases = [
  {
    cardKey: "featured-tequila-cpa-network",
    to: "/cases" as const,
    tag: "CPA Network / Tequila CPA",
    title:
      "We built Tequila CPA Network's brand from the ground up, grew their partner base, and hit all key launch targets.",
    label: "Brand growth in 6 mo",
    metric: "+35%",
  },
  {
    cardKey: "featured-currency-exchange",
    to: "/cases" as const,
    tag: "Cryptocurrency exchange, / Currency",
    title:
      "We scaled user base across EMEA, Americas, and APAC through 270+ influencer videos across finance, tech, and economics channels.",
    label: "New  accounts created in  in 6 mo",
    metric: "+30 878",
  },
] as const;

function CaseRow({
  to,
  tag,
  title,
  label,
  metric,
  index,
}: {
  to: "/cases";
  tag: string;
  title: string;
  label: string;
  metric: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to={to}
        className="group block border-t border-white/[0.08] py-8 transition-colors duration-300 hover:border-white/20 md:py-10"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left: metric block */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rm-text-muted)]">
              {tag}
            </span>
            <div>
              <p
                className="font-bold leading-none tracking-[-0.05em] text-[var(--rm-ink)] transition-colors"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                {metric}
              </p>
              <p className="mt-2 text-sm text-[var(--rm-text-muted)]">{label}</p>
            </div>
          </div>

          {/* Right: description + link */}
          <div className="flex flex-col justify-between gap-6 md:py-1">
            <p className={cn("max-w-prose", textCardBody)}>{title}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--rm-text-muted)] transition-colors duration-200 group-hover:text-[var(--rm-ink)]">
              <span>Read Case</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-heading" className={sectionShell}>
      <div className={sectionContainer}>

        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3 md:gap-8">
          <div className="hidden md:flex md:items-end" aria-hidden>
            <span
              className="select-none pointer-events-none font-bold leading-none text-white/[0.05]"
              style={{ fontSize: "clamp(5rem, 8vw, 8rem)", letterSpacing: "-0.06em" }}
            >
              04
            </span>
          </div>
          <div className="reveal flex flex-col gap-4 md:col-span-2">
            <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[var(--rm-text-muted)]">
              Selected case studies
            </span>
            <h2 id="cases-heading" className="font-semibold text-[var(--rm-ink)]" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              <TextReveal
                text="Results we deliver."
                className="font-[inherit] text-[length:inherit] leading-[inherit] tracking-[inherit]"
              />
            </h2>
          </div>
        </div>

        {/* Case rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div aria-hidden />
          <div className="md:col-span-2">
            {featuredCases.map(({ cardKey, ...item }, i) => (
              <CaseRow key={cardKey} {...item} index={i} />
            ))}
            {/* Bottom border */}
            <div className="border-t border-white/[0.08]" />
          </div>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div aria-hidden />
          <div className="md:col-span-2 flex justify-start">
            <Link to="/cases" className={btnPrimary}>
              View all cases →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
