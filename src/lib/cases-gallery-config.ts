export const CASES_GALLERY_CHAPTER = "04";

export const CASES_GALLERY_SUBHEADING = "Deep-volume systems built for high-speed markets.";

export function casesGalleryHeaderProps(work?: {
  tag?: string;
  heading?: string;
  subheading?: string;
}) {
  return {
    tag: work?.tag ?? "System specs",
    heading: work?.heading ?? "Three core runs. Pure performance.",
    subheading: work?.subheading ?? CASES_GALLERY_SUBHEADING,
    chapter: CASES_GALLERY_CHAPTER,
    animateHeading: true as const,
  };
}
