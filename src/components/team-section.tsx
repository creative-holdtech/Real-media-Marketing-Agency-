import team01 from "@/assets/team-01.jpg";
import team02 from "@/assets/team-02.jpg";
import team03 from "@/assets/team-03.jpg";
import team04 from "@/assets/team-04.jpg";
import team05 from "@/assets/team-05.jpg";
import team06 from "@/assets/team-06.jpg";
import team07 from "@/assets/team-07.jpg";
import { DRAGABLE_CAROUSEL_DEFAULTS, DragableCarousel } from "@/components/dragable-carousel";
import { FramerTag, heroSubcopy } from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { TextReveal } from "@/components/text-reveal";
import { aboutTeam } from "@/content/about";
import { cn } from "@/lib/utils";

const teamHeroTitle =
  "reveal w-full text-balance text-center text-[30px] font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-[40px] md:text-[48px] lg:text-[52px]";

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

const carouselConfig = {
  ...DRAGABLE_CAROUSEL_DEFAULTS,
  slideWidth: 352,
  slideHeight: 448,
  inactiveScale: 0.9,
  inactiveOpacity: 0.45,
};

function bioLines(bio: string): string[] {
  return bio
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function TeamPortraitSlide({ person }: { person: (typeof team)[number] }) {
  return (
    <div className="rm-dragable-carousel__media rm-team-portrait overflow-hidden">
      <img
        src={person.photo}
        alt={person.name}
        draggable={false}
        className="pointer-events-none h-full w-full object-cover object-[center_20%]"
        loading="lazy"
        decoding="async"
      />
      <div className="rm-team-portrait__caption">
        <p className="rm-team-portrait__name">{person.name}</p>
        <p className="rm-team-portrait__role">{person.role}</p>
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
    <MarketingSection ariaLabelledBy="team-heading">
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
          <p className="reveal mb-6 w-fit md:mb-8">
            <FramerTag>{aboutTeam.tag}</FramerTag>
          </p>
          <TextReveal id="team-heading" text={aboutTeam.title} className={teamHeroTitle} />
          <p
            className={cn("reveal mt-7 mx-auto max-w-[34ch] text-balance text-center", heroSubcopy)}
            data-delay="1"
          >
            {aboutTeam.subtitle}
          </p>
        </div>

        <div className="flex w-full justify-center">
          <TeamCastCarousel />
        </div>
      </div>
    </MarketingSection>
  );
}
