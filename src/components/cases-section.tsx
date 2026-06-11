import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import {
  bodyCopy,
  btnGhostLink,
  sectionContainer,
  sectionHeadline,
  sectionShell,
} from "@/components/framer-section";
import { cases as staticCases } from "@/lib/cases";
import { casesGalleryHeaderProps } from "@/lib/cases-gallery-config";
import { cn } from "@/lib/utils";

export function CasesSection() {
  const header = casesGalleryHeaderProps({
    tag: "Selected case studies",
    heading: "Results we deliver.",
    subheading: "Identity, product, and growth systems for founders who build to scale.",
  });
  const featuredCases = staticCases.slice(0, 3);

  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.4 };
  const x = useSpring(px, springConfig);
  const y = useSpring(py, springConfig);

  if (featuredCases.length === 0) return null;

  const finePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || !finePointer) return;
    px.set(event.clientX);
    py.set(event.clientY);
  };

  const activeCase = active >= 0 ? featuredCases[active] : null;

  return (
    <section
      id="work"
      aria-labelledby="cases-heading"
      className={cn(sectionShell, "rm-section-work")}
    >
      <div className={sectionContainer}>
        <div className="rm-work reveal">
          <header className="rm-work__intro">
            <span className="inline-flex w-fit rounded-full border border-[var(--rm-border-soft)] px-3 py-1 text-xs font-normal uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
              {header.tag}
            </span>
            <h2
              id="cases-heading"
              className={cn(
                sectionHeadline,
                "max-w-[18ch] font-medium text-balance md:leading-[1.12]",
              )}
            >
              {header.heading}
            </h2>
            {header.subheading ? (
              <p className={cn(bodyCopy, "max-w-[46ch] text-[var(--rm-text-body)]")}>
                {header.subheading}
              </p>
            ) : null}
          </header>

          <div
            className="rm-index"
            data-active={active >= 0}
            onPointerMove={handleMove}
            onPointerLeave={() => setActive(-1)}
          >
            {featuredCases.map((study, index) => (
              <Link
                key={study.slug}
                to="/cases/$slug"
                params={{ slug: study.slug }}
                className="rm-index__row"
                data-on={active === index}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-label={`${study.client} — ${study.primaryMetric.value} ${study.primaryMetric.label}`}
              >
                <span className="rm-index__num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rm-index__main">
                  <span className="rm-index__thumb" aria-hidden>
                    <img src={study.coverImage} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="rm-index__name">{study.client}</span>
                  <span className="rm-index__meta">
                    {study.niche} · {study.format}
                  </span>
                </span>

                <span className="rm-index__metric">
                  <span className="rm-index__metric-value">{study.primaryMetric.value}</span>
                  <span className="rm-index__metric-label">{study.primaryMetric.label}</span>
                </span>

                <span className="rm-index__arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="rm-work__footer">
            <Link to="/cases" className={btnGhostLink}>
              View all case studies →
            </Link>
          </div>
        </div>
      </div>

      <motion.div className="rm-index__cursor" style={{ x, y }} aria-hidden>
        <div className="rm-index__anchor">
          <AnimatePresence mode="popLayout">
            {activeCase ? (
              <motion.div
                key={activeCase.slug}
                className={cn(
                  "rm-index__preview",
                  activeCase.previewImage ? "rm-index__preview--photo" : undefined,
                )}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <img src={activeCase.previewImage ?? activeCase.coverImage} alt="" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
