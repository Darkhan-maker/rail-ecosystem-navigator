'use client';

import { useState } from 'react';
import {
  Rocket, HardHat, ClipboardCheck, FileSpreadsheet,
  Check, CheckCircle, XCircle, X, MapPin,
  ChevronDown, HelpCircle,
} from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────────────────────────

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
  blue:   '#2563eb',
  green:  '#10b981',
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const CHAIN_STEPS = [
  { n: 1,  label: 'Создание',     sub: 'Работник или старший' },
  { n: 2,  label: 'Согласование', sub: 'Старший проверяет' },
  { n: 3,  label: 'Инструктаж',   sub: 'Перед выездом' },
  { n: 4,  label: 'Выезд',        sub: 'Маршрут активирован' },
  { n: 5,  label: 'QR-прибытие',  sub: 'Скан на станции' },
  { n: 6,  label: 'Работа',       sub: 'Факт фиксируется' },
  { n: 7,  label: 'QR-убытие',    sub: 'Время рассчитано' },
  { n: 8,  label: 'Утверждение',  sub: 'Начальник подписывает' },
  { n: 9,  label: 'Excel-реестр', sub: 'Для бухгалтерии' },
  { n: 10, label: 'Аналитика',    sub: 'KPI дистанции' },
];

const ROLES = [
  {
    Icon:     HardHat,
    title:    'Работник ШЧ',
    sub:      'Тот, кто едет на станцию',
    items: [
      'Простое мобильное приложение',
      'Маршрутный лист в телефоне',
      'Работа без интернета на станции',
      'Сканирование QR за 1 секунду',
      'Видит свои поездки и часы',
    ],
  },
  {
    Icon:     ClipboardCheck,
    title:    'Руководство дистанции',
    sub:      'Начальник ШЧ, мастер',
    items: [
      'Согласование маршрутов в 1 клик',
      'Видит кто где находится в реальном времени',
      'Утверждение по итогам поездки',
      'Дашборд по дистанции',
      'Без бумажных журналов',
    ],
  },
  {
    Icon:     FileSpreadsheet,
    title:    'Бухгалтерия',
    sub:      'Расчёт зарплат',
    items: [
      'Excel-реестр формируется автоматически',
      'Все поездки уже согласованы и утверждены',
      'Нет ручной сверки и переписки',
      'Готовый отчёт за один клик',
      'Архив всех листов в системе',
    ],
  },
];

const CRITERIA = [
  { n: 1, title: '100% маршрутов цифровые',        desc: 'Все служебные поездки оформлены в RailRoutes без бумаги' },
  { n: 2, title: 'QR-факт на каждой станции',       desc: 'Прибытие и убытие подтверждены сканированием' },
  { n: 3, title: 'Excel-реестр без ручной сводки',  desc: 'Бухгалтерия получает готовый файл из системы' },
  { n: 4, title: 'Время согласования < 1 часа',     desc: 'Лист утверждается в день оформления' },
  { n: 5, title: 'Работа в офлайн-режиме',          desc: 'Приложение работает без интернета, синхронизация при подключении' },
  { n: 6, title: 'Положительный отзыв 80% работников', desc: 'Опрос пилотных пользователей' },
];

const MVP_IN = [
  'Цифровой маршрутный лист (создание, согласование, утверждение)',
  'QR-сканирование на 3 пилотных станциях',
  'Офлайн-режим для работника',
  'Базовое мобильное приложение для ШЧ',
  'Веб-кабинет руководителя дистанции',
  'Excel-реестр для бухгалтерии',
  'Архив поездок с поиском',
];

const MVP_OUT = [
  'RailWork (управление работами по ГТП)',
  'RailDocs (электронные журналы и приказы)',
  'RailSafety (онлайн-инструктажи)',
  'RailCrew (цикл локомотивных бригад)',
  'Интеграция с корпоративными системами КТЖ',
  'ИИ-обработка нормативных документов',
  'Автоматический расчёт зарплаты',
];

const STATIONS = ['Айса', 'Донгал', 'Босага'];

