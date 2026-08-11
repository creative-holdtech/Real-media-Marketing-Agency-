import { useCallback, useState, type KeyboardEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ChartNoAxesCombined,
  CircleDollarSign,
  Compass,
  Crosshair,
  Filter,
  Layers,
  Radar,
  Search,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import {
  BtnArrow,
  FramerTag,
  bodyCopy,
  bodyCopyStrong,
  borderSoft,
  btnOutlineOnDark,
  btnPrimary,
  engageStepCode,
  engageStepTitle,
  productsFormatColumn,
  sectionActionsInline,
  sectionContentGrid,
  sectionHeadline,
  sectionHeadlineAccent,
  sectionInner,
  sectionIntroStack,
  sectionShell,
  sectionSubheading,
  interactiveSurfaceCard,
  subsectionTitle,
  surfaceCardPadding,
  surfaceCardShell,
  textCardBody,
  textGhost,
  textMetric,
  textMeta,
  textSubtle,
  textValue,
} from "@/components/framer-section";
import { ProductsHero } from "@/components/products-hero";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { PageSectionDots } from "@/components/page-section-dots";
import { ScrollChapter } from "@/components/home-scroll-cinema";
import { buildPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => {
    const seo = buildPageHead({
      title: "Products — Sprint & Marathon | R—M",
      description: "Sprint from 4 weeks or Marathon from 2 months.",
      pathname: "/products",
    });
    return {
      meta: seo.meta,
      links: seo.links,
    };
  },
  component: ProductsPage,
});

const modes = {
  sprint: {
    tag: "Sprint",
    meta: "From 4 weeks · fixed-scope engagement",
    tempo: "One deadline",
    fitSignal: "A raise, launch, or growth blocker needs a fast reset.",
    headline: "High-impact marketing for fast raises and tight deadlines.",
    lead: "We embed into your workflow, lock the channel mix, and move against one deadline. Weekly deliverables and clear data keep the engagement focused from day one.",
    cta: "Scope a sprint →",
    format: "Fixed-scope engagement",
    bestFor: "A defined challenge",
    cadence: "Daily check-ins",
    output: "Fixed deliverables",
    notFor: "Open-ended transformation across several quarters.",
    scope: "Locked around one deadline",
    commitment: "From 4 weeks",
    proof: [
      {
        value: "$75 → $30",
        label: "Acquisition cost",
        context: "Paid acquisition rebuilt within 30 days.",
        source: "B2B paid acquisition · 30 days",
        to: "/services/performance",
        icon: CircleDollarSign,
      },
      {
        value: "2.7×",
        label: "Return on ad spend",
        context: "Achieved through a locked channel test stack.",
        source: "B2B SaaS · US market · month one",
        to: "/services/performance",
        icon: TrendingUp,
      },
      {
        value: "3×",
        label: "Daily lead volume",
        context: "CPA fell from $50 to $30 in parallel.",
        source: "Paid acquisition · 30 → 90 leads/day",
        to: "/services/performance",
        icon: UsersRound,
      },
    ],
    deliverables: [
      {
        code: "01",
        phase: "Week 01",
        title: "Positioning audit & fix",
        body: "Audit pages, decks, ads, and socials. Rewrite the core pitch your market should remember.",
        icon: Crosshair,
      },
      {
        code: "02",
        phase: "Weeks 02–03",
        title: "Channel test stack",
        body: "Run three high-probability channel bets with hypothesis, creative, copy, and success metrics locked before launch.",
        icon: Layers,
      },
      {
        code: "03",
        phase: "Week 04",
        title: "Conversion review",
        body: "Trace the funnel from first impression to signed deal, isolate the main choke point, and clear it.",
        icon: Filter,
      },
    ] satisfies Array<{
      code: string;
      phase: string;
      title: string;
      body: string;
      icon: LucideIcon;
    }>,
  },
  marathon: {
    tag: "Marathon",
    meta: "From 2 months · embedded partnership",
    tempo: "Ongoing growth system",
    fitSignal: "You need an embedded partner shaping GTM over quarters, not a one-off project.",
    headline: "For founders building a category beyond a product.",
    lead: "We work as an embedded growth function across positioning, GTM, and execution. Strategy and channel decisions compound quarter after quarter.",
    cta: "Start a marathon →",
    format: "Embedded partnership",
    bestFor: "Full brand build or market entry",
    cadence: "Weekly / monthly strategy",
    output: "Brand / GTM strategy",
    notFor: "A single urgent execution request with no wider mandate.",
    scope: "Reprioritized as evidence changes",
    commitment: "From 2 months",
    proof: [
      {
        value: "2.3×",
        label: "Pipeline growth",
        context: "Inbound more than doubled on a flat paid budget.",
        source: "SEO growth · six months · flat paid budget",
        to: "/services/seo",
        icon: ChartNoAxesCombined,
      },
      {
        value: "30–50%",
        label: "Organic MQL share",
        context: "Organic search became a primary acquisition engine.",
        source: "Organic search · six-month system",
        to: "/services/seo",
        icon: Search,
      },
      {
        value: "10% → 25%",
        label: "Brand awareness",
        context: "Built through systematic market communication.",
        source: "Brand strategy · systematic communication",
        to: "/services/brand",
        icon: Radar,
      },
    ],
    deliverables: [
      {
        code: "01",
        phase: "Month 01",
        title: "Market narrative",
        body: "Refresh positioning each quarter so the core message stays relevant to the market you are actually in.",
        icon: Compass,
      },
      {
        code: "02",
        phase: "Monthly",
        title: "Growth tracks",
        body: "Line up fresh channel and creative bets each month, cut the noise, and scale what performs.",
        icon: TrendingUp,
      },
      {
        code: "03",
        phase: "Ongoing",
        title: "Embedded support",
        body: "Keep C-level marketing support inside your context for launches, raises, pivots, and the work between them.",
        icon: UsersRound,
      },
    ] satisfies Array<{
      code: string;
      phase: string;
      title: string;
      body: string;
      icon: LucideIcon;
    }>,
  },
} as const;

