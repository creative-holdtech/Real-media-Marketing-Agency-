import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

/** GSAP power1.out approximation */
function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

/** GSAP `.builds` desktop timeline — matches Ciridae index bundle */
const CONTENT_DUR = 0.8;
const CARD_DUR = 1.3;
const CARD_STAGGER = 0.15;
const CARD_START = 0.2;

const DEFAULT_SCENE_VH = 250;
const ANIMATION_END_FRAC = 0.58;
const PIN_LEAD_VH = 0.28;
const BG_SCALE_FROM = 1.08;
const BG_SCALE_TO = 1;
const CARD_ENTER_MS = 480;
const CARD_STAGGER_MS = 90;
const MOBILE_CARD_ENTER_MS = 420;
const DESKTOP_ENTER_VH = 32;

export type CiridaeScrollOptions = {
  withIntro?: boolean;
  /** Scene height in vh (default 250; products sprint uses 180) */
  sceneVh?: number;
  /** Elements to fade/blur out as glass section scrubs in */
  linkedExitSelector?: string;
  /** Inline deliverables: in-view card enter only, no pin/scrub scene */
  enterOnly?: boolean;
};

function sceneScrollablePx(sceneVh: number) {
  return (sceneVh / 100) * window.innerHeight - window.innerHeight;
}

function timelineDuration(cardCount: number, withIntro: boolean) {
  if (!withIntro) {
    return CARD_DUR + Math.max(0, cardCount - 1) * CARD_STAGGER;
  }
  return CARD_START + CARD_DUR + Math.max(0, cardCount - 1) * CARD_STAGGER;
}

function setCardVars(
  section: HTMLElement,
  cardCount: number,
  getProgress: (index: number) => number,
  enterVh: number,
) {
  for (let i = 0; i < cardCount; i++) {
    const t = clamp(0, 1, getProgress(i));
    const eased = easeOutQuad(t);
    const yVh = (1 - eased) * enterVh;
    section.style.setProperty(`--card-${i}-y`, `${yVh.toFixed(2)}vh`);
    section.style.setProperty(`--card-${i}-opacity`, eased.toFixed(4));
    section.style.setProperty(`--card-${i}-blur`, "0px");
  }
}

function setRestingCards(section: HTMLElement, cardCount: number) {
  for (let i = 0; i < cardCount; i++) {
    section.style.setProperty(`--card-${i}-y`, "0vh");
    section.style.setProperty(`--card-${i}-opacity`, "1");
    section.style.setProperty(`--card-${i}-blur`, "0px");
  }
}

function timeProgressForCard(
  cardIndex: number,
  elapsedMs: number,
  staggerMs: number,
  durMs: number,
) {
  return clamp(0, 1, (elapsedMs - cardIndex * staggerMs) / durMs);
}

function sceneRawProgress(rectTop: number, scrollable: number, pinLeadPx: number) {
  if (scrollable <= 0) return rectTop <= pinLeadPx ? 1 : 0;
  return clamp(0, 1, (pinLeadPx - rectTop) / (scrollable + pinLeadPx));
}

/**
 * Ciridae `.builds` + `.points` scrub:
 * - bg scale scrubs with scroll
 * - cards enter via scroll-linked timeline (desktop) or in-view time enter (mobile)
 */
