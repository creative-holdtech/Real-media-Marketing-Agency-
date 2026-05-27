import { useEffect, useRef, useState } from "react";

/** Pause expensive CSS animations when the target leaves the viewport. */
export function usePauseWhenOffscreen<T extends Element>(rootMargin = "120px") {
  const ref = useRef<T | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry.isIntersecting);
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, paused };
}
