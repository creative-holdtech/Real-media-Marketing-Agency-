import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { computeTrustSceneProgress } from "@/lib/trust-scene-scroll";
import { premiumCursorStore } from "@/lib/premium-cursor-store";

const TRUST_BRANDS = [
  "Empresex",
  "TEQUILA",
  "WHITEBIT",
  "CAPITAL.COM",
  "CURRENCY",
  "POCKET SPACE",
  "UNIT CITY",
  "1inch",
] as const;

/** Premium signature — MD3 standard decelerate + smoothstep for on-screen */
const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);
const EASE_IN = (t: number) => t * t * t;
const EASE_SOFT = (t: number) => t * t * (3 - 2 * t);

const ANCHOR_Y = 0.5;
const ANCHOR_LEFT_X = 0.22;
const ANCHOR_RIGHT_X = 0.78;
const MOBILE_BREAKPOINT = 768;
const TOTAL_PARTICLES = TRUST_BRANDS.length;

/** Story acts on scroll timeline (0–1) */
const STORY = {
  enter: [0, 0.08],
  constellation: [0.08, 0.17],
  interlude: [0.48, 0.54],
  finale: [0.84, 0.9],
  exit: [0.9, 1],
} as const;

const BEATS = {
  stat0: {
    anticipate: [0.17, 0.22],
    morph: [0.22, 0.36],
    hold: [0.36, 0.43],
    dissolve: [0.43, 0.48],
  },
  stat1: {
    anticipate: [0.54, 0.6],
    morph: [0.6, 0.7],
    hold: [0.7, 0.78],
    dissolve: [0.78, 0.84],
  },
} as const;

const BRAND_LAYOUT: ReadonlyArray<{ x: number; y: number }> = [
  { x: 0.11, y: 0.2 },
  { x: 0.89, y: 0.18 },
  { x: 0.84, y: 0.72 },
  { x: 0.16, y: 0.74 },
  { x: 0.5, y: 0.12 },
  { x: 0.07, y: 0.46 },
  { x: 0.93, y: 0.42 },
  { x: 0.5, y: 0.88 },
];

type CountUpConfig = {
  to: number;
  prefix?: string;
  suffix?: string;
};

export type TrustStat = {
  value?: ReactNode;
  copy: string;
  countUp?: CountUpConfig;
};

type Particle = {
  id: string;
  label: string;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  drift: number;
  size: number;
  morphOrder: number;
  scrollWeight: number;
};

type TrustParticleEcosystemProps = {
  stats: TrustStat[];
  inView: boolean;
  active?: boolean;
  sceneRef: RefObject<HTMLElement | null>;
  chapterRef?: RefObject<HTMLElement | null>;
};

type BeatState = {
  pull: number;
  statReveal: number;
  heroReveal: number;
  copyReveal: number;
  active: boolean;
  morphT: number;
  dissolveT: number;
  inHold: boolean;
};

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

function cursorInField(rect: DOMRect) {
  const { active, x, y, inTrustScene, energy } = premiumCursorStore;
  if (!active || !inTrustScene || energy < 0.04) {
    return { x: 0, y: 0, strength: 0, morphBlend: 0 };
  }
  const cx = x - rect.left;
  const cy = y - rect.top;
  const morphBlend =
    premiumCursorStore.mode === "morph" ? energy * (0.38 + premiumCursorStore.pulse * 0.22) : 0;
  return { x: cx, y: cy, strength: energy, morphBlend };
}

function applyCursorAttract(
  p: Particle,
  targetX: number,
  targetY: number,
  cursorX: number,
  cursorY: number,
  w: number,
  h: number,
  strength: number,
): [number, number] {
  const dx = cursorX - p.x;
  const dy = cursorY - p.y;
  const dist = Math.hypot(dx, dy);
  const radius = Math.min(w, h) * 0.34;
  if (dist < 1 || dist > radius) return [targetX, targetY];
  const falloff = 1 - dist / radius;
  const pull = strength * falloff * falloff * (0.16 + p.depth * 0.14);
  return [targetX + dx * pull, targetY + dy * pull];
}

function segmentT(scroll: number, start: number, end: number): number {
  if (scroll <= start) return 0;
  if (scroll >= end) return 1;
  return (scroll - start) / (end - start);
}

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

function beatState(
  scroll: number,
  beat: {
    anticipate: readonly [number, number];
    morph: readonly [number, number];
    hold: readonly [number, number];
    dissolve: readonly [number, number];
  },
): BeatState {
  const antStart = beat.anticipate[0];
  const antEnd = beat.anticipate[1];
  const antSplit = antStart + (antEnd - antStart) * 0.4;
  const morphT = EASE_SOFT(segmentT(scroll, beat.morph[0], beat.morph[1]));
  const dissolveT = EASE_IN(segmentT(scroll, beat.dissolve[0], beat.dissolve[1]));
  const inHold = scroll >= beat.hold[0] && scroll < beat.dissolve[0];

  let pull = 0;
  if (scroll >= antStart && scroll < antSplit) {
    pull = -EASE_SOFT(segmentT(scroll, antStart, antSplit)) * 0.16;
  } else if (scroll >= antSplit && scroll < beat.morph[0]) {
    pull = EASE_SOFT(segmentT(scroll, antSplit, beat.morph[0])) * 0.52;
  } else if (scroll >= beat.morph[0] && scroll < beat.dissolve[0]) {
    pull = inHold ? 1 : morphT;
  } else if (scroll >= beat.dissolve[0] && scroll < beat.dissolve[1]) {
    pull = 1 - EASE_IN(Math.pow(dissolveT, 0.88));
  }

  let statReveal = 0;
  if (scroll >= beat.morph[0] && scroll < beat.dissolve[0]) {
    statReveal = inHold ? 1 : EASE_SOFT(Math.max(0, (morphT - 0.22) / 0.78));
  } else if (scroll >= beat.dissolve[0] && scroll < beat.dissolve[1]) {
    statReveal = 1 - EASE_IN(Math.pow(dissolveT, 0.75));
  }

  const clusterForm = EASE_SOFT(Math.max(0, (morphT - 0.38) / 0.62));
  const heroReveal = EASE_SOFT(Math.max(0, (statReveal - 0.05) / 0.95)) * clusterForm;
  const copyReveal = EASE_SOFT(Math.max(0, (heroReveal - 0.18) / 0.82));

  return {
    pull,
    statReveal,
    heroReveal,
    copyReveal,
    active: scroll >= beat.anticipate[0] && scroll < beat.dissolve[1],
    morphT,
    dissolveT,
    inHold,
  };
}

