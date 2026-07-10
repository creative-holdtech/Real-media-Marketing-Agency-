import team01 from "@/assets/team-01.jpg";
import team02 from "@/assets/team-02.jpg";
import team03 from "@/assets/team-03.jpg";
import team04 from "@/assets/team-04.jpg";
import team05 from "@/assets/team-05.jpg";
import team06 from "@/assets/team-06.jpg";
import team07 from "@/assets/team-07.jpg";
import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import {
  FramerTag,
  heroSubcopy,
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

const team = aboutTeam.members.map((member) => ({
  ...member,
  photo: teamPhotos[member.photoKey],
}));

const TEAM_PHOTO_FOCUS: Record<keyof typeof teamPhotos, string> = {
  "01": "center 8%",
  "02": "center 5%",
  "03": "center 6%",
  "04": "center 3%",
  "05": "center 4%",
  "06": "center 5%",
  "07": "center 2%",
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

function TeamPortraitSlide({ person }: { person: (typeof team)[number] }) {
  return (
    <div
      className="rm-dragable-carousel__media rm-team-portrait overflow-hidden"
      data-photo={person.photoKey}
    >
      <img
        src={person.photo}
        alt={person.name}
        draggable={false}
        className="rm-team-portrait__img pointer-events-none h-full w-full"
        style={{ objectPosition: TEAM_PHOTO_FOCUS[person.photoKey] ?? "center 5%" }}
        loading="lazy"
        decoding="async"
      />
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
  return (
    <div className="reveal-fade rm-team-carousel-enter flex w-full min-w-0 flex-col items-center">
      <DragableCarousel
        ariaLabel="Team members"
        className="rm-team-carousel max-w-[min(100%,56rem)]"
        clipSlides={false}
        config={carouselConfig}
        dotsPosition="below-cards"
      >
        {team.map((person) => (
          <TeamPortraitSlide key={person.id} person={person} />
        ))}
      </DragableCarousel>
    </div>
  );
}

export function TeamSection() {
  return (
    <MarketingSection ariaLabelledBy="team-heading" className="bg-black">
      <header className="rm-insights-intro mx-auto flex w-full flex-col items-center text-center">
        <div className={cn(sectionLabelHeadlineStack, "w-full items-center")}>
          <FramerTag>{aboutTeam.tag}</FramerTag>
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
    </MarketingSection>
  );
}
