import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenis } from "lenis/react";

import logoUrl from "@/assets/logo.svg";

const STORAGE_KEY = "rm-preloader-seen";
/** Progress bar fills over this window (logo settle is scoped to fit inside it), then a curtain exit */
const SHOW_MS = 3400;
const SHOW_MS_MOBILE = 3400;
/** Matches the clip-path curtain wipe in page-transition.tsx — same visual grammar, not a fade */
const EXIT_MS = 820;

const TAGLINE = "Loading experience";

/** Segments the 0→1 progress fill into randomized stall-and-surge chunks —
 * some run long and barely move the number, others burn through a chunk fast
 * — instead of one smooth, obviously-fake ease. Always lands on exactly
 * (0,0) and (1,1) regardless of the random weights. */
const PROGRESS_SEGMENTS = 7;

function buildProgressCurve() {
  const timeWeights = Array.from({ length: PROGRESS_SEGMENTS }, () => 0.4 + Math.random() * 1.3);
  // The opening beat is a deliberate hold near 0% — left fully randomized,
  // the mix could hand segment 0 a short time-slice + a big progress-slice,
  // so the counter visibly skips past 0-5% in a couple of frames. That reads
  // as the counter starting broken, not as "loading has begun".
  timeWeights[0] = 1.6 + Math.random() * 0.6;
  const timeTotal = timeWeights.reduce((sum, w) => sum + w, 0);
  const timeStops = [0];
  let acc = 0;
  for (const w of timeWeights) {
    acc += w / timeTotal;
    timeStops.push(acc);
  }

  const progressWeights = Array.from({ length: PROGRESS_SEGMENTS }, () => 0.3 + Math.random() * 1.5);
  progressWeights[0] = 0.15 + Math.random() * 0.15;
  const progressTotal = progressWeights.reduce((sum, w) => sum + w, 0);
  const progressStops = [0];
  acc = 0;
  for (const w of progressWeights) {
    acc += w / progressTotal;
    progressStops.push(acc);
  }

  return (t: number) => {
    let i = 0;
    while (i < PROGRESS_SEGMENTS - 1 && t > timeStops[i + 1]) i++;
    const segStart = timeStops[i];
    const segEnd = timeStops[i + 1];
    const localT = segEnd > segStart ? (t - segStart) / (segEnd - segStart) : 1;
    const smoothed = localT * localT * (3 - 2 * localT); // smoothstep — soft accelerate/decelerate per segment
    return progressStops[i] + (progressStops[i + 1] - progressStops[i]) * smoothed;
  };
}

export function PagePreloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const lenis = useLenis();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const force =
      new URLSearchParams(window.location.search).get("preloader") === "1" ||
      new URLSearchParams(window.location.search).get("preloader") === "true";
    const seen = !force && sessionStorage.getItem(STORAGE_KEY) === "1";

    if (reduced || seen) {
      setMounted(false);
      return;
    }

    const mobile = window.matchMedia("(max-width: 991px)").matches;
    const activeShowMs = mobile ? SHOW_MS_MOBILE : SHOW_MS;

    setVisible(true);
    setLocked(true);
    document.documentElement.classList.add("rm-is-loading");

    // Progress bar + live counter share one clock with the exit timer below —
    // the number always lands on 100 exactly when the curtain starts.
    const start = performance.now();
    const progressCurve = buildProgressCurve();
    const tick = (now: number) => {
      const t = Math.min((now - start) / activeShowMs, 1);
      setProgress(progressCurve(t) * 100);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    let finishTimer: number | undefined;

    const exitTimer = window.setTimeout(() => {
      setVisible(false);

      finishTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("rm-is-loading");
        setLocked(false);
        if (!force) sessionStorage.setItem(STORAGE_KEY, "1");
        window.dispatchEvent(new Event("rm:loading-end"));
        setMounted(false);
      }, EXIT_MS);
    }, activeShowMs);

    return () => {
      window.clearTimeout(exitTimer);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("rm-is-loading");
      setLocked(false);
    };
  }, []);

  // Lenis drives scroll via a transform, not native scrolling — overflow:hidden
  // on <html> alone doesn't stop it, so the wheel/touch input has to be
  // suspended at the source while the preloader is up.
  useEffect(() => {
    if (!lenis) return;
    if (locked) {
      lenis.stop();
      return () => lenis.start();
    }
  }, [lenis, locked]);

  if (!mounted) return null;

  // Blur resolves to 0 exactly at 100% — reads as "still loading" until the
  // last moment, sharpening into focus in step with the counter, not a fixed
  // one-off fade unrelated to actual progress.
  const remaining = (100 - progress) / 100;
  const logoStyle: CSSProperties = {
    opacity: Math.min(1, progress / 12),
    filter: `blur(${remaining * remaining * 14}px)`,
  };

  return (
    <div
      className={["rm-preloader", visible ? "rm-preloader--active" : "rm-preloader--out"].join(" ")}
      aria-hidden="true"
      style={{ "--rm-preloader-exit-ms": `${EXIT_MS}ms` } as CSSProperties}
    >
      <div className="rm-preloader__veil" />
      <div className="rm-preloader__inner">
        <div className="rm-preloader__logo" data-preloader-logo style={logoStyle}>
          <img
            src={logoUrl}
            alt="Real Media"
            width={90}
            height={65}
            className="rm-preloader__logo-img"
            decoding="async"
          />
        </div>
      </div>
      <div className="rm-preloader__footer">
        <div className="rm-preloader__footer-row">
          <p className="rm-preloader__tagline rm-type-section-headline">{TAGLINE}</p>
          <span className="rm-preloader__counter rm-type-section-headline">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="rm-preloader__progress-track">
          <span
            className="rm-preloader__progress-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
