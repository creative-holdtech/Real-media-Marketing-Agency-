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

/** Hero tier — larger, brighter, anchored on the golden-ratio orbit. */
const HERO_BRANDS = new Set<string>(["WHITEBIT", "CAPITAL.COM", "1inch"]);

/** Premium signature — strong decelerate (Emil: cubic-bezier(0.23, 1, 0.32, 1)). */
const EASE_PREMIUM_OUT = (t: number) => 1 - Math.pow(1 - clamp(0, 1, t), 4);
/** On-screen movement — deliberate acceleration/deceleration. */
const EASE_PREMIUM_IN_OUT = (t: number) => {
  const x = clamp(0, 1, t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const EASE_OUT = EASE_PREMIUM_OUT;
const EASE_IN = (t: number) => Math.pow(clamp(0, 1, t), 3.2);
const EASE_SOFT = (t: number) => {
  const x = clamp(0, 1, t);
  return x * x * (3 - 2 * x);
};

/** Frame-rate independent exponential smoothing (Premium — no spring overshoot). */
function smoothStep(current: number, target: number, dt: number, rate: number) {
  const blend = 1 - Math.exp(-dt * rate);
  return current + (target - current) * blend;
}

function snapPx(value: number) {
  return Math.round(value * 100) / 100;
}

const ANCHOR_X = 0.5;
const ANCHOR_Y = 0.5;
const MOBILE_BREAKPOINT = 768;
const TOTAL_PARTICLES = TRUST_BRANDS.length;

/** Story acts on scroll timeline (0–1) */
const STORY = {
  enter: [0, 0.1],
  constellation: [0.02, 0.16],
  finale: [0.84, 0.92],
  exit: [0.9, 1],
} as const;

/** Stagger spread — ~55ms perceived gap between constellation nodes. */
const CONSTELLATION_STAGGER = 0.38;
const CONSTELLATION_ENTRANCE_WINDOW = 0.62;

const BEATS = {
  stat0: {
    anticipate: [0.17, 0.22],
    morph: [0.22, 0.36],
    hold: [0.36, 0.43],
    dissolve: [0.43, 0.5],
  },
  stat1: {
    anticipate: [0.47, 0.53],
    morph: [0.53, 0.67],
    hold: [0.67, 0.75],
    dissolve: [0.75, 0.83],
  },
} as const;

// Constellation home positions kept inside a safe area so the brand wordmarks
// never get clipped by the viewport edges once float/parallax is layered on top.
const BRAND_LAYOUT: ReadonlyArray<{ x: number; y: number }> = [
  { x: 0.21, y: 0.28 },
  { x: 0.79, y: 0.25 },
  { x: 0.82, y: 0.66 },
  { x: 0.24, y: 0.71 },
  { x: 0.5, y: 0.2 },
  { x: 0.16, y: 0.5 },
  { x: 0.84, y: 0.47 },
  { x: 0.52, y: 0.79 },
];

/** Horizontal / vertical safe-area padding (fraction of field) for resting nodes. */
const SAFE_PAD_X = 0.14;
const SAFE_PAD_Y = 0.17;
/** Hard clamp (looser) applied after the spring so overshoot never clips. */
const HARD_PAD_X = 0.06;
const HARD_PAD_Y = 0.08;

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
  /** Per-particle drift frequencies so no two nodes share a breathing rhythm. */
  freqX: number;
  freqY: number;
  size: number;
  morphOrder: number;
  scrollWeight: number;
  /** Keepers resist the hero-stat collapse and stay as a living constellation. */
  keeper: boolean;
  /** Primary orbit nodes — brighter and slightly larger. */
  hero: boolean;
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
  const morphT = EASE_PREMIUM_IN_OUT(segmentT(scroll, beat.morph[0], beat.morph[1]));
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
    pull = 1 - EASE_PREMIUM_OUT(Math.pow(dissolveT, 0.92));
  }

  let statReveal = 0;
  if (scroll >= beat.morph[0] && scroll < beat.dissolve[0]) {
    statReveal = inHold ? 1 : EASE_SOFT(Math.max(0, (morphT - 0.22) / 0.78));
  } else if (scroll >= beat.dissolve[0] && scroll < beat.dissolve[1]) {
    statReveal = 1 - EASE_PREMIUM_OUT(Math.pow(dissolveT, 0.82));
  }

  const clusterForm = EASE_PREMIUM_OUT(Math.max(0, (morphT - 0.32) / 0.68));
  const heroReveal = EASE_PREMIUM_OUT(Math.max(0, (statReveal - 0.04) / 0.96)) * clusterForm;
  const copyReveal = EASE_PREMIUM_OUT(Math.max(0, (heroReveal - 0.22) / 0.78));

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

function storyProgress(scroll: number) {
  const enter = EASE_OUT(segmentT(scroll, STORY.enter[0], STORY.enter[1]));
  const constellation = EASE_OUT(segmentT(scroll, STORY.constellation[0], STORY.constellation[1]));
  const finale = EASE_OUT(segmentT(scroll, STORY.finale[0], STORY.finale[1]));
  const exit = EASE_IN(segmentT(scroll, STORY.exit[0], STORY.exit[1]));
  return { enter, constellation, finale, exit };
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
  let actOpacity = Math.max(0.48, story.constellation * (1 - pull * 0.8));

  if (scroll >= BEATS.stat0.anticipate[0] && scroll < BEATS.stat0.dissolve[1]) {
    label = "02 — Volume";
    sub = "Projects that landed";
    actOpacity = Math.max(b0.heroReveal, b0.statReveal * 0.5) * (1 - b0.dissolveT);
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
    const hero = HERO_BRANDS.has(brand);
    const slot = BRAND_LAYOUT[brandIndex % BRAND_LAYOUT.length];
    const jitterX = (hash(`${id}-jx`) - 0.5) * (hero ? 0.02 : 0.03);
    const jitterY = (hash(`${id}-jy`) - 0.5) * (hero ? 0.02 : 0.03);
    // The wordmarks are ~100px wide but a phone field is only ~390px, so the
    // outer brands hug (and during drift, kiss) the edges. Pull the horizontal
    // spread toward centre on mobile so every label keeps a clean margin —
    // vertical spread is untouched, so the constellation stays open, not columnar.
    const mobile = width < MOBILE_BREAKPOINT;
    const rawX = slot.x + jitterX;
    const homeX = clamp(0.06, 0.94, mobile ? 0.5 + (rawX - 0.5) * 0.68 : rawX);
    const homeY = clamp(0.1, 0.9, slot.y + jitterY);
    const depth = (hero ? 0.58 : 0.4) + hash(`${id}-d`) * (hero ? 0.38 : 0.5);
    const x = homeX * width;
    const y = homeY * height;
    return {
      id,
      label: brand,
      homeX,
      homeY,
      x,
      y,
      vx: 0,
      vy: 0,
      depth,
      drift: hash(`${id}-dr`) * Math.PI * 2,
      // Incommensurate per-node frequencies — the constellation never breathes
      // on one collective clock, so the drift reads organic instead of mechanical.
      freqX: 0.14 + hash(`${id}-fx`) * 0.12,
      freqY: 0.12 + hash(`${id}-fy`) * 0.11,
      size: (hero ? 1.02 : 0.9) + depth * 0.14,
      morphOrder: brandIndex / TOTAL_PARTICLES,
      scrollWeight: 0.18 + depth * 0.35,
      // ~3 of 8 nodes never fully collapse into the number — they keep the
      // opposite side of the frame alive as a breathing constellation.
      keeper: brandIndex % 3 === 2,
      hero,
    };
  });
}

