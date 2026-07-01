# Services cards — cinematic Remotion

1920×1080 · 30fps · ~7.9s · composition `ServicesCards`

## Compositions

| ID | Style | Output |
|----|-------|--------|
| `ServicesCards` | Flat 2×3 grid | `out/services-cards.mp4` |
| `ServicesCards3D` | AICM-style 3D bento + camera orbit | `out/services-cards-3d.mp4` |

## Preview

```bash
npm run remotion:studio
```

## Render

```bash
npm run remotion:render        # flat
npm run remotion:render:3d     # 3D (AICM reference)
```

## Prompts (AICM / FANCY style)

Expert Remotion prompts for iterating: **`PROMPTS.md`**

One-shot:

```
@remotion-best-practices — rebuild ServicesCards3D in AICM/FANCY 3D landing style…
```

See `PROMPTS.md` section 7 for full copy-paste block.

## Structure

| File | Role |
|------|------|
| `src/ServicesCardsCinematic.tsx` | Main composition — intro + 2×3 card grid |
| `src/components/ServiceCardFrame.tsx` | Single card enter (opacity, translate, scale, accent draw) |
| `src/data/services.ts` | Six service cards (matches `/services` copy) |

## Choreography

1. **Intro** — tag → «Six disciplines.» → «One operating system.» (fade out)
2. **Grid** — 6 cards stagger in with diagonal wave; accent bar draws on left
3. **Hold** — full grid visible

Timing uses `interpolate()` + `Easing.bezier(0.16, 1, 0.3, 1)` per Remotion best practices.
