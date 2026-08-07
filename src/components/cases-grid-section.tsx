"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import {
  BtnArrow,
  btnOutlineOnDark,
  btnPrimarySm,
  FramerTag,
  sectionHeadline,
  sectionHeadlineLead,
  sectionInner,
  siteGutter,
} from "@/components/framer-section";
import {
  getHomeFeaturedCases,
  getCaseHomePreviewImage,
  getCaseHomePreviewPosition,
  type CaseStudy,
} from "@/lib/cases";
import { casesHomeTeaserHeaderProps } from "@/lib/cases-gallery-config";
import { cn } from "@/lib/utils";

/* ─── Constants ───────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MAX_TILT = 8; // degrees per axis — matches produx depth-warp feel

const tagContainerVariants: Variants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.065, delayChildren: 0.04 } },
};

const tagVariants: Variants = {
  rest: { opacity: 0, y: 10, filter: "blur(6px)" },
  hover: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: EASE },
  },
};

const articleVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: EASE } },
};

/* ─── Card ────────────────────────────────────────────────────────────────── */

function CaseCard({
  study,
  index,
  dimmed,
  onEnter,
  onLeave,
  aspectClass,
  revealDelay = 0,
}: {
  study: CaseStudy;
  index: number;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  aspectClass: string;
  revealDelay?: number;
}) {
  const reduced = useReducedMotion();
  const img = getCaseHomePreviewImage(study);
  const imgPos = getCaseHomePreviewPosition(study);
  const counter = String(index + 1).padStart(2, "0");
  const tags = study.coverScope ?? [];

  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["35px", "-35px"]);
  const isInView = useInView(cardRef, { once: true, amount: 0 });

  const [imgHovered, setImgHovered] = useState(false);

  // Cursor-following VIEW pill button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30 });
  // Button ~96px wide × 36px tall → offset half to center at cursor
  const btnX = useTransform(springX, v => v - 48);
  const btnY = useTransform(springY, v => v - 18);

  // 3D perspective tilt driven by cursor position (produx depth-warp approximation in CSS)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    if (!reduced) {
      // Normalize to -0.5…+0.5 relative to card center
      // CSS rotateX(-): top toward viewer  |  CSS rotateY(+): left toward viewer
      const nx = x / rect.width - 0.5;
      const ny = y / rect.height - 0.5;
      tiltX.set(ny * MAX_TILT * 2);   // cursor at top (ny<0) → negative → top toward viewer
      tiltY.set(-nx * MAX_TILT * 2);  // cursor at left (nx<0) → positive → left toward viewer
    }
  };

  const handleMouseLeave = () => {
    setImgHovered(false);
    if (!reduced) {
      tiltX.set(0);
      tiltY.set(0);
    }
  };

  return (
    <motion.article
      ref={cardRef}
      variants={articleVariants}
      initial="rest"
      whileHover={reduced ? undefined : "hover"}
      animate={
        reduced
          ? "rest"
          : {
              opacity: dimmed ? 0.5 : 1,
              filter: dimmed ? "blur(4px) brightness(0.4)" : "blur(0px) brightness(1)",
              scale: dimmed ? 0.98 : 1,
              transition: { duration: 0.45, ease: EASE },
            }
      }
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      className="group flex cursor-pointer flex-col gap-0 relative"
      onMouseMove={reduced ? undefined : handleMouseMove}
      onMouseEnter={reduced ? undefined : () => setImgHovered(true)}
      onMouseLeave={reduced ? undefined : handleMouseLeave}
      style={reduced ? undefined : {
        transformPerspective: 800,
        rotateX: springTiltX,
        rotateY: springTiltY,
      }}
    >
      {/* Cursor-following VIEW button — article-level so it's never clipped */}
      {!reduced && (
        <motion.div
          className="absolute top-0 left-0 z-30 pointer-events-none"
          style={{ x: btnX, y: btnY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: imgHovered ? 1 : 0, scale: imgHovered ? 1 : 0.85 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          <div className={cn(btnPrimarySm, "gap-2")}>
            View
            <BtnArrow />
          </div>
        </motion.div>
      )}

      {/* ── Image ─────────────────────────────── */}
      <Link
        to="/cases/$slug"
        params={{ slug: study.slug }}
        className="relative block overflow-hidden rounded-2xl"
        aria-label={`${study.client} case study`}
      >
        {/* Aspect-ratio container — clips everything */}
        <div className={cn("relative overflow-hidden", aspectClass)}>

          <motion.div className="absolute inset-0">
            {/* Reveal wrapper: clip-path + scale from bottom-left corner */}
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "0% 100%" }}
              initial={reduced ? undefined : { clipPath: "inset(100% 100% 0% 0%)", scale: 1.3 }}
              animate={
                reduced
                  ? undefined
                  : isInView
                    ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
                    : { clipPath: "inset(100% 100% 0% 0%)", scale: 1.3 }
              }
              transition={{ duration: 0.9, ease: EASE, delay: isInView ? revealDelay : 0 }}
            >
              {/* Parallax image */}
              <motion.div
                className="absolute inset-x-0 w-full"
                style={{ height: "120%", top: "-10%", y: reduced ? 0 : parallaxY }}
              >
                <img
                  src={img}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: imgPos }}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* all labels — bottom-left, stagger in on hover */}
              <motion.div
                variants={reduced ? undefined : tagContainerVariants}
                className="absolute bottom-0 left-0 m-4 z-[3] flex flex-wrap gap-1.5 pointer-events-none"
              >
                {[study.niche, study.format, ...tags].map((label) => (
                  <motion.span
                    key={label}
                    variants={reduced ? undefined : tagVariants}
                    className="inline-block rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 backdrop-blur-md rm-type-tag text-white"
                  >
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </Link>

      {/* ── Info ──────────────────────────────── */}
      <motion.div
        className="relative mt-4 flex w-full items-start gap-3"
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={
          reduced
            ? undefined
            : isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
        }
        transition={{ duration: 0.55, ease: EASE, delay: isInView ? revealDelay + 0.18 : 0 }}
      >
        <span className="rm-type-meta tabular-nums text-[var(--rm-text-ghost)] leading-none mt-[0.18em] shrink-0">
          {counter}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="m-0 leading-[1.15] text-white text-[1.45rem] font-semibold">
            {study.client}
          </h3>
          <p className="rm-type-meta m-0 mt-0.5 text-[var(--rm-text-muted)]">
            {study.primaryMetric.value}&nbsp;{study.primaryMetric.label}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ─── Grid layout ─────────────────────────────────────────────────────────── */

const CARD_LAYOUT = [
  "col-span-12 md:col-span-7",
  "col-span-12 md:col-span-4 md:col-start-9",
  "col-span-12 md:col-span-10 md:col-start-2",
] as const;

const ASPECT = [
  "aspect-[4/3] md:aspect-[3/2]",
  "aspect-[4/3]",
  "aspect-[16/7]",
] as const;

/* ─── Section ─────────────────────────────────────────────────────────────── */

export function CasesGridSection() {
  const header = casesHomeTeaserHeaderProps();
  const featuredCases = getHomeFeaturedCases();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="work"
      aria-labelledby="cases-heading"
      className={cn(
        "border-b border-[var(--rm-border-soft)] bg-black py-16 md:py-20",
        siteGutter,
      )}
    >
      <div className={sectionInner}>
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div className={cn(sectionHeadlineLead, "items-start")}>
            <div className="reveal-fade self-start">
              <FramerTag>{header.tag}</FramerTag>
            </div>
            <h2
              id="cases-heading"
              className={cn(sectionHeadline, "reveal-fade m-0 max-w-[18ch] text-balance !text-white")}
              data-delay="1"
            >
              {header.heading}
            </h2>
          </div>
          <Link
            to="/cases"
            className={cn(btnOutlineOnDark, "reveal-fade hidden md:flex group shrink-0 gap-2 self-end")}
            data-delay="1"
          >
            View all case studies
            <BtnArrow />
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-y-10 gap-x-[1.5vw] md:gap-y-14">
          {featuredCases.map((study, i) => (
            <div key={study.slug} className={cn(CARD_LAYOUT[i] ?? "col-span-12")}>
              <CaseCard
                study={study}
                index={i}
                dimmed={hoveredIndex !== null && hoveredIndex !== i}
                onEnter={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
                aspectClass={ASPECT[i] ?? "aspect-[3/2]"}
                revealDelay={i * 0.12}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end md:hidden">
          <Link to="/cases" className={cn(btnOutlineOnDark, "group gap-2")}>
            View all case studies
            <BtnArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
