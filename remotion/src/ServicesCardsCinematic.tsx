import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ServiceCardFrame } from "./components/ServiceCardFrame";
import { SERVICE_CARDS } from "./data/services";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);

export const FPS = 30;
export const GRID_START = 78;
export const CARD_STAGGER = 11;
export const HOLD_END = 42;
export const DURATION =
  GRID_START + SERVICE_CARDS.length * CARD_STAGGER + 50 + HOLD_END;

const IntroCopy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });
  const tagY = interpolate(frame, [0, 0.5 * fps], [-12, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });

  const line1Opacity = interpolate(frame, [0.35 * fps, 1.1 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });
  const line1Y = interpolate(frame, [0.35 * fps, 1.1 * fps], [36, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });

  const line2Opacity = interpolate(frame, [0.95 * fps, 1.75 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE_OUT,
  });
  const line2Y = interpolate(frame, [0.95 * fps, 1.75 * fps], [28, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE_OUT,
  });

  const introOpacity = interpolate(frame, [2.1 * fps, 2.6 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });

  return (
    <div
      style={{
        opacity: introOpacity,
        position: "absolute",
        left: 100,
        top: 88,
        maxWidth: 720,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <span
        style={{
          opacity: tagOpacity,
          translate: `0 ${tagY}px`,
          alignSelf: "flex-start",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 999,
          padding: "8px 16px",
        }}
      >
        Services
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            opacity: line1Opacity,
            translate: `0 ${line1Y}px`,
            fontSize: 84,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          Six disciplines.
        </span>
        <span
          style={{
            opacity: line2Opacity,
            translate: `0 ${line2Y}px`,
            fontSize: 84,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.52)",
          }}
        >
          One operating system.
        </span>
      </div>
    </div>
  );
};

const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [0, DURATION], [0.35, 0.65], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "18%",
          top: "8%",
          width: 520,
          height: 320,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.03 * pulse})`,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "12%",
          bottom: "10%",
          width: 640,
          height: 400,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.025 * pulse})`,
          filter: "blur(100px)",
        }}
      />
    </>
  );
};

export const ServicesCardsCinematic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: "system-ui, sans-serif" }}>
      <AmbientGlow />
      <IntroCopy />

      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          top: 300,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignContent: "start",
        }}
      >
        {SERVICE_CARDS.map((card, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          const diagonalDelay = (row + col) * 3;
          const enterAt = GRID_START + index * CARD_STAGGER + diagonalDelay;

          return <ServiceCardFrame key={card.slug} card={card} enterAt={enterAt} />;
        })}
      </div>
    </AbsoluteFill>
  );
};
