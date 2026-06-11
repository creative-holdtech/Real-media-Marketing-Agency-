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

/** Premium signature — MD3 standard decelerate + smoothstep for on-screen */
const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);
const EASE_IN = (t: number) => t * t * t;
const EASE_SOFT = (t: number) => t * t * (3 - 2 * t);

/** Frame-rate independent exponential smoothing (Premium — no spring overshoot). */
function smoothStep(current: number, target: number, dt: number, rate: number) {
  const blend = 1 - Math.exp(-dt * rate);
  return current + (target - current) * blend;
}

function snapPx(value: number) {
  return Math.round(value * 100) / 100;
}

const ANCHOR_Y = 0.5;
const ANCHOR_LEFT_X = 0.26;
const ANCHOR_RIGHT_X = 0.74;
const MOBILE_BREAKPOINT = 768;
const TOTAL_PARTICLES = TRUST_BRANDS.length;

/** Story acts on scroll timeline (0–1) */
const STORY = {
  enter: [0, 0.05],
  constellation: [0, 0.1],
  interlude: [0.48, 0.54],
  finale: [0.84, 0.9],
  exit: [0.9, 1],
} as const;

/** Stagger spread for constellation entrance (lower = faster wave). */
const CONSTELLATION_STAGGER = 0.28;

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
/** Distance (fraction of field width) under which two nodes draw a link. */
const LINK_DIST = 0.34;

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

type LinkExclusionZone = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

function buildStatLinkZones(
  b0: BeatState,
  b1: BeatState,
  leftX: number,
  leftY: number,
  rightX: number,
  rightY: number,
  w: number,
  h: number,
): LinkExclusionZone[] {
  const zones: LinkExclusionZone[] = [];
  if (b0.statReveal > 0.05) {
    zones.push({
      cx: leftX,
      cy: leftY,
      rx: w * (0.2 + b0.statReveal * 0.14),
      ry: h * (0.22 + b0.statReveal * 0.12),
    });
  }
  if (b1.statReveal > 0.05) {
    zones.push({
      cx: rightX,
      cy: rightY,
      rx: w * (0.2 + b1.statReveal * 0.14),
      ry: h * (0.22 + b1.statReveal * 0.12),
    });
  }
  return zones;
}

/** Orbit act — keep canvas links off brand wordmarks. */
function buildLabelLinkZones(particles: Particle[], w: number, h: number): LinkExclusionZone[] {
  return particles.map((p) => {
    const charW = p.hero ? 7.2 : 6.4;
    const rx = clamp(w * 0.06, 52, p.label.length * charW + 18) * (p.hero ? 1.06 : 1);
    const ry = clamp(h * 0.028, 14, h * 0.036) * (p.hero ? 1.12 : 1);
    return { cx: p.x, cy: p.y, rx, ry };
  });
}

function pointInLinkExclusionZone(px: number, py: number, zones: LinkExclusionZone[]): boolean {
  for (const z of zones) {
    const nx = (px - z.cx) / z.rx;
    const ny = (py - z.cy) / z.ry;
    if (nx * nx + ny * ny < 1) return true;
  }
  return false;
}

