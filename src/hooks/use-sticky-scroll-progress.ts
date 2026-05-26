import { useEffect, useRef } from "react";

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

/** GSAP `.builds` desktop timeline — matches Ciridae index bundle */
const CONTENT_DUR = 0.8;
const CARD_DUR = 1.3;
const CARD_STAGGER = 0.15;
const CARD_START = 0.2; // cards tween at "-=0.6" after content/bg block

/** Ciridae `.points`: 250vh scene — animation ~48%, hold ~52% (~78vh) */
const SCENE_TOTAL_VH = 250;
const ANIMATION_END_FRAC = 0.48;

function sceneScrollablePx() {
  return (SCENE_TOTAL_VH / 100) * window.innerHeight - window.innerHeight;
}

function timelineDuration(cardCount: number) {
  return CARD_START + CARD_DUR + Math.max(0, cardCount - 1) * CARD_STAGGER;
}

/**
 * Ciridae `.builds` + `.points` scrub:
 * - intro content y: 0 → -100vh (linear)
 * - background scale 1.2 → 1 (linear, parallel)
 * - each `.points_item` y: 100vh → 0, stagger 0.15, duration 1.3, ease power1
 */
export function useCiridaePointsScroll<T extends HTMLElement>(
  cardCount: number,
  withIntro = false,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || cardCount === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 992px)").matches;
    const totalDuration = timelineDuration(cardCount);

    const applyResting = () => {
      section.style.setProperty("--engage-scroll-p", "1");
      section.style.setProperty("--intro-y", "-100vh");
      section.style.setProperty("--bg-scale", "1");
      for (let i = 0; i < cardCount; i++) {
        section.style.setProperty(`--card-${i}-y`, "0vh");
      }
    };

    if (reduced || !desktop) {
      applyResting();
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = sceneScrollablePx();

      if (scrollable <= 0) {
        applyResting();
        return;
      }

      // Ciridae: timeline finishes ~58% through scene scroll; rest is pinned hold
      const rawProgress = clamp(0, 1, -rect.top / scrollable);
      const progress = clamp(0, 1, rawProgress / ANIMATION_END_FRAC);
      const timelineT = progress * totalDuration;

      section.style.setProperty("--engage-scroll-p", progress.toFixed(4));

      const contentProgress = withIntro
        ? clamp(0, 1, timelineT / CONTENT_DUR)
        : clamp(0, 1, timelineT / CONTENT_DUR);
      section.style.setProperty("--intro-y", `${(-contentProgress * 100).toFixed(2)}vh`);
      section.style.setProperty("--bg-scale", (1.2 - contentProgress * 0.2).toFixed(4));

      for (let i = 0; i < cardCount; i++) {
        const cardT = timelineT - (CARD_START + i * CARD_STAGGER);
        const cardProgress = clamp(0, 1, cardT / CARD_DUR);
        const yVh = (1 - cardProgress) * 100;
        section.style.setProperty(`--card-${i}-y`, `${yVh.toFixed(2)}vh`);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      root.style.scrollBehavior = previousScrollBehavior;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [cardCount, withIntro]);

  return ref;
}
