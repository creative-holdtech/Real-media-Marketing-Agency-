import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { ServiceCardData } from "../data/services";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type ServiceCardFrameProps = {
  card: ServiceCardData;
  enterAt: number;
};

export const ServiceCardFrame: React.FC<ServiceCardFrameProps> = ({ card, enterAt }) => {
  const frame = useCurrentFrame();
  const t = frame - enterAt;

  const opacity = interpolate(t, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const translateY = interpolate(t, [0, 22], [56, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const scale = interpolate(t, [0, 22], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const accentHeight = interpolate(t, [8, 28], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <div
      style={{
        opacity,
        translate: `0 ${translateY}px`,
        scale,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "#000",
        color: "#fff",
        padding: "28px 32px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: card.accent,
          height: `${accentHeight}%`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>
          Be {card.beWord}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 999,
            padding: "6px 12px",
            whiteSpace: "nowrap",
          }}
        >
          {card.shortName}
        </span>
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {card.tagline}
        </span>
        <span
          style={{
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#fff",
          }}
        >
          {card.name}
        </span>
      </div>

      <p
        style={{
          marginTop: 20,
          marginBottom: 0,
          fontSize: 16,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.62)",
          flex: 1,
        }}
      >
        {card.intro}
      </p>
    </div>
  );
};
