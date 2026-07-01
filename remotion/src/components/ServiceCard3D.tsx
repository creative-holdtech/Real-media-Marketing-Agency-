import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { ServiceCardData } from "../data/services";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export type Card3DLayout = {
  x: number;
  y: number;
  z: number;
  rotateY: number;
  rotateX: number;
};

type ServiceCard3DProps = {
  card: ServiceCardData;
  enterAt: number;
  layout: Card3DLayout;
};

export const ServiceCard3D: React.FC<ServiceCard3DProps> = ({ card, enterAt, layout }) => {
  const frame = useCurrentFrame();
  const t = frame - enterAt;

  const progress = interpolate(t, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const opacity = interpolate(t, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const z = interpolate(progress, [0, 1], [layout.z - 420, layout.z]);
  const rotateY = interpolate(progress, [0, 1], [layout.rotateY + 18, layout.rotateY]);
  const rotateX = interpolate(progress, [0, 1], [layout.rotateX + 10, layout.rotateX]);
  const scale = interpolate(progress, [0, 1], [0.88, 1]);

  const accentHeight = interpolate(t, [10, 32], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  const transform = `translate3d(${layout.x}px, ${layout.y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        opacity,
        transform,
        transformStyle: "preserve-3d",
        width: 340,
        display: "flex",
        flexDirection: "column",
        minHeight: 200,
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.14)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 48%, rgba(0,0,0,0.2) 100%)",
        boxShadow:
          "0 28px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.04)",
        color: "#fff",
        padding: "26px 30px",
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
          boxShadow: `0 0 18px ${card.accent}66`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>
          Be {card.beWord}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.42)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: "5px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {card.shortName}
        </span>
      </div>

      <div
        style={{
          marginTop: 22,
          paddingTop: 22,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {card.tagline}
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.15, color: "#fff" }}>
          {card.name}
        </span>
      </div>

      <p
        style={{
          marginTop: 16,
          marginBottom: 0,
          fontSize: 14,
          lineHeight: 1.45,
          color: "rgba(255,255,255,0.58)",
        }}
      >
        {card.intro}
      </p>
    </div>
  );
};
