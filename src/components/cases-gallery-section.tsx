import { Link } from "@tanstack/react-router";

import {
  bodyCopy,
  btnGhostLink,
  sectionContainer,
  sectionGap,
  sectionGridSpacer,
  sectionHeadline,
  sectionHeadlineLead,
  sectionHeaderGrid,
  sectionInnerStack,
  sectionShell,
  surfaceCardTitle,
  textCardBody,
  textMeta,
} from "@/components/framer-section";
import { TextReveal } from "@/components/text-reveal";
import { formatCaseDuration, type CaseMetric, type CaseStudy } from "@/lib/cases";
import { cn } from "@/lib/utils";

type CasesGallerySectionProps = {
  cases: CaseStudy[];
  tag?: string;
  heading?: string;
  subheading?: string;
  chapter?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  animateHeading?: boolean;
};

const galleryLinkFocus =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const galleryViewLabel = cn(
  btnGhostLink,
  "pointer-events-none w-fit px-0 text-[var(--rm-ink)] group-hover:text-white",
);

const galleryRowGrid = cn("grid grid-cols-1 items-start", sectionGap, "md:grid-cols-3");

const galleryCardGrid = cn(
  "grid grid-cols-1 items-start",
  sectionGap,
  "md:col-span-2 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_auto]",
);

const COVER_OBJECT_POSITION: Partial<Record<string, string>> = {
  empresex: "center 42%",
  "tequila-cpa": "center center",
  progresivo: "center 40%",
};

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

function revealDelay(order: number) {
  return String((order % 5) + 1);
}

function formatMetricValue(value: string) {
  return value === "LATAM" ? "Latam" : value;
}

function GalleryRowMetric({ metric }: { metric: CaseMetric }) {
  return (
    <div className="rm-cases-gallery__metric">
      <span className="rm-cases-gallery__metric-value">{formatMetricValue(metric.value)}</span>
      <span className="rm-cases-gallery__metric-label">{metric.label}</span>
    </div>
  );
}

function CaseGalleryRow({
  study,
  index,
  revealOrder,
}: {
  study: CaseStudy;
  index: number;
  revealOrder: number;
}) {
  const durationLabel = formatCaseDuration(study.duration);
  const metric = study.primaryMetric;

  return (
    <article
      className="rm-cases-gallery__row reveal border-b border-[var(--rm-border-soft)]"
      data-delay={revealDelay(revealOrder)}
    >
      <div className={galleryRowGrid}>
        <div className="rm-cases-gallery__rail flex items-baseline justify-between gap-4 md:flex-col md:items-start md:justify-between md:gap-5 md:self-stretch">
          <span className="rm-cases-gallery__index">{padIndex(index + 1)}</span>
          <span className={cn(textMeta, "md:mt-auto")}>{study.niche}</span>
        </div>

        <Link
          to="/cases/$slug"
          params={{ slug: study.slug }}
          aria-label={`${study.client} — ${metric.value} ${metric.label}. ${study.preview}`}
          className={cn(galleryCardGrid, "rm-cases-gallery__card-link group", galleryLinkFocus)}
        >
          <div
            className={cn(
              "rm-cases-gallery__cover aspect-[16/10] overflow-hidden rounded-md border border-[var(--rm-border-soft)]",
              study.coverTreatment === "logo" && "rm-cases-gallery__cover--logo",
            )}
          >
            <img
              src={study.coverImage}
              alt=""
              aria-hidden
              className={cn(
                "rm-cases-gallery__cover-img h-full w-full",
                study.coverImage.startsWith("/cases/") ||
                  study.coverTreatment === "logo" ||
                  study.coverImage.endsWith(".svg")
                  ? "object-contain bg-transparent object-center"
                  : "object-cover",
              )}
              style={{ objectPosition: COVER_OBJECT_POSITION[study.slug] ?? "center center" }}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              onError={(event) => {
                const fallback = study.fallbackCover;
                if (fallback && event.currentTarget.src !== fallback) {
                  event.currentTarget.src = fallback;
                  event.currentTarget.className =
                    "rm-cases-gallery__cover-img h-full w-full object-cover";
                }
              }}
            />
          </div>

          <div className={cn(sectionInnerStack, "min-h-full min-w-0")}>
            <h3 className={surfaceCardTitle}>{study.client}</h3>
            <p className={cn(textCardBody, "max-w-[38ch] text-pretty")}>{study.preview}</p>
            <p className={textMeta}>
              {study.format} · {durationLabel}
            </p>
          </div>

          <GalleryRowMetric metric={metric} />
        </Link>
      </div>
    </article>
  );
}

function GallerySectionHeader({
  tag,
  heading,
  headingId,
  subheading,
  chapter,
  animateHeading,
}: {
  tag: string;
  heading: string;
  headingId: string;
  subheading?: string;
  chapter?: string;
  animateHeading: boolean;
}) {
  return (
    <div className={cn(sectionHeaderGrid, "reveal items-end")}>
      {chapter ? (
        <div className="hidden md:flex md:items-end" aria-hidden>
          <span
            className="pointer-events-none select-none font-bold leading-none text-white/[0.05]"
            style={{ fontSize: "clamp(5rem, 8vw, 8rem)", letterSpacing: "-0.06em" }}
          >
            {chapter}
          </span>
        </div>
      ) : (
        <div className={sectionGridSpacer} aria-hidden />
      )}
      <div className={cn(sectionHeadlineLead, "md:col-span-2")}>
        <span className={textMeta}>{tag}</span>
        {animateHeading ? (
          <TextReveal as="h2" id={headingId} text={heading} className={sectionHeadline} />
        ) : (
          <h2 id={headingId} className={sectionHeadline}>
            {heading}
          </h2>
        )}
        {subheading ? <p className={cn(bodyCopy, "max-w-prose")}>{subheading}</p> : null}
      </div>
    </div>
  );
}

export function CasesGallerySection({
  cases,
  tag = "Case studies",
  heading = "Three engagements.",
  subheading,
  chapter,
  viewAllHref,
  viewAllLabel = "View all case studies →",
  animateHeading = false,
}: CasesGallerySectionProps) {
  const headingId = "cases-gallery-heading";

  return (
    <section id="work" className={cn(sectionShell, "rm-cases-gallery")} aria-labelledby={headingId}>
      <div className={sectionContainer}>
        <GallerySectionHeader
          tag={tag}
          heading={heading}
          headingId={headingId}
          subheading={subheading}
          chapter={chapter}
          animateHeading={animateHeading}
        />

        <div className="rm-cases-gallery__list border-t border-[var(--rm-border-soft)]">
          {cases.map((study, order) => (
            <CaseGalleryRow key={study.slug} study={study} index={order} revealOrder={order} />
          ))}
        </div>

        {viewAllHref ? (
          <div className={cn(sectionHeaderGrid, "reveal items-center")} data-delay="2">
            <div className={sectionGridSpacer} aria-hidden />
            <div className="flex justify-end md:col-span-2">
              <Link
                to={viewAllHref}
                className={cn(galleryViewLabel, "pointer-events-auto inline-flex")}
              >
                {viewAllLabel}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
