import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { triggerPageTransition } from "@/components/page-transition";
import {
  BtnArrow,
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
        className="font-medium text-white underline decoration-white/30 underline-offset-[3px] transition-colors duration-200 hover:decoration-white/70"
        onClick={(e) => {
          e.preventDefault();
          triggerPageTransition("/audit");
        }}
      >
        Free audit
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
        const barDelay  = reduced ? 0 : i * 0.14;
        const codeDelay = reduced ? 0 : barDelay + 0.12;
        const lblDelay  = reduced ? 0 : barDelay + 0.40;
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
                      duration: reduced ? 0 : 0.65,
                      ease: [0.22, 1, 0.36, 1],
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

/* ── Closed → open morph timing ─────────────────────────────────── */
/* How long the closed name takes to rise into the open card's title slot.
   The panel swaps in the open card only once the name has landed. */
const NAME_RISE_MS = 480;
/* Where the open card's title sits, measured from the panel's padding edge:
   card padding (20) + header box border (1) + header box padding (20).
   Padding is symmetric (p-5 on both the card and the header box), so this
   same figure applies to the left inset too — the risen name has to shift
   right by this delta or it lands 21px off from the open title on the x-axis. */
const OPEN_TITLE_TOP = 41;
const OPEN_TITLE_LEFT = OPEN_TITLE_TOP;

/* ── Animation variants ─────────────────────────────────────────── */
const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* Header fades straight in with no offset so it cross-fades cleanly with the
   closed card's risen name, which is already sitting in exactly this spot */
const headerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const } },
};