const FAQ = [
  { q: 'Финальная схема ролей и подписей',                    a: 'Уточняется в КТЖ' },
  { q: 'Список пилотных станций',                             a: 'Предварительно: Айса, Донгал, Босага (ожидается подтверждение)' },
  { q: 'Требования к QR-меткам на станциях',                  a: 'Уточняется — тип носителя, защита, размещение' },
  { q: 'Интеграция с действующей бухгалтерской системой',     a: 'В пилоте — только Excel-реестр. Прямая интеграция не в скоупе MVP' },
  { q: 'Сроки запуска пилота',                                a: 'Уточняется совместно с командой КТЖ' },
  { q: 'Обучение пилотных пользователей',                     a: 'Планируется однодневная сессия + инструкция в приложении' },
];

// ─── Subcomponents ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: C.dim }}>
      {children}
    </div>
  );
}

// ─── Chain Step (horizontal pill) ──────────────────────────────────────────────

function ChainStep({ n, label, sub, isLast }: { n: number; label: string; sub: string; isLast: boolean }) {
  return (
    <div className="flex items-center gap-0 shrink-0">
      <div className="flex flex-col items-center w-24">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-1.5 shrink-0"
          style={{ background: C.blue, color: '#fff', boxShadow: `0 0 0 3px ${C.blue}25` }}
        >
          {n}
        </div>
        <div className="text-xs font-semibold text-center leading-tight mb-0.5" style={{ color: C.text }}>
          {label}
        </div>
        <div className="text-[10px] text-center leading-snug" style={{ color: C.dim }}>
          {sub}
        </div>
      </div>
      {!isLast && (
        <div className="w-4 h-px mx-1 shrink-0" style={{ background: C.border }} />
      )}
    </div>
  );
}

// ─── Role Card ──────────────────────────────────────────────────────────────────

