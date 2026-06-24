import { useEffect, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import {
  bodyCopy,
  borderSoft,
  BtnArrow,
  btnGhostLink,
  sectionContentGrid,
  sectionInner,
  sectionHeadline,
  sectionIntroStack,
  sectionShell,
  subsectionTitle,
  textGhost,
  textMeta,
} from "@/components/framer-section";
import { cases as staticCases, getCaseHomePreviewImage, getCaseHomePreviewPosition, isCaseHomePreviewPhoto } from "@/lib/cases";
import { casesHomeTeaserHeaderProps } from "@/lib/cases-gallery-config";
import { cn } from "@/lib/utils";

export function CasesSection() {
  const header = casesHomeTeaserHeaderProps();
  const featuredCases = staticCases.slice(0, 3);

  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);
  const [previewBelow, setPreviewBelow] = useState(false);

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
    setPreviewBelow(event.clientY < 300);
  };

  const activeCase = active >= 0 ? featuredCases[active] : null;

  useEffect(() => {
    featuredCases.forEach((study) => {
      const img = new Image();
      img.src = getCaseHomePreviewImage(study);
    });
  }, [featuredCases]);

  return (
    <section
      id="work"
      aria-labelledby="cases-heading"
      className={cn(sectionShell, "rm-section-work")}
    >
      <div className={sectionInner}>
        <div className={cn("rm-work reveal", sectionContentGrid, "items-start")}>
          <div className="md:col-start-1 md:self-start">
            <span className={textMeta}>{header.tag}</span>
          </div>
          <header className={cn(sectionIntroStack, "md:col-span-2 md:col-start-2")}>
            <h2 id="cases-heading" className={cn(sectionHeadline, "max-w-[18ch] text-balance")}>
              {header.heading}
            </h2>
            {header.subheading ? (
              <p className={cn(bodyCopy, "max-w-[46ch] text-[var(--rm-text-body)]")}>
                {header.subheading}
              </p>
            ) : null}
          </header>

          <div
            className="rm-index md:col-span-2 md:col-start-2"
            onPointerMove={handleMove}
            onPointerLeave={() => setActive(-1)}
          >
            {featuredCases.map((study, index) => {
              const previewSrc = getCaseHomePreviewImage(study);
              const previewPhoto = isCaseHomePreviewPhoto(previewSrc);

              return (
              <Link
                key={study.slug}
                to="/cases/$slug"
                params={{ slug: study.slug }}
                className={cn("rm-index__row rm-touch group border-b last:border-b-0", borderSoft)}
                data-on={active === index}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-label={`${study.client} — ${study.primaryMetric.value} ${study.primaryMetric.label}`}
              >
                <span className={cn("rm-index__num", textGhost)} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rm-index__main">
                  <span
                    className={cn(
                      "rm-index__thumb",
                      previewPhoto && "rm-index__thumb--photo",
                    )}
                    aria-hidden
                  >
                    <img
                      src={previewSrc}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: getCaseHomePreviewPosition(study) }}
                    />
                  </span>
                  <span className={cn("rm-index__name", subsectionTitle)}>{study.client}</span>
                  <span className={cn("rm-index__meta", textMeta)}>
                    {study.niche} · {study.format}
                  </span>
                </span>

                <span className="rm-index__metric">
                  <span className="rm-index__metric-value">
                    {study.primaryMetric.value === "LATAM" ? "Latam" : study.primaryMetric.value}
                  </span>
                  <span className={cn("rm-index__metric-label", textMeta)}>{study.primaryMetric.label}</span>
                </span>

                <span className={cn("rm-index__arrow", textGhost)} aria-hidden>
                  <BtnArrow />
                </span>
              </Link>
            );
            })}
          </div>

          <Link
            to="/cases"
            className={cn(
              btnGhostLink,
              "justify-self-end whitespace-nowrap md:col-span-2 md:col-start-2",
            )}
          >
            View all case studies
            <BtnArrow />
          </Link>
        </div>
      </div>

      <motion.div className="rm-index__cursor" style={{ x, y }} aria-hidden>
        <div className={cn("rm-index__anchor", previewBelow && "rm-index__anchor--below")}>
          <AnimatePresence mode="wait">
            {activeCase ? (
              <motion.div
                key={activeCase.slug}
                className={cn(
                  "rm-index__preview",
                  isCaseHomePreviewPhoto(getCaseHomePreviewImage(activeCase))
                    ? "rm-index__preview--photo"
                    : undefined,
                )}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={getCaseHomePreviewImage(activeCase)}
                  alt=""
                  decoding="async"
                  style={{ objectPosition: getCaseHomePreviewPosition(activeCase) }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
