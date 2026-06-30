import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

import {
  BtnArrow,
  btnOutlineOnDark,
  FramerTag,
  sectionContentGrid,
  sectionGridSpacer,
  sectionInner,
  sectionHeadline,
  sectionLeadStack,
  sectionSubheading,
  sectionShell,
  subsectionTitle,
  textGhost,
  textMeta,
} from "@/components/framer-section";
import {
  getHomeFeaturedCases,
  getCaseHomePreviewImage,
  getCaseHomePreviewPosition,
  isCaseHomePreviewPhoto,
  type CaseStudy,
} from "@/lib/cases";
import { casesHomeTeaserHeaderProps } from "@/lib/cases-gallery-config";
import { readHeaderOffsetPx } from "@/lib/read-header-offset";
import { cn } from "@/lib/utils";

/** Extra scroll distance (vh) for card crossfade — must exceed ~0 so Lenis can scrub. */
const WORK_SCENE_SCROLL_VH = 48;

/** Breathing room after the last case before the next section. */
const WORK_SCENE_RELEASE_VH = 5;

/** Map raw track progress (incl. release runway) to 0–1 crossfade progress. */
function motionProgressFromRaw(p: number) {
  const scrollRatio =
    WORK_SCENE_SCROLL_VH / (WORK_SCENE_SCROLL_VH + WORK_SCENE_RELEASE_VH);
  if (p <= scrollRatio) return p / scrollRatio;
  return 1;
}

function rawProgressFromMotion(motionP: number) {
  const scrollRatio =
    WORK_SCENE_SCROLL_VH / (WORK_SCENE_SCROLL_VH + WORK_SCENE_RELEASE_VH);
  return motionP * scrollRatio;
}

/** Clip progress rail at last tick — no trailing dim line below Progresivo. */
function syncRailEnd(indexEl: HTMLElement) {
  const progress = indexEl.querySelector<HTMLElement>(".rm-work-index-progress");
  const lastTick = indexEl.querySelector<HTMLElement>(
    ".rm-index__row:last-child .rm-work-index-progress__tick-anchor",
  );
  if (!progress || !lastTick) return;
  const indexTop = indexEl.getBoundingClientRect().top;
  const tickRect = lastTick.getBoundingClientRect();
  const endPx = Math.max(8, tickRect.top + tickRect.height / 2 - indexTop);
  indexEl.style.setProperty("--work-rail-end", `${endPx.toFixed(1)}px`);
}

/** Progress delta/ms — above this, UI drops decorative transitions. */
const WORK_SCROLL_FAST_VELOCITY = 0.00085;

/** Any progress step above this starts motion-scrub mode. */
const WORK_SCROLL_DELTA = 0.00005;

/** Ms without scroll motion before re-enabling row transitions. */
const WORK_SCROLL_FAST_SETTLE_MS = 180;

/** Overlap between adjacent preview cards (fraction of one segment). */
const CROSSFADE_OVERLAP = 0.28;

/** Row is navigable once preview crossfade weight passes this. */
const ROW_NAV_WEIGHT = 0.88;

/** Row typography highlight threshold. */
const ROW_ON_WEIGHT = 0.55;

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  const x = clamp(0, 1, t);
  return 1 - (1 - x) ** 3;
}

function easeInCubic(t: number) {
  const x = clamp(0, 1, t);
  return x ** 3;
}

function measureTrackProgress(track: HTMLElement, sticky: HTMLElement | null) {
  const rect = track.getBoundingClientRect();
  const scrollable = sticky
    ? Math.max(1, track.offsetHeight - sticky.offsetHeight)
    : Math.max(1, track.offsetHeight - window.innerHeight);
  const headerPx = readHeaderOffsetPx();
  return clamp(0, 1, (headerPx - rect.top) / scrollable);
}

