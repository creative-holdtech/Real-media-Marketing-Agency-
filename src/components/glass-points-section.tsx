import type { CSSProperties, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import engageBg from "@/assets/engage-bg.jpg";
import { useCiridaePointsScroll } from "@/hooks/use-sticky-scroll-progress";

export type GlassPointStep = {
  step: string;
  label: string;
  body: string;
};

export type GlassPointCard = {
  index: string;
  title: string;
  subtitle?: string;
  /** Lead paragraph */
  description?: string;
  steps?: GlassPointStep[];
  /** Simple single-block copy (e.g. products deliverables) */
  body?: string;
  /** Link target for blog cards */
  slug?: string;
};

type GlassPointsSectionProps = {
  id?: string;
  headline?: ReactNode;
  cards: GlassPointCard[];
  backgroundImage?: string;
  mode?: "sticky" | "inline";
  footer?: ReactNode;
  layout?: "engage" | "insights";
  /** Sticky scene height in vh (default 250) */
  sceneVh?: number;
  /** Selector for copy blocks that fade out as cards enter */
  linkedExitSelector?: string;
};

const DEFAULT_BG = engageBg;

export function GlassPointsSection({
  id,
  headline,
  cards,
  backgroundImage = DEFAULT_BG,
  mode = "sticky",
  footer,
  layout = "engage",
  sceneVh,
  linkedExitSelector,
}: GlassPointsSectionProps) {
  const isSticky = mode === "sticky";
  const isInsights = layout === "insights";
  const sectionRef = useCiridaePointsScroll<HTMLDivElement>(cards.length, {
    withIntro: isSticky && !!headline,
    sceneVh,
    linkedExitSelector,
    enterOnly: !isSticky,
  });
  const countClass = cards.length === 2 ? "rm-glass-points--count-2" : "rm-glass-points--count-3";

  const useSwissCard = isInsights || (isSticky && layout === "engage");

  const cardMarkup = (card: GlassPointCard, i: number) => (
    <article
      className="rm-points-card"
      style={
        {
          "--card-i": i,
        } as CSSProperties
      }
    >
      {useSwissCard ? (
        <>
          <header className="rm-points-card__swiss-head">
            <span className="rm-points-card__index">{card.index}</span>
            {card.subtitle ? <p className="rm-points-card__meta">{card.subtitle}</p> : null}
            <div className="rm-points-card__rule" aria-hidden />
          </header>
          <h3 className="rm-points-card__headline">{card.title}</h3>
          {card.description ? (
            <p className="rm-points-card__desc rm-points-card__desc--swiss">{card.description}</p>
          ) : null}
          {card.steps?.length ? (
            <dl className="rm-points-card__steps rm-points-card__steps--swiss">
              {card.steps.map((step) => (
                <div key={step.step} className="rm-points-card__step">
                  <dt className="rm-points-card__step-label">
                    {step.step} — {step.label.toUpperCase()}
                  </dt>
                  <dd className="rm-points-card__step-body">{step.body}</dd>
                </div>
              ))}
            </dl>
          ) : card.body ? (
            <p className="rm-points-card__desc rm-points-card__desc--swiss">{card.body}</p>
          ) : null}
          {isInsights ? (
            <footer className="rm-points-card__swiss-foot">
              <span className="rm-points-card__read">Read →</span>
            </footer>
          ) : null}
        </>
      ) : (
        <>
          <div className="rm-points-card__top">
            <div className="rm-points-card__tag">
              <span>{card.index}</span>
            </div>
            <h3 className="rm-points-card__title">{card.title}</h3>
            {card.subtitle ? <p className="rm-points-card__duration">{card.subtitle}</p> : null}
          </div>

          <div className="rm-points-card__bottom">
            {card.description ? <p className="rm-points-card__desc">{card.description}</p> : null}
            {card.steps?.length ? (
              <dl className="rm-points-card__steps">
                {card.steps.map((step) => (
                  <div key={step.step} className="rm-points-card__step">
                    <dt className="rm-points-card__step-label">
                      {step.step} — {step.label.toUpperCase()}
                    </dt>
                    <dd className="rm-points-card__step-body">{step.body}</dd>
                  </div>
                ))}
              </dl>
            ) : card.body ? (
              <p className="rm-points-card__desc">{card.body}</p>
            ) : null}
          </div>
        </>
      )}
    </article>
  );

  return (
    <>
      <section
        id={id}
        className={[
          "rm-glass-points",
          countClass,
          isSticky ? "rm-glass-points--sticky" : "rm-glass-points--inline",
          isInsights ? "rm-glass-points--insights" : "",
          layout === "engage" ? "rm-glass-points--engage" : "",
          useSwissCard ? "rm-glass-points--swiss" : "",
          footer ? "rm-glass-points--has-actions" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div ref={sectionRef} className="rm-glass-points__scene">
          <div className="rm-glass-points__sticky">
            <div className="rm-glass-points__bg-parent" aria-hidden>
              <img
                className="rm-glass-points__bg"
                src={backgroundImage}
                alt=""
                loading={isSticky ? "eager" : "lazy"}
                fetchPriority={isSticky ? "high" : "auto"}
                decoding="async"
              />
            </div>

            {headline ? (
              <div className="rm-glass-points__intro">
                <div className="rm-glass-points__head">{headline}</div>
              </div>
            ) : null}

            <div className="rm-glass-points__content">
              {cards.map((card, i) => (
                <div key={card.slug ?? `${card.title}-${i}`} className="rm-points-card-flow">
                  {card.slug ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: card.slug }}
                      className="block"
                      aria-label={`Read article: ${card.title}`}
                    >
                      {cardMarkup(card, i)}
                    </Link>
                  ) : (
                    cardMarkup(card, i)
                  )}
                </div>
              ))}
              {isSticky ? <div className="rm-glass-points__scroll-tail" aria-hidden /> : null}
            </div>
            {footer ? <div className="rm-glass-points__actions">{footer}</div> : null}
          </div>
        </div>
      </section>
    </>
  );
}
