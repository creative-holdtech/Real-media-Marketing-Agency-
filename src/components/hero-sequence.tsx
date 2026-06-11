import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

function spr(frame: number, fps: number, delay = 0, stiffness = 68, damping = 24) {
  return spring({ frame: Math.max(0, frame - delay), fps, config: { stiffness, damping } });
}

function fadeIn(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

const LINE1 = ["Choose", "the", "level"];
const LINE2 = ["of", "support", "you", "need"];

const WORD_STYLE: React.CSSProperties = {
  display: "inline-block",
  fontSize: 64,
  fontWeight: 500,
  letterSpacing: "-0.045em",
  lineHeight: 0.94,
  color: "#fff",
  marginRight: "0.22em",
};

export function HeroSequence() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        background: "transparent",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Line 1: "Choose the level" */}
        <div style={{ display: "block", marginBottom: 6 }}>
          {LINE1.map((word, i) => {
            const delay = i * 7;
            const prog = spr(frame, fps, delay);
            const op = fadeIn(frame, delay, delay + 15);
            return (
              <span
                key={word}
                style={{
                  ...WORD_STYLE,
                  opacity: op,
                  transform: `translateY(${(1 - prog) * 24}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Line 2: "of support you need" + "right now." */}
        <div style={{ display: "block" }}>
          {LINE2.map((word, i) => {
            const delay = 22 + i * 7;
            const prog = spr(frame, fps, delay);
            const op = fadeIn(frame, delay, delay + 15);
            return (
              <span
                key={word}
                style={{
                  ...WORD_STYLE,
                  opacity: op,
                  transform: `translateY(${(1 - prog) * 24}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
          {/* "right now." — lighter weight, slightly delayed */}
          {(() => {
            const delay = 52;
            const prog = spr(frame, fps, delay, 58, 26);
            const op = fadeIn(frame, delay, delay + 18);
            return (
              <span
                style={{
                  ...WORD_STYLE,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.48)",
                  marginRight: 0,
                  opacity: op,
                  transform: `translateY(${(1 - prog) * 20}px)`,
                }}
              >
                right now.
              </span>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
