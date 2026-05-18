# Swiss-style Stats Strip + Animation

Redesign the 5-cell facts strip on `/` (line 204–221 of `src/routes/index.tsx`) into a proper Swiss / International Typographic Style block, and animate it on scroll.

## Visual direction (Swiss style)

- **Asymmetric 12-column grid** with hairline rules instead of the current 5 equal black tiles.
- **Section header row** in Swiss tradition:
  - Left: small index `§ 02 / Indicators` in uppercase mono, 0.25em tracking.
  - Right: dateline `Updated · MMV·MMXXVI`.
  - Full-width hairline `border-t border-white/15` under it.
- **Numbered entries** — each stat gets a `01 → 05` index above the value, mono, white/40.
- **Oversized numerals**: `clamp(56px, 7vw, 112px)` Neue-Haas-style, `font-medium`, `tracking-[-0.04em]`, baseline-aligned. For non-numeric values (`EU+MENA`, `Tier 1–3`, `1 team`) → split into two stacked lines so the visual rhythm holds.
- **Label** sits directly under the rule that separates it from the number — `text-[11px] uppercase tracking-[0.22em] text-white/55`, max 2 lines.
- **Optional caption** (small italic note) under one or two cells, e.g. *"since 2019"*, to break perfect symmetry — a Swiss-grid signature.
- **Layout**: 5 cells laid as `col-span-3 / 2 / 3 / 2 / 2` on desktop (asymmetric), stack to 2-col on mobile. Vertical hairlines between cells (`divide-x divide-white/10`).
- Colour: keep `#0a0a0a` bg, `#e8e6e1` text, single `#e85d3a` accent dot next to the section index.

```text
─────────────────────────────────────────────────────────────
§ 02 / INDICATORS •                       UPDATED · MMV·MMXXVI
─────────────────────────────────────────────────────────────
01            │ 02       │ 03            │ 04        │ 05
              │          │               │           │
40+           │ 04       │ EU            │ Tier      │ 1
              │          │ +MENA         │ 1–3       │ team
──────────────┼──────────┼───────────────┼───────────┼──────
PROJECTS      │ CORE     │ ACTIVE        │ NICHE     │ STRATEGY
DELIVERED     │ INDUSTR. │ MARKETS       │ EXPERIENCE│ + EXEC.
─────────────────────────────────────────────────────────────
```

## Animation

1. **Scroll-reveal entrance** — reuse existing `useReveal` + `.reveal` class already in the file. Each cell fades + lifts on first intersection, staggered `data-delay="1..5"`.
2. **Hairline draw-in** — top and middle rules animate `scaleX 0 → 1` from left, 600ms ease-out, on intersection. Implemented as `<span>` with `origin-left transition-transform duration-700` + an `inView` state toggled by a small `useEffect(IntersectionObserver)` in the same component (no new hook file, kept local).
3. **Count-up on the numeric cells** (`40+`, `04`) — small inline `useCountUp(target, durationMs)` helper inside `index.tsx`. Runs once when the strip enters view. Non-numeric values (`EU+MENA`, `Tier 1–3`, `1 team`) render statically.
4. **Index numerals (01–05)** subtle vertical shift on hover: `group-hover:-translate-y-0.5 transition`.
5. Respect `prefers-reduced-motion`: skip count-up and hairline draw, keep static final state.

## Files touched

- `src/routes/index.tsx` — only the stats section (lines 204–221) and a small local helper (`useCountUp`, `useInView`) added above `Index`. Data shape in `facts` extended to `[value, label, isNumeric, suffix?]` so animation knows what to count.

No new files, no new deps, no other sections altered.