function itemV(reduced: boolean) {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, duration: 0.6, bounce: 0 },
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
    >
      {engagement.ctaLabel.replace(/ →$/, "")}
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
        {/* Left: steps + desktop CTA */}
        <div className="flex min-w-0 flex-col md:flex-[11]">
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
          <div className="mt-6 hidden md:block">{ctaButton}</div>
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
  const nameRef = useRef<HTMLSpanElement>(null);
  const liftingRef = useRef(false);

  /* The name renders at the open card's exact type size and is scaled down at
     rest, so hovering only has to animate it back to scale 1 — the landing
     size then matches the open title pixel for pixel. */
  const [morph, setMorph] = useState({ rise: 0, shiftX: 0, rest: 0.7 });

  liftingRef.current = isHovered && !reduced;

  useEffect(() => {
    const wrap = wrapRef.current;
    const row = rowRef.current;
    const name = nameRef.current;
    if (!wrap || !row || !name) return;

    const measure = () => {
      if (liftingRef.current) return;
      const avail = wrap.clientWidth - 40; /* container p-5 */
      const natural = name.scrollWidth || 1;
      const ARROW = 28; /* icon + gap */
      setMorph({
        rise: OPEN_TITLE_TOP - row.offsetTop,
        shiftX: OPEN_TITLE_LEFT - row.offsetLeft,
        rest: Math.max(0.5, Math.min(0.8, (avail - ARROW) / natural)),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const lifting = isHovered && !reduced;

  return (
    <motion.div
      ref={wrapRef}
      className="absolute inset-0 flex flex-col items-start justify-end p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
    >
      {/* Name — rises into the open card's title slot and grows to its size */}
      <motion.div
        ref={rowRef}
        className="flex items-end gap-2"
        style={{ transformOrigin: "left bottom" }}
        animate={{
          x: lifting ? morph.shiftX : 0,
          y: lifting ? morph.rise : 0,
          scale: lifting ? 1 : morph.rest,
        }}
        transition={{ duration: NAME_RISE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Same type ramp as the open card's title — no overrides, so the
            two line boxes coincide exactly at the end of the rise */}
        <motion.span
          ref={nameRef}
          className={cn(sectionHeadline, "whitespace-nowrap")}
          animate={{ color: lifting ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {engagement.name}
        </motion.span>

        {/* Not present in the open card — fades out as the name lifts */}
        <motion.span
          className="mb-1 text-white/30"
          animate={{ opacity: lifting ? 0 : 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <ExpandArrow />
        </motion.span>
      </motion.div>

      {/* Sits elsewhere in the open card — fades out as the name lifts */}
      <motion.span
        className={cn(textMeta, textGhost, "mt-2")}
        animate={{ opacity: lifting ? 0 : 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {engagement.time}
      </motion.span>
    </motion.div>
  );
}

/* ── Per-panel wrapper — owns hover state + expansion timeout ───── */
function EngagementPanel({
  engagement,
  isActive,
  isGrown,
  onPending,
  onCancel,
  onExpand,
}: {
  engagement: Engagement;
  isActive: boolean;
  isGrown: boolean;
  onPending: () => void;
  onCancel: () => void;
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
    /* Start widening straight away: the name grows to the open title's size as
       it rises, which needs more room than the collapsed panel has. The content
       itself only swaps once the name has landed. */
    onPending();
    /* Don't reset isHovered before onExpand — avoids the brief name "snap back"
       because the card unmounts immediately when onExpand changes active state */
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
      onCancel();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={cn(
        surfaceCardShell,
        "relative flex flex-col hover:border-[var(--rm-border-strong)]",
        !isActive && interactiveSurfaceCard,
      )}
      style={{
        flexGrow: isGrown ? 4 : 1,
        flexShrink: 0,
        flexBasis: 0,
        /* Slow off the mark so the panel barely moves while the name rises,
           then carries the rest of the expansion after the content swaps */
        transition:
          "flex-grow 0.9s cubic-bezier(0.65, 0, 0.25, 1), border-color 200ms ease-out, background-color 200ms ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor glow — bleeds to card edges so the border area brightens */}
      {!reduce && isActive && (
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
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────────── */
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(() => !!reduce);
  const [active, setActive] = useState<"sprint" | "marathon">("sprint");
  /* Panel that has started widening but whose content hasn't swapped in yet */
  const [pending, setPending] = useState<"sprint" | "marathon" | null>(null);
  const grownId = pending ?? active;

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
      setPending(null);
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
        "relative overflow-hidden bg-black",
        inView && "engage-in-view",
      )}
    >
      <div className={cn(sectionInner, "flex flex-col gap-10 md:gap-14")}>

        {/* Centered heading — gap-2 matches case studies section tag→headline spacing */}
        <div className="flex flex-col items-center gap-2 text-center">
          <FramerTag>Engagement formats</FramerTag>
          <h2
            id="engage-heading"
            className={cn(sectionHeadline, "m-0 max-w-[22ch] text-white")}
          >
            <span className="block">Two ways to work with us.</span>
            <span className={sectionHeadlineAccent}>Both end in shipped revenue.</span>
          </h2>
        </div>

        {/* Cards + Compare button */}
        <div className="flex flex-col gap-6">

          {/* Desktop panels — fixed height prevents section jumps when switching cards.
              Content-hugging height (steps + 24px CTA gap) is flat across lg–2xl. */}
          <div className="hidden h-[536px] lg:flex lg:gap-3">
            {homepageEngagements.map((engagement) => (
              <EngagementPanel
                key={engagement.id}
                engagement={engagement}
                isActive={engagement.id === active}
                isGrown={engagement.id === grownId}
                onPending={() => setPending(engagement.id as "sprint" | "marathon")}
                onCancel={() => setPending(null)}
                onExpand={() => {
                  setActive(engagement.id as "sprint" | "marathon");
                  setPending(null);
                }}
              />
            ))}
          </div>

          {/* Below lg: stacked full-width cards, both always open */}
          <div className="flex flex-col gap-4 lg:hidden">
            {homepageEngagements.map((engagement) => (
              <div key={engagement.id} className={cn(surfaceCardShell, "flex flex-col")}>
                <EngagementCardOpen engagement={engagement} />
              </div>
            ))}
          </div>

          {/* Compare formats — centered below cards, 24px gap */}
          <div className="flex justify-center">
            <button
              onClick={() => triggerPageTransition("/products")}
              className={cn(btnOutlineOnDark, "group gap-3")}
            >
              Compare formats
              <BtnArrow />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
