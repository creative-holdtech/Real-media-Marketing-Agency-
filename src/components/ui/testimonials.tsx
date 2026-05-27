import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import quoteBg from "@/assets/engage-bg.jpg";

type TestimonialSectionProps = {
  quote?: string;
  authorName?: string;
  authorRole?: string;
};

const defaultQuote =
  "Working with Real Media has been an excellent experience for Finup. They are reliable, creative, and always professional in their approach. We're happy to recommend them as a fantastic team to work with";

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
      <div className="absolute inset-0 bg-[rgb(10,10,10)]/40" />
    </div>
  );
}

export default function TestimonialSection({
  quote = defaultQuote,
  authorName = "Nikita PR",
  authorRole = "FinUp",
}: TestimonialSectionProps) {
  return (
    <section
      aria-label="Client testimonial"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 py-16 sm:px-10 md:px-10 md:py-20"
    >
      <QuoteBackground />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1520px] flex-col gap-10 md:gap-12">
        <div className="reveal grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-5">
          <div className="hidden md:block" aria-hidden />

          <div className="flex flex-col gap-10 md:col-span-2 md:gap-12">
            <div
              className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 text-sm font-semibold tracking-[-0.04em] text-white backdrop-blur-sm"
              aria-hidden
            >
              F
            </div>

            <blockquote className="m-0 border-0 p-0">
              <p className="text-balance text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1em] tracking-[-0.05em] text-white md:text-[48px]">
                “{quote}
              </p>
            </blockquote>
          </div>
        </div>

        <div className="reveal grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5" data-delay="1">
          <div className="hidden md:block" aria-hidden />

          <footer className="flex flex-col gap-1 md:col-span-2">
            <cite className="not-italic text-[22px] font-medium leading-[1.3] tracking-[-0.04em] text-white md:text-[28px]">
              {authorName}
            </cite>
            <p className="text-[18px] font-medium leading-[1.3] tracking-[-0.04em] text-white/80 md:text-[20px]">
              {authorRole}
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
