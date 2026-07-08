import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

import {
  BtnArrow,
  bodyCopy,
  btnOutline,
  btnPrimary,
  sectionContentGrid,
  sectionInner,
  siteChromeBand,
  sectionHeadline,
  sectionShell,
  subsectionTitle,
  surfaceCardPadding,
  surfaceCardShell,
  textCardBody,
  textMeta,
  FramerTag,
  interactiveSurfaceCard,
} from "@/components/framer-section";
import { ScrollProgressBar, Reveal } from "@/components/motion-bits";
import { PageEditorialHero } from "@/components/page-editorial-hero";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SlotCounter } from "@/components/slot-counter";
import { QuoteEditorial, QuoteGradientSection, QuoteMark } from "@/components/ui/testimonials";
import { UnifiedCTA } from "@/components/unified-cta";
import { useReveal } from "@/hooks/use-reveal";
import type { ServiceContent } from "@/lib/services/types";
import { cn } from "@/lib/utils";

/**
 * Renders a deliverable as a scannable "term — definition" row instead of a
 * flat paragraph: the lead-in (text before the first colon) is set in white,
 * the rest stays muted.
 */
function DeliverableRow({ item, index = 0 }: { item: string; index?: number }) {
  const reduce = useReducedMotion();
  const idx = item.indexOf(":");
  const lead = idx === -1 ? null : item.slice(0, idx).trim();
  const rest = idx === -1 ? item : item.slice(idx + 1).trim();
  const delay = Math.min(index * 0.04, 0.16);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.65 }}
      transition={{ duration: reduce ? 0 : 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      className="block"
    >
      <p className={cn(bodyCopy, "m-0 min-w-0")}>
        {lead ? <span className="font-medium text-white">{lead} — </span> : null}
        <span className="text-[var(--rm-text-body)]">{rest}</span>
      </p>
    </motion.div>
  );
}

/** Matches the metric-shaped fragments in outcome copy: $200–$600, 30–50%, 2.3×, Top-3. */
const STAT_PATTERN =
  /(\$\d[\d,.]*(?:\s*(?:to|[–—-])\s*\$?\d[\d,.]*)?|\d[\d,.]*(?:\s*(?:to|[–—-])\s*\d[\d,.]*)?%|\d+(?:\.\d+)?×|Top-\d+)/g;

