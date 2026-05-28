import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

type Mode = "sprint" | "marathon";
export type ProductsCompositionProps = { mode: Mode };

function spr(frame: number, fps: number, delay = 0, stiffness = 80, damping = 30) {
  return spring({ frame: Math.max(0, frame - delay), fps, config: { stiffness, damping } });
}

function fadeIn(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

/* ─── Sprint Scene ────────────────────────────────────────── */

const SPRINT_LINES = [
  { angle: -28, delay:  0, len: 0.68, opacity: 0.22 },
  { angle: -14, delay:  8, len: 0.52, opacity: 0.16 },
  { angle:   0, delay:  4, len: 0.96, opacity: 0.38 }, // center — brightest
  { angle:  11, delay: 14, len: 0.58, opacity: 0.13 },
  { angle:  23, delay:  6, len: 0.76, opacity: 0.20 },
  { angle:  40, delay: 18, len: 0.42, opacity: 0.09 },
  { angle: -44, delay: 10, len: 0.38, opacity: 0.08 },
  { angle:  54, delay: 22, len: 0.32, opacity: 0.06 },
];

function SprintScene({ frame, fps }: { frame: number; fps: number }) {
  const { width, height } = useVideoConfig();
  const cx = width * 0.28;
  const cy = height * 0.52;

  const numOpacity = fadeIn(frame, 12, 40);
  const numScale   = spr(frame, fps, 12, 60, 28);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {SPRINT_LINES.map((l, i) => {
        const progress = spr(frame, fps, l.delay, 90, 32);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              width: `${l.len * width * 0.82}px`,
              height: 1,
              background: `linear-gradient(90deg, rgba(255,255,255,${l.opacity * 2.5}), rgba(255,255,255,0))`,
              transformOrigin: "0 50%",
              transform: `rotate(${l.angle}deg) scaleX(${progress})`,
              opacity: Math.min(1, l.opacity * 3),
            }}
          />
        );
      })}

      {/* Big background number */}
      <div
        style={{
          position: "absolute",
          right: "7%",
          top: "50%",
          transform: `translate(0, -50%) scale(${0.7 + numScale * 0.3})`,
          fontSize: "clamp(80px, 18vw, 220px)",
          fontWeight: 600,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
          opacity: numOpacity,
          fontFamily: "inherit",
          userSelect: "none",
        }}
      >
        4W
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "8%",
          opacity: fadeIn(frame, 22, 46),
          transform: `translateY(${interpolate(frame, [22, 46], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })}px)`,
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", margin: 0 }}>
          Sprint
        </p>
        <p style={{ fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,0.28)", margin: "5px 0 0", fontWeight: 300 }}>
          from 4 weeks · tactical retainer
        </p>
      </div>

      {/* Origin dot */}
      <div
        style={{
          position: "absolute",
          left: cx - 2,
          top: cy - 2,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.5)",
          opacity: fadeIn(frame, 0, 14),
        }}
      />
    </div>
  );
}

/* ─── Marathon Scene ──────────────────────────────────────── */

function MarathonScene({ frame, fps }: { frame: number; fps: number }) {
  const { width, height } = useVideoConfig();

  const pathProgress = interpolate(frame, [0, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const numOpacity = fadeIn(frame, 16, 42);
  const numScale   = spr(frame, fps, 16, 55, 32);
  const labelOpacity = fadeIn(frame, 28, 52);

  const W = width;
  const H = height;
  const cy = H * 0.5;
  const amplitude = H * 0.20;
  const frequency = (Math.PI * 2) / (W * 0.62);

  const steps = 220;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (W / steps) * i;
    const y = cy + Math.sin(x * frequency) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const d = points.join(" ");
  const totalLen = W * 1.4;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        {/* Soft glow */}
        <path
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="48"
          strokeLinecap="round"
          strokeDasharray={totalLen}
          strokeDashoffset={(1 - pathProgress) * totalLen}
        />
        {/* Main wave */}
        <path
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray={totalLen}
          strokeDashoffset={(1 - pathProgress) * totalLen}
        />
        {/* Leading highlight */}
        <path
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`30 ${totalLen}`}
          strokeDashoffset={(1 - pathProgress) * totalLen - 15}
        />
      </svg>

      {/* Big background number */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "50%",
          transform: `translate(0, -50%) scale(${0.72 + numScale * 0.28})`,
          fontSize: "clamp(80px, 18vw, 220px)",
          fontWeight: 600,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
          opacity: numOpacity,
          fontFamily: "inherit",
          userSelect: "none",
        }}
      >
        2M+
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "8%",
          textAlign: "right",
          opacity: labelOpacity,
          transform: `translateY(${interpolate(frame, [28, 52], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })}px)`,
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", margin: 0 }}>
          Marathon
        </p>
        <p style={{ fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,0.28)", margin: "5px 0 0", fontWeight: 300 }}>
          from 2 months · strategic partnership
        </p>
      </div>
    </div>
  );
}

/* ─── Root Composition ────────────────────────────────────── */

export function ProductsComposition({ mode }: ProductsCompositionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {mode === "sprint" ? (
        <SprintScene frame={frame} fps={fps} />
      ) : (
        <MarathonScene frame={frame} fps={fps} />
      )}
    </div>
  );
}