function RoleCard({ Icon, title, sub, items }: typeof ROLES[0]) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: C.card, borderColor: C.border, borderTop: `3px solid ${C.blue}` }}
    >
      <div className="px-5 py-4" style={{ background: C.blue + '08' }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
          style={{ background: C.blue + '18' }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: C.blue }} size={18} />
        </div>
        <div className="text-sm font-bold mb-0.5" style={{ color: C.text }}>{title}</div>
        <div className="text-xs" style={{ color: C.muted }}>{sub}</div>
      </div>
      <ul className="px-5 py-4 space-y-2.5">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: C.green }} />
            <span className="text-sm leading-snug" style={{ color: C.muted }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Criterion Card ─────────────────────────────────────────────────────────────

function CriterionCard({ n, title, desc }: typeof CRITERIA[0]) {
  return (
    <div
      className="rounded-xl border p-5 flex gap-4 items-start"
      style={{ background: C.card, borderColor: C.border }}
    >
      <div
        className="text-4xl font-bold leading-none shrink-0 tabular-nums"
        style={{ color: C.blue + '50', fontVariantNumeric: 'tabular-nums' }}
      >
        {n}
      </div>
      <div>
        <div className="text-sm font-bold mb-1" style={{ color: C.text }}>{title}</div>
        <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Accordion Item ──────────────────────────────────────────────────────────────

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const AMBER = '#d97706';

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: C.card, borderColor: open ? AMBER + '40' : C.border }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors duration-150"
        style={{ background: open ? AMBER + '08' : 'transparent' }}
      >
        <HelpCircle className="w-4 h-4 shrink-0" style={{ color: open ? AMBER : C.dim }} />
        <span className="flex-1 text-sm font-medium" style={{ color: open ? C.text : C.muted }}>
          {q}
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{ color: C.dim, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        style={{
          maxHeight:  open ? '120px' : '0px',
          overflow:   'hidden',
          transition: 'max-height 0.25s ease-out',
        }}
      >
        <div className="px-5 pb-4 pt-1 border-t" style={{ borderColor: C.border }}>
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PilotPage() {
  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* 1. Hero */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{
              background:   'rgba(16,185,129,0.12)',
              color:        '#6ee7b7',
              borderColor:  'rgba(16,185,129,0.3)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
            Текущий этап
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2" style={{ color: C.text }}>
            Пилот RailRoutes для ШЧ
          </h1>
          <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: C.muted }}>
            Цифровой маршрутный лист на пилотных станциях магистральной сети
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              { label: '3 пилотные станции', color: '#2563eb' },
              { label: '10 шагов процесса',  color: '#7c3aed' },
              { label: '6 критериев успеха', color: '#10b981' },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="text-xs font-medium px-3 py-1.5 rounded-full border"
                style={{ color, borderColor: color + '40', background: color + '12' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* 2. Цифровая цепочка */}
        <section>
          <SectionLabel>Цифровая цепочка</SectionLabel>
          <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
            Служебная поездка ШЧ — 10 шагов
          </h2>
          <div
            className="rounded-xl border p-5 overflow-x-auto"
            style={{ background: C.card, borderColor: C.border }}
          >
            <div className="flex items-start" style={{ minWidth: 'max-content' }}>
              {CHAIN_STEPS.map((s, i) => (
                <ChainStep key={s.n} {...s} isLast={i === CHAIN_STEPS.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Что получает каждая роль */}
        <section>
          <SectionLabel>Участники</SectionLabel>
          <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
            Что получает каждая роль
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ROLES.map(role => (
              <RoleCard key={role.title} {...role} />
            ))}
          </div>
        </section>

        {/* 4. Критерии успеха */}
        <section>
          <SectionLabel>Критерии успеха</SectionLabel>
          <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
            Пилот считается успешным, если
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CRITERIA.map(c => (
              <CriterionCard key={c.n} {...c} />
            ))}
          </div>
        </section>

        {/* 5. Объём пилота */}
        <section>
          <SectionLabel>Объём пилота</SectionLabel>
          <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
            Что входит в MVP и что вне скоупа
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* In */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{ background: C.card, borderColor: C.border, borderTop: `3px solid ${C.green}` }}
            >
              <div className="flex items-center gap-2.5 px-5 py-4" style={{ background: C.green + '08' }}>
                <CheckCircle className="w-4.5 h-4.5 shrink-0" style={{ color: C.green }} size={18} />
                <span className="text-sm font-bold" style={{ color: C.text }}>Входит в MVP</span>
              </div>
              <ul className="px-5 py-4 space-y-3">
                {MVP_IN.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: C.green }} />
                    <span className="text-sm leading-snug" style={{ color: C.muted }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Out */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{ background: C.card, borderColor: C.border, borderTop: `3px solid ${C.dim}` }}
            >
              <div className="flex items-center gap-2.5 px-5 py-4" style={{ background: C.dim + '10' }}>
                <XCircle className="w-4.5 h-4.5 shrink-0" style={{ color: C.dim }} size={18} />
                <span className="text-sm font-bold" style={{ color: C.muted }}>Не входит в MVP</span>
              </div>
              <ul className="px-5 py-4 space-y-3">
                {MVP_OUT.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <X className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: C.dim }} />
                    <span className="text-sm leading-snug" style={{ color: C.dim }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Пилотные станции */}
        <section>
          <SectionLabel>Пилотные станции</SectionLabel>
          <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
            Где запускаем
          </h2>
          <div
            className="rounded-xl border p-5"
            style={{ background: C.card, borderColor: C.border }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STATIONS.map(name => (
                <div
                  key={name}
                  className="rounded-xl border flex items-center gap-3 px-4 py-4"
                  style={{ background: C.bg, borderColor: C.border }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: C.blue + '15' }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: C.blue }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: C.text }}>{name}</div>
                    <div className="text-xs mt-0.5" style={{ color: C.dim }}>
                      Контур НЖС · Магистральная сеть
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Открытые вопросы */}
        <section>
          <SectionLabel>Открытые вопросы</SectionLabel>
          <h2 className="text-xl font-bold mb-5" style={{ color: C.text }}>
            Уточняется в процессе подготовки
          </h2>
          <div className="space-y-2">
            {FAQ.map(item => (
              <AccordionItem key={item.q} {...item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
