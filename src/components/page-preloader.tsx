import { useEffect, useState } from "react";

const STORAGE_KEY = "rm-preloader-seen";
const DURATION_MS = 2800;

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

    setVisible(true);
    document.documentElement.classList.add("rm-is-loading");

    const endTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("rm-is-loading");
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      window.setTimeout(() => setMounted(false), 900);
    }, DURATION_MS);

    return () => {
      window.clearTimeout(endTimer);
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
