import Link from 'next/link';
import {
  QrCode, FileSpreadsheet, BarChart3,
  AlertTriangle, CheckCircle,
  Route, Container, Cpu,
  ArrowRight,
} from 'lucide-react';
import { contours, roadmapStages } from '@/data/railEcosystemContent';

// ─── Shared ────────────────────────────────────────────────────────────────────

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
  blue:   '#2563eb',
};

const SectionWrap = ({ children, accent }: { children: React.ReactNode; accent?: string }) => (
  <section
    className="py-12 md:py-16 border-b"
    style={{ background: accent ?? C.bg, borderColor: C.border }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: C.blue }}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-snug" style={{ color: C.text }}>
    {children}
  </h2>
);

const SectionSub = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: C.muted }}>
    {children}
  </p>
);

// ─── 1. Hero ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="py-16 md:py-24 border-b"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: 'rgba(37,99,235,0.15)', color: '#93c5fd', borderColor: 'rgba(37,99,235,0.3)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Пилот запущен · Этап 1
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl"
          style={{ color: C.text }}
        >
          Цифровая карта эксплуатации железной дороги КТЖ
        </h1>

        <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: C.muted }}>
          Единая платформа для контуров обслуживания инфраструктуры, грузовых перевозок
          и цифрового ядра. От бумажного маршрутного листа до аналитики в реальном времени.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: C.blue, color: '#fff' }}
          >
            Открыть карту экосистемы
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pilot"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border transition-colors hover:border-slate-500"
            style={{ color: C.text, borderColor: C.border, background: C.card }}
          >
            Детали пилота
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Что это даёт ──────────────────────────────────────────────────────────

const benefits = [
  {
    Icon: QrCode,
    title: 'Цифровой маршрутный лист',
    desc:  'QR-отметки фиксируют реальный факт выезда на станцию — без бумаги, без ручного учёта.',
    color: '#2563eb',
  },
  {
    Icon: FileSpreadsheet,
    title: 'Автоматический Excel-реестр',
    desc:  'Таблица поездок для бухгалтерии формируется сама по итогам согласованных маршрутов.',
    color: '#d97706',
  },
  {
    Icon: BarChart3,
    title: 'Аналитика по дистанции',
    desc:  'Частота поездок, нагрузка на сотрудников, выполнение работ — в одном дашборде.',
    color: '#7c3aed',
  },
];

