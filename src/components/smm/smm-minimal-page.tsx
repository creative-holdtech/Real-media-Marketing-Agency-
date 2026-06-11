import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/motion-bits";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cn } from "@/lib/utils";

import { smmCaseStudies, smmHeadlineMetrics, smmOutcomes, smmServices } from "./smm-content";
import "./smm-minimal.css";

const tagTone = ["mm-tag--blue", "mm-tag--green", "mm-tag--yellow"] as const;

function DeliverableTags({ items, toneIndex }: { items: string[]; toneIndex: number }) {
  const tone = tagTone[toneIndex % tagTone.length];
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <span className={cn("mm-tag", tone)}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseRow({
  index,
  category,
  title,
  client,
  challenge,
  solution,
  quote,
  heroValue,
  heroLabel,
}: {
  index: number;
  category: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  quote: string;
  heroValue: string;
  heroLabel: string;
}) {
  return (
    <Reveal delay={index * 0.06} y={12} duration={0.55}>
      <article className="mm-divider grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-16 md:py-16">
        <div className="md:col-span-4">
          <span className="mm-tag mm-tag--red">{category}</span>
          <p className="mm-metric mt-8">{heroValue}</p>
          <p className="mt-3 text-sm text-[var(--mm-muted)]">{heroLabel}</p>
        </div>
        <div className="md:col-span-8">
          <h3 className="mm-display text-[28px] md:text-[34px]">{title}</h3>
          <p className="mt-2 text-sm text-[var(--mm-muted)]">{client}</p>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="mm-eyebrow">Challenge</dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-[var(--mm-muted)]">
                {challenge}
              </dd>
            </div>
            <div>
              <dt className="mm-eyebrow">Solution</dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-[var(--mm-muted)]">{solution}</dd>
            </div>
          </dl>
          <blockquote className="mm-display mt-10 text-[20px] leading-[1.3] md:text-[22px]">
            {quote}
          </blockquote>
        </div>
      </article>
    </Reveal>
  );
}

export function SmmMinimalPage() {
  return (
    <div className="smm-minimal min-h-screen selection:bg-[#f5f4f0] selection:text-black">
      <div className="mm-ambient" aria-hidden />
      <div className="mm-shell">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#f5f4f0] focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>

        <SiteHeader variant="dark" />

        <main id="main">
          {/* Hero + metrics bento */}
          <section
            aria-labelledby="smm-title"
            className="border-b border-[var(--mm-border)] px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-32"
          >
            <div className="mx-auto max-w-5xl">
              <Reveal duration={0.5}>
                <Link
                  to="/services"
                  className="mm-eyebrow transition-colors hover:text-[var(--mm-ink)]"
                >
                  All services
                </Link>
              </Reveal>

              <div className="mm-bento mt-10 md:mt-12 md:grid-cols-12">
                <Reveal className="md:col-span-8 md:row-span-2" delay={0.04} duration={0.55}>
                  <p className="mm-eyebrow">SMM · Social media</p>
                  <h1
                    id="smm-title"
                    className="mm-display mt-4 text-[44px] sm:text-[56px] md:text-[72px]"
                  >
                    Be seen.
                  </h1>
                  <p className="mm-body mt-8">
                    You may not believe social impacts your deals. That is fine — we can show you.
                    If you only want posting to simulate activity, that is not our work.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Link to="/audit" hash="audit-form" className="mm-btn-primary">
                      Book free SMM audit
                    </Link>
                    <a href="#services" className="mm-btn-secondary">
                      View services
                    </a>
                  </div>
                </Reveal>

                <Reveal
                  className="mm-card hidden min-h-[140px] p-6 md:col-span-4 md:flex md:flex-col md:justify-between"
                  delay={0.08}
                  duration={0.5}
                >
                  <p className="mm-eyebrow">Operating</p>
                  <p className="mm-mono text-[13px] leading-relaxed text-[var(--mm-muted)]">
                    EU · MENA
                    <br />
                    Strategy → live → proof
                  </p>
                </Reveal>

                <div className="mm-bento mt-10 md:col-span-12 sm:grid-cols-2 lg:grid-cols-4">
                  {smmHeadlineMetrics.map((m, i) => (
                    <Reveal
                      key={m.label}
                      delay={0.1 + i * 0.04}
                      className="mm-card px-6 py-7 md:py-8"
                      duration={0.5}
                    >
                      <p className="mm-metric">{m.value}</p>
                      <p className="mt-3 text-sm leading-snug text-[var(--mm-muted)]">{m.label}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Position */}
          <section className="border-b border-[var(--mm-border)] px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-5xl">
              <Reveal duration={0.5}>
                <p className="mm-eyebrow">Position</p>
                <h2 className="mm-display mt-6 max-w-3xl text-[32px] md:text-[44px]">
                  Social built for comms, reputation, and sales — not vanity posting.
                </h2>
                <p className="mm-body mt-8">
                  Platforms are chosen for where your buyers are. Decision-makers should see a
                  partner, not a generic feed. Strategy, production, and reporting sit in one team;
                  hypotheses are tested every quarter.
                </p>
              </Reveal>
            </div>
          </section>

          {/* Services */}
          <section id="services" aria-labelledby="smm-services-heading" className="px-6 md:px-10">
            <div className="mx-auto max-w-5xl py-20 md:py-24">
              <Reveal duration={0.5}>
                <p className="mm-eyebrow">Services</p>
                <h2
                  id="smm-services-heading"
                  className="mm-display mt-4 text-[32px] md:text-[40px]"
                >
                  Expert services that move your pipeline forward.
                </h2>
              </Reveal>
            </div>

            {smmServices.map((service, i) => (
              <article key={service.n} className="mm-divider">
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:gap-14 md:px-10 md:py-20">
                  <Reveal className="md:col-span-3" duration={0.5}>
                    <p className="mm-mono text-sm text-[var(--mm-muted)]">{service.n}</p>
                    <p className="mm-eyebrow mt-4">{service.kicker}</p>
                  </Reveal>
                  <Reveal className="md:col-span-9" delay={0.05} duration={0.5}>
                    <h3 className="mm-display text-[26px] md:text-[30px]">{service.title}</h3>
                    <p className="mm-body mt-5">{service.body}</p>
                    <DeliverableTags items={service.deliverables} toneIndex={i} />
                    {service.note ? (
                      <p className="mt-8 max-w-2xl border-l border-[var(--mm-border)] pl-4 text-[15px] leading-[1.65] text-[var(--mm-ink)]">
                        {service.note}
                      </p>
                    ) : null}
                    <Link to="/audit" hash="audit-form" className="mm-link mt-8 inline-block">
                      Request audit for this scope
                    </Link>
                  </Reveal>
                </div>
              </article>
            ))}
          </section>

          {/* Outcomes bento */}
          <section
            aria-labelledby="smm-outcomes-heading"
            className="border-t border-[var(--mm-border)] px-6 py-20 md:px-10 md:py-28"
          >
            <div className="mx-auto max-w-5xl">
              <Reveal duration={0.5}>
                <p className="mm-eyebrow">Results</p>
                <h2
                  id="smm-outcomes-heading"
                  className="mm-display mt-4 text-[32px] md:text-[44px]"
                >
                  System that closes deals.
                </h2>
                <p className="mm-body mt-6">
                  Four shifts in how social shows up on pipeline and P&amp;L.
                </p>
              </Reveal>

              <div className="mm-bento mt-12 md:grid-cols-6">
                {smmOutcomes.map((o, i) => {
                  const span =
                    i === 0
                      ? "md:col-span-4 md:row-span-2"
                      : i === 1
                        ? "md:col-span-2"
                        : "md:col-span-3";
                  return (
                    <Reveal
                      key={o.n}
                      delay={i * 0.05}
                      className={cn("mm-card cursor-default p-8 md:p-10", span)}
                      duration={0.5}
                    >
                      <p className="mm-mono text-xs text-[var(--mm-muted)]">{o.n}</p>
                      <h3
                        className={cn(
                          "mm-display mt-4",
                          i === 0 ? "text-2xl md:text-4xl" : "text-xl md:text-2xl",
                        )}
                      >
                        {o.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.65] text-[var(--mm-muted)]">
                        {o.body}
                      </p>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Cases */}
          <section
            aria-labelledby="smm-cases-heading"
            className="border-t border-[var(--mm-border)] px-6 md:px-10"
          >
            <div className="mx-auto max-w-5xl pt-20 md:pt-24">
              <Reveal duration={0.5}>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mm-eyebrow">Case studies</p>
                    <h2
                      id="smm-cases-heading"
                      className="mm-display mt-4 text-[32px] md:text-[44px]"
                    >
                      Real solutions. Measurable impact.
                    </h2>
                  </div>
                  <Link to="/cases" className="mm-link shrink-0">
                    View all cases
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="mx-auto max-w-5xl pb-20 md:pb-28">
              {smmCaseStudies.map((c, i) => (
                <CaseRow
                  key={c.id}
                  index={i}
                  category={c.category}
                  title={c.title}
                  client={c.client}
                  challenge={c.challenge}
                  solution={c.solution}
                  quote={c.quote}
                  heroValue={c.heroMetric.value}
                  heroLabel={c.heroMetric.label}
                />
              ))}
            </div>
          </section>

          {/* Quote */}
          <section className="border-t border-[var(--mm-border)] px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-5xl">
              <Reveal duration={0.55}>
                <blockquote className="mm-display text-[28px] leading-[1.15] md:text-[40px]">
                  Your client is reading your feed right now. While you hesitate.
                </blockquote>
              </Reveal>
            </div>
          </section>

          {/* CTA */}
          <section
            id="contact"
            aria-labelledby="smm-cta-heading"
            className="border-t border-[var(--mm-border)] px-6 py-20 md:px-10 md:py-28"
          >
            <div className="mx-auto max-w-5xl text-center">
              <Reveal duration={0.5}>
                <h2 id="smm-cta-heading" className="mm-display text-[36px] md:text-[52px]">
                  Book your free SMM audit.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.65] text-[var(--mm-muted)]">
                  We map channels, gaps, and the fastest path to inbound — without vanity posting.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Link to="/audit" hash="audit-form" className="mm-btn-primary">
                    Book free SMM audit
                  </Link>
                  <Link to="/contact" className="mm-btn-secondary">
                    Talk to the team
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <SiteFooter variant="dark" />
      </div>
    </div>
  );
}
