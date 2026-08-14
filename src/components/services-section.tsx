import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { useCinemaMotion } from "@/components/home-scroll-cinema";
import { TRIGGER_VIEWPORT_MARGIN } from "@/components/motion-bits";
import { triggerPageTransition } from "@/components/page-transition";
import {
  BtnArrow,
  DURATION_ENTER,
  EASE_ENTER,
  FlipLabel,
  FramerTag,
  btnOutlineOnDark,
  btnPrimary,
  engageStepCode,
  engageStepTitle,
  interactiveSurfaceCard,
  sectionHeadline,
  sectionHeadlineAccent,
  sectionInner,
  sectionShell,
  surfaceCardShell,
  textCardBody,
  textGhost,
  textMeta,
  underlineHoverLink,
} from "@/components/framer-section";
import { homepageEngagements, type Engagement } from "@/lib/engagements";
import { cn } from "@/lib/utils";

/* ── Arrow icon for collapsed panel ────────────────────────────── */
function ExpandArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M6 18L18 6M18 6H8M18 6V16"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── "Free audit" link inside Sprint step 01 ────────────────────── */
function StepBody({
  engagementId,
  step,
}: {
  engagementId: Engagement["id"];
  step: Engagement["steps"][number];
}) {
  const isSprintAudit = engagementId === "sprint" && step.code === "01";
  if (!isSprintAudit) {
    return <p className={cn("m-0", textCardBody)}>{step.body}</p>;
  }
  return (
    <p className={cn("m-0", textCardBody)}>
      <Link
        to="/audit"
        className={cn("font-medium text-white", underlineHoverLink)}
        onClick={(e) => {
          e.preventDefault();
          triggerPageTransition("/audit");
        }}
      >
        <span className="text-[#B85821]">Free</span> audit
      </Link>
      {step.body.replace(/^free audit/i, "")}
    </p>
  );
}

/* ── Diagram data ───────────────────────────────────────────────── */
type DiagramRow = {
  code: string;
  label: string;
  tag: string;
  offsetPct: number;
  widthPct: number;
};

/* Duration sits under the label inside each bar, so bars only need to fit the
   wider of the two lines — which restores the original pronounced staircase */
const DIAGRAM_ROWS: Record<string, DiagramRow[]> = {
  sprint: [
    { code: "01", label: "Setup",    tag: "1 week",   offsetPct: 8,  widthPct: 38 },
    { code: "02", label: "Run",      tag: "2 weeks",  offsetPct: 20, widthPct: 56 },
    { code: "03", label: "Handover", tag: "1 week",   offsetPct: 55, widthPct: 45 },
  ],
  marathon: [
    { code: "01", label: "Strategy", tag: "1 month",  offsetPct: 8,  widthPct: 38 },
    { code: "02", label: "Action",   tag: "4 months", offsetPct: 18, widthPct: 58 },
    { code: "03", label: "Handover", tag: "1 month",  offsetPct: 56, widthPct: 44 },
  ],
};

