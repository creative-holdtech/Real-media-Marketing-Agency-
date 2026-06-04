import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import {
  premiumCursorStore,
  resetPremiumCursorStore,
  type PremiumCursorMode,
} from "@/lib/premium-cursor-store";

const TRAIL_COUNT = 4;
const MAIN_LERP = 0.105;
const TRAIL_LERPS = [0.085, 0.065, 0.048, 0.034];

/** Premium signature easing — MD3 decelerate */
const EASE_PREMIUM = (t: number) => 1 - Math.pow(1 - t, 3);

const MODE_LABEL: Record<PremiumCursorMode, string> = {
  default: "",
  logo: "DRAG",
  explore: "EXPLORE",
  attract: "ATTRACT",
  morph: "SOURCE",
};

const MODE_SCALE: Record<PremiumCursorMode, number> = {
  default: 1,
  logo: 1.52,
  explore: 1.26,
  attract: 1.38,
  morph: 1.62,
};

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(current: number, target: number, amount: number) {
  return current + (target - current) * amount;
}

function morphBeatProgress(scroll: number): number {
  const segments = [
    [0.22, 0.36],
    [0.6, 0.7],
  ] as const;
  let peak = 0;
  for (const [start, end] of segments) {
    if (scroll >= start && scroll <= end) {
      peak = Math.max(peak, clamp(0, 1, (scroll - start) / (end - start)));
    } else if (scroll > end && scroll < end + 0.12) {
      peak = Math.max(peak, 1 - clamp(0, 1, (scroll - end) / 0.12) * 0.4);
    }
  }
  return peak;
}

function trustScrollFromDom(): number {
  const studio = document.getElementById("studio");
  if (!studio) return 0;
  const raw = studio.style.getPropertyValue("--trust-scroll");
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? clamp(0, 1, parsed) : 0;
}

function resolveMode(target: Element | null, trustScroll: number): PremiumCursorMode {
  if (!target) return "default";

  const inTrustScene = Boolean(target.closest(".rm-trust-scene, #studio, .rm-trust-ecosystem"));
  if (inTrustScene) {
    const morph0 = trustScroll >= 0.22 && trustScroll < 0.48;
    const morph1 = trustScroll >= 0.58 && trustScroll < 0.84;
    if (morph0 || morph1) return "morph";
    if (trustScroll >= 0.08) return "attract";
  }

  const tagged = target.closest("[data-premium-cursor]")?.getAttribute("data-premium-cursor");
  if (tagged === "logo") return "logo";
  if (tagged === "explore") return "explore";
  if (tagged === "attract") return "attract";

  if (
    target.closest(
      'a, button, [role="button"], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])',
    )
  ) {
    return "explore";
  }

  return "default";
}

function modeEnergy(mode: PremiumCursorMode, trustScroll: number): number {
  if (mode === "morph") {
    const morphProgress = morphBeatProgress(trustScroll);
    return 0.56 + morphProgress * 0.44;
  }
  if (mode === "attract") return 0.52;
  if (mode === "logo") return 0.32;
  if (mode === "explore") return 0.24;
  return 0;
}

