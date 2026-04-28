'use client';

import { useState, useMemo } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { modules, contours } from '@/data/railEcosystemContent';
import { MODULE_ICONS } from '@/components/icons';
import type { MaturityStatus, Module } from '@/types/railEcosystem';

// ─── Design tokens ─────────────────────────────────────────────────────────────

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
};

// ─── Contour color per module (first-match from contours order) ────────────────

const MODULE_CONTOUR_COLOR: Record<string, string> = {};
for (const c of contours) {
  for (const id of c.modules) {
    if (!MODULE_CONTOUR_COLOR[id]) MODULE_CONTOUR_COLOR[id] = c.color;
  }
}

// ─── Status badge config (dark-theme) ─────────────────────────────────────────

const BADGE: Record<MaturityStatus, { label: string; bg: string; text: string; border: string }> = {
  'mvp-priority':   { label: 'MVP',        bg: 'rgba(22,163,74,0.2)',    text: '#86efac', border: 'rgba(22,163,74,0.4)'    },
  'mvp-support':    { label: 'MVP',        bg: 'rgba(22,163,74,0.15)',   text: '#86efac', border: 'rgba(22,163,74,0.3)'    },
  'core-stage':     { label: 'Ядро',       bg: 'rgba(124,58,237,0.18)',  text: '#c4b5fd', border: 'rgba(124,58,237,0.4)'  },
  'next-stage':     { label: 'Следующий',  bg: 'rgba(37,99,235,0.18)',   text: '#93c5fd', border: 'rgba(37,99,235,0.4)'   },
  'future-stage':   { label: 'Будущий',    bg: 'rgba(100,116,139,0.12)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  'parallel-stage': { label: 'Будущий',    bg: 'rgba(100,116,139,0.12)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  'planned-stage':  { label: 'Будущий',    bg: 'rgba(100,116,139,0.12)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  'strategic-stage':{ label: 'Стратег.',   bg: 'rgba(217,119,6,0.15)',   text: '#fbbf24', border: 'rgba(217,119,6,0.4)'   },
};

// ─── Filter tabs ───────────────────────────────────────────────────────────────

type FilterTab = 'all' | 'mvp' | 'core' | 'next' | 'future';

const TABS: { id: FilterTab; label: string; color: string; activeBg: string; activeBorder: string }[] = [
  { id: 'all',    label: 'Все',       color: '#e2e8f0', activeBg: 'rgba(71,85,105,0.4)',   activeBorder: 'rgba(71,85,105,0.6)'   },
  { id: 'mvp',    label: 'MVP',       color: '#86efac', activeBg: 'rgba(22,163,74,0.25)',  activeBorder: 'rgba(22,163,74,0.5)'   },
  { id: 'core',   label: 'Ядро',      color: '#c4b5fd', activeBg: 'rgba(124,58,237,0.25)', activeBorder: 'rgba(124,58,237,0.5)' },
  { id: 'next',   label: 'Следующие', color: '#93c5fd', activeBg: 'rgba(37,99,235,0.25)',  activeBorder: 'rgba(37,99,235,0.5)'  },
  { id: 'future', label: 'Будущие',   color: '#fbbf24', activeBg: 'rgba(217,119,6,0.25)',  activeBorder: 'rgba(217,119,6,0.5)'  },
];

function matchesFilter(status: MaturityStatus, tab: FilterTab): boolean {
  if (tab === 'all')    return true;
  if (tab === 'mvp')    return status === 'mvp-priority' || status === 'mvp-support';
  if (tab === 'core')   return status === 'core-stage';
  if (tab === 'next')   return status === 'next-stage';
  if (tab === 'future') return ['future-stage', 'parallel-stage', 'planned-stage', 'strategic-stage'].includes(status);
  return true;
}

// ─── Hero stats ────────────────────────────────────────────────────────────────

const mvpCount    = modules.filter(m => m.status === 'mvp-priority' || m.status === 'mvp-support').length;
const coreCount   = modules.filter(m => m.status === 'core-stage').length;
const nextCount   = modules.filter(m => m.status === 'next-stage').length;
const futureCount = modules.filter(m => ['future-stage', 'parallel-stage', 'planned-stage', 'strategic-stage'].includes(m.status)).length;

// ─── Module name lookup ────────────────────────────────────────────────────────

const MODULE_NAME = Object.fromEntries(modules.map(m => [m.id, m.name]));

// ─── ModuleCard ────────────────────────────────────────────────────────────────

function ModuleCard({
  module,
  expanded,
  onToggle,
}: {
  module: Module;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isMvp        = module.status === 'mvp-priority';
  const contourColor = MODULE_CONTOUR_COLOR[module.id] ?? '#475569';
  const badge        = BADGE[module.status] ?? { label: module.status, bg: 'rgba(100,116,139,0.12)', text: '#94a3b8', border: 'rgba(100,116,139,0.3)' };
  const Icon         = MODULE_ICONS[module.id];

  const cardStyle: React.CSSProperties = {
    background: C.card,
    scrollMarginTop: '120px',
    transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
    transform: hovered ? 'translateY(-2px)' : undefined,
    ...(isMvp
      ? {
          border:    '2px solid rgba(22,163,74,0.5)',
          boxShadow: '0 0 0 1px rgba(22,163,74,0.12), 0 4px 24px rgba(22,163,74,0.12)',
        }
      : {
          border:    hovered ? '1px solid rgba(37,99,235,0.4)' : `1px solid ${C.border}`,
          boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.3)' : undefined,
        }),
  };

  return (
    <div
      id={module.id}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={cardStyle}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top colour bar */}
      <div className="h-[3px]" style={{ background: contourColor }} />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Module icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: contourColor + '1a' }}
          >
            {Icon && <Icon className="w-5 h-5" style={{ color: contourColor }} />}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold leading-snug" style={{ color: C.text }}>
              {module.name}
            </div>
            <div className="text-xs mt-0.5 truncate" style={{ color: C.muted }}>
              {module.russianName}
            </div>
          </div>

          {/* Status badge */}
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ml-1"
            style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}
          >
            {isMvp ? '✦ MVP' : badge.label}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-3"
          style={{
            color: C.muted,
            ...(expanded ? {} : {
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }),
          }}
        >
          {module.description}
        </p>

        {/* Related module tags */}
        {module.relatedModules.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(expanded ? module.relatedModules : module.relatedModules.slice(0, 3)).map(id => (
              <span
                key={id}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md border"
                style={{
                  color:       contourColor,
                  borderColor: contourColor + '40',
                  background:  contourColor + '0d',
                }}
                onClick={e => e.stopPropagation()}
              >
                {MODULE_NAME[id] ?? id}
              </span>
            ))}
            {!expanded && module.relatedModules.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ color: C.dim }}>
                +{module.relatedModules.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Expand hint */}
        <div className="flex items-center gap-1 text-xs" style={{ color: C.dim }}>
          {expanded
            ? <><ChevronUp className="w-3 h-3" />Свернуть</>
            : <><ChevronDown className="w-3 h-3" />Подробнее</>
          }
        </div>

        {/* Expanded details */}
        {expanded && (
          <div
            className="mt-4 pt-4 border-t space-y-4"
            style={{ borderColor: C.border }}
            onClick={e => e.stopPropagation()}
          >
            {module.details && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: C.dim }}>
                  Детали
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                  {module.details}
                </p>
              </div>
            )}

            {module.inputData && module.inputData.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#4ade80' }}>
                  Входные данные
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {module.inputData.map(d => (
                    <span
                      key={d}
                      className="text-xs px-2 py-0.5 rounded-md border"
                      style={{ background: 'rgba(22,163,74,0.08)', color: '#86efac', borderColor: 'rgba(22,163,74,0.25)' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {module.outputData && module.outputData.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#60a5fa' }}>
                  Выходные данные
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {module.outputData.map(d => (
                    <span
                      key={d}
                      className="text-xs px-2 py-0.5 rounded-md border"
                      style={{ background: 'rgba(37,99,235,0.08)', color: '#93c5fd', borderColor: 'rgba(37,99,235,0.25)' }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ModulesPage() {
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState<FilterTab>('all');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return modules.filter(m => {
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.russianName.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      return matchSearch && matchesFilter(m.status, filter);
    });
  }, [search, filter]);

  function toggleExpanded(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const isFiltering = search.trim() !== '' || filter !== 'all';
  const activeTab   = TABS.find(t => t.id === filter)!;

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.dim }}>
            Каталог
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3 max-w-2xl"
            style={{ color: C.text }}
          >
            Модули Rail Ecosystem
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: C.muted }}>
            {modules.length} модулей: операционные, ядерные и стратегические
          </p>
          <div className="flex flex-wrap gap-3">
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{ background: 'rgba(22,163,74,0.15)', color: '#86efac', borderColor: 'rgba(22,163,74,0.35)' }}
            >
              {mvpCount} в MVP
            </span>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{ background: 'rgba(124,58,237,0.12)', color: '#c4b5fd', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              {coreCount} ядерных
            </span>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{ background: 'rgba(37,99,235,0.12)', color: '#93c5fd', borderColor: 'rgba(37,99,235,0.3)' }}
            >
              {nextCount} следующих
            </span>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{ background: 'rgba(217,119,6,0.12)', color: '#fbbf24', borderColor: 'rgba(217,119,6,0.3)' }}
            >
              {futureCount} будущих
            </span>
          </div>
        </div>
      </section>

      {/* ── Control bar ───────────────────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-10 border-b"
        style={{
          background:     C.card,
          borderColor:    C.border,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">

            {/* Tab filter — horizontal scroll */}
            <div
              className="flex gap-1.5 overflow-x-auto flex-1"
              style={{ scrollbarWidth: 'none' }}
            >
              {TABS.map(tab => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150"
                    style={
                      isActive
                        ? { background: tab.activeBg, color: tab.color, border: `1px solid ${tab.activeBorder}` }
                        : { background: 'transparent', color: C.muted, border: `1px solid ${C.border}` }
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative shrink-0 w-36 sm:w-48">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: C.dim }}
              />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="w-full rounded-lg pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}
              />
            </div>

            {/* Clear */}
            {isFiltering && (
              <button
                onClick={() => { setSearch(''); setFilter('all'); }}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border transition-colors"
                style={{ color: C.muted, borderColor: C.border }}
              >
                <X className="w-3 h-3" />
                <span className="hidden sm:inline">Сбросить</span>
              </button>
            )}

            {/* Counter */}
            <span className="shrink-0 text-xs font-mono hidden sm:block" style={{ color: C.dim }}>
              {filtered.length}/{modules.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Module grid ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length > 0 ? (
          <>
            {/* Active filter label */}
            {filter !== 'all' && (
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                  style={{ background: activeTab.activeBg, color: activeTab.color, borderColor: activeTab.activeBorder }}
                >
                  {activeTab.label}
                </span>
                <span className="text-xs" style={{ color: C.dim }}>
                  {filtered.length} {filtered.length === 1 ? 'модуль' : filtered.length < 5 ? 'модуля' : 'модулей'}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(mod => (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  expanded={expanded.has(mod.id)}
                  onToggle={() => toggleExpanded(mod.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl border"
            style={{ borderColor: C.border }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: C.card }}
            >
              <Search className="w-6 h-6" style={{ color: C.muted }} />
            </div>
            <div className="text-base font-bold mb-1" style={{ color: C.text }}>
              Модули не найдены
            </div>
            <p className="text-sm mb-5 text-center max-w-xs" style={{ color: C.muted }}>
              Попробуйте изменить поиск или выбрать другой фильтр.
            </p>
            <button
              onClick={() => { setSearch(''); setFilter('all'); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-opacity hover:opacity-90"
              style={{ background: '#7c3aed', color: '#fff' }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
