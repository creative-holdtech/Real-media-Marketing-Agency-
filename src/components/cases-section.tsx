import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useLenis } from "lenis/react";

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
import { measureStickySceneProgress, readHeaderOffsetPx } from "@/lib/read-header-offset";
import {
  activeCardIndex,
  cardWindow,
  crossfadeScale,
  motionProgressFromRaw,
  normalizedCrossfadeOpacities,
  previewWeight,
  rawProgressFromMotion,
  ROW_NAV_WEIGHT,
  rowWeight,
  syncWorkRailEnd,
  WORK_SCENE_RELEASE_VH,
  WORK_SCENE_SCROLL_VH,
} from "@/lib/work-scene-scroll";
import { cn } from "@/lib/utils";

const FAST_VELOCITY = 0.00085;
const FAST_DELTA = 0.00005;
const FAST_SETTLE_MS = 180;
const MotionLink = motion.create(Link);

function scrollYForWorkProgress(
  track: HTMLElement,
  sticky: HTMLElement,
  progress: number,
) {
  const scrollable = Math.max(1, track.offsetHeight - sticky.offsetHeight);
  const headerPx = readHeaderOffsetPx();
  const startY = window.scrollY + track.getBoundingClientRect().top - headerPx;
  const clamped = Math.max(0, Math.min(1, progress));
  return startY + scrollable * clamped;
}

