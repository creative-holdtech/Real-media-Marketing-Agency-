import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { GlassPointsSection } from "@/components/glass-points-section";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Sprint & Marathon | R—M" },
      {
        name: "description",
        content:
          "Choose the level of support you need right now. Sprint from 4 weeks or Marathon from 2 months.",
      },
      { property: "og:title", content: "Products — R—M" },
      {
        property: "og:description",
        content: "Sprint from 4 weeks or Marathon from 2 months — same quality, different scope.",
      },
    ],
  }),
  component: ProductsPage,
});

const ORANGE = "#e85d3a";
const PURPLE = "#7c5cff";

const sprintDeliverables = [
  {
    title: "Positioning audit & fix",
    body: "We read everything your market sees—landing pages, decks, ads, socials—and rewrite the core pitch that should be doing 80% of the heavy lifting.",
  },
  {
    title: "Channel test stack",
    body: "Three high-probability distribution bets, deployed together over a two-week cycle. Hypothesis, creative, copy, and success metrics fully locked before launch.",
  },
  {
    title: "Conversion system review",
    body: "End-to-end funnel teardown: from first impression to signed deal. We isolate the single choke-point costing you the most and clear it.",
  },
];

const marathonDeliverables = [
  {
    title: "Market narrative architecture",
    body: "Your core message should never lose relevance. Every quarter, we analyze and update your positioning to match the current market reality.",
  },
  {
    title: "Finding new growth tracks",
    body: "Every month, we line up fresh channel and creative ideas. We track live performance, filter out the noise, and scale the top performers.",
  },
  {
    title: "Embedded Strategic Support",
    body: "Continuous C-level support for your launches, fundraises, and pivots. We operate inside your context, working alongside your core team.",
  },
];

const comparisonRows = [
  { label: "Duration", sprint: "4 + weeks", marathon: "2 + months" },
  { label: "Format", sprint: "Tactical retainer", marathon: "Strategic partnership" },
  { label: "Best for", sprint: "A defined challenge", marathon: "Full brand build or market entry" },
  { label: "Cadence", sprint: "Daily check-ins", marathon: "Weekly / Monthly strategy sessions" },
  { label: "Output", sprint: "Fixed deliverables", marathon: "Brand / GTM strategy" },
];

