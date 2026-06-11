/** Frozen copy for /blog — right column in RM TXT for new site.pdf */

export const blogMeta = {
  title: "Blog — R-M",
  description:
    "Essays, frameworks and observations from our work with founders across the EU and MENA.",
  ogTitle: "Blog — R-M",
  ogDescription:
    "Essays, frameworks and observations from our work with founders across the EU and MENA.",
} as const;

export const blogIndex = {
  seasonLabel: "Blog — season · 2026",
  issuedBy: "Issued by marketing nerds",
  titleLine1: "Field notes on",
  titleLine2: "building brands that last.",
  lead: "Essays, frameworks and observations from our work with founders across the EU and MENA. Published when there is something worth saying.",
  featuredLabel: "Featured",
  archiveLabel: "Archive",
  allEntriesLabel: "All entries",
  emptyArchive: "Nothing here yet. Try another category.",
  resetFilters: "Reset filters →",
} as const;

/** Blog archive filters (PDF right column). */
export const blogTopicTags = [
  "Brand systems",
  "Strategy",
  "Positioning",
  "Performance",
  "SEO",
  "PR",
  "SMM",
  "Design",
] as const;

export const blogFilters = ["All", ...blogTopicTags] as const;