function anchorForIndex(_index: number, _width: number) {
  return { x: ANCHOR_X, y: ANCHOR_Y };
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
  const stagger = p.morphOrder * 0.11;
  const travel = EASE_PREMIUM_IN_OUT(clamp(0, 1, pull * 0.96 - stagger));
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

  const targetX =
    (1 - travel) * (1 - travel) * x + 2 * (1 - travel) * travel * ctrlX + travel * travel * endX;
  const targetY =
    (1 - travel) * (1 - travel) * y + 2 * (1 - travel) * travel * ctrlY + travel * travel * endY;

  return [targetX, targetY];
}

function heroMorphParticleScale(p: Particle, beat: BeatState): number {
  const travel = EASE_SOFT(clamp(0, 1, beat.pull * 0.96 - p.morphOrder * 0.1));
  const collapse = EASE_SOFT(clamp(0, 1, (beat.morphT - 0.62) / 0.38));
  const clusterScale = 1 - travel * 0.32 - collapse * 0.18;
  const statPinch = beat.heroReveal * 0.28;
  return Math.max(0.22, clusterScale - statPinch * clusterScale * 0.48);
}

function statDisplayValue(stat: TrustStat): ReactNode {
  if (stat.countUp) {
    return `${stat.countUp.prefix ?? ""}${stat.countUp.to}${stat.countUp.suffix ?? ""}`;
  }
  return stat.value;
}

