import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

import { CaseCampaignGallery } from "@/components/case-campaign-gallery";
import { CasesGallerySection } from "@/components/cases-gallery-section";
import {
  btnOutline,
  btnPrimary,
  pageHeroContainer,
  sectionContainer,
  sectionShell,
} from "@/components/framer-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import type { CaseRichContent, CaseSectionVisual, CaseStudy } from "@/lib/cases";
import {
  CASE_READER_PATHS,
  CASE_SECTION_CONTEXT,
  clearSavedScroll,
  estimateCaseReadMinutes,
  getContextualCta,
  persistScroll,
  readSavedScroll,
} from "@/lib/case-reading";
import { cn } from "@/lib/utils";

function isDeckAsset(src: string) {
  return src.startsWith("/cases/");
}

function DeckImage({
  src,
  alt,
  fallback,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      width={1280}
      height={800}
      className={className}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}

type CaseRichDetailProps = {
  study: CaseStudy;
  others: CaseStudy[];
};

type TocItem = { id: string; label: string };

function buildToc(rich: CaseRichContent): TocItem[] {
  const items: TocItem[] = [
    { id: "case-overview", label: "Overview" },
    { id: "case-challenge", label: "The challenge" },
    { id: "case-identity", label: "Identity" },
  ];
  if (rich.gallery?.length) {
    items.push({ id: "case-campaign", label: "Campaign" });
  }
  items.push(
    { id: "case-deliverables", label: "Deliverables" },
    { id: "case-results", label: "Results" },
  );
  return items;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroMetric({ metric }: { metric: { value: string; label: string } }) {
  return (
    <div>
      <p className="rm-case-study__metric-value">{metric.value}</p>
      <p className="rm-case-study__metric-label">{metric.label}</p>
    </div>
  );
}

function OverviewMetrics({
  metrics,
}: {
  metrics: CaseStudy["heroMetrics"];
}) {
  if (metrics.length === 0) return null;

  return (
    <dl
      className={cn(
        "reveal rm-case-study__metrics mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--rm-border-soft)] pt-8 md:grid-cols-4",
      )}
    >
      {metrics.map((m) => (
        <div key={m.label}>
          <dt className="rm-case-study__metric-value">{m.value}</dt>
          <dd className="rm-case-study__metric-label">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

const caseSection = "rm-case-study__section";

function MetaItem({ label, value }: { label: string; value: string }) {
  const domainMatch = value.match(/([\w-]+\.(?:cpa|com|io|net|org|co))/i);
  const hasExternalLink = domainMatch && value.includes("·");

  return (
    <>
      <dt>{label}</dt>
      <dd className="mt-1 text-[var(--rm-ink)]">
        {hasExternalLink && domainMatch ? (
          <>
            {value.slice(0, value.indexOf(domainMatch[0])).trim()}{" "}
            <a
              href={`https://${domainMatch[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rm-case-study__link focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]"
            >
              {domainMatch[0]}
            </a>
          </>
        ) : (
          value
        )}
      </dd>
    </>
  );
}

function DividerList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <dl className="reveal divide-y divide-[var(--rm-border-soft)] border-y border-[var(--rm-border-soft)]">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="rm-case-study__divider-item"
          data-delay={String((i % 4) + 1)}
        >
          <dt className="rm-case-study__eyebrow">{item.title}</dt>
          <dd className="rm-case-study__prose rm-case-study__prose--emphasis mt-2">
            {item.body}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SectionFigure({
  visual,
  fallback,
  aspect = "16/10",
}: {
  visual: CaseSectionVisual;
  fallback?: string;
  aspect?: "16/10" | "4/5" | "auto";
}) {
  const deck = isDeckAsset(visual.src);
  return (
    <figure className="rm-case-figure reveal mb-8 overflow-hidden border border-[var(--rm-border-soft)]">
      <div
        className={cn(
          "relative",
          aspect === "16/10" && "aspect-[16/10]",
          aspect === "4/5" && "aspect-[4/5]",
          deck ? "bg-black" : "bg-[var(--rm-surface-float)]",
        )}
      >
        <DeckImage
          src={visual.src}
          alt={visual.alt}
          fallback={fallback}
          className={cn(
            "h-full w-full",
            deck ? "object-contain object-center" : "object-cover",
          )}
        />
      </div>
      <figcaption className="rm-case-study__figure-caption">{visual.alt}</figcaption>
    </figure>
  );
}

function TocLink({
  section,
  index,
  isActive,
}: {
  section: TocItem;
  index: number;
  isActive: boolean;
  isVisited?: boolean;
}) {
  return (
    <a
      href={`#${section.id}`}
      className={cn(
        "rm-case-study__toc-link",
        isActive && "rm-case-study__toc-link--active",
      )}
      aria-current={isActive ? "location" : undefined}
    >
      <span className="rm-case-study__toc-index">{String(index + 1).padStart(2, "0")}</span>
      {section.label}
      {isActive ? (
        <span className="rm-case-study__toc-context">{CASE_SECTION_CONTEXT[section.id]}</span>
      ) : null}
    </a>
  );
}

function colorSwatch(name: string, accent: string): string {
  const map: Record<string, string> = {
    Gold: accent,
    Green: accent,
    White: "#ffffff",
    Black: "#0a0a0a",
    "Secondary Gray": "#6b7280",
    "Vibrant primaries": accent,
    "Neutral base": "#d4d4d4",
    "Accent line": accent,
  };
  return map[name] ?? accent;
}

export function CaseRichDetail({ study: c, others }: CaseRichDetailProps) {
  useReveal();
  const rich = c.rich;
  const toc = useMemo(() => (rich ? buildToc(rich) : []), [rich]);
  const readMinutes = useMemo(() => (rich ? estimateCaseReadMinutes(rich) : 0), [rich]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "case-overview");
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [resumeScroll, setResumeScroll] = useState<number | null>(null);
  const [resumeDismissed, setResumeDismissed] = useState(false);

  useEffect(() => {
    if (!rich) return;
    setResumeScroll(readSavedScroll(c.slug));
  }, [c.slug, rich]);

  useEffect(() => {
    if (!rich) return;

    let persistTimer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const nextProgress = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setProgress(nextProgress);

      const offsets = toc
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const above = offsets.filter((o) => o.top <= 140);
      const current = above.length ? above[above.length - 1] : offsets[0];
      if (current) {
        setActiveId(current.id);
        const currentIndex = toc.findIndex((s) => s.id === current.id);
        setVisitedIds(toc.slice(0, currentIndex + 1).map((s) => s.id));
      }

      clearTimeout(persistTimer);
      persistTimer = setTimeout(() => persistScroll(c.slug, h.scrollTop), 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(persistTimer);
    };
  }, [c.slug, rich, toc]);

  const contextualCta = getContextualCta(activeId);
  const showContextBar = progress > 12 && progress < 92;
  const showResume =
    resumeScroll !== null && !resumeDismissed && progress < 8 && resumeScroll > 480;
  const activeSectionLabel = toc.find((s) => s.id === activeId)?.label ?? "Overview";

  const handleResume = () => {
    if (resumeScroll === null) return;
    window.scrollTo({ top: resumeScroll, behavior: "smooth" });
    setResumeDismissed(true);
  };

  const handleStartFresh = () => {
    clearSavedScroll(c.slug);
    setResumeScroll(null);
    setResumeDismissed(true);
  };

  if (!rich) return null;

  const overviewParagraphs = rich.overview.body.split("\n\n");
  const overviewLead = overviewParagraphs[0] ?? "";
  const overviewRest = overviewParagraphs.slice(1);
  const visualFallback = c.fallbackCover ?? c.coverImage;
  const overviewVisual = rich.visuals?.overview;
  const identityVisual = rich.visuals?.identity;
  const deliverablesVisual = rich.visuals?.deliverables;
  const hasGallery = Boolean(rich.gallery?.length);
  const isLogoCover = c.coverTreatment === "logo";
  const showIdentityLogo = Boolean(rich.logo) && !isLogoCover;
  const identityCompact = !showIdentityLogo && !identityVisual;

  return (
    <div
      className={cn(
        "rm-page rm-case-study selection:bg-rm-accent selection:text-black",
        showContextBar && "pb-24",
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5"
      >
        <div
          className="h-full w-full origin-left bg-rm-accent"
          style={{ transform: `scaleX(${progress / 100})`, transition: "transform 80ms linear" }}
        />
      </div>

      <SiteHeader variant="dark" overlay />

      <main id="main">
        {isLogoCover ? (
          <section
            aria-labelledby="case-title"
            className="rm-case-hero-logo relative isolate border-b border-[var(--rm-border-soft)]"
            style={{ "--case-accent": c.accent } as CSSProperties}
          >
            <div
              className={cn(
                pageHeroContainer,
                "relative z-10 pb-[clamp(2.5rem,6vw,4rem)] pt-[var(--rm-header-offset)] md:pb-16",
              )}
            >
              <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-7 xl:col-span-6">
                  <nav
                    aria-label="Breadcrumb"
                    className="rm-case-study__breadcrumb rm-case-study__eyebrow reveal mb-10"
                  >
                    <Link
                      to="/cases"
                      className="cursor-pointer rounded-md hover:text-[var(--rm-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                      Cases
                    </Link>
                    <span aria-hidden>/</span>
                    <span aria-current="page">{c.client}</span>
                  </nav>

                  <p className="rm-case-study__eyebrow reveal mb-5">
                    {c.niche} · {c.format} · {c.duration}
                  </p>

                  <h1
                    id="case-title"
                    className="reveal rm-case-study__title"
                  >
                    {rich.titleLines[0]}{" "}
                    <span className="rm-case-study__title-muted">
                      {rich.titleLines[1]}
                    </span>
                  </h1>

                  <p className="rm-case-study__prose rm-case-study__hero-lead reveal mt-7" data-delay="1">
                    {rich.subline}
                  </p>

                  {rich.heroNote ? (
                    <p
                      className="rm-case-study__prose rm-case-study__prose--emphasis rm-case-study__hero-lead reveal mt-5"
                      data-delay="1"
                    >
                      {rich.heroNote}
                    </p>
                  ) : null}

                  <div className="reveal mt-10" data-delay="2">
                    <HeroMetric metric={c.primaryMetric} />
                  </div>

                  <div
                    className="reveal mt-10 flex flex-wrap items-center gap-3"
                    data-delay="3"
                  >
                    <Link to="/contact" className={btnOutline}>
                      Consultation
                    </Link>
                    <Link to={rich.closing.primaryTo} className={btnPrimary}>
                      {rich.closing.primaryLabel.replace(/\s*→\s*$/, "")}
                    </Link>
                  </div>
                  <a
                    href="#case-overview"
                    className={cn(
                      "rm-case-study__read-link reveal mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-[var(--rm-text-muted)] transition-colors duration-200 hover:text-[var(--rm-ink)] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
                    )}
                    data-delay="4"
                  >
                    Full case study
                    <ChevronDownIcon />
                  </a>
                </div>

                <div
                  className="reveal flex justify-start lg:col-span-5 lg:justify-end xl:col-span-6"
                  data-delay="1"
                >
                  <figure className="rm-case-hero-logo__mark w-full max-w-[min(420px,88vw)] lg:max-w-[360px]">
                    <DeckImage
                      src={c.coverImage}
                      alt={`${c.client} wordmark`}
                      fallback={c.fallbackCover}
                      loading="eager"
                      className="h-auto w-full object-contain"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <HeroAtmosphere
            imageSrc={c.coverImage}
            fallbackImageSrc={c.fallbackCover}
            underHeader
            className="rm-hero-atmosphere--about-photo rm-hero-atmosphere--compact"
          >
            <section
              aria-labelledby="case-title"
              className="relative z-10 flex flex-1 items-end pb-12 pt-[var(--rm-header-offset)] md:pb-16"
            >
              <div className={pageHeroContainer}>
                <div className="mx-auto w-full max-w-[720px]">
                  <nav
                    aria-label="Breadcrumb"
                    className="rm-case-study__breadcrumb rm-case-study__eyebrow reveal mb-8"
                  >
                    <Link
                      to="/cases"
                      className="cursor-pointer rounded-md hover:text-[var(--rm-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                      Cases
                    </Link>
                    <span aria-hidden>/</span>
                    <span aria-current="page">{c.client}</span>
                  </nav>

                  <p className="rm-case-study__eyebrow reveal mb-4">
                    {c.niche} · {c.format} · {c.duration}
                  </p>

                  <h1
                    id="case-title"
                    className="reveal rm-case-study__title max-w-[20ch] md:max-w-[18ch]"
                  >
                    {rich.titleLines[0]}{" "}
                    <span className="rm-case-study__title-muted">
                      {rich.titleLines[1]}
                    </span>
                  </h1>

                  <p className="rm-case-study__prose reveal mt-6" data-delay="1">
                    {rich.subline}
                  </p>

                  {rich.heroNote ? (
                    <p
                      className="rm-case-study__prose rm-case-study__prose--emphasis reveal mt-5"
                      data-delay="1"
                    >
                      {rich.heroNote}
                    </p>
                  ) : null}

                  <div className="reveal mt-10" data-delay="2">
                    <HeroMetric metric={c.primaryMetric} />
                  </div>

                  <div
                    className="reveal mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-8"
                    data-delay="3"
                  >
                    <span className="rm-case-study__eyebrow">{c.client} case study</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link to="/contact" className={btnOutline}>
                        Consultation
                      </Link>
                      <Link to={rich.closing.primaryTo} className={btnPrimary}>
                        {rich.closing.primaryLabel.replace(/\s*→\s*$/, "")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </HeroAtmosphere>
        )}

        <div className={cn(sectionShell, "border-b-0 py-0 md:py-0")}>
          <div className={cn(sectionContainer, "pt-12 pb-8 md:pt-16 md:pb-10")}>
            <div className="rm-case-study__layout grid grid-cols-12 gap-8 lg:gap-12">
              <aside aria-label="Table of contents" className="hidden lg:col-span-3 lg:block">
                <div className="rm-case-study__toc-nav">
                  <p className="rm-case-study__toc-label">On this page</p>
                  <p className="rm-case-study__reading-meta">
                    <strong>{readMinutes} min read</strong>
                    <span aria-hidden>·</span>
                    <span>{Math.round(progress)}% complete</span>
                  </p>
                  <ol className="rm-case-study__toc-rail">
                    {toc.map((s, i) => {
                      const isActive = activeId === s.id;
                      const isVisited = visitedIds.includes(s.id) && !isActive;
                      return (
                        <li key={s.id}>
                          <span
                            aria-hidden
                            className={cn(
                              "rm-case-study__toc-marker",
                              isActive && "rm-case-study__toc-marker--active",
                              isVisited && "rm-case-study__toc-marker--visited",
                            )}
                          />
                          <TocLink
                            section={s}
                            index={i}
                            isActive={isActive}
                            isVisited={isVisited}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </aside>

              <div className="col-span-12 lg:col-span-9">
                <div className="rm-case-study__content">
                  {showResume ? (
                    <div className="rm-case-study__resume reveal" role="status">
                      <p className="rm-case-study__resume-text">
                        Pick up where you left off in this case — your reading position is saved
                        for this session.
                      </p>
                      <div className="rm-case-study__resume-actions">
                        <button
                          type="button"
                          className="rm-case-study__resume-btn rm-case-study__resume-btn--primary"
                          onClick={handleResume}
                        >
                          Continue reading
                        </button>
                        <button
                          type="button"
                          className="rm-case-study__resume-btn"
                          onClick={handleStartFresh}
                        >
                          Start from top
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <nav
                    aria-label="Reading paths"
                    className="rm-case-study__reading-paths reveal"
                  >
                    {CASE_READER_PATHS.map((path) => (
                      <a
                        key={path.sectionId}
                        href={`#${path.sectionId}`}
                        className="rm-case-study__reading-path"
                        title={path.intent}
                      >
                        <span className="rm-case-study__reading-path-label">{path.label}</span>
                        <span className="rm-case-study__reading-path-intent">{path.intent}</span>
                      </a>
                    ))}
                  </nav>

                  <nav aria-label="Section navigation" className="rm-case-study__mobile-nav lg:hidden">
                    {toc.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={cn(
                          "rm-case-study__mobile-nav-link",
                          activeId === s.id && "rm-case-study__mobile-nav-link--active",
                        )}
                      >
                        {s.label}
                      </a>
                    ))}
                  </nav>
                  <section
                    id="case-overview"
                    aria-labelledby="case-overview-heading"
                    className={caseSection}
                  >
                    <h2 id="case-overview-heading" className="rm-case-study__section-title reveal">
                      {rich.overview.heading}
                    </h2>

                    {overviewLead ? (
                      <p className="rm-case-study__prose reveal mt-6">{overviewLead}</p>
                    ) : null}

                    {overviewVisual ? (
                      <SectionFigure visual={overviewVisual} fallback={visualFallback} />
                    ) : null}

                    {overviewRest.length > 0 ? (
                      <div className="space-y-6">
                        {overviewRest.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 24)}
                            className="rm-case-study__prose reveal"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    <dl
                      className={cn(
                        "rm-case-study__meta reveal mt-10 grid gap-x-10 gap-y-7 border-y border-[var(--rm-border-soft)] py-8",
                        isLogoCover ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4",
                      )}
                      data-delay="1"
                    >
                      <MetaItem label="Client" value={rich.meta.client} />
                      <MetaItem label="Scope" value={rich.meta.scope} />
                      <MetaItem label="Year" value={rich.meta.year} />
                      <MetaItem label="Status" value={rich.meta.status} />
                    </dl>

                    <OverviewMetrics metrics={c.heroMetrics} />

                    <div className="reveal mt-6 flex flex-wrap gap-2">
                      {rich.overview.scope.map((item) => (
                        <span key={item} className="rm-case-study__scope-pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Challenge */}
                  <section
                    id="case-challenge"
                    aria-labelledby="case-challenge-heading"
                    className={caseSection}
                  >
                    <h2 id="case-challenge-heading" className="rm-case-study__section-title reveal">
                      {rich.problem.heading}
                    </h2>
                    <div className="mt-6 space-y-6">
                      {rich.problem.body.split("\n\n").map((paragraph) => (
                        <p key={paragraph.slice(0, 24)} className="rm-case-study__prose reveal">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-8">
                      <DividerList items={rich.problem.cards} />
                    </div>
                  </section>

                  <section
                    id="case-identity"
                    aria-labelledby="case-identity-heading"
                    className={caseSection}
                  >
                    <h2 id="case-identity-heading" className="rm-case-study__section-title reveal">
                      {rich.identity.heading}
                    </h2>
                    {showIdentityLogo || identityVisual ? (
                      <div
                        className={cn(
                          "mt-8",
                          showIdentityLogo && identityVisual
                            ? "grid gap-6 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:items-start"
                            : undefined,
                        )}
                      >
                        {showIdentityLogo && rich.logo ? (
                          <figure className="rm-case-figure reveal flex flex-col items-center justify-center border border-[var(--rm-border-soft)] bg-[color-mix(in_oklab,var(--rm-ink)_3%,transparent)] px-6 py-10">
                            <DeckImage
                              src={rich.logo.src}
                              alt={rich.logo.alt}
                              fallback={visualFallback}
                              className="max-h-20 w-full object-contain"
                            />
                            <figcaption className="rm-case-study__figure-caption mt-4 text-center">
                              Wordmark
                            </figcaption>
                          </figure>
                        ) : null}
                        {identityVisual ? (
                          <SectionFigure
                            visual={identityVisual}
                            fallback={c.fallbackHero ?? c.heroImage}
                            aspect="4/5"
                          />
                        ) : null}
                      </div>
                    ) : null}
                    {identityCompact ? (
                      <dl className="reveal mt-8 divide-y divide-[var(--rm-border-soft)] border-y border-[var(--rm-border-soft)]">
                        <div className="rm-case-study__divider-item">
                          <dt className="rm-case-study__eyebrow">Typeface</dt>
                          <dd className="rm-case-study__prose rm-case-study__prose--emphasis mt-2">
                            {rich.identity.typeface.label}
                          </dd>
                          <dd className="rm-case-study__prose rm-case-study__prose--secondary mt-2">
                            {rich.identity.typeface.body}
                          </dd>
                        </div>
                        <div className="rm-case-study__divider-item">
                          <dt className="rm-case-study__eyebrow">Colour system</dt>
                          <dd className="rm-case-study__prose rm-case-study__prose--emphasis mt-2">
                            {rich.identity.colors.principle}
                          </dd>
                          <dd className="mt-4">
                            <ul className="space-y-3">
                              {rich.identity.colors.items.map((color) => (
                                <li key={color.name} className="flex items-start gap-3">
                                  <span
                                    aria-hidden
                                    className="mt-1.5 size-3 shrink-0 rounded-sm"
                                    style={{
                                      background: colorSwatch(color.name, c.accent),
                                      border:
                                        color.name === "White"
                                          ? "1px solid var(--rm-border-soft)"
                                          : undefined,
                                    }}
                                  />
                                  <span className="rm-case-study__prose rm-case-study__prose--secondary">
                                    <span className="font-medium text-[var(--rm-ink)]">
                                      {color.name}
                                    </span>
                                    <span className="text-[var(--rm-text-muted)]"> — </span>
                                    {color.meaning}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div className="rm-case-study__divider-item">
                          <dt className="rm-case-study__eyebrow">Logo</dt>
                          <dd className="rm-case-study__prose rm-case-study__prose--secondary mt-2">
                            {rich.identity.logo}
                          </dd>
                        </div>
                        <div className="rm-case-study__divider-item">
                          <dt className="rm-case-study__eyebrow">Key visual</dt>
                          <dd className="rm-case-study__prose rm-case-study__prose--secondary mt-2">
                            {rich.identity.keyVisual}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                    <div className="divide-y divide-[var(--rm-border-soft)] border-y border-[var(--rm-border-soft)]">
                      <div className="rm-case-study__divider-item">
                        <p className="rm-case-study__eyebrow">Typeface</p>
                        <h3 className="rm-case-study__subsection mt-3">
                          {rich.identity.typeface.label}
                        </h3>
                        <p className="rm-case-study__prose rm-case-study__prose--secondary mt-4">
                          {rich.identity.typeface.body}
                        </p>
                      </div>
                      <div className="rm-case-study__divider-item">
                        <p className="rm-case-study__eyebrow">Colour system</p>
                        <p className="rm-case-study__prose rm-case-study__prose--emphasis mt-3">
                          {rich.identity.colors.principle}
                        </p>
                        <ul className="mt-6 space-y-4">
                          {rich.identity.colors.items.map((color) => (
                            <li key={color.name} className="flex items-start gap-3">
                              <span
                                aria-hidden
                                className="mt-1.5 size-3 shrink-0 rounded-sm"
                                style={{
                                  background: colorSwatch(color.name, c.accent),
                                  border:
                                    color.name === "White"
                                      ? "1px solid var(--rm-border-soft)"
                                      : undefined,
                                }}
                              />
                              <div className="rm-case-study__prose rm-case-study__prose--secondary">
                                <span className="font-medium text-[var(--rm-ink)]">
                                  {color.name}
                                </span>
                                <span className="text-[var(--rm-text-muted)]"> — </span>
                                {color.meaning}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rm-case-study__divider-item">
                        <p className="rm-case-study__eyebrow">Logo</p>
                        <p className="rm-case-study__prose rm-case-study__prose--secondary mt-4">
                          {rich.identity.logo}
                        </p>
                      </div>
                      <div className="rm-case-study__divider-item">
                        <p className="rm-case-study__eyebrow">Key visual</p>
                        <p className="rm-case-study__prose rm-case-study__prose--secondary mt-4">
                          {rich.identity.keyVisual}
                        </p>
                      </div>
                    </div>
                    )}
                  </section>

                  {hasGallery ? (
                    <section
                      id="case-campaign"
                      aria-labelledby="case-campaign-heading"
                      className={cn(caseSection, "rm-case-campaign")}
                    >
                      <h2 id="case-campaign-heading" className="rm-case-study__section-title reveal">
                        {rich.galleryHeading ?? "Campaign gallery"}
                      </h2>
                      {rich.galleryLead ? (
                        <p className="rm-case-study__prose reveal mt-6">{rich.galleryLead}</p>
                      ) : null}
                      <CaseCampaignGallery
                        items={rich.gallery ?? []}
                        fallback={visualFallback}
                        accent={c.accent}
                      />
                    </section>
                  ) : null}

                  {/* Deliverables */}
                  <section
                    id="case-deliverables"
                    aria-labelledby="case-deliverables-heading"
                    className={caseSection}
                  >
                    <h2 id="case-deliverables-heading" className="rm-case-study__section-title reveal">
                      {rich.deliverables.heading}
                    </h2>
                    {deliverablesVisual ? (
                      <SectionFigure
                        visual={deliverablesVisual}
                        fallback={visualFallback}
                      />
                    ) : null}
                    <ol className="relative mt-10 space-y-12">
                      {rich.deliverables.items.map((item, i) => (
                        <li
                          key={item.title}
                          className="relative reveal grid gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-x-8"
                          data-delay={String((i % 3) + 1)}
                        >
                          <span className="rm-case-study__deliverable-index">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="rm-case-study__subsection">{item.title}</h3>
                            <p className="rm-case-study__prose rm-case-study__prose--secondary mt-3">
                              {item.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section
                    id="case-results"
                    aria-labelledby="case-results-heading"
                    className={caseSection}
                  >
                    <h2 id="case-results-heading" className="rm-case-study__section-title reveal">
                      {rich.platform.heading}
                    </h2>
                    <p className="rm-case-study__prose reveal mt-6">{rich.platform.body}</p>

                    <dl className="reveal mt-10 divide-y divide-[var(--rm-border-soft)] border-y border-[var(--rm-border-soft)]">
                      {rich.platform.features.map((feature, i) => (
                        <div
                          key={feature.title}
                          className="rm-case-study__divider-item"
                          data-delay={String((i % 4) + 1)}
                        >
                          <dt className="rm-case-study__subsection">{feature.title}</dt>
                          <dd className="rm-case-study__prose rm-case-study__prose--secondary mt-3">
                            {feature.body}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <blockquote className="rm-case-study__quote reveal">
                      <p className="reveal rm-case-study__quote-text">“{c.quote.text}”</p>
                      <footer className="mt-6">
                        {c.quote.who} · {c.quote.role}
                      </footer>
                    </blockquote>

                    <div className="reveal mt-10 border-t border-[var(--rm-border-soft)] pt-8">
                      <Link to="/cases" className={btnOutline}>
                        ← All cases
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        {others.length > 0 ? (
          <CasesGallerySection
            tag="More work"
            heading="Other case studies."
            cases={others}
            animateHeading={false}
          />
        ) : null}

        <UnifiedCTA
          title={rich.closing.titleLines[0]}
          titleAccent={rich.closing.subline}
          primaryLabel={rich.closing.primaryLabel.replace(/\s*→\s*$/, "")}
          primaryTo={rich.closing.primaryTo}
          secondaryLabel={rich.closing.secondaryLabel}
          secondaryTo={rich.closing.secondaryTo}
        />
      </main>

      <SiteFooter />

      <aside
        aria-label="Contextual next step"
        className={cn(
          "rm-case-study__context-bar",
          showContextBar && "rm-case-study__context-bar--visible",
        )}
      >
        <div className="rm-case-study__context-bar-inner px-4 md:px-6">
          <p className="rm-case-study__context-bar-message">
            <span className="text-[var(--cs-text-muted)]">{activeSectionLabel} · </span>
            {contextualCta.message}
          </p>
          <div className="rm-case-study__context-bar-actions">
            {contextualCta.secondaryLabel && contextualCta.secondaryTo ? (
              <Link to={contextualCta.secondaryTo} className={btnOutline}>
                {contextualCta.secondaryLabel}
              </Link>
            ) : null}
            <Link to={contextualCta.primaryTo} className={btnPrimary}>
              {contextualCta.primaryLabel}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
