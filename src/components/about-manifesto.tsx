import { Link } from "@tanstack/react-router";

import {
  BtnArrow,
  FlipLabel,
  FramerTag,
  btnPrimary,
  sectionActionsOffset,
  sectionHeadline,
  sectionHeadlineAccent,
  sectionHeadlineLead,
  sectionLeadStack,
} from "@/components/framer-section";
import { cn } from "@/lib/utils";

type AboutManifestoSectionProps = {
  tag: string;
  titleId: string;
  thesis: string;
  bullets: readonly string[];
};

/**
 * About manifesto — dark band. Keeps the page in the same black editorial
 * system as the home page while letting the statement breathe.
 * Spacing: Pattern B (tag → h2 gap-6 → standfirst gap-4 → CTA mt-8).
 */
export function AboutManifestoSection({
  tag,
  titleId,
  thesis,
  bullets,
}: AboutManifestoSectionProps) {
  const [correction, ...rest] = bullets;
  const standfirst = rest.join(" ");

  return (
    <section
      aria-labelledby={titleId}
      className="rm-manifesto-light relative z-[2] overflow-hidden bg-black px-6 md:px-10"
    >
      <div aria-hidden className="rm-manifesto-light__grain" />
      <div className="relative z-[1] mx-auto flex w-full max-w-[var(--rm-grid-max)] flex-col items-center py-16 text-center md:py-20">
        <div className={cn(sectionHeadlineLead, "items-center")}>
          <div className="reveal" data-delay="0">
            <FramerTag className="border-white/10 text-[var(--rm-text-muted)]">{tag}</FramerTag>
          </div>

          <div className={cn(sectionLeadStack, "items-center")}>
            <h2
              id={titleId}
              className={cn(sectionHeadline, "reveal m-0 max-w-[22ch] text-balance text-center")}
              data-delay="1"
            >
              <span className="block text-white">{thesis}</span>
              {correction ? (
                <span className={cn("block", sectionHeadlineAccent)}>{correction}</span>
              ) : null}
            </h2>

            {standfirst ? (
              <p
                className="reveal rm-copy-standfirst m-0 max-w-[46ch] text-pretty text-[var(--rm-text-body)]"
                data-delay="2"
              >
                {standfirst}
              </p>
            ) : null}
          </div>
        </div>

        <div className={cn("reveal", sectionActionsOffset)} data-delay="3">
          <Link to="/audit" className={cn(btnPrimary, "group gap-2")} aria-label="Book free audit">
            <FlipLabel text="Book free audit" />
            <BtnArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
