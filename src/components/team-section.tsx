import team01 from "@/assets/team-01.jpg";
import team02 from "@/assets/team-02.jpg";
import team03 from "@/assets/team-03.jpg";
import team04 from "@/assets/team-04.jpg";
import team05 from "@/assets/team-05.jpg";
import team06 from "@/assets/team-06.jpg";
import team07 from "@/assets/team-07.jpg";
import { useState } from "react";
import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import {
  FramerTag,
  heroSubcopy,
  sectionGap,
  sectionHeadline,
  sectionLabelHeadlineStack,
} from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { TextReveal } from "@/components/text-reveal";
import { aboutTeam } from "@/content/about";
import { cn } from "@/lib/utils";

const teamPhotos = {
  "01": team01,
  "02": team02,
  "03": team03,
  "04": team04,
  "05": team05,
  "06": team06,
  "07": team07,
} as const;

const TEAM_PHOTO_SIZE = 1400;

const team = aboutTeam.members.map((member) => ({
  ...member,
  photo: teamPhotos[member.photoKey],
}));

const TEAM_PHOTO_FOCUS: Record<keyof typeof teamPhotos, string> = {
  "01": "center top",
  "02": "center top",
  "03": "center top",
  "04": "center top",
  "05": "center top",
  "06": "center top",
  "07": "center top",
};

/* All team photos are 1400×1400 squares shown in a portrait box — the cover
   crop is height-limited, so object-position-Y can't move the head at all.
   A bottom-anchored zoom is the only lever: higher s → crown sits higher.
   Target: crowns aligned ~6% from top (Figma QA #343 — all heads on one level). */
const TEAM_PHOTO_ZOOM: Partial<Record<keyof typeof teamPhotos, number>> = {
  "01": 1.14,
  "02": 1.13,
  "03": 1.15,
  "04": 1.04,
  "05": 1.13,
  "06": 1.12,
  "07": 1.07,
};

const carouselConfig = {
  ...DRAGABLE_CAROUSEL_DEFAULTS,
  inactiveScale: 0.9,
  inactiveOpacity: 0.45,
  snapDuration: 0.35,
  arrowColor: "rgba(255, 255, 255, 0.9)",
  arrowBg: "rgba(255, 255, 255, 0.08)",
  arrowSize: 38,
  dotColor: "rgba(255, 255, 255, 0.92)",
  dotInactiveOpacity: 0.24,
  dotSize: 6,
};

function bioLines(bio: string): string[] {
  return bio
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function slideIsNear(index: number, active: number, total: number) {
  if (index === active) return true;
  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;
  return index === prev || index === next;
}

function TeamPortraitSlide({
  person,
  loadImage,
}: {
  person: (typeof team)[number];
  loadImage: boolean;
}) {
  return (
    <div
      className="rm-dragable-carousel__media rm-team-portrait overflow-hidden"
      data-photo={person.photoKey}
    >
      {loadImage ? (
        <img
          src={person.photo}
          alt={person.name}
          width={TEAM_PHOTO_SIZE}
          height={TEAM_PHOTO_SIZE}
          sizes="(max-width: 768px) 72vw, 320px"
          draggable={false}
          className="rm-team-portrait__img pointer-events-none h-full w-full"
          style={{
            objectPosition: TEAM_PHOTO_FOCUS[person.photoKey] ?? "center top",
            ...(TEAM_PHOTO_ZOOM[person.photoKey]
              ? {
                  transform: `scale(${TEAM_PHOTO_ZOOM[person.photoKey]})`,
                  transformOrigin: "50% 100%",
                }
              : null),
          }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          aria-hidden
          className="rm-team-portrait__img h-full w-full bg-[var(--rm-surface-raised)]"
        />
      )}
      <div className="rm-team-portrait__caption">
        <p className="rm-team-portrait__name">{person.name}</p>
        <p className="rm-team-portrait__role rm-type-meta">{person.role}</p>
        <div className="rm-team-portrait__bio">
          {bioLines(person.bio).map((line) => (
            <p key={line} className="rm-team-portrait__bio-line">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamCastCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set([0, 1, team.length - 1]));

  const onSlideChange = (index: number) => {
    setActiveIndex(index);
    setLoaded((prev) => {
      const next = new Set(prev);
      for (let i = 0; i < team.length; i += 1) {
        if (slideIsNear(i, index, team.length)) next.add(i);
      }
      return next.size === prev.size && [...next].every((i) => prev.has(i)) ? prev : next;
    });
  };

  return (
    <div className="reveal-fade rm-team-carousel-enter rm-team-stage">
      <DragableCarousel
        ariaLabel="Team members"
        className="rm-team-carousel"
        clipSlides={false}
        config={carouselConfig}
        dotsPosition="below-cards"
        onSlideChange={onSlideChange}
      >
        {team.map((person, index) => (
          <TeamPortraitSlide
            key={person.id}
            person={person}
            loadImage={loaded.has(index) || slideIsNear(index, activeIndex, team.length)}
          />
        ))}
      </DragableCarousel>
    </div>
  );
}

export function TeamSection() {
  return (
    <MarketingSection ariaLabelledBy="team-heading" className="bg-black">
      {/* Mirror home Insights stack: intro → stage, same gap / track pad / max-width. */}
      <div className={cn("rm-team-stack flex w-full flex-col items-center", sectionGap)}>
        <header className="rm-insights-intro mx-auto flex w-full flex-col items-center text-center">
          <div className={cn(sectionLabelHeadlineStack, "w-full items-center")}>
            <div className="reveal">
              <FramerTag>{aboutTeam.tag}</FramerTag>
            </div>
            <TextReveal
              as="h2"
              id="team-heading"
              text={aboutTeam.title}
              className={cn(
                sectionHeadline,
                "m-0 mx-auto max-w-[18ch] text-balance text-center text-white",
              )}
            />
          </div>
          <p
            className={cn("reveal mx-auto mt-6 max-w-[34ch] text-balance text-center", heroSubcopy)}
            data-delay="1"
          >
            {aboutTeam.subtitle}
          </p>
        </header>

        <TeamCastCarousel />
      </div>
    </MarketingSection>
  );
}
