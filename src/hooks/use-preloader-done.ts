import { useEffect, useState } from "react";

/**
 * True once the page preloader has finished — or immediately if it never
 * shows this session (already seen, or prefers-reduced-motion). Lets hero
 * entrance animations wait instead of finishing while the opaque preloader
 * curtain still covers the screen (they'd otherwise be invisible).
 */
export function usePreloaderDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!document.documentElement.classList.contains("rm-is-loading")) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener("rm:loading-end", onDone);
    return () => window.removeEventListener("rm:loading-end", onDone);
  }, []);

  return done;
}
