import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/motion-bits";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cn } from "@/lib/utils";

import {
  smmCaseStudies,
  smmHeadlineMetrics,
  smmOutcomes,
  smmServices,
  type SmmCaseStudy,
} from "./smm-content";
import "./aethr-theme.css";

function SectionIntro({
  kicker,
  title,
  lead,
  id,
}: {
  kicker: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="ae-kicker ae-kicker-accent">{kicker}</p>
      <h2 id={id} className="ae-title-lg mt-4 text-[var(--ae-ink)]">
        {title}
      </h2>
      {lead ? <p className="ae-body mt-5">{lead}</p> : null}
    </div>
  );
}

function ServiceCard({ service, index }: { service: (typeof smmServices)[number]; index: number }) {
  return (
    <Reveal delay={index * 0.06} className="ae-card flex h-full flex-col p-7 md:p-8" duration={0.5}>
      <div className="flex items-start justify-between gap-4">
        <span className="ae-kicker">{service.n}</span>
        <span
          className="ae-badge border-[var(--ae-accent-muted)] text-[var(--ae-accent)]"
          aria-hidden
        >
          {service.kicker}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-medium tracking-[-0.03em] md:text-2xl">{service.title}</h3>
      <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-[var(--ae-muted)]">
        {service.body}
      </p>
      <ul className="mt-6 space-y-2 border-t border-[var(--ae-border)] pt-6">
        {service.deliverables.map((d) => (
          <li
            key={d}
            className="flex gap-2 text-[13px] leading-snug text-[var(--ae-muted)] before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-[var(--ae-accent)] before:content-['']"
          >
            {d}
          </li>
        ))}
      </ul>
      {service.note ? (
        <p className="mt-6 text-[14px] leading-relaxed text-[var(--ae-ink)]/85">{service.note}</p>
      ) : null}
      <Link to="/audit" hash="audit-form" className="ae-link mt-8 inline-flex items-center gap-2">
        Book audit for this scope
        <span aria-hidden>→</span>
      </Link>
    </Reveal>
  );
}

