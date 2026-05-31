import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-fade, .reveal-scale";

function isMobileReveal() {
  return window.matchMedia("(max-width: 991px)").matches;
}

function visibleRatio(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const visiblePx = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  if (visiblePx <= 0) return 0;
  return visiblePx / Math.max(rect.height, 1);
}

/**
 * Adds .is-visible to any element with .reveal / .reveal-fade / .reveal-scale
 * once it intersects the viewport. Plays once, including nodes added later
 * (e.g. filter toggles that remount cards).
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobile = isMobileReveal();

    // Respect user preference: reveal immediately without will-change or transitions
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }
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

    const minRatio = mobile ? 0.04 : 0.18;

    const revealIfInView = (el: HTMLElement, io?: IntersectionObserver) => {
      if (revealed.has(el)) return;
      if (visibleRatio(el) >= minRatio) reveal(el, io);
    };

    const rescanVisible = (io?: IntersectionObserver) => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        revealIfInView(el, io);
      });
    };

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => reveal(el));
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
      {
        threshold: mobile ? [0, 0.04, 0.08, 0.12] : 0.18,
        rootMargin: mobile ? "0px 0px 0px 0px" : "0px 0px -8% 0px",
      },
    );

    const observeElement = (el: HTMLElement) => {
      if (el.classList.contains("is-visible")) {
        revealed.add(el);
        return;
      }
      revealIfInView(el, io);
      if (revealed.has(el)) return;
      if (observed.has(el)) return;
      observed.add(el);
      io.observe(el);
    };

    const observeTree = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(REVEAL_SELECTOR)) observeElement(root);
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(observeElement);
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

    const onLoadingEnd = () => {
      document.querySelectorAll<HTMLElement>(".rm-hero-copy .reveal").forEach((el) => {
        reveal(el, io);
      });
      rescanVisible(io);
    };
    const onScroll = () => rescanVisible(io);

    window.addEventListener("rm:loading-end", onLoadingEnd);
    if (mobile) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("rm:loading-end", onLoadingEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
