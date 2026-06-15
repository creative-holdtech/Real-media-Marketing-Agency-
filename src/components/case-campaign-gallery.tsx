import { useMemo, useState, type CSSProperties } from "react";

import type { CaseSectionVisual } from "@/lib/cases";
import { cn } from "@/lib/utils";

type CampaignGalleryProps = {
  items: CaseSectionVisual[];
  fallback?: string;
  accent?: string;
};

type GalleryTile = CaseSectionVisual & {
  span?: "wide" | "tall" | "hero";
};

const MOCKUP_KEYS = ["kawasaki-carousel-mockup", "tequila-boost-mockup"] as const;

function isMockupAsset(src: string) {
  return MOCKUP_KEYS.some((key) => src.includes(key));
}

function mockupSpan(index: number): GalleryTile["span"] {
  return index === 0 ? "hero" : "hero";
}

function GalleryImage({
  src,
  alt,
  fallback,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [current, setCurrent] = useState(src);

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}

function MockupTile({
  item,
  span,
  index,
  fallback,
}: {
  item: CaseSectionVisual;
  span?: GalleryTile["span"];
  index: number;
  fallback?: string;
}) {
  return (
    <figure
      tabIndex={0}
      className={cn(
        "rm-campaign-mockup reveal group relative overflow-hidden outline-none",
        span === "hero" && "rm-campaign-mockup--hero md:col-span-12",
        span === "wide" && "rm-campaign-mockup--wide md:col-span-7",
        span === "tall" && "rm-campaign-mockup--tall md:col-span-5",
        !span && "rm-campaign-mockup--standard md:col-span-5",
      )}
      style={{ "--mockup-i": index } as CSSProperties}
      data-delay={String((index % 4) + 1)}
    >
      <div className="rm-campaign-mockup__veil" aria-hidden />
      <div className="rm-campaign-mockup__frame">
        <GalleryImage
          src={item.src}
          alt={item.alt}
          fallback={fallback}
          loading={index === 0 ? "eager" : "lazy"}
          className="rm-campaign-mockup__img"
        />
      </div>
      <figcaption className="rm-campaign-mockup__caption">
        <span className="rm-campaign-mockup__index">{String(index + 1).padStart(2, "0")}</span>
        <span className="rm-campaign-mockup__label">{item.alt}</span>
      </figcaption>
    </figure>
  );
}

function FlatCreativeTile({
  item,
  index,
  fallback,
}: {
  item: CaseSectionVisual;
  index: number;
  fallback?: string;
}) {
  return (
    <figure
      className="rm-campaign-flat reveal group relative overflow-hidden rounded-sm outline-none"
      data-delay={String((index % 5) + 1)}
    >
      <GalleryImage
        src={item.src}
        alt={item.alt}
        fallback={fallback}
        className="h-full w-full object-cover transition duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
      />
      <figcaption className="sr-only">{item.alt}</figcaption>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <span className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {String(index + 1).padStart(2, "0")}
      </span>
    </figure>
  );
}

export function CaseCampaignGallery({ items, fallback, accent = "#c4a035" }: CampaignGalleryProps) {
  const { mockups, flats } = useMemo(() => {
    const mockups: GalleryTile[] = [];
    const flats: CaseSectionVisual[] = [];

    for (const item of items) {
      if (isMockupAsset(item.src)) {
        const mockupIndex = mockups.length;
        mockups.push({
          ...item,
          span: mockupSpan(mockupIndex),
        });
      } else {
        flats.push(item);
      }
    }

    return { mockups, flats };
  }, [items]);

  if (mockups.length === 0 && flats.length === 0) return null;

  return (
    <div
      className="rm-campaign-gallery"
      style={{ "--campaign-accent": accent } as CSSProperties}
    >
      {mockups.length > 0 ? (
        <div className="rm-campaign-gallery__stage reveal" data-delay="1">
          <div className="rm-campaign-gallery__glow" aria-hidden />
          <div className="rm-campaign-mockup-grid">
            {mockups.map((item, index) => (
              <MockupTile
                key={item.src}
                item={item}
                span={item.span}
                index={index}
                fallback={fallback}
              />
            ))}
          </div>
        </div>
      ) : null}

      {flats.length > 0 ? (
        <div className="rm-campaign-gallery__flats">
          <p className="rm-campaign-gallery__flats-label reveal" data-delay="2">
            SMM series and performance frames
          </p>
          <div className="rm-campaign-flat-grid">
            {flats.map((item, index) => (
              <FlatCreativeTile key={item.src} item={item} index={index} fallback={fallback} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
