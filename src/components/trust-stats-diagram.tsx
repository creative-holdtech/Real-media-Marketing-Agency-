import type { ReactNode } from "react";

const VB_W = 720;
const VB_H = 640;
const CX = 360;
const CY = 320;
const R = 152;
const TOP_CY = CY - R;
const BOTTOM_CY = CY + R;
const DASH = "4 7";
const EDGE_X = 36;
const EDGE_Y_TOP = 52;
const EDGE_Y_BOTTOM = 588;

type TrustStatsDiagramProps = {
  topValue: ReactNode;
  topCopy: ReactNode;
  bottomValue: ReactNode;
  bottomCopy: ReactNode;
};

export function TrustStatsDiagram({
  topValue,
  topCopy,
  bottomValue,
  bottomCopy,
}: TrustStatsDiagramProps) {
  return (
    <div className="rm-trust-stats__orbits">
      <svg
        className="rm-trust-stats__blueprint rm-trust-stats__blueprint--desktop"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <g
          className="rm-trust-stats__lines"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          <line x1={EDGE_X} y1={CY} x2={VB_W - EDGE_X} y2={CY} strokeDasharray={DASH} />
          <line x1={CX} y1={TOP_CY - 8} x2={CX} y2={BOTTOM_CY + 8} strokeDasharray={DASH} />
          <line x1={EDGE_X} y1={EDGE_Y_TOP} x2={CX} y2={CY} strokeDasharray={DASH} />
          <line x1={EDGE_X} y1={EDGE_Y_BOTTOM} x2={CX} y2={CY} strokeDasharray={DASH} />
          <line x1={VB_W - EDGE_X} y1={EDGE_Y_TOP} x2={CX} y2={CY} strokeDasharray={DASH} />
          <line x1={VB_W - EDGE_X} y1={EDGE_Y_BOTTOM} x2={CX} y2={CY} strokeDasharray={DASH} />
        </g>
        <circle
          cx={CX}
          cy={TOP_CY}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={DASH}
          vectorEffect="non-scaling-stroke"
          className="rm-trust-stats__ring"
        />
        <circle
          cx={CX}
          cy={BOTTOM_CY}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={DASH}
          vectorEffect="non-scaling-stroke"
          className="rm-trust-stats__ring"
        />
      </svg>

      <div className="rm-trust-stats__labels">
        <div
          className="rm-trust-stats__label rm-trust-stats__label--top"
          style={{ top: `${(TOP_CY / VB_H) * 100}%` }}
        >
          <p className="rm-trust-stats__stat-value">{topValue}</p>
          <p className="rm-trust-stats__stat-copy">{topCopy}</p>
        </div>
        <div
          className="rm-trust-stats__label rm-trust-stats__label--bottom"
          style={{ top: `${(BOTTOM_CY / VB_H) * 100}%` }}
        >
          <p className="rm-trust-stats__stat-value">{bottomValue}</p>
          <p className="rm-trust-stats__stat-copy">{bottomCopy}</p>
        </div>
      </div>
    </div>
  );
}
