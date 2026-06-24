import type { CaseRichContent } from "@/lib/cases";

export type CaseTocItem = { id: string; label: string };

export const CASE_SECTION_CONTEXT: Record<string, string> = {
  "case-overview": "Client, scope, and engagement results.",
  "case-challenge": "The GTM gap the network needed to close.",
  "case-identity": "Type, colour, and recognition system.",
  "case-campaign": "Live mockups and performance frames.",
  "case-deliverables": "Identity, web, and creative tracks in one system.",
  "case-results": "Outcomes, proof, and partner voice.",
};

type ContextualCta = {
  message: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
};

export const CASE_CONTEXTUAL_CTA: Record<string, ContextualCta> = {
  "case-overview": {
    message: "Evaluating a network rebrand?",
    primaryLabel: "Book free audit",
    primaryTo: "/audit",
    secondaryLabel: "All cases",
    secondaryTo: "/cases",
  },
  "case-challenge": {
    message: "Need a clearer GTM story?",
    primaryLabel: "Consultation",
    primaryTo: "/contact",
  },
  "case-identity": {
    message: "Building recognition in a crowded market?",
    primaryLabel: "Brand services",
    primaryTo: "/services/brand",
  },
  "case-campaign": {
    message: "Need performance creative at volume?",
    primaryLabel: "SMM and paid creative",
    primaryTo: "/services/smm",
  },
  "case-deliverables": {
    message: "Want one system across brand, web, and SMM?",
    primaryLabel: "Book free audit",
    primaryTo: "/audit",
  },
  "case-results": {
    message: "Ready for a partner acquisition engine?",
    primaryLabel: "Book free audit",
    primaryTo: "/audit",
    secondaryLabel: "More cases",
    secondaryTo: "/cases",
  },
};

export function caseReadingStorageKey(slug: string) {
  return `rm-case-reading:${slug}`;
}

export function estimateCaseReadMinutes(rich: CaseRichContent): number {
  const chunks = [
    rich.subline,
    rich.heroNote,
    rich.overview.body,
    rich.problem.body,
    rich.problem.cards.map((c) => `${c.title} ${c.body}`).join(" "),
    rich.identity?.typeface.body,
    rich.identity?.logo,
    rich.identity?.keyVisual,
    rich.galleryLead,
    rich.deliverables.items.map((d) => d.body).join(" "),
    rich.platform.body,
    rich.platform.features.map((f) => f.body).join(" "),
  ];
  const words = chunks.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.round(words / 210));
}

export function getContextualCta(sectionId: string): ContextualCta {
  return (
    CASE_CONTEXTUAL_CTA[sectionId] ?? {
      message: "Discuss your brand and GTM system.",
      primaryLabel: "Consultation",
      primaryTo: "/contact",
    }
  );
}

export function readSavedScroll(slug: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(caseReadingStorageKey(slug));
    if (!raw) return null;
    const value = Number.parseInt(raw, 10);
    return Number.isFinite(value) && value > 320 ? value : null;
  } catch {
    return null;
  }
}

export function persistScroll(slug: string, scrollY: number) {
  if (typeof window === "undefined" || scrollY < 320) return;
  try {
    sessionStorage.setItem(caseReadingStorageKey(slug), String(Math.round(scrollY)));
  } catch {
    /* ignore quota */
  }
}

export function clearSavedScroll(slug: string) {
  try {
    sessionStorage.removeItem(caseReadingStorageKey(slug));
  } catch {
    /* ignore */
  }
}