function statVisibility(index: number, b0: BeatState, b1: BeatState): number {
  const beat = index === 1 ? b1 : b0;
  const other = index === 1 ? b0 : b1;
  if (beat.statReveal <= 0.02) return 0;
  return clamp(0, 1, beat.statReveal - other.statReveal * 0.88);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function storyProgress(scroll: number) {
  const enter = EASE_OUT(segmentT(scroll, STORY.enter[0], STORY.enter[1]));
  const constellation = EASE_OUT(segmentT(scroll, STORY.constellation[0], STORY.constellation[1]));
  const interlude = easeInOut(segmentT(scroll, STORY.interlude[0], STORY.interlude[1]));
  const interludePeak =
    scroll >= STORY.interlude[0] && scroll <= STORY.interlude[1]
      ? Math.sin(segmentT(scroll, STORY.interlude[0], STORY.interlude[1]) * Math.PI)
      : 0;
  const finale = EASE_OUT(segmentT(scroll, STORY.finale[0], STORY.finale[1]));
  const exit = EASE_IN(segmentT(scroll, STORY.exit[0], STORY.exit[1]));
  return { enter, constellation, interlude, interludePeak, finale, exit };
}

type SceneAct = {
  label: string;
  sub: string;
  actOpacity: number;
};

function resolveSceneAct(
  scroll: number,
  b0: BeatState,
  b1: BeatState,
  story: ReturnType<typeof storyProgress>,
  pull: number,
): SceneAct {
  let label = "01 — Orbit";
  let sub = "Trusted by teams who ship";
  let actOpacity = story.constellation * (1 - pull * 0.8);

  if (scroll >= BEATS.stat0.anticipate[0] && scroll < BEATS.stat0.dissolve[1]) {
    label = "02 — Volume";
    sub = "Projects that landed";
    actOpacity = Math.max(b0.heroReveal, b0.statReveal * 0.5) * (1 - b0.dissolveT);
  } else if (scroll >= STORY.interlude[0] && scroll < STORY.interlude[1]) {
    label = "—";
    sub = "Then the impact";
    actOpacity = story.interludePeak;
  } else if (scroll >= BEATS.stat1.anticipate[0] && scroll < BEATS.stat1.dissolve[1]) {
    label = "03 — Capital";
    sub = "Raised with our partners";
    actOpacity = Math.max(b1.heroReveal, b1.statReveal * 0.5) * (1 - b1.dissolveT);
  } else if (scroll >= STORY.finale[0]) {
    label = "04 — Field";
    sub = "Back to the constellation";
    actOpacity = story.finale * (1 - story.exit);
  }

  return { label, sub, actOpacity };
}

function buildParticles(width: number, height: number): Particle[] {
  return TRUST_BRANDS.map((brand, brandIndex) => {
    const id = brand;
    const slot = BRAND_LAYOUT[brandIndex % BRAND_LAYOUT.length];
    const jitterX = (hash(`${id}-jx`) - 0.5) * 0.03;
    const jitterY = (hash(`${id}-jy`) - 0.5) * 0.03;
    const homeX = clamp(0.06, 0.94, slot.x + jitterX);
    const homeY = clamp(0.1, 0.9, slot.y + jitterY);
    const depth = 0.4 + hash(`${id}-d`) * 0.5;
    return {
      id,
      label: brand,
      homeX,
      homeY,
      x: homeX * width,
      y: homeY * height,
      vx: 0,
      vy: 0,
      depth,
      drift: hash(`${id}-dr`) * Math.PI * 2,
      size: 0.9 + depth * 0.14,
      morphOrder: brandIndex / TOTAL_PARTICLES,
      scrollWeight: 0.18 + depth * 0.35,
    };
  });
}

function anchorForIndex(index: number, width: number) {
  if (width < MOBILE_BREAKPOINT) return { x: 0.5, y: ANCHOR_Y };
  return { x: index === 1 ? ANCHOR_RIGHT_X : ANCHOR_LEFT_X, y: ANCHOR_Y };
}

function applyHeroMorphPull(
  p: Particle,
  x: number,
  y: number,
  pull: number,
  morphT: number,
  anchorX: number,
  anchorY: number,
  w: number,
): [number, number] {
  const stagger = p.morphOrder * 0.1;
  const travel = EASE_SOFT(clamp(0, 1, pull * 0.96 - stagger));
  if (travel <= 0.001) return [x, y];

  const angle = p.morphOrder * Math.PI * 2 + hash(p.id) * 0.35 - Math.PI / 2;
  const ringR = Math.min(w * 0.11, 128) * (1 - morphT * 0.52);
  const ringX = anchorX + Math.cos(angle) * ringR;
  const ringY = anchorY + Math.sin(angle) * ringR * 0.58;

  const collapse = EASE_SOFT(clamp(0, 1, (morphT - 0.62) / 0.38));
  const endX = ringX * (1 - collapse) + anchorX * collapse;
  const endY = ringY * (1 - collapse) + anchorY * collapse;

  const side = p.homeX > 0.5 ? 1 : -1;
  const arcLift = Math.sin(travel * Math.PI) * (18 + p.depth * 10);
  const ctrlX = x + (endX - x) * 0.38 + side * 32;
  const ctrlY = y + (endY - y) * 0.34 - arcLift;

  const targetX = (1 - travel) * (1 - travel) * x + 2 * (1 - travel) * travel * ctrlX + travel * travel * endX;
  const targetY = (1 - travel) * (1 - travel) * y + 2 * (1 - travel) * travel * ctrlY + travel * travel * endY;

  return [targetX, targetY];
}

function heroMorphParticleScale(p: Particle, beat: BeatState): number {
  const travel = EASE_SOFT(clamp(0, 1, beat.pull * 0.96 - p.morphOrder * 0.1));
  const collapse = EASE_SOFT(clamp(0, 1, (beat.morphT - 0.62) / 0.38));
  const clusterScale = 1 - travel * 0.36 - collapse * 0.22;
  const statPinch = beat.heroReveal * 0.32;
  return Math.max(0.12, clusterScale - statPinch * clusterScale * 0.55);
}

function applyBeatPull(
  p: Particle,
  x: number,
  y: number,
  pull: number,
  anchor: { x: number; y: number },
  anchorX: number,
  anchorY: number,
  w: number,
  h: number,
  clusterSpread: number,
): [number, number] {
  let targetX = x;
  let targetY = y;

  if (pull < -0.005) {
    const push = Math.abs(pull);
    targetX += (p.homeX - anchor.x) * w * push * 1.5;
    targetY += (p.homeY - anchor.y) * h * push * 1.1;
  } else if (pull > 0.01) {
    const stagger = p.morphOrder * 0.065;
    const particlePull = EASE_OUT(Math.max(0, Math.min(1, pull * 1.03 - stagger)));
    const sideSign = p.homeX > anchor.x ? 1 : -1;
    const arcX = Math.sin(particlePull * Math.PI) * sideSign * (32 + p.depth * 20);
    const arcY = Math.sin(particlePull * Math.PI) * -(20 + p.depth * 12);
    const jitterX = (hash(p.id) - 0.5) * clusterSpread * (1 - particlePull);
    const jitterY = (hash(`${p.id}-y`) - 0.5) * clusterSpread * 0.32 * (1 - particlePull);
    targetX = targetX * (1 - particlePull) + (anchorX + arcX + jitterX) * particlePull;
    targetY = targetY * (1 - particlePull) + (anchorY + arcY + jitterY) * particlePull;
  }

  return [targetX, targetY];
}

function statDisplayValue(stat: TrustStat): ReactNode {
  if (stat.countUp) {
    return `${stat.countUp.prefix ?? ""}${stat.countUp.to}${stat.countUp.suffix ?? ""}`;
  }
  return stat.value;
}

export function TrustParticleEcosystem({
  stats,
  active = true,
  sceneRef,
  chapterRef,
}: TrustParticleEcosystemProps) {
  const reduce = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>(buildParticles(960, 720));
  const ambientRef = useRef<HTMLDivElement>(null);
  const ambientSecondaryRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const clusterGlowRef = useRef<HTMLDivElement>(null);
  const lightRayRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const morphRingRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const chapterActRef = useRef<HTMLDivElement>(null);
  const interludeRef = useRef<HTMLDivElement>(null);
  const fieldShellRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<Particle[]>(() => buildParticles(960, 720));
  const [isMobile, setIsMobile] = useState(false);
  const displayedActRef = useRef({ label: "01 — Orbit", sub: "Trusted by teams who ship" });
  const actPhaseRef = useRef<"idle" | "out" | "in">("idle");
  const actEnterRef = useRef(1);
  const pendingActRef = useRef<SceneAct | null>(null);

  const syncParticles = useCallback((width: number, height: number) => {
    const w = Math.max(width, 320);
    const h = Math.max(height, 320);
    particlesRef.current = buildParticles(w, h);
    setParticles(particlesRef.current);
    setIsMobile(w < MOBILE_BREAKPOINT);
  }, []);

  useLayoutEffect(() => {
    if (reduce) return;
    const field = fieldRef.current;
    if (!field) return;
    const { width, height } = field.getBoundingClientRect();
    syncParticles(width || 960, height || 720);
  }, [reduce, syncParticles]);

  const shouldAnimate = !reduce && active;

  useEffect(() => {
    if (!shouldAnimate) return;
    const field = fieldRef.current;
    if (!field) return;

    let raf = 0;
    let last = performance.now();
    let cancelled = false;

    const loop = (now: number) => {
      if (cancelled) return;
      const rect = field.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 1 || h < 1) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min(32, now - last) / 1000;
      last = now;
      const t = now * 0.001;
      const scroll = sceneRef.current ? computeTrustSceneProgress(sceneRef.current) : 0;
      const story = storyProgress(scroll);

      const b0 = beatState(scroll, BEATS.stat0);
      const b1 =
        stats.length > 1
          ? beatState(scroll, BEATS.stat1)
          : {
              pull: 0,
              statReveal: 0,
              heroReveal: 0,
              copyReveal: 0,
              active: false,
              morphT: 0,
              dissolveT: 0,
              inHold: false,
            };

      const pull = Math.max(b0.pull, b1.pull);
      const morphT = Math.max(b0.morphT, b1.morphT);
      const floatPhase = 1 - clamp(0, 1, pull * 0.9);
      const parallaxCenter = scroll - 0.5;
      const finaleExpand = story.finale * 0.12;

      const leftAnchor = anchorForIndex(0, w);
      const rightAnchor = anchorForIndex(1, w);
      const leftX = leftAnchor.x * w;
      const leftY = leftAnchor.y * h;
      const rightX = rightAnchor.x * w;
      const rightY = rightAnchor.y * h;

      const morphBeat =
        b1.pull > b0.pull + 0.04 || (b1.statReveal > b0.statReveal + 0.1 && b1.pull > 0)
          ? { b: b1, anchor: rightAnchor, ax: rightX, ay: rightY }
          : { b: b0, anchor: leftAnchor, ax: leftX, ay: leftY };

      const focusAnchor = b1.heroReveal > b0.heroReveal + 0.08 ? rightAnchor : leftAnchor;
      const anchorX = focusAnchor.x * w;
      const anchorY = focusAnchor.y * h;
      const floatCalm = floatPhase * (0.38 + (1 - pull * 0.85) * 0.62);
      const holdQuiet = b0.inHold || b1.inHold ? 0.22 : 1;
      const clusterSpread = Math.max(2, 26 * (1 - Math.max(0, pull)));
      const stagingDim = clamp(0, 0.5, pull * 0.36 + morphT * 0.2);

      const cursor = cursorInField(rect);
      const orbitPhase =
        scroll >= STORY.constellation[0] && scroll < BEATS.stat0.anticipate[0] && pull < 0.02;
      let morphLeftX = leftX;
      let morphLeftY = leftY;
      let morphRightX = rightX;
      let morphRightY = rightY;
      if (cursor.morphBlend > 0.01) {
        morphLeftX = leftX * (1 - cursor.morphBlend) + cursor.x * cursor.morphBlend;
        morphLeftY = leftY * (1 - cursor.morphBlend) + cursor.y * cursor.morphBlend;
        morphRightX = rightX * (1 - cursor.morphBlend) + cursor.x * cursor.morphBlend;
        morphRightY = rightY * (1 - cursor.morphBlend) + cursor.y * cursor.morphBlend;
      }
      const effectAnchorX = morphBeat.ax * (1 - cursor.morphBlend) + cursor.x * cursor.morphBlend;
      const effectAnchorY = morphBeat.ay * (1 - cursor.morphBlend) + cursor.y * cursor.morphBlend;

      for (const p of particlesRef.current) {
        const depthFloat = 0.5 + p.depth * 0.5;
        const floatX =
          Math.sin(t * 0.36 + p.drift) * (10 + finaleExpand * 24) * depthFloat * floatCalm;
        const floatY =
          Math.cos(t * 0.3 + p.drift * 1.05) * (8 + finaleExpand * 18) * depthFloat * floatCalm;
        const parallaxX = parallaxCenter * p.scrollWeight * w * 0.08 * floatCalm;
        const parallaxY = parallaxCenter * p.scrollWeight * h * 0.05 * floatCalm;

        const expandX = (p.homeX - 0.5) * w * finaleExpand;
        const expandY = (p.homeY - 0.5) * h * finaleExpand;

        let targetX = p.homeX * w + floatX + parallaxX + expandX;
        let targetY = p.homeY * h + floatY + parallaxY + expandY;

        if (b0.pull > 0.01 && b0.dissolveT < 0.02) {
          [targetX, targetY] = applyHeroMorphPull(
            p,
            targetX,
            targetY,
            b0.pull,
            b0.morphT,
            morphLeftX,
            morphLeftY,
            w,
          );
        } else if (b1.pull > 0.01 && b1.dissolveT < 0.02) {
          [targetX, targetY] = applyHeroMorphPull(
            p,
            targetX,
            targetY,
            b1.pull,
            b1.morphT,
            morphRightX,
            morphRightY,
            w,
          );
        }

        if (b0.dissolveT > 0.02) {
          const scatter = EASE_SOFT(b0.dissolveT);
          targetX += (p.homeX - leftAnchor.x) * w * scatter * 0.32;
          targetY += (p.homeY - leftAnchor.y) * h * scatter * 0.2;
        }
        if (b1.dissolveT > 0.02) {
          const scatter = EASE_SOFT(b1.dissolveT);
          targetX += (p.homeX - rightAnchor.x) * w * scatter * 0.32;
          targetY += (p.homeY - rightAnchor.y) * h * scatter * 0.2;
        }

        if (orbitPhase && cursor.strength > 0.05) {
          [targetX, targetY] = applyCursorAttract(
            p,
            targetX,
            targetY,
            cursor.x,
            cursor.y,
            w,
            h,
            cursor.strength,
          );
        }

        const heroMorphActive =
          (b0.pull > 0.04 && b0.dissolveT < 0.04) || (b1.pull > 0.04 && b1.dissolveT < 0.04);
        const morphSpringBeat = b1.pull > b0.pull + 0.02 ? b1 : b0;
        if (heroMorphActive) {
          const spring = 1.5 + morphSpringBeat.pull * 1.3;
          const damping = 0.9;
          p.vx += (targetX - p.x) * spring * dt;
          p.vy += (targetY - p.y) * spring * dt;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        } else {
          const spring = pull > 0.1 ? 6.8 : 2.6;
          const damping = pull > 0.1 ? 0.81 : 0.87;
          p.vx += (targetX - p.x) * spring * dt;
          p.vy += (targetY - p.y) * spring * dt;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }
      }

      field.querySelectorAll<HTMLElement>("[data-count-stat]").forEach((el) => {
        const index = Number(el.dataset.countStat ?? 0);
        const beat = index === 1 ? b1 : b0;
        const vis = statVisibility(index, b0, b1);
        const stat = stats[index];
        if (!stat?.countUp || vis < 0.1) {
          el.textContent = stat?.countUp
            ? `${stat.countUp.prefix ?? ""}0${stat.countUp.suffix ?? ""}`
            : String(stat?.value ?? "");
          return;
        }
        const countT = EASE_SOFT(Math.max(0, (beat.heroReveal - 0.15) / 0.85));
        const value = Math.round(stat.countUp.to * countT);
        el.textContent = `${stat.countUp.prefix ?? ""}${value}${stat.countUp.suffix ?? ""}`;
      });

      for (const el of field.querySelectorAll<HTMLElement>("[data-particle-id]")) {
        const p = particlesRef.current.find((item) => item.id === el.dataset.particleId);
        if (!p) continue;

        const staggerIn = EASE_SOFT(
          Math.max(0, Math.min(1, (story.constellation - p.morphOrder * 0.55) / 0.45)),
        );
        const depthScale = 0.82 + p.depth * 0.26;
        let scale = depthScale * p.size;
        let opacity = (0.44 + p.depth * 0.56) * staggerIn;

        if (pull < -0.008) {
          scale *= 1 + Math.abs(pull) * 0.05;
        }

        const b0MorphActive =
          b0.pull > 0.02 &&
          scroll >= BEATS.stat0.anticipate[0] &&
          scroll < BEATS.stat0.dissolve[0];
        const b1MorphActive =
          b1.pull > 0.02 &&
          scroll >= BEATS.stat1.anticipate[0] &&
          scroll < BEATS.stat1.dissolve[0];
        if (b0MorphActive) {
          scale *= heroMorphParticleScale(p, b0);
          opacity *= 1 - b0.heroReveal * 0.12;
          if (b0.dissolveT > 0.02) scale *= 1 + EASE_SOFT(b0.dissolveT) * 0.06;
        } else if (b1MorphActive) {
          scale *= heroMorphParticleScale(p, b1);
          opacity *= 1 - b1.heroReveal * 0.12;
          if (b1.dissolveT > 0.02) scale *= 1 + EASE_SOFT(b1.dissolveT) * 0.06;
        }
        opacity *= 1 - stagingDim * 0.04;
        opacity *= 1 - story.exit * 0.85;
        if (floatPhase > 0.45) {
          opacity = Math.max(opacity, (0.4 + p.depth * 0.52) * staggerIn * floatPhase);
        }

        const enterBlur = (1 - staggerIn) * 5.5;
        const morphBlur =
          b0MorphActive || b1MorphActive
            ? Math.max(b0.pull, b1.pull) * 0.28
            : pull * 0.85;
        const depthBlur = (1 - p.depth) * 0.18 + morphBlur;

        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(Math.max(0, opacity));
        el.style.filter = `blur(${depthBlur + enterBlur}px)`;
        el.style.zIndex = String(20 + Math.round(p.depth * 40));
      }

      field.querySelectorAll<HTMLElement>(".rm-trust-ecosystem__fg-stat").forEach((slot, index) => {
        const beat = index === 1 ? b1 : b0;
        const vis = statVisibility(index, b0, b1);
        const clusterReady =
          index === 0
            ? EASE_SOFT(clamp(0, 1, (beat.morphT - 0.42) / 0.58))
            : EASE_SOFT(clamp(0, 1, (beat.morphT - 0.5) / 0.5));
        const emerge = EASE_SOFT(clamp(0, 1, (beat.heroReveal - 0.04) / 0.96));
        const hero = clusterReady * emerge * vis * (1 - story.exit * 0.9);
        const copy = beat.copyReveal * vis * (1 - story.exit);
        const holdBreathe =
          beat.inHold && hero > 0.88 ? 1 + Math.sin(t * 1.2) * 0.005 : 1;
        const exitLift = beat.dissolveT > 0 ? -16 * EASE_IN(beat.dissolveT) : 0;
        const emergeScale = EASE_SOFT(hero);
        const enterLift = (1 - emergeScale) * 7;
        const scale = (0.4 + emergeScale * 0.6) * holdBreathe;
        const blur = (1 - emergeScale) * 2.5;
        const bloom =
          beat.inHold && hero > 0.9 ? 0.55 + Math.sin(t * 1.35) * 0.1 : hero * 0.28;

        slot.style.opacity = String(hero);
        slot.style.transform = `translate(-50%, calc(-50% + ${enterLift + exitLift}px)) scale(${scale})`;
        slot.style.filter = `blur(${blur}px)`;
        slot.style.setProperty("--stat-bloom", String(bloom));

        const copyEl = slot.querySelector<HTMLElement>(".rm-trust-ecosystem__fg-stat-copy");
        if (copyEl) {
          copyEl.style.opacity = String(copy);
          copyEl.style.transform = `translateY(${(1 - copy) * 10}px)`;
          copyEl.style.filter = `blur(${(1 - copy) * 3}px)`;
        }
      });

      field.querySelectorAll<HTMLElement>(".rm-trust-ecosystem__stat-shadow").forEach((shadow, index) => {
        const beat = index === 1 ? b1 : b0;
        const lagged = EASE_SOFT(Math.max(0, statVisibility(index, b0, b1) * beat.heroReveal - 0.18));
        shadow.style.opacity = String(lagged * 0.72 * (1 - story.exit));
        shadow.style.transform = `translate(-50%, -50%) scale(${0.62 + lagged * 0.46})`;
      });

      const heroPeak = Math.max(b0.heroReveal, b1.heroReveal);
      const morphFlash = morphT * (1 - Math.abs(morphT - 0.65) * 2.5);

      if (clusterGlowRef.current) {
        const b0Cluster = b0.morphT * b0.pull * (1 - b0.dissolveT);
        const b1Cluster = b1.morphT * b1.pull * (1 - b1.dissolveT);
        const cursorEnergy = premiumCursorStore.inTrustScene ? premiumCursorStore.energy : 0;
        const cursorPulse = premiumCursorStore.inTrustScene ? premiumCursorStore.pulse : 0;
        const glow =
          heroPeak * 0.58 +
          pull * 0.26 +
          Math.max(b0Cluster, b1Cluster) * 0.52 +
          cursorEnergy * 0.24 +
          cursorPulse * 0.16;
        clusterGlowRef.current.style.opacity = String(
          (glow * 0.9 + cursorPulse * 0.14) * (1 - story.exit),
        );
        clusterGlowRef.current.style.transform = `translate(${effectAnchorX}px, ${effectAnchorY}px) translate(-50%, -50%) scale(${0.55 + glow * 1.05 + cursorPulse * 0.2})`;
      }

      if (lightRayRef.current) {
        const cursorPulse = premiumCursorStore.inTrustScene ? premiumCursorStore.pulse : 0;
        const ray = (pull * 0.55 + morphFlash * 0.45) * holdQuiet;
        lightRayRef.current.style.opacity = String(
          (ray * 0.28 + cursorPulse * 0.1) * (1 - story.exit),
        );
        lightRayRef.current.style.transform = `translate(${effectAnchorX}px, ${effectAnchorY}px) translate(-50%, -50%) rotate(${scroll * 48 - 12}deg) scale(${0.8 + pull * 1.4 + cursorPulse * 0.35}, ${0.4 + morphFlash * 0.8 + cursorPulse * 0.18})`;
      }

      if (burstRef.current) {
        burstRef.current.style.opacity = String(Math.max(0, morphFlash) * 0.42 * holdQuiet * (1 - story.exit));
        burstRef.current.style.transform = `translate(${effectAnchorX}px, ${effectAnchorY}px) translate(-50%, -50%) scale(${0.5 + morphFlash * 2.2})`;
      }

      if (morphRingRef.current) {
        const cursorPulse = premiumCursorStore.inTrustScene ? premiumCursorStore.pulse : 0;
        const ring = (pull * 0.72 + morphFlash * 0.55) * holdQuiet;
        morphRingRef.current.style.opacity = String(
          (ring * 0.34 + cursorPulse * 0.14) * (1 - story.exit),
        );
        morphRingRef.current.style.transform = `translate(${effectAnchorX}px, ${effectAnchorY}px) translate(-50%, -50%) scale(${0.72 + ring * 1.35 + cursorPulse * 0.32}) rotate(${scroll * 24 - 8 + cursorPulse * 6}deg)`;
      }

      if (ambientRef.current) {
        const actGlow = Math.max(b0.heroReveal * (1 - b0.dissolveT), b1.heroReveal * (1 - b1.dissolveT));
        const cursorEnergy = premiumCursorStore.inTrustScene ? premiumCursorStore.energy : 0;
        const cursorPulse = premiumCursorStore.inTrustScene ? premiumCursorStore.pulse : 0;
        const counterShift = (focusAnchor.x - 0.5) * pull * -20;
        ambientRef.current.style.transform = `translateX(${counterShift}%) scale(${1 - stagingDim * 0.05 + cursorPulse * 0.015})`;
        ambientRef.current.style.opacity = String(
          (0.26 + scroll * 0.1 + actGlow * 0.24 - stagingDim * 0.18 + cursorEnergy * 0.14 + cursorPulse * 0.08) *
            (1 - story.exit * 0.7),
        );
      }

      if (ambientSecondaryRef.current) {
        const driftX = Math.sin(t * 0.16) * 4 - parallaxCenter * 12;
        const driftY = Math.cos(t * 0.14) * 3;
        ambientSecondaryRef.current.style.transform = `translate(${driftX}%, ${driftY}%) scale(${0.92 + scroll * 0.08 + finaleExpand})`;
        ambientSecondaryRef.current.style.opacity = String(
          (0.22 + floatPhase * 0.28 - stagingDim * 0.12) * (1 - story.exit * 0.6),
        );
      }

      if (horizonRef.current) {
        horizonRef.current.style.opacity = String(
          (0.3 + floatPhase * 0.3 - stagingDim * 0.18) * (1 - story.exit),
        );
        horizonRef.current.style.transform = `translateY(${stagingDim * 14}px) scaleX(${1 + finaleExpand * 0.4})`;
      }

      if (scrollCueRef.current) {
        const cue = clamp(0, 1, 1 - scroll * 2.6) * (1 - story.exit);
        scrollCueRef.current.style.opacity = String(cue * 0.55);
        scrollCueRef.current.style.transform = `translate(-50%, ${cue * 10}px)`;
      }

      if (vignetteRef.current) {
        const cursorEnergy = premiumCursorStore.inTrustScene ? premiumCursorStore.energy : 0;
        const cursorPulse = premiumCursorStore.inTrustScene ? premiumCursorStore.pulse : 0;
        const sceneFocusX = 50 + (focusAnchor.x - 0.5) * pull * 36;
        const sceneFocusY = 50 + (focusAnchor.y - 0.5) * pull * 16;
        const cursorFocusX = premiumCursorStore.trustX * 100;
        const cursorFocusY = premiumCursorStore.trustY * 100;
        const focusBlend = cursorEnergy * 0.42 + cursorPulse * 0.12;
        const focusX = sceneFocusX * (1 - focusBlend) + cursorFocusX * focusBlend;
        const focusY = sceneFocusY * (1 - focusBlend) + cursorFocusY * focusBlend;
        const orbitLift = story.constellation * (1 - pull * 0.55);
        const edge =
          0.48 +
          story.enter * 0.06 +
          stagingDim * 0.12 -
          orbitLift * 0.16 -
          cursorPulse * 0.04;
        vignetteRef.current.style.background = `radial-gradient(circle at ${focusX}% ${focusY}%, transparent ${22 - cursorPulse * 4}%, rgba(0, 0, 0, ${edge}) 100%)`;
        vignetteRef.current.style.opacity = String(0.78 + stagingDim * 0.18 + cursorEnergy * 0.06);
      }

      if (curtainTopRef.current) {
        const topLift = (1 - story.enter) * 100;
        curtainTopRef.current.style.transform = `translateY(${-topLift}%)`;
        curtainTopRef.current.style.opacity = String(1 - story.enter);
      }

      if (curtainBottomRef.current) {
        curtainBottomRef.current.style.opacity = String(story.exit * 0.95);
        curtainBottomRef.current.style.transform = `translateY(${(1 - story.exit) * 30}%)`;
      }

      if (fieldShellRef.current) {
        fieldShellRef.current.style.opacity = String(1 - story.exit * 0.92);
        fieldShellRef.current.style.transform = `scale(${1 - story.exit * 0.035})`;
      }

      if (chapterActRef.current) {
        const targetAct = resolveSceneAct(scroll, b0, b1, story, pull);
        pendingActRef.current = targetAct;

        if (
          actPhaseRef.current === "idle" &&
          (targetAct.label !== displayedActRef.current.label ||
            targetAct.sub !== displayedActRef.current.sub)
        ) {
          actPhaseRef.current = "out";
        }

        if (actPhaseRef.current === "out") {
          actEnterRef.current = Math.max(0, actEnterRef.current - dt * 2.1);
          if (actEnterRef.current <= 0.001) {
            displayedActRef.current = {
              label: targetAct.label,
              sub: targetAct.sub,
            };
            actPhaseRef.current = "in";
          }
        } else if (actPhaseRef.current === "in") {
          actEnterRef.current = Math.min(1, actEnterRef.current + dt * 1.7);
          if (actEnterRef.current >= 0.999) {
            actPhaseRef.current = "idle";
            actEnterRef.current = 1;
          }
        }

        const actReveal =
          actPhaseRef.current === "out"
            ? actEnterRef.current
            : EASE_OUT(actEnterRef.current);
        const actLift = (1 - actReveal) * 10;
        const actBlur = (1 - actReveal) * 4;

        chapterActRef.current.style.opacity = String(
          targetAct.actOpacity * actReveal * (1 - story.exit),
        );

        const labelEl = chapterActRef.current.querySelector<HTMLElement>(
          ".rm-trust-ecosystem__chapter-label",
        );
        const subEl = chapterActRef.current.querySelector<HTMLElement>(
          ".rm-trust-ecosystem__chapter-sub",
        );
        if (labelEl) {
          labelEl.textContent = displayedActRef.current.label;
          labelEl.style.opacity = String(0.55 + actReveal * 0.45);
          labelEl.style.transform = `translateY(${actLift}px)`;
          labelEl.style.filter = `blur(${actBlur}px)`;
        }
        if (subEl) {
          subEl.textContent = displayedActRef.current.sub;
          subEl.style.opacity = String(actReveal);
          subEl.style.transform = `translateY(${actLift * 0.65}px)`;
          subEl.style.filter = `blur(${actBlur * 0.75}px)`;
        }
      }

      if (interludeRef.current) {
        const interludeSpan = interludeRef.current.querySelector<HTMLElement>("span");
        interludeRef.current.style.opacity = String(story.interludePeak * 0.85 * (1 - story.exit));
        interludeRef.current.style.transform = `translate(-50%, calc(-50% + ${(1 - story.interludePeak) * 18}px)) scale(${0.96 + story.interludePeak * 0.04})`;
        if (interludeSpan) {
          interludeSpan.style.letterSpacing = `${-0.03 + story.interludePeak * 0.05}em`;
          interludeSpan.style.filter = `blur(${(1 - story.interludePeak) * 3}px)`;
        }
      }

      const chapter = chapterRef?.current ?? sceneRef.current?.closest("#studio");
      if (chapter instanceof HTMLElement) {
        const actGlow = Math.max(b0.heroReveal * (1 - b0.dissolveT), b1.heroReveal * (1 - b1.dissolveT));
        const actFocusX = b1.heroReveal > b0.heroReveal + 0.06 ? 78 : b0.heroReveal > 0.04 ? 22 : 50;
        chapter.style.setProperty("--trust-scroll", String(scroll));
        chapter.style.setProperty("--trust-enter", String(story.enter));
        chapter.style.setProperty("--trust-exit", String(story.exit));
        chapter.style.setProperty("--trust-act-glow", String(actGlow));
        chapter.style.setProperty("--trust-act-x", `${actFocusX}%`);
        chapter.style.setProperty("--trust-cursor-energy", String(premiumCursorStore.energy));
        chapter.style.setProperty("--trust-cursor-pulse", String(premiumCursorStore.pulse));
      }

      field.style.setProperty("--trust-cursor-energy", String(premiumCursorStore.energy));
      field.style.setProperty("--trust-cursor-pulse", String(premiumCursorStore.pulse));

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const { width, height } = field.getBoundingClientRect();
        if (width > 0 && height > 0) syncParticles(width, height);
      }, 120);
    });
    ro.observe(field);

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [shouldAnimate, stats.length, syncParticles, sceneRef, chapterRef]);

  if (reduce) {
    return (
      <div className="rm-trust-ecosystem rm-trust-ecosystem--static">
        <div className="rm-trust-ecosystem__brands" aria-hidden="true">
          {TRUST_BRANDS.map((brand) => (
            <span key={brand} className="rm-trust-ecosystem__brand-word">
              {brand}
            </span>
          ))}
        </div>
        <div className="rm-trust-ecosystem__stats-static">
          {stats.map((stat, index) => (
            <div key={index} className="rm-trust-stats__stat flex flex-col gap-3 text-left">
              <p className="rm-trust-stats__stat-value">{statDisplayValue(stat)}</p>
              <p className="rm-trust-ecosystem__stat-copy">{stat.copy}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const positions = isMobile
    ? stats.map((_, index) => ({ left: "50%", top: index === 0 ? "46%" : "54%" }))
    : stats.length > 1
      ? [
          { left: "22%", top: "50%" },
          { left: "78%", top: "50%" },
        ]
      : [{ left: "50%", top: "50%" }];

  return (
    <div ref={fieldRef} className="rm-trust-ecosystem" aria-label="Client logos and studio metrics">
      <div ref={curtainTopRef} className="rm-trust-ecosystem__curtain-top" aria-hidden="true" />
      <div ref={fieldShellRef} className="rm-trust-ecosystem__field">
        <div ref={ambientRef} className="rm-trust-ecosystem__ambient" aria-hidden="true" />
        <div
          ref={ambientSecondaryRef}
          className="rm-trust-ecosystem__ambient rm-trust-ecosystem__ambient--secondary"
          aria-hidden="true"
        />
        <div ref={horizonRef} className="rm-trust-ecosystem__horizon" aria-hidden="true" />
        <div ref={lightRayRef} className="rm-trust-ecosystem__light-ray" aria-hidden="true" />
        <div ref={burstRef} className="rm-trust-ecosystem__burst" aria-hidden="true" />
        <div ref={morphRingRef} className="rm-trust-ecosystem__morph-ring" aria-hidden="true" />
        <div ref={vignetteRef} className="rm-trust-ecosystem__vignette" aria-hidden="true" />
        <div ref={clusterGlowRef} className="rm-trust-ecosystem__cluster-glow" aria-hidden="true" />
        <div className="rm-trust-ecosystem__grain" aria-hidden="true" />

        <div ref={chapterActRef} className="rm-trust-ecosystem__chapter" aria-hidden="true">
          <p className="rm-trust-ecosystem__chapter-label">01 — Orbit</p>
          <p className="rm-trust-ecosystem__chapter-sub">Trusted by teams who ship</p>
        </div>

        <div ref={interludeRef} className="rm-trust-ecosystem__interlude" aria-hidden="true">
          <span>Then the impact</span>
        </div>

        <div ref={scrollCueRef} className="rm-trust-ecosystem__scroll-cue" aria-hidden="true">
          <span>Scroll the story</span>
        </div>

        <div className="rm-trust-ecosystem__fg-stats">
          {stats.map((stat, index) => {
            const pos = positions[index] ?? positions[0];
            const align = isMobile ? "center" : index === 1 ? "right" : "left";
            return (
              <div key={index} className="rm-trust-ecosystem__stat-anchor">
                <div
                  className="rm-trust-ecosystem__stat-shadow"
                  style={{ left: pos.left, top: pos.top }}
                  aria-hidden="true"
                />
                <div
                  className={`rm-trust-ecosystem__fg-stat rm-trust-ecosystem__fg-stat--${align}`}
                  style={{ left: pos.left, top: pos.top }}
                >
                  <p className="rm-trust-ecosystem__fg-stat-value" data-count-stat={index}>
                    {stat.countUp
                      ? `${stat.countUp.prefix ?? ""}0${stat.countUp.suffix ?? ""}`
                      : stat.value}
                  </p>
                  <p className="rm-trust-ecosystem__fg-stat-copy">{stat.copy}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rm-trust-ecosystem__particles">
          {particles.map((p) => (
            <span
              key={p.id}
              data-particle-id={p.id}
              className="rm-trust-ecosystem__particle"
              style={{ opacity: 0 }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      <div ref={curtainBottomRef} className="rm-trust-ecosystem__curtain-bottom" aria-hidden="true" />

      <p className="sr-only" aria-live="polite">
        Scroll through a story of client trust and studio impact
      </p>
    </div>
  );
}