function scrollYForWorkProgress(
  track: HTMLElement,
  sticky: HTMLElement,
  progress: number,
) {
  const scrollable = Math.max(1, track.offsetHeight - sticky.offsetHeight);
  const headerPx = readHeaderOffsetPx();
  const startY = window.scrollY + track.getBoundingClientRect().top - headerPx;
  return startY + scrollable * clamp(0, 1, progress);
}

type CardWindow = {
  fadeInStart: number;
  fullStart: number;
  fullEnd: number;
  fadeOutEnd: number;
  peak: number;
  enterScale: number;
};

function cardWindow(index: number, count: number): CardWindow {
  const seg = 1 / count;
  const sliceStart = index * seg;
  const sliceEnd = (index + 1) * seg;
  const overlap = seg * CROSSFADE_OVERLAP;

  return {
    fadeInStart: index === 0 ? 0 : sliceStart - overlap,
    fullStart: index === 0 ? 0 : sliceStart,
    fullEnd: index === count - 1 ? 1 : sliceEnd,
    fadeOutEnd: index === count - 1 ? 1 : sliceEnd + overlap,
    peak: (sliceStart + sliceEnd) / 2,
    enterScale: index === 0 ? 1 : 0.98,
  };
}

function crossfadeOpacity(index: number, count: number, p: number) {
  const w = cardWindow(index, count);
  if (p < w.fadeInStart || p > w.fadeOutEnd) return 0;
  if (p >= w.fullStart && p <= w.fullEnd) return 1;
  if (p < w.fullStart) {
    const t = (p - w.fadeInStart) / Math.max(0.001, w.fullStart - w.fadeInStart);
    return clamp(0, 1, easeOutCubic(t));
  }
  const t = (p - w.fullEnd) / Math.max(0.001, w.fadeOutEnd - w.fullEnd);
  return clamp(0, 1, 1 - easeInCubic(t));
}

function crossfadeScale(index: number, count: number, p: number) {
  const w = cardWindow(index, count);
  const opacity = crossfadeOpacity(index, count, p);
  if (opacity <= 0) return w.enterScale;
  if (p < w.fullStart && index > 0) {
    const t = easeOutCubic(
      (p - w.fadeInStart) / Math.max(0.001, w.fullStart - w.fadeInStart),
    );
    return w.enterScale + (1 - w.enterScale) * t;
  }
  if (p > w.fullEnd && index < count - 1) {
    const t = easeInCubic((p - w.fullEnd) / Math.max(0.001, w.fadeOutEnd - w.fullEnd));
    return 1 - (1 - w.enterScale) * t;
  }
  return 1;
}

/** Subtle blur bridge while two previews overlap (max 2px at opacity ≈ 0.5). */
function crossfadeBlur(opacity: number) {
  if (opacity <= 0.12 || opacity >= 0.88) return 0;
  const mid = 1 - Math.abs(opacity - 0.5) * 2;
  return mid * 2;
}

function crossfadeOpacities(count: number, p: number) {
  return Array.from({ length: count }, (_, i) => crossfadeOpacity(i, count, p));
}

/** Keep crossover brightness stable when overlapping windows sum > 1. */
function normalizedCrossfadeOpacities(count: number, p: number) {
  const raw = crossfadeOpacities(count, p);
  const sum = raw.reduce((acc, value) => acc + value, 0);
  if (sum <= 1 || sum === 0) return raw;
  return raw.map((value) => value / sum);
}

function activeCardIndex(p: number, count: number) {
  const opacities = normalizedCrossfadeOpacities(count, p);
  let best = 0;
  let bestOpacity = -1;
  opacities.forEach((opacity, index) => {
    if (opacity > bestOpacity) {
      bestOpacity = opacity;
      best = index;
    }
  });
  return best;
}

