import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import {
  BtnArrow,
  bodyCopy,
  btnOutline,
  btnPrimary,
  pageHeroContainer,
  siteChromeBand,
  sectionContainer,
  sectionHeadline,
  sectionShell,
  subsectionTitle,
  surfaceCardPadding,
  surfaceCardShell,
  textCardBody,
  textMeta,
  textMetric,
  FramerTag,
  interactiveSurfaceCard,
} from "@/components/framer-section";
import { ScrollProgressBar, Reveal } from "@/components/motion-bits";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { QuoteGradientSection } from "@/components/ui/testimonials";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import type { ServiceContent } from "@/lib/services/types";
import { cn } from "@/lib/utils";

/**
 * Renders a deliverable as a scannable "term — definition" row instead of a
 * flat paragraph: the lead-in (text before the first colon) is set in white,
 * the rest stays muted, anchored by a small per-service accent tick.
 */
function DeliverableRow({ item }: { item: string }) {
  const idx = item.indexOf(":");
  const lead = idx === -1 ? null : item.slice(0, idx).trim();
  const rest = idx === -1 ? item : item.slice(idx + 1).trim();
  return (
    <div className="flex gap-3 border-t border-[var(--rm-border-soft)] pt-4">
      <span
        aria-hidden
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--service-accent)]"
      />
      <p className={textCardBody}>
        {lead ? <span className="font-medium text-white">{lead} — </span> : null}
        <span className="text-[var(--rm-text-body)]">{rest}</span>
      </p>
    </div>
  );
}

