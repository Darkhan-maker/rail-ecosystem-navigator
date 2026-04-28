'use client';

import { useState } from 'react';
import { Route, Container, CheckCircle, Workflow } from 'lucide-react';
import { scenarios } from '@/data/railEcosystemContent';
import { ScenarioStepper } from '@/components/ScenarioStepper';
import { Term } from '@/components/Term';
import type { Scenario } from '@/types/railEcosystem';

// ─── Constants ─────────────────────────────────────────────────────────────────

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
};

// ─── Per-scenario config ────────────────────────────────────────────────────────

const SCENARIO_META: Record<string, {
  color:    string;
  Icon:     React.ElementType;
  contour:  React.ReactNode;
  modules:  string;
  results:  string[];
}> = {
  'shch-trip': {
    color:   '#2563eb',
    Icon:    Route,
    contour: <>Контур <Term>ШЧ</Term> (дистанция пути)</>,
    modules: 'RailRoutes · RailDocs · RailSafety · RailAnalytics',
    results: [
      'Каждая поездка имеет цифровой след: исполнитель, маршрут, время, результат работы',
      'Excel-реестр формируется автоматически — бухгалтерии не нужны ручные таблицы',
      'Дашборд RailAnalytics показывает KPI дистанции в реальном времени',
    ],
  },
  'crew-cycle': {
    color:   '#d97706',
    Icon:    Container,
    contour: 'Контур грузовых перевозок (бригады)',
    modules: 'RailCrew · RailTime · RailSafety · Notifications',
    results: [
      'Полный цикл бригады — от вызова до расчёта — без бумажных нарядов',
      'Медицинский допуск и время явки фиксируются автоматически',
      'Данные RailTime готовы для расчёта оплаты без ручного ввода',
    ],
  },
};

// ─── Tab button ─────────────────────────────────────────────────────────────────

interface TabButtonProps {
  scenario: Scenario;
  active:   boolean;
  onClick:  () => void;
}

function TabButton({ scenario, active, onClick }: TabButtonProps) {
  const meta = SCENARIO_META[scenario.id];
  const { color, Icon } = meta;

  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center gap-3 px-4 py-4 rounded-xl border text-left transition-all duration-150"
      style={{
        background:   active ? color + '12' : C.card,
        borderColor:  active ? color + '50' : C.border,
        borderBottom: active ? `2px solid ${color}` : `2px solid transparent`,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: active ? color + '20' : color + '10' }}
      >
        <Icon className="w-4 h-4" style={{ color: active ? color : C.dim }} />
      </div>
      <div className="min-w-0">
        <div
          className="text-sm font-semibold leading-tight truncate"
          style={{ color: active ? C.text : C.muted }}
        >
          {scenario.title}
        </div>
        <div className="text-xs mt-0.5" style={{ color: active ? color : C.dim }}>
          {meta.contour}
        </div>
      </div>
    </button>
  );
}

// ─── Scenario header card ───────────────────────────────────────────────────────

function ScenarioHeader({ scenario }: { scenario: Scenario }) {
  const { color, Icon, contour, modules } = SCENARIO_META[scenario.id];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: C.card, borderColor: C.border, borderTop: `3px solid ${color}` }}
    >
      <div className="px-6 py-5" style={{ background: color + '08' }}>
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: color + '18' }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>
              {scenario.title}
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: C.muted }}>
              {scenario.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full border"
                style={{ color, borderColor: color + '40', background: color + '10' }}
              >
                {scenario.steps.length} шагов
              </span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full border"
                style={{ color: C.muted, borderColor: C.border, background: C.bg }}
              >
                {contour}
              </span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full border"
                style={{ color: C.dim, borderColor: C.border, background: C.bg }}
              >
                {modules}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Result block ───────────────────────────────────────────────────────────────

function ResultBlock({ scenario }: { scenario: Scenario }) {
  const { color, results } = SCENARIO_META[scenario.id];
  const GREEN = '#10b981';

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: C.card, borderColor: C.border, borderTop: `3px solid ${GREEN}` }}
    >
      <div className="px-6 py-5" style={{ background: GREEN + '08' }}>
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-4"
          style={{ color: GREEN }}
        >
          Результат сценария
        </div>
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GREEN }} />
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                {r}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ScenariosPage() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const scenario = scenarios.find(s => s.id === activeId) ?? scenarios[0];
  const color = SCENARIO_META[activeId].color;

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* Hero */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ color: C.dim }}
          >
            <Workflow className="w-3.5 h-3.5" />
            Процессы
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ color: C.text }}
          >
            Операционные сценарии
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.muted }}>
            Ключевые сквозные процессы Rail Ecosystem — от первого события до управленческого результата.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Tab switcher */}
        <div className="flex flex-col sm:flex-row gap-3">
          {scenarios.map(s => (
            <TabButton
              key={s.id}
              scenario={s}
              active={s.id === activeId}
              onClick={() => setActiveId(s.id)}
            />
          ))}
        </div>

        {/* Scenario header */}
        <ScenarioHeader scenario={scenario} />

        {/* Timeline */}
        <div
          className="text-[10px] font-bold uppercase tracking-widest px-1"
          style={{ color: C.dim }}
        >
          Шаги сценария
        </div>
        <ScenarioStepper steps={scenario.steps} color={color} />

        {/* Result */}
        <ResultBlock scenario={scenario} />

      </div>
    </div>
  );
}
