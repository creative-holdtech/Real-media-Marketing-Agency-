# `#work` (CasesSection) — UI Review (animation focus)

**Audited:** 2026-06-29  
**Scope:** Homepage `#work` scroll-driven preview crossfade + index sync  
**Baseline:** Abstract 6-pillar standards + `cases-section.tsx`, `styles.css`  
**Production:** https://real-media-marketing-agency.vercel.app/#work  
**E2E:** `tests/recorded/work-scene-scroll.spec.ts`

---

## Pillar Scores (animation-focused)

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Без изменений — метрики и labels ок |
| 2. Visuals | 4/4 | Crossfade rail читается; TEQUILA/EMPRESEX/PROGRESIVO hover.png видны |
| 3. Color | 3/4 | Градиенты rail 14%/12% — мягкие, не режут превью |
| 4. Typography | 4/4 | Index + `data-on` highlight согласованы |
| 5. Spacing | 3/4 | Track `sticky + 46vh` (~400px runway) — ок по высоте |
| 6. Experience Design | 4/4 | Scroll crossfade + index sync работают |

**Overall: 21/24**

---

## Animation Verdict

| Check | Status |
|-------|--------|
| Tequila visible at sticky start (progress ≈ 0) | ✓ PASS |
| Empresex crossfade mid-scroll | ✓ PASS |
| Progresivo visible at end | ✓ PASS |
| Index `data-on` sync with preview | ✓ PASS |
| Lenis + custom progress hook | ✓ PASS |
| `prefers-reduced-motion` | ✓ PASS — static first card |
| Mobile `<768px` | ✓ PASS — без scroll scene, inline thumbs |

---

## Fixes Applied (2026-06-29)

### 1. Runway denominator

`measureTrackProgress` считает scroll range как `track − sticky`, не `track − viewport`.

### 2. Crossfade gaps

Старые `segmentBounds` оставляли мёртвые зоны (все карточки `opacity: 0` около 33% / 66%). Заменено на overlapping `crossfadeOpacity` с `CROSSFADE_OVERLAP = 0.18`.

### 3. Active index

`activeCardIndex` выбирает карточку с максимальной opacity, а не ближайший peak — синхрон с превью.

### 4. E2E

`tests/recorded/work-scene-scroll.spec.ts` — Tequila @ start, Empresex @ 50%, Progresivo @ end.

---

## Files Audited

- `src/components/cases-section.tsx`
- `src/styles.css` (`.rm-work-scene*`, `.rm-work-preview*`)
- `tests/recorded/work-scene-scroll.spec.ts`