/** Bolds the stat fragments in a paragraph so a dense block of copy stays scannable. */
function StatBody({ text }: { text: string }) {
  const parts = text.split(STAT_PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-white">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** First metric-shaped fragment in the copy, promoted to a card-leading stat tile. */
function extractHeroStat(text: string): string | null {
  STAT_PATTERN.lastIndex = 0;
  const match = STAT_PATTERN.exec(text);
  return match ? match[0] : null;
}

type ServiceBlock = ServiceContent["blocks"][number];

function CardSectionLayout({ sections }: { sections: ServiceBlock["sections"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sections.map((section, sectionIndex) => (
        <Reveal
          key={section.heading}
          delay={sectionIndex * 0.05}
          className={cn(
            surfaceCardShell,
            interactiveSurfaceCard,
            "group h-full",
            sections.length % 2 === 1 && sectionIndex === sections.length - 1 && "sm:col-span-2",
          )}
          duration={0.55}
        >
          <div
            className={cn(
              "relative z-[1] flex h-full min-h-0 flex-col gap-4 md:gap-5",
              surfaceCardPadding,
            )}
          >
            <h3 className={cn(textMeta, "m-0")}>{section.heading}</h3>
            <div className="mt-auto flex min-h-0 flex-1 flex-col gap-4 border-t border-[var(--rm-border-soft)] pt-5">
              {section.items.map((item, itemIndex) => (
                <DeliverableRow key={item} item={item} index={itemIndex} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
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
            <div className={cn(sectionInner, "relative pb-14 pt-2 md:pb-20 md:pt-8")}>
              <Link
                to="/services"
                className={cn(
                  textMeta,
                  "group flex w-fit items-center gap-2 transition-colors duration-200 hover:text-white",
                )}
              >
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
                >
                  ←
                </span>
                All services
              </Link>

              <div className="mt-8">
                <PageEditorialHero
                  layout="copy"
                  tag={s.shortName}
                  titleLines={[`Be ${s.hero.word.charAt(0).toUpperCase()}${s.hero.word.slice(1)}`]}
                  headingId="service-title"
                  bodyClassName="max-w-[34rem] text-[18px]"
                  body={
                    <>
                      {s.hero.paragraphs.map((paragraph) => (
                        <span key={paragraph} className="mt-4 block first:mt-0">
                          {paragraph}
                        </span>
                      ))}
                    </>
                  }
                  actions={
                    <>
                      <Link to="/audit" className={cn(btnPrimary, "group gap-2")}>
                        {s.hero.primaryCta.replace(/\s*→$/, "")}
                        <BtnArrow />
                      </Link>
                      <a href="#blocks" className={cn(btnOutline, "group gap-2")}>
                        How we work
                        <BtnArrow />
                      </a>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="blocks"
          aria-label="Service blocks"
          className="border-t border-[var(--rm-border-soft)]"
        >
          {s.blocks.map((block) => (
            <article
              key={block.n}
              className={cn(sectionShell, "border-b border-[var(--rm-border-soft)]")}
            >
              <div className={sectionInner}>
                <div className={cn(sectionContentGrid, "items-stretch")}>
                  {/* Left rail: the phase marker + headline. Sticky on desktop so
                      it anchors the deliverables scrolling past on the right. */}
                  <div className="h-full md:col-start-1">
                    <Reveal className="flex h-full flex-col" duration={0.55}>
                      <div>
                        <FramerTag>{block.title}</FramerTag>
                      </div>
                      <h2 className={cn(sectionHeadline, "mt-4 max-w-[16ch] text-white")}>
                        {block.subtitle}
                      </h2>
                      <span className="rm-type-display mt-auto block pt-8 tabular-nums text-[var(--rm-text-ghost)]">
                        {block.n}
                      </span>
                    </Reveal>
                  </div>

                  {/* Right column: deliverable groups as scannable term/definition rows. */}
                  <div className="flex flex-col gap-8 md:col-span-2 md:col-start-2">
                    <CardSectionLayout sections={block.sections} />

                    {block.notes?.length ? (
                      <div className="space-y-4 border-t border-[var(--rm-border-soft)] pt-8">
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
          className={cn(
            sectionShell,
            "border-b border-[var(--rm-border-soft)] bg-[var(--rm-surface-raised)]",
          )}
        >
          <div className={sectionInner}>
            <div className={cn(sectionContentGrid, "items-start")}>
              <Reveal className="md:col-start-1" duration={0.55}>
                <FramerTag>Results</FramerTag>
              </Reveal>
              <Reveal className="md:col-span-2 md:col-start-2" duration={0.55}>
                <h2 id="outcomes-heading" className={cn(sectionHeadline, "max-w-3xl text-white")}>
                  {s.outcomes.title}
                </h2>
              </Reveal>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 md:col-start-2">
                {(() => {
                  // Reserve a stat slot only if at least one card actually has a stat —
                  // otherwise every card would carry dead space for nothing.
                  const heroStats = s.outcomes.items.map((o) => extractHeroStat(o.body));
                  const anyStat = heroStats.some(Boolean);
                  return s.outcomes.items.map((o, i) => {
                    const heroStat = heroStats[i];
                    const isOrphan =
                      s.outcomes.items.length % 2 === 1 && i === s.outcomes.items.length - 1;
                    return (
                      <Reveal
                        key={o.title}
                        delay={i * 0.04}
                        className={cn(
                          surfaceCardShell,
                          interactiveSurfaceCard,
                          "h-full",
                          isOrphan && "sm:col-span-2",
                        )}
                        duration={0.55}
                      >
                        <div className={cn(surfaceCardPadding, "flex h-full flex-col")}>
                          <div className={cn(isOrphan && "sm:flex sm:items-start sm:gap-8")}>
                            <div className={cn(isOrphan && "sm:w-56 sm:shrink-0")}>
                              {anyStat ? (
                                <div className="rm-stat-hero-slot">
                                  {heroStat ? (
                                    <SlotCounter value={heroStat} className="rm-stat-hero" />
                                  ) : null}
                                </div>
                              ) : null}
                              <h3 className={cn(subsectionTitle, anyStat && "mt-2")}>{o.title}</h3>
                            </div>
                            <p
                              className={cn(
                                textCardBody,
                                "mt-4 flex-1 text-[var(--rm-text-body)]",
                                isOrphan && "sm:mt-0",
                              )}
                            >
                              <StatBody text={o.body} />
                            </p>
                          </div>
                          {o.bullets?.length ? (
                            <ul className="mt-4 space-y-2 border-t border-[var(--rm-border-soft)] pt-4">
                              {o.bullets.map((b) => (
                                <li
                                  key={b}
                                  className={cn(textCardBody, "text-[var(--rm-text-body)]")}
                                >
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </Reveal>
                    );
                  });
                })()}
              </div>

              {s.outcomes.extra ? (
                <Reveal delay={0.1} duration={0.55} className="md:col-span-2 md:col-start-2">
                  <h3 className={subsectionTitle}>{s.outcomes.extra.title}</h3>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {s.outcomes.extra.items.map((o) => (
                      <div
                        key={o.title}
                        className={cn(surfaceCardShell, surfaceCardPadding, "h-full")}
                      >
                        <h4 className={subsectionTitle}>{o.title}</h4>
                        <p className={cn(textCardBody, "mt-2 text-[var(--rm-text-body)]")}>
                          <StatBody text={o.body} />
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="proof-heading"
          className={cn(sectionShell, "border-b border-[var(--rm-border-soft)]")}
        >
          <div className={sectionInner}>
            <div className={cn(sectionContentGrid, "items-start")}>
              <Reveal className="md:col-start-1" duration={0.55}>
                <FramerTag>Social proof</FramerTag>
              </Reveal>
              <Reveal className="md:col-span-2 md:col-start-2" duration={0.55}>
                <h2 id="proof-heading" className={cn(sectionHeadline, "text-white")}>
                  {s.socialProof.title}
                </h2>
              </Reveal>
            </div>

            <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-8">
              {s.socialProof.cases.map((c, i) => (
                <div key={c.quote ?? c.label ?? i}>
                  {c.quote ? (
                    <QuoteEditorial
                      lead={<QuoteMark />}
                      quote={c.quote}
                      attribution={c.attribution ? { name: c.attribution } : undefined}
                      editorialClassName="rm-quote-editorial--testimonial"
                      afterQuote={
                        c.metrics.length ? (
                          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {c.metrics.map((m) => (
                              <div key={m.label}>
                                <p>
                                  <SlotCounter
                                    value={m.value}
                                    className="rm-index__metric-value block text-white"
                                  />
                                </p>
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
                        ) : null
                      }
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {s.closingQuote ? (
          <QuoteGradientSection ariaLabel="Closing statement" background="solid">
            <QuoteEditorial quote={s.closingQuote} lead={<QuoteMark />} />
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
