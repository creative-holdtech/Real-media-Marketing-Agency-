# Правила работы в этом проекте

## Обязательный процесс перед любым репортом "готово"

**Шаг 1 — Чеклист ДО кода.**
Прочитай весь источник (PPTX, бриф, задание) и выпиши список ВСЕХ изменений. Не трогай код, пока список не готов. Покажи список пользователю если задача большая.

**Шаг 1б — Сравни источник со страницей в обе стороны.**
После того как прочитал источник — сравни его со страницей: что есть на странице, чего нет в источнике? Если источник покрывает только часть секций, явно спроси: "Секции X, Y, Z не упомянуты в презентации — оставить как есть или тоже нужны правки?" Не молчи и не предполагай.

**Шаг 2 — Применить ВСЁ из списка.**
Никаких частичных поставок. Никакого "сделаю остальное если попросят".

**Шаг 3 — Визуальная проверка.**
Открой страницу, прокрути каждую секцию, сравни с источником пункт за пунктом. Скриншоты, не только DOM. Только после этого — репорт.

---

## Редакторские заметки в презентациях

Комментарии внутри PPTX ("забрати", "remove", "пропоную прибрати", "убрать") — это **инструкции к действию**, не внутренние заметки. Применять обязательно.

---

## Колонки в презентациях

Если задача — "обнови копирайт по правой колонке", брать текст только из правой колонки. Левая — это старый вариант, не трогать.

---

## Стек проекта

- TanStack Router + Vite SSR (React, TypeScript)
- Данные кейсов: `src/lib/cases.ts` (статический fallback)
- Рендер кейса: `src/components/case-rich-detail.tsx`
- Payload CMS на localhost:3001 — в браузере недоступен из-за CORS, используется статический fallback
- Deploy: `vercel deploy --prod --token=TOKEN`

---

## Стиль ответов

- Коротко и по делу
- Не пересказывай что сделал — пользователь видит диф
- Не задавай вопросы через модальное окно — только обычный текст

---

## Система отступов (Real Media)

**Источник токенов:** `src/components/framer-section.tsx`, CSS-переменные в `src/styles.css`.

**Базовая шкала (8px grid):** только эти значения — не выдумывать промежуточные.

| px | Tailwind | Когда |
|----|----------|-------|
| 4 | `gap-1` | Meta/label → headline |
| 8 | `gap-2` | Строки meta; **h2 → standfirst в CTA-блоке** |
| 12 | `gap-3` | Gap между кнопками (mobile) |
| 16 | `gap-4` / `mt-4` | Headline → standfirst/lead; gutter mobile |
| 24 | `gap-6` / `mt-6` | Section h2 → lead block; copy → CTA (hero-scale) |
| 32 | `gap-8` / `mt-8` | Copy → CTA (editorial); grid desktop |
| 64 | `py-16` | Padding секции (mobile) |
| 80 | `py-20` | Padding секции (md+) |

**Правило:** на одной оси — **один** источник gap/margin. Не складывать `gap-6` на родителе и `mt-6` на ребёнке.

### Глобальные константы

- `--rm-header-offset` = 76px — контент под sticky header
- `siteGutter` = `px-6 md:px-10` (24 / 40px)
- `sectionShell` = `py-16 md:py-20` + gutter

### Паттерн A — Home hero

Label `gap-1` (4) → H1 block → standfirst `gap-4` (16) → кнопки `mt-6` (24). Header: `pt-[var(--rm-header-offset)]`. Токены: `heroIntroStack`, `heroHeadlineLead`+`gap-4`, `sectionHeroActionsRow`.

### Паттерн B — Section intro (About, Engage, Cases…)

Tag/meta → h2 `gap-6` (24, `sectionHeadlineLead`) → standfirst `gap-4` (16, `sectionLeadStack`) → CTA `mt-8` (32, `sectionActionsRow`). Grid: `sectionGap` = 24/32px.

### Паттерн C — UnifiedCTA (`#cta`)

H2 → standfirst **`gap-6` (24px, как в Паттерне B)** → кнопки **`mt-6` (24px)**. Изменено по клиентскому QA — раньше было `gap-2` (8px), заказчик попросил унифицировать с остальными секциями.

### Паттерн D — Insights (home)

Tag → h2 `gap-1` (4) → «All articles» `mt-6` (24). Без standfirst между ними.

### Паттерн E — Blog index hero

Meta `gap-2` → h1 `gap-1` (4) → lead `mt-4` (16) → filters `mt-6` (24). Archive header: `gap-1` label→h2.

### Паттерн F — Blog article

Отдельный editorial layout (breadcrumb `mb-8`, блоки `mt-8`). Паттерны A–E не применять.

### Паттерн G — Trust scene (`#studio`)

Top pad = `header + 0.25rem`; bottom = `4rem/5rem`. Логотипы по `homeY`, без vertical bloom к центру.

### Паттерн H — Engage

Viewport minus header; rail `top: header-offset`; кнопки без MagneticButton lift.

### Антипаттерны

Двойной header+section pad на sticky; `gap-5`/`mt-5`; `sectionInnerStack` на hero intro; mid-field logo cluster on scroll.

### Blog / Insights — одна картинка, два кадра

Один `post.image` режется в двух ориентациях:

| Кадр | Где | Ratio |
|------|-----|-------|
| `portrait` | Home insights carousel, blog featured | ~4:5 / 5:4 |
| `landscape` | Archive cards, article hero | 4:3 / 16:10 |

**Правила для новых ассетов:** центр-тяжёлая абстракция или текстура; без логотипа/текста у края. UI-мокапы — `imageFit: contain`.

**В коде:** `imageLayout: { portrait, landscape }` в `posts.ts`, рендер через `BlogPostImage` + `getPostImageRender()`.