function useWorkSceneProgress(
  trackRef: React.RefObject<HTMLDivElement | null>,
  stickyRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const rawProgress = useMotionValue(0);
  const motionP = useTransform(rawProgress, motionProgressFromRaw);

  useEffect(() => {
    if (!enabled) {
      rawProgress.set(0);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const sync = () => {
      raf = 0;
      const sticky = stickyRef.current;
      const p = measureStickySceneProgress(track, sticky);
      rawProgress.set(p);
      track.dataset.workProgress = p.toFixed(4);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("rm:loading-end", onScroll);

    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    if (stickyRef.current) ro.observe(stickyRef.current);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sync();
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );
    io.observe(track);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("rm:loading-end", onScroll);
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, rawProgress, stickyRef, trackRef]);

  return { rawProgress, motionP };
}

function useFastScroll(
  rawProgress: MotionValue<number>,
  enabled: boolean,
  suppressRef: React.RefObject<boolean>,
) {
  const [fast, setFast] = useState(false);
  const last = useRef({ p: 0, t: 0 });
  const settleRef = useRef(0);

  useMotionValueEvent(rawProgress, "change", (p) => {
    if (!enabled || suppressRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - last.current.t);
    const velocity = Math.abs(p - last.current.p) / dt;
    const delta = Math.abs(p - last.current.p);
    last.current = { p, t: now };

    if (delta > FAST_DELTA || velocity > FAST_VELOCITY) {
      window.clearTimeout(settleRef.current);
      setFast(true);
      settleRef.current = window.setTimeout(() => setFast(false), FAST_SETTLE_MS);
    }
  });

  useEffect(() => {
    if (!enabled) setFast(false);
  }, [enabled]);

  return fast;
}

type MotionPreviewCardProps = {
  study: CaseStudy;
  index: number;
  count: number;
  motionP: MotionValue<number>;
  previewP: MotionValue<number>;
  fastScroll: boolean;
};

function MotionPreviewCard({
  study,
  index,
  count,
  motionP,
  previewP,
  fastScroll,
}: MotionPreviewCardProps) {
  const previewSrc = getCaseHomePreviewImage(study);
  const previewPhoto = isCaseHomePreviewPhoto(previewSrc);

  const opacity = useTransform(previewP, (p) => previewWeight(index, count, p, null));
  const [isVisible, setIsVisible] = useState(index === 0);
  const scale = useTransform(motionP, (p) => {
    const raw = crossfadeScale(index, count, p);
    return fastScroll ? 1 - (1 - raw) * 0.2 : raw;
  });
  const imgY = useTransform(motionP, (p) => {
    if (fastScroll) return "50%";
    const pan = (p - 0.5) * 2;
    return `calc(50% + ${pan}%)`;
  });
  const objectPosition = useMotionTemplate`50% ${imgY}`;
  const transform = useMotionTemplate`scale(${scale})`;

  useMotionValueEvent(opacity, "change", (value) => {
    setIsVisible((prev) => {
      const next = value > 0.15;
      return prev === next ? prev : next;
    });
  });

  return (
    <motion.div
      className="rm-work-preview-card"
      data-card-index={index}
      style={{ zIndex: index + 1, opacity }}
      aria-hidden={!isVisible}
    >
      <motion.div className="rm-work-preview-card__inner" style={{ transform }}>
        <div className="rm-work-preview-card__shadow" aria-hidden />
        <div
          className={cn(
            "rm-index__preview rm-index__preview--scene",
            previewPhoto && "rm-index__preview--photo",
          )}
        >
          <motion.img
            src={previewSrc}
            alt=""
            decoding="async"
            style={{ objectPosition }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

type MotionWorkRowProps = {
  study: CaseStudy;
  index: number;
  count: number;
  motionP: MotionValue<number>;
  activeIndex: number;
  hoverIndex: number | null;
  fastScroll: boolean;
  onHover: (index: number) => void;
  onHoverEnd: () => void;
  onRowClick: (event: MouseEvent<HTMLAnchorElement>, index: number) => void;
  onTickClick: (index: number) => void;
};

function MotionWorkRow({
  study,
  index,
  count,
  motionP,
  activeIndex,
  hoverIndex,
  fastScroll,
  onHover,
  onHoverEnd,
  onRowClick,
  onTickClick,
}: MotionWorkRowProps) {
  const previewSrc = getCaseHomePreviewImage(study);
  const previewPhoto = isCaseHomePreviewPhoto(previewSrc);
  const isOn = index === activeIndex;
  const isHover = hoverIndex === index;
  const [navReady, setNavReady] = useState(index === 0);
  const weight = useTransform(motionP, (p) => rowWeight(index, count, p));
  const mainOpacity = useTransform(weight, (w) => {
    if (isOn) return 1;
    if (isHover) return 0.82;
    return 0.48 + w * 0.52;
  });
  const arrowX = useTransform(weight, (w) => (isOn ? w * 4 : 4));
  const y = useTransform(weight, (w) => (fastScroll ? 0 : (1 - w) * 3));

  useMotionValueEvent(weight, "change", (w) => {
    setNavReady((prev) => {
      const next = w > ROW_NAV_WEIGHT;
      return prev === next ? prev : next;
    });
  });

  return (
    <MotionLink
      to="/cases/$slug"
      params={{ slug: study.slug }}
      preload="intent"
      className="rm-index__row rm-touch group"
      style={{ y }}
      data-on={isOn ? "true" : "false"}
      data-ready={navReady ? "true" : "false"}
      data-hover={isHover ? "true" : "false"}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHover(index)}
      onBlur={onHoverEnd}
      onClick={(event) => onRowClick(event, index)}
      aria-label={`${study.client} — ${study.primaryMetric.value} ${study.primaryMetric.label}`}
    >
        <span className="rm-index__num-cell">
          <span
            className="rm-work-index-progress__tick-anchor"
            data-active={isOn ? "true" : "false"}
          >
            <button
              type="button"
              className="rm-work-index-progress__tick"
              aria-label={`Show ${study.client}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTickClick(index);
              }}
            />
          </span>
        </span>

        <motion.span className="rm-index__main" style={{ opacity: mainOpacity }}>
          <span
            className={cn("rm-index__thumb", previewPhoto && "rm-index__thumb--photo")}
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
          <span
            className={cn(
              "rm-index__name",
              subsectionTitle,
              (isOn || isHover) && "text-white",
            )}
          >
            {study.client}
          </span>
          <span className={cn("rm-index__meta", textMeta)}>
            {study.niche} · {study.format}
          </span>
        </motion.span>

        <motion.span className="rm-index__metric" style={{ opacity: mainOpacity }}>
          <span className={cn("rm-index__metric-value", (isOn || isHover) && "text-white")}>
            {study.primaryMetric.value}
          </span>
          <span className={cn("rm-index__metric-label", textMeta)}>{study.primaryMetric.label}</span>
        </motion.span>

        <motion.span
          className={cn("rm-index__arrow", textGhost)}
          style={{ opacity: mainOpacity, x: arrowX }}
          aria-hidden
        >
          <BtnArrow />
        </motion.span>
    </MotionLink>
  );
}

function WorkSceneDesktop({
  featuredCases,
  header,
}: {
  featuredCases: CaseStudy[];
  header: ReturnType<typeof casesHomeTeaserHeaderProps>;
}) {
  const count = featuredCases.length;
  const sceneRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const clickNavRef = useRef(false);
  const clickNavTimerRef = useRef(0);
  const prefetchedRef = useRef(new Set<string>());
  const lenis = useLenis();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [liveLabel, setLiveLabel] = useState(`Showing case study: ${featuredCases[0]?.client ?? ""}`);
  const hoverPeak = useMotionValue(-1);

  const { rawProgress, motionP } = useWorkSceneProgress(trackRef, stickyRef, true);
  const fastScroll = useFastScroll(rawProgress, true, clickNavRef);

  const previewP = useTransform(() => {
    const peak = hoverPeak.get();
    return peak >= 0 ? peak : motionP.get();
  });

  const progressFill = useTransform(motionP, (p) => p);
  const railFade = useTransform(motionP, (p) => 0.88 + p * 0.12);
  const fastScrollRef = useRef(fastScroll);
  fastScrollRef.current = fastScroll;

  useMotionValueEvent(motionP, "change", (p) => {
    if (railRef.current) {
      railRef.current.style.setProperty("--work-p", p.toFixed(4));
    }
    if (indexRef.current) {
      indexRef.current.style.setProperty("--work-p", p.toFixed(4));
    }

    const next = activeCardIndex(p, count);
    setActiveIndex((prev) => {
      if (prev !== next) {
        const study = featuredCases[next];
        if (study && !fastScrollRef.current) {
          setLiveLabel(`Showing case study: ${study.client}`);
        }
      }
      return next;
    });

    if (indexRef.current) syncWorkRailEnd(indexRef.current);

    featuredCases.forEach((study, i) => {
      const w = rowWeight(i, count, p);
      if (w > ROW_NAV_WEIGHT && !prefetchedRef.current.has(study.slug)) {
        prefetchedRef.current.add(study.slug);
        void router.preloadRoute({ to: "/cases/$slug", params: { slug: study.slug } });
      }
    });
  });

  useMotionValueEvent(rawProgress, "change", (p) => {
    const sticky = stickyRef.current;
    const headerPx = readHeaderOffsetPx();
    const stickyTop = sticky?.getBoundingClientRect().top ?? headerPx;
    const unpinned = sticky != null && stickyTop < headerPx - 0.5;
    const handoff = unpinned || p >= 1 - 0.002;
    sceneRef.current?.classList.toggle("rm-work-scene--handoff", handoff);
    sceneRef.current?.classList.toggle("rm-work-scene--exit", unpinned);
    setScrubbing(p > 0.002 && p < 0.998);
  });

  const endClickNav = useCallback(() => {
    clickNavRef.current = false;
    window.clearTimeout(clickNavTimerRef.current);
  }, []);

  const beginClickNav = useCallback(() => {
    clickNavRef.current = true;
    window.clearTimeout(clickNavTimerRef.current);
    clickNavTimerRef.current = window.setTimeout(endClickNav, 1250);
  }, [endClickNav]);

  const scrollToCase = useCallback(
    (index: number) => {
      setHoverIndex(null);
      hoverPeak.set(-1);
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;
      const peak = cardWindow(index, count).peak;
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
        window.setTimeout(endClickNav, 1100);
      }
    },
    [beginClickNav, count, endClickNav, hoverPeak, lenis],
  );

  const handleRowHover = useCallback(
    (index: number) => {
      if (clickNavRef.current || fastScroll) return;
      if (index === activeIndex) {
        setHoverIndex(null);
        hoverPeak.set(-1);
        return;
      }
      setHoverIndex(index);
      hoverPeak.set(cardWindow(index, count).peak);
    },
    [activeIndex, count, fastScroll, hoverPeak],
  );

  const handleRowHoverEnd = useCallback(() => {
    setHoverIndex(null);
    hoverPeak.set(-1);
  }, [hoverPeak]);

  const handleRowClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, index: number) => {
      const p = motionP.get();
      const active = activeCardIndex(p, count);
      if (index !== active) {
        event.preventDefault();
        scrollToCase(index);
        return;
      }
      const weight = normalizedCrossfadeOpacities(count, p)[index] ?? 0;
      if (weight < ROW_NAV_WEIGHT) {
        event.preventDefault();
        scrollToCase(index);
      }
    },
    [count, motionP, scrollToCase],
  );

  useLenis(
    (instance) => {
      if (clickNavRef.current) return;
      if (Math.abs(instance.velocity) > 1.4) {
        setScrubbing(true);
      }
    },
    [],
  );

  useEffect(() => {
    sceneRef.current?.classList.toggle("rm-work-scene--live", scrubbing);
    sceneRef.current?.classList.toggle("rm-work-scene--scrubbing", fastScroll);
    if (indexRef.current) syncWorkRailEnd(indexRef.current);
  }, [fastScroll, scrubbing]);

  useEffect(() => {
    const syncLayout = () => {
      const rail = railRef.current;
      const index = indexRef.current;
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (rail && index) {
        const h = index.offsetHeight;
        rail.style.setProperty("--rm-work-rail-h", `${h}px`);
        rail.style.minHeight = `${h}px`;
        syncWorkRailEnd(index);
      }
      if (track && sticky) {
        const scrollRun = (WORK_SCENE_SCROLL_VH / 100) * window.innerHeight;
        const releaseRun = (WORK_SCENE_RELEASE_VH / 100) * window.innerHeight;
        track.style.height = `${sticky.offsetHeight + scrollRun + releaseRun}px`;
        lenis?.resize();
      }
    };

    syncLayout();
    const ro = new ResizeObserver(syncLayout);
    if (indexRef.current) ro.observe(indexRef.current);
    if (stickyRef.current) ro.observe(stickyRef.current);
    window.addEventListener("resize", syncLayout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncLayout);
    };
  }, [lenis, featuredCases.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;

      const section = sceneRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inBand = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
      if (!inBand) return;

      let next: number | null = null;
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          next = Math.min(activeIndex + 1, count - 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          next = Math.max(activeIndex - 1, 0);
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
      if (next === activeIndex) return;
      event.preventDefault();
      scrollToCase(next);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, count, scrollToCase]);

  return (
    <section
      ref={sceneRef}
      id="work"
      aria-labelledby="cases-heading"
      tabIndex={-1}
      className={cn(sectionShell, "rm-section-work rm-work-scene border-b-0 pt-0 pb-8 md:pb-10")}
    >
      <div ref={trackRef} className="rm-work-scene__track-shell rm-work-scene__track">
        <div className="rm-work-scene__pin-gutter" aria-hidden />
        <div ref={stickyRef} className="rm-work-scene__sticky">
          <div className={sectionInner}>
            <div className={cn("rm-work", sectionContentGrid, "items-start md:items-stretch rm-work-scene__grid")}>
              <div className="reveal-fade md:col-start-1 md:self-start md:pt-1">
                <FramerTag>{header.tag}</FramerTag>
              </div>
              <header
                className={cn("reveal-fade", sectionLeadStack, "md:col-span-2 md:col-start-2 md:self-start")}
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
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[14%]"
                  style={{
                    opacity: railFade,
                    background:
                      "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                  }}
                />
                {featuredCases.map((study, index) => (
                  <MotionPreviewCard
                    key={study.slug}
                    study={study}
                    index={index}
                    count={count}
                    motionP={motionP}
                    previewP={previewP}
                    fastScroll={fastScroll}
                  />
                ))}
              </div>

              <div
                ref={indexRef}
                className="rm-index md:col-span-2 md:col-start-2 md:row-start-2 md:self-start"
                data-active-index={activeIndex}
              >
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                  {liveLabel}
                </div>
                <div className="rm-work-index-progress" aria-hidden>
                  <motion.span
                    className="rm-work-index-progress__fill"
                    style={{ scaleY: progressFill, transformOrigin: "top center" }}
                  />
                </div>
                {featuredCases.map((study, index) => (
                  <MotionWorkRow
                    key={study.slug}
                    study={study}
                    index={index}
                    count={count}
                    motionP={motionP}
                    activeIndex={activeIndex}
                    hoverIndex={hoverIndex}
                    fastScroll={fastScroll}
                    onHover={handleRowHover}
                    onHoverEnd={handleRowHoverEnd}
                    onRowClick={handleRowClick}
                    onTickClick={scrollToCase}
                  />
                ))}
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

function WorkSceneStatic({
  featuredCases,
  header,
}: {
  featuredCases: CaseStudy[];
  header: ReturnType<typeof casesHomeTeaserHeaderProps>;
}) {
  return (
    <section
      id="work"
      aria-labelledby="cases-heading"
      className={cn(sectionShell, "rm-section-work rm-work-scene border-b-0 pt-0 pb-8 md:pb-10")}
    >
      <div className="rm-work-scene__track-shell">
        <div className="rm-work-scene__sticky">
          <div className={sectionInner}>
            <WorkSceneGrid featuredCases={featuredCases} header={header} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSceneGrid({
  featuredCases,
  header,
}: {
  featuredCases: CaseStudy[];
  header: ReturnType<typeof casesHomeTeaserHeaderProps>;
}) {
  const grid = (
    <div className={cn("rm-work", sectionContentGrid, "items-start md:items-stretch rm-work-scene__grid")}>
      <div className="reveal-fade md:col-start-1 md:self-start md:pt-1">
        <FramerTag>{header.tag}</FramerTag>
      </div>
      <header className={cn("reveal-fade", sectionLeadStack, "md:col-span-2 md:col-start-2 md:self-start")}>
        <h2 id="cases-heading" className={cn(sectionHeadline, "m-0 max-w-[18ch] text-balance")}>
          {header.heading}
        </h2>
        {header.subheading ? (
          <p className={cn("m-0", sectionSubheading, "rm-copy-standfirst--band")}>{header.subheading}</p>
        ) : null}
      </header>

      <div className="rm-work-preview-rail hidden md:block md:col-start-1 md:row-start-2 md:self-start">
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
      </div>

      <div className="rm-index md:col-span-2 md:col-start-2 md:row-start-2 md:self-start">
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
              data-on={index === 0 ? "true" : "false"}
              data-ready="true"
              aria-label={`${study.client} — ${study.primaryMetric.value} ${study.primaryMetric.label}`}
            >
              <span className="rm-index__num-cell">
                <span className={cn("rm-index__num", textGhost)} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="rm-index__main">
                <span
                  className={cn("rm-index__thumb", previewPhoto && "rm-index__thumb--photo")}
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

      <div className={sectionGridSpacer} aria-hidden />
      <div className="reveal-fade mt-2 flex justify-end md:col-span-2 md:col-start-2 md:mt-0 md:self-end">
        <Link to="/cases" className={cn(btnOutlineOnDark, "group w-fit gap-2")}>
          View all case studies
          <BtnArrow />
        </Link>
      </div>
    </div>
  );

  return grid;
}

export function CasesSection() {
  const header = casesHomeTeaserHeaderProps();
  const featuredCases = getHomeFeaturedCases();
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (featuredCases.length === 0) return null;

  if (desktop && !reduce) {
    return <WorkSceneDesktop featuredCases={featuredCases} header={header} />;
  }

  return <WorkSceneStatic featuredCases={featuredCases} header={header} />;
}
