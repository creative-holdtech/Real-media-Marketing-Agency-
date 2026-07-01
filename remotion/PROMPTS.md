# Remotion prompts — Services 6 cards (AICM / FANCY 3D style)

Референс: [AICM landing — 3D animation](https://dribbble.com/shots/26126156-AICM-landing-page-web-design-3D-animation)  
Стиль FANCY: тёмный void, стеклянные UI-панели в перспективе, медленная «камера», rim-light по краям, premium easing.

---

## 0. Ограничения Remotion (вставлять в каждый промпт)

```
Remotion 4, React 19, TypeScript.
Анимация ТОЛЬКО через useCurrentFrame() + interpolate() + Easing.bezier().
Запрещено: CSS transitions, CSS @keyframes, Tailwind animate-*.
Transform: отдельные свойства scale, translate, rotate, rotateX, rotateY — не строка transform.
Easing входа: Easing.bezier(0.16, 1, 0.3, 1).
Фон: pure #000. Бренд: Real Media services cards (6 шт).
Композиция: 1920×1080, 30fps.
```

---

## 1. Master prompt (новая композиция)

```
Создай Remotion-композицию ServicesCards3D для Real Media.

Визуальная цель: как AICM landing (FANCY) — не плоский 2×3 grid, а floating bento в 3D:
- слева 40% кадра: hero copy (Services / Six disciplines. / One operating system.)
- справа 60%: 6 service cards в perspective stage (perspective: 1400px)
- карточки на разной глубине translateZ (-140…+40), лёгкий rotateY/rotateX
- стекло: bg rgba(255,255,255,0.04), border 1px white/12%, box-shadow rim glow
- ambient: 2 размытых orb + едва видимая dot-grid на фоне

Хронометраж ~8.5s (255 frames @ 30fps):

ACT I (0–2.5s): tag + headline появляются с blur-rise; stage пустой.
ACT II (2–5.5s): карточки влетают из глубины (z -500 → layout z), stagger 12 frames, diagonal wave.
ACT III (5.5–7.5s): медленный orbit камеры — parent rotateY -6° → +5°, counter-rotate карточек на 30%.
ACT IV (7.5–8.5s): hold, лёгкий breathing scale 1 → 1.01 на front card.

Данные: remotion/src/data/services.ts (6 cards).
Не дублируй текст с сайта дословно в intro — используй те же titleLines.

Файлы:
- src/ServicesCards3D.tsx — композиция
- src/components/ServiceCard3D.tsx — карточка с layout + enter
- зарегистрируй в Root.tsx id="ServicesCards3D"
```

---

## 2. Prompt — Hero (левая колонка)

```
Компонент IntroCopy3D в ServicesCards3D.tsx.

Staging слева, padding-left 100px, max-width 640px.
Порядок: pill "Services" → h1 line1 "Six disciplines." → h1 line2 muted "One operating system."

Анимация (frame-based):
- tag: opacity 0→1, translateY -16→0, frames 0–18, ease bezier(0.16,1,0.3,1)
- line1: opacity 0→1, translateY 40→0, blur через opacity+offset (без filter если тяжело), frames 12–42
- line2: delay до frame 38, clip feel через translateY 32→0, frames 38–68
- после frame 150: intro group opacity 1→0.35 (не исчезать полностью — остаётся якорь)

Типографика video-safe: line1/2 fontSize 72–84px, weight 500, letter-spacing -0.03em.
Line2 color rgba(255,255,255,0.52).
```

---

## 3. Prompt — 3D stage + camera

```
3D stage для 6 карточек (правая часть кадра).

Wrapper:
  position absolute, left 52%, top 50%, width 900px, height 700px
  transform translate(-50%, -50%)
  perspective 1400px
  perspectiveOrigin 50% 45%

Inner stage (preserve-3d):
  rotateY: interpolate(frame, [90, 210], [-6, 5], clamp, ease bezier(0.4,0,0.2,1))
  translateZ: interpolate(frame, [0, 255], [0, -30]) — лёгкий dolly in

Каждая карточка — фиксированный layout slot (x, y, z, rotateY, rotateX) в px/deg.
При enter добавь к slot -400 по Z и +12deg rotateY, затем spring-like settle через interpolate (без spring()).

Stagger: enterAt = 72 + index*12 + (row+col)*4
```

---

## 4. Prompt — ServiceCard3D (одна карточка)

```
ServiceCard3D.tsx — glass UI card Real Media.

Props: card (ServiceCardData), enterAt, layout { x, y, z, rotateY, rotateX }.

Enter (t = frame - enterAt):
- opacity: 0→1, t 0–16
- z offset: layout.z - 420 → layout.z, t 0–28
- rotateY: layout.rotateY + 18 → layout.rotateY, t 0–28
- scale: 0.88 → 1, t 0–24
Easing: Easing.bezier(0.16, 1, 0.3, 1)

Визуал:
- minHeight 200, borderRadius 28, padding 28px 32px
- background linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))
- border 1px solid rgba(255,255,255,0.14)
- boxShadow: 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)
- left accent bar 3px, card.accent color, height animates 0→100% after enter+8 frames

Контент как на сайте:
- "Be {word}" 18px sentence case muted
- pill shortName uppercase
- tagline meta caps
- name 24px white
- intro 15px body muted, max 2 lines feel

style на root: translate, rotateX, rotateY, scale как отдельные свойства Remotion.
transformStyle preserve-3d на карточке.
```

---

## 5. Prompt — Ambient layer

```
Ambient для ServicesCards3D:

1) Dot grid: radial-gradient dots 1px white/4%, backgroundSize 32px, opacity 0.35
2) Orb top-right: 500×400 blur 100px, white 4%, drift translateX 0→20 за весь ролик
3) Orb bottom-left accent: brand orange #e85d3a at 6% opacity, blur 120px, scale pulse 0.9→1.05

Всё position absolute, pointer-events none, z-index под контентом.
Анимировать только opacity/translate/scale через interpolate — не CSS animation.
```

---

## 6. Prompt — Render & variants

```
Добавь npm script:
  "render:3d": "remotion render ServicesCards3D out/services-cards-3d.mp4"

Опционально второй composition ServicesCards3DVertical:
  1080×1920, те же тайминги, cards в один столбец с translateZ cascade.

Проверка: npx remotion still ServicesCards3D --frame=140 --scale=0.25
```

---

## 7. One-shot prompt (copy-paste в чат / Remotion AI)

```
@remotion-best-practices

Rebuild remotion/src/ServicesCards3D.tsx in AICM/FANCY 3D landing style for Real Media.

Black void, left hero (Services / Six disciplines. / One operating system.), right floating glass bento of 6 service cards in CSS 3D perspective. Cards enter from deep Z with stagger, camera slowly orbits rotateY. Use interpolate + Easing.bezier only. Data from src/data/services.ts. 1920×1080 30fps ~255 frames. Register ServicesCards3D in Root.tsx. Match existing ServiceCard copy structure. Premium, no bounce, no CSS transitions.
```

---

## 8. Anti-patterns (не просить)

- «Добавь transition: all 0.3s»
- «Используй framer-motion внутри Remotion»
- «Сделай grid как на сайте без perspective»
- «Поставь все 6 карточек одновременно без stagger»
- «Белый фон» / градиенты между секциями
