# Engage Section — UI Review

**Audited:** 2026-06-03  
**Scope:** `#engage` / `ServicesSection` on homepage  
**Baseline:** Abstract 6-pillar standards + iterative session edits (no UI-SPEC.md)  
**Screenshots:** Browser preview reference from session; no automated capture this pass.

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Headline strong; interaction hint was missing before this pass |
| 2. Visuals | 3/4 | Bold word toggles read as brand; left/right relationship was ambiguous |
| 3. Color | 3/4 | Black band consistent; inactive toggle at 16% was near-invisible |
| 4. Typography | 3/4 | `textMeta` applied to steps/metric; heading + toggles still use bespoke sizes |
| 5. Spacing | 3/4 | Two-column grid clear; metric/toggle grouping improved at column foot |
| 6. Experience Design | 3/4 | Tab semantics added; crossfade stable after grid-stack fix |

**Overall: 18/24** (after clarity pass applied in code)

---

## Top 3 Priority Fixes

1. **Label the interaction** — Users could not tell Sprint/Marathon controlled the right panel — Added kicker, “Choose format”, “Typical timeline”, and helper line under headline.
2. **Group related controls** — Metric floated above toggles with no shared context — Moved metric above toggles in left foot with shared labels; show `engagement.time` above intro on the right.
3. **Improve discoverability of inactive format** — Marathon at 16% opacity read as decoration — Raised inactive opacity to 24% and added `role="tablist"` / `role="tab"` / `role="tabpanel"`.

---

## Changes Applied (2026-06-03)

- Section kicker pill: **Engagement formats**
- Helper copy: *Select Sprint or Marathon to see scope, timeline, and next step.*
- Left column labels: **Typical timeline** + **Choose format**
- Dynamic timeline line on panel: `{engagement.time}` (e.g. “From 4 weeks”)
- Compare link → **Compare formats** with `title={compareHint}`
- ARIA tabs: `tablist` / `tab` / `tabpanel` wiring
- Inactive toggle opacity: 16% → 24%
- Focus ring on format buttons

---

## Remaining Opportunities

| Item | Pillar | Suggestion |
|------|--------|------------|
| Unify display sizes | Typography | Map `2.375rem` heading + clamp toggles to `sectionHeadline` tokens |
| Mobile order | Experience | On small screens, show “Choose format” before content panel |
| Step codes | Copywriting | Optional `01 / 02 / 03` prefixes like legacy PricingStep for scanability |
| Compare affordance | Copywriting | Surface `compareHint` inline under Compare link on hover/focus |

---

## Verification

- [x] Toggle switches panel content + metric with crossfade (no layout jump)
- [x] Screen reader: tablist announces two formats; panel labelled by active tab
- [ ] Manual UAT: confirm Marathon discoverability at 24% on calibrated displays