export function TrustParticleEcosystem({
  stats,
  inView = true,
  active = true,
  sceneRef,
  chapterRef,
}: TrustParticleEcosystemProps) {
  const reduce = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const linkCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: 0.5, y: 0.5, inside: false, energy: 0 });
  const particlesRef = useRef<Particle[]>(buildParticles(960, 720));
  const ambientRef = useRef<HTMLDivElement>(null);
  const ambientSecondaryRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const chapterActRef = useRef<HTMLDivElement>(null);
  const fieldShellRef = useRef<HTMLDivElement>(null);

  const particleElMapRef = useRef<Map<string, HTMLElement>>(new Map());
  const particleVisualRef = useRef<Map<string, { opacity: number; scale: number; blur: number }>>(
    new Map(),
  );
  const smoothScrollRef = useRef(0);
  const isMobileRef = useRef(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const displayedActRef = useRef({ label: "01 — Orbit", sub: "Trusted by teams who ship" });
  const actPhaseRef = useRef<"idle" | "out" | "in">("idle");
  const actEnterRef = useRef(1);

  const syncParticleElements = useCallback(() => {
    const field = fieldRef.current;
    if (!field) return;
    const map = new Map<string, HTMLElement>();
    field.querySelectorAll<HTMLElement>("[data-particle-id]").forEach((el) => {
      const id = el.dataset.particleId;
      if (id) map.set(id, el);
    });
    particleElMapRef.current = map;
  }, []);

  const syncParticles = useCallback((width: number, height: number) => {
    const w = Math.max(width, 320);
    const h = Math.max(height, 320);
    particlesRef.current = buildParticles(w, h);
    particleVisualRef.current.clear();
    const mobile = w < MOBILE_BREAKPOINT;
    isMobileRef.current = mobile;
    syncParticleElements();
  }, [syncParticleElements]);

  useLayoutEffect(() => {
    if (reduce) return;
    const field = fieldRef.current;
    if (!field) return;
    const { width, height } = field.getBoundingClientRect();
    syncParticles(width || 960, height || 720);
  }, [reduce, syncParticles]);

  const shouldAnimate = !reduce && active && inView && sceneVisible;

  useEffect(() => {
    if (reduce) return;
    const field = fieldRef.current;
    if (!field) return;
    const onMove = (e: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      cursorRef.current.x = (e.clientX - rect.left) / rect.width;
      cursorRef.current.y = (e.clientY - rect.top) / rect.height;
      cursorRef.current.inside = true;
    };
    const onLeave = () => {
      cursorRef.current.inside = false;
    };
    field.addEventListener("pointermove", onMove, { passive: true });
    field.addEventListener("pointerleave", onLeave);
    return () => {
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const scene = sceneRef.current;
    if (!scene) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setSceneVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "120px 0px" },
    );
    io.observe(scene);
    return () => io.disconnect();
  }, [reduce, sceneRef]);

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
      const scrollRaw = sceneRef.current ? computeTrustSceneProgress(sceneRef.current) : 0;
      // Snap on cold start / tab resume so scroll-driven beats don't ease in from zero.
      smoothScrollRef.current =
        dt > 0.12 ? scrollRaw : smoothStep(smoothScrollRef.current, scrollRaw, dt, 4.8);
      const scroll = smoothScrollRef.current;
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
      const finaleExpand = story.finale * 0.05;
      // How strongly a hero stat currently owns the frame (0 = pure constellation).
      const statFocusAmt = clamp(0, 1, Math.max(b0.heroReveal, b1.heroReveal));

      const centerAnchor = anchorForIndex(0, w);
      const centerX = centerAnchor.x * w;
      const centerY = centerAnchor.y * h;

      const morphBeat =
        b1.pull > b0.pull + 0.04 || (b1.statReveal > b0.statReveal + 0.1 && b1.pull > 0)
          ? b1
          : b0;

      const focusAnchor = centerAnchor;
      const floatCalm = floatPhase * (0.38 + (1 - pull * 0.85) * 0.62);
      const stagingDim = clamp(0, 0.5, pull * 0.36 + morphT * 0.2);
      for (const p of particlesRef.current) {
        const depthFloat = 0.5 + p.depth * 0.5;
        // Compound wander: a slow primary sine plus a faster, non-integer-ratio
        // secondary one — per node these never realign, so the path traces a
        // drifting arc that doesn't repeat tightly instead of a synced ellipse.
        // Mobile keeps the lift small so the wide wordmarks never swing into the
        // narrow viewport's edges; the desktop field has room to breathe more.
        const driftAmp = isMobileRef.current ? 0.42 : 0.78;
        const ampX = (6.5 + finaleExpand * 12) * depthFloat * floatCalm * driftAmp;
        const ampY = (5.5 + finaleExpand * 9) * depthFloat * floatCalm * driftAmp;
        const floatX =
          (Math.sin(t * p.freqX + p.drift) * 0.72 +
            Math.sin(t * p.freqX * 1.93 + p.drift * 1.7) * 0.28) *
          ampX;
        const floatY =
          (Math.cos(t * p.freqY + p.drift * 1.05) * 0.72 +
            Math.cos(t * p.freqY * 2.17 + p.drift * 0.6) * 0.28) *
          ampY;
        const parallaxX = parallaxCenter * p.scrollWeight * w * 0.08 * floatCalm;
        const parallaxY = parallaxCenter * p.scrollWeight * h * 0.05 * floatCalm;

        const expandX = (p.homeX - 0.5) * w * finaleExpand;
        const expandY = (p.homeY - 0.5) * h * finaleExpand;

        let targetX = p.homeX * w + floatX + parallaxX + expandX;
        let targetY = p.homeY * h + floatY + parallaxY + expandY;

        // Keep the resting constellation inside the safe area so wordmarks
        // never get clipped by the viewport edges. Mobile gets a wider
        // horizontal margin since a ~100px label eats a big share of a phone.
        const padX = isMobileRef.current ? 0.2 : SAFE_PAD_X;
        targetX = clamp(w * padX, w * (1 - padX), targetX);
        targetY = clamp(h * SAFE_PAD_Y, h * (1 - SAFE_PAD_Y), targetY);

        if (p.keeper && statFocusAmt > 0.02) {
          const push = EASE_SOFT(statFocusAmt) * 0.16;
          targetX = p.homeX * w + (p.homeX - 0.5) * w * push;
          targetY = p.homeY * h + (p.homeY - 0.5) * h * push;
        } else if (b0.pull > 0.01 && b0.dissolveT < 0.02) {
          [targetX, targetY] = applyHeroMorphPull(
            p,
            targetX,
            targetY,
            b0.pull,
            b0.morphT,
            centerX,
            centerY,
            w,
          );
        } else if (b1.pull > 0.01 && b1.dissolveT < 0.02) {
          [targetX, targetY] = applyHeroMorphPull(
            p,
            targetX,
            targetY,
            b1.pull,
            b1.morphT,
            centerX,
            centerY,
            w,
          );
        }

        if (!p.keeper && b0.dissolveT > 0.02) {
          const scatter = EASE_SOFT(b0.dissolveT);
          targetX += (p.homeX - 0.5) * w * scatter * 0.36;
          targetY += (p.homeY - 0.5) * h * scatter * 0.22;
        }
        if (!p.keeper && b1.dissolveT > 0.02) {
          const scatter = EASE_SOFT(b1.dissolveT);
          targetX += (p.homeX - 0.5) * w * scatter * 0.36;
          targetY += (p.homeY - 0.5) * h * scatter * 0.22;
        }

        const heroMorphActive =
          !p.keeper &&
          ((b0.pull > 0.04 && b0.dissolveT < 0.04) || (b1.pull > 0.04 && b1.dissolveT < 0.04));
        const morphSpringBeat = morphBeat;
        const orbitDrift = !heroMorphActive && pull < 0.08;
        if (orbitDrift) {
          const follow = 1 - Math.exp(-dt * 3.4);
          p.x += (targetX - p.x) * follow;
          p.y += (targetY - p.y) * follow;
          p.vx = 0;
          p.vy = 0;
        } else if (heroMorphActive) {
          const follow = 1 - Math.exp(-dt * (2.9 + morphSpringBeat.pull * 0.85));
          p.x += (targetX - p.x) * follow;
          p.y += (targetY - p.y) * follow;
          p.vx = 0;
          p.vy = 0;
        } else {
          const follow = 1 - Math.exp(-dt * (pull > 0.1 ? 4.2 : 3.4));
          p.x += (targetX - p.x) * follow;
          p.y += (targetY - p.y) * follow;
          p.vx *= 0.35;
          p.vy *= 0.35;
        }

        // Hard safety clamp — overshoot from the spring can never clip an edge.
        p.x = clamp(w * HARD_PAD_X, w * (1 - HARD_PAD_X), p.x);
        p.y = clamp(h * HARD_PAD_Y, h * (1 - HARD_PAD_Y), p.y);
      }

      // --- Cursor energy (eased) drives the vignette focus + node highlight ---
      const cursor = cursorRef.current;
      const energyTarget = cursor.inside ? 1 : 0;
      // Asymmetric in/out — fast highlight on enter, gentle release on leave.
      const energyRate = 1 - Math.exp(-dt * (cursor.inside ? 6.5 : 2.4));
      cursor.energy += (energyTarget - cursor.energy) * energyRate;
      const cursorPx = cursor.x * w;
      const cursorPy = cursor.y * h;
      const cursorReach = w * 0.26;

      // --- Constellation connective tissue (canvas) ---
      const canvas = linkCanvasRef.current;
      if (canvas) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const cw = Math.round(w * dpr);
        const ch = Math.round(h * dpr);
        if (canvas.width !== cw || canvas.height !== ch) {
          canvas.width = cw;
          canvas.height = ch;
        }
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, w, h);

          // Node glows only — constellation link strokes removed for a cleaner field.
          const statRevealAmt = Math.max(b0.statReveal, b1.statReveal);
          const ps = particlesRef.current;
          const orbitLabels = story.constellation > 0.2 && statRevealAmt < 0.1;

          // Glowing node "stars" anchored to every particle.
          const staggerBase = story.constellation;
          for (const p of ps) {
            const staggerIn = EASE_PREMIUM_OUT(
              clamp(
                0,
                1,
                (staggerBase - p.morphOrder * CONSTELLATION_STAGGER) / CONSTELLATION_ENTRANCE_WINDOW,
              ),
            );
            if (staggerIn < 0.02) continue;
            const cd = Math.hypot(p.x - cursorPx, p.y - cursorPy);
            const near = cursor.energy * Math.max(0, 1 - cd / cursorReach);
            const keeperBoost = p.keeper ? statFocusAmt * 0.3 : 0;
            // Slow breathe only — fast twinkle reads as flicker on canvas.
            // Per-node frequency (reuses the drift clock) so the field never
            // pulses in unison, plus a faint second wave for organic shimmer.
            const twinkle = 0.94 + 0.06 * Math.sin(t * (0.1 + p.freqX) + p.drift * 2);
            const base =
              (0.42 + p.depth * 0.45) * staggerIn * (1 - story.exit) * twinkle + keeperBoost;
            const nodeAlpha = clamp(0, 1, base + near * 0.5);
            if (nodeAlpha < 0.02) continue;
            const orbitDim = orbitLabels ? 0.32 : 1;
            const r = (1.8 + p.depth * 1.9) * (1 + near * 1.2) * (1 + keeperBoost);
            const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
            halo.addColorStop(0, `rgba(255, 255, 255, ${nodeAlpha * 0.34 * orbitDim})`);
            halo.addColorStop(0.45, `rgba(255, 255, 255, ${nodeAlpha * 0.1 * orbitDim})`);
            halo.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
            ctx.fill();
            if (!orbitLabels || near > 0.2) {
              ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha * orbitDim})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, r * 0.85, 0, Math.PI * 2);
              ctx.fill();
            }
          }
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
        const countT = EASE_PREMIUM_OUT(Math.max(0, (beat.heroReveal - 0.12) / 0.88));
        const value = Math.round(stat.countUp.to * countT);
        el.textContent = `${stat.countUp.prefix ?? ""}${value}${stat.countUp.suffix ?? ""}`;
      });

      for (const p of particlesRef.current) {
        const el = particleElMapRef.current.get(p.id);
        if (!el) continue;

        const staggerIn = EASE_PREMIUM_OUT(
          Math.max(
            0,
            Math.min(
              1,
              (story.constellation - p.morphOrder * CONSTELLATION_STAGGER) /
                CONSTELLATION_ENTRANCE_WINDOW,
            ),
          ),
        );
        const entranceLift = (1 - staggerIn) * 10;
        const depthScale = 0.82 + p.depth * 0.26;
        let scale = (0.96 + staggerIn * 0.04) * depthScale * p.size * (p.hero ? 1.12 : 1);
        let opacity = (0.68 + p.depth * 0.32) * staggerIn * (p.hero ? 1.08 : 1);
        if (staggerIn > 0.04) {
          opacity = Math.max(p.hero ? 0.58 : 0.5, opacity);
        }

        if (pull < -0.008) {
          scale *= 1 + Math.abs(pull) * 0.05;
        }

        const b0MorphActive =
          b0.pull > 0.02 && scroll >= BEATS.stat0.anticipate[0] && scroll < BEATS.stat0.dissolve[0];
        const b1MorphActive =
          b1.pull > 0.02 && scroll >= BEATS.stat1.anticipate[0] && scroll < BEATS.stat1.dissolve[0];
        if (b0MorphActive && !p.keeper) {
          scale *= heroMorphParticleScale(p, b0);
          opacity *= 1 - b0.heroReveal * 0.12;
          if (b0.dissolveT > 0.02) scale *= 1 + EASE_SOFT(b0.dissolveT) * 0.06;
        } else if (b1MorphActive && !p.keeper) {
          scale *= heroMorphParticleScale(p, b1);
          opacity *= 1 - b1.heroReveal * 0.12;
          if (b1.dissolveT > 0.02) scale *= 1 + EASE_SOFT(b1.dissolveT) * 0.06;
        } else if (p.keeper && (b0MorphActive || b1MorphActive)) {
          // Keepers stay legible on the opposite side instead of shrinking.
          scale *= 0.92;
        }
        opacity *= 1 - stagingDim * 0.04;
        opacity *= 1 - story.exit * 0.85;
        if (floatPhase > 0.45) {
          opacity = Math.max(
            opacity,
            (0.58 + p.depth * 0.4) * staggerIn * floatPhase * (p.hero ? 1.08 : 1),
          );
        }

        const morphActive = b0MorphActive || b1MorphActive;
        const statFocus = Math.max(b0.heroReveal, b1.heroReveal);
        let targetOpacity = Math.max(0, opacity * (0.55 + staggerIn * 0.45));
        if (morphActive && statFocus > 0.12 && !p.keeper) {
          targetOpacity = Math.max(0, opacity * Math.max(0.08, 1 - statFocus * 1.05));
        }

        const morphBlur =
          morphActive && !p.keeper && statFocus > 0.06
            ? clamp(0, 3.5, statFocus * 3.2 * (1 - Math.max(b0.dissolveT, b1.dissolveT)))
            : 0;

        const visState = particleVisualRef.current.get(p.id) ?? {
          opacity: targetOpacity,
          scale,
          blur: 0,
        };
        visState.opacity = smoothStep(visState.opacity, targetOpacity, dt, 5);
        visState.scale = smoothStep(visState.scale, scale, dt, 6.5);
        visState.blur = smoothStep(visState.blur, morphBlur, dt, 7.5);
        particleVisualRef.current.set(p.id, visState);

        const rx = snapPx(p.x);
        const ry = snapPx(p.y - entranceLift * (1 - pull * 0.85));
        el.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${visState.scale.toFixed(4)})`;
        el.style.opacity = visState.opacity.toFixed(4);
        el.style.filter = visState.blur > 0.12 ? `blur(${visState.blur.toFixed(2)}px)` : "none";
        let layerZ = 4 + Math.round(p.depth * 2);
        if (morphActive && statFocus > 0.12 && !p.keeper) {
          layerZ = 1;
        }
        el.style.zIndex = String(layerZ);
      }

      field.querySelectorAll<HTMLElement>(".rm-trust-ecosystem__fg-stat").forEach((slot, index) => {
        const beat = index === 1 ? b1 : b0;
        const vis = statVisibility(index, b0, b1);
        const clusterReady =
          index === 0
            ? EASE_PREMIUM_OUT(clamp(0, 1, (beat.morphT - 0.38) / 0.62))
            : EASE_PREMIUM_OUT(clamp(0, 1, (beat.morphT - 0.46) / 0.54));
        const emerge = EASE_PREMIUM_OUT(clamp(0, 1, (beat.heroReveal - 0.02) / 0.98));
        const hero = clusterReady * emerge * vis * (1 - story.exit * 0.9);
        const copy = EASE_PREMIUM_OUT(beat.copyReveal) * vis * (1 - story.exit);
        const exitLift = beat.dissolveT > 0 ? -14 * EASE_PREMIUM_OUT(beat.dissolveT) : 0;
        const emergeScale = EASE_PREMIUM_OUT(hero);
        const enterLift = (1 - emergeScale) * 18;
        const scale = 0.94 + emergeScale * 0.06;
        const bloom = hero * 0.38;
        const statBlur = hero > 0 && hero < 0.42 ? (1 - hero / 0.42) * 2.5 : 0;

        slot.style.opacity = String(hero);
        slot.style.transform = `translate(-50%, calc(-50% + ${enterLift + exitLift}px)) scale(${scale})`;
        slot.style.zIndex = hero > 0.05 ? String(10 + index) : "1";
        slot.style.filter = statBlur > 0.1 ? `blur(${statBlur.toFixed(2)}px)` : "none";
        slot.style.setProperty("--stat-bloom", String(bloom));

        const copyEl = slot.querySelector<HTMLElement>(".rm-trust-ecosystem__fg-stat-copy");
        if (copyEl) {
          const copyLift = (1 - copy) * 12;
          copyEl.style.opacity = String(copy);
          copyEl.style.transform = `translateY(${copyLift}px)`;
          copyEl.style.filter = "none";
        }
      });

      if (ambientRef.current) {
        const actGlow = Math.max(
          b0.heroReveal * (1 - b0.dissolveT),
          b1.heroReveal * (1 - b1.dissolveT),
        );
        const ambientIn = EASE_SOFT(story.constellation);
        ambientRef.current.style.transform = `translate(-50%, -50%) scale(${0.96 + ambientIn * 0.06 - stagingDim * 0.04})`;
        ambientRef.current.style.opacity = String(
          (0.08 + ambientIn * 0.16 + actGlow * 0.2 - stagingDim * 0.14) * (1 - story.exit * 0.7),
        );
      }

      if (ambientSecondaryRef.current) {
        const ambientIn = EASE_SOFT(clamp(0, 1, (story.constellation - 0.12) / 0.88));
        const driftX = Math.sin(t * 0.12) * 1.5;
        const driftY = Math.cos(t * 0.1) * 1.2;
        ambientSecondaryRef.current.style.transform = `translate(calc(-50% + ${driftX}%), calc(-50% + ${driftY}%)) scale(${0.9 + scroll * 0.06 + finaleExpand})`;
        ambientSecondaryRef.current.style.opacity = String(
          (0.06 + ambientIn * 0.14 + floatPhase * 0.12 - stagingDim * 0.1) * (1 - story.exit * 0.6),
        );
      }

      if (scrollCueRef.current) {
        const cue = clamp(0, 1, 1 - scroll * 2.6) * (1 - story.exit);
        scrollCueRef.current.style.opacity = String(cue * 0.55);
        scrollCueRef.current.style.transform = `translate(-50%, ${cue * 10}px)`;
      }

      if (vignetteRef.current) {
        // Compositor-only: shift the (oversized, static-gradient) vignette via
        // transform and breathe its darkness via opacity — never repaint bg.
        const focusBiasX = (cursor.x - 0.5) * cursor.energy * 0.35;
        const focusBiasY = (focusAnchor.y - 0.5) * pull * 0.25 + (cursor.y - 0.5) * cursor.energy * 0.3;
        const orbitLift = story.constellation * (1 - pull * 0.55);
        const edge = 0.62 + story.enter * 0.08 + stagingDim * 0.2 - orbitLift * 0.16;
        vignetteRef.current.style.transform = `translate3d(${(focusBiasX * 7).toFixed(2)}%, ${(focusBiasY * 6).toFixed(2)}%, 0)`;
        vignetteRef.current.style.opacity = clamp(0, 1, edge).toFixed(3);
      }

      if (curtainTopRef.current) {
        const curtainFade = 1 - EASE_PREMIUM_OUT(story.enter);
        curtainTopRef.current.style.transform = "none";
        curtainTopRef.current.style.opacity = String(curtainFade);
      }

      if (curtainBottomRef.current) {
        const exitT = EASE_PREMIUM_OUT(story.exit);
        curtainBottomRef.current.style.opacity = String(exitT * 0.95);
        curtainBottomRef.current.style.transform = `translateY(${(1 - exitT) * 24}%)`;
      }

      if (fieldShellRef.current) {
        const exitT = EASE_PREMIUM_OUT(story.exit);
        fieldShellRef.current.style.opacity = String(1 - exitT * 0.92);
        fieldShellRef.current.style.transform = `scale(${1 - exitT * 0.028})`;
      }

      if (chapterActRef.current) {
        const targetAct = resolveSceneAct(scroll, b0, b1, story, pull);

        if (
          actPhaseRef.current === "idle" &&
          (targetAct.label !== displayedActRef.current.label ||
            targetAct.sub !== displayedActRef.current.sub)
        ) {
          actPhaseRef.current = "out";
        }

        if (actPhaseRef.current === "out") {
          actEnterRef.current = Math.max(0, actEnterRef.current - dt * 3.4);
          if (actEnterRef.current <= 0.001) {
            displayedActRef.current = {
              label: targetAct.label,
              sub: targetAct.sub,
            };
            actPhaseRef.current = "in";
          }
        } else if (actPhaseRef.current === "in") {
          actEnterRef.current = Math.min(1, actEnterRef.current + dt * 1.25);
          if (actEnterRef.current >= 0.999) {
            actPhaseRef.current = "idle";
            actEnterRef.current = 1;
          }
        }

        const actReveal =
          actPhaseRef.current === "out"
            ? actEnterRef.current
            : EASE_PREMIUM_OUT(actEnterRef.current);
        const actLift = (1 - actReveal) * 10;
        const actBlur = actPhaseRef.current === "out" ? (1 - actEnterRef.current) * 2.5 : 0;

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
          labelEl.style.opacity = String(0.5 + actReveal * 0.5);
          labelEl.style.transform = `translateY(${actLift}px)`;
          labelEl.style.filter = actBlur > 0.1 ? `blur(${actBlur.toFixed(2)}px)` : "none";
        }
        if (subEl) {
          subEl.textContent = displayedActRef.current.sub;
          subEl.style.opacity = String(actReveal);
          subEl.style.transform = `translateY(${actLift * 0.6}px)`;
          subEl.style.filter = actBlur > 0.1 ? `blur(${(actBlur * 0.85).toFixed(2)}px)` : "none";
        }
      }

      const chapter = chapterRef?.current ?? sceneRef.current?.closest("#studio");
      if (chapter instanceof HTMLElement) {
        const actGlow = Math.max(
          b0.heroReveal * (1 - b0.dissolveT),
          b1.heroReveal * (1 - b1.dissolveT),
        );
        chapter.style.setProperty("--trust-scroll", String(scroll));
        chapter.style.setProperty("--trust-enter", String(story.enter));
        chapter.style.setProperty("--trust-exit", String(story.exit));
        chapter.style.setProperty("--trust-act-glow", String(actGlow));
        chapter.style.setProperty("--trust-act-x", "50%");
      }

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
            <div key={index} className="rm-trust-stats__stat flex flex-col items-center gap-3 text-center">
              <p className="rm-trust-stats__stat-value">{statDisplayValue(stat)}</p>
              <p className="rm-trust-ecosystem__stat-copy">{stat.copy}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        <canvas ref={linkCanvasRef} className="rm-trust-ecosystem__links" aria-hidden="true" />
        <div ref={vignetteRef} className="rm-trust-ecosystem__vignette" aria-hidden="true" />
        <div className="rm-trust-ecosystem__grain" aria-hidden="true" />

        <div ref={chapterActRef} className="rm-trust-ecosystem__chapter" aria-hidden="true">
          <p className="rm-trust-ecosystem__chapter-label">01 — Orbit</p>
          <p className="rm-trust-ecosystem__chapter-sub">Trusted by teams who ship</p>
        </div>

        <div ref={scrollCueRef} className="rm-trust-ecosystem__scroll-cue" aria-hidden="true">
          <span>Scroll the story</span>
        </div>

        <div className="rm-trust-ecosystem__fg-stats">
          {stats.map((stat, index) => (
            <div key={index} className="rm-trust-ecosystem__stat-anchor">
              <div
                className="rm-trust-ecosystem__fg-stat rm-trust-ecosystem__fg-stat--center"
                style={{ left: "50%", top: "50%" }}
              >
                  <p className="rm-trust-ecosystem__fg-stat-value" data-count-stat={index}>
                    {stat.countUp
                      ? `${stat.countUp.prefix ?? ""}0${stat.countUp.suffix ?? ""}`
                      : stat.value}
                  </p>
                  <p className="rm-trust-ecosystem__fg-stat-copy">{stat.copy}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="rm-trust-ecosystem__particles">
          {TRUST_BRANDS.map((brand) => (
            <span
              key={brand}
              data-particle-id={brand}
              className={
                HERO_BRANDS.has(brand)
                  ? "rm-trust-ecosystem__particle rm-trust-ecosystem__particle--hero"
                  : "rm-trust-ecosystem__particle"
              }
              style={{
                opacity: 0,
                transform: "translate3d(0, 0, 0) translate(-50%, -50%) scale(0.96)",
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={curtainBottomRef}
        className="rm-trust-ecosystem__curtain-bottom"
        aria-hidden="true"
      />

      <p className="sr-only" aria-live="polite">
        Scroll through a story of client trust and studio impact
      </p>
    </div>
  );
}
