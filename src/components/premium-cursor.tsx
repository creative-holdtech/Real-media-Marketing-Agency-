import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const LERP = 0.2;

export function PremiumCursor() {
  const reduce = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("rm-premium-cursor");

    const state = { tx: 0, ty: 0, x: 0, y: 0, visible: false };
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      state.tx = event.clientX;
      state.ty = event.clientY;
      state.visible = true;
    };
    const onLeave = () => {
      state.visible = false;
    };

    const loop = () => {
      state.x += (state.tx - state.x) * LERP;
      state.y += (state.ty - state.y) * LERP;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
        cursorRef.current.style.opacity = state.visible ? "1" : "0";
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
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={cursorRef} className="rm-premium-cursor-root" aria-hidden="true">
      <span className="rm-premium-cursor__cross" />
    </div>
  );
}
