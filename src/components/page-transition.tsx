import { useEffect, useRef, useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

type Phase = "idle" | "covering" | "covered" | "revealing";

let _triggerFn: ((to: string) => void) | null = null;

export function triggerPageTransition(to: string) {
  _triggerFn?.(to);
}

function animateClipPath(
  el: HTMLElement,
  from: string,
  to: string,
  duration: number,
): Promise<void> {
  return new Promise((resolve) => {
    el.style.clipPath = from;
    const start = performance.now();
    // cubic-bezier(0.76, 0, 0.24, 1) — strong ease-in-out
    function ease(t: number) {
      // approximation via simple smoothstep for the cubic
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function tick(now: number) {
      const raw = Math.min((now - start) / (duration * 1000), 1);
      const t = ease(raw);

      // Parse inset percentages from "inset(A% 0% B% 0%)" => interpolate A,B
      const fromMatch = from.match(/inset\((\d+)%[^,)]+(\d+)%/);
      const toMatch = to.match(/inset\((\d+)%[^,)]+(\d+)%/);
      if (!fromMatch || !toMatch) {
        el.style.clipPath = to;
        resolve();
        return;
      }

      const a = Number(fromMatch[1]) + (Number(toMatch[1]) - Number(fromMatch[1])) * t;
      const b = Number(fromMatch[2]) + (Number(toMatch[2]) - Number(fromMatch[2])) * t;
      el.style.clipPath = `inset(${a}% 0% ${b}% 0%)`;

      if (raw < 1) requestAnimationFrame(tick);
      else {
        el.style.clipPath = to;
        resolve();
      }
    }
    requestAnimationFrame(tick);
  });
}

export function PageTransitionCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const routerStatus = useRouterState({ select: (s) => s.status });
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    _triggerFn = async (to: string) => {
      if (phaseRef.current !== "idle") return;
      const el = curtainRef.current;
      if (!el) return;

      phaseRef.current = "covering";
      setPhase("covering");
      el.style.display = "block";

      await animateClipPath(el, "inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", 0.5);

      phaseRef.current = "covered";
      setPhase("covered");
      router.navigate({ to: to as never });
    };

    return () => {
      _triggerFn = null;
    };
  }, [router]);

  useEffect(() => {
    if (routerStatus !== "idle" || phaseRef.current !== "covered") return;
    const el = curtainRef.current;
    if (!el) return;

    phaseRef.current = "revealing";
    setPhase("revealing");

    animateClipPath(el, "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)", 0.6).then(() => {
      el.style.display = "none";
      phaseRef.current = "idle";
      setPhase("idle");
    });
  }, [routerStatus]);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        clipPath: "inset(100% 0% 0% 0%)",
        pointerEvents: "none",
      }}
    />
  );
}