type Mode = keyof typeof modes;

const modePanelVariants: Record<Mode, Variants> = {
  sprint: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.24, ease: [0.2, 0, 0, 1] },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: { duration: 0.11, ease: [0.4, 0, 1, 1] },
    },
  },
  marathon: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.46, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      y: -6,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
    },
  },
};

const modePanelReducedVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 1, transition: { duration: 0 } },
};

const inViewRevealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.4, 0, 0.2, 1] },
  },
};

const deliverableMotion = {
  sprint: {
    offset: 8,
    duration: 0.24,
    initialDelay: 0.03,
    stagger: 0.045,
    ease: [0.2, 0, 0, 1],
  },
  marathon: {
    offset: 14,
    duration: 0.42,
    initialDelay: 0.06,
    stagger: 0.09,
    ease: [0.4, 0, 0.2, 1],
  },
} as const;

const tempoButtonTap = { scale: 0.995 };
const comparisonButtonHover = { y: -1 };
const comparisonButtonTap = { scale: 0.98 };
const comparisonCellHover = { x: 3 };
const quickInteractionTransition = { duration: 0.12, ease: [0.4, 0, 0.2, 1] as const };
const activeMarkerInitial = { opacity: 0, scaleX: 0 };
const activeMarkerAnimate = { opacity: 1, scaleX: 1 };
const activeMarkerExit = { opacity: 0, scaleX: 0.7 };
const activeMarkerTransition = { duration: 0.24, ease: [0.4, 0, 0.2, 1] as const };

const MODE_PANEL_ID = "format-panel";

const productsPageDots = [
  { id: "products-top", label: "Intro" },
  { id: "format", label: "Formats" },
  { id: "compare", label: "Comparison" },
  { id: "cta", label: "Call" },
] as const;

