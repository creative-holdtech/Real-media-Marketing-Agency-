import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Card3DLayout, ServiceCard3D } from "./components/ServiceCard3D";
import { SERVICE_CARDS } from "./data/services";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_PREMIUM = Easing.bezier(0.4, 0, 0.2, 1);

export const FPS = 30;
export const GRID_START = 72;
export const CARD_STAGGER = 12;
export const HOLD_END = 45;
export const DURATION_3D =
  GRID_START + SERVICE_CARDS.length * CARD_STAGGER + 55 + HOLD_END;

/** Bento slots in stage space (px / deg) */
const CARD_LAYOUTS: Card3DLayout[] = [
  { x: 0, y: 0, z: -130, rotateY: 14, rotateX: 8 },
  { x: 360, y: -16, z: -60, rotateY: 6, rotateX: 5 },
  { x: 720, y: 8, z: 35, rotateY: -3, rotateX: 2 },
  { x: 24, y: 248, z: -95, rotateY: 11, rotateX: 7 },
  { x: 380, y: 232, z: -40, rotateY: 4, rotateX: 4 },
  { x: 740, y: 252, z: 10, rotateY: -2, rotateX: 3 },
];

const IntroCopy3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagOpacity = interpolate(frame, [0, 0.55 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });
  const tagY = interpolate(frame, [0, 0.55 * fps], [-16, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });

  const line1Opacity = interpolate(frame, [0.4 * fps, 1.35 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });
  const line1Y = interpolate(frame, [0.4 * fps, 1.35 * fps], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });

  const line2Opacity = interpolate(frame, [1.25 * fps, 2.1 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });
  const line2Y = interpolate(frame, [1.25 * fps, 2.1 * fps], [32, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE,
  });

  const groupOpacity = interpolate(frame, [5 * fps, 6.2 * fps], [1, 0.38], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: EASE_PREMIUM,
  });

  return (
    <div
      style={{
        opacity: groupOpacity,
        position: "absolute",
        left: 100,
        top: 120,
        maxWidth: 640,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        zIndex: 2,
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

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span
          style={{
            opacity: line1Opacity,
            translate: `0 ${line1Y}px`,
            fontSize: 80,
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
            fontSize: 80,
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

const Ambient3D: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, DURATION_3D], [0, 24], {
    extrapolateRight: "clamp",
  });
  const pulse = interpolate(frame, [0, DURATION_3D], [0.85, 1.08], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.32,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "6%",
          width: 520,
          height: 380,
          borderRadius: "50%",
          translate: `${drift}px 0`,
          background: "rgba(255,255,255,0.04)",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "42%",
          bottom: "8%",
          width: 480,
          height: 360,
          borderRadius: "50%",
          scale: pulse,
          background: "rgba(232, 93, 58, 0.07)",
          filter: "blur(120px)",
        }}
      />
    </>
  );
};

const CardStage3D: React.FC = () => {
  const frame = useCurrentFrame();

  const stageRotateY = interpolate(frame, [90, 210], [-6, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_PREMIUM,
  });

  const stageTranslateZ = interpolate(frame, [0, DURATION_3D], [0, -35], {
    extrapolateRight: "clamp",
    easing: EASE_PREMIUM,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "54%",
        top: "50%",
        width: 1080,
        height: 720,
        translate: "-50% -50%",
        perspective: 1400,
        perspectiveOrigin: "50% 42%",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateY(${stageRotateY}deg) translateZ(${stageTranslateZ}px)`,
        }}
      >
        {SERVICE_CARDS.map((card, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const diagonalDelay = (row + col) * 4;
          const enterAt = GRID_START + index * CARD_STAGGER + diagonalDelay;
          const layout = CARD_LAYOUTS[index] ?? CARD_LAYOUTS[0];

          return (
            <ServiceCard3D
              key={card.slug}
              card={card}
              enterAt={enterAt}
              layout={layout}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ServicesCards3D: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: "system-ui, sans-serif" }}>
      <Ambient3D />
      <IntroCopy3D />
      <CardStage3D />
    </AbsoluteFill>
  );
};
