import { useEffect } from "react";

/**
 * Adds .is-visible to any element with .reveal / .reveal-fade / .reveal-scale
 * once it intersects the viewport. Plays once, including nodes added later
 * (e.g. filter toggles that remount cards).
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const revealSelector = ".reveal, .reveal-fade, .reveal-scale";
    const revealed = new WeakSet<HTMLElement>();
    const observed = new WeakSet<HTMLElement>();

    const finishPromotion = (el: HTMLElement) => {
      el.style.willChange = "auto";
    };

    const reveal = (el: HTMLElement, io?: IntersectionObserver) => {
      if (revealed.has(el)) return;
      el.style.willChange = "opacity, transform";
      el.classList.add("is-visible");
      io?.unobserve(el);
      revealed.add(el);

      let done = false;
      const cleanup = () => {
        if (done) return;
        done = true;
        el.removeEventListener("transitionend", onTransitionEnd);
        finishPromotion(el);
      };
      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.target !== el) return;
        if (event.propertyName !== "opacity" && event.propertyName !== "transform") return;
        cleanup();
      };
      el.addEventListener("transitionend", onTransitionEnd);
      window.setTimeout(cleanup, 900);
    };

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((el) => reveal(el));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement, io);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    const observeElement = (el: HTMLElement) => {
      if (el.classList.contains("is-visible")) {
        revealed.add(el);
        return;
      }
      if (observed.has(el)) return;
      observed.add(el);
      io.observe(el);
    };

    const observeTree = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(revealSelector)) observeElement(root);
      root.querySelectorAll<HTMLElement>(revealSelector).forEach(observeElement);
    };

    observeTree(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          observeTree(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
