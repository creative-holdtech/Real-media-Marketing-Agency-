import team01 from "@/assets/team-01.jpg";
import team02 from "@/assets/team-02.jpg";
import team03 from "@/assets/team-03.jpg";
import team04 from "@/assets/team-04.jpg";
import team05 from "@/assets/team-05.jpg";
import team06 from "@/assets/team-06.jpg";
import team07 from "@/assets/team-07.jpg";
import teamGroup from "@/assets/team-group.jpg";
import { bodyCopy, sectionGap, textMeta } from "@/components/framer-section";
import {
  ChapterSpacer,
  MarketingSection,
  MarketingSectionIntro,
} from "@/components/marketing-section";
import { cn } from "@/lib/utils";

const team = [
  { id: "rm", name: "R. Mirza", role: "Strategy · GTM", photo: team01 },
  { id: "al", name: "A. Levchenko", role: "Creative Director", photo: team02 },
  { id: "sk", name: "S. Karim", role: "Performance Lead", photo: team03 },
  { id: "jd", name: "J. Dovgan", role: "Brand Designer", photo: team04 },
  { id: "op", name: "O. Petrenko", role: "Growth Strategy", photo: team05 },
  { id: "mk", name: "M. Koval", role: "Client Operations", photo: team06 },
  { id: "ls", name: "L. Stein", role: "Brand Strategy", photo: team07 },
] as const;

const castCardWidth =
  "w-[min(72vw,17.5rem)] shrink-0 snap-center sm:w-[17.5rem] sm:snap-start";

function TeamGroupPhoto() {
  return (
    <figure
      className="reveal relative overflow-hidden rounded-3xl border border-[var(--rm-border-soft)]"
      data-delay="1"
    >
      <img
        src={teamGroup}
        alt="R-M team — seven senior operators"
        className="aspect-[5/3] w-full object-cover object-[center_42%] md:aspect-[21/9]"
        loading="lazy"
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent md:h-24"
        aria-hidden
      />
    </figure>
  );
}

function TeamCastRail() {
  return (
    <div className="reveal flex flex-col gap-4" data-delay="2">
      <div className="flex items-end justify-between gap-4">
        <p className={cn(textMeta, "normal-case tracking-[0.04em]")}>
          {team.length} operators
        </p>
        <p className={cn(textMeta, "hidden normal-case sm:inline")} aria-hidden>
          Scroll →
        </p>
      </div>

      <div
        className={cn(
          "-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2",
          "scroll-px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:-mx-0 md:scroll-px-0 md:px-0",
        )}
        role="list"
        aria-label="Team members"
      >
        {team.map((person, index) => (
          <figure
            key={person.id}
            role="listitem"
            className={cn(castCardWidth, "snap-always flex flex-col gap-4")}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--rm-surface-float)] ring-1 ring-[var(--rm-border-soft)]">
              <img
                src={person.photo}
                alt={`${person.name}, ${person.role}`}
                className="h-full w-full object-cover object-[center_20%]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="flex flex-col gap-1">
              <p className="text-base font-semibold leading-snug tracking-[-0.02em] text-[var(--rm-ink)]">
                {person.name}
              </p>
              <p className={textMeta}>{person.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <MarketingSection ariaLabelledBy="team-heading">
      <MarketingSectionIntro
        tag="Team"
        title="The people who ship the work."
        titleId="team-heading"
        lead={
          <p className={cn(bodyCopy, "reveal")} data-delay="1">
            Ten senior operators. Every engagement is led, not delegated.
          </p>
        }
      />

      <div className={cn("grid grid-cols-1 md:grid-cols-3 md:items-start", sectionGap)}>
        <ChapterSpacer chapter="04" className="md:self-end" />

        <div className="flex min-w-0 flex-col gap-10 md:col-span-2 md:gap-14">
          <TeamGroupPhoto />
          <TeamCastRail />
        </div>
      </div>
    </MarketingSection>
  );
}
