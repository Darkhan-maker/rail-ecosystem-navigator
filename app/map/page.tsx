'use client';

import { useState } from 'react';
import { IBM_Plex_Sans } from 'next/font/google';
import { ArrowDown, X } from 'lucide-react';
import { contours, modules } from '@/data/railEcosystemContent';
import type { Module } from '@/types/railEcosystem';
import Link from 'next/link';

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// ─── Problem each module addresses ────────────────────────────────────────────

const MODULE_PROBLEMS: Record<string, string> = {
  'railroutes':   'Бумажные маршрутные листы без QR-верификации и цифрового контроля выезда',
  'railwork':     'ГТП и фактические выезды не связаны — нет сравнения план/факт',
  'raildocs':     'Журналы и акты на бумаге — нет архива, нет поиска, нет аудита',
  'railsafety':   'Инструктажи и нормативная база не ведутся в цифровом виде',
  'railcrew':     'Данные о вызове, явке, меддопуске и рейсах бригад разрознены',
  'railtime':     'Рабочее время фиксируется вручную — ошибки в табелях и расчётах',
  'railcargo':    'Грузовые операции и рейсы не отражены в единой системе',
  'railanalytics':'Отчёты формируются вручную, с задержками, без единой картины',
  'railai':       'Нормативная база не обрабатывается автоматически для проверок',
  'raildatahub':  'Нет единого хранилища событий — аудит и трассировка невозможны',
  'integration':  'Отсутствие интеграции с корпоративными системами КТЖ (ERP, HR)',
  'notifications':'Согласования и подтверждения выполняются вне единой системы',
  'reporting':    'Разрозненные Excel без источника правды — ошибки при сводке',
  'usermgmt':     'Управление доступами не централизовано — риски безопасности данных',
};

// ─── Status badges for dark background ────────────────────────────────────────

const STATUS_DARK: Record<string, { label: string; bg: string; text: string; border: string }> = {
  'mvp-priority':   { label: 'MVP',            bg: 'rgba(37,99,235,0.25)',  text: '#93c5fd', border: 'rgba(37,99,235,0.5)'  },
  'mvp-support':    { label: 'MVP',            bg: 'rgba(8,145,178,0.25)',  text: '#67e8f9', border: 'rgba(8,145,178,0.5)'  },
  'core-stage':     { label: 'Ядро',           bg: 'rgba(22,163,74,0.25)',  text: '#86efac', border: 'rgba(22,163,74,0.5)'  },
  'next-stage':     { label: 'Следующий',      bg: 'rgba(124,58,237,0.25)', text: '#c4b5fd', border: 'rgba(124,58,237,0.5)' },
  'future-stage':   { label: 'Будущий',        bg: 'rgba(100,116,139,0.2)', text: '#94a3b8', border: 'rgba(100,116,139,0.4)' },
  'parallel-stage': { label: 'Параллельный',   bg: 'rgba(249,115,22,0.2)',  text: '#fdba74', border: 'rgba(249,115,22,0.4)' },
  'planned-stage':  { label: 'Запланирован',   bg: 'rgba(245,158,11,0.2)',  text: '#fcd34d', border: 'rgba(245,158,11,0.4)' },
  'strategic-stage':{ label: 'Стратегический', bg: 'rgba(239,68,68,0.15)', text: '#fca5a5', border: 'rgba(239,68,68,0.35)' },
};

// ─── Per-contour visual config ─────────────────────────────────────────────────

const CONTOUR_DISPLAY: Record<string, {
  accentColor: string;
  tagText: string;
  problemTitle: string;
  problemDesc: string;
}> = {
  'magistral': {
    accentColor: '#2563eb',
    tagText: '#60a5fa',
    problemTitle: 'Ручной бумажный документооборот',
    problemDesc: 'Маршрутные листы, акты и журналы ведутся вручную — нет контроля, нет аудита, есть фиктивные поездки.',
  },
  'cargo': {
    accentColor: '#d97706',
    tagText: '#fbbf24',
    problemTitle: 'Разрозненный учёт локомотивных бригад',
    problemDesc: 'Данные о вызове, явке, меддопуске и рейсах не объединены — ошибки в расчёте рабочего времени.',
  },
};

const LEGEND_KEYS = [
  'mvp-priority', 'core-stage', 'next-stage',
  'future-stage', 'planned-stage', 'strategic-stage',
] as const;

