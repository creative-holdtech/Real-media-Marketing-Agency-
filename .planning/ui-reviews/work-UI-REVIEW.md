# `#work` (CasesSection) — UI Review

**Audited:** 2026-06-25  
**Scope:** Homepage Case Studies teaser — `section#work`, typographic index, footer link  
**Baseline:** Abstract 6-pillar standards + project tokens (`framer-section.tsx`, `styles.css`)  
**Screenshots:** `.planning/ui-reviews/work-{desktop,hash-nav}.png` (375px hash-nav captured)  
**Dev server:** `http://localhost:8080/#work`

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Сильные кейс-метрики; subheading слегка абстрактный |
| 2. Visuals | 3/4 | Чёткий index; tag прячется под header при `#work` |
| 3. Color | 3/4 | Токены в компоненте; hardcoded цвета в `.rm-index` CSS |
| 4. Typography | 4/4 | Иерархия name → meta → metric на `rm-type-*` |
| 5. Spacing | 3/4 | Сетка на шкале 8px; нет `scroll-margin` у якоря |
| 6. Experience Design | 2/4 | **BLOCKER:** hash-nav + sticky header; hover dim 32% |

**Overall: 18/24**

---

## Top 5 Priority Fixes

1. **BLOCKER — `scroll-margin-top` на `#work`** — при переходе по `#work` (hero CTA «See the work») секция встаёт с `top: 0`, tag `Case studies` на `top: 69px` оказывается **под** sticky header (`bottom: 76px`). Добавить `scroll-margin-top: calc(var(--rm-header-offset) + 1.5rem)` на `#work` или общий класс для home anchors.

2. **WARNING — Несогласованность tag с Engage** — здесь plain `textMeta` (`cases-section.tsx:68`), в `#engage` — `FramerTag` pill. Визуальный ритм homepage ломается.

3. **WARNING — Hover dim `opacity: 0.32`** (`styles.css:2486`) — неактивные строки при hover соседа сильно тускнеют; meta/labels могут падать ниже комфортного контраста.

4. **WARNING — Progresivo placeholder thumb** — на mobile виден серый плейсхолдер (`cases.ts` fallback); снижает доверие к блоку «proof».

5. **WARNING — `items-start` на grid** (`cases-section.tsx:66`) — в Engage уже `md:items-stretch`; здесь tag-колонка не тянется по высоте с index block.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**PASS**
- Заголовок «Three engagements.» — конкретный, не generic.
- Row `aria-label`: `{client} — {metric} {label}` (`cases-section.tsx:99`).
- Метрики кейсов специфичны: `+35%`, `4 SURFACES`, `LATAM`.
- Meta строка: `IGAMING · MARATHON` — scannable.

**WARNING**
- Subheading «Deep-volume systems built for high-speed markets.» (`cases-gallery-config.ts:4-5`) — жаргон без привязки к ICP; слабее соседних секций.
- DOM text tag: «Case studies» (sentence case) — визуально caps через CSS, но inconsistent с «ENGAGEMENT FORMATS» pill.

### Pillar 2: Visuals (3/4)

**PASS**
- 4-col subgrid index (num | main | metric | arrow) — editorial, согласован с Cases gallery.
- Cursor-follow preview на fine pointer (`rm-index__cursor`, z-index 200).
- Mobile: inline thumbs 3rem (`styles.css:2672-2681`) — touch-friendly affordance.
- `border-top` на списке + `border-bottom` между rows — dividers как в Engage.

**BLOCKER**
- Hash navigation overlap (измерено): `section#work top ≈ 0`, tag `top ≈ 69px`, `header bottom ≈ 76px` → eyebrow **скрыт** под nav.

**WARNING**
- Progresivo thumb — placeholder, визуально слабее Tequila/Empresex.
- Engage использует pill-tag; Work — plain label (см. выше).

### Pillar 3: Color (3/4)

