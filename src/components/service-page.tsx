import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ScrollProgressBar, Reveal } from "@/components/motion-bits";
import { textMeta } from "@/components/framer-section";
import type { ServiceContent } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicePageView({ service: s }: { service: ServiceContent }) {
  return (
    <div
      className="rm-page selection:bg-[#efeeea] selection:text-black"
      style={{ "--service-accent": s.accent } as CSSProperties}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <SiteHeader variant="dark" />

      <main id="main">
        {/* HERO */}
        <section
          aria-labelledby="service-title"
          className="relative isolate overflow-hidden pt-16 md:pt-24 pb-14 md:pb-20"
        >
          <div aria-hidden className="rm-service-hero__ambient" />
          <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-12 text-center">
            <Link
              to="/services"
              className="inline-flex cursor-pointer items-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
            >
              All services
            </Link>

            <p className={cn("mt-10", textMeta)}>{s.shortName}</p>

            <h1 id="service-title" className="rm-title-hero mx-auto mt-4 capitalize">
              Be {s.hero.word}
            </h1>

            <div className="mx-auto mt-8 flex max-w-[40rem] flex-col gap-4 text-left md:text-center">
              {s.hero.paragraphs.map((p) => (
                <p key={p} className="rm-copy-lead text-[15px] leading-[1.75] md:text-[17px]">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/audit" className="rm-btn rm-btn-primary cursor-pointer">
                {s.hero.primaryCta}
              </Link>
              <a href="#blocks" className="rm-btn rm-btn-secondary cursor-pointer">
                How we work
              </a>
            </div>
          </div>
        </section>

        {/* БЛОКИ ПОСЛУГ */}
        <section id="blocks" aria-label="Service blocks" className="border-t border-white/10">
          {s.blocks.map((block) => (
            <article key={block.n} className="border-b border-white/10">
              <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24">
                <Reveal duration={0.55}>
                  <div className="mb-8 flex items-baseline gap-5">
                    <span className="text-[2.5rem] font-light leading-none tracking-[-0.04em] text-white/20 tabular-nums md:text-[4rem]">
                      {block.n}
                    </span>
                    <span className={textMeta}>{block.title}</span>
                  </div>
                  <h2 className="max-w-[20ch] text-[1.75rem] font-medium leading-[1.06] tracking-[-0.03em] text-white md:text-[3rem]">
                    {block.subtitle}
                  </h2>

                  <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-12">
                    {block.sections.map((section) => (
                      <div key={section.heading}>
                        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                          {section.heading}
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className="border-l border-white/15 pl-4 text-[14px] leading-[1.65] text-[var(--rm-text-body)] md:text-[15px]"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {block.notes?.length ? (
                    <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
                      {block.notes.map((note) => (
                        <p
                          key={note}
                          className="max-w-[52ch] text-[15px] leading-[1.75] text-[var(--rm-ink)] md:text-[16px]"
                        >
                          {note}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {block.cta ? (
                    <div className="mt-10">
                      <Link to="/audit" className="rm-btn rm-btn-primary cursor-pointer">
                        {block.cta}
                      </Link>
                    </div>
                  ) : null}
                </Reveal>
              </div>
            </article>
          ))}
        </section>

        {/* РЕЗУЛЬТАТИ */}
        <section
          aria-labelledby="outcomes-heading"
          className="border-b border-white/10 bg-[var(--rm-surface-raised)]"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24">
            <Reveal duration={0.55}>
              <p className={textMeta}>Results</p>
              <h2
                id="outcomes-heading"
                className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.06] tracking-[-0.03em] text-white md:text-[3.5rem]"
              >
                {s.outcomes.title}
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 md:gap-4">
              {s.outcomes.items.map((o, i) => (
                <Reveal
                  key={o.title}
                  delay={i * 0.04}
                  className="rm-service-outcome"
                  duration={0.55}
                >
                  <h3 className="text-[1.25rem] font-medium leading-[1.12] tracking-[-0.025em] text-white md:text-[1.625rem]">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.65] text-[var(--rm-text-body)] md:text-[15px]">
                    {o.body}
                  </p>
                  {o.bullets?.length ? (
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {o.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-[13px] leading-[1.6] text-[var(--rm-text-body)]"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              ))}
            </div>

            {s.outcomes.extra ? (
              <Reveal delay={0.1} duration={0.55} className="mt-12 md:mt-16">
                <h3 className="text-[1.25rem] font-medium tracking-[-0.025em] text-white md:text-[1.75rem]">
                  {s.outcomes.extra.title}
                </h3>
                <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-4">
                  {s.outcomes.extra.items.map((o) => (
                    <div key={o.title} className="rm-service-outcome">
                      <h4 className="text-base font-medium text-white">{o.title}</h4>
                      <p className="mt-2 text-sm leading-[1.65] text-[var(--rm-text-body)]">
                        {o.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* СОЦІАЛЬНИЙ ДОКАЗ */}
        <section aria-labelledby="proof-heading" className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-24">
            <Reveal duration={0.55}>
              <p className={textMeta}>Social proof</p>
              <h2
                id="proof-heading"
                className="mt-4 text-[1.75rem] font-medium tracking-[-0.03em] text-white md:text-[2.5rem]"
              >
                {s.socialProof.title}
              </h2>
            </Reveal>

            <div className="mt-10 flex flex-col gap-6 md:mt-12">
              {s.socialProof.cases.map((c, i) => (
                <Reveal
                  key={c.quote ?? c.label ?? i}
                  delay={i * 0.05}
                  className="rm-service-proof"
                  duration={0.55}
                >
                  {c.label ? (
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                      {c.label}
                    </p>
                  ) : null}
                  {c.quote ? (
                    <blockquote className="mt-4 text-[1.125rem] leading-[1.5] tracking-[-0.02em] text-white md:text-[1.375rem]">
                      "{c.quote}"
                    </blockquote>
                  ) : null}
                  {c.attribution ? (
                    <p className="mt-3 text-sm text-white/50">— {c.attribution}</p>
                  ) : null}
                  {c.metrics.length ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {c.metrics.map((m) => (
                        <div key={m.label} className="rounded-lg border border-white/10 px-4 py-3">
                          <p className="text-lg font-medium tabular-nums text-white">{m.value}</p>
                          <p className="mt-1 text-[12px] leading-snug text-white/50">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ЦИТАТА + CTA */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-28 text-center">
            <Reveal duration={0.55}>
              <figure className="rm-service-quote mx-auto max-w-3xl text-left md:text-center">
                <blockquote className="text-[1.625rem] font-medium leading-[1.18] tracking-[-0.025em] text-white md:text-[2.25rem]">
                  {s.closingQuote}
                </blockquote>
              </figure>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link to="/audit" className="rm-btn rm-btn-primary cursor-pointer">
                  {s.footerCta}
                </Link>
                <Link to="/contact" className="rm-btn rm-btn-secondary cursor-pointer">
                  Talk to the team
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <style>{`
        .skip-link{position:absolute;left:-9999px}
        .skip-link:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem .75rem;border-radius:.5rem;z-index:100}
      `}</style>
    </div>
  );
}
