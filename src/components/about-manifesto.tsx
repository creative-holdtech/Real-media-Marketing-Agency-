import { Link } from "@tanstack/react-router";

import { BtnArrow, FramerTag, btnPrimary } from "@/components/framer-section";
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
      <div aria-hidden className="rm-products-glow" />
      <div aria-hidden className="rm-manifesto-light__grain" />
      <div className="relative z-[1] mx-auto flex w-full max-w-[var(--rm-grid-max)] flex-col items-center pb-16 pt-16 text-center md:pb-24 md:pt-24">
        <div className="reveal" data-delay="0">
          <FramerTag className="border-white/10 text-[var(--rm-text-muted)]">{tag}</FramerTag>
        </div>

        <h2 id={titleId} className="reveal rm-manifesto-light__statement mt-6" data-delay="1">
          <span className="block text-white">{thesis}</span>
          {correction ? (
            <span className="block text-[var(--rm-text-subtle)]">{correction}</span>
          ) : null}
        </h2>

        {standfirst ? (
          <p
            className="reveal rm-copy-standfirst mt-6 max-w-[46ch] text-pretty text-[var(--rm-text-body)]"
            data-delay="2"
          >
            {standfirst}
          </p>
        ) : null}

        <div className="reveal mt-8" data-delay="3">
          <Link to="/audit" className={cn(btnPrimary, "group gap-2")}>
            Book free audit
            <BtnArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