function useWorkSceneProgress(
  trackRef: RefObject<HTMLDivElement | null>,
  stickyRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onProgress?: (p: number) => void,
  onInViewChange?: (inView: boolean) => void,
  onFastScrollChange?: (fast: boolean) => void,
  suppressFastScrollRef?: RefObject<boolean>,
) {
  const progressRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  const onInViewChangeRef = useRef(onInViewChange);
  const onFastScrollChangeRef = useRef(onFastScrollChange);
  const lastSampleRef = useRef({ p: 0, t: 0 });
  const fastRef = useRef(false);
  const settleRef = useRef(0);
  onProgressRef.current = onProgress;
  onInViewChangeRef.current = onInViewChange;
  onFastScrollChangeRef.current = onFastScrollChange;

  const markMotionScrub = useCallback(() => {
    if (!enabled || !onFastScrollChangeRef.current) return;
    window.clearTimeout(settleRef.current);
    if (!fastRef.current) {
      fastRef.current = true;
      onFastScrollChangeRef.current(true);
    }
    settleRef.current = window.setTimeout(() => {
      if (!fastRef.current) return;
      fastRef.current = false;
      onFastScrollChangeRef.current?.(false);
    }, WORK_SCROLL_FAST_SETTLE_MS);
  }, [enabled]);

  const syncProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track || !enabled) return;
    const p = measureTrackProgress(track, stickyRef.current);
    progressRef.current = p;
    track.dataset.workProgress = p.toFixed(4);

    const now = performance.now();
    const { p: lastP, t: lastT } = lastSampleRef.current;
    const dt = Math.max(1, now - lastT);
    const velocity = Math.abs(p - lastP) / dt;
    const delta = Math.abs(p - lastP);
    lastSampleRef.current = { p, t: now };

    if (
      !suppressFastScrollRef?.current &&
      (delta > WORK_SCROLL_DELTA || velocity > WORK_SCROLL_FAST_VELOCITY)
    ) {
      markMotionScrub();
    }

    onProgressRef.current?.(p);
  }, [enabled, markMotionScrub, stickyRef, suppressFastScrollRef, trackRef]);

  const getProgress = useCallback(() => progressRef.current, []);

  useEffect(() => {
    if (!enabled) {
      progressRef.current = 0;
      lastSampleRef.current = { p: 0, t: 0 };
      window.clearTimeout(settleRef.current);
      if (fastRef.current) {
        fastRef.current = false;
        onFastScrollChangeRef.current?.(false);
      }
      onInViewChangeRef.current?.(false);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    syncProgress();
    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress, { passive: true });
    window.addEventListener("rm:loading-end", syncProgress);

    const ro = new ResizeObserver(syncProgress);
    ro.observe(track);
    const sticky = stickyRef.current;
    if (sticky) ro.observe(sticky);

    let raf = 0;
    let inView = false;

    const stopRaf = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const startRaf = () => {
      if (raf) return;
      const tick = () => {
        if (!inView) {
          raf = 0;
          return;
        }
        syncProgress();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        onInViewChangeRef.current?.(inView);
        if (inView) {
          syncProgress();
          startRaf();
        } else {
          stopRaf();
        }
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );
    io.observe(track);

    return () => {
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
      window.removeEventListener("rm:loading-end", syncProgress);
      ro.disconnect();
      io.disconnect();
      stopRaf();
      window.clearTimeout(settleRef.current);
      if (fastRef.current) {
        fastRef.current = false;
        onFastScrollChangeRef.current?.(false);
      }
      onInViewChangeRef.current?.(false);
    };
  }, [enabled, stickyRef, syncProgress, trackRef]);

  return { getProgress, syncProgress, markMotionScrub };
}

function WorkPreviewCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const previewSrc = getCaseHomePreviewImage(study);
  const previewPhoto = isCaseHomePreviewPhoto(previewSrc);

  return (
    <div
      className="rm-work-preview-card"
      data-card-index={index}
      style={{ zIndex: index + 1 }}
      aria-hidden={index !== 0}
    >
      <div className="rm-work-preview-card__inner">
        <div className="rm-work-preview-card__shadow" aria-hidden />
        <div
          className={cn(
            "rm-index__preview rm-index__preview--scene",
            previewPhoto && "rm-index__preview--photo",
          )}
        >
          <img
            src={previewSrc}
            alt=""
            decoding="async"
            style={{ objectPosition: getCaseHomePreviewPosition(study) }}
          />
        </div>
      </div>
    </div>
  );
}

