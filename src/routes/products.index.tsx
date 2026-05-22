import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Sprint & Marathon | R—M" },
      {
        name: "description",
        content:
          "Two formats, one goal: accelerate your growth. Choose Sprint for rapid tactical wins or Marathon for sustained strategic partnership.",
      },
      { property: "og:title", content: "Products — R—M" },
      {
        property: "og:description",
        content: "Sprint or Marathon — choose the level of support you need right now.",
      },
    ],
  }),
  component: ProductsPage,
});

/* ─────────────────────────────────────────────────────────────────────────── */

const ORANGE = "#e85d3a";
const PURPLE = "#7c5cff";

const channels = ["SMM", "PR", "SEO", "Performance", "Design"];

const sprintDeliverables = [
  {
    title: "Positioning audit & fix",
    body: "We read everything your market sees — landing page, decks, ads, social — and rewrite the single message that should be doing 80% of the work.",
  },
  {
    title: "Channel experiment stack",
    body: "Three high-probability distribution bets, scoped for two weeks each. Hypothesis, creative, copy, and success metrics defined before we touch anything.",
  },
  {
    title: "Conversion system review",
    body: "End-to-end funnel teardown: from first impression to signed deal. We identify the one choke-point costing you the most and remove it.",
  },
];

const sprintSteps = [
  { n: "01", label: "Audit" },
  { n: "02", label: "Kick-off" },
  { n: "03", label: "Execution" },
  { n: "04", label: "Report" },
];

const marathonPhases = [
  { n: "01", label: "Discovery", duration: "1–2 wks" },
  { n: "02", label: "Strategy", duration: "1 wk" },
  { n: "03", label: "Execution", duration: "ongoing" },
  { n: "04", label: "Review", duration: "monthly" },
];

const marathonVariants = [
  {
    tag: "Variant A",
    title: "Strategy only",
    sub: "We think, you ship.",
    bullets: [
      "Full Discovery & Audit",
      "90-day growth roadmap",
      "Monthly strategy sessions",
      "Slack access",
    ],
    accent: false,
  },
  {
    tag: "Variant B · Recommended",
    title: "Strategy + execution",
    sub: "We think and ship together.",
    bullets: [
      "Everything in Variant A",
      "Full channel management",
      "Creative production",
      "Weekly experiment reports",
    ],
    accent: true,
  },
];

const comparisonRows = [
  { label: "Duration",   sprint: "2 – 6 weeks",         marathon: "3 – 12 months" },
  { label: "Format",     sprint: "Tactical retainer",    marathon: "Strategic partner" },
  { label: "Entry",      sprint: "Free audit",           marathon: "Discovery call" },
  { label: "Channels",   sprint: "1–2 focused",          marathon: "Full stack" },
  { label: "Reporting",  sprint: "Weekly snapshots",      marathon: "Monthly + pivots" },
  { label: "Best for",   sprint: "One clear problem",    marathon: "Compound growth" },
];

/* ─────────────────────────────────────────────────────────────────────────── */

