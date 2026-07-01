import { useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

import teamGroup from "@/assets/team-group.jpg";
import { FramerTag } from "@/components/framer-section";
import { MarketingSection } from "@/components/marketing-section";
import { TextReveal } from "@/components/text-reveal";
import { aboutTeam } from "@/content/about";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  The real R—M studio cast, presented as one luminous ensemble shot. */
/*  `feature`  → cinematic establishing frame on /about                */
/*  `banner`   → closing full-bleed band on /contact                   */
/* ------------------------------------------------------------------ */

const roster = aboutTeam.members.map((m) => m.name);

const cinematicEase = [0.16, 1, 0.3, 1] as const;

type EnsembleCopy = {
  tag: string;
  title: string;
  lead?: string;
  caption: string;
};

const featureCopy: EnsembleCopy = {
  tag: "The collective",
  title: "Seven operators. One narrative.",
  lead: "No outsourced pods, no anonymous freelancers. The people in this room are the people on your account.",
  caption: "In-house, senior, accountable",
};

const bannerCopy: EnsembleCopy = {
  tag: "Behind R—M",
  title: "Real people behind the work.",
  caption: "The team you'll actually be talking to",
};

export function TeamEnsemble({ variant = "feature" }: { variant?: "feature" | "banner" }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const copy = variant === "feature" ? featureCopy : bannerCopy;

  // Scroll parallax across the full viewport pass.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.02]);

  // Pointer parallax (desktop only — springs idle at 0 otherwise).
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 22, mass: 0.4 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 22, mass: 0.4 });
  const tiltX = useTransform(pointerY, [-0.5, 0.5], ["1.4deg", "-1.4deg"]);
  const tiltY = useTransform(pointerX, [-0.5, 0.5], ["-1.8deg", "1.8deg"]);
  const shiftX = useTransform(pointerX, [-0.5, 0.5], ["-1.4%", "1.4%"]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY, reduce],
  );
  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const frameStyle: MotionStyle = reduce
    ? {}
    : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 };

  const frame = (
    <motion.div
      ref={frameRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={frameStyle}
      className={cn(
        "rm-ensemble__frame group",
        variant === "feature" ? "rm-ensemble__frame--feature" : "rm-ensemble__frame--banner",
      )}
      initial={reduce ? false : { clipPath: "inset(14% 10% 14% 10% round 28px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduce ? 0 : 1.15, ease: cinematicEase }}
    >
      <motion.img
        src={teamGroup}
        alt="The R—M studio team, photographed together in studio."
        width={1100}
        height={825}
        decoding="async"
        loading="lazy"
        className="rm-ensemble__img"
        style={reduce ? undefined : { y: imageY, scale: imageScale, x: shiftX }}
      />
      <span aria-hidden className="rm-ensemble__grain" />
      <span aria-hidden className="rm-ensemble__scrim" />
      <span aria-hidden className="rm-ensemble__sheen" />

      <div className="rm-ensemble__caption">
        <p className="rm-ensemble__caption-label">{copy.caption}</p>
        <ul className="rm-ensemble__roster" aria-label="Team members">
          {roster.map((name, i) => (
            <motion.li
              key={name}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : 0.55 + i * 0.06,
                ease: cinematicEase,
              }}
            >
              {name}
              {i < roster.length - 1 ? (
                <span aria-hidden className="rm-ensemble__sep">
                  /
                </span>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  if (variant === "banner") {
    return (
      <section
        ref={sectionRef}
        aria-labelledby="ensemble-banner-heading"
        className="rm-ensemble rm-ensemble--banner"
      >
        <div className="rm-ensemble__banner-shell">
          <div className="rm-ensemble__banner-intro">
            <p className="reveal w-fit">
              <FramerTag>{copy.tag}</FramerTag>
            </p>
            <TextReveal
              id="ensemble-banner-heading"
              text={copy.title}
              className="rm-ensemble__title"
            />
          </div>
          {frame}
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef}>
      <MarketingSection
        ariaLabelledBy="ensemble-heading"
        className="rm-ensemble rm-ensemble--feature"
      >
        <div className="mx-auto mb-10 flex w-full max-w-[44rem] flex-col items-center text-center md:mb-14">
          <p className="reveal mb-6 w-fit md:mb-8">
            <FramerTag>{copy.tag}</FramerTag>
          </p>
          <TextReveal id="ensemble-heading" text={copy.title} className="rm-ensemble__title" />
          {copy.lead ? (
            <p
              className="reveal mt-7 max-w-[42ch] text-balance text-[15px] leading-relaxed text-white/65 md:text-[16px]"
              data-delay="1"
            >
              {copy.lead}
            </p>
          ) : null}
        </div>
        {frame}
      </MarketingSection>
    </div>
  );
}
