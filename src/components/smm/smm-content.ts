/** SMM page copy — sourced from REAL MEDIA.docx via smmService */

import { smmService } from "@/lib/services/content/smm";

export const SMM_ROTATE = [smmService.hero.word] as const;

export const smmMarqueeWords = [
  "Strategy",
  "Reels",
  "Reporting",
  "MoM metrics",
  "Tone of voice",
  "Comms SWOT",
  "Hypothesis-tested",
] as const;

export const smmHeadlineMetrics = smmService.socialProof.cases
  .flatMap((c) => c.metrics)
  .slice(0, 4);

export type SmmService = {
  n: string;
  kicker: string;
  title: string;
  body: string;
  deliverables: string[];
  note?: string;
};

export const smmServices: SmmService[] = smmService.blocks.map((block) => ({
  n: block.n,
  kicker: block.title,
  title: block.subtitle,
  body: block.sections.map((s) => s.items.join(" ")).join(" "),
  deliverables: block.sections.flatMap((s) =>
    s.items.map((item) => `${s.heading}: ${item.split(":")[0]}`),
  ),
  note: block.notes?.join(" "),
}));

export const smmOutcomes = smmService.outcomes.items.map((item, i) => ({
  n: String(i + 1).padStart(2, "0"),
  title: item.title,
  body: item.body,
}));

export type SmmCaseStudy = {
  id: string;
  category: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  quote: string;
  heroMetric: { value: string; label: string };
  secondaryMetrics: { value: string; label: string }[];
};

export const smmCaseStudies: SmmCaseStudy[] = smmService.socialProof.cases.map((c, i) => ({
  id: `case-${i}`,
  category: c.label ?? "Case study",
  title: c.label ?? "Social proof",
  client: c.attribution ?? "Client",
  challenge: "",
  solution: "",
  quote: c.quote ?? "",
  heroMetric: c.metrics[0] ?? { value: "—", label: "" },
  secondaryMetrics: c.metrics.slice(1),
}));

export { smmService };