function ProductsPage() {
  useReveal();

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      {/* ── 4.1 HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-16 max-w-[1440px] mx-auto pt-20 pb-20 border-b border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 10% 20%, rgba(232,93,58,0.14), transparent 65%), radial-gradient(45% 55% at 90% 80%, rgba(124,92,255,0.10), transparent 65%)",
          }}
        />

        {/* slash + eyebrow */}
        <p className="reveal rm-eyebrow flex items-center gap-3 mb-10">
          <span className="text-rm-accent font-light text-[18px]">/</span>
          Products
        </p>

        {/* Heading */}
        <h1
          className="reveal font-medium leading-[0.96] tracking-[-0.04em] text-white max-w-[22ch]"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 7.5rem)" }}
          data-delay="1"
        >
          Choose the level of support{" "}
          <span className="font-light" style={{ color: "rgba(232,230,225,0.45)" }}>
            you need right now.
          </span>
        </h1>

        <p className="reveal mt-8 max-w-[50ch] rm-copy-lead" data-delay="2">
          Both formats are real work — not consulting in a vacuum. One moves fast,
          one goes deep. Same quality, different scope.
        </p>

        {/* Anchor CTAs */}
        <div className="reveal mt-14 flex flex-wrap gap-4" data-delay="3">
          <a
            href="#sprint"
            className="rm-btn rm-btn-primary px-8 text-[13px]"
          >
            Sprint →
          </a>
          <a
            href="#marathon"
            className="rm-btn rm-btn-secondary px-8 text-[13px]"
          >
            Marathon →
          </a>
        </div>

        {/* decorative big slash */}
        <div
          aria-hidden
          className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 text-[20vw] font-light leading-none select-none pointer-events-none"
          style={{ color: "rgba(232,230,225,0.04)" }}
        >
          /
        </div>
      </section>

      {/* ── 4.2 SPRINT ────────────────────────────────────────── */}
      <section
        id="sprint"
        className="relative border-b border-white/10"
        style={{ scrollMarginTop: "80px" }}
      >
        {/* accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 65% at 85% 15%, rgba(232,93,58,0.10), transparent 60%)",
          }}
        />

        {/* ── Label bar ── */}
        <div className="px-6 md:px-16 max-w-[1440px] mx-auto pt-20 pb-16">
          <div className="reveal flex flex-wrap items-baseline gap-5 pb-16 border-b border-white/[0.08]">
            <span
              className="text-[11px] uppercase tracking-[0.28em] px-3.5 py-1.5 rounded-full border font-medium"
              style={{ borderColor: `${ORANGE}70`, color: ORANGE }}
            >
              Sprint
            </span>
            <span className="text-[14px] tracking-wide" style={{ color: "rgba(232,230,225,0.4)" }}>
              від 2 тижнів · тактичний ретейнер
            </span>
          </div>

          {/* ── Statement + description ── */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-start pt-16 mb-20">
            <div className="col-span-12 md:col-span-7 reveal" data-delay="1">
              <h2
                className="font-medium leading-[0.97] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
              >
                For teams that need results{" "}
                <span className="font-light" style={{ color: "rgba(232,230,225,0.45)" }}>
                  before the next board meeting.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 reveal flex flex-col gap-6 pt-1" data-delay="2">
              <p className="rm-copy-lead">
                Sprint is a focused engagement with a clear scope and a hard deadline.
                We embed into your workflow, identify the highest-leverage lever, and
                move fast. No retainer creep, no endless discovery.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(232,230,225,0.45)" }}>
                Best suited for early-stage founders, growth leads preparing for a
                raise, and teams that have traction but can't break through to the
                next curve.
              </p>
            </div>
          </div>

          {/* ── 3 deliverable cards ── */}
          <div
            className="reveal grid grid-cols-1 md:grid-cols-3 gap-5"
            data-delay="3"
          >
            {sprintDeliverables.map((d, i) => (
              <div
                key={d.title}
                className="rm-card p-8 flex flex-col gap-7 hover:border-white/20 hover:-translate-y-0.5 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg grid place-items-center text-[12px] font-semibold tracking-[0.04em] shrink-0"
                    style={{
                      background: `${ORANGE}18`,
                      border: `1px solid ${ORANGE}45`,
                      color: ORANGE,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="h-px flex-1 opacity-20"
                    style={{ background: ORANGE }}
                  />
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-0.02em] text-white leading-tight mb-3">
                    {d.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "rgba(232,230,225,0.52)" }}>
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── FREE AUDIT callout ── */}
          <div
            className="reveal mt-10 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 rounded-2xl"
            style={{
              background: `${ORANGE}0d`,
              borderLeft: `4px solid ${ORANGE}`,
              border: `1px solid ${ORANGE}25`,
              borderLeftColor: ORANGE,
              borderLeftWidth: "4px",
            }}
            data-delay="4"
          >
            <div className="flex flex-col gap-3">
              <p
                className="text-[11px] uppercase tracking-[0.28em] font-medium"
                style={{ color: ORANGE }}
              >
                Entry point
              </p>
              <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.03em] text-white leading-tight">
                Start with a free audit.
              </h3>
              <p className="text-[15px] leading-relaxed max-w-[52ch]" style={{ color: "rgba(232,230,225,0.58)" }}>
                We look first, then propose. No commitment required — we'll tell you
                exactly what we'd fix and whether Sprint is the right format.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/audit"
                className="rm-btn px-8 text-[13px] font-semibold"
                style={{ background: ORANGE, color: "#fff" }}
              >
                Get a free audit →
              </Link>
            </div>
          </div>

          {/* ── Channel pills ── */}
          <div className="reveal mt-10 flex flex-col gap-5" data-delay="5">
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(232,230,225,0.35)" }}>
              Channels we cover
            </p>
            <div className="flex flex-wrap gap-3">
              {channels.map((ch) => (
                <span
                  key={ch}
                  className="px-5 py-2.5 rounded-full text-[13px] tracking-[0.06em] border"
                  style={{
                    borderColor: "rgba(232,230,225,0.14)",
                    color: "rgba(232,230,225,0.70)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>

          {/* ── Process stepper ── */}
          <div className="reveal mt-16" data-delay="5">
            <p className="text-[11px] uppercase tracking-[0.22em] mb-8" style={{ color: "rgba(232,230,225,0.35)" }}>
              How it works
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(232,230,225,0.08)" }}>
              {sprintSteps.map((s, i) => (
                <div
                  key={s.n}
                  className="flex flex-col gap-4 p-7 md:p-8"
                  style={{ background: "var(--rm-surface)" }}
                >
                  <span
                    className="text-[11px] font-semibold tracking-[0.18em]"
                    style={{ color: i === 0 ? ORANGE : "rgba(232,230,225,0.3)" }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="text-[17px] md:text-[19px] font-medium tracking-[-0.02em]"
                    style={{ color: i === 0 ? "#fff" : "rgba(232,230,225,0.65)" }}
                  >
                    {s.label}
                  </span>
                  {/* connector line on desktop */}
                  <div
                    className="hidden md:block h-[2px] w-8 mt-auto"
                    style={{
                      background: i < sprintSteps.length - 1
                        ? `${ORANGE}${i === 0 ? "80" : "25"}`
                        : "transparent",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Sprint CTA ── */}
          <div className="reveal mt-14 flex flex-wrap items-center gap-6" data-delay="6">
            <Link
              to="/contact"
              className="rm-btn px-8 text-[13px] font-semibold"
              style={{ background: ORANGE, color: "#fff" }}
            >
              Start a Sprint →
            </Link>
            <span
              className="text-[12px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(232,230,225,0.3)" }}
            >
              From 2 weeks
            </span>
          </div>
        </div>
      </section>

      {/* ── 4.3 MARATHON ──────────────────────────────────────── */}
      <section
        id="marathon"
        className="relative border-b border-white/10"
        style={{ scrollMarginTop: "80px", background: "var(--rm-surface-raised)" }}
      >
        {/* accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 65% at 10% 75%, rgba(124,92,255,0.10), transparent 60%)",
          }}
        />

        <div className="px-6 md:px-16 max-w-[1440px] mx-auto pt-20 pb-20">
          {/* ── Label bar ── */}
          <div className="reveal flex flex-wrap items-baseline gap-5 pb-16 border-b border-white/[0.07]">
            <span
              className="text-[11px] uppercase tracking-[0.28em] px-3.5 py-1.5 rounded-full border font-medium"
              style={{ borderColor: `${PURPLE}70`, color: PURPLE }}
            >
              Marathon
            </span>
            <span className="text-[14px] tracking-wide" style={{ color: "rgba(232,230,225,0.4)" }}>
              від 3 місяців · стратегічне партнерство
            </span>
          </div>

          {/* ── Statement ── */}
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-start pt-16 mb-20">
            <div className="col-span-12 md:col-span-7 reveal" data-delay="1">
              <h2
                className="font-medium leading-[0.97] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
              >
                For founders building a category,{" "}
                <span className="font-light" style={{ color: "rgba(232,230,225,0.45)" }}>
                  not just a product.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 reveal flex flex-col gap-6 pt-1" data-delay="2">
              <p className="rm-copy-lead">
                Marathon is a sustained strategic engagement. We become a permanent
                part of your growth team — shaping messaging, testing channels,
                iterating on positioning, and compounding learnings month over month.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(232,230,225,0.45)" }}>
                Built for Series A+ companies, ambitious scale-ups, and any team
                where growth is a board-level priority and consistency matters more
                than speed.
              </p>
            </div>
          </div>

          {/* ── Phase timeline ── */}
          <div className="reveal mb-20" data-delay="3">
            <p className="text-[11px] uppercase tracking-[0.22em] mb-8" style={{ color: "rgba(232,230,225,0.35)" }}>
              Phases
            </p>
            <div className="relative">
              {/* connecting line */}
              <div
                className="hidden md:block absolute top-7 left-[3.5rem] right-[3.5rem] h-px"
                style={{ background: `${PURPLE}30` }}
                aria-hidden
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {marathonPhases.map((p, i) => (
                  <div key={p.n} className="flex flex-col gap-3 relative">
                    {/* dot */}
                    <div
                      className="relative z-10 w-14 h-14 rounded-2xl grid place-items-center shrink-0"
                      style={{
                        background: i === 0 ? `${PURPLE}22` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${i === 0 ? `${PURPLE}60` : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <span
                        className="text-[13px] font-semibold tracking-[0.06em]"
                        style={{ color: i === 0 ? PURPLE : "rgba(232,230,225,0.35)" }}
                      >
                        {p.n}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <span
                        className="text-[17px] font-medium tracking-[-0.02em]"
                        style={{ color: i === 0 ? "#fff" : "rgba(232,230,225,0.70)" }}
                      >
                        {p.label}
                      </span>
                      <span
                        className="text-[12px] uppercase tracking-[0.14em]"
                        style={{ color: "rgba(232,230,225,0.32)" }}
                      >
                        {p.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Two variant cards ── */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-5" data-delay="4">
            {marathonVariants.map((v) => (
              <div
                key={v.tag}
                className="relative flex flex-col gap-8 p-8 md:p-10 rounded-2xl overflow-hidden"
                style={
                  v.accent
                    ? {
                        background: `${PURPLE}12`,
                        border: `1px solid ${PURPLE}40`,
                      }
                    : {
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(232,230,225,0.09)",
                      }
                }
              >
                {v.accent && (
                  <div
                    className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-semibold"
                    style={{ background: `${PURPLE}25`, color: PURPLE }}
                  >
                    Recommended
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: v.accent ? PURPLE : "rgba(232,230,225,0.38)" }}
                  >
                    {v.tag}
                  </span>
                  <h3 className="text-[26px] md:text-[32px] font-medium tracking-[-0.03em] text-white leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-[14px]" style={{ color: "rgba(232,230,225,0.50)" }}>
                    {v.sub}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {v.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-[14px] leading-relaxed"
                      style={{ color: "rgba(232,230,225,0.70)" }}
                    >
                      <span
                        className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full"
                        style={{ background: v.accent ? PURPLE : "rgba(232,230,225,0.3)" }}
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Marathon CTA ── */}
          <div className="reveal mt-14 flex flex-wrap items-center gap-6" data-delay="5">
            <Link
              to="/contact"
              className="rm-btn px-8 text-[13px] font-semibold text-white"
              style={{ background: PURPLE }}
            >
              Start Marathon →
            </Link>
            <span
              className="text-[12px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(232,230,225,0.3)" }}
            >
              From 3 months
            </span>
          </div>
        </div>
      </section>

      {/* ── 4.4 COMPARISON ────────────────────────────────────── */}
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto py-24 md:py-32">
        <div className="reveal grid grid-cols-12 gap-8 md:gap-16 items-start">
          {/* left copy */}
          <div className="col-span-12 md:col-span-4">
            <p className="rm-eyebrow mb-6">Quick comparison</p>
            <h2
              className="font-medium leading-[1.02] tracking-[-0.035em] text-white"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 3.2rem)" }}
            >
              Not sure which one fits?{" "}
              <span className="font-light" style={{ color: "rgba(232,230,225,0.45)" }}>
                Let's figure it out together.
              </span>
            </h2>
            <p className="mt-8 rm-copy-lead max-w-[40ch]">
              Book a 30-minute call. We'll ask you three questions and tell you
              exactly which format makes sense — or why neither does.
            </p>
            <div className="mt-10">
              <Link to="/contact" className="rm-btn rm-btn-primary px-8 text-[13px]">
                Book a call →
              </Link>
            </div>
          </div>

          {/* table */}
          <div className="col-span-12 md:col-span-8 reveal" data-delay="2">
            <div className="rm-card-floating overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="p-5 md:p-6 text-[11px] uppercase tracking-[0.2em] text-white/25 font-normal w-[35%]">
                      &nbsp;
                    </th>
                    <th className="p-5 md:p-6 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: ORANGE }}>
                      Sprint
                    </th>
                    <th
                      className="p-5 md:p-6 text-[11px] uppercase tracking-[0.2em] font-semibold relative"
                      style={{ color: PURPLE }}
                    >
                      <span
                        className="absolute inset-0 opacity-[0.06]"
                        style={{ background: PURPLE }}
                        aria-hidden
                      />
                      Marathon
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i < comparisonRows.length - 1 ? "border-b border-white/[0.05]" : ""}
                    >
                      <td className="p-5 md:p-6 text-[11px] uppercase tracking-[0.16em]" style={{ color: "rgba(232,230,225,0.30)" }}>
                        {row.label}
                      </td>
                      <td className="p-5 md:p-6 text-[13px] md:text-[14px]" style={{ color: "rgba(232,230,225,0.75)" }}>
                        {row.sprint}
                      </td>
                      <td
                        className="p-5 md:p-6 text-[13px] md:text-[14px] relative"
                        style={{ color: "rgba(232,230,225,0.75)" }}
                      >
                        <span
                          className="absolute inset-0 opacity-[0.04]"
                          style={{ background: PURPLE }}
                          aria-hidden
                        />
                        {row.marathon}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4.5 CTA + FOOTER ──────────────────────────────────── */}
      <UnifiedCTA
        eyebrow="Start somewhere"
        title="Don't know where to begin?"
        titleAccent="Start with the free audit."
        primaryLabel="Get a free audit"
        primaryTo="/audit"
        secondaryLabel="See case studies"
        secondaryTo="/cases"
      />
      <SiteFooter />
    </div>
  );
}
