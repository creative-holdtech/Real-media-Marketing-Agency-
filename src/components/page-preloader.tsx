import { useEffect, useState } from "react";

const STORAGE_KEY = "rm-preloader-seen";
/** Logo + tagline finish ~1.7s; hold, then exit as one layer */
const SHOW_MS = 2000;
const EXIT_MS = 700;

export function PagePreloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (reduced || seen) {
      setMounted(false);
      return;
    }

    const mobile = window.matchMedia("(max-width: 991px)").matches;
    const showMs = mobile ? 1400 : SHOW_MS;

    setVisible(true);
    document.documentElement.classList.add("rm-is-loading");

    let finishTimer: number | undefined;

    const exitTimer = window.setTimeout(() => {
      setVisible(false);

      finishTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("rm-is-loading");
        sessionStorage.setItem(STORAGE_KEY, "1");
        window.dispatchEvent(new Event("rm:loading-end"));
        setMounted(false);
      }, EXIT_MS);
    }, showMs);

    return () => {
      window.clearTimeout(exitTimer);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
      document.documentElement.classList.remove("rm-is-loading");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={["rm-preloader", visible ? "rm-preloader--active" : "rm-preloader--out"].join(" ")}
      aria-hidden="true"
    >
      <div className="rm-preloader__veil" />
      <div className="rm-preloader__inner">
        <div className="rm-preloader__logo" data-preloader-logo>
          R—M<span className="text-rm-accent">.</span>
        </div>
        <p className="rm-preloader__tagline">
          <span className="rm-preloader__char">S</span>
          <span className="rm-preloader__char">t</span>
          <span className="rm-preloader__char">r</span>
          <span className="rm-preloader__char">a</span>
          <span className="rm-preloader__char">t</span>
          <span className="rm-preloader__char">e</span>
          <span className="rm-preloader__char">g</span>
          <span className="rm-preloader__char">y</span>
          <span className="rm-preloader__char rm-preloader__char--space"> </span>
          <span className="rm-preloader__char">·</span>
          <span className="rm-preloader__char rm-preloader__char--space"> </span>
          <span className="rm-preloader__char">E</span>
          <span className="rm-preloader__char">x</span>
          <span className="rm-preloader__char">e</span>
          <span className="rm-preloader__char">c</span>
          <span className="rm-preloader__char">u</span>
          <span className="rm-preloader__char">t</span>
          <span className="rm-preloader__char">i</span>
          <span className="rm-preloader__char">o</span>
          <span className="rm-preloader__char">n</span>
        </p>
      </div>
    </div>
  );
}
