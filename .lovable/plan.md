# Home page — 3 focused changes

Reference: DreamLab screenshot you uploaded.

## 1. Stats section (replace current "Indicators" strip)

Currently `StatsStrip` renders 5 Swiss-style cells with hairlines, count-up, headers, captions. Replace with a clean two-up block matching the reference:

- Two oversized stats only: `40+` / *Projects delivered* and `$120M+` / *Capital secured by founder teams* (final copy to confirm in Q1).
- Layout: 2 columns on mobile AND desktop (same proportions as the reference), generous vertical padding, no surrounding borders/hairlines, no `§ 02 / Indicators` header, no per-cell index numbers, no caption line.
- Type scale: `clamp(56px, 11vw, 160px)` for the number, `text-[14px]/[15px] text-white/55` for the label underneath.
- Keep the existing count-up animation on the numeric value and the `prefers-reduced-motion` fallback.
- Place exactly where `StatsStrip` is today (after the hero, before the About/Metrics section). The 5-metric list inside the About section stays — that's a separate block.

## 2. Mobile pill menu (matches DreamLab top bar)

The fixed top pill nav currently hides the brand on mobile and shows only "Get Audit". Restyle the mobile state:

- Left: brand wordmark `R—M.` (always visible, not just centered on desktop).
- Right: a `MENU` button (uppercase, 13px, tracking-wide) that toggles a fullscreen overlay.
- Hide the desktop `<ul>` nav and the white "Trusted by…" chip on mobile (already hidden), and hide the right-side `Get Audit` pill on mobile so the bar reads `R—M.` / `MENU` exactly like the reference.
- Desktop (`md:` and up) keeps current behavior unchanged.
- Overlay panel: full-viewport `bg-black/95 backdrop-blur-xl`, large stacked links (`Services`, `Products`, `Case Studies`, `Insights`, `About`, `Journal`), a `Get Audit` CTA at the bottom, close button (`CLOSE`) in the same pill position. Locks body scroll while open, closes on link click and on `Esc`.
- Apply the same treatment in `src/routes/blog.tsx` so the nav stays consistent across pages.

## 3. Homepage Insights section → blog cards with images

Replace the current text-list (`articles` array + `<ul>` with title rows) in the `[ 06 — Insights ]` section with real post cards sourced from `@/lib/posts`:

- Import `posts` and take the first 3 (featured + 2 latest archive entries).
- Reuse the visual treatment from `src/routes/blog.tsx` archive grid: rounded-3xl image card, category + read-time chips top corners, hover "Read →" pill, title + date underneath, full-card `<Link to="/blog/$slug">`.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`.
- Keep the `[ 06 — Insights ]` header and "View All Articles →" link (point it to `/blog`).
- Remove the now-unused local `articles` array.

## Technical notes

- Only files touched: `src/routes/index.tsx`, `src/routes/blog.tsx`.
- New small component `MobileMenu` (local to each route file, or extracted to `src/components/mobile-menu.tsx` if cleaner — will extract).
- No new deps. No backend changes.

## Open question

1. Stats copy: keep `40+ / Projects delivered` and add a second stat — which one? Options: `$120M+ / Capital secured`, `4× / Avg ROAS uplift`, or supply your own.

