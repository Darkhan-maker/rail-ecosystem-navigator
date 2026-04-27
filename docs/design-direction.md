# Rail Ecosystem Navigator — Design Direction

## 1. Visual Concept

**Enterprise Railway Digital Platform** — серьёзный, инженерный, технологичный стиль. Не стартап-лендинг,
а интерфейс реальной производственной платформы. Визуальный язык ближе к Datadog, Linear, Vercel
Dashboard — тёмные акценты, layered cards, строгая типографика, функциональные иконки.

Принцип: **информация первична, визуал — её поддержка**. Никаких кричащих градиентов, emoji, декоративных
элементов ради декора. Каждый визуальный элемент должен нести смысл.

---

## 2. Цветовая палитра

### Базовые цвета
| Роль              | Значение     | Tailwind        |
|-------------------|--------------|-----------------|
| Фон страниц       | `#f1f5f9`    | `slate-100`     |
| Фон карточек      | `#ffffff`    | `white`         |
| Граница карточек  | `#e2e8f0`    | `slate-200`     |
| Текст основной    | `#0f172a`    | `slate-900`     |
| Текст вторичный   | `#64748b`    | `slate-500`     |
| Текст третичный   | `#94a3b8`    | `slate-400`     |

### Тёмные акцентные секции (Hero, Control Panel)
| Роль                | Значение     |
|---------------------|--------------|
| Hero-фон (start)    | `#0f172a`    |
| Hero-фон (end)      | `#1e3a5f`    |
| Control Panel фон   | `#1e293b`    |
| Control Panel border| `#334155`    |
| Input фон           | `#0f172a`    |

### Контурные акценты
| Контур / назначение      | Цвет       | Семантика              |
|--------------------------|------------|------------------------|
| Магистральная сеть       | `#2563eb`  | blue-600               |
| Грузовые перевозки       | `#16a34a`  | green-600              |
| Цифровое ядро            | `#7c3aed`  | violet-600             |
| Процессы / Amber         | `#d97706`  | amber-600              |
| Проблемы / Alert         | `#ef4444`  | red-500                |
| Аналитика / Indigo       | `#4f46e5`  | indigo-600             |

### Статусы модулей
| Статус             | Dot-цвет   | Смысл                    |
|--------------------|------------|--------------------------|
| mvp-priority       | `#2563eb`  | В разработке сейчас      |
| mvp-support        | `#0ea5e9`  | Параллельно с MVP        |
| core-stage         | `#10b981`  | Ядро платформы           |
| next-stage         | `#6366f1`  | Следующий этап           |
| future-stage       | `#9ca3af`  | Будущее развитие         |
| parallel-stage     | `#f97316`  | Параллельная разработка  |
| planned-stage      | `#f59e0b`  | Запланировано            |
| strategic-stage    | `#8b5cf6`  | Стратегический горизонт  |

---

## 3. Типографика

- **Шрифт**: системный стек (Inter → Segoe UI → sans-serif)
- **H1 Hero**: `text-3xl sm:text-4xl font-bold text-white` — 36–40px, белый
- **H2 Section**: `text-xl sm:text-2xl font-bold text-slate-900` — 20–24px
- **H3 Group**: `text-sm font-bold` в цвете статуса — 14px
- **Module Name**: `text-sm font-bold text-slate-900` — 14px
- **Module RU Name**: `text-xs text-slate-400` — 12px
- **Body**: `text-sm text-slate-600 leading-relaxed` — 14px
- **Caption / Labels**: `text-[10px] font-semibold uppercase tracking-wider text-slate-400`
- **Monospace**: `font-mono text-xs` — для счётчиков, метрик

---

## 4. Стиль карточек (Layered Cards)

### Primary Card (Module Card)
```
bg-white rounded-2xl border border-slate-200 shadow-sm
hover: shadow-xl -translate-y-0.5 transition-all duration-200
```
- Accent line `h-[3px]` вверху в цвете статуса
- Icon container `w-10 h-10 rounded-xl` в цвете статуса
- Footer с accent-цветом ссылки

### Secondary Card (Group Section)
```
bg-white rounded-2xl border border-slate-200 shadow-sm
border-top: 3px solid <status.dot>
```
- Header секции с фоном в разбавленном цвете статуса
- Grid карточек внутри

