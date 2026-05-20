import { useEffect } from "react";

/**
 * Adds .is-visible to any element with .reveal / .reveal-fade / .reveal-scale
 * once it intersects the viewport. Plays once.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-fade, .reveal-scale");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Promote to GPU layer only for the duration of the animation.
            el.style.willChange = "opacity, transform, filter";
            el.classList.add("is-visible");
            io.unobserve(el);
            el.addEventListener(
              "animationend",
              () => { el.style.willChange = "auto"; },
              { once: true },
            );
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
