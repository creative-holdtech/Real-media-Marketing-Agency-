import blogFeatured from "@/assets/blog-featured.jpg";
import blog01 from "@/assets/blog-01.jpg";
import blog02 from "@/assets/blog-02.jpg";
import blog03 from "@/assets/blog-03.jpg";
import blog04 from "@/assets/blog-04.jpg";
import blog05 from "@/assets/blog-05.jpg";
import blog06 from "@/assets/blog-06.jpg";

export type Post = {
  slug: string;
  n: string;
  category: string;
  date: string;
  dateISO: string;
  read: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  featured?: boolean;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "why-scaling-brands-fail",
    n: "00",
    category: "Growth Strategy",
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    read: "9 min read",
    title: "Why most scaling brands fail after rapid growth",
    excerpt:
      "Velocity hides fragility. A study of forty teams who hit traction — and the structural decisions that decided who survived the second year.",
    image: blogFeatured,
    author: "R-M Editorial",
    featured: true,
    body: [
      "Most brands don't die from a lack of traction. They die from the quiet weight of decisions made in the first six months of momentum — decisions that felt invisible at the time, and structural by the time anyone noticed.",
      "Across forty teams we worked with between 2022 and 2025, the pattern was almost embarrassing in its consistency. The companies that survived the second year were not the ones with the loudest launches, the boldest CAC, or the most aggressive hiring plans. They were the ones who built three things early: a clear thesis about the market, an internal language for trade-offs, and a refusal to confuse output with progress.",
      "The brands that didn't survive had something in common too: they treated growth as the strategy. When growth slowed — and growth always slows — they had nothing underneath.",
      "What follows is a working set of observations, not a framework. Frameworks are for people who already know the answer. These are for people still looking.",
    ],
  },
  {
    slug: "visibility-vs-authority",
    n: "01",
    category: "Positioning",
    date: "Apr 28, 2026",
    dateISO: "2026-04-28",
    read: "6 min read",
    title: "The difference between visibility and market authority",
    excerpt:
      "Attention is rented. Authority compounds. Notes on the long arc of positioning in saturated categories.",
    image: blog01,
    author: "R-M Editorial",
    body: [
      "Visibility is what you can buy in a quarter. Authority is what the market believes about you when you're not in the room.",
      "Most brands optimize for the first because it shows up on a dashboard. The second is harder to measure, and infinitely more valuable.",
    ],
  },
  {
    slug: "structured-systems",
    n: "02",
    category: "Performance",
    date: "Apr 14, 2026",
    dateISO: "2026-04-14",
    read: "7 min read",
    title: "How structured systems outperform aggressive tactics",
    excerpt:
      "A quiet operating model beats a loud campaign — measured across two quarters of paid acquisition in MENA.",
    image: blog02,
    author: "R-M Editorial",
    body: [
      "Tactics are bets. Systems are compounding. The teams that win in long-cycle markets treat acquisition as an operating discipline, not a campaign calendar.",
    ],
  },
  {
    slug: "restraint",
    n: "03",
    category: "Brand",
    date: "Mar 30, 2026",
    dateISO: "2026-03-30",
    read: "5 min read",
    title: "Restraint as a competitive advantage",
    excerpt:
      "On editing, negative space, and what brands give up when they say everything at once.",
    image: blog03,
    author: "R-M Editorial",
    body: [
      "Saying less is the most expensive decision a brand can make. It requires conviction the market may not reward for years.",
    ],
  },
  {
    slug: "notes-from-riyadh",
    n: "04",
    category: "Field Notes",
    date: "Mar 11, 2026",
    dateISO: "2026-03-11",
    read: "4 min read",
    title: "Notes from Riyadh: building inside high-velocity markets",
    excerpt:
      "Three weeks with founders building in MENA — patterns, contradictions, and what European studios still misread.",
    image: blog04,
    author: "R-M Editorial",
    body: [
      "MENA is not one market. It is twelve markets sharing a language and very little else. European studios who treat it as a single GEO learn this quickly, and expensively.",
    ],
  },
  {
    slug: "compounding-cost-of-vague-offer",
    n: "05",
    category: "Strategy",
    date: "Feb 22, 2026",
    dateISO: "2026-02-22",
    read: "8 min read",
    title: "The compounding cost of a vague offer",
    excerpt:
      "Most growth problems are positioning problems wearing a performance-marketing costume.",
    image: blog05,
    author: "R-M Editorial",
    body: [
      "When CAC climbs, most teams reach for the ad account. The honest fix is usually upstream — in the sentence that describes what they sell.",
    ],
  },
  {
    slug: "taxonomy-of-trust",
    n: "06",
    category: "Brand",
    date: "Feb 03, 2026",
    dateISO: "2026-02-03",
    read: "6 min read",
    title: "A taxonomy of trust signals",
    excerpt:
      "Logos, numbers, voices, silence — a working list of the signals that actually move sophisticated buyers.",
    image: blog06,
    author: "R-M Editorial",
    body: [
      "Trust is not built by adding logos. It is built by removing the reasons a buyer has to doubt you, one quiet decision at a time.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const archive = posts.filter((p) => !p.featured);
export const featured = posts.find((p) => p.featured)!;
