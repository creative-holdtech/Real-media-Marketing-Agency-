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
      "Most brands don't die from a lack of traction. They die from the quiet weight of decisions made in the first six months of momentum — decisions that felt invisible at the time, and structural by the time anyone noticed. The teams we worked with between 2022 and 2025 all had the same look in the early days: a clear win, a believable line on a chart, and the unspoken belief that the line would keep going.",
      "Across forty of those teams, the pattern was almost embarrassing in its consistency. The companies that survived the second year were not the ones with the loudest launches, the boldest CAC, or the most aggressive hiring plans. They were the ones who built three things early: a clear thesis about the market, an internal language for trade-offs, and a refusal to confuse output with progress.",
      "The brands that didn't survive had something in common too. They treated growth as the strategy. When growth slowed — and growth always slows — they had nothing underneath. No editorial point of view, no operating rhythm, no relationship with the customer that wasn't mediated by an ad account. The day the channel got more expensive, the company got quieter, and then it got smaller.",
      "What follows is a working set of observations, not a framework. Frameworks are for people who already know the answer. These are for people still looking — founders in the strange middle stretch where the early story stops being true and the next one hasn't been written yet.",
      "The first observation is that scale exposes whatever was unresolved. A vague offer at twenty customers becomes an expensive offer at two hundred. An unclear ICP at a small budget becomes a hemorrhaging ICP at a serious one. Performance marketing does not fix positioning; it pays interest on it. The teams who treated their first plateau as a positioning problem — not a creative problem — were the ones who got a second curve.",
      "The second observation is about pace. Speed is a feature of early companies, but at a certain size it becomes a tax. The teams that survived slowed down on purpose. They added one meeting a week where the only allowed question was 'why are we doing this'. They were boring about it. The teams that didn't survive kept shipping — features, hires, campaigns — and called it momentum.",
      "The last observation is the hardest to write. The founders who made it through the second year were not the most talented in the room. They were the most honest. They could say 'I don't know' in front of their team without it costing them anything. They could kill a project they had personally launched. They treated the company as something they were building, not something they were performing. That, more than any tactic in this essay, is what compounded.",
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
      "Visibility is what you can buy in a quarter. Authority is what the market believes about you when you're not in the room. The two get confused constantly, because in the short run they look the same on a dashboard — impressions, reach, follows, the friendly green arrows. In the long run they behave nothing alike.",
      "Most brands optimize for the first because it shows up on a report. The second is harder to measure and infinitely more valuable. Authority is the reason a buyer picks up the phone before comparing three vendors. Visibility is the reason they put you on the list of three.",
      "The shortcut everyone reaches for is volume. More posts, more launches, more presence. It works for a season and then quietly stops working, because the market starts to associate the brand with effort instead of with a point of view. Authority is not built by being everywhere. It is built by being unmistakable somewhere specific.",
      "The teams who get this right tend to do three things on repeat. They publish a small number of opinions they are willing to defend in public. They name the thing in their category that no one else is willing to name. And they let silence do some of the work — they don't fill every channel just because the channel exists.",
      "If you're choosing between another paid campaign and a single piece of writing that says something true about your market, choose the writing. The campaign ends when the budget ends. The sentence keeps working.",
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
      "Tactics are bets. Systems compound. The teams that win in long-cycle markets treat acquisition as an operating discipline, not a campaign calendar. They are not more creative than their competitors. They are more consistent about boring things — naming conventions, weekly readouts, the same three questions asked of every channel every Monday.",
      "We tracked two cohorts across the last two quarters: one running aggressive, frequently rebuilt campaigns, and one running a slower system of small, structured experiments. The aggressive group had higher peaks. The structured group had higher floors, lower CAC volatility, and — by the end of the second quarter — meaningfully better blended efficiency.",
      "The difference wasn't talent. It was that the structured team had a clear definition of 'a test', a clear definition of 'a winner', and a clear definition of when to stop. The aggressive team had a culture of momentum that quietly punished anyone for asking whether the last sprint actually worked.",
      "If you can only borrow one habit from the structured cohort, borrow this: write down, before launching anything, what would make you stop it. Most teams can't, because most campaigns are built to be defended, not evaluated. The teams that compound treat every campaign as falsifiable.",
      "Aggressive tactics are not wrong. They are just expensive when they're the whole strategy. A system makes the tactics cheaper, because the system already knows what to do with the result.",
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
      "Saying less is the most expensive decision a brand can make. It requires conviction the market may not reward for years. It also requires the team to disagree well — because every line that gets cut is a line someone in the room wanted to keep.",
      "The brands we admire in saturated categories almost always look, on the surface, like they're doing less. Fewer products on the homepage. Fewer adjectives in the headline. Fewer claims in the pitch deck. What looks like restraint is usually the residue of a hundred quiet edits no one outside the company will ever see.",
      "Restraint works because it forces a brand to be specific. You can't list ten benefits and also stand for something. You can't speak to every buyer and also be the obvious choice for one. Editing is the act of giving up the audiences you were never going to win, so the audience you can win can finally hear you.",
      "The cost is real. In the quarter after a brand strips its message down, leads sometimes slow. In the quarter after that, the quality of the leads usually climbs. By the third quarter, the team stops noticing the simpler message and starts noticing the simpler conversations with prospects, who arrive already half-convinced.",
      "Restraint isn't minimalism as a style. It's clarity as a strategy. The two get confused, and the confusion costs brands years.",
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
      "MENA is not one market. It is twelve markets sharing a language and very little else. European studios who treat it as a single GEO learn this quickly, and expensively. The buying behaviour in Riyadh is not the buying behaviour in Dubai, and neither of them looks much like Cairo or Amman. Pretending otherwise is the most reliable way to lose a quarter.",
      "What is true across the region is the pace. Decisions that take three meetings in Berlin take one in Riyadh, and the one meeting is shorter. The expectation is not that you'll be perfect; it's that you'll be present. Teams that ship a polite, well-considered proposal four weeks late are quietly replaced by teams who showed up the same week with something rougher.",
      "The second pattern is relationship gravity. Cold outreach works less than it does in Western markets. Warm introductions work more, and they compound — a single trusted introduction in Riyadh can open more doors in six months than a year of LinkedIn campaigns.",
      "The misread we see most often from European studios is treating local taste as a layer of polish to add at the end. It isn't. It is the substrate. A campaign that works in Munich and gets 'localised' for Riyadh almost never lands. A campaign built from a Riyadh insight, and adapted outward, usually travels.",
      "If you're building into MENA from outside the region, the most useful thing you can do this quarter is buy a plane ticket. The second most useful thing is to stop calling it 'MENA' in your internal docs and start naming the specific city you're actually trying to win.",
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
      "When CAC climbs, most teams reach for the ad account. The honest fix is usually upstream — in the sentence that describes what they sell. A vague offer doesn't just cost you conversions; it taxes every downstream system. Your ads have to work harder. Your sales calls run longer. Your onboarding has to explain things the landing page should have closed.",
      "The compounding part is the cruel part. A vague offer makes every channel slightly less efficient, which makes the team add more channels, which makes the offer harder to sharpen, because now there are more stakeholders defending more versions of the message. By the time anyone admits the problem is positioning, the org chart has been built around the confusion.",
      "The diagnostic is simple and uncomfortable. Ask five people on your team to describe, in one sentence, what you sell and to whom. If you get five different sentences, you don't have a performance problem. You have a positioning problem dressed in performance-marketing clothes.",
      "Fixing it is rarely a rebrand. It's usually a week of hard conversations and a one-page document that the founder is willing to defend. The teams who do this work tend to see CAC drop within a quarter — not because the channels got better, but because the message finally matched the buyer.",
      "A clear offer is the cheapest performance lever you have. It just doesn't show up on the dashboard until you stop hiding behind the dashboard.",
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
      "Trust is not built by adding logos. It is built by removing the reasons a buyer has to doubt you, one quiet decision at a time. The trust stack most brands ship — logo wall, vanity metric, founder quote — works on buyers who weren't going to scrutinise anyway. Sophisticated buyers read past it in seconds.",
      "The signals that actually move careful buyers fall into four categories. Specificity: numbers with context, not numbers alone. Restraint: what you choose not to claim is itself a claim. Voice: a single named human willing to attach their reputation to the work. Silence: the absence of the things competitors are loudly faking.",
      "Specificity is the easiest to upgrade today. 'Trusted by 200+ teams' is a wall. 'Used by the growth team at [named company] to cut onboarding time from 14 days to 4' is a door. The first is a logo. The second is a story a buyer can verify and repeat to their boss.",
      "Restraint is the hardest, because it requires giving up claims that technically test well. A landing page with three honest sentences will, in the short run, convert worse than one with eight optimistic ones. In the medium run it will attract a better-qualified pipeline and close at a meaningfully higher rate. Most teams never run the experiment long enough to see this.",
      "Trust, finally, is a long game pretending to be a design decision. The brands that win it are not louder. They are more consistent, more specific, and more willing to leave white space where competitors are screaming.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const archive = posts.filter((p) => !p.featured);
export const featured = posts.find((p) => p.featured)!;
