export const CASES_GALLERY_CHAPTER = "04";

/** One-line context for home `#work` teaser only — listing hero already sets the frame. */
export const CASES_HOME_TEASER_SUBHEADING =
  "Deep-volume systems built for high-speed markets.";

/** Subpage hero — portrait plate, taller than compact detail heroes but not full home bleed. */
export const CASES_SUBPAGE_HERO_ATMOSPHERE =
  "rm-hero-atmosphere--about-photo rm-hero-atmosphere--cases-listing";

/**
 * Full `/cases` gallery — card grid with chapter watermark.
 * Home uses `casesHomeTeaserHeaderProps()` + typographic index instead.
 */
export function casesGalleryHeaderProps(work?: {
  tag?: string;
  heading?: string;
  subheading?: string;
}) {
  return {
    tag: work?.tag ?? "Case studies",
    heading: work?.heading ?? "Three engagements.",
    subheading: work?.subheading,
    chapter: CASES_GALLERY_CHAPTER,
    animateHeading: false as const,
  };
}

/** Home `#work` teaser — same tag/heading, optional subheading for context. */
export function casesHomeTeaserHeaderProps() {
  const full = casesGalleryHeaderProps();
  return {
    tag: full.tag,
    heading: full.heading,
    subheading: full.subheading ?? CASES_HOME_TEASER_SUBHEADING,
  };
}

export function relatedCasesGalleryProps() {
  return {
    tag: "More work",
    heading: "Other case studies.",
    animateHeading: false as const,
  };
}
