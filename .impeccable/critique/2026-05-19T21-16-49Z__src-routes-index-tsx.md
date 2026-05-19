---
target: home page (mobile)
total_score: 27
p0_count: 1
p1_count: 2
timestamp: 2026-05-19T21-16-49Z
slug: src-routes-index-tsx
---
# Critique — src/routes/index.tsx (mobile 428×667)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | n/a marketing |
| 2 | Match System / Real World | 2 | Agency-speak copy |
| 3 | User Control and Freedom | 3 | — |
| 4 | Consistency and Standards | 3 | Over-applied |
| 5 | Error Prevention | 3 | — |
| 6 | Recognition Rather Than Recall | 3 | — |
| 7 | Flexibility and Efficiency | 2 | Mono-funnel to /audit |
| 8 | Aesthetic and Minimalist Design | 2 | Section grammar repetition |
| 9 | Error Recovery | 3 | — |
| 10 | Help and Documentation | 3 | — |
| Total | | 27/40 | Good, not distinctive |

## Anti-Patterns Verdict
LLM: editorial-typographic dark studio lane; tiny tracked uppercase eyebrows over every section (brand.md flagged pattern).
Detector: 5x pure-black-white warnings at lines 352, 355, 436, 503, 506.

## Priority Issues
- [P0] Section grammar is template-uniform across 5 sections — break grammar on 3 of them.
- [P1-a] Three identical card grids in a row (Engage/Cases/Journal) — distill Engage into a horizontal split, Journal into a list.
- [P1-b] Filler copy: hero, testimonials anonymous, metrics row pads real numbers with slogans.
- [P2] Every CTA funnels to /audit — split into /contact for warm leads.
- [P3] Hero CTAs sit below mobile thumb-zone (520px) and are 40px tall (need 44px).

## Persona Red Flags
- Founder evaluating studios: no real client names, anonymous testimonials.
- Head of marketing: no pricing anchor on Sprint/Marathon.
- Returning visitor: Engage section is buried at #5.

## Minor
- metrics row duplicates StatsStrip
- bg-[#0a0a0a] chroma 0
- View All Cases hidden on mobile
- Dead section anchors