function ProductsPage() {
  useReveal();

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-16 max-w-[1440px] mx-auto pt-20 pb-20 border-b border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 10% 20%, rgba(232,93,58,0.14), transparent 65%), radial-gradient(45% 55% at 90% 80%, rgba(124,92,255,0.10), transparent 65%)",
          }}
        />

        <p className="reveal rm-eyebrow flex items-center gap-3 mb-10">
          <span className="text-rm-accent font-light text-[18px]">/</span>
          Products
        </p>

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
          Both formats are built around your growth. One moves faster, the other goes deeper.
          Same quality, different scope.
        </p>
      </section>

      <section
        id="sprint"
        className="relative border-b border-white/10"
        style={{ scrollMarginTop: "80px" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 65% at 85% 15%, rgba(232,93,58,0.10), transparent 60%)",
          }}
        />

        <div className="px-6 md:px-16 max-w-[1440px] mx-auto pt-20 pb-20">
          <div className="reveal flex flex-wrap items-baseline gap-5 pb-16 border-b border-white/[0.08]">
            <span
              className="text-[11px] uppercase tracking-[0.28em] px-3.5 py-1.5 rounded-full border font-medium"
              style={{ borderColor: `${ORANGE}70`, color: ORANGE }}
            >
              Sprint
            </span>
            <span className="text-[14px] tracking-wide" style={{ color: "rgba(232,230,225,0.4)" }}>
              from 4 weeks · tactical retainer
            </span>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-16 items-start pt-16 mb-20">
            <div className="col-span-12 md:col-span-7 reveal" data-delay="1">
              <h2
                className="font-medium leading-[0.97] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
              >
                High-impact marketing for fast raises and tight deadlines.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 reveal flex flex-col gap-6 pt-1" data-delay="2">
              <p className="rm-copy-lead">
                Sprint is a focused engagement with a clear scope and hard deadline. We embed into
                your workflow, deploy target channel mix, and move fast. You get weekly deliverables
                and clear data within a flexible monthly setup.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(232,230,225,0.45)" }}>
                Best suited for early-stage founders, growth leads preparing for a raise, and teams
                with solid traction looking for a breakthrough.
              </p>
            </div>
          </div>

          <GlassPointsSection
            mode="inline"
            cards={sprintDeliverables.map((d, i) => ({
              index: String(i + 1).padStart(2, "0"),
              title: d.title.toUpperCase(),
              body: d.body,
            }))}
          />
        </div>
      </section>

      <section
        id="marathon"
        className="relative border-b border-white/10"
        style={{ scrollMarginTop: "80px", background: "var(--rm-surface-raised)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 65% at 10% 75%, rgba(124,92,255,0.10), transparent 60%)",
          }}
        />

        <div className="px-6 md:px-16 max-w-[1440px] mx-auto pt-20 pb-20">
          <div className="reveal flex flex-wrap items-baseline gap-5 pb-16 border-b border-white/[0.07]">
            <span
              className="text-[11px] uppercase tracking-[0.28em] px-3.5 py-1.5 rounded-full border font-medium"
              style={{ borderColor: `${PURPLE}70`, color: PURPLE }}
            >
              Marathon
            </span>
            <span className="text-[14px] tracking-wide" style={{ color: "rgba(232,230,225,0.4)" }}>
              from 2 months strategic partnership
            </span>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-16 items-start pt-16 mb-20">
            <div className="col-span-12 md:col-span-7 reveal" data-delay="1">
              <h2
                className="font-medium leading-[0.97] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
              >
                For founders building a category beyond a product.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 reveal flex flex-col gap-6 pt-1" data-delay="2">
              <p className="rm-copy-lead">
                Marathon is a foundational growth ecosystem. We replace the need for an in-house
                department to take over the entire function — from core strategy and positioning to
                long-term multi-channel execution.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(232,230,225,0.45)" }}>
                Built for Series A+ companies, ambitious scale-ups, and teams focusing on long-term
                growth as a board-level priority.
              </p>
            </div>
          </div>

          <GlassPointsSection
            mode="inline"
            cards={marathonDeliverables.map((d, i) => ({
              index: String(i + 1).padStart(2, "0"),
              title: d.title.toUpperCase(),
              body: d.body,
            }))}
          />
        </div>
      </section>

      <section className="px-6 md:px-16 max-w-[1440px] mx-auto py-24 md:py-32">
        <div className="reveal grid grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
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
              Book a 30-minute call. We'll ask you three questions and tell you exactly which format
              makes sense — or why neither does.
            </p>
            <div className="mt-10">
              <Link to="/contact" className="rm-btn rm-btn-primary px-8 text-[13px]">
                Book a call →
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 reveal" data-delay="2">
            <div className="rm-card-floating overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="p-5 md:p-6 text-[11px] uppercase tracking-[0.2em] text-white/25 font-normal w-[35%]">
                      &nbsp;
                    </th>
                    <th
                      className="p-5 md:p-6 text-[11px] uppercase tracking-[0.2em] font-semibold"
                      style={{ color: ORANGE }}
                    >
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
                      <td
                        className="p-5 md:p-6 text-[11px] uppercase tracking-[0.16em]"
                        style={{ color: "rgba(232,230,225,0.30)" }}
                      >
                        {row.label}
                      </td>
                      <td
                        className="p-5 md:p-6 text-[13px] md:text-[14px]"
                        style={{ color: "rgba(232,230,225,0.75)" }}
                      >
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

      <SiteFooter />
    </div>
  );
}
