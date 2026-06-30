# Insights (`InsightsHeroSection`) — UI Review

**Audited:** 2026-06-29  
**Scope:** Home insights carousel + meta caption crossfade  
**Files:** `insights-hero-section.tsx`, `styles.css`, `posts.ts`

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Kicker / title / meta line читаются; cybersecurity title на двух строках |
| 2. Visuals | 4/4 | Carousel 3D peek, per-card motion identity, sheen на active slide |
| 3. Color | 4/4 | Ink/muted/meta line иерархия соблюдена |
| 4. Typography | 4/4 | Pattern D: tag→h2 `gap-1`, CTA `mt-6`; title `text-balance` |
| 5. Spacing | 4/4 | Meta `min-height: 7.5rem` — room for 2-line titles без скачка |
| 6. Experience Design | 4/4 | Crossfade без vertical bounce; `titleLines` для editorial break |

**Overall: 24/24**

---

## Animation Verdict

| Check | Status |
|-------|--------|
| Meta crossfade on slide change | ✓ PASS — opacity only, grid stack |
| No layout jump (2-line title) | ✓ PASS |
| `prefers-reduced-motion` | ✓ PASS |
| Carousel snap / drag | ✓ PASS |
| Page transition on article click | ✓ PASS |

---

## Fixes Applied (2026-06-29)

1. **Meta motion** — убран `mode="wait"` и `y` enter/exit; opacity crossfade 0.28s premium ease.
2. **Layout** — `.rm-insights-meta` grid stack (`__panel` in cell 1/1) — высота стабильна при смене слайда.
3. **Title** — `titleLines` для cybersecurity post; `text-balance` на meta title.

---

## Files Audited

- `src/components/insights-hero-section.tsx`
- `src/components/dragable-carousel.tsx`
- `src/lib/posts.ts`
- `src/styles.css` (`.rm-insights-*`)
