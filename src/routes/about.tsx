import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import nicheAi from "@/assets/niche-ai.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import nicheB2b from "@/assets/niche-b2b.jpg";
import { AboutHero } from "@/components/about-hero";
import { AboutStatsScroll } from "@/components/about-stats-scroll";
import { AboutManifestoSection } from "@/components/about-manifesto";
import { MarketingSection, MarketingTagColumn } from "@/components/marketing-section";
import { PageSectionDots } from "@/components/page-section-dots";
import { TeamSection } from "@/components/team-section";
import { PagePreloader } from "@/components/page-preloader";
import {
  bodyCopy,
  borderSoft,
  sectionContentGrid,
  sectionGap,
  sectionHeadline,
  sectionLeadStack,
  subsectionTitle,
  textGhost,
} from "@/components/framer-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { getPageContent, section as pageSection } from "@/lib/payload/pages";
import { getPageDefaults } from "@/lib/page-content/defaults";
import { buildPageHead } from "@/lib/seo";

const NICHE_IMAGE_WIDTH = 1672;
const NICHE_IMAGE_HEIGHT = 941;

export const Route = createFileRoute("/about")({
  loader: async () => ({
    page: await getPageContent("about"),
  }),
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = page?.metaTitle ?? "About — R-M Studio";
    const description =
      page?.metaDescription ??
      "R-M is a strategic marketing agency for founders in Fintech, AI SaaS, Cybersecurity, and iGaming.";
    const seo = buildPageHead({ title, description, pathname: "/about" });
    return {
      meta: seo.meta,
      links: seo.links,
    };
  },
  component: AboutPage,
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const verticalImages = [nicheAi, nicheFintech, nicheHospitality, nicheB2b];

const aboutPageDots = [
  { id: "about-top", label: "Intro" },
  { id: "about-stats", label: "Numbers" },
  { id: "about-position", label: "Position" },
  { id: "verticals", label: "Spaces" },
  { id: "about-team", label: "Team" },
  { id: "cta", label: "Call" },
] as const;

function AmbientBlobs() {
  return (
    <div aria-hidden className="ambient-blobs">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
function AboutPage() {
  useReveal();
  const { page } = Route.useLoaderData();
  const cta = page.cta;
  const manifesto = pageSection(page, "manifesto");
  const verticalsContent = pageSection(page, "verticals");
  const defaultVerticals = getPageDefaults("about").sections.verticals?.items ?? [];
  const verticalItems = verticalsContent.items?.length ? verticalsContent.items : defaultVerticals;
  const verticals = verticalItems.map((item, index) => ({
    n: String(index + 1).padStart(2, "0"),
    title: item.title ?? "",
    body: item.body ?? "",
    img: item.image || verticalImages[index] || nicheAi,
  }));

  return (
    <LazyMotion features={domAnimation}>
      <div className="rm-page selection:bg-rm-accent selection:text-black">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AmbientBlobs />
        <PagePreloader />
        <PageSectionDots sections={aboutPageDots} />
        <SiteHeader variant="dark" overlay />

        <AboutHero />

        <main id="main">
          <AboutStatsScroll id="about-stats" />

          <div
            id="about-position"
            className="rm-defer-paint"
            style={{ containIntrinsicSize: "auto 640px", scrollMarginTop: "var(--rm-header-offset)" }}
          >
            <ManifestoSection manifesto={manifesto} />
          </div>

          <div className="rm-defer-paint" style={{ containIntrinsicSize: "auto 700px" }}>
            <VerticalsSection verticals={verticals} content={verticalsContent} />
          </div>

          <div
            id="about-team"
            className="rm-defer-paint"
            style={{ containIntrinsicSize: "auto 850px", scrollMarginTop: "var(--rm-header-offset)" }}
          >
            <TeamSection />
          </div>

        </main>

        <SiteFooter
          title={cta?.title}
          titleAccent={cta?.titleAccent}
          primaryLabel={cta?.primaryLabel}
          primaryTo={cta?.primaryUrl}
          secondaryLabel={cta?.secondaryLabel}
          secondaryTo={cta?.secondaryUrl}
        />
      </div>
    </LazyMotion>
  );
}

/* ================================================================== */
/*  MANIFESTO                                                          */
/* ================================================================== */
const manifestoThesisDefault = "We're not a hands-off vendor.";
const manifestoBulletsDefault = [
  "But an extension of your team, wired into market context.",
  "We killed the generic agency layers to ship execution focused on the outcomes that show up on your cap table.",
] as const;

function ManifestoSection({ manifesto }: { manifesto: ReturnType<typeof pageSection> }) {
  return (
    <AboutManifestoSection
      tag={manifesto.tag ?? "The position"}
      titleId="manifesto-heading"
      thesis={manifesto.heading ?? manifestoThesisDefault}
      bullets={(manifesto.bullets ?? manifestoBulletsDefault) as unknown as readonly string[]}
    />
  );
}

/* ================================================================== */
/*  VERTICALS                                                          */
/* ================================================================== */
const verticalPanelEase = [0.23, 1, 0.32, 1] as const;

function VerticalsSection({
  verticals,
  content,
}: {
  verticals: { n: string; title: string; body: string; img: string }[];
  content: ReturnType<typeof pageSection>;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const sector = verticals[active];

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let next = index;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next = (index + 1) % verticals.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        next = (index - 1 + verticals.length) % verticals.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = verticals.length - 1;
      } else {
        return;
      }
      setActive(next);
      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[next]?.focus();
    },
    [verticals.length],
  );

  return (
    <MarketingSection id="verticals" ariaLabelledBy="verticals-heading" className="bg-black">
      <div className={cn(sectionContentGrid, "items-start md:items-stretch")}>
        <MarketingTagColumn tag={content.tag ?? "Spaces"} />
        <div className={cn("flex flex-col md:col-span-2 md:col-start-2", sectionGap)}>
          <div className={sectionLeadStack}>
            <h2 id="verticals-heading" className={cn(sectionHeadline, "m-0 max-w-[22ch] text-white")}>
              <span className="block">Four spaces we lock into.</span>
            </h2>
            {content.body ? (
              <p className={cn(bodyCopy, "reveal max-w-[34ch]")} data-delay="1">
                {content.body}
              </p>
            ) : null}
          </div>

          <div
            ref={listRef}
            role="tablist"
            aria-label="Verticals"
            className={cn("flex flex-wrap items-end gap-x-8 gap-y-1 border-b", borderSoft)}
          >
            {verticals.map((v, index) => {
              const selected = index === active;
              return (
                <button
                  key={v.n}
                  type="button"
                  role="tab"
                  id={`${panelId}-tab-${v.n}`}
                  aria-selected={selected}
                  aria-controls={`${panelId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  className={cn(
                    "relative -mb-px cursor-pointer border-0 bg-transparent p-0 pb-2",
                    subsectionTitle,
                    "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black",
                    selected
                      ? "text-white after:scale-x-100"
                      : cn(textGhost, "after:scale-x-0 hover:text-[var(--rm-text-muted)]"),
                    reduce && "after:transition-none",
                  )}
                >
                  <span className="relative whitespace-nowrap">{v.title}</span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${panelId}-panel`}
            aria-labelledby={`${panelId}-tab-${sector.n}`}
            aria-live="polite"
            className="relative min-h-[320px] overflow-hidden rounded-3xl border border-[var(--rm-border-soft)] bg-black md:min-h-[360px] md:rounded-[2rem]"
          >
            <AnimatePresence initial={false}>
              <m.div
                key={sector.n}
                className="absolute inset-0 will-change-[opacity,transform]"
                initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{
                  duration: reduce ? 0 : 0.32,
                  ease: verticalPanelEase,
                }}
              >
                <img
                  src={sector.img}
                  alt=""
                  aria-hidden
                  width={NICHE_IMAGE_WIDTH}
                  height={NICHE_IMAGE_HEIGHT}
                  sizes="(max-width: 768px) 100vw, min(720px, 60vw)"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/42 to-black/12" />
                <m.div
                  className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.24,
                    delay: reduce ? 0 : 0.08,
                    ease: verticalPanelEase,
                  }}
                >
                  <div>
                    <h3 className={cn(sectionHeadline, "max-w-none text-white")}>{sector.title}</h3>
                    <p className={cn(bodyCopy, "mt-4 max-w-[44ch]")}>{sector.body}</p>
                  </div>
                </m.div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
