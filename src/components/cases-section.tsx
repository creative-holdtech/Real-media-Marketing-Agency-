import { Link } from "@tanstack/react-router";

import {
  bodyCopy,
  btnGhostLink,
  sectionContainer,
  sectionHeadline,
  sectionHeadlineLead,
  sectionShell,
  textMeta,
} from "@/components/framer-section";
import { cases as staticCases } from "@/lib/cases";
import { casesGalleryHeaderProps } from "@/lib/cases-gallery-config";
import { getPageDefaults } from "@/lib/page-content/defaults";
import { cn } from "@/lib/utils";

export function CasesSection() {
  const work = getPageDefaults("cases").sections?.work;
  const header = casesGalleryHeaderProps(work);
  const featuredCases = staticCases.slice(0, 3);

  return (
    <section id="work" aria-labelledby="cases-heading" className={cn(sectionShell, "rm-section-work")}>
      <div className={sectionContainer}>
        <div className="rm-work-grid reveal">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14">
            <div className="hidden md:block" aria-hidden />
            <div className="rm-work-grid__content w-full min-w-0">
              <header className="rm-work-grid__intro max-w-[26.25rem]">
                <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-normal uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
                  {header.tag}
                </span>
                <div className={sectionHeadlineLead}>
                  <h2
                    id="cases-heading"
                    className={cn(
                      sectionHeadline,
                      "max-w-[16ch] font-medium text-balance md:max-w-[18ch] md:leading-[1.15]",
                    )}
                  >
                    {header.heading}
                  </h2>
                  {header.subheading ? (
                    <p className={cn(bodyCopy, "max-w-[42ch] text-[var(--rm-text-body)]")}>{header.subheading}</p>
                  ) : null}
                </div>
              </header>

              <ul className="rm-work-list" role="list">
                {featuredCases.map((study, index) => (
                  <li key={study.slug}>
                    <Link
                      to="/cases/$slug"
                      params={{ slug: study.slug }}
                      className="rm-work-list__item group"
                    >
                      <span className="rm-work-list__index" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rm-work-list__body">
                        <span className={cn(textMeta, "rm-work-list__meta")}>
                          {study.niche} · {study.format}
                        </span>
                        <span className="rm-work-list__title">{study.client}</span>
                        <span className="rm-work-list__metric">
                          {study.primaryMetric.value}
                          <span className="rm-work-list__metric-label">{study.primaryMetric.label}</span>
                        </span>
                      </span>
                      <span className="rm-work-list__arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="rm-work-grid__footer">
                <Link to="/cases" className={btnGhostLink}>
                  View all case studies →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
