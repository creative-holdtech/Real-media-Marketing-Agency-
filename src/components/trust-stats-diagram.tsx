import type { ReactNode } from "react";

import { bodyCopy, sectionGridSpacer, sectionHeaderGrid } from "@/components/framer-section";

type TrustStat = {
  value: ReactNode;
  copy: ReactNode;
};

type TrustStatsDiagramProps = {
  stats: readonly TrustStat[];
};

export function TrustStatsDiagram({ stats }: TrustStatsDiagramProps) {
  return (
    <div className={`${sectionHeaderGrid} w-full md:gap-2`}>
      <div className={sectionGridSpacer} aria-hidden="true" />

      {stats.map((stat, index) => (
        <div key={index} className="rm-trust-stats__stat flex flex-col gap-3 text-left">
          <p className="rm-trust-stats__stat-value">{stat.value}</p>
          <p className={`max-w-[20ch] text-balance ${bodyCopy}`}>{stat.copy}</p>
        </div>
      ))}
    </div>
  );
}
