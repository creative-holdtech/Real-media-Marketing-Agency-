import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Children,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/** Framer Dragable Carousel defaults — https://www.framer.com/marketplace/components/dragable-carousel/ */
export const DRAGABLE_CAROUSEL_DEFAULTS = {
  slideWidth: 320,
  slideHeight: 400,
  gap: 20,
  borderRadius: 12,
  perspective: 1200,
  rotateY: 48,
  depth: 140,
  activeScale: 1,
  inactiveScale: 0.82,
  inactiveOpacity: 0.45,
  snapDuration: 0.25,
  showArrows: true,
  arrowColor: "rgb(51, 51, 51)",
  arrowBg: "rgb(255, 255, 255)",
  arrowSize: 44,
  showDots: true,
  dotColor: "rgb(255, 255, 255)",
  dotInactiveOpacity: 0.32,
  dotSize: 8,
  loop: true,
  autoplay: false,
  autoplayDelay: 3000,
  pauseOnHover: true,
} as const;

type WidenLiteral<T> = T extends number
  ? number
  : T extends boolean
    ? boolean
    : T extends string
      ? string
      : T;

export type DragableCarouselConfig = Partial<{
  [K in keyof typeof DRAGABLE_CAROUSEL_DEFAULTS]: WidenLiteral<
    (typeof DRAGABLE_CAROUSEL_DEFAULTS)[K]
  >;
}>;

type DragableCarouselProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  config?: DragableCarouselConfig;
  /** Snap alignment — start for left-anchored editorial strips. */
  align?: "center" | "start";
  /** Bottom overlay (e.g. name/role on the active portrait). */
  overlay?: ReactNode;
  /** Lift dots when an overlay occupies the lower portrait area. */
  dotsPosition?: "default" | "above-caption" | "below-cards";
  /** Fires when the centered snap changes (for external captions). */
  onSlideChange?: (index: number) => void;
  /** When false, 3D peek is not clipped (use on light sections). */
  clipSlides?: boolean;
};

const TWEEN_SELECTOR = "[data-dragable-tween]";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function emblaDurationSeconds(seconds: number) {
  return Math.max(20, Math.round(seconds * 45));
}