export function CasesSection() {
  const header = casesHomeTeaserHeaderProps();
  const featuredCases = getHomeFeaturedCases();
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const [scrollScene, setScrollScene] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [fastScroll, setFastScroll] = useState(false);
  const fastScrollRef = useRef(false);
  fastScrollRef.current = fastScroll;
  const pendingAnnounceRef = useRef(-1);
  const lenis = useLenis();
  const router = useRouter();
  const sceneEnabled = scrollScene && !reduce;
  const caseCountRef = useRef(featuredCases.length);
  caseCountRef.current = featuredCases.length;
  const featuredCasesRef = useRef(featuredCases);
  featuredCasesRef.current = featuredCases;
  const prefetchedSlugsRef = useRef(new Set<string>());
  const lastAnnouncedRef = useRef(-1);
  const liveRef = useRef<HTMLDivElement>(null);
  const clickNavRef = useRef(false);
  const clickNavTimerRef = useRef(0);

  const endClickNav = useCallback(() => {
    clickNavRef.current = false;
    window.clearTimeout(clickNavTimerRef.current);
  }, []);

  const beginClickNav = useCallback(() => {
    clickNavRef.current = true;
    window.clearTimeout(clickNavTimerRef.current);
    clickNavTimerRef.current = window.setTimeout(endClickNav, 1250);
  }, [endClickNav]);

  const syncWorkSceneChrome = useCallback((p: number) => {
    const count = caseCountRef.current;
    const cases = featuredCasesRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    const indexEl = indexRef.current;
    const motionP = motionProgressFromRaw(p);
    const rowWeights = normalizedCrossfadeOpacities(count, motionP);
    const previewWeights = rowWeights;

    if (track) {
      track.style.setProperty("--work-p", motionP.toFixed(4));
    }
    if (rail) {
      rail.style.setProperty("--work-p", motionP.toFixed(4));
      rail.querySelectorAll<HTMLElement>(".rm-work-preview-card").forEach((card, i) => {
        const opacity = previewWeights[i] ?? 0;
        const rawScale = crossfadeScale(i, count, motionP);
        const scale = fastScrollRef.current ? 1 - (1 - rawScale) * 0.2 : rawScale;
        const blur = crossfadeBlur(opacity);
        card.style.opacity = String(opacity);
        const inner = card.querySelector<HTMLElement>(".rm-work-preview-card__inner");
        const preview = card.querySelector<HTMLElement>(".rm-index__preview--scene");
        const img = preview?.querySelector("img");
        if (inner) {
          inner.style.transform = `scale(${scale})`;
        }
        if (preview) {
          preview.style.filter =
            !fastScrollRef.current && blur > 0 ? `blur(${blur}px)` : "";
        }
        if (img) {
          if (fastScrollRef.current) {
            img.style.removeProperty("object-position");
          } else {
            const pan = (motionP - 0.5) * 3;
            img.style.objectPosition = `50% calc(50% + ${pan}%)`;
          }
        }
        card.setAttribute("aria-hidden", opacity > 0.55 ? "false" : "true");
      });
    }

    if (indexEl) {
      indexEl.style.setProperty("--work-p", motionP.toFixed(4));
      const active = activeCardIndex(motionP, count);
      indexEl.dataset.activeIndex = String(active);

      if (active !== lastAnnouncedRef.current) {
        if (fastScrollRef.current) {
          pendingAnnounceRef.current = active;
        } else if (liveRef.current) {
          lastAnnouncedRef.current = active;
          const study = cases[active];
          if (study) {
            liveRef.current.textContent = `Showing case study: ${study.client}`;
          }
        }
      }

      indexEl.querySelectorAll<HTMLElement>(".rm-index__row").forEach((row, i) => {
        const weight = rowWeights[i] ?? 0;
        row.style.setProperty("--row-weight", weight.toFixed(4));
        row.dataset.on = weight > ROW_ON_WEIGHT ? "true" : "false";
        row.dataset.ready = weight > ROW_NAV_WEIGHT ? "true" : "false";

        const tick = row.querySelector<HTMLElement>(".rm-work-index-progress__tick-anchor");
        if (tick) {
          tick.dataset.active = i === active ? "true" : "false";
        }

        const slug = cases[i]?.slug;
        if (slug && weight > ROW_NAV_WEIGHT && !prefetchedSlugsRef.current.has(slug)) {
          prefetchedSlugsRef.current.add(slug);
          void router.preloadRoute({ to: "/cases/$slug", params: { slug } });
        }
      });
      syncRailEnd(indexEl);
    }

    const sticky = stickyRef.current;
    const headerPx = readHeaderOffsetPx();
    const stickyTop = sticky?.getBoundingClientRect().top ?? headerPx;
    const unpinned = sticky != null && stickyTop < headerPx - 0.5;
    const handoff = unpinned || p >= 1 - 0.002;
    sceneRef.current?.classList.toggle("rm-work-scene--handoff", handoff);
    sceneRef.current?.classList.toggle("rm-work-scene--exit", unpinned);
  }, [router]);

  const { getProgress, syncProgress, markMotionScrub } = useWorkSceneProgress(
    trackRef,
    stickyRef,
    sceneEnabled,
    syncWorkSceneChrome,
    setScrubbing,
    setFastScroll,
    clickNavRef,
  );

  useLenis(
    (lenis) => {
      if (!sceneEnabled) return;
      syncProgress();
      if (clickNavRef.current) return;
      if (Math.abs(lenis.velocity) > 1.4) markMotionScrub();
    },
    [sceneEnabled, syncProgress, markMotionScrub],
  );

  useEffect(() => {
    if (fastScroll || pendingAnnounceRef.current < 0 || !liveRef.current) return;
    const active = pendingAnnounceRef.current;
    pendingAnnounceRef.current = -1;
    const study = featuredCasesRef.current[active];
    if (!study) return;
    lastAnnouncedRef.current = active;
    liveRef.current.textContent = `Showing case study: ${study.client}`;
  }, [fastScroll]);

  const scrollToCase = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;
      const peak = cardWindow(index, caseCountRef.current).peak;
      const targetY = scrollYForWorkProgress(track, sticky, rawProgressFromMotion(peak));
      beginClickNav();
      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: 1.05,
          easing: (t: number) => 1 - (1 - t) ** 3,
          onComplete: endClickNav,
        });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [beginClickNav, endClickNav, lenis],
  );

  const handleRowClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, index: number) => {
      if (!sceneEnabled) return;
      const p = motionProgressFromRaw(getProgress());
      const active = activeCardIndex(p, caseCountRef.current);
      if (index !== active) {
        event.preventDefault();
        scrollToCase(index);
        return;
      }
      const weight = normalizedCrossfadeOpacities(caseCountRef.current, p)[index] ?? 0;
      if (weight < ROW_NAV_WEIGHT) {
        event.preventDefault();
        scrollToCase(index);
      }
    },
    [getProgress, sceneEnabled, scrollToCase],
  );

  const syncSceneLayout = useCallback(() => {
    const rail = railRef.current;
    const index = indexRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (rail && index) {
      const h = index.offsetHeight;
      rail.style.setProperty("--rm-work-rail-h", `${h}px`);
      rail.style.minHeight = `${h}px`;
      syncRailEnd(index);
    }
    if (track && sticky && window.matchMedia("(min-width: 768px)").matches) {
      const scrollRun = (WORK_SCENE_SCROLL_VH / 100) * window.innerHeight;
      const releaseRun = (WORK_SCENE_RELEASE_VH / 100) * window.innerHeight;
      track.style.height = `${sticky.offsetHeight + scrollRun + releaseRun}px`;
      lenis?.resize();
    } else if (track) {
      track.style.removeProperty("height");
    }
    syncProgress();
  }, [lenis, syncProgress]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setScrollScene(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    syncSceneLayout();
    const index = indexRef.current;
    const sticky = stickyRef.current;
    const ro = new ResizeObserver(() => syncSceneLayout());
    if (index) ro.observe(index);
    if (sticky) ro.observe(sticky);
    window.addEventListener("resize", syncSceneLayout);
    requestAnimationFrame(() => syncSceneLayout());
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncSceneLayout);
    };
  }, [syncSceneLayout, featuredCases.length, scrollScene]);

  useEffect(() => {
    if (!sceneEnabled) {
      endClickNav();
      prefetchedSlugsRef.current.clear();
      lastAnnouncedRef.current = -1;
      const indexEl = indexRef.current;
      indexEl?.querySelectorAll<HTMLElement>(".rm-index__row").forEach((row, i) => {
        row.style.removeProperty("--row-weight");
        row.dataset.on = i === 0 ? "true" : "false";
        row.dataset.ready = "true";
      });
      if (indexEl) indexEl.dataset.activeIndex = "0";
      sceneRef.current?.classList.remove("rm-work-scene--live");
      sceneRef.current?.classList.remove("rm-work-scene--handoff");
      sceneRef.current?.classList.remove("rm-work-scene--exit");
      return;
    }
    syncWorkSceneChrome(getProgress());
    const study = featuredCases[0];
    if (study && liveRef.current) {
      liveRef.current.textContent = `Showing case study: ${study.client}`;
      lastAnnouncedRef.current = 0;
    }
  }, [endClickNav, sceneEnabled, getProgress, syncWorkSceneChrome, featuredCases]);

  useEffect(() => {
    if (!sceneEnabled) return;
    const settleHash = () => {
      requestAnimationFrame(() => {
        syncProgress();
        requestAnimationFrame(syncProgress);
      });
    };
    if (window.location.hash === "#work") settleHash();
    window.addEventListener("hashchange", settleHash);
    return () => window.removeEventListener("hashchange", settleHash);
  }, [sceneEnabled, syncProgress]);

  useEffect(() => {
    sceneRef.current?.classList.toggle("rm-work-scene--live", scrubbing && sceneEnabled);
  }, [scrubbing, sceneEnabled]);

  useEffect(() => {
    sceneRef.current?.classList.toggle("rm-work-scene--scrubbing", fastScroll && sceneEnabled);
  }, [fastScroll, sceneEnabled]);

  useEffect(() => {
    if (!sceneEnabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
        return;
      }

      const section = sceneRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inBand = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
      if (!inBand) return;

      const count = caseCountRef.current;
      const active = activeCardIndex(motionProgressFromRaw(getProgress()), count);
      let next: number | null = null;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          next = Math.min(active + 1, count - 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          next = Math.max(active - 1, 0);
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = count - 1;
          break;
        default:
          return;
      }

      if (next === active) return;
      event.preventDefault();
      scrollToCase(next);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [getProgress, sceneEnabled, scrollToCase]);

  if (featuredCases.length === 0) return null;

  return (
    <section
      ref={sceneRef}
      id="work"
      aria-labelledby="cases-heading"
      tabIndex={sceneEnabled ? -1 : undefined}
      className={cn(sectionShell, "rm-section-work rm-work-scene border-b-0 pt-0 pb-8 md:pb-10")}
    >
      <div ref={trackRef} className={cn("rm-work-scene__track-shell", scrollScene && !reduce && "rm-work-scene__track")}>
        {scrollScene && !reduce ? <div className="rm-work-scene__pin-gutter" aria-hidden /> : null}
        <div ref={stickyRef} className={cn(scrollScene && !reduce && "rm-work-scene__sticky")}>
          <div className={sectionInner}>
            <div className={cn("rm-work", sectionContentGrid, "items-start md:items-stretch rm-work-scene__grid")}>
              <div className="reveal-fade md:col-start-1 md:self-start md:pt-1">
                <FramerTag>{header.tag}</FramerTag>
              </div>
              <header
                className={cn(
                  "reveal-fade",
                  sectionLeadStack,
                  "md:col-span-2 md:col-start-2 md:self-start",
                )}
              >
                <h2 id="cases-heading" className={cn(sectionHeadline, "m-0 max-w-[18ch] text-balance")}>
                  {header.heading}
                </h2>
                {header.subheading ? (
                  <p className={cn("m-0", sectionSubheading, "rm-copy-standfirst--band")}>
                    {header.subheading}
                  </p>
                ) : null}
              </header>

              <div
                ref={railRef}
                className="rm-work-preview-rail hidden md:block md:col-start-1 md:row-start-2 md:self-start"
                aria-hidden
              >
                {scrollScene && !reduce ? (
                  featuredCases.map((study, index) => (
                    <WorkPreviewCard key={study.slug} study={study} index={index} />
                  ))
                ) : (
                  <div
                    className={cn(
                      "rm-index__preview rm-index__preview--scene",
                      isCaseHomePreviewPhoto(getCaseHomePreviewImage(featuredCases[0]))
                        ? "rm-index__preview--photo"
                        : undefined,
                    )}
                  >
                    <img
                      src={getCaseHomePreviewImage(featuredCases[0])}
                      alt=""
                      decoding="async"
                      style={{ objectPosition: getCaseHomePreviewPosition(featuredCases[0]) }}
                    />
                  </div>
                )}
              </div>

              <div
                ref={indexRef}
                className="rm-index md:col-span-2 md:col-start-2 md:row-start-2 md:self-start"
              >
                <div
                  ref={liveRef}
                  className="sr-only"
                  aria-live="polite"
                  aria-atomic="true"
                />
                {scrollScene && !reduce ? (
                  <div className="rm-work-index-progress" aria-hidden>
                    <span className="rm-work-index-progress__fill" />
                  </div>
                ) : null}
                {featuredCases.map((study, index) => {
                  const previewSrc = getCaseHomePreviewImage(study);
                  const previewPhoto = isCaseHomePreviewPhoto(previewSrc);
                  return (
                    <Link
                      key={study.slug}
                      to="/cases/$slug"
                      params={{ slug: study.slug }}
                      preload="intent"
                      className="rm-index__row rm-touch group"
                      data-on={scrollScene && !reduce ? "false" : index === 0 ? "true" : "false"}
                      data-ready={scrollScene && !reduce ? "false" : "true"}
                      onClick={(event) => handleRowClick(event, index)}
                      aria-label={`${study.client} — ${study.primaryMetric.value} ${study.primaryMetric.label}`}
                    >
                      <span className="rm-index__num-cell">
                        {scrollScene && !reduce ? (
                          <span className="rm-work-index-progress__tick-anchor">
                            <button
                              type="button"
                              className="rm-work-index-progress__tick"
                              aria-label={`Show ${study.client}`}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                scrollToCase(index);
                              }}
                            />
                          </span>
                        ) : (
                          <span className={cn("rm-index__num", textGhost)} aria-hidden>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        )}
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
                        <span className={cn("rm-index__metric-label", textMeta)}>
                          {study.primaryMetric.label}
                        </span>
                      </span>

                      <span className={cn("rm-index__arrow", textGhost)} aria-hidden>
                        <BtnArrow />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className={sectionGridSpacer} aria-hidden />
              <div className="reveal-fade mt-2 flex justify-end md:col-span-2 md:col-start-2 md:mt-0 md:self-end">
                <Link to="/cases" className={cn(btnOutlineOnDark, "group w-fit gap-2")}>
                  View all case studies
                  <BtnArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
