import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import quoteBg from "@/assets/engage-bg.jpg";
import { sectionContainer } from "@/components/framer-section";

type TestimonialSectionProps = {
  quote?: string;
  authorName?: string;
  authorRole?: string;
};

const defaultQuote =
  "Working with Real Media has been an excellent experience for Finup. They are reliable, creative, and always professional in their approach. We’re happy to recommend them as a fantastic team to work with";

function QuoteBackground() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.img
        src={quoteBg}
        alt=""
        loading="lazy"
        style={reduce ? undefined : { y, scale: 1.12 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* base dimmer */}
      <div className="absolute inset-0 bg-[rgb(10,10,10)]/50" />
      {/* top gradient — blends into the section above */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
      {/* bottom gradient — blends into the section below */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}

export default function TestimonialSection({
  quote = defaultQuote,
  authorName = "Nikita",
  authorRole = "PR  FinUp",
}: TestimonialSectionProps) {
  return (
    <section
      aria-label="Client testimonial"
      className="relative flex min-h-[min(680px,80svh)] flex-col justify-center overflow-hidden border-b border-white/[0.06] px-6 py-24 md:px-10 md:py-32"
    >
      <QuoteBackground />

      <div className={`relative z-[1] ${sectionContainer}`}>
        <div className="flex max-w-3xl flex-col gap-10 md:gap-12">

          {/* decorative opening quote */}
          <span
            aria-hidden
            className="select-none font-semibold leading-none text-white/10"
            style={{ fontSize: "clamp(6rem, 10vw, 10rem)", lineHeight: 1, letterSpacing: "-0.05em" }}
          >
            "
          </span>

          <blockquote className="reveal -mt-6 m-0 border-0 p-0 md:-mt-8">
            <p
              className="text-balance font-semibold text-[var(--rm-ink)]"
              style={{
                fontSize: "clamp(1.35rem, 2.6vw, 2.1rem)",
                lineHeight: 1.22,
                letterSpacing: "-0.035em",
              }}
            >
              {quote}
            </p>

            <footer className="mt-10 flex items-center gap-4 md:mt-12">
              {/* thin rule */}
              <div className="h-px w-10 shrink-0 bg-white/25" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <cite className="not-italic text-sm font-semibold tracking-wide text-[var(--rm-ink)]">
                  {authorName}
                </cite>
                <span className="text-xs uppercase tracking-[0.1em] text-[var(--rm-text-muted)]">
                  {authorRole}
                </span>
              </div>
            </footer>
          </blockquote>

        </div>
      </div>
    </section>
  );
}
