---
target: src/routes/index.tsx (mobile 428×667)
total_score: 33
p0_count: 0
p1_count: 2
timestamp: 2026-05-19T22-00-00Z
slug: src-routes-index-tsx
commands: critique + clarify + audit
---
# Combined Pass — Home (post-redesign)

Detector on index.tsx: 0 findings. Project-wide: `bg-black` in about/blog/cases (8x), one `Geist` overused-font warning (about), 2x layout-property animations (blog).

## Critique — Design Health 33/40
| # | Heuristic | Score | Note |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | n/a marketing |
| 2 | Match Real World | 3 | Real client names, attributed quotes ✓ |
| 3 | User Control | 4 | Multiple CTA paths (/contact, /cases, /blog) |
| 4 | Consistency | 3 | Section grammar now varied ✓ |
| 5 | Error Prevention | 3 | — |
| 6 | Recognition > Recall | 4 | Sticky header, numbered chapters |
| 7 | Flexibility | 3 | Engagement-specific contact links unused (query stripped) |
| 8 | Aesthetic / Minimalism | 4 | Pulled-quote opener, divided engage, journal list ✓ |
| 9 | Error Recovery | 3 | — |
| 10 | Help / Docs | 3 | — |
| **Total** | | **33/40** | Strong, distinctive |

## Audit Health 16/20
| Dimension | Score | Finding |
|---|---|---|
| Accessibility | 3 | Most CTAs 48px (good). Decorative `<img alt="">` ✓. Heading hierarchy clean. **Hero subtitle 15px white/65 ≈ 3.9:1 contrast on #0c0a09** — borderline AA at small sizes. |
| Performance | 3 | HeroWebGL on first paint may cost LCP on mobile; image lazy-loaded; transitions are transform/opacity. `useCountUp` rAF respects reduced-motion ✓. |
| Responsive | 4 | Single-column collapse correct, divider switches axis. Touch targets ≥44px. |
| Theming | 3 | Hard-coded hex (`#0c0a09`, `#e85d3a`, `#111`, `#e8e6e1`) instead of tokens in styles.css. Works visually, fragile. |
| Anti-Patterns | 3 | No detector hits on this file. Editorial-typographic lane (brand.md flagged) is still the project-wide aesthetic — secondary risk, not local. |

## Clarify — Copy Pass

Specific rewrites for the unclear lines:

**Hero subtitle (l.172–174)**
- Now: *"One team for positioning, growth and performance. Last twelve months: $120M+ raised by clients, 40+ launches shipped, two acquisitions."*
- Why: front-loads a generic claim ("One team for…") before the proof. Stat trio reads as a sentence, not numbers.
- Better: *"Positioning, growth and performance under one weekly cadence. In the last twelve months our clients raised $120M+, shipped 40 launches, and had two acquired."*

**Studio block (l.241–246)**
- Now: "Eight people, no account managers. Founders and operators who have built and sold the kind of company you are building now…"
- Clearer: "Eight operators. No account managers, no junior layer. We've built and sold companies in fintech, AI and regulated markets — the same lanes you're in now."
- Why: "the kind of company you are building" is vague; named lanes make it land.

**Engage Sprint description (l.102)**
- Now: *"A fixed-scope intervention. We rewrite the position, ship the funnel, and hand back a launch you can run without us."*
- Better: *"Four weeks, fixed price. We rewrite the positioning, ship the funnel, and hand you a launch your team can run alone."*
- Why: "intervention" reads clinical; "fixed price" anchors what €18k buys.

**Engage Marathon description (l.115)**
- Now: *"An embedded growth team. Strategy, creative, and performance under one weekly cadence — measured against pipeline, not impressions."*
- Better: *"An embedded team for 6+ months. Strategy, creative and paid run on one weekly cadence, reported in pipeline — never impressions."*

**Journal intro (l.447–450)**
- Now: *"What we are writing about this quarter — positioning under pressure, pricing in regulated markets, and why most agency reporting is theater."*
- Tighter: *"This quarter we're writing on positioning under pressure, pricing in regulated markets, and why agency reporting is theater."*
- Why: "what we are writing about" is throat-clearing.

**Hero CTAs (l.184, l.190)**
- "Start a project →" is fine. "View case studies" duplicates the section label below. Consider *"See the work"* for variation.

**Unified CTA (l.502–505)**
- Eyebrow *"The conversation starts here"* and title *"Let's build something that lasts."* — twin clichés. Replace with concrete: eyebrow *"Tell us what's stuck"*, title *"Bring us a launch, a raise, or a stalled funnel."*

**Engagement CTAs (l.353)**
- *"Talk about Sprint →"* / *"Talk about Marathon →"* — "Talk about" feels noncommittal. Try *"Scope a Sprint →"* / *"Plan a Marathon →"* (verb commits to the engagement, not to talking).

## Priority Issues

- **[P1] Hero contrast borderline.** `text-white/65` on `#0c0a09` at 15px fails WCAG AA for small body. Lift to `text-white/75` or 16px. → `$impeccable adapt` or quick edit.
- **[P1] Hard-coded hex throughout.** No semantic tokens. If brand evolves, 20+ files break individually. → `$impeccable extract` to lift `#e85d3a`, `#0c0a09`, `#e8e6e1`, surface tones into `src/styles.css` as `--accent`, `--surface`, `--ink`.
- **[P2] Engagement query param unused.** `/contact?engagement=sprint` strips because contact route lacks `validateSearch`. Either wire it or drop the param to avoid dead-state.
- **[P2] CTA copy clichés** at hero subtitle, Unified CTA, "Talk about X". See clarify rewrites above.
- **[P2] HeroWebGL on mobile LCP.** Consider gating behind `prefers-reduced-motion` AND `(min-width: 768px)`, or replace with a static gradient on mobile.
- **[P3] Project-wide `bg-black` (8x in about/blog/cases).** Detector still flags. Switch to `bg-[#0c0a09]` for consistency with home.
- **[P3] `Geist` font** flagged in about.tsx — already in the overused-AI-font list. Consider a less-saturated face (e.g. Söhne, Untitled Sans, or a serif/sans pair).
- **[P3] Layout-property transitions** in blog routes (`transition: width`). Animate `transform: scaleX` instead.

## What's Working

- Section grammar genuinely varies now: WebGL hero → marquee → big stats → editorial studio → pulled quote → numeral chapters → image cards → list. The "five identical card grids" pattern from the prior pass is gone.
- Real attributed testimonials end the credibility gap.
- Numbered chapters (I / II) with vertical divider — distinctive, no detector hits.
- Touch targets all ≥44px on mobile.

## Recommended Actions (priority order)

1. **[P1] `$impeccable adapt`** — lift hero subtitle contrast + retest mobile.
2. **[P1] `$impeccable extract`** — pull hard-coded hex into `src/styles.css` as semantic tokens.
3. **[P2] `$impeccable clarify`** — apply the copy rewrites above (Unified CTA + engagement CTAs especially).
4. **[P2] `$impeccable optimize`** — gate HeroWebGL behind viewport + reduced-motion.
5. **[P3] `$impeccable polish`** — sweep `bg-black` → `bg-[#0c0a09]`, swap `Geist`, fix `transition: width`.
