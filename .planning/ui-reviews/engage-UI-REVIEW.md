# Engage Block (`#engage`) — UI Review

**Audited:** 2026-06-25 (updated 2026-06-23)  
**Scope:** `ServicesSection` — tabs + panel (copy, CTA, steps)  
**Baseline:** Abstract 6-pillar standards + project tokens (`framer-section.tsx`, `styles.css`)  
**Screenshots:** Captured — `.planning/ui-reviews/engage-{desktop,tablet,mobile}.png`  
**Dev server:** `http://localhost:8080/#engage`

---

## Layout change (Sprint / Fast start)

**Decision:** Steps **horizontal on `md+`** (3 equal columns: SETUP → RUN → HANDOVER). Vertical stack on mobile.

**Rationale (6-pillar):**
- **Experience:** Fast start reads as a **process**, not a sidebar list crammed into ~256px.
- **Typography:** Body copy gets ~3× width per step on desktop; line length back in range.
- **Spacing:** Lead intro full-width row; steps share one rhythm row; CTAs footer row — matches Cases “content → action” scan path.
- **Visuals:** Vertical dividers (`border-r`) replace stacked `border-b` on desktop; clearer chapter separation.

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Конкретные CTA и steps; marathon tab uses same horizontal pattern |
| 2. Visuals | 4/4 | Horizontal process row; CTAs bottom-right; no cramped right rail |
| 3. Color | 4/4 | Один акцент (white pill), токены, без лишнего цвета |
| 4. Typography | 4/4 | Step body readable at ~23ch/col vs ~16ch in narrow rail |
| 5. Spacing | 4/4 | `md:grid-cols-3` on 8px scale; lead `col-span-3`; actions footer |
| 6. Experience Design | 4/4 | Mobile stack → desktop timeline; both CTAs visible with `flex-wrap` |

**Overall: 23/24** (was 20/24)

---

## Top 3 Priority Fixes

1. **DONE — Horizontal steps on desktop** — `rm-engage-panel__grid` → `md:grid-cols-3`, lead `col-span-3`, steps as columns.
2. **DONE — CTA row** — `justify-end`, `flex-wrap`, after steps on mobile (`order-4`).
3. **LOW — Tab `gap-x-10`** — заменить на `gap-x-8` для шкалы 8px (`services-section.tsx` tablist).

---

## Detailed Findings

### Pillar 2: Visuals (4/4)

**PASS**
- Desktop: metric + intro → 3-column process → dual CTA footer.
- Sprint “fast start” no longer fights a 1fr side column for steps.
- Tab underline unchanged; panel fade on tab switch preserved.

### Pillar 5: Spacing (4/4)

**PASS**
- Panel: `gap-y-8`, `md:gap-x-8 lg:gap-x-12`.
- Step columns: `md:pr-8 lg:pr-12`, `md:border-r` between phases.
- Lead `md:col-span-3` — one intro band before process.

### Pillar 6: Experience Design (4/4)

**PASS**
- Mobile: lead → steps (stack) → CTAs — commitment after reading process.
- Desktop: left-to-right scan 01 → 02 → 03 matches “fast start” mental model.
- Both CTAs remain; no single-CTA Cases compromise.

---

## Files Audited

- `src/components/services-section.tsx`
- `src/lib/engagements.ts`
- `.planning/ui-reviews/engage-UI-REVIEW.md` (this file)
