import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Core tracks the pointer closely; ring keeps a subtle editorial trail. */
const CORE_LERP = 0.72;
const RING_LERP = 0.28;
const WOBBLE_AMP = 3.2;
const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='hover']";

export function PremiumCursor() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = rootRef.current;
    const core = coreRef.current;
    const ring = ringRef.current;
    if (!root || !core || !ring) return;

    root.dataset.visible = "false";
    root.dataset.hover = "false";

    const state = {
      tx: 0,
      ty: 0,
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
      hover: 0,
      press: 0,
      ready: false,
    };
    let hoverTarget = 0;
    let pressTarget = 0;
    let raf = 0;
    let idleFrames = 0;

    const enableCustomCursor = () => {
      if (state.ready) return;
      state.ready = true;
      document.documentElement.classList.add("rm-premium-cursor");
      root.dataset.visible = "true";
    };

    const onMove = (event: PointerEvent) => {
      state.tx = event.clientX;
      state.ty = event.clientY;
      idleFrames = 0;

      if (!state.ready) {
        state.cx = event.clientX;
        state.cy = event.clientY;
        state.rx = event.clientX;
        state.ry = event.clientY;
        enableCustomCursor();
      }

      const target = event.target;
      const overInteractive = target instanceof Element && !!target.closest(HOVER_SELECTOR);
      hoverTarget = overInteractive ? 1 : 0;
      root.dataset.hover = overInteractive ? "true" : "false";
    };

    const onLeave = () => {
      root.dataset.visible = "false";
      document.documentElement.classList.remove("rm-premium-cursor");
      state.ready = false;
    };

    const onDown = () => {
      pressTarget = 1;
    };

    const onUp = () => {
      pressTarget = 0;
    };

    const loop = () => {
      const moved =
        Math.abs(state.tx - state.cx) > 0.4 ||
        Math.abs(state.ty - state.cy) > 0.4 ||
        Math.abs(hoverTarget - state.hover) > 0.02 ||
        pressTarget > 0;

      if (!moved) {
        idleFrames += 1;
        if (idleFrames > 8) {
          raf = requestAnimationFrame(loop);
          return;
        }
      } else {
        idleFrames = 0;
      }

      state.cx += (state.tx - state.cx) * CORE_LERP;
      state.cy += (state.ty - state.cy) * CORE_LERP;
      state.rx += (state.tx - state.rx) * RING_LERP;
      state.ry += (state.ty - state.ry) * RING_LERP;
      state.hover += (hoverTarget - state.hover) * 0.22;
      state.press += (pressTarget - state.press) * 0.35;

      const t = performance.now() * 0.001;
      const wobbleX = Math.sin(t * 2.1) * WOBBLE_AMP;
      const wobbleY = Math.cos(t * 1.6) * WOBBLE_AMP;
      const ringScale = (1 + state.hover * 0.75) * (1 - state.press * 0.18);
      const coreScale = 1 - state.press * 0.2;
      const ringRotate = Math.sin(t * 1.3) * 4;

      core.style.transform = `translate3d(${state.cx.toFixed(2)}px, ${state.cy.toFixed(2)}px, 0) translate(-50%, -50%) scale(${coreScale.toFixed(3)})`;
      ring.style.transform = `translate3d(${(state.rx + wobbleX).toFixed(2)}px, ${(state.ry + wobbleY).toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)}) rotate(${ringRotate.toFixed(2)}deg)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("rm-premium-cursor");
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={rootRef} className="rm-premium-cursor" aria-hidden="true">
      <div ref={ringRef} className="rm-premium-cursor__ring" />
      <div ref={coreRef} className="rm-premium-cursor__core">
        <span className="rm-premium-cursor__cross" />
      </div>
    </div>
  );
}