function BenefitsSection() {
  return (
    <SectionWrap accent={C.card}>
      <SectionLabel>Что это даёт</SectionLabel>
      <SectionTitle>Три главных результата</SectionTitle>
      <SectionSub>
        Платформа переводит рутинные процессы эксплуатации из бумаги в данные.
      </SectionSub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map(({ Icon, title, desc, color }) => (
          <div
            key={title}
            className="rounded-xl p-5 border"
            style={{ background: C.bg, borderColor: C.border }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: color + '22' }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="text-base font-semibold mb-2" style={{ color: C.text }}>{title}</div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── 3. Проблемы которые решаем ───────────────────────────────────────────────

const problems = [
  { problem: 'Маршрутные листы на бумаге — теряются, подделываются',  fix: 'QR-отметка = неопровержимый цифровой факт выезда' },
  { problem: 'Excel-реестр для бухгалтерии ведётся вручную каждый месяц', fix: 'Реестр формируется автоматически после согласования' },
  { problem: 'Начальник не знает, кто реально выехал и что сделал',   fix: 'Мобильный дашборд: статус каждой поездки в реальном времени' },
  { problem: 'Данные по работам, времени и поездкам — в разных системах', fix: 'Единая платформа объединяет все операционные контуры КТЖ' },
];

function ProblemsSection() {
  return (
    <SectionWrap>
      <SectionLabel>Проблемы которые решаем</SectionLabel>
      <SectionTitle>До и после</SectionTitle>
      <SectionSub>Реальные операционные боли, которые устраняет Rail Ecosystem.</SectionSub>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {problems.map(({ problem, fix }, i) => (
          <div
            key={i}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: C.border, background: C.card }}
          >
            <div
              className="flex items-start gap-3 px-4 py-3 border-b"
              style={{ borderColor: C.border, background: 'rgba(220,38,38,0.06)' }}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#f87171' }} />
              <p className="text-sm leading-snug" style={{ color: '#fca5a5' }}>{problem}</p>
            </div>
            <div className="flex items-start gap-3 px-4 py-3">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
              <p className="text-sm leading-snug" style={{ color: '#86efac' }}>{fix}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── 4. Три операционных контура ─────────────────────────────────────────────

const CONTOUR_ICONS: Record<string, React.ElementType> = {
  'magistral':    Route,
  'cargo':        Container,
  'digital-core': Cpu,
};

function ContoursSection() {
  return (
    <SectionWrap accent={C.card}>
      <SectionLabel>Архитектура</SectionLabel>
      <SectionTitle>Три операционных контура</SectionTitle>
      <SectionSub>
        Платформа охватывает все ключевые направления деятельности КТЖ,
        объединяя их через цифровое ядро.
      </SectionSub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contours.map((c) => {
          const Icon = CONTOUR_ICONS[c.id] ?? Route;
          return (
            <div
              key={c.id}
              className="rounded-xl p-5 border"
              style={{ background: C.bg, borderColor: C.border, borderTop: `3px solid ${c.color}` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: c.color + '22' }}
              >
                <Icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div className="text-base font-semibold mb-1.5" style={{ color: C.text }}>{c.name}</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{c.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.modules.slice(0, 4).map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2 py-0.5 rounded-md border"
                    style={{ color: C.muted, borderColor: C.border, background: C.card }}
                  >
                    {m}
                  </span>
                ))}
                {c.modules.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ color: C.dim }}>
                    +{c.modules.length - 4}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── 5. Поток данных ──────────────────────────────────────────────────────────

const dataFlow = [
  { label: 'Поездка',     desc: 'Работник ШЧ выезжает на станцию' },
  { label: 'QR-отметка',  desc: 'Прибытие и убытие фиксируются сканом' },
  { label: 'Сервер',      desc: 'Маршрутный лист поступает на согласование' },
  { label: 'Утверждение', desc: 'Начальник подтверждает итог поездки' },
  { label: 'Реестр',      desc: 'Excel-таблица формируется автоматически' },
  { label: 'Аналитика',   desc: 'Данные идут в дашборды и KPI дистанции' },
];

function DataFlowSection() {
  return (
    <SectionWrap>
      <SectionLabel>Поток данных</SectionLabel>
      <SectionTitle>От события на станции до аналитики</SectionTitle>
      <SectionSub>Шесть шагов, которые превращают факт поездки в управленческие данные.</SectionSub>

      {/* Desktop */}
      <div className="hidden md:flex items-start gap-0">
        {dataFlow.map((s, i) => (
          <div key={s.label} className="flex items-start shrink-0">
            <div className="flex flex-col items-center w-28 lg:w-32">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 shrink-0"
                style={{ background: C.blue, color: '#fff' }}
              >
                {i + 1}
              </div>
              <div className="text-sm font-semibold text-center leading-tight mb-1" style={{ color: C.text }}>
                {s.label}
              </div>
              <div className="text-xs text-center leading-snug" style={{ color: C.muted }}>
                {s.desc}
              </div>
            </div>
            {i < dataFlow.length - 1 && (
              <div className="flex items-start pt-3 px-0.5 shrink-0">
                <ArrowRight className="w-4 h-4" style={{ color: C.dim }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-0">
        {dataFlow.map((s, i) => (
          <div key={s.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: C.blue, color: '#fff' }}
              >
                {i + 1}
              </div>
              {i < dataFlow.length - 1 && (
                <div className="w-px flex-1 mt-1 mb-1" style={{ background: C.border }} />
              )}
            </div>
            <div className="pb-4 pt-1">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{s.label}</div>
              <div className="text-xs mt-0.5" style={{ color: C.muted }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── 6. Текущий пилот ─────────────────────────────────────────────────────────

const pilotBullets = [
  'Станции Айса, Донгал, Босага — три точки пилота',
  'Цифровой маршрутный лист с QR-отметками на входе и выходе',
  'Офлайн-режим: работает без интернета на станции',
  'Цепочка согласования: исполнитель → начальник → утверждение',
  'Excel-реестр для бухгалтерии формируется автоматически',
];

function PilotSection() {
  return (
    <SectionWrap accent={C.card}>
      <div
        className="rounded-2xl p-6 md:p-8 border"
        style={{ borderColor: 'rgba(22,163,74,0.3)', background: 'rgba(22,163,74,0.06)' }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(22,163,74,0.2)' }}
          >
            <QrCode className="w-6 h-6" style={{ color: '#4ade80' }} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#4ade80' }}>
              Текущий пилот
            </div>
            <h2 className="text-xl font-bold mb-1" style={{ color: C.text }}>RailRoutes MVP · Контур НЖС</h2>
            <p className="text-sm mb-5" style={{ color: C.muted }}>
              Цифровой маршрутный лист для служебных поездок работников ШЧ.
            </p>
            <ul className="space-y-2 mb-6">
              {pilotBullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
                  <span className="text-sm" style={{ color: C.muted }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border transition-colors hover:opacity-90"
              style={{ color: '#4ade80', borderColor: 'rgba(22,163,74,0.4)', background: 'rgba(22,163,74,0.12)' }}
            >
              Подробнее о пилоте
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

// ─── 7. Дорожная карта (превью) ───────────────────────────────────────────────

const STAGE_STYLE: Record<string, { bg: string; text: string; border: string; label: string }> = {
  current: { bg: 'rgba(22,163,74,0.15)',  text: '#86efac', border: 'rgba(22,163,74,0.35)',  label: 'Текущий' },
  next:    { bg: 'rgba(37,99,235,0.12)',  text: '#93c5fd', border: 'rgba(37,99,235,0.3)',   label: 'Следующий' },
  future:  { bg: 'rgba(100,116,139,0.1)', text: '#94a3b8', border: 'rgba(100,116,139,0.25)', label: 'Будущий' },
};

function RoadmapPreviewSection() {
  return (
    <SectionWrap>
      <SectionLabel>Дорожная карта</SectionLabel>
      <SectionTitle>Пять этапов развития</SectionTitle>
      <SectionSub>
        От пилота одного модуля до интеллектуальной платформы масштаба КТЖ.
      </SectionSub>
      <div className="space-y-3">
        {roadmapStages.map((stage) => {
          const s = STAGE_STYLE[stage.status] ?? STAGE_STYLE.future;
          return (
            <div
              key={stage.number}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl p-4 border"
              style={{ background: C.card, borderColor: C.border }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
              >
                {stage.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: C.text }}>{stage.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium border"
                    style={{ background: s.bg, color: s.text, borderColor: s.border }}
                  >
                    {s.label}
                  </span>
                </div>
                <p className="text-xs" style={{ color: C.muted }}>{stage.subtitle}</p>
              </div>
              <p className="text-xs leading-relaxed sm:max-w-xs" style={{ color: C.dim }}>
                {stage.result}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: C.blue }}
        >
          Открыть полную дорожную карту
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrap>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ProblemsSection />
      <ContoursSection />
      <DataFlowSection />
      <PilotSection />
      <RoadmapPreviewSection />
    </>
  );
}