**PASS**
- `rm-section-work { background: #000 }` — чистая полоса между Engage и Studio.
- Dividers: `var(--rm-border-soft)`.
- Hover: name + metric → white; ghost meta остаётся muted.

**WARNING — hardcoded в CSS**
- `#ffffff`, `rgba(255,255,255,0.02)`, `#0c0c0d`, `rgba(0,0,0,0.7)` в `.rm-index*` (`styles.css:2490-2619`) вместо `--rm-ink` / surface tokens.

### Pillar 4: Typography (4/4)

**PASS**
- `sectionHeadline` + `max-w-[18ch] text-balance` для h2.
- `subsectionTitle` для client name.
- `textMeta` для niche/format и metric label.
- `.rm-index__metric-value` — `--rm-font-lead`, `uppercase`, tabular-nums.
- `bodyCopy` + `max-w-[46ch]` для subheading — в пределах readable width.

### Pillar 5: Spacing (3/4)

**PASS**
- Outer: `sectionContentGrid` → `gap-6 md:gap-8`.
- Index: `column-gap 1rem` / `2rem` (md), row `padding 1.25rem` / `1.5rem`.
- `View all` — `justify-self-end`, без лишнего `mt-8`.
- List `md:col-span-2 md:col-start-2` — aligned с Engage panel.

**WARNING**
- Нет `scroll-margin-top` на `#work` — ломает perceived spacing при anchor jump.
- `items-start` на `.rm-work` grid — tag не baseline-aligned с первой строкой index на wide layouts.
- Gap между header block и index — только grid gap; нет явного `border-b` под intro (в Engage есть у tabs).

### Pillar 6: Experience Design (2/4)

**PASS**
- Вся строка — один `<Link>` → large touch target.
- `focus-visible` inset ring (`styles.css:2494-2497`).
- Preview отключён на `(hover: none)` / `max-width: 768px`.
- Image preload в `useEffect` (`cases-section.tsx:52-57`).
- `prefers-reduced-motion` на preview AnimatePresence.
- `featuredCases.length === 0` → `return null`.

**BLOCKER**
- Hero secondary CTA `ctaSecondaryUrl: "#work"` (`defaults.ts:185`) ведёт в секцию, где eyebrow перекрыт header.

**WARNING**
- Hover siblings `opacity: 0.32` — нет reduced-motion fallback; может дезориентировать.
- Preview images `alt=""` — OK (decorative), но cursor preview недоступен keyboard-only users (enhancement, not blocker).
- `onPointerEnter` / `onFocus` sync `data-on` — OK для preview state.

---

## Cross-Section Comparison (Homepage)

| Element | `#engage` | `#work` | Match? |
|---------|-----------|---------|--------|
| Tag | `FramerTag` pill | plain `textMeta` | ✗ |
| Grid | `sectionContentGrid` | `sectionContentGrid` | ✓ |
| List dividers | `border-b` rows | `border-t` + `border-b` rows | ~✓ |
| CTA row | footer full-width | ghost link right | ~✓ |
| `scroll-margin` | none | none | ✗ both |

---

## Registry Safety

Skipped — no third-party registry blocks in this component.

---

## Files Audited

- `src/components/cases-section.tsx`
- `src/styles.css` (`.rm-section-work`, `.rm-index*`)
- `src/lib/cases-gallery-config.ts`
- `src/lib/cases.ts` (preview helpers)
- `src/components/framer-section.tsx` (tokens)
- `src/lib/page-content/defaults.ts` (`#work` CTA)
- Screenshots: `.planning/ui-reviews/work-*.png`

---

## Automated Measurements (`#work` hash nav, 375×812)

| Element | `getBoundingClientRect().top` |
|---------|-------------------------------|
| `section#work` | ~0px |
| Sticky header bottom | ~76px |
| Tag `.rm-type-meta` | ~69px (**hidden**) |
| `#cases-heading` | ~112px (visible) |