function CaseStudyCard({ study, index }: { study: SmmCaseStudy; index: number }) {
  return (
    <Reveal delay={index * 0.07} duration={0.55}>
      <article className="ae-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-[var(--ae-border)] p-7 md:p-9 lg:col-span-5 lg:border-b-0 lg:border-r">
            <span className="ae-badge">{study.category}</span>
            <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em] md:text-[28px]">
              {study.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--ae-muted)]">{study.client}</p>

            <div className="ae-result-panel mt-8">
              <p className="ae-result-panel-label">Key result</p>
              <p className="ae-result-panel-value">{study.heroMetric.value}</p>
              <p className="mt-2 text-sm text-[var(--ae-muted)]">{study.heroMetric.label}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {study.secondaryMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[var(--ae-border)] px-3 py-3"
                >
                  <p className="text-lg font-medium tabular-nums">{m.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-[var(--ae-muted)]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 p-7 md:p-9 lg:col-span-7">
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="ae-kicker">Challenge</dt>
                <dd className="mt-3 text-[15px] leading-[1.65] text-[var(--ae-muted)]">
                  {study.challenge}
                </dd>
              </div>
              <div>
                <dt className="ae-kicker">Solution</dt>
                <dd className="mt-3 text-[15px] leading-[1.65] text-[var(--ae-muted)]">
                  {study.solution}
                </dd>
              </div>
            </dl>

            <blockquote className="border-t border-[var(--ae-border)] pt-8">
              <p className="text-[18px] leading-[1.45] tracking-[-0.02em] text-[var(--ae-ink)] md:text-xl">
                "{study.quote}"
              </p>
            </blockquote>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function SmmAethrPage() {
  return (
    <div className="smm-aethr min-h-screen selection:bg-[var(--ae-accent)] selection:text-black">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <SiteHeader variant="dark" />

      <main id="main">
        {/* Hero — outcome-led (Aethr) */}
        <section
          aria-labelledby="smm-hero-title"
          className="relative overflow-hidden border-b border-[var(--ae-border)]"
        >
          <div className="ae-hero-glow" aria-hidden />
          <div className="ae-container relative pb-16 pt-28 md:pb-24 md:pt-36">
            <Reveal duration={0.5}>
              <Link to="/services" className="ae-kicker ae-link inline-block no-underline">
                ← All services
              </Link>
            </Reveal>

            <Reveal delay={0.05} duration={0.55}>
              <p className="ae-kicker ae-kicker-accent mt-10">SMM</p>
              <h1 id="smm-hero-title" className="ae-title-xl mt-5 max-w-[14ch] capitalize">
                Be seen
              </h1>
              <p className="ae-body mt-8 max-w-[42rem]">
                You may not believe that social media impacts your deals. That is ok — we can show
                you. But if you just want posting to simulate activity, that is not us. We
                tactically choose platforms and turn them into a channel for comms, reputation, and
                sales.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/audit" hash="audit-form" className="ae-btn ae-btn-primary">
                  Test my socials
                </Link>
                <a href="#proof" className="ae-btn ae-btn-secondary">
                  See proven results
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Metrics band — Aethr “proven results” strip */}
        <section
          id="proof"
          aria-label="Performance benchmarks"
          className="border-b border-[var(--ae-border)] bg-[var(--ae-surface)]"
        >
          <div className="ae-container py-14 md:py-16">
            <Reveal duration={0.45}>
              <p className="ae-kicker">Proven performance</p>
              <p className="mt-3 max-w-xl text-[15px] text-[var(--ae-muted)]">
                No fluff — metrics from live accounts. Organic and paid where it compounds pipeline.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {smmHeadlineMetrics.map((m, i) => (
                <Reveal
                  key={m.label}
                  delay={0.05 + i * 0.05}
                  className="ae-card px-6 py-7"
                  duration={0.5}
                >
                  <p
                    className={cn(
                      "ae-stat-value",
                      (m.value.startsWith("+") || m.value.includes("×")) && "ae-stat-value-accent",
                    )}
                  >
                    {m.value}
                  </p>
                  <p className="mt-3 text-sm leading-snug text-[var(--ae-muted)]">{m.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Position */}
        <section className="ae-section">
          <div className="ae-container">
            <Reveal duration={0.5}>
              <SectionIntro
                kicker="Our position"
                title="When decision-makers check your profiles, they see a future partner."
                lead="Not another generic page. Platforms are chosen for where your buyers are — comms, reputation, and sales in one accountable team."
              />
            </Reveal>
          </div>
        </section>

        {/* Services — card grid */}
        <section id="services" aria-labelledby="smm-services-title" className="ae-section">
          <div className="ae-container">
            <Reveal duration={0.5}>
              <SectionIntro
                kicker="What we do"
                id="smm-services-title"
                title="Three layers. One SMM engine."
                lead="Strategy and content, posting and channels, analytics and reporting — from cold pitch to closed deals."
              />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {smmServices.map((s, i) => (
                <ServiceCard key={s.n} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes — results framing */}
        <section aria-labelledby="smm-outcomes-title" className="ae-section bg-[var(--ae-surface)]">
          <div className="ae-container">
            <Reveal duration={0.5}>
              <SectionIntro
                kicker="Business outcomes"
                id="smm-outcomes-title"
                title="System that closes deals."
                lead="Four shifts in how social shows up on pipeline and P&amp;L."
              />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {smmOutcomes.map((o, i) => (
                <Reveal
                  key={o.n}
                  delay={i * 0.05}
                  className={cn("ae-card p-7 md:p-8", i === 0 && "md:col-span-2")}
                  duration={0.5}
                >
                  <p className="ae-kicker">{o.n}</p>
                  <h3
                    className={cn(
                      "mt-4 font-medium tracking-[-0.03em]",
                      i === 0 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
                    )}
                  >
                    {o.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--ae-muted)]">{o.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies — Aethr challenge / solution / result cards */}
        <section aria-labelledby="smm-cases-title" className="ae-section">
          <div className="ae-container">
            <Reveal duration={0.5}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionIntro
                  kicker="Case studies"
                  id="smm-cases-title"
                  title="Your social media is capable of…"
                />
                <Link to="/cases" className="ae-link shrink-0 pb-1">
                  View all cases →
                </Link>
              </div>
            </Reveal>
            <div className="mt-12 flex flex-col gap-6">
              {smmCaseStudies.map((c, i) => (
                <CaseStudyCard key={c.id} study={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="ae-section border-t border-[var(--ae-border)]">
          <div className="ae-container max-w-4xl">
            <Reveal duration={0.55}>
              <p className="ae-kicker">Closing thought</p>
              <blockquote className="ae-title-lg mt-6 text-[var(--ae-ink)]">
                Your client is reading your feed right now. While you hesitate.
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          aria-labelledby="smm-cta-title"
          className="border-t border-[var(--ae-border)]"
        >
          <div className="ae-container py-20 text-center md:py-28">
            <Reveal duration={0.5}>
              <h2 id="smm-cta-title" className="ae-title-xl mx-auto max-w-3xl">
                Build SMM engine.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-[17px] leading-[1.65] text-[var(--ae-muted)]">
                Free SMM audit — we map channels, gaps, and the fastest path to inbound.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link to="/audit" hash="audit-form" className="ae-btn ae-btn-primary">
                  Free SMM audit
                </Link>
                <Link to="/contact" className="ae-btn ae-btn-secondary">
                  Talk to the team
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter variant="dark" />
    </div>
  );
}
