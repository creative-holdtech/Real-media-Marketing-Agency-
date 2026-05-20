import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
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

function ProductsPage() {
  useReveal();

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      {/* ── HERO ~70vh ──────────────────────────────────────── */}
      <section
        className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-32 pb-24 md:pb-32 min-h-[70vh] flex flex-col justify-center border-b border-white/10"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(55% 65% at 15% 25%, rgba(232,93,58,0.16), transparent 68%), radial-gradient(50% 60% at 85% 75%, rgba(124,92,255,0.14), transparent 68%)",
          }}
        />

        <p className="reveal rm-eyebrow mb-8">Products</p>

        <h1 className="reveal rm-title-hero max-w-[18ch]" data-delay="1">
          Choose the level of support{" "}
          <span className="font-light text-white/60">you need right now.</span>
        </h1>

        <p className="reveal mt-8 max-w-[52ch] rm-copy-lead" data-delay="2">
          Both formats are built around your growth — one moves fast, one goes deep. Same quality,
          different scope.
        </p>

        <div className="reveal mt-14 flex flex-wrap gap-4" data-delay="3">
          <a
            href="#sprint"
            className="rm-btn rm-btn-primary px-8 text-[14px] font-medium tracking-[-0.01em]"
          >
            Sprint →
          </a>
          <a
            href="#marathon"
            className="rm-btn rm-btn-secondary px-8 text-[14px] font-medium tracking-[-0.01em]"
          >
            Marathon →
          </a>
        </div>
      </section>

      {/* ── SPRINT ──────────────────────────────────────────── */}
      <section
        id="sprint"
        className="relative px-6 md:px-12 max-w-[1440px] mx-auto py-28 md:py-40 border-b border-white/10"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(50% 70% at 80% 30%, rgba(232,93,58,0.12), transparent 65%)",
          }}
        />

        {/* Label + subtitle */}
        <div className="reveal flex flex-wrap items-baseline gap-4 mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.28em] px-3 py-1 rounded-full border"
            style={{ borderColor: "rgba(232,93,58,0.6)", color: "#e85d3a" }}
          >
            Sprint
          </span>
          <span className="text-[14px] text-white/45 tracking-wide">
            від 2 тижнів · тактичний ретейнер
          </span>
        </div>

        {/* Statement */}
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-start mb-24">
          <div className="col-span-12 md:col-span-7 reveal" data-delay="1">
            <h2 className="rm-title-section max-w-[16ch]">
              For teams that need{" "}
              <span className="font-light text-white/55">results before the next board meeting.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 reveal flex flex-col gap-8 pt-2" data-delay="2">
            <p className="rm-copy-lead max-w-[44ch]">
              Sprint is a focused engagement with a clear scope and a hard deadline. We embed into
              your workflow, identify the single highest-leverage lever, and move fast. No retainer
              creep, no endless discovery.
            </p>
            <p className="rm-copy-lead text-white/50 max-w-[44ch]">
              Best suited for early-stage founders, growth leads preparing for a raise, and teams
              that have traction but can't break through to the next curve.
            </p>
          </div>
        </div>

        {/* 3-col deliverables */}
        <div
          className="reveal grid grid-cols-1 md:grid-cols-3 gap-5 [grid-auto-flow:dense]"
          data-delay="3"
        >
          {sprintDeliverables.map((d, i) => (
            <div
              key={d.title}
              className="rm-card p-7 md:p-8 flex flex-col gap-6 hover:border-white/20 hover:-translate-y-0.5 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="w-10 h-10 rounded-xl grid place-items-center text-[18px] font-medium"
                style={{
                  background: "rgba(232,93,58,0.12)",
                  border: "1px solid rgba(232,93,58,0.35)",
                  color: "#e85d3a",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-[19px] md:text-[22px] font-medium tracking-[-0.02em] text-white leading-tight mb-3">
                  {d.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-white/55 leading-relaxed">
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sprint CTA */}
        <div className="reveal mt-14 flex items-center gap-6" data-delay="4">
          <Link
            to="/contact"
            className="rm-btn rm-btn-primary px-8 text-[14px] font-medium"
          >
            Start a Sprint →
          </Link>
          <span className="text-[12px] text-white/35 uppercase tracking-[0.18em]">
            From 2 weeks
          </span>
        </div>
      </section>

      {/* ── MARATHON ────────────────────────────────────────── */}
      <section
        id="marathon"
        className="relative px-6 md:px-12 max-w-[1440px] mx-auto py-28 md:py-40 border-b border-white/10"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(50% 70% at 15% 60%, rgba(124,92,255,0.12), transparent 65%)",
          }}
        />

        {/* Label + subtitle */}
        <div className="reveal flex flex-wrap items-baseline gap-4 mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.28em] px-3 py-1 rounded-full border"
            style={{ borderColor: "rgba(124,92,255,0.6)", color: "#7c5cff" }}
          >
            Marathon
          </span>
          <span className="text-[14px] text-white/45 tracking-wide">
            від 3 місяців · стратегічне партнерство
          </span>
        </div>

        {/* Statement */}
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-start mb-24">
          <div className="col-span-12 md:col-span-7 reveal" data-delay="1">
            <h2 className="rm-title-section max-w-[16ch]">
              For founders building{" "}
              <span className="font-light text-white/55">a category, not just a product.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 reveal flex flex-col gap-8 pt-2" data-delay="2">
            <p className="rm-copy-lead max-w-[44ch]">
              Marathon is a sustained strategic engagement. We become a permanent part of your
              growth team — shaping messaging, testing channels, iterating on positioning, and
              compounding learnings month over month.
            </p>
            <p className="rm-copy-lead text-white/50 max-w-[44ch]">
              Built for Series A+ companies, ambitious scale-ups, and any team where growth is a
              board-level priority and consistency matters more than speed.
            </p>
          </div>
        </div>

        {/* 3-col deliverables */}
        <div
          className="reveal grid grid-cols-1 md:grid-cols-3 gap-5 [grid-auto-flow:dense]"
          data-delay="3"
        >
          {marathonDeliverables.map((d, i) => (
            <div
              key={d.title}
              className="rm-card p-7 md:p-8 flex flex-col gap-6 hover:border-white/20 hover:-translate-y-0.5 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="w-10 h-10 rounded-xl grid place-items-center text-[18px] font-medium"
                style={{
                  background: "rgba(124,92,255,0.12)",
                  border: "1px solid rgba(124,92,255,0.35)",
                  color: "#7c5cff",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-[19px] md:text-[22px] font-medium tracking-[-0.02em] text-white leading-tight mb-3">
                  {d.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-white/55 leading-relaxed">
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Marathon CTA */}
        <div className="reveal mt-14 flex items-center gap-6" data-delay="4">
          <Link
            to="/contact"
            className="rm-btn px-8 text-[14px] font-medium text-white"
            style={{ background: "#7c5cff" }}
          >
            Start Marathon →
          </Link>
          <span className="text-[12px] text-white/35 uppercase tracking-[0.18em]">
            From 3 months
          </span>
        </div>
      </section>

      {/* ── COMPARISON DIVIDER ──────────────────────────────── */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32">
        <div className="reveal grid grid-cols-12 gap-6 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-5">
            <p className="rm-eyebrow mb-6">Not sure which one fits?</p>
            <h2 className="text-[36px] md:text-[52px] font-medium tracking-[-0.03em] leading-[1.05]">
              Let's figure it out{" "}
              <span className="font-light text-white/50">together.</span>
            </h2>
            <p className="mt-8 rm-copy-lead max-w-[44ch]">
              Book a 30-minute call. We'll ask you three questions and tell you exactly which format
              makes sense — or why neither does.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="rm-btn rm-btn-primary px-8 text-[14px] font-medium"
              >
                Book a call →
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 reveal" data-delay="2">
            <div className="rm-card-floating overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-[11px] uppercase tracking-[0.2em] text-white/30 font-normal w-[38%]">
                      &nbsp;
                    </th>
                    <th className="p-5 text-[11px] uppercase tracking-[0.2em] font-normal" style={{ color: "#e85d3a" }}>
                      Sprint
                    </th>
                    <th className="p-5 text-[11px] uppercase tracking-[0.2em] font-normal" style={{ color: "#7c5cff" }}>
                      Marathon
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i < comparisonRows.length - 1 ? "border-b border-white/[0.07]" : ""}
                    >
                      <td className="p-5 text-[12px] uppercase tracking-[0.15em] text-white/35">
                        {row.label}
                      </td>
                      <td className="p-5 text-[14px] text-white/80">{row.sprint}</td>
                      <td className="p-5 text-[14px] text-white/80">{row.marathon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

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

const marathonDeliverables = [
  {
    title: "Ongoing narrative architecture",
    body: "Your story evolves as you grow. Every quarter we audit what the market hears, update the core narrative, and cascade it across all touchpoints.",
  },
  {
    title: "Monthly growth experiments",
    body: "A rolling backlog of channel and creative experiments, prioritised by expected uplift. We run them, measure them, and compound the learnings.",
  },
  {
    title: "Embedded strategic advisory",
    body: "Slack access, weekly calls, and a seat at the table for product launches, fundraises, and pivots. We think alongside your team, not just for them.",
  },
];

const comparisonRows = [
  { label: "Duration",   sprint: "2 – 6 weeks",    marathon: "3 – 12 months" },
  { label: "Format",     sprint: "Tactical retainer", marathon: "Strategic partner" },
  { label: "Best for",   sprint: "One clear problem", marathon: "Compound growth" },
  { label: "Cadence",    sprint: "Daily check-ins",  marathon: "Weekly strategy calls" },
  { label: "Output",     sprint: "Fixed deliverables", marathon: "Rolling experiment log" },
];