const comparisonRows = [
  {
    label: "Best when",
    sprint: modes.sprint.bestFor,
    marathon: modes.marathon.bestFor,
  },
  {
    label: "Not designed for",
    sprint: modes.sprint.notFor,
    marathon: modes.marathon.notFor,
  },
  {
    label: "Team rhythm",
    sprint: modes.sprint.cadence,
    marathon: modes.marathon.cadence,
  },
  {
    label: "Scope",
    sprint: modes.sprint.scope,
    marathon: modes.marathon.scope,
  },
  {
    label: "Commitment",
    sprint: modes.sprint.commitment,
    marathon: modes.marathon.commitment,
  },
] as const;

const MODE_ORDER: Mode[] = ["sprint", "marathon"];

const tempoEndpoints = {
  sprint: { metric: "4W+", caption: "Hard deadline" },
  marathon: { metric: "2M+", caption: "Compounding system" },
} as const;

function TempoRailSelector({ active, onChange }: { active: Mode; onChange: (mode: Mode) => void }) {
  const reduce = useReducedMotion();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const index = MODE_ORDER.indexOf(active);
      if (index < 0) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const nextMode = MODE_ORDER[(index + 1) % MODE_ORDER.length];
        onChange(nextMode);
        document.getElementById(`mode-tab-${nextMode}`)?.focus();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const nextMode = MODE_ORDER[(index - 1 + MODE_ORDER.length) % MODE_ORDER.length];
        onChange(nextMode);
        document.getElementById(`mode-tab-${nextMode}`)?.focus();
      }
    },
    [active, onChange],
  );

  return (
    <div
      role="radiogroup"
      aria-label="Choose engagement format"
      className="rm-products-tempo-selector"
    >
      {MODE_ORDER.map((mode) => {
        const data = modes[mode];
        const isActive = active === mode;
        const descriptor = tempoEndpoints[mode];
        return (
          <m.button
            key={mode}
            type="button"
            id={`mode-tab-${mode}`}
            role="radio"
            aria-checked={isActive}
            aria-controls={MODE_PANEL_ID}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(mode)}
            onKeyDown={handleKeyDown}
            className={cn(
              "rm-products-tempo-option rm-touch cursor-pointer text-left",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black",
              isActive && "rm-products-tempo-option--active",
            )}
            data-mode={mode}
            whileTap={reduce ? undefined : tempoButtonTap}
            transition={quickInteractionTransition}
          >
            <span className="rm-products-tempo-option__copy">
              <span className={cn("rm-products-tempo-option__title", subsectionTitle)}>
                {data.tag}
              </span>
              <span className={cn("rm-products-tempo-option__metric", textValue)}>
                {descriptor.metric}
              </span>
            </span>

            <span className="rm-products-tempo-option__visual">
              <span className={cn("rm-products-tempo-option__caption", textMeta, textSubtle)}>
                {descriptor.caption}
              </span>
            </span>
          </m.button>
        );
      })}
    </div>
  );
}

function DeliverablesRail({ mode, reduce }: { mode: Mode; reduce: boolean }) {
  const data = modes[mode];
  const motion = deliverableMotion[mode];

  return (
    <section aria-labelledby={`deliverables-${mode}`} className="rm-products-deliverables">
      <h4
        id={`deliverables-${mode}`}
        className={cn("rm-products-block-label", textMeta, textSubtle)}
      >
        Included in the engagement
      </h4>
      <div className="rm-products-deliverables__grid">
        {data.deliverables.map((item, index) => {
          const Icon = item.icon;
          return (
            <m.article
              key={item.title}
              className="rm-products-deliverable group"
              initial={reduce ? false : { opacity: 0, y: motion.offset }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: motion.duration,
                delay: motion.initialDelay + index * motion.stagger,
                ease: motion.ease,
              }}
            >
              <div className="rm-products-deliverable__phase">
                <span className={engageStepCode}>{item.code}</span>
                <Icon
                  aria-hidden
                  size={18}
                  strokeWidth={1.5}
                  className="rm-products-deliverable__icon"
                />
              </div>
              <span className={cn("rm-products-deliverable__phase-label", textMeta, textSubtle)}>
                {item.phase}
              </span>
              <h5 className={cn("rm-products-deliverable__title", engageStepTitle)}>{item.title}</h5>
              <p className={bodyCopy}>{item.body}</p>
            </m.article>
          );
        })}
      </div>
    </section>
  );
}

