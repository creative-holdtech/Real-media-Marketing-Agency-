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

/** Ciridae `.points_logo` — logo-pieces star cluster */
function PointsLogo() {
  return (
    <div className="rm-points-card__logo" aria-hidden>
      <svg viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M62 18L64.2 44.8L91 47L64.2 49.2L62 76L59.8 49.2L33 47L59.8 44.8L62 18Z"
          fill="currentColor"
        />
        <path
          d="M28 34L29.4 48.6L44 50L29.4 51.4L28 66L26.6 51.4L12 50L26.6 48.6L28 34Z"
          fill="currentColor"
          opacity="0.72"
        />
        <path
          d="M96 58L97.4 72.6L112 74L97.4 75.4L96 90L94.6 75.4L80 74L94.6 72.6L96 58Z"
          fill="currentColor"
          opacity="0.72"
        />
      </svg>
    </div>
  );
}

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
  const sectionRef = useCiridaePointsScroll<HTMLElement>(cards.length, {
    withIntro: isSticky && !!headline,
    sceneVh,
    linkedExitSelector,
    enterOnly: !isSticky,
  });
  const countClass =
    cards.length === 2 ? "rm-glass-points--count-2" : "rm-glass-points--count-3";

  const cardMarkup = (card: GlassPointCard, i: number) => (
    <article
      className="rm-points-card"
      style={
        {
          "--card-i": i,
        } as CSSProperties
      }
    >
      {isInsights ? (
        <>
          <div className="rm-points-card__top rm-points-card__top--insights">
            <div className="rm-points-card__tag">
              <span>{card.index}</span>
            </div>
            <h3 className="rm-points-card__headline">{card.title}</h3>
            {card.subtitle ? <p className="rm-points-card__meta">{card.subtitle}</p> : null}
          </div>
          <div className="rm-points-card__bottom rm-points-card__bottom--insights">
            {card.description ? <p className="rm-points-card__desc">{card.description}</p> : null}
            <span className="rm-points-card__read">Read →</span>
          </div>
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

          <PointsLogo />

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
              <div
                key={card.slug ?? `${card.title}-${i}`}
                className="rm-points-card-flow"
              >
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
            {footer ? (
              <div className="rm-glass-points__actions">
                {footer}
              </div>
            ) : null}
            {isSticky ? <div className="rm-glass-points__scroll-tail" aria-hidden /> : null}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