export function useCiridaePointsScroll<T extends HTMLElement>(
  cardCount: number,
  options: CiridaeScrollOptions = {},
) {
  const {
    withIntro = false,
    sceneVh = DEFAULT_SCENE_VH,
    linkedExitSelector,
    enterOnly = false,
  } = options;
  const ref = useRef<T | null>(null);
  const updateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || cardCount === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopMq = window.matchMedia("(min-width: 992px)");
    const totalDuration = timelineDuration(cardCount, withIntro);
    const enterVh = withIntro ? 100 : DESKTOP_ENTER_VH;
    const mobileEnterVh = 24;

    if (!enterOnly) {
      section.style.setProperty("--rm-scene-vh", String(sceneVh));
    }

    const applyResting = () => {
      section.style.setProperty("--engage-scroll-p", "1");
      section.style.setProperty("--intro-y", withIntro ? "-100vh" : "0vh");
      section.style.setProperty("--bg-scale", String(BG_SCALE_TO));
      setRestingCards(section, cardCount);
      section.classList.remove("rm-glass-points--scrubbing");
    };

    if (reduced) {
      applyResting();
      if (linkedExitSelector) {
        document.querySelectorAll<HTMLElement>(linkedExitSelector).forEach((el) => {
          el.style.opacity = "1";
          el.style.filter = "none";
          el.style.transform = "";
        });
      }
      updateRef.current = null;
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let mobileEnteredAt: number | null = null;
    let enterOnlyStartedAt: number | null = null;
    let rafId = 0;

    if (enterOnly) {
      section.style.setProperty("--bg-scale", String(BG_SCALE_TO));

      const applyEnterOnlyDesktop = () => {
        setRestingCards(section, cardCount);
        section.classList.remove("rm-glass-points--scrubbing");
      };

      const updateEnterOnlyMobile = () => {
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

        if (inView && enterOnlyStartedAt === null) {
          enterOnlyStartedAt = performance.now();
        }

        const elapsed = enterOnlyStartedAt ? performance.now() - enterOnlyStartedAt : 0;
        const allDone = elapsed > MOBILE_CARD_ENTER_MS + (cardCount - 1) * CARD_STAGGER_MS;

        setCardVars(
          section,
          cardCount,
          (i) => {
            if (enterOnlyStartedAt === null) return 0;
            return timeProgressForCard(i, elapsed, CARD_STAGGER_MS, MOBILE_CARD_ENTER_MS);
          },
          mobileEnterVh,
        );

        section.classList.toggle("rm-glass-points--scrubbing", inView && !allDone);

        if (allDone) {
          setRestingCards(section, cardCount);
          section.classList.remove("rm-glass-points--scrubbing");
          return;
        }

        if (inView) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updateEnterOnlyMobile);
        }
      };

      const updateEnterOnly = () => {
        if (desktopMq.matches) {
          cancelAnimationFrame(rafId);
          enterOnlyStartedAt = null;
          applyEnterOnlyDesktop();
          return;
        }

        setCardVars(section, cardCount, () => 0, mobileEnterVh);
        updateEnterOnlyMobile();
      };

      updateRef.current = updateEnterOnly;
      updateEnterOnly();

      const onResizeEnterOnly = () => {
        enterOnlyStartedAt = null;
        updateEnterOnly();
      };
      const onLoadingEndEnterOnly = () => updateEnterOnly();

      window.addEventListener("resize", onResizeEnterOnly, { passive: true });
      window.addEventListener("scroll", updateEnterOnly, { passive: true });
      window.addEventListener("rm:loading-end", onLoadingEndEnterOnly);
      desktopMq.addEventListener("change", onResizeEnterOnly);

      const resizeObserverEnterOnly = new ResizeObserver(() => updateEnterOnly());
      resizeObserverEnterOnly.observe(section);

      return () => {
        cancelAnimationFrame(rafId);
        root.style.scrollBehavior = previousScrollBehavior;
        window.removeEventListener("resize", onResizeEnterOnly);
        window.removeEventListener("scroll", updateEnterOnly);
        window.removeEventListener("rm:loading-end", onLoadingEndEnterOnly);
        desktopMq.removeEventListener("change", onResizeEnterOnly);
        resizeObserverEnterOnly.disconnect();
        section.classList.remove("rm-glass-points--scrubbing");
        updateRef.current = null;
      };
    }

    const linkedEls = linkedExitSelector
      ? Array.from(document.querySelectorAll<HTMLElement>(linkedExitSelector))
      : [];

    const updateLinkedExit = (progress: number) => {
      if (linkedEls.length === 0) return;
      const exit = clamp(0, 1, progress * 1.8);
      const opacity = 1 - exit;
      const blur = exit * 4;
      const y = -exit * 12;
      linkedEls.forEach((el) => {
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = blur > 0.01 ? `blur(${blur.toFixed(1)}px)` : "none";
        el.style.transform = y !== 0 ? `translate3d(0, ${y.toFixed(1)}px, 0)` : "";
      });
    };

    const scrollProgressForCard = (timelineT: number, cardIndex: number) => {
      const cardT = timelineT - (withIntro ? CARD_START : 0) - cardIndex * CARD_STAGGER;
      return clamp(0, 1, cardT / CARD_DUR);
    };

    const scheduleFrame = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = sceneScrollablePx(sceneVh);
      const isDesktop = desktopMq.matches;
      const pinLeadPx = window.innerHeight * PIN_LEAD_VH;

      if (scrollable <= 0) {
        applyResting();
        return;
      }

      const rawProgress = sceneRawProgress(rect.top, scrollable, pinLeadPx);
      const progress = clamp(0, 1, rawProgress / ANIMATION_END_FRAC);
      const timelineT = progress * totalDuration;
      const isActive = rawProgress > 0 && rawProgress < 1;

      section.classList.toggle("rm-glass-points--scrubbing", isActive);

      section.style.setProperty("--engage-scroll-p", progress.toFixed(4));
      updateLinkedExit(progress);

      if (withIntro) {
        const contentProgress = easeOutQuad(clamp(0, 1, timelineT / CONTENT_DUR));
        section.style.setProperty("--intro-y", `${(-contentProgress * 100).toFixed(2)}vh`);
        section.style.setProperty(
          "--bg-scale",
          (BG_SCALE_FROM - contentProgress * (BG_SCALE_FROM - BG_SCALE_TO)).toFixed(4),
        );
      } else {
        section.style.setProperty("--intro-y", "0vh");
        const bgProgress = easeOutQuad(rawProgress);
        section.style.setProperty(
          "--bg-scale",
          (BG_SCALE_FROM - bgProgress * (BG_SCALE_FROM - BG_SCALE_TO)).toFixed(4),
        );
      }

      if (!isDesktop) {
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        if (inView && mobileEnteredAt === null) {
          mobileEnteredAt = performance.now();
        }
        if (!inView) {
          mobileEnteredAt = null;
        }

        const elapsed = mobileEnteredAt ? performance.now() - mobileEnteredAt : 0;
        const allDone = elapsed > MOBILE_CARD_ENTER_MS + (cardCount - 1) * CARD_STAGGER_MS;

        setCardVars(
          section,
          cardCount,
          (i) => {
            if (mobileEnteredAt === null) return 0;
            return timeProgressForCard(i, elapsed, CARD_STAGGER_MS, MOBILE_CARD_ENTER_MS);
          },
          mobileEnterVh,
        );

        section.style.setProperty("--bg-scale", String(BG_SCALE_TO));

        if (inView && !allDone) {
          scheduleFrame();
        }
        return;
      }

      setCardVars(section, cardCount, (i) => scrollProgressForCard(timelineT, i), enterVh);

      if (isActive) {
        scheduleFrame();
      }

      if (rawProgress >= 1) {
        setRestingCards(section, cardCount);
        section.classList.remove("rm-glass-points--scrubbing");
      }
    };

    updateRef.current = update;
    update();

    const onResize = () => {
      mobileEnteredAt = null;
      update();
    };
    const onLoadingEnd = () => update();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("rm:loading-end", onLoadingEnd);

    const resizeObserver = new ResizeObserver(() => update());
    resizeObserver.observe(section);

    return () => {
      cancelAnimationFrame(rafId);
      root.style.scrollBehavior = previousScrollBehavior;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", update);
      window.removeEventListener("rm:loading-end", onLoadingEnd);
      resizeObserver.disconnect();
      section.classList.remove("rm-glass-points--scrubbing");
      if (linkedExitSelector) {
        document.querySelectorAll<HTMLElement>(linkedExitSelector).forEach((el) => {
          el.style.opacity = "";
          el.style.filter = "";
          el.style.transform = "";
        });
      }
      updateRef.current = null;
    };
  }, [cardCount, withIntro, sceneVh, linkedExitSelector, enterOnly]);

  useLenis(() => {
    updateRef.current?.();
  }, [cardCount, withIntro, sceneVh, linkedExitSelector, enterOnly]);

  return ref;
}
