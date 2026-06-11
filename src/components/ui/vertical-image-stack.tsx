import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import { textMeta } from "@/components/framer-section";
import { cn } from "@/lib/utils";

export type VerticalStackItem = {
  id: string;
  slug: string;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  metricValue?: string;
  metricLabel?: string;
  meta?: string;
  preview?: string;
  coverTreatment?: "logo" | "photo";
};

type VerticalImageStackProps = {
  items: VerticalStackItem[];
  className?: string;
};

function CaseStudySlide({ item }: { item: VerticalStackItem }) {
  const metricValue = item.metricValue ?? item.subtitle;
  const metricLabel = item.metricLabel;

  return (
    <Link
      to="/cases/$slug"
      params={{ slug: item.slug }}
      className="rm-dragable-carousel__media rm-case-carousel-slide group block h-full min-h-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={`View ${item.title} case study`}
    >
      <div className="rm-insights-dl__preview-media">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={cn(
            "rm-insights-dl__preview-img",
            item.coverTreatment === "logo" && "rm-case-carousel-slide__img--logo",
          )}
        />
        <div className="rm-insights-dl__preview-wash" />
        <div className="rm-insights-dl__preview-copy">
          {item.meta ? (
            <p className={cn(textMeta, "rm-insights-dl__preview-kicker")}>{item.meta}</p>
          ) : null}
          <p className="rm-insights-dl__preview-title">{item.title}</p>
          {metricValue ? (
            <p className="rm-case-carousel-slide__metric">
              <span className="rm-case-carousel-slide__metric-value">{metricValue}</span>
              {metricLabel ? (
                <span className="rm-case-carousel-slide__metric-label">{metricLabel}</span>
              ) : null}
            </p>
          ) : null}
          <span className="rm-insights-dl__preview-link">View case →</span>
        </div>
      </div>
    </Link>
  );
}

export function VerticalImageStack({ items, className }: VerticalImageStackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(720);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const measure = () => {
      setSlideWidth(Math.max(280, Math.round(node.clientWidth)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const carouselConfig = useMemo(
    () => ({
      ...DRAGABLE_CAROUSEL_DEFAULTS,
      slideWidth,
      slideHeight: Math.round(slideWidth * (448 / 352)),
      gap: 16,
      rotateY: 14,
      depth: 80,
      inactiveScale: 0.98,
      inactiveOpacity: 0.5,
    }),
    [slideWidth],
  );

  if (items.length === 0) return null;

  return (
    <div ref={trackRef} className={cn("rm-case-showcase", className)}>
      <DragableCarousel
        align="start"
        ariaLabel="Featured case studies"
        className="rm-case-carousel mx-0 w-full max-w-none"
        clipSlides={false}
        config={carouselConfig}
        dotsPosition="below-cards"
      >
        {items.map((item) => (
          <CaseStudySlide key={item.id} item={item} />
        ))}
      </DragableCarousel>
    </div>
  );
}