export function PremiumCursor() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoMagRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("rm-premium-cursor");

    const state = {
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      px: window.innerWidth / 2,
      py: window.innerHeight / 2,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      prevX: window.innerWidth / 2,
      prevY: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      trails: Array.from({ length: TRAIL_COUNT }, () => ({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })),
      mode: "default" as PremiumCursorMode,
      prevMode: "default" as PremiumCursorMode,
      modeBlend: 0,
      scale: 1,
      scaleAnticipation: 0,
      label: "",
      labelOpacity: 0,
      energy: 0,
      pulse: 0,
      visible: false,
      breathe: 0,
    };

    let raf = 0;
    let logoEl: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      state.tx = event.clientX;
      state.ty = event.clientY;
      state.visible = true;
      premiumCursorStore.active = true;
    };

    const onLeave = () => {
      state.visible = false;
      premiumCursorStore.active = false;
    };

    const loop = (now: number) => {
      const t = now * 0.001;
      const trustScroll = trustScrollFromDom();
      premiumCursorStore.trustScroll = trustScroll;

      const hitTarget = state.visible
        ? document.elementFromPoint(state.tx, state.ty)
        : null;
      const targetMode = state.visible ? resolveMode(hitTarget, trustScroll) : "default";

      if (targetMode !== state.prevMode) {
        state.scaleAnticipation = -0.06;
        state.prevMode = targetMode;
      }
      state.mode = targetMode;
      state.scaleAnticipation = lerp(state.scaleAnticipation, 0, 0.14);

      state.px = state.x;
      state.py = state.y;
      state.x = lerp(state.x, state.tx, MAIN_LERP);
      state.y = lerp(state.y, state.ty, MAIN_LERP);

      const moveVx = state.x - state.px;
      const moveVy = state.y - state.py;
      state.vx = lerp(state.vx, moveVx * 8, 0.16);
      state.vy = lerp(state.vy, moveVy * 8, 0.16);
      const speed = Math.hypot(state.x - state.tx, state.y - state.ty);

      premiumCursorStore.vx = state.vx;
      premiumCursorStore.vy = state.vy;
      premiumCursorStore.speed = speed;
      premiumCursorStore.x = state.x;
      premiumCursorStore.y = state.y;
      premiumCursorStore.mode = targetMode;

      state.trails.forEach((trail, index) => {
        const follow = state.trails[index - 1] ?? { x: state.x, y: state.y };
        trail.x = lerp(trail.x, follow.x, TRAIL_LERPS[index] ?? TRAIL_LERPS.at(-1)!);
        trail.y = lerp(trail.y, follow.y, TRAIL_LERPS[index] ?? TRAIL_LERPS.at(-1)!);
      });

      const targetScale = MODE_SCALE[targetMode] + state.scaleAnticipation;
      state.scale = lerp(state.scale, targetScale, 0.085);
      state.modeBlend = lerp(state.modeBlend, 1, 0.11);
      premiumCursorStore.modeVisual = state.modeBlend;

      const targetLabel = MODE_LABEL[targetMode];
      state.label = targetLabel;
      state.labelOpacity = lerp(state.labelOpacity, targetLabel ? 1 : 0, targetLabel ? 0.12 : 0.2);

      const targetEnergy = modeEnergy(targetMode, trustScroll);
      state.energy = lerp(state.energy, targetEnergy, 0.09);
      premiumCursorStore.energy = state.energy;

      const morphProgress = morphBeatProgress(trustScroll);
      state.pulse =
        targetMode === "morph"
          ? 0.36 +
            morphProgress * 0.54 +
            Math.sin(t * 3.4 + morphProgress * Math.PI * 2) * 0.2 * state.energy
          : 0.32 + Math.sin(t * 1.45) * 0.06;
      premiumCursorStore.pulse = state.pulse;

      const trustScene = document.querySelector(".rm-trust-ecosystem");
      if (trustScene) {
        const rect = trustScene.getBoundingClientRect();
        const inside =
          state.visible &&
          state.x >= rect.left &&
          state.x <= rect.right &&
          state.y >= rect.top &&
          state.y <= rect.bottom;
        premiumCursorStore.inTrustScene = inside;
        if (inside && rect.width > 0 && rect.height > 0) {
          premiumCursorStore.trustX = clamp(0, 1, (state.x - rect.left) / rect.width);
          premiumCursorStore.trustY = clamp(0, 1, (state.y - rect.top) / rect.height);
        }
      } else {
        premiumCursorStore.inTrustScene = false;
      }

      state.breathe = 1 + Math.sin(t * 1.35) * 0.028;
      const velocityStretch = clamp(0, 0.18, Math.hypot(state.vx, state.vy) * 0.012);
      const lagStretch = clamp(0, 0.14, speed * 0.0035);
      const stretch = Math.max(velocityStretch, lagStretch);
      const angle = Math.atan2(state.vy, state.vx) * (180 / Math.PI);
      const opacity = state.visible ? 1 : 0;

      if (rootRef.current) {
        rootRef.current.style.opacity = String(opacity);
      }

      if (mainRef.current) {
        const rot = angle * stretch * 0.28;
        const morphBoost = targetMode === "morph" ? morphProgress * 0.16 : 0;
        const scaleX = state.scale * state.breathe * (1 + stretch * 0.42 + morphBoost);
        const scaleY = state.scale * state.breathe * (1 - stretch * 0.28 + morphBoost * 0.35);
        mainRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) rotate(${rot}deg) scale(${scaleX}, ${scaleY})`;
        mainRef.current.dataset.mode = targetMode;
      }

      trailRefs.current.forEach((trailEl, index) => {
        if (!trailEl) return;
        const trail = state.trails[index];
        const trailOpacity = (0.2 - index * 0.035) * opacity;
        trailEl.style.opacity = String(trailOpacity);
        trailEl.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${1 - index * 0.055})`;
      });

      if (labelRef.current) {
        labelRef.current.textContent = state.label;
        const labelIn = EASE_PREMIUM(state.labelOpacity) * state.modeBlend;
        labelRef.current.style.opacity = String(labelIn);
        labelRef.current.style.transform = `translate3d(${state.x + 20}px, ${state.y - 14}px, 0)`;
        labelRef.current.style.letterSpacing = `${0.28 - labelIn * 0.08}em`;
      }

      if (fieldRef.current) {
        const fieldScale = 1 + state.energy * 0.9 + state.pulse * 0.35;
        fieldRef.current.style.opacity = String(state.energy * 0.5 * opacity);
        fieldRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${fieldScale})`;
      }

      if (targetMode === "logo") {
        if (!logoEl) logoEl = document.querySelector<HTMLElement>('[data-premium-cursor="logo"]');
        if (logoEl) {
          const rect = logoEl.getBoundingClientRect();
          const targetMx = (state.x - (rect.left + rect.width / 2)) * 0.1;
          const targetMy = (state.y - (rect.top + rect.height / 2)) * 0.1;
          logoMagRef.current.x = lerp(logoMagRef.current.x, targetMx, 0.12);
          logoMagRef.current.y = lerp(logoMagRef.current.y, targetMy, 0.12);
          logoEl.style.transform = `translate3d(${logoMagRef.current.x}px, ${logoMagRef.current.y}px, 0)`;
          logoMagRef.current.active = true;
        }
      } else if (logoMagRef.current.active) {
        logoMagRef.current.x = lerp(logoMagRef.current.x, 0, 0.14);
        logoMagRef.current.y = lerp(logoMagRef.current.y, 0, 0.14);
        const el = document.querySelector<HTMLElement>('[data-premium-cursor="logo"]');
        if (el) {
          el.style.transform = `translate3d(${logoMagRef.current.x}px, ${logoMagRef.current.y}px, 0)`;
          if (Math.abs(logoMagRef.current.x) < 0.05 && Math.abs(logoMagRef.current.y) < 0.05) {
            el.style.removeProperty("transform");
            logoMagRef.current.active = false;
          }
        }
        logoEl = null;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("rm-premium-cursor");
      document.querySelector<HTMLElement>('[data-premium-cursor="logo"]')?.style.removeProperty("transform");
      resetPremiumCursorStore();
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={rootRef} className="rm-premium-cursor-root" aria-hidden="true">
      {Array.from({ length: TRAIL_COUNT }, (_, index) => (
        <div
          key={index}
          ref={(el) => {
            trailRefs.current[index] = el;
          }}
          className="rm-premium-cursor__trail"
        >
          <span className="rm-premium-cursor__cross" />
        </div>
      ))}
      <div ref={fieldRef} className="rm-premium-cursor__field" />
      <div ref={mainRef} className="rm-premium-cursor__main">
        <span className="rm-premium-cursor__cross" />
        <span className="rm-premium-cursor__glow" />
      </div>
      <span ref={labelRef} className="rm-premium-cursor__label" />
    </div>
  );
}