// "2.7×" → digits + a smaller, baseline-aligned "×" span so the multiplier
// sign doesn't float high above the numeral (client QA: "× по низу").
function formatProofValue(value: string) {
  const match = value.match(/^(.*\d)(×)$/);
  if (!match) return value;
  const [, digits, sign] = match;
  return (
    <>
      {digits}
      <span className="rm-products-proof-card__value-suffix">{sign}</span>
    </>
  );
}

function ProofRow({ mode }: { mode: Mode }) {
  const data = modes[mode];

  return (
    <section aria-labelledby={`proof-${mode}`} className="rm-products-proof">
      <h4 id={`proof-${mode}`} className={cn("rm-products-block-label", textMeta, textSubtle)}>
        Client results
      </h4>
      <div className="rm-products-proof__grid">
        {data.proof.map((stat) => {
          const Icon = stat.icon as LucideIcon;
          return (
            <Link
              key={stat.label}
              to={stat.to}
              aria-label={`${stat.label}: ${stat.value}. ${stat.source}`}
              className={cn(
                "rm-products-proof-card group flex flex-col",
                surfaceCardShell,
                interactiveSurfaceCard,
                surfaceCardPadding,
                "hover:border-[var(--rm-border-soft)]",
              )}
            >
              <div className="rm-products-proof-card__label-row">
                <Icon aria-hidden size={16} strokeWidth={1.5} className="rm-products-proof-card__icon" />
                <span className={textMeta}>{stat.label}</span>
              </div>
              <p className={cn("rm-products-proof-card__value", textMetric)}>
                {formatProofValue(stat.value)}
              </p>
              <p className={cn("rm-products-proof-card__context", bodyCopy, textSubtle)}>
                {stat.context}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function TempoDetails({ mode }: { mode: Mode }) {
  const data = modes[mode];
  const reduce = Boolean(useReducedMotion());
  const panelVariants = reduce ? modePanelReducedVariants : modePanelVariants[mode];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={mode}
        id={MODE_PANEL_ID}
        role="region"
        aria-labelledby={`mode-tab-${mode}`}
        aria-live="polite"
        className="rm-products-tempo-detail"
        data-mode={mode}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <header className="rm-products-format-summary">
          <p className={cn("rm-products-format-summary__meta", textMeta, textGhost)}>
            {data.tempo}
          </p>
          <h3 className={cn("rm-products-format-summary__title", subsectionTitle)}>
            {data.headline}
          </h3>
          <p className={cn("rm-products-format-summary__lead", bodyCopy, textSubtle)}>{data.lead}</p>
        </header>

        <DeliverablesRail mode={mode} reduce={reduce} />

        <ProofRow mode={mode} />

        <div className="rm-products-format-cta">
          <Link to="/contact" className={cn(btnPrimary, "group gap-2")}>
            {data.cta.replace(/\s*→$/, "")}
            <BtnArrow />
          </Link>
        </div>
      </m.div>
    </AnimatePresence>
  );
}

function TempoStickyRail({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  const data = modes[mode];
  const reduce = Boolean(useReducedMotion());
  const panelVariants = reduce ? modePanelReducedVariants : modePanelVariants[mode];

  return (
    <aside className="rm-products-tempo-sticky">
      <TempoRailSelector active={mode} onChange={onChange} />
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={mode}
          className="rm-products-tempo-sidebar-context"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="rm-products-tempo-detail__decision">
            <p className={cn("m-0", textMeta, textSubtle)}>Best when</p>
            <p className={cn("rm-products-tempo-detail__best", bodyCopyStrong)}>{data.fitSignal}</p>
          </div>
        </m.div>
      </AnimatePresence>
    </aside>
  );
}

function TempoWorkspace({
  mode,
  onChange,
  intro,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
  intro: ReactNode;
}) {
  return (
    <div className="rm-products-tempo-workspace">
      <div className="rm-products-tempo-rail-col">
        <FramerTag className="w-fit shrink-0 self-start">Engagement formats</FramerTag>
        <TempoStickyRail mode={mode} onChange={onChange} />
      </div>
      <div className="rm-products-tempo-main">
        {intro}
        <TempoDetails mode={mode} />
      </div>
    </div>
  );
}

function ComparisonTable({ active, onChange }: { active: Mode; onChange: (mode: Mode) => void }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <>
      <div className="rm-comparison-mobile-selector" aria-label="Highlight a format">
        {MODE_ORDER.map((mode) => {
          const data = modes[mode];
          const isActive = active === mode;

          return (
            <m.button
              key={mode}
              type="button"
              aria-pressed={isActive}
              className={cn(
                "rm-comparison-mobile-selector__button",
                isActive && "rm-comparison-mobile-selector__button--active",
              )}
              onClick={() => onChange(mode)}
              whileTap={reduce ? undefined : comparisonButtonTap}
              transition={quickInteractionTransition}
            >
              <span className="flex flex-col gap-2">
                <span className={bodyCopyStrong}>{data.tag}</span>
                <span className={cn(textMeta, textSubtle)}>{data.tempo}</span>
              </span>
            </m.button>
          );
        })}
      </div>

      <div className="rm-comparison-card">
        <table className="rm-comparison-table w-full border-collapse">
          <caption className="sr-only">
            Compare Sprint and Marathon engagement formats. The selected format is visually
            highlighted.
          </caption>
          <colgroup>
            <col className="rm-comparison-table__label-col" />
            <col className="rm-comparison-table__value-col" />
            <col className="rm-comparison-table__value-col" />
          </colgroup>
          <thead>
            <tr className={cn("border-b", borderSoft)}>
              <th className="text-left align-middle" scope="col">
                <span className={cn(textMeta, textGhost)}>Decision lens</span>
              </th>
              {MODE_ORDER.map((mode) => {
                const data = modes[mode];
                const isActive = active === mode;

                return (
                  <th key={mode} className="text-left align-middle" scope="col">
                    <m.button
                      type="button"
                      aria-pressed={isActive}
                      aria-controls={MODE_PANEL_ID}
                      className={cn(
                        "rm-comparison-table__mode-button",
                        isActive && "rm-comparison-table__mode-button--active",
                      )}
                      onClick={() => onChange(mode)}
                      whileHover={reduce ? undefined : comparisonButtonHover}
                      whileTap={reduce ? undefined : comparisonButtonTap}
                      transition={quickInteractionTransition}
                    >
                      <span className="flex flex-col gap-2">
                        <span className={subsectionTitle}>{data.tag}</span>
                        <span className={cn(textCardBody, textSubtle)}>{data.tempo}</span>
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <m.span
                            key={`comparison-marker-${mode}`}
                            aria-hidden
                            className="rm-comparison-table__active-marker"
                            initial={reduce ? false : activeMarkerInitial}
                            animate={activeMarkerAnimate}
                            exit={activeMarkerExit}
                            transition={activeMarkerTransition}
                          />
                        )}
                      </AnimatePresence>
                    </m.button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label} className={cn("border-b", borderSoft, "last:border-b-0")}>
                <th scope="row" className={cn("text-left align-middle", textMeta, textGhost)}>
                  {row.label}
                </th>
                {MODE_ORDER.map((mode) => (
                  <td
                    key={mode}
                    data-col={modes[mode].tag}
                    aria-label={`${modes[mode].tag}: ${row[mode]}`}
                    className={cn(
                      "rm-comparison-table__cell align-middle",
                      active === mode && "rm-comparison-table__cell--active",
                    )}
                  >
                    <m.span
                      className={cn(
                        "rm-comparison-table__value",
                        textValue,
                        row.label === "Best when" && "rm-type-body-strong",
                      )}
                      whileHover={reduce ? undefined : comparisonCellHover}
                      transition={quickInteractionTransition}
                    >
                      {row[mode]}
                    </m.span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductsPage() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("sprint");
  const activeMode = modes[mode];

  return (
    <LazyMotion features={domAnimation}>
      <div className="rm-page rm-products-page selection:bg-rm-accent selection:text-black">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PageSectionDots sections={productsPageDots} />
        <SiteHeader variant="dark" overlay />

        <ProductsHero
          titleLines={["One deadline or", "a growth system."]}
          body="Sprint focuses the work around one hard deadline. Marathon embeds the same engine into your team and compounds it over time."
          actions={
            <>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("format")
                    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
                }
                className={cn(btnPrimary, "group gap-2")}
              >
                Compare formats
                <BtnArrow className="rotate-90" />
              </button>
              <Link to="/cases" className={cn(btnOutlineOnDark, "group gap-2")}>
                See case studies
                <BtnArrow />
              </Link>
            </>
          }
        />

        <main id="main">
          <section
            id="format"
            aria-labelledby="format-heading"
            className={cn(sectionShell, "relative bg-black rm-products-format")}
            style={{ scrollMarginTop: "var(--rm-header-offset)" }}
          >
            <div className={sectionInner}>
              <TempoWorkspace
                mode={mode}
                onChange={setMode}
                intro={
                  <div className={sectionIntroStack}>
                    <h2 id="format-heading" className={sectionHeadline}>
                      <span className="block">Pick the working rhythm</span>
                      <span className={sectionHeadlineAccent}>that fits the moment.</span>
                    </h2>
                    <p className={cn(sectionSubheading, "m-0 text-[var(--rm-text-muted)]")}>
                      Sprint for one hard deadline. Marathon for a growth system that compounds.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <m.section
            id="compare"
            aria-labelledby="compare-heading"
            className={cn(sectionShell, "relative bg-black")}
            style={{ scrollMarginTop: "var(--rm-header-offset)" }}
            variants={inViewRevealVariants}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={{ once: true, amount: 0.16 }}
          >
            <div className={sectionInner}>
              <div className={cn(sectionContentGrid, "items-start")}>
                <div className="md:col-start-1">
                  <FramerTag>Compare formats</FramerTag>
                </div>

                <div className={cn(productsFormatColumn, "md:col-span-2 md:col-start-2")}>
                  <div className={sectionIntroStack}>
                    <h2 id="compare-heading" className={sectionHeadline}>
                      <span className="block">One engine,</span>
                      <span className={sectionHeadlineAccent}>two tempos.</span>
                    </h2>
                    <p className={cn(sectionSubheading, "rm-copy-standfirst--band m-0")}>
                      Sprint points everything at a single deadline. Marathon compounds the same
                      work quarter after quarter. Choose by the decision in front of you.
                    </p>
                  </div>

                  <ComparisonTable active={mode} onChange={setMode} />

                  <div className={sectionActionsInline}>
                    <Link to="/contact" className={cn(btnPrimary, "group gap-2")}>
                      Discuss {activeMode.tag}
                      <BtnArrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </m.section>

          <ScrollChapter variant="reveal">
            <UnifiedCTA
              title={
                mode === "sprint" ? "Ready to tackle the deadline?" : "Ready to build the system?"
              }
              titleAccent={
                mode === "sprint"
                  ? "Bring us the blocked growth problem. We’ll define the scope, lock the deadline, and tell you what can ship."
                  : "Bring us the growth mandate. We’ll map the operating model, priorities, and first quarter together."
              }
              primaryLabel={activeMode.cta.replace(/\s*→$/, "")}
              primaryTo="/contact"
              secondaryLabel="See case studies"
              secondaryTo="/cases"
            />
          </ScrollChapter>
        </main>

        <SiteFooter />
      </div>
    </LazyMotion>
  );
}
