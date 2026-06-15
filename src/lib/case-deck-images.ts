export type CaseDeckRole = "cover" | "overview" | "identity" | "deliverables" | "platform";

/** Public path to a synced Portfolio_RM slide export */
export function deckImage(slug: string, role: CaseDeckRole): string {
  return `/cases/${slug}/${role}.png`;
}

/** Public path to any case asset under /cases/{slug}/ */
export function caseAsset(slug: string, ...parts: string[]): string {
  return `/cases/${slug}/${parts.join("/")}`;
}

export function caseGalleryImage(slug: string, filename: string): string {
  return caseAsset(slug, "gallery", filename);
}

/** Slide numbers to export from Figma into ~/Downloads/Portfolio_RM/ */
export const DECK_SLIDE_HINTS: Record<string, Partial<Record<CaseDeckRole, number>>> = {
  empresex: { cover: 12, overview: 12, identity: 11, deliverables: 13, platform: 14 },
  "tequila-cpa": { cover: 15, overview: 16, identity: 18, deliverables: 21, platform: 22 },
  progresivo: { cover: 29, overview: 30, identity: 31, deliverables: 33, platform: 34 },
};

export function deckVisual(
  slug: string,
  role: Exclude<CaseDeckRole, "cover" | "platform">,
  alt: string,
): { src: string; alt: string } {
  return { src: deckImage(slug, role), alt };
}