function segmentCrossesLinkExclusion(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  zones: LinkExclusionZone[],
): boolean {
  if (zones.length === 0) return false;
  const steps = 8;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    if (pointInLinkExclusionZone(ax + (bx - ax) * t, ay + (by - ay) * t, zones)) return true;
  }
  return false;
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
  let actOpacity = Math.max(0.48, story.constellation * (1 - pull * 0.8));

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

  const targetX =
    (1 - travel) * (1 - travel) * x + 2 * (1 - travel) * travel * ctrlX + travel * travel * endX;
  const targetY =
    (1 - travel) * (1 - travel) * y + 2 * (1 - travel) * travel * ctrlY + travel * travel * endY;

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
  const linkCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: 0.5, y: 0.5, inside: false, energy: 0 });
  const particlesRef = useRef<Particle[]>(buildParticles(960, 720));
  const ambientRef = useRef<HTMLDivElement>(null);
  const ambientSecondaryRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const chapterActRef = useRef<HTMLDivElement>(null);
  const interludeRef = useRef<HTMLDivElement>(null);
  const fieldShellRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<Particle[]>(() => buildParticles(960, 720));
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const displayedActRef = useRef({ label: "01 — Orbit", sub: "Trusted by teams who ship" });
  const actPhaseRef = useRef<"idle" | "out" | "in">("idle");
  const actEnterRef = useRef(1);
  const pendingActRef = useRef<SceneAct | null>(null);
  const particleElMapRef = useRef<Map<string, HTMLElement>>(new Map());
  const particleVisualRef = useRef<Map<string, { opacity: number; scale: number }>>(new Map());
  const smoothScrollRef = useRef(0);

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
    setParticles(particlesRef.current);
    setIsMobile(mobile);
  }, []);

  useLayoutEffect(() => {
    if (reduce) return;
    const field = fieldRef.current;
    if (!field) return;
    const { width, height } = field.getBoundingClientRect();
    syncParticles(width || 960, height || 720);
  }, [reduce, syncParticles]);

  useLayoutEffect(() => {
    if (reduce) return;
    syncParticleElements();
  }, [reduce, particles, syncParticleElements]);

  const shouldAnimate = !reduce && active && sceneVisible;

  useEffect(() => {
    if (reduce) return;
    const field = fieldRef.current;
    if (!field) return;
    const onMove = (e: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      cursorRef.current.x = (e.clientX - rect.left) / rect.width;
      cursorRef.current.y = (e.clientY - rect.top) / rect.height;
      cursorRef.current.inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };
    const onLeave = () => {
      cursorRef.current.inside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
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
        dt > 0.12 ? scrollRaw : smoothStep(smoothScrollRef.current, scrollRaw, dt, 7.5);
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
      for (const p of particlesRef.current) {
        const depthFloat = 0.5 + p.depth * 0.5;
        // Compound wander: a slow primary sine plus a faster, non-integer-ratio
        // secondary one — per node these never realign, so the path traces a
        // drifting arc that doesn't repeat tightly instead of a synced ellipse.
        // Mobile keeps the lift small so the wide wordmarks never swing into the
        // narrow viewport's edges; the desktop field has room to breathe more.
        const driftAmp = isMobileRef.current ? 0.5 : 1;
        const ampX = (9 + finaleExpand * 16) * depthFloat * floatCalm * driftAmp;
        const ampY = (7.5 + finaleExpand * 12) * depthFloat * floatCalm * driftAmp;
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

        if (p.keeper && statFocusAmt > 0.02 && w >= MOBILE_BREAKPOINT) {
          // Keepers drift to the opposite side of the active stat so the frame
          // stays balanced instead of leaving two-thirds of it black.
          const focusLeft = focusAnchor.x < 0.5;
          const oppX = w * (focusLeft ? 0.74 : 0.26);
          const blend = EASE_SOFT(statFocusAmt) * 0.82;
          const keepX = oppX + (p.homeY - 0.5) * w * 0.06;
          const keepY = h * (0.26 + p.morphOrder * 0.5);
          targetX = targetX * (1 - blend) + keepX * blend;
          targetY = targetY * (1 - blend) + keepY * blend;
        } else if (b0.pull > 0.01 && b0.dissolveT < 0.02) {
          [targetX, targetY] = applyHeroMorphPull(
            p,
            targetX,
            targetY,
            b0.pull,
            b0.morphT,
            leftX,
            leftY,
            w,
          );
        } else if (b1.pull > 0.01 && b1.dissolveT < 0.02) {
          [targetX, targetY] = applyHeroMorphPull(
            p,
            targetX,
            targetY,
            b1.pull,
            b1.morphT,
            rightX,
            rightY,
            w,
          );
        }

        if (!p.keeper && b0.dissolveT > 0.02) {
          const scatter = EASE_SOFT(b0.dissolveT);
          targetX += (p.homeX - leftAnchor.x) * w * scatter * 0.32;
          targetY += (p.homeY - leftAnchor.y) * h * scatter * 0.2;
        }
        if (!p.keeper && b1.dissolveT > 0.02) {
          const scatter = EASE_SOFT(b1.dissolveT);
          targetX += (p.homeX - rightAnchor.x) * w * scatter * 0.32;
          targetY += (p.homeY - rightAnchor.y) * h * scatter * 0.2;
        }

        const heroMorphActive =
          !p.keeper &&
          ((b0.pull > 0.04 && b0.dissolveT < 0.04) || (b1.pull > 0.04 && b1.dissolveT < 0.04));
        const morphSpringBeat = b1.pull > b0.pull + 0.02 ? b1 : b0;
        const orbitDrift = !heroMorphActive && pull < 0.08;
        if (orbitDrift) {
          // Orbit: exponential follow tracks the sine drift without spring lag or micro-bounce.
          const follow = 1 - Math.exp(-dt * 5.4);
          p.x += (targetX - p.x) * follow;
          p.y += (targetY - p.y) * follow;
          p.vx *= 0.42;
          p.vy *= 0.42;
        } else if (heroMorphActive) {
          const spring = 2.1 + morphSpringBeat.pull * 1.1;
          const damping = 0.84;
          p.vx += (targetX - p.x) * spring * dt;
          p.vy += (targetY - p.y) * spring * dt;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        } else {
          const spring = pull > 0.1 ? 4.4 : 3.1;
          const damping = pull > 0.1 ? 0.85 : 0.89;
          p.vx += (targetX - p.x) * spring * dt;
          p.vy += (targetY - p.y) * spring * dt;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }

        // Hard safety clamp — overshoot from the spring can never clip an edge.
        p.x = clamp(w * HARD_PAD_X, w * (1 - HARD_PAD_X), p.x);
        p.y = clamp(h * HARD_PAD_Y, h * (1 - HARD_PAD_Y), p.y);
      }

      // --- Cursor energy (eased) drives the vignette focus + node highlight ---
      const cursor = cursorRef.current;
      const energyTarget = cursor.inside ? 1 : 0;
      // Asymmetric in/out — fast highlight on enter, gentle release on leave.
      const energyRate = 1 - Math.exp(-dt * (cursor.inside ? 9 : 3.2));
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

          // Links recede when a hero stat owns the frame; never draw through stat zones.
          const linkPresence = clamp(0, 1, story.constellation - story.exit);
          const statRevealAmt = Math.max(b0.statReveal, b1.statReveal);
          const constellationAlpha =
            linkPresence * (1 - Math.max(statFocusAmt * 0.92, statRevealAmt * 0.88, pull * 0.75));
          const statLinkZones = buildStatLinkZones(b0, b1, leftX, leftY, rightX, rightY, w, h);
          const labelLinkZones =
            statRevealAmt < 0.12 ? buildLabelLinkZones(particlesRef.current, w, h) : [];
          const linkExclusionZones = [...labelLinkZones, ...statLinkZones];
          const linkMax = LINK_DIST * w * (isMobileRef.current ? 0.82 : 1);
          const ps = particlesRef.current;
          const orbitLabels = story.constellation > 0.2 && statRevealAmt < 0.1;

          if (constellationAlpha > 0.01) {
            ctx.lineCap = "round";
            for (let i = 0; i < ps.length; i += 1) {
              for (let j = i + 1; j < ps.length; j += 1) {
                const a = ps[i];
                const b = ps[j];
                if (segmentCrossesLinkExclusion(a.x, a.y, b.x, b.y, linkExclusionZones)) continue;
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist > linkMax) continue;
                const prox = 1 - dist / linkMax;
                // Brighten links whose midpoint sits near the cursor.
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const cd = Math.hypot(mx - cursorPx, my - cursorPy);
                const cursorBoost = cursor.energy * Math.max(0, 1 - cd / cursorReach) * 0.85;
                const alpha = (Math.pow(prox, 1.4) * 0.68 + cursorBoost) * constellationAlpha;
                if (alpha < 0.012) continue;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 0.65 + prox * 0.95 + cursorBoost * 1.4;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }

          // Glowing node "stars" anchored to every particle.
          const staggerBase = story.constellation;
          for (const p of ps) {
            const staggerIn = EASE_SOFT(
              clamp(0, 1, (staggerBase - p.morphOrder * CONSTELLATION_STAGGER) / 0.45),
            );
            if (staggerIn < 0.02) continue;
            const cd = Math.hypot(p.x - cursorPx, p.y - cursorPy);
            const near = cursor.energy * Math.max(0, 1 - cd / cursorReach);
            const keeperBoost = p.keeper ? statFocusAmt * 0.3 : 0;
            // Slow breathe only — fast twinkle reads as flicker on canvas.
            // Per-node frequency (reuses the drift clock) so the field never
            // pulses in unison, plus a faint second wave for organic shimmer.
            const twinkle =
              0.9 +
              0.07 * Math.sin(t * (0.12 + p.freqX) + p.drift * 2) +
              0.035 * Math.sin(t * (0.31 + p.freqY) + p.drift * 5);
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
        const countT = EASE_SOFT(Math.max(0, (beat.heroReveal - 0.15) / 0.85));
        const value = Math.round(stat.countUp.to * countT);
        el.textContent = `${stat.countUp.prefix ?? ""}${value}${stat.countUp.suffix ?? ""}`;
      });

      for (const p of particlesRef.current) {
        const el = particleElMapRef.current.get(p.id);
        if (!el) continue;

        const staggerIn = EASE_SOFT(
          Math.max(
            0,
            Math.min(1, (story.constellation - p.morphOrder * CONSTELLATION_STAGGER) / 0.45),
          ),
        );
        const depthScale = 0.82 + p.depth * 0.26;
        let scale = depthScale * p.size * (p.hero ? 1.12 : 1);
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

        const enterBlur =
          b0MorphActive || b1MorphActive || staggerIn > 0.92 ? 0 : (1 - staggerIn) * 0.8;

        const morphActive = b0MorphActive || b1MorphActive;
        const statFocus = Math.max(b0.heroReveal, b1.heroReveal);
        let targetOpacity = Math.max(0, opacity);
        if (morphActive && statFocus > 0.12 && !p.keeper) {
          targetOpacity = Math.max(0, opacity * Math.max(0.05, 1 - statFocus * 1.15));
        }

        const visState = particleVisualRef.current.get(p.id) ?? { opacity: targetOpacity, scale };
        const particleOrbitDrift =
          !p.keeper &&
          pull < 0.08 &&
          !morphActive &&
          (b0.pull <= 0.04 || b0.dissolveT >= 0.04) &&
          (b1.pull <= 0.04 || b1.dissolveT >= 0.04);
        const visRate = particleOrbitDrift ? 9.5 : morphActive ? 11 : 8;
        visState.opacity = smoothStep(visState.opacity, targetOpacity, dt, visRate);
        visState.scale = smoothStep(visState.scale, scale, dt, visRate);
        particleVisualRef.current.set(p.id, visState);

        const rx = snapPx(p.x);
        const ry = snapPx(p.y);
        el.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${visState.scale.toFixed(4)})`;
        el.style.opacity = visState.opacity.toFixed(4);
        el.style.filter = enterBlur > 0.35 ? `blur(${enterBlur.toFixed(2)}px)` : "none";
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
            ? EASE_SOFT(clamp(0, 1, (beat.morphT - 0.42) / 0.58))
            : EASE_SOFT(clamp(0, 1, (beat.morphT - 0.5) / 0.5));
        const emerge = EASE_SOFT(clamp(0, 1, (beat.heroReveal - 0.04) / 0.96));
        const hero = clusterReady * emerge * vis * (1 - story.exit * 0.9);
        const copy = beat.copyReveal * vis * (1 - story.exit);
        const holdBreathe = beat.inHold && hero > 0.88 ? 1 + Math.sin(t * 1.2) * 0.005 : 1;
        const exitLift = beat.dissolveT > 0 ? -16 * EASE_IN(beat.dissolveT) : 0;
        const emergeScale = EASE_SOFT(hero);
        const enterLift = (1 - emergeScale) * 6;
        const scale = (0.92 + emergeScale * 0.08) * holdBreathe;
        const bloom = beat.inHold && hero > 0.9 ? 0.55 + Math.sin(t * 1.35) * 0.1 : hero * 0.28;

        slot.style.opacity = String(hero);
        slot.style.transform = `translate(-50%, calc(-50% + ${enterLift + exitLift}px)) scale(${scale})`;
        slot.style.filter = "none";
        slot.style.setProperty("--stat-bloom", String(bloom));

        const copyEl = slot.querySelector<HTMLElement>(".rm-trust-ecosystem__fg-stat-copy");
        if (copyEl) {
          copyEl.style.opacity = String(copy);
          copyEl.style.transform = `translateY(${(1 - copy) * 8}px)`;
          copyEl.style.filter = "none";
        }
      });

      field
        .querySelectorAll<HTMLElement>(".rm-trust-ecosystem__stat-signal")
        .forEach((signal, index) => {
          const beat = index === 1 ? b1 : b0;
          const vis = statVisibility(index, b0, b1);
          const reveal = EASE_SOFT(Math.max(0, (beat.heroReveal - 0.06) / 0.94));
          const height = 18 + reveal * 52;
          signal.style.opacity = String(reveal * vis * 0.75 * (1 - story.exit));
          signal.style.height = `${height}px`;
          signal.style.transform = `translate(-50%, calc(-100% - ${10 + reveal * 6}px))`;
        });

      if (ambientRef.current) {
        const actGlow = Math.max(
          b0.heroReveal * (1 - b0.dissolveT),
          b1.heroReveal * (1 - b1.dissolveT),
        );
        const counterShift = (focusAnchor.x - 0.5) * pull * -20;
        ambientRef.current.style.transform = `translateX(${counterShift}%) scale(${1 - stagingDim * 0.05})`;
        ambientRef.current.style.opacity = String(
          (0.26 + scroll * 0.1 + actGlow * 0.24 - stagingDim * 0.18) * (1 - story.exit * 0.7),
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
        // Compositor-only: shift the (oversized, static-gradient) vignette via
        // transform and breathe its darkness via opacity — never repaint bg.
        const focusBiasX = (focusAnchor.x - 0.5) * pull + (cursor.x - 0.5) * cursor.energy * 0.5;
        const focusBiasY = (focusAnchor.y - 0.5) * pull + (cursor.y - 0.5) * cursor.energy * 0.4;
        const orbitLift = story.constellation * (1 - pull * 0.55);
        const edge = 0.62 + story.enter * 0.08 + stagingDim * 0.2 - orbitLift * 0.16;
        vignetteRef.current.style.transform = `translate3d(${(focusBiasX * 7).toFixed(2)}%, ${(focusBiasY * 6).toFixed(2)}%, 0)`;
        vignetteRef.current.style.opacity = clamp(0, 1, edge).toFixed(3);
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
          actPhaseRef.current === "out" ? actEnterRef.current : EASE_OUT(actEnterRef.current);
        const actLift = (1 - actReveal) * 8;

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
          labelEl.style.filter = "none";
        }
        if (subEl) {
          subEl.textContent = displayedActRef.current.sub;
          subEl.style.opacity = String(actReveal);
          subEl.style.transform = `translateY(${actLift * 0.65}px)`;
          subEl.style.filter = "none";
        }
      }

      if (interludeRef.current) {
        const interludeSpan = interludeRef.current.querySelector<HTMLElement>("span");
        interludeRef.current.style.opacity = String(story.interludePeak * 0.85 * (1 - story.exit));
        interludeRef.current.style.transform = `translate(-50%, calc(-50% + ${(1 - story.interludePeak) * 18}px)) scale(${0.96 + story.interludePeak * 0.04})`;
        if (interludeSpan) {
          interludeSpan.style.letterSpacing = `${-0.03 + story.interludePeak * 0.05}em`;
          interludeSpan.style.filter = "none";
        }
      }

      const chapter = chapterRef?.current ?? sceneRef.current?.closest("#studio");
      if (chapter instanceof HTMLElement) {
        const actGlow = Math.max(
          b0.heroReveal * (1 - b0.dissolveT),
          b1.heroReveal * (1 - b1.dissolveT),
        );
        const actFocusX =
          b1.heroReveal > b0.heroReveal + 0.06 ? 78 : b0.heroReveal > 0.04 ? 22 : 50;
        chapter.style.setProperty("--trust-scroll", String(scroll));
        chapter.style.setProperty("--trust-enter", String(story.enter));
        chapter.style.setProperty("--trust-exit", String(story.exit));
        chapter.style.setProperty("--trust-act-glow", String(actGlow));
        chapter.style.setProperty("--trust-act-x", `${actFocusX}%`);
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
          { left: "26%", top: "50%" },
          { left: "74%", top: "50%" },
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
        <canvas ref={linkCanvasRef} className="rm-trust-ecosystem__links" aria-hidden="true" />
        <div ref={vignetteRef} className="rm-trust-ecosystem__vignette" aria-hidden="true" />
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
                  className="rm-trust-ecosystem__stat-signal"
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
              className={
                p.hero
                  ? "rm-trust-ecosystem__particle rm-trust-ecosystem__particle--hero"
                  : "rm-trust-ecosystem__particle"
              }
              style={{
                opacity: 0,
                transform: `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`,
              }}
            >
              {p.label}
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