### Info Card (Details box внутри карточки)
```
rounded-xl p-3 border
bg: status.bg, border: status.border
```

### Stat Card (Метрики в Hero)
```
rounded-xl px-4 py-3
bg: rgba(255,255,255,0.06)
border: rgba(255,255,255,0.10)
```

---

## 5. Стиль секций

| Секция               | Фон             | Граница            |
|----------------------|-----------------|--------------------|
| Hero                 | тёмный градиент | `border-slate-800` |
| Control Panel        | `#1e293b`       | `#334155`          |
| Page body            | `bg-slate-100`  | —                  |
| Group section card   | `bg-white`      | `border-slate-200` |
| Footer CTA           | `bg-slate-900`  | —                  |

Принцип: **Hero → Control → Light body**. Тёмные секции используются только для начала страницы
и контрол-панелей, не для основного контента.

---

## 6. Стиль иконок

- Библиотека: **lucide-react** (v1.11.0+)
- Без emoji, без текстовых псевдосимволов
- Размеры: `w-4 h-4` (inline), `w-5 h-5` (card icon), `w-6 h-6` (section header), `w-7 h-7` (hero icon)
- Icon container: всегда styled box — `rounded-xl/2xl`, цвет фона = `status.bg` или `contour.color+'20'`
- Цвет иконки: `status.dot` или `contour.color`
- Никакого `opacity: 0.6` без контейнера — иконка либо видна, либо спрятана

### Mapping
- Module icons: `MODULE_ICONS[moduleId]` из `components/icons.tsx`
- Page icons: `PAGE_ICONS[pageId]`
- Node type icons: `NODE_TYPE_ICONS[nodeType]`
- Status group icons: `STATUS_META[status].Icon` — по смыслу этапа

---

## 7. Стиль внутренних страниц

Каждая внутренняя страница состоит из:

1. **Hero** (`PageHeader` компонент) — тёмный градиент, LucideIcon, заголовок, lead, chips-бейджи
2. **Stat strip** — белая секция с 3–4 цифровыми метриками
3. **Content sections** — чередование `bg-white` / `bg-slate-50`, разделённых `border-b border-slate-200`
4. **Footer CTA** — `bg-slate-900` или `bg-white border-t` с кнопкой перехода на связанную страницу

Не использовать:
- Чистый белый фон во всю страницу без разбивки
- Карточки на белом фоне без видимой иерархии
- Emoji в заголовках, бейджах, иконках

---

## 8. Страница /modules — эталон дизайна

Страница `/modules` — главный каталог платформы. Требования:

### Hero
- Тёмный градиент `#0f172a → #1e3a5f`
- Фиолетовый glow-blob справа (colour: `#7c3aed`)
- `<Boxes>` icon 56×56px в violet-контейнере
- Бейдж «Каталог цифровой платформы»
- H1: «Каталог модулей Rail Ecosystem»
- Lead: кол-во модулей и охват
- 4 метрики: Всего / В MVP / Ядро / Стратегические

### Control Panel (Filter Bar)
- `bg: #1e293b` — тёмный, sticky, ниже nav
- Поле поиска: `bg: #0f172a border: #334155 text: #f1f5f9`
- `<Search>` icon внутри поля
- Select статуса — тёмный стиль
- `<X>` иконка в кнопке «Сбросить»
- Счётчик справа: `font-mono text-slate-400`

### Module Groups
- Каждый статус = отдельная `Section Card`
- Top border 3px в цвете статуса
- Group header: icon + label + count badge + description
- Grid внутри: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

### Module Card
- `rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-0.5`
- Top accent line 3px
- Icon `w-10 h-10 rounded-xl` в цвете статуса
- Status badge top-right
- Description `text-xs leading-relaxed`
- Details box если `showDetails`
- Input/Output chips (blue / emerald)
- Related modules: clickable chips
- Footer: relation count + «Подробнее» в accent-цвете с `<ArrowRight>`

### Empty State
- `bg-white rounded-2xl` centered
- `<Search>` icon `w-16 h-16` в slate-100 контейнере
- Заголовок + описание + кнопка сброса в violet-цвете

### Responsive
- Mobile: 1 колонка
- Tablet (`sm`): 2 колонки
- Desktop (`lg`): 3 колонки
