import { useCallback, useEffect, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import {
  bodyCopy,
  BtnArrow,
  btnGhostLink,
  FramerTag,
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
  const [finePointer, setFinePointer] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = reduce
    ? { stiffness: 1000, damping: 100, mass: 0.1 }
    : { stiffness: 420, damping: 52, mass: 0.3 };
  const x = useSpring(px, springConfig);
  const y = useSpring(py, springConfig);
  const cursorTransform = useMotionTemplate`translate(${x}px, ${y}px)`;

  const PREVIEW_EASE = [0.23, 1, 0.32, 1] as const;

  const updatePreviewBelow = useCallback((clientY: number) => {
    setPreviewBelow((prev) => {
      if (!prev && clientY < 260) return true;
      if (prev && clientY > 340) return false;
      return prev;
    });
  }, []);

  const [readySlugs, setReadySlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Quiet the global premium cursor while a preview is up — otherwise its ring
  // (which enlarges over links) punches through the floating card.
  useEffect(() => {
    if (reduce || !finePointer) return;
    const root = document.documentElement;
    root.classList.toggle("rm-cursor-quiet", active >= 0);
    return () => root.classList.remove("rm-cursor-quiet");
  }, [active, finePointer, reduce]);

  const activateRow = useCallback(
    (index: number, clientX?: number, clientY?: number) => {
      setActive(index);
      if (reduce || !finePointer) return;
      if (clientX != null) px.set(clientX);
      if (clientY != null) {
        py.set(clientY);
        updatePreviewBelow(clientY);
      }
    },
    [finePointer, px, py, reduce, updatePreviewBelow],
  );

  const handleMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduce || !finePointer) return;
      px.set(event.clientX);
      py.set(event.clientY);
      updatePreviewBelow(event.clientY);
    },
    [finePointer, px, py, reduce, updatePreviewBelow],
  );

  // Preload + track decode so the card never flashes an empty frame before the
  // image paints.
  useEffect(() => {
    featuredCases.forEach((study) => {
      const markReady = () =>
        setReadySlugs((prev) => (prev.has(study.slug) ? prev : new Set(prev).add(study.slug)));
      const img = new Image();
      img.onload = markReady;
      img.src = getCaseHomePreviewImage(study);
      if (img.complete) markReady();
    });
  }, [featuredCases]);

  if (featuredCases.length === 0) return null;

  const activeCase = active >= 0 ? featuredCases[active] : null;

  return (
    <section
      id="work"
      aria-labelledby="cases-heading"
      className={cn(sectionShell, "rm-section-work pt-0")}
    >
      <div className={sectionInner}>
        <div className={cn("rm-work", sectionContentGrid, "items-start")}>
          <div className="reveal-fade md:col-start-1 md:self-start">
            <FramerTag>{header.tag}</FramerTag>
          </div>
          <header className={cn("reveal-fade", sectionIntroStack, "md:col-span-2 md:col-start-2")}>
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
                className="rm-index__row rm-touch group"
                data-on={active === index}
                onPointerEnter={(event) =>
                  activateRow(index, event.clientX, event.clientY)
                }
                onFocus={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  activateRow(
                    index,
                    rect.left + rect.width * 0.62,
                    rect.top + rect.height * 0.5,
                  );
                }}
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
                  <span className="rm-index__metric-value">{study.primaryMetric.value}</span>
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

      {finePointer && !reduce ? (
        <motion.div
          className="rm-index__cursor"
          style={{ transform: cursorTransform }}
          aria-hidden
        >
          <div className={cn("rm-index__anchor", previewBelow && "rm-index__anchor--below")}>
            <AnimatePresence initial={false}>
              {activeCase && readySlugs.has(activeCase.slug) ? (
                <motion.div
                  key={activeCase.slug}
                  className={cn(
                    "rm-index__preview",
                    isCaseHomePreviewPhoto(getCaseHomePreviewImage(activeCase))
                      ? "rm-index__preview--photo"
                      : undefined,
                  )}
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    scale: 0.985,
                    filter: "blur(2px)",
                    transition: { duration: 0.12, ease: PREVIEW_EASE },
                  }}
                  transition={{ duration: 0.2, ease: PREVIEW_EASE }}
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
      ) : null}
    </section>
  );
}
