import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

import { CasesGallerySection } from "@/components/cases-gallery-section";
import {
  bodyCopy,
  bodyCopyStrong,
  btnOutline,
  btnPrimary,
  pageHeroContainer,
  sectionContainer,
  sectionHeadline,
  sectionPill,
  sectionShell,
  subsectionTitle,
  textCardBody,
  textMeta,
  textMetric,
} from "@/components/framer-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import type { CaseRichContent, CaseSectionVisual, CaseStudy } from "@/lib/cases";
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
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={cn("size-4 shrink-0", className)}>
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
      <p className={textMetric}>{metric.value}</p>
      <p className={cn("mt-1", textMeta)}>{metric.label}</p>
    </div>
  );
}

function OverviewMetrics({ metrics }: { metrics: CaseStudy["heroMetrics"] }) {
  if (metrics.length === 0) return null;

  return (
    <dl
      className={cn(
        "reveal rm-case-study__metrics mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--rm-border-soft)] pt-8 md:grid-cols-4",
      )}
    >
      {metrics.map((m) => (
        <div key={m.label}>
          <dt className={textMetric}>{m.value}</dt>
          <dd className={cn("mt-1", textMeta)}>{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Blog-style section rhythm */
const caseSection = "scroll-mt-32 mb-12 md:mb-16";

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
              className="cursor-pointer underline decoration-[var(--rm-border-strong)] underline-offset-4 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]"
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
        <div key={item.title} className="py-6 md:py-8" data-delay={String((i % 4) + 1)}>
          <dt className={textMeta}>{item.title}</dt>
          <dd className={cn("mt-2 max-w-prose", bodyCopyStrong)}>{item.body}</dd>
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
          className={cn("h-full w-full", deck ? "object-contain object-center" : "object-cover")}
        />
      </div>
      <figcaption className={cn("border-t border-[var(--rm-border-soft)] px-4 py-3", textMeta)}>
        {visual.alt}
      </figcaption>
    </figure>
  );
}

function CampaignGallery({ items, fallback }: { items: CaseSectionVisual[]; fallback?: string }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {items.map((item, i) => {
        const featured = i === 0;
        return (
          <figure
            key={item.src}
            className={cn(
              "reveal group overflow-hidden border border-[var(--rm-border-soft)] bg-black rm-case-figure",
              featured && "col-span-2 md:col-span-2",
            )}
            data-delay={String((i % 4) + 1)}
          >
            <div
              className={cn(
                "relative",
                featured ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]",
              )}
            >
              <DeckImage
                src={item.src}
                alt={item.alt}
                fallback={fallback}
                className="h-full w-full object-contain object-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
              />
            </div>
            <figcaption
              className={cn(
                "border-t border-[var(--rm-border-soft)] bg-[var(--rm-surface-float)] px-3 py-2.5",
                textMeta,
              )}
            >
              {item.alt}
            </figcaption>
          </figure>
        );
      })}
    </div>
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
}) {
  return (
    <a
      href={`#${section.id}`}
      className={cn(
        "block text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rm-surface-raised)]",
        isActive
          ? "text-[var(--rm-ink)]"
          : "text-[var(--rm-text-muted)] hover:text-[var(--rm-ink)]",
      )}
    >
      <span className="mr-2 tabular-nums text-[var(--rm-text-muted)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      {section.label}
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
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "case-overview");

  useEffect(() => {
    if (!rich) return;

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);

      const offsets = toc
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const above = offsets.filter((o) => o.top <= 140);
      const current = above.length ? above[above.length - 1] : offsets[0];
      if (current) setActiveId(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rich, toc]);

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
    <div className="rm-page rm-case-study selection:bg-rm-accent selection:text-black">
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
                    className={cn("reveal mb-10 flex flex-wrap items-center gap-2", textMeta)}
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

                  <p className={cn("reveal mb-5", textMeta)}>
                    {c.niche} · {c.format} · {c.duration}
                  </p>

                  <h1
                    id="case-title"
                    className="reveal max-w-[16ch] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--rm-ink)]"
                  >
                    {rich.titleLines[0]}{" "}
                    <span className="font-normal text-[var(--rm-text-muted)]">
                      {rich.titleLines[1]}
                    </span>
                  </h1>

                  <p className={cn("reveal mt-7 max-w-[42ch]", bodyCopy)} data-delay="1">
                    {rich.subline}
                  </p>

                  {rich.heroNote ? (
                    <p className={cn("reveal mt-5 max-w-[42ch]", bodyCopyStrong)} data-delay="1">
                      {rich.heroNote}
                    </p>
                  ) : null}

                  <div className="reveal mt-10" data-delay="2">
                    <HeroMetric metric={c.primaryMetric} />
                  </div>

                  <div className="reveal mt-10 flex flex-wrap items-center gap-3" data-delay="3">
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
                    className={cn("reveal mb-8 flex flex-wrap items-center gap-2", textMeta)}
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

                  <p className={cn("reveal mb-4", textMeta)}>
                    {c.niche} · {c.format} · {c.duration}
                  </p>

                  <h1
                    id="case-title"
                    className="reveal max-w-[20ch] text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--rm-ink)] md:text-4xl lg:text-5xl"
                  >
                    {rich.titleLines[0]}{" "}
                    <span className="font-normal text-[var(--rm-text-muted)]">
                      {rich.titleLines[1]}
                    </span>
                  </h1>

                  <p className={cn("reveal mt-6 max-w-prose", bodyCopy)} data-delay="1">
                    {rich.subline}
                  </p>

                  {rich.heroNote ? (
                    <p className={cn("reveal mt-5 max-w-prose", bodyCopyStrong)} data-delay="1">
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
                    <span className={textMeta}>{c.client} case study</span>
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
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              <aside aria-label="Table of contents" className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-32">
                  <p className={cn("mb-4", textMeta)}>On this page</p>
                  <ol className="relative space-y-4 border-l border-[var(--rm-border-soft)] pl-5">
                    {toc.map((s, i) => {
                      const isActive = activeId === s.id;
                      return (
                        <li key={s.id} className="relative">
                          <span
                            aria-hidden
                            className={cn(
                              "absolute -left-[23px] top-1.5 h-4 w-[3px] rounded-full transition-colors",
                              isActive ? "bg-rm-accent" : "bg-transparent",
                            )}
                          />
                          <TocLink section={s} index={i} isActive={isActive} />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </aside>

              <div className="col-span-12 lg:col-span-9">
                <div className="mx-auto max-w-[720px]">
                  <section
                    id="case-overview"
                    aria-labelledby="case-overview-heading"
                    className={caseSection}
                  >
                    <h2 id="case-overview-heading" className={cn("reveal", sectionHeadline)}>
                      {rich.overview.heading}
                    </h2>

                    {overviewLead ? (
                      <p className={cn("reveal mt-6 max-w-prose", bodyCopy)}>{overviewLead}</p>
                    ) : null}

                    {overviewVisual ? (
                      <SectionFigure visual={overviewVisual} fallback={visualFallback} />
                    ) : null}

                    {overviewRest.length > 0 ? (
                      <div className="space-y-6">
                        {overviewRest.map((paragraph) => (
                          <p key={paragraph.slice(0, 24)} className={cn("reveal", bodyCopy)}>
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
                        <span key={item} className={sectionPill}>
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
                    <h2 id="case-challenge-heading" className={cn("reveal", sectionHeadline)}>
                      {rich.problem.heading}
                    </h2>
                    <div className="mt-6 space-y-6">
                      {rich.problem.body.split("\n\n").map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 24)}
                          className={cn("reveal max-w-prose", bodyCopy)}
                        >
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
                    <h2 id="case-identity-heading" className={cn("reveal", sectionHeadline)}>
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
                            <figcaption className={cn("mt-4 text-center", textMeta)}>
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
                        <div className="py-5 md:py-6">
                          <dt className={textMeta}>Typeface</dt>
                          <dd className={cn("mt-2", bodyCopyStrong)}>
                            {rich.identity.typeface.label}
                          </dd>
                          <dd className={cn("mt-2 max-w-prose", textCardBody)}>
                            {rich.identity.typeface.body}
                          </dd>
                        </div>
                        <div className="py-5 md:py-6">
                          <dt className={textMeta}>Colour system</dt>
                          <dd className={cn("mt-2 max-w-prose", bodyCopyStrong)}>
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
                                  <span className={textCardBody}>
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
                        <div className="py-5 md:py-6">
                          <dt className={textMeta}>Logo</dt>
                          <dd className={cn("mt-2 max-w-prose", textCardBody)}>
                            {rich.identity.logo}
                          </dd>
                        </div>
                        <div className="py-5 md:py-6">
                          <dt className={textMeta}>Key visual</dt>
                          <dd className={cn("mt-2 max-w-prose", textCardBody)}>
                            {rich.identity.keyVisual}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <div className="divide-y divide-[var(--rm-border-soft)] border-y border-[var(--rm-border-soft)]">
                        <div className="py-6 md:py-8">
                          <p className={textMeta}>Typeface</p>
                          <h3 className={cn("mt-3", subsectionTitle)}>
                            {rich.identity.typeface.label}
                          </h3>
                          <p className={cn("mt-4 max-w-prose", textCardBody)}>
                            {rich.identity.typeface.body}
                          </p>
                        </div>
                        <div className="py-6 md:py-8">
                          <p className={textMeta}>Colour system</p>
                          <p className={cn("mt-3 max-w-prose", bodyCopyStrong)}>
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
                                <div className={textCardBody}>
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
                        <div className="py-6 md:py-8">
                          <p className={textMeta}>Logo</p>
                          <p className={cn("mt-4 max-w-prose", textCardBody)}>
                            {rich.identity.logo}
                          </p>
                        </div>
                        <div className="py-6 md:py-8">
                          <p className={textMeta}>Key visual</p>
                          <p className={cn("mt-4 max-w-prose", textCardBody)}>
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
                      className={caseSection}
                    >
                      <h2 id="case-campaign-heading" className={cn("reveal", sectionHeadline)}>
                        {rich.galleryHeading ?? "Campaign gallery"}
                      </h2>
                      {rich.galleryLead ? (
                        <p className={cn("reveal mt-6 max-w-prose", bodyCopy)}>
                          {rich.galleryLead}
                        </p>
                      ) : null}
                      <CampaignGallery items={rich.gallery ?? []} fallback={visualFallback} />
                    </section>
                  ) : null}

                  {/* Deliverables */}
                  <section
                    id="case-deliverables"
                    aria-labelledby="case-deliverables-heading"
                    className={caseSection}
                  >
                    <h2 id="case-deliverables-heading" className={cn("reveal", sectionHeadline)}>
                      {rich.deliverables.heading}
                    </h2>
                    {deliverablesVisual ? (
                      <SectionFigure visual={deliverablesVisual} fallback={visualFallback} />
                    ) : null}
                    <ol className="relative mt-10 space-y-12">
                      {rich.deliverables.items.map((item, i) => (
                        <li
                          key={item.title}
                          className="relative reveal grid gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-x-8"
                          data-delay={String((i % 3) + 1)}
                        >
                          <span
                            className={cn("tabular-nums text-[var(--rm-text-muted)]", textMeta)}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className={subsectionTitle}>{item.title}</h3>
                            <p className={cn("mt-3 max-w-prose", textCardBody)}>{item.body}</p>
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
                    <h2 id="case-results-heading" className={cn("reveal", sectionHeadline)}>
                      {rich.platform.heading}
                    </h2>
                    <p className={cn("reveal mt-6 max-w-prose", bodyCopy)}>{rich.platform.body}</p>

                    <dl className="reveal mt-10 divide-y divide-[var(--rm-border-soft)] border-y border-[var(--rm-border-soft)]">
                      {rich.platform.features.map((feature, i) => (
                        <div
                          key={feature.title}
                          className="py-6 md:py-8"
                          data-delay={String((i % 4) + 1)}
                        >
                          <dt className={subsectionTitle}>{feature.title}</dt>
                          <dd className={cn("mt-3 max-w-prose", textCardBody)}>{feature.body}</dd>
                        </div>
                      ))}
                    </dl>

                    <blockquote className="rm-case-study__quote reveal max-w-prose">
                      <p className={cn("text-lg leading-relaxed md:text-xl", bodyCopy)}>
                        “{c.quote.text}”
                      </p>
                      <footer className={cn("mt-6", textMeta)}>
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
    </div>
  );
}
