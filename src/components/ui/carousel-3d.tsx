import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type Carousel3DSlide = {
  id: string;
  src?: string;
  alt?: string;
};

type Carousel3DRenderArgs = {
  slide: Carousel3DSlide;
  index: number;
  isActive: boolean;
  step: (direction: 1 | -1) => void;
};

type Carousel3DProps = {
  slides: Carousel3DSlide[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  gap?: number;
  hideBackfaces?: boolean;
  className?: string;
  "aria-label"?: string;
  showNav?: boolean;
  renderSlide?: (args: Carousel3DRenderArgs) => ReactNode;
};

function normalizeIndex(index: number, count: number) {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

function shortestDelta(from: number, to: number, count: number) {
  let delta = to - from;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

export function Carousel3D({
  slides,
  activeIndex,
  onActiveIndexChange,
  gap = 12,
  hideBackfaces = true,
  className,
  "aria-label": ariaLabel = "Case study carousel",
  showNav = true,
  renderSlide,
}: Carousel3DProps) {
  const count = slides.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef(activeIndex);
  const dragRef = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false });
  const [ready, setReady] = useState(false);
  const navId = useId();

  const applyLayout = useCallback(() => {
    const figure = figureRef.current;
    const firstSlide = slideRefs.current[0];
    if (!figure || !firstSlide || count === 0) return;

    const width = firstSlide.getBoundingClientRect().width;
    if (width <= 0) return;

    const theta = (2 * Math.PI) / count;
    const apothem = width / (2 * Math.tan(Math.PI / count));
    const origin = `50% 50% ${-apothem}px`;
    const frontIndex = normalizeIndex(rotationRef.current, count);

    figure.style.transformOrigin = origin;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      slide.style.padding = `0 ${gap / 2}px`;
      slide.style.transformOrigin = origin;
      slide.style.transform = `rotateY(${index * theta}rad)`;
      if (hideBackfaces) slide.style.backfaceVisibility = "hidden";

      const depth = Math.abs(shortestDelta(frontIndex, index, count));
      slide.style.opacity = depth === 0 ? "1" : depth === 1 ? "0.46" : "0.22";
      slide.style.filter = depth === 0 ? "none" : `brightness(${depth === 1 ? 0.78 : 0.55})`;
      slide.style.pointerEvents = depth === 0 ? "auto" : "none";
      slide.dataset.depth = String(depth);
    });

    figure.style.transform = `rotateY(${rotationRef.current * -theta}rad)`;
    setReady(true);
  }, [count, gap, hideBackfaces]);

  const rotateTo = useCallback(
    (nextRotation: number) => {
      if (count === 0) return;
      rotationRef.current = nextRotation;
      const figure = figureRef.current;
      if (!figure) return;

      const theta = (2 * Math.PI) / count;
      figure.style.transform = `rotateY(${rotationRef.current * -theta}rad)`;
      onActiveIndexChange(normalizeIndex(rotationRef.current, count));
      applyLayout();
    },
    [applyLayout, count, onActiveIndexChange],
  );

  useLayoutEffect(() => {
    applyLayout();
  }, [applyLayout, slides, activeIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(() => applyLayout());
    observer.observe(root);
    return () => observer.disconnect();
  }, [applyLayout]);

  useEffect(() => {
    if (count === 0) return;
    const normalized = normalizeIndex(activeIndex, count);
    if (normalized === normalizeIndex(rotationRef.current, count)) {
      applyLayout();
      return;
    }

    rotationRef.current += shortestDelta(
      normalizeIndex(rotationRef.current, count),
      normalized,
      count,
    );
    applyLayout();
  }, [activeIndex, applyLayout, count]);

  const step = useCallback(
    (direction: 1 | -1) => {
      rotateTo(rotationRef.current + direction);
    },
    [rotateTo],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) return;
    dragRef.current = { startX: event.clientX, dragging: true };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    dragRef.current.dragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!dragRef.current.dragging) return;
    const delta = dragRef.current.startX - event.clientX;
    if (Math.abs(delta) < 28) return;
    step(delta > 0 ? 1 : -1);
    dragRef.current.dragging = false;
  };

  if (count === 0) return null;

  const active = normalizeIndex(activeIndex, count);

  return (
    <div
      ref={rootRef}
      className={cn("rm-carousel-3d", !ready && "rm-carousel-3d--loading", className)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="rm-carousel-3d__viewport">
        <figure
          ref={figureRef}
          className="rm-carousel-3d__figure"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerMove={onPointerMove}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className="rm-carousel-3d__slide"
              aria-hidden={active !== index}
            >
              <div className="rm-carousel-3d__frame">
                {renderSlide ? (
                  renderSlide({ slide, index, isActive: active === index, step })
                ) : slide.src ? (
                  <img
                    src={slide.src}
                    alt={slide.alt ?? ""}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </figure>
      </div>

      {showNav ? (
        <nav className="rm-carousel-3d__nav" aria-labelledby={navId}>
          <span id={navId} className="sr-only">
            Carousel controls
          </span>
          <span className="sr-only" aria-live="polite">
            Slide {active + 1} of {count}
          </span>
          <button
            type="button"
            className="rm-carousel-3d__btn"
            onClick={() => step(-1)}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            type="button"
            className="rm-carousel-3d__btn"
            onClick={() => step(1)}
            aria-label="Next slide"
          >
            →
          </button>
        </nav>
      ) : (
        <span className="sr-only" aria-live="polite">
          Slide {active + 1} of {count}
        </span>
      )}
    </div>
  );
}