/* ── Diagram component ──────────────────────────────────────────── */
function EngagementDiagram({
  engagementId,
  hoveredStep,
  onHoverStep,
}: {
  engagementId: Engagement["id"];
  hoveredStep: string | null;
  onHoverStep: (code: string | null) => void;
}) {
  const rows = DIAGRAM_ROWS[engagementId] ?? [];
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldAnimate = isInView || reduced;

  return (
    <div ref={ref} className="flex h-full flex-col justify-start py-2">
      {rows.map((row, i) => {
        // Tightened alongside itemV/NAME_RISE_MS — the whole open-card
        // reveal now settles in well under half a second instead of trailing
        // on for nearly a full second after the header's already there.
        const barDelay  = reduced ? 0 : i * 0.08;
        const codeDelay = reduced ? 0 : barDelay + 0.08;
        const lblDelay  = reduced ? 0 : barDelay + 0.22;
        const isHighlighted = hoveredStep === row.code;

        return (
          <div key={row.code}>
            {/* Row — group/row coordinates hover across code + bar */}
            <div
              className="group/row flex cursor-default items-center gap-2"
              onMouseEnter={() => onHoverStep(row.code)}
              onMouseLeave={() => onHoverStep(null)}
            >

              {/* Code — centered so vertical connector aligns, white on hover */}
              <motion.span
                className={cn(
                  engageStepCode,
                  "w-6 shrink-0 text-center tabular-nums transition-colors duration-200",
                  isHighlighted ? "!text-white" : "group-hover/row:text-white",
                )}
                initial={{ opacity: 0 }}
                animate={shouldAnimate ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: codeDelay }}
              >
                {row.code}
              </motion.span>

              {/* Track */}
              <div className="relative flex-1">
                {/* Dashed horizontal connector + chevron — draws left-to-right on row hover */}
                {row.offsetPct > 0 && (
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 flex items-center [transition:clip-path_0.6s_cubic-bezier(0.45,0,0.2,1)]",
                      isHighlighted
                        ? "[clip-path:inset(0_0%_0_0)]"
                        : "[clip-path:inset(0_100%_0_0)] group-hover/row:[clip-path:inset(0_0%_0_0)]",
                    )}
                    style={{ width: `${row.offsetPct}%`, paddingRight: "8px" }}
                  >
                    <div className="h-px flex-1 border-b border-dashed border-white/30" />
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" className="shrink-0">
                      <path
                        d="M0.5 0.5L4.5 4L0.5 7.5"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Sized bar container */}
                <div
                  style={{ marginLeft: `${row.offsetPct}%`, width: `${row.widthPct}%` }}
                  className="relative h-10 overflow-hidden rounded-[10px]"
                >
                  {/* Animated bar fill — inverts to white on hover/highlight */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-[10px] border transition-[background-color,border-color] duration-200",
                      isHighlighted
                        ? "border-white bg-white"
                        : "border-white/[0.10] bg-white/[0.07] group-hover/row:border-white group-hover/row:bg-white",
                    )}
                    initial={{ scaleX: 0 }}
                    animate={shouldAnimate ? { scaleX: 1 } : {}}
                    style={{ transformOrigin: "left" }}
                    transition={{
                      duration: reduced ? 0 : 0.45,
                      ease: EASE_ENTER,
                      delay: barDelay,
                    }}
                  />

                  {/* Label with duration underneath — text inverts to black on hover/highlight */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 flex flex-col justify-center px-3"
                    initial={{ opacity: 0 }}
                    animate={shouldAnimate ? { opacity: 1 } : {}}
                    transition={{ duration: 0.25, delay: lblDelay }}
                  >
                    <span
                      className={cn(
                        textMeta,
                        "whitespace-nowrap font-medium uppercase leading-tight tracking-wider transition-colors duration-200",
                        isHighlighted
                          ? "text-black"
                          : "text-white group-hover/row:text-black",
                      )}
                    >
                      {row.label}
                    </span>
                    <span
                      className={cn(
                        textMeta,
                        "whitespace-nowrap text-[10px] leading-tight tracking-wider transition-colors duration-200",
                        isHighlighted
                          ? "text-black/60"
                          : "text-white/20 group-hover/row:text-black/60",
                      )}
                    >
                      {row.tag}
                    </span>
                  </motion.div>
                </div>
              </div>

            </div>

            {/* Dashed vertical connector centered on code column */}
            {i < rows.length - 1 && (
              <div className="ml-3 h-5 w-0 border-l border-dashed border-white/[0.18]" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Closed → open swap timing ─────────────────────────────────── */
/* How long the closed name rises (bottom-left to top-left, within its own
   box) before the panel swaps in the open card. Kept short — this is a
   quick confirmation beat, not a scene to linger on. */
const NAME_RISE_MS = 160;
/* The open card's title sits inside its own bordered header box: outer card
   padding (20) + header box border (1) + header box padding (20) = 41px
   from the panel's corner. The closed name's box only has the outer 20px
   padding, so the risen name needs this extra nudge or it lands 21px short
   of the open title on both axes. */
const RISEN_NAME_INSET_DELTA = 21;

/* ── Animation variants ─────────────────────────────────────────── */
const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* Header appears instantly, not a fade — the risen name is already sitting
   in exactly this spot at full opacity, so fading the two independent
   elements in/out over the same span let both render at once, part-
   transparent, which read as a flicker (two slightly-misaligned copies of
   the same text ghosting over each other). A hard cut, timed to land the
   instant the closed card's own (equally instant) exit removes it, reads
   as one continuous piece of text instead. */
const headerV = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

function itemV(reduced: boolean) {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      // Tightened from 0.6s to match the swap's own pace (NAME_RISE_MS is
      // now 160ms) — the header appears instantly, so a content-row that
      // took another 600ms+ to settle read as trailing behind rather than
      // part of the same moment.
      transition: { type: "spring" as const, duration: 0.42, bounce: 0 },
    },
  };
}

/* ── Expanded (active) card ─────────────────────────────────────── */
function EngagementCardOpen({
  engagement,
  overlay = false,
}: {
  engagement: Engagement;
  /* In a panel both cards are stacked on top of each other so the outgoing
     closed card keeps its layout while it cross-fades out */
  overlay?: boolean;
}) {
  const reduced = !!useReducedMotion();
  const item = itemV(reduced);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const ctaButton = (
    <button
      onClick={() =>
        triggerPageTransition({
          to: "/contact",
          search: { engagement: engagement.id },
        })
      }
      className={cn(btnPrimary, "group gap-3")}
      aria-label={engagement.ctaLabel.replace(/ →$/, "")}
    >
      <FlipLabel text={engagement.ctaLabel.replace(/ →$/, "")} />
      <BtnArrow />
    </button>
  );

  return (
    <motion.div
      className={cn(
        "flex flex-col p-5",
        overlay ? "absolute inset-0" : "relative flex-1",
      )}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      variants={containerV}
    >
      {/* Header card — name + intro + metric in one box */}
      <motion.div variants={headerV} className="relative z-[1]">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className={cn(sectionHeadline, "m-0 text-white")}>{engagement.name}</h3>
            <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
              <span className="text-2xl font-medium tabular-nums text-white md:text-3xl">
                {engagement.metricBig}
              </span>
              <span className={cn(textMeta, textGhost)}>
                {engagement.metricUnitLabel} · {engagement.metricUnitSub}
              </span>
            </div>
          </div>
          <p className={cn("m-0 mt-2", textCardBody)}>{engagement.intro}</p>
        </div>
      </motion.div>

      {/* Content row: steps + CTA | divider | diagram */}
      <motion.div
        variants={item}
        className="relative z-[1] mt-4 flex min-h-0 flex-1 flex-col gap-4 md:flex-row md:gap-6"
      >
        {/* Left: steps + desktop CTA — CTA pinned to the card's bottom edge */}
        <div className="flex min-w-0 flex-col md:flex-[11] md:h-full md:justify-between">
          <div className="flex flex-col gap-3">
            {engagement.steps.map((step) => {
              const isStepLit = hoveredStep === step.code;
              return (
                <div
                  key={step.code}
                  className="grid cursor-default grid-cols-[auto_1fr] gap-x-2 gap-y-0.5"
                  onMouseEnter={() => setHoveredStep(step.code)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <span
                    className={cn(
                      engageStepCode,
                      "row-start-1 self-center tabular-nums transition-colors duration-200",
                      isStepLit && "!text-white",
                    )}
                  >
                    {step.code}
                  </span>
                  <span
                    className={cn(
                      engageStepTitle,
                      "row-start-1 transition-colors duration-200",
                      isStepLit && "!text-white",
                    )}
                  >
                    {step.title}
                  </span>
                  <div
                    className={cn(
                      "col-start-2 row-start-2 [&_p]:transition-colors [&_p]:duration-200",
                      isStepLit && "[&_p]:!text-white",
                    )}
                  >
                    <StepBody engagementId={engagement.id} step={step} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop CTA — 24px below the last step, not pinned to card bottom */}
          <div className="hidden pt-6 md:block">{ctaButton}</div>
        </div>

        {/* Vertical divider — desktop only */}
        <div className="hidden w-px shrink-0 bg-white/[0.08] md:block" />

        {/* Diagram — fixed height on mobile, stretch on desktop */}
        <div className="h-52 min-w-0 md:h-auto md:flex-[9] md:self-stretch">
          <EngagementDiagram
            engagementId={engagement.id}
            hoveredStep={hoveredStep}
            onHoverStep={setHoveredStep}
          />
        </div>

        {/* Mobile CTA — after diagram, mt-2 (8px) + gap-4 (16px) = 24px from diagram */}
        <div className="mt-2 md:hidden">{ctaButton}</div>
      </motion.div>
    </motion.div>
  );
}

/* ── Collapsed (inactive) card ──────────────────────────────────── */
function EngagementCardClosed({
  engagement,
  isHovered,
}: {
  engagement: Engagement;
  isHovered: boolean;
}) {
  const reduced = !!useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const liftingRef = useRef(false);
  const [riseY, setRiseY] = useState(0);

  const lifting = isHovered && !reduced;
  liftingRef.current = lifting;

  /* How far up the row needs to translate to land RISEN_NAME_INSET_DELTA+20
     (41px, matching the open title's inset) from the wrap's top — measured
     directly (not reconstructed from padding/gap math) so it stays correct
     regardless of content length. Framer's `layout` prop was tried here
     first, but it doesn't honor a configured transition duration for this
     kind of change — the position snapped in ~100ms no matter what duration
     was set. A plain animate={{ x, y }} tween (like the rest of this
     codebase already uses) respects duration properly, so measuring once
     and animating manually is the reliable path — safe now that the panel
     itself no longer resizes during the rise (that resize is deferred to
     the swap, see handleMouseEnter). */
  useEffect(() => {
    const wrap = wrapRef.current;
    const row = rowRef.current;
    if (!wrap || !row) return;

    const measure = () => {
      if (liftingRef.current) return;
      const restTop = row.getBoundingClientRect().top - wrap.getBoundingClientRect().top;
      setRiseY(RISEN_NAME_INSET_DELTA + 20 - restTop);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      className="absolute inset-0 flex flex-col items-start justify-end p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      // Instant, not a fade — by the time this unmounts, the risen name is
      // the only thing still visible (arrow/time already faded during the
      // rise), sitting exactly where the open card's own title is about to
      // appear. Fading it out while the open title fades in doubled the
      // same text on top of itself for a beat, which read as a flicker.
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
    >
      <motion.div
        ref={rowRef}
        className="flex items-end gap-2"
        animate={{
          x: lifting ? RISEN_NAME_INSET_DELTA : 0,
          y: lifting ? riseY : 0,
        }}
        transition={{ duration: NAME_RISE_MS / 1000, ease: EASE_ENTER }}
      >
        <motion.span
          className={cn(sectionHeadline, "whitespace-nowrap")}
          animate={{ color: lifting ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {engagement.name}
        </motion.span>

        {/* Not present in the open card — fades out as the name lifts */}
        <motion.span
          className="mb-1 text-white/30"
          animate={{ opacity: lifting ? 0 : 1 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <ExpandArrow />
        </motion.span>
      </motion.div>

      {/* Sits elsewhere in the open card — fades out as the name lifts */}
      <motion.span
        className={cn(textMeta, textGhost, "mt-2")}
        animate={{ opacity: lifting ? 0 : 1 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        {engagement.time}
      </motion.span>
    </motion.div>
  );
}

/* ── Glass tint per format — distinct glow colour per engagement so the two
   read apart even collapsed, when there's no other differentiator on screen. */
const PANEL_TINT: Record<Engagement["id"], string> = {
  sprint: "radial-gradient(130% 130% at 100% 0%, rgba(229,196,151,0.32), transparent 60%)",
  marathon: "radial-gradient(130% 130% at 100% 0%, rgba(184,88,33,0.32), transparent 60%)",
};

/* Cards weren't animating in at all on scroll — only their open/closed swap
   animated. Sprint arrives first, Marathon a touch after. */
const PANEL_ENTRANCE_DELAY: Record<Engagement["id"], number> = {
  sprint: 0,
  marathon: 0.32,
};

/* ── Per-panel wrapper — owns hover state + expansion timeout ───── */
function EngagementPanel({
  engagement,
  isActive,
  entered,
  onExpand,
}: {
  engagement: Engagement;
  isActive: boolean;
  entered: boolean;
  onExpand: () => void;
}) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Glow lives on the panel (not the card) so it survives the open/closed swap —
     position + opacity are already correct the moment the open card mounts */
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const trackPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    trackPointer(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) {
      if (!isActive) onExpand();
      return;
    }
    /* Seed the glow before expansion so it's already lit when the open card mounts */
    trackPointer(e);
    glowOpacity.set(1);
    if (isActive) return;
    setIsHovered(true);
    /* Panels are stacked now, not side by side — growth changes HEIGHT, not
       width. Triggering that growth immediately (as the old side-by-side
       version did, to make horizontal room for the widening name) fights the
       rise: the name's target offset is computed once from its resting flow
       position, but that position keeps drifting as the box resizes under it
       mid-animation, so it barely appears to move until everything snaps at
       the swap. Deferring growth to the same moment as the content swap keeps
       the box height stable for the full rise, so the translate lands exactly
       on the open card's title slot. */
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      onExpand();
    }, NAME_RISE_MS);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!reduce) animate(glowOpacity, 0, { duration: 0.5, ease: "easeOut" });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce || entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: DURATION_ENTER,
        ease: EASE_ENTER,
        delay: PANEL_ENTRANCE_DELAY[engagement.id],
      }}
      className={cn(
        surfaceCardShell,
        "relative flex flex-col border-white/[0.08] bg-white/[0.05] backdrop-blur-xl backdrop-saturate-150 hover:border-[var(--rm-border-strong)] hover:bg-white/[0.07]",
        !isActive && interactiveSurfaceCard,
      )}
      style={{
        backgroundImage: PANEL_TINT[engagement.id],
        flexGrow: isActive ? 4 : 1,
        flexShrink: 0,
        flexBasis: 0,
        /* Growth starts right at the swap (see handleMouseEnter) and is the
           slowest piece here on purpose — the content inside settles in
           under half a second, so the box finishing its resize a little
           after gives the whole thing a "content arrives, box catches up"
           feel instead of everything stopping at once. */
        transition:
          "flex-grow 0.6s cubic-bezier(0.65, 0, 0.25, 1), border-color 200ms ease-out, background-color 200ms ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor glow — bleeds to card edges so the border area brightens.
          Shows on hover before the card is even active, not just once open —
          the glow motion values were already being seeded on mouseenter
          regardless, so gating the visible element to isActive-only meant
          hovering a closed card gave no glow feedback at all until the swap
          finished; now the very first touch of the card lights it up. */}
      {!reduce && (isActive || isHovered) && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.17) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
            filter: "blur(52px)",
            opacity: glowOpacity,
            zIndex: 0,
          }}
        />
      )}

      <AnimatePresence mode="sync" initial={false}>
        {isActive ? (
          <EngagementCardOpen key={`open-${engagement.id}`} engagement={engagement} overlay />
        ) : (
          <EngagementCardClosed
            key={`closed-${engagement.id}`}
            engagement={engagement}
            isHovered={isHovered}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Shared body — heading, both breakpoint card layouts, compare CTA.
   Reused by the pinned (desktop, motion-enabled) and static (mobile /
   reduced-motion) shells below, which differ only in how `active` is driven. */
function EngagementBody({
  active,
  cardsReady,
  onExpand,
}: {
  active: "sprint" | "marathon";
  cardsReady: boolean;
  onExpand: (id: "sprint" | "marathon") => void;
}) {
  const reduce = Boolean(useReducedMotion());
  return (
    // Below lg: heading above, cards stacked below (unchanged). At lg+: a
    // 35/65 split — copy sits top-left with its own CTA, while the cards
    // stack one above the other on the right, at full height, same scroll pin.
    <div className={cn(sectionInner, "flex h-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8")}>
      <div className="flex shrink-0 flex-col items-center gap-2 text-center lg:w-[35%] lg:items-start lg:justify-start lg:text-left">
        <div className="reveal">
          <FramerTag>Engagement formats</FramerTag>
        </div>
        <h2
          id="engage-heading"
          className={cn(sectionHeadline, "reveal m-0 text-white lg:max-w-none")}
          data-delay="1"
        >
          <span className="block">Two ways to work with us.</span>
          <span className={sectionHeadlineAccent}>Both end in shipped revenue.</span>
        </h2>
        <div className="reveal" data-delay="2">
          <button
            onClick={() => triggerPageTransition("/products")}
            className={cn(btnOutlineOnDark, "group mt-2 gap-3")}
            aria-label="Compare formats"
          >
            <FlipLabel text="Compare formats" />
            <BtnArrow />
          </button>
        </div>
      </div>

      {/* Cards claim the rest of the pinned viewport instead of sitting at a
          short fixed height with dead space around them — stacked one above
          the other, not side by side, to match the narrower right column. */}
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="hidden min-h-0 flex-1 lg:flex lg:flex-col lg:gap-4">
          {homepageEngagements.map((engagement) => (
            <EngagementPanel
              key={engagement.id}
              engagement={engagement}
              isActive={engagement.id === active}
              entered={reduce || cardsReady}
              onExpand={() => onExpand(engagement.id as "sprint" | "marathon")}
            />
          ))}
        </div>

        {/* Below lg: stacked full-width cards, both always open */}
        <div className="flex flex-col gap-4 lg:hidden">
          {homepageEngagements.map((engagement) => (
            <motion.div
              key={engagement.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce || cardsReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: DURATION_ENTER,
                ease: EASE_ENTER,
                delay: PANEL_ENTRANCE_DELAY[engagement.id],
              }}
              className={cn(surfaceCardShell, "flex flex-col")}
            >
              <EngagementCardOpen engagement={engagement} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Pinned (desktop, motion-enabled) — the section locks to screen-center;
   scrolling further inside the pin opens Marathon before the page is allowed
   to scroll past into the next section. Scrolling back up reverses it.
   `active` only flips when scroll actually CROSSES the 0.5 midpoint (tracked
   via lastProgressRef), not on every progress tick re-derived from scratch —
   otherwise a manual hover-open (via onExpand) gets clobbered by the very
   next scroll event, since that old per-tick version always overwrote
   `active` from the raw threshold regardless of how it got set. Crossing
   detection lets a manual open stick through scroll jitter, and still
   reverses correctly when re-entering from the section below and scrolling
   back up through the same midpoint. */
function PinnedEngagementStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Cards live inside a pinned h-screen section — once pinned, a card's own
  // position relative to the viewport is fixed for the whole scroll range
  // (Marathon's collapsed panel sits low in that fixed frame), so a
  // per-card whileInView keyed to its own box crossing a trigger line can
  // permanently never fire for whichever card lands below that line. Gate
  // both cards on the WRAPPER approaching into view instead — that 200vh
  // box moves normally through scroll right up until the instant it pins.
  // Same margin as the copy column's .reveal (TRIGGER_VIEWPORT_MARGIN) —
  // without it this fired the instant any sliver of the 200vh wrapper
  // touched the viewport, well before the copy's own trigger line, so the
  // cards visibly started revealing before the "Two ways to work with us"
  // heading did.
  const cardsReady = useInView(wrapRef, { once: true, amount: 0.1, margin: TRIGGER_VIEWPORT_MARGIN });
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const [active, setActive] = useState<"sprint" | "marathon">("sprint");
  const lastProgressRef = useRef(0);

  useMotionValueEvent(progress, "change", (v) => {
    const prev = lastProgressRef.current;
    lastProgressRef.current = v;
    if (prev < 0.5 && v >= 0.5) {
      setActive("marathon");
    } else if (prev >= 0.5 && v < 0.5) {
      setActive("sprint");
    }
  });

  return (
    <div ref={wrapRef} className="relative h-[200vh] bg-black">
      <section
        id="engage"
        aria-labelledby="engage-heading"
        className={cn(
          sectionShell,
          // Top padding stays sectionShell's own py-20 — that's what clears the
          // fixed site header. Bottom has nothing to clear, so it's cut down
          // to reclaim height for the cards, which is the whole point here.
          // Needs the md: variant too — sectionShell sets padding-bottom via
          // "md:py-20", and Tailwind's cascade always places responsive rules
          // after base ones in the compiled sheet, so an unprefixed override
          // alone loses to md:py-20 at desktop widths.
          "pb-2 md:pb-2",
          // border-b-0 — Cases Grid (next chapter) is bg-black edge-to-edge too;
          // sectionShell's border would show as a stray line across continuous black.
          "border-b-0 engage-in-view sticky top-0 flex h-screen overflow-hidden bg-black",
        )}
      >
        <EngagementBody active={active} cardsReady={cardsReady} onExpand={setActive} />
      </section>
    </div>
  );
}

/* ── Static fallback (mobile / reduced motion) — same position-based toggle
   as before, no pin. */
function StaticEngagementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(() => !!reduce);
  const [active, setActive] = useState<"sprint" | "marathon">("sprint");

  useEffect(() => {
    if (reduce) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  /* Scroll-scrubbed toggle: Sprint stays active while the section's midpoint
     is still below the viewport's midpoint (i.e. while the user is scrolling
     up to and through the section's center). Once the user keeps scrolling
     down past that center, Marathon takes over; scrolling back above it
     reverts to Sprint. Position-based, not direction-based — independent of
     hover, and self-correcting on scroll direction changes. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let ticking = false;

    const evaluate = () => {
      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      setActive(sectionCenter < viewportCenter ? "marathon" : "sprint");
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        evaluate();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engage"
      aria-labelledby="engage-heading"
      className={cn(
        sectionShell,
        // border-b-0 — Cases Grid (next chapter) is bg-black edge-to-edge too;
        // sectionShell's border would show as a stray line across continuous black.
        "border-b-0 relative overflow-hidden bg-black",
        inView && "engage-in-view",
      )}
    >
      <EngagementBody active={active} cardsReady={inView} onExpand={setActive} />
    </section>
  );
}

/* ── Main section ───────────────────────────────────────────────── */
export function ServicesSection() {
  const cinemaEnabled = useCinemaMotion();
  return cinemaEnabled ? <PinnedEngagementStage /> : <StaticEngagementSection />;
}
