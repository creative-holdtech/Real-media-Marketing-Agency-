import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import aboutHero from "@/assets/about-hero.png";
import aboutHeroTeam from "@/assets/about-hero-team.jpg";
import nicheAi from "@/assets/niche-ai.jpg";
import nicheFintech from "@/assets/niche-fintech.jpg";
import nicheHospitality from "@/assets/niche-hospitality.jpg";
import nicheB2b from "@/assets/niche-b2b.jpg";
import { AboutStatsSection } from "@/components/about-stats-section";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { MarketingSection, MarketingTagColumn } from "@/components/marketing-section";
import { ManifestoQuoteSection } from "@/components/ui/testimonials";
import { TeamSection } from "@/components/team-section";
import { PagePreloader } from "@/components/page-preloader";
import {
  bodyCopy,
  btnOutline,
  heroSubcopyStrong,
  btnPrimary,
  FramerTag,
  pageHeroContainer,
  sectionGap,
  sectionHeaderGrid,
  sectionHeadline,
  sectionHeadlineLead,
} from "@/components/framer-section";
import { SurfaceCard } from "@/components/surface-card";
import { TextReveal } from "@/components/text-reveal";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { getPageContent, section as pageSection } from "@/lib/payload/pages";
import { getPageDefaults } from "@/lib/page-content/defaults";
import { buildPageHead } from "@/lib/seo";

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
      links: [...seo.links, { rel: "preload", as: "image", href: aboutHeroTeam, fetchPriority: "high" }],
    };
  },
  component: AboutPage,
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const verticalImages = [nicheAi, nicheFintech, nicheHospitality, nicheB2b];

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
  const reduce = useReducedMotion();
  const { page } = Route.useLoaderData();
  const hero = page.hero;
  const cta = page.cta;
  const manifesto = pageSection(page, "manifesto");
  const verticalsContent = pageSection(page, "verticals");
  const defaultVerticals = getPageDefaults("about").sections.verticals?.items ?? [];
  const verticalItems =
    verticalsContent.items?.length ? verticalsContent.items : defaultVerticals;
  const verticals = verticalItems.map((item, index) => ({
    n: String(index + 1).padStart(2, "0"),
    title: item.title ?? "",
    body: item.body ?? "",
    img: item.image || verticalImages[index] || nicheAi,
  }));

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBlobs />
      <PagePreloader />
      <SiteHeader variant="dark" overlay />

      <HeroAtmosphere
        imageSrc={aboutHeroTeam}
        fallbackImageSrc={hero?.image || aboutHero}
        underHeader
        className="rm-hero-atmosphere--about-photo"
      >
        <div aria-hidden className="rm-hero-grain" />
        <section
          aria-labelledby="page-title"
          className="relative z-10 flex flex-1 items-center pt-[var(--rm-header-offset)]"
        >
          <div className={pageHeroContainer}>
            <div className="rm-hero-copy flex w-full max-w-[40rem] flex-col items-start text-left">
              {hero?.tag ? (
                <motion.p
                  className="mb-8 w-fit"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FramerTag>{hero.tag}</FramerTag>
                </motion.p>
              ) : null}
              <h1
                id="page-title"
                className="rm-hero-headline w-full max-w-[16ch] text-[35px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[48px] md:max-w-[18ch] md:text-[58px] lg:text-[64px]"
              >
                {(hero?.titleLines ?? []).map((line, i) => (
                  <span key={line} className="rm-hero-line">
                    <span
                      className="rm-hero-line__inner text-pretty"
                      style={{ animationDelay: `${0.28 + i * 0.12}s` }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
              {hero?.subheading ? (
                <motion.p
                  className={cn("mt-7 max-w-[34ch] text-pretty", heroSubcopyStrong)}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  {hero.subheading}
                </motion.p>
              ) : null}
              <motion.div
                className="mt-10 hidden flex-wrap items-center justify-start gap-4 md:flex"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
              >
                {hero?.ctaPrimaryLabel ? (
                  <Link to={hero.ctaPrimaryUrl ?? "/audit"} className={btnPrimary}>
                    {hero.ctaPrimaryLabel}
                  </Link>
                ) : null}
                {hero?.ctaSecondaryLabel ? (
                  <a href={hero.ctaSecondaryUrl ?? "#verticals"} className={btnOutline}>
                    {hero.ctaSecondaryLabel}
                  </a>
                ) : null}
              </motion.div>
            </div>
          </div>
        </section>
      </HeroAtmosphere>

      <main id="main">
        <AboutStatsSection />

        <div className="rm-defer-paint">
          <ManifestoSection manifesto={manifesto} />
        </div>

        <div className="rm-defer-paint">
          <VerticalsSection verticals={verticals} content={verticalsContent} />
        </div>

        <div className="rm-defer-paint">
          <TeamSection />
        </div>

        <UnifiedCTA
          title={cta?.title}
          titleAccent={cta?.titleAccent}
          primaryLabel={cta?.primaryLabel}
          primaryTo={cta?.primaryUrl}
          secondaryLabel={cta?.secondaryLabel}
          secondaryTo={cta?.secondaryUrl}
        />
      </main>

      <SiteFooter />
    </div>
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

function ManifestoSection({
  manifesto,
}: {
  manifesto: ReturnType<typeof pageSection>;
}) {
  return (
    <ManifestoQuoteSection
      tag={manifesto.tag ?? "The position"}
      titleId="manifesto-heading"
      srTitle="Manifesto"
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

  useEffect(() => {
    verticals.forEach((v) => {
      const img = new Image();
      img.src = v.img;
    });
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
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
  }, []);

  return (
    <MarketingSection id="verticals" ariaLabelledBy="verticals-heading">
      <div className={cn(sectionHeaderGrid, "md:items-stretch")}>
        <MarketingTagColumn tag={content.tag ?? "Spaces"} />
        <div className={cn("md:col-span-2", sectionHeadlineLead)}>
          <h2 id="verticals-heading" className="sr-only">
            Verticals
          </h2>
          <TextReveal
            text={content.heading ?? "Four spaces we lock into."}
            className={sectionHeadline}
          />
          {content.body ? (
            <p className={cn(bodyCopy, "reveal")} data-delay="1">
              {content.body}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        <div className="flex md:flex-col md:items-start md:pt-2">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Verticals"
            className="relative flex w-full max-w-full gap-2 overflow-x-auto rounded-full border border-white/[0.14] p-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:overflow-visible md:rounded-2xl md:gap-1 [&::-webkit-scrollbar]:hidden"
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
                    "relative z-10 shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    "md:w-full md:rounded-xl md:px-4 md:py-3 md:text-left",
                  )}
                  style={{
                    color: selected ? "var(--rm-ink)" : "var(--rm-text-muted)",
                  }}
                >
                  {!reduce && selected ? (
                    <motion.span
                      layoutId="verticals-tab-bg"
                      className="absolute inset-0 rounded-full bg-white/[0.08] md:rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  ) : selected ? (
                    <span
                      className="absolute inset-0 rounded-full bg-white/[0.08] md:rounded-xl"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative whitespace-nowrap md:whitespace-normal">{v.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <div
            role="tabpanel"
            id={`${panelId}-panel`}
            aria-labelledby={`${panelId}-tab-${sector.n}`}
            className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--rm-border-soft)] md:min-h-[360px]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={sector.n}
                className="absolute inset-0 will-change-[opacity,transform]"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, scale: 1.03, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, scale: 1.01, filter: "blur(4px)" }
                }
                transition={{
                  duration: reduce ? 0 : 0.32,
                  ease: verticalPanelEase,
                }}
              >
                <img
                  src={sector.img}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <motion.div
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
                    <h3 className={cn(sectionHeadline, "max-w-none text-white")}>
                      {sector.title}
                    </h3>
                    <p className={cn(bodyCopy, "mt-4 max-w-[44ch] text-white/75")}>
                      {sector.body}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
