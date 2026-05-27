import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import quoteBg from "@/assets/engage-bg.jpg";
import { sectionHeadline } from "@/components/framer-section";

type TestimonialSectionProps = {
  quote?: string;
  authorName?: string;
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
  authorName = "Nikita PR FinUp",
}: TestimonialSectionProps) {
  return (
    <section
      aria-label="Client testimonial"
      className="relative flex min-h-[min(720px,85svh)] flex-col justify-end overflow-hidden border-b border-white/10 px-5 py-16 md:px-10 md:py-20"
    >
      <QuoteBackground />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1280px] flex-col gap-8 md:gap-10">
        <div className="reveal grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-5">
          <div className="hidden md:block" aria-hidden />

          <div className="flex flex-col gap-10 md:col-span-2 md:gap-12">
            <div
              className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 text-sm font-semibold tracking-[-0.04em] text-white backdrop-blur-sm"
              aria-hidden
            >
              F
            </div>

            <blockquote className="m-0 max-w-prose border-0 p-0">
              <p className={`text-balance ${sectionHeadline} leading-[1.2] text-white`}>
                “{quote}
              </p>
            </blockquote>
          </div>
        </div>

        <div className="reveal grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5" data-delay="1">
          <div className="hidden md:block" aria-hidden />

          <footer className="flex flex-col gap-1 md:col-span-2">
            <cite className="not-italic text-lg font-medium leading-relaxed tracking-[-0.02em] text-white md:text-xl">
              {authorName}
            </cite>
          </footer>
        </div>
      </div>
    </section>
  );
}