export function ServicePageView({ service: s }: { service: ServiceContent }) {
  useReveal();
  return (
    <div
      className="rm-page selection:bg-rm-accent selection:text-black"
      style={{ "--service-accent": s.accent } as CSSProperties}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <SiteHeader variant="dark" />

      <main id="main">
        <section aria-labelledby="service-title" className="relative isolate overflow-hidden">
          <div aria-hidden className="rm-service-hero__ambient" />
          <div className={siteChromeBand}>
            <div className={cn(pageHeroContainer, "pb-14 text-center md:pb-20")}>
            <Link
              to="/services"
              className={cn(
                textMeta,
                "inline-flex items-center gap-2 transition-colors duration-200 hover:text-white",
              )}
            >
              All services
            </Link>

            <p className={cn("reveal mt-8", textMeta)}>{s.shortName}</p>

            <h1 id="service-title" className="reveal rm-type-display mt-4 capitalize text-white">
              Be {s.hero.word}
            </h1>

            <div className="reveal mx-auto mt-8 flex max-w-[34rem] flex-col gap-4 text-left md:text-center">
              {s.hero.paragraphs.map((p) => (
                <p key={p} className={bodyCopy}>
                  {p}
                </p>
              ))}
            </div>

            <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/audit" className={cn(btnPrimary, "group gap-2")}>
                {s.hero.primaryCta.replace(/\s*→$/, "")}
                <BtnArrow />
              </Link>
              <a href="#blocks" className={cn(btnOutline, "group gap-2")}>
                How we work
                <BtnArrow />
              </a>
            </div>
            </div>
          </div>
        </section>

        <section id="blocks" aria-label="Service blocks" className="border-t border-[var(--rm-border-soft)]">
          {s.blocks.map((block) => (
            <article
              key={block.n}
              className={cn(sectionShell, "border-b border-[var(--rm-border-soft)] py-14 md:py-20")}
            >
              <div className={sectionContainer}>
                <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
                  {/* Left rail: the phase marker + headline. Sticky on desktop so
                      it anchors the deliverables scrolling past on the right. */}
                  <div className="md:col-span-4">
                    <Reveal duration={0.55}>
                      <span
                        className={cn(
                          textMetric,
                          "block leading-none text-white/30 text-[2.75rem] md:text-[4.5rem]",
                        )}
                      >
                        {block.n}
                      </span>
                      <p className={cn(textMeta, "mt-5")}>{block.title}</p>
                      <h2 className={cn(sectionHeadline, "mt-3 max-w-[16ch] text-white")}>
                        {block.subtitle}
                      </h2>
                    </Reveal>
                  </div>

                  {/* Right column: deliverable groups as scannable term/definition rows. */}
                  <div className="flex flex-col gap-10 md:col-span-8 md:gap-12">
                    {block.sections.map((section) => (
                      <Reveal key={section.heading} duration={0.55}>
                        <h3 className={textMeta}>{section.heading}</h3>
                        <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                          {section.items.map((item) => (
                            <DeliverableRow key={item} item={item} />
                          ))}
                        </div>
                      </Reveal>
                    ))}

                    {block.notes?.length ? (
                      <div className="space-y-3 border-t border-[var(--rm-border-soft)] pt-8">
                        {block.notes.map((note) => (
                          <p key={note} className={cn(bodyCopy, "max-w-[52ch]")}>
                            {note}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    {block.cta ? (
                      <div>
                        <Link to="/audit" className={cn(btnPrimary, "group gap-2")}>
                          {block.cta.replace(/\s*→$/, "")}
                          <BtnArrow />
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section
          aria-labelledby="outcomes-heading"
          className={cn(sectionShell, "border-b border-[var(--rm-border-soft)] bg-[var(--rm-surface-raised)]")}
        >
          <div className={sectionContainer}>
            <Reveal duration={0.55}>
              <FramerTag>Results</FramerTag>
              <h2
                id="outcomes-heading"
                className={cn(sectionHeadline, "mt-4 max-w-3xl text-white")}
              >
                {s.outcomes.title}
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12">
              {s.outcomes.items.map((o, i) => (
                <Reveal
                  key={o.title}
                  delay={i * 0.04}
                  className={cn(surfaceCardShell, interactiveSurfaceCard, "h-full")}
                  duration={0.55}
                >
                  <div className={cn(surfaceCardPadding, "flex h-full flex-col")}>
                    <h3 className={subsectionTitle}>{o.title}</h3>
                    <p className={cn(textCardBody, "mt-3 flex-1 text-[var(--rm-text-body)]")}>
                      {o.body}
                    </p>
                    {o.bullets?.length ? (
                      <ul className="mt-4 space-y-2 border-t border-[var(--rm-border-soft)] pt-4">
                        {o.bullets.map((b) => (
                          <li key={b} className={cn(textCardBody, "text-[var(--rm-text-body)]")}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            {s.outcomes.extra ? (
              <Reveal delay={0.1} duration={0.55} className="mt-12 md:mt-16">
                <h3 className={subsectionTitle}>{s.outcomes.extra.title}</h3>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {s.outcomes.extra.items.map((o) => (
                    <div
                      key={o.title}
                      className={cn(surfaceCardShell, surfaceCardPadding, "h-full")}
                    >
                      <h4 className={subsectionTitle}>{o.title}</h4>
                      <p className={cn(textCardBody, "mt-2 text-[var(--rm-text-body)]")}>
                        {o.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>

        <section
          aria-labelledby="proof-heading"
          className={cn(sectionShell, "border-b border-[var(--rm-border-soft)]")}
        >
          <div className={sectionContainer}>
            <Reveal duration={0.55}>
              <FramerTag>Social proof</FramerTag>
              <h2 id="proof-heading" className={cn(sectionHeadline, "mt-4 text-white")}>
                {s.socialProof.title}
              </h2>
            </Reveal>

            <div className="mt-10 flex flex-col gap-6 md:mt-12">
              {s.socialProof.cases.map((c, i) => (
                <Reveal
                  key={c.quote ?? c.label ?? i}
                  delay={i * 0.05}
                  className={cn(surfaceCardShell, surfaceCardPadding)}
                  duration={0.55}
                >
                  {c.label ? <p className={textMeta}>{c.label}</p> : null}
                  {c.quote ? (
                    <blockquote className={cn(sectionHeadline, "mt-4 text-balance text-white")}>
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                  ) : null}
                  {c.attribution ? (
                    <p className={cn(textMeta, "mt-3 normal-case")}>— {c.attribution}</p>
                  ) : null}
                  {c.metrics.length ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {c.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-3xl border border-[var(--rm-border-soft)] px-4 py-3"
                        >
                          <p className={cn(textMetric, "text-white")}>{m.value}</p>
                          <p
                            className={cn(
                              textMeta,
                              "mt-1 normal-case tracking-normal text-white/50",
                            )}
                          >
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {s.closingQuote ? (
          <QuoteGradientSection ariaLabel="Closing statement" background="solid">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="rm-quote-editorial__text-wrap mx-auto max-w-[22ch] md:max-w-none">
                <span
                  aria-hidden
                  className="rm-quote-editorial__accent mx-auto mb-6 block h-10 w-px origin-top bg-white/30"
                />
                <p className="rm-quote-editorial__text text-balance text-white">{s.closingQuote}</p>
              </blockquote>
            </figure>
          </QuoteGradientSection>
        ) : null}
      </main>

      <UnifiedCTA
        primaryLabel={s.footerCta.includes("→") ? s.footerCta : `${s.footerCta} →`}
        primaryTo="/audit"
        secondaryLabel="Talk to the team →"
        secondaryTo="/contact"
      />

      <SiteFooter />

      <style>{`
        .skip-link{position:absolute;left:-9999px}
        .skip-link:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem .75rem;border-radius:.5rem;z-index:100}
      `}</style>
    </div>
  );
}