export function DragableCarousel({
  children,
  className,
  ariaLabel = "Carousel",
  config,
  align = "center",
  overlay,
  dotsPosition = "default",
  onSlideChange,
  clipSlides = true,
}: DragableCarouselProps) {
  const cfg = { ...DRAGABLE_CAROUSEL_DEFAULTS, ...config };
  const slides = Children.toArray(children);
  const slideCount = slides.length;
  const slideStride = cfg.slideWidth + cfg.gap;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: cfg.loop,
      align,
      containScroll: false,
      slidesToScroll: 1,
      startIndex: 0,
      duration: emblaDurationSeconds(cfg.snapDuration),
    },
    [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const alignStartOnce = useRef(false);
  const coverframe = useRef<number | null>(null);
  const settledIndexRef = useRef(0);
  const captionReadyRef = useRef(true);
  const carouselRootRef = useRef<HTMLDivElement>(null);

  /** Max neighbor distance still rendered (Framer shows ~1 peek per side) */
  const maxPeekDistance = 1.15;
  const peekFadeStart = 0.72;

  const onSelect = useCallback(
    (api: UseEmblaCarouselType[1]) => {
      if (!api) return;
      const index = api.selectedScrollSnap();
      setSelectedIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange],
  );

  const onSettle = useCallback(
    (api: UseEmblaCarouselType[1]) => {
      if (!api) return;
      const index = api.selectedScrollSnap();
      settledIndexRef.current = index;
      captionReadyRef.current = true;
      setSelectedIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange],
  );

  const applyCoverflow = useCallback(
    (api: UseEmblaCarouselType[1]) => {
      if (!api) return;
      const root = api.rootNode();
      const rootRect = root.getBoundingClientRect();
      const viewportCenter = rootRect.left + rootRect.width / 2;
      const settledIndex = settledIndexRef.current;
      const showCaption = captionReadyRef.current;

      api.slideNodes().forEach((slideNode, index) => {
        const tweenEl = slideNode.querySelector<HTMLElement>(TWEEN_SELECTOR);
        if (!tweenEl) return;

        const slideRect = slideNode.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;
        const distance = (slideCenter - viewportCenter) / slideStride;
        const absDistance = clamp(Math.abs(distance), 0, 2.5);
        const isActive = absDistance < 0.18;

        tweenEl.dataset.dragableActive = isActive ? "true" : "false";
        tweenEl.dataset.dragableSettled = showCaption && index === settledIndex ? "true" : "false";

        if (absDistance > maxPeekDistance) {
          tweenEl.style.opacity = "0";
          tweenEl.style.visibility = "hidden";
          tweenEl.style.pointerEvents = "none";
          return;
        }

        let peekMultiplier = 1;
        if (absDistance > peekFadeStart) {
          peekMultiplier = clamp(
            1 - (absDistance - peekFadeStart) / (maxPeekDistance - peekFadeStart),
            0,
            1,
          );
        }

        tweenEl.style.visibility = peekMultiplier > 0.02 ? "visible" : "hidden";
        tweenEl.style.pointerEvents = peekMultiplier > 0.02 ? "" : "none";

        const clampedDistance = clamp(distance, -1, 1);
        const focus = clamp(1 - absDistance, 0, 1);
        const focusEase = focus * focus * (3 - 2 * focus);
        const slideZ = isActive ? 1000 : Math.round(focusEase * 10);
        slideNode.style.position = "relative";
        slideNode.style.zIndex = String(slideZ);

        if (reduceMotion) {
          const baseOpacity = isActive ? 1 : cfg.inactiveOpacity;
          tweenEl.style.opacity = String(baseOpacity * peekMultiplier);
          tweenEl.style.transform = isActive ? "none" : `scale(${cfg.inactiveScale})`;
          return;
        }
        const rotateY = clampedDistance * cfg.rotateY;
        const scale = mix(cfg.inactiveScale, cfg.activeScale, focusEase);
        const opacity = mix(cfg.inactiveOpacity, 1, focusEase) * peekMultiplier;
        const translateZ = mix(-cfg.depth - 56, 36, focusEase);

        tweenEl.style.opacity = String(opacity);
        tweenEl.style.transform = [
          `rotateY(${rotateY}deg)`,
          `scale(${scale})`,
          `translateZ(${translateZ}px)`,
        ].join(" ");
      });
    },
    [cfg, reduceMotion, slideStride],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onReInit = useCallback(
    (api: UseEmblaCarouselType[1]) => {
      if (!api) return;
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
      onSlideChange?.(api.selectedScrollSnap());
    },
    [onSelect, onSlideChange],
  );

  const scheduleCoverflow = useCallback(
    (api: UseEmblaCarouselType[1]) => {
      if (coverframe.current !== null) {
        cancelAnimationFrame(coverframe.current);
      }
      coverframe.current = requestAnimationFrame(() => {
        coverframe.current = null;
        applyCoverflow(api);
      });
    },
    [applyCoverflow],
  );

  const onScroll = useCallback(
    (api: UseEmblaCarouselType[1]) => {
      captionReadyRef.current = false;
      carouselRootRef.current?.setAttribute("data-dragable-scrolling", "true");
      scheduleCoverflow(api);
    },
    [scheduleCoverflow],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onReInitHandler = (api: UseEmblaCarouselType[1]) => {
      if (!api) return;
      onReInit(api);
      if (!alignStartOnce.current) {
        api.scrollTo(0, true);
        alignStartOnce.current = true;
      }
      scheduleCoverflow(api);
    };

    const onSettleHandler = (api: UseEmblaCarouselType[1]) => {
      onSettle(api);
      carouselRootRef.current?.setAttribute("data-dragable-scrolling", "false");
      scheduleCoverflow(api);
    };

    onReInitHandler(emblaApi);
    emblaApi.on("reInit", onReInitHandler);
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("settle", onSettleHandler);
    emblaApi.on("resize", onScroll);

    return () => {
      if (coverframe.current !== null) {
        cancelAnimationFrame(coverframe.current);
      }
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInitHandler);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("settle", onSettleHandler);
      emblaApi.off("resize", onScroll);
    };
  }, [emblaApi, onSelect, onSettle, onScroll, scheduleCoverflow]);

  useEffect(() => {
    if (!emblaApi || !cfg.autoplay || reduceMotion) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const play = () => {
      timer = setInterval(() => emblaApi.scrollNext(), cfg.autoplayDelay);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
    };

    play();
    const root = emblaApi.rootNode();
    if (cfg.pauseOnHover) {
      root.addEventListener("mouseenter", stop);
      root.addEventListener("mouseleave", play);
    }

    return () => {
      stop();
      if (cfg.pauseOnHover) {
        root.removeEventListener("mouseenter", stop);
        root.removeEventListener("mouseleave", play);
      }
    };
  }, [emblaApi, cfg.autoplay, cfg.autoplayDelay, cfg.pauseOnHover, reduceMotion]);

  const slideStyle = useMemo(
    () => ({
      flex: `0 0 ${cfg.slideWidth}px`,
      paddingRight: `${cfg.gap}px`,
    }),
    [cfg.slideWidth, cfg.gap],
  );

  const scrollToSnap = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const arrowIconSize = Math.round(cfg.arrowSize * 0.42);

  return (
    <div
      ref={carouselRootRef}
      className={cn(
        "rm-dragable-carousel relative mx-auto w-full max-w-[min(100%,52rem)]",
        className,
      )}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      data-dragable-scrolling="false"
      style={
        {
          "--rm-carousel-slide-w": `${cfg.slideWidth}px`,
          "--rm-carousel-slide-h": `${cfg.slideHeight}px`,
          "--rm-carousel-radius": `${cfg.borderRadius}px`,
        } as CSSProperties
      }
    >
      <div className="relative">
        <div
          className={cn(
            "rm-dragable-carousel__viewport overflow-y-visible",
            clipSlides ? "overflow-x-clip" : "overflow-x-visible",
          )}
          ref={emblaRef}
          style={{ perspective: reduceMotion ? undefined : `${cfg.perspective}px` }}
        >
          <div className="flex touch-pan-y py-4 md:py-6" style={{ transformStyle: "preserve-3d" }}>
            {slides.map((child, index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 grow-0"
                style={slideStyle}
                role="group"
                aria-roledescription="slide"
                aria-hidden={index !== selectedIndex}
              >
                <div
                  data-dragable-tween
                  data-dragable-active="false"
                  className={cn(
                    "rm-dragable-carousel__slide origin-center will-change-[transform,opacity]",
                    align === "start" ? "mr-auto" : "mx-auto",
                  )}
                  style={{ width: cfg.slideWidth }}
                >
                  {child}
                </div>
              </div>
            ))}
          </div>
        </div>

        {overlay ? (
          <div className="rm-dragable-carousel__overlay pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
            {overlay}
          </div>
        ) : null}

        {cfg.showDots && scrollSnaps.length > 1 && dotsPosition !== "below-cards" ? (
          <div
            className={cn(
              "rm-dragable-carousel__dots pointer-events-none absolute left-1/2 z-30 flex -translate-x-1/2 gap-2.5",
              dotsPosition === "above-caption"
                ? "bottom-[4.5rem] md:bottom-[4.75rem]"
                : "bottom-5 md:bottom-6",
            )}
            role="tablist"
            aria-label="Carousel pagination"
          >
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Go to slide ${index + 1}`}
                className="pointer-events-auto cursor-pointer rounded-full p-0 shadow-[0_1px_4px_rgb(0_0_0_/_0.45)] transition-[opacity,transform] duration-150 ease-out hover:opacity-90"
                style={{
                  width: cfg.dotSize,
                  height: cfg.dotSize,
                  backgroundColor: cfg.dotColor,
                  opacity: index === selectedIndex ? 1 : cfg.dotInactiveOpacity,
                  transform: index === selectedIndex ? "scale(1.08)" : "scale(1)",
                }}
                onClick={() => scrollToSnap(index)}
              />
            ))}
          </div>
        ) : null}
      </div>

      {cfg.showDots && scrollSnaps.length > 1 && dotsPosition === "below-cards" ? (
        <div
          className="rm-dragable-carousel__dots pointer-events-none mt-5 flex justify-center gap-2.5 md:mt-6"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to slide ${index + 1}`}
              className="pointer-events-auto cursor-pointer rounded-full p-0 transition-[opacity,transform] duration-150 ease-out hover:opacity-90"
              style={{
                width: cfg.dotSize,
                height: cfg.dotSize,
                backgroundColor: cfg.dotColor,
                opacity: index === selectedIndex ? 1 : cfg.dotInactiveOpacity,
                transform: index === selectedIndex ? "scale(1.08)" : "scale(1)",
              }}
              onClick={() => scrollToSnap(index)}
            />
          ))}
        </div>
      ) : null}

      {cfg.showArrows && slideCount > 1 ? (
        <div className="pointer-events-none absolute inset-y-0 -left-1 -right-1 z-20 hidden items-center justify-between md:flex sm:-left-3 sm:-right-3">
          <button
            type="button"
            className="rm-dragable-carousel__arrow pointer-events-auto"
            style={{
              width: cfg.arrowSize,
              height: cfg.arrowSize,
              color: cfg.arrowColor,
              backgroundColor: cfg.arrowBg,
            }}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft
              strokeWidth={2.25}
              style={{ width: arrowIconSize, height: arrowIconSize }}
            />
          </button>
          <button
            type="button"
            className="rm-dragable-carousel__arrow pointer-events-auto"
            style={{
              width: cfg.arrowSize,
              height: cfg.arrowSize,
              color: cfg.arrowColor,
              backgroundColor: cfg.arrowBg,
            }}
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next slide"
          >
            <ChevronRight
              strokeWidth={2.25}
              style={{ width: arrowIconSize, height: arrowIconSize }}
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use DragableCarousel */
export const DraggableCarousel = DragableCarousel;