// ─── Fade-in keyframe ──────────────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes mapFadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ─── Shared colours ────────────────────────────────────────────────────────────

const C = {
  bg:        '#080d1a',
  card:      '#0c1424',
  border:    '#1e293b',
  divider:   '#0f1e2e',
  textPrimary:   '#e2e8f0',
  textSecondary: '#64748b',
  textMuted:     '#334155',
} as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function ArrowConnector() {
  return (
    <div className="flex flex-col items-center py-3" aria-hidden="true">
      <div className="w-px h-5" style={{ background: C.divider }} />
      <ArrowDown className="w-4 h-4" style={{ color: C.textMuted }} />
    </div>
  );
}

function OrgChain({
  chain,
  accentColor,
}: {
  chain: { label: string; sublabel?: string }[];
  accentColor: string;
}) {
  return (
    <div className="space-y-0.5">
      {chain.map((node, i) =>
        i === 0 ? (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accentColor }} />
            <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>{node.label}</span>
          </div>
        ) : (
          <div key={i} className="ml-4 border-l pl-3" style={{ borderColor: accentColor + '30' }}>
            <div className="flex items-start gap-2 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#334155' }} />
              <div>
                <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{node.label}</span>
                {node.sublabel && (
                  <span className="text-[11px] ml-1.5" style={{ color: C.textSecondary }}>{node.sublabel}</span>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function ProblemBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="rounded-lg px-3 py-2.5 mt-4"
      style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-widest mb-1"
        style={{ color: '#f87171' }}
      >
        Текущая проблема
      </div>
      <div className="text-xs font-semibold mb-0.5" style={{ color: '#fca5a5' }}>{title}</div>
      <div className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{desc}</div>
    </div>
  );
}

function ModuleTag({
  mod,
  accentColor,
  tagText,
  active,
  onClick,
}: {
  mod: Module;
  accentColor: string;
  tagText: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-medium px-2.5 py-1 rounded-full border transition-all duration-150"
      style={
        active
          ? { background: accentColor, color: '#fff', borderColor: accentColor }
          : {
              background: accentColor + '18',
              color: tagText,
              borderColor: accentColor + '38',
            }
      }
    >
      {mod.name}
    </button>
  );
}

function ModulePanel({ mod, onClose }: { mod: Module; onClose: () => void }) {
  const status = STATUS_DARK[mod.status] ?? STATUS_DARK['future-stage'];
  const problem = MODULE_PROBLEMS[mod.id];

  return (
    <div
      className="rounded-xl p-5 mt-4"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        animation: 'mapFadeIn 200ms ease-out',
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <span
            className="inline-flex text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-2"
            style={{ background: status.bg, color: status.text, borderColor: status.border }}
          >
            {status.label}
          </span>
          <h3 className="text-base font-bold leading-snug" style={{ color: C.textPrimary }}>
            {mod.name}
          </h3>
          <div className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{mod.russianName}</div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: '#475569' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1e293b')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          aria-label="Закрыть"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
        {mod.description}
      </p>

      {problem && (
        <div
          className="rounded-lg px-3 py-2.5 mt-3"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#f87171' }}>
            Решает проблему
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{problem}</p>
        </div>
      )}

      <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${C.divider}` }}>
        <Link
          href={`/modules#${mod.id}`}
          className="text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#60a5fa' }}
        >
          Полная карточка модуля →
        </Link>
      </div>
    </div>
  );
}

function StatusLegend() {
  return (
    <div className="mt-12 pt-6" style={{ borderTop: `1px solid ${C.divider}` }}>
      <div
        className="text-[10px] font-bold uppercase tracking-widest mb-3"
        style={{ color: C.textMuted }}
      >
        Легенда статусов
      </div>
      <div className="flex flex-wrap gap-2">
        {LEGEND_KEYS.map(key => {
          const s = STATUS_DARK[key];
          return (
            <span
              key={key}
              className="text-xs px-2.5 py-0.5 rounded-full border"
              style={{ background: s.bg, color: s.text, borderColor: s.border }}
            >
              {s.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MapPage() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const magistral = contours[0];
  const cargo     = contours[1];
  const core      = contours[2];

  const cfgMag   = CONTOUR_DISPLAY['magistral'];
  const cfgCargo = CONTOUR_DISPLAY['cargo'];

  const selectedMod = activeModuleId
    ? (modules.find(m => m.id === activeModuleId) ?? null)
    : null;

  function toggleModule(id: string) {
    setActiveModuleId(prev => (prev === id ? null : id));
  }

  function renderModuleTags(moduleIds: string[], accentColor: string, tagText: string) {
    return moduleIds.map(id => {
      const m = modules.find(mod => mod.id === id);
      if (!m) return null;
      return (
        <ModuleTag
          key={id}
          mod={m}
          accentColor={accentColor}
          tagText={tagText}
          active={activeModuleId === id}
          onClick={() => toggleModule(id)}
        />
      );
    });
  }

  return (
    <div className={ibmPlex.className} style={{ background: C.bg, minHeight: '100vh' }}>
      <style>{KEYFRAMES}</style>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-20">

        {/* ── КТЖ root ────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl px-6 py-5 text-center"
          style={{
            background: 'linear-gradient(135deg, #0c1e3a 0%, #071428 100%)',
            border: '1px solid #1e3a5f',
          }}
        >
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: '#3b82f6' }}
          >
            Национальный оператор
          </div>
          <h1 className="text-2xl font-bold" style={{ color: C.textPrimary }}>КТЖ</h1>
          <p className="text-sm mt-1" style={{ color: C.textSecondary }}>
            АО «Казахстанские железные дороги»
          </p>
          <p className="text-xs mt-2 max-w-md mx-auto leading-relaxed" style={{ color: '#334155' }}>
            Единая цифровая экосистема для двух операционных контуров
            и общего цифрового ядра платформы
          </p>
        </div>

        <ArrowConnector />

        {/* ── Два контура ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Магистральная сеть */}
          <div
            className="rounded-xl p-5"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${cfgMag.accentColor}`,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: cfgMag.accentColor }}
            >
              Операционный контур
            </div>
            <h2 className="text-sm font-bold mb-4" style={{ color: C.textPrimary }}>
              {magistral.name}
            </h2>

            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: C.textMuted }}
            >
              Организационная иерархия
            </div>
            <OrgChain chain={magistral.chain} accentColor={cfgMag.accentColor} />

            <ProblemBlock title={cfgMag.problemTitle} desc={cfgMag.problemDesc} />

            <div className="mt-4">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: C.textMuted }}
              >
                Цифровые модули
              </div>
              <div className="flex flex-wrap gap-1.5">
                {renderModuleTags(magistral.modules, cfgMag.accentColor, cfgMag.tagText)}
              </div>
            </div>
          </div>

          {/* Грузовые перевозки */}
          <div
            className="rounded-xl p-5"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${cfgCargo.accentColor}`,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: cfgCargo.accentColor }}
            >
              Операционный контур
            </div>
            <h2 className="text-sm font-bold mb-4" style={{ color: C.textPrimary }}>
              {cargo.name}
            </h2>

            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: C.textMuted }}
            >
              Организационная иерархия
            </div>
            <OrgChain chain={cargo.chain} accentColor={cfgCargo.accentColor} />

            <ProblemBlock title={cfgCargo.problemTitle} desc={cfgCargo.problemDesc} />

            <div className="mt-4">
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: C.textMuted }}
              >
                Цифровые модули
              </div>
              <div className="flex flex-wrap gap-1.5">
                {renderModuleTags(cargo.modules, cfgCargo.accentColor, cfgCargo.tagText)}
              </div>
            </div>
          </div>
        </div>

        <ArrowConnector />

        {/* ── Цифровое ядро ───────────────────────────────────────────── */}
        <div
          className="rounded-xl p-5"
          style={{
            background: 'rgba(124,58,237,0.07)',
            border: '1px solid rgba(124,58,237,0.22)',
          }}
        >
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: '#a78bfa' }}
          >
            Горизонтальная платформа
          </div>
          <h2 className="text-sm font-bold mb-1" style={{ color: C.textPrimary }}>
            {core.name}
          </h2>
          <p className="text-xs leading-relaxed mb-4" style={{ color: C.textSecondary }}>
            {core.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {renderModuleTags(core.modules, '#7c3aed', '#c4b5fd')}
          </div>
        </div>

        {/* ── Панель выбранного модуля ─────────────────────────────────── */}
        {selectedMod && (
          <ModulePanel mod={selectedMod} onClose={() => setActiveModuleId(null)} />
        )}

        {/* ── Легенда статусов ─────────────────────────────────────────── */}
        <StatusLegend />

      </div>
    </div>
  );
}
