'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { modules } from '@/data/railEcosystemContent';
import ModuleCard from '@/components/ModuleCard';
import {
  STATUS_STYLE,
  Rocket,
  Layers,
  Cpu,
  Workflow,
  Milestone,
  GitBranch,
  Route,
  BrainCircuit,
  type LucideIcon,
} from '@/components/icons';
import { Search, X, AlignJustify, LayoutGrid, ChevronDown } from 'lucide-react';
import type { MaturityStatus } from '@/types/railEcosystem';

// ── Status ordering & labels ──────────────────────────────────────────────────

const statusOrder: MaturityStatus[] = [
  'mvp-priority',
  'mvp-support',
  'core-stage',
  'next-stage',
  'future-stage',
  'parallel-stage',
  'planned-stage',
  'strategic-stage',
];

const statusLabels: Record<MaturityStatus, string> = {
  'mvp-priority':   'MVP — Первый этап',
  'mvp-support':    'MVP — Поддержка',
  'core-stage':     'Core — Ядро платформы',
  'next-stage':     'Next — Следующий этап',
  'future-stage':   'Future — Будущий этап',
  'parallel-stage': 'Parallel — Параллельный',
  'planned-stage':  'Planned — Запланировано',
  'strategic-stage':'Strategic — Стратегический',
};

const STATUS_META: Record<MaturityStatus, { Icon: LucideIcon; description: string }> = {
  'mvp-priority':   { Icon: Rocket,       description: 'Разрабатывается в первую очередь — текущий пилот RailRoutes' },
  'mvp-support':    { Icon: Layers,       description: 'Поддерживающие MVP-модули, запускаемые параллельно с пилотом' },
  'core-stage':     { Icon: Cpu,          description: 'Фундаментальные модули — горизонтальное цифровое ядро платформы' },
  'next-stage':     { Icon: Workflow,     description: 'Следующий приоритет после успешного завершения первого пилота' },
  'future-stage':   { Icon: Milestone,    description: 'Дальнейшее развитие платформы после утверждения следующего этапа' },
  'parallel-stage': { Icon: GitBranch,    description: 'Разрабатывается параллельно основным этапам дорожной карты' },
  'planned-stage':  { Icon: Route,        description: 'Включено в дорожную карту без жёстких сроков запуска' },
  'strategic-stage':{ Icon: BrainCircuit, description: 'Долгосрочное стратегическое направление — ИИ и предиктивная аналитика' },
};

// ── Hero metrics ──────────────────────────────────────────────────────────────

const mvpCount       = modules.filter(m => m.status === 'mvp-priority' || m.status === 'mvp-support').length;
const coreCount      = modules.filter(m => m.status === 'core-stage').length;
const strategicCount = modules.filter(m => m.status === 'strategic-stage').length;

// ── Group header border colors (per status) ───────────────────────────────────

const GROUP_BORDER_COLOR: Partial<Record<MaturityStatus, string>> = {
  'mvp-priority':   '#3b82f6',
  'mvp-support':    '#3b82f6',
  'core-stage':     '#f59e0b',
  'next-stage':     '#8b5cf6',
  'future-stage':   '#94a3b8',
  'parallel-stage': '#94a3b8',
  'planned-stage':  '#cbd5e1',
  'strategic-stage':'#f87171',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function gridClass(count: number): string {
  if (count <= 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
}

function pluralModules(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${n} модулей`;
  if (mod10 === 1) return `${n} модуль`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} модуля`;
  return `${n} модулей`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

type ViewMode = 'compact' | 'detailed';

export default function ModulesPage() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState<MaturityStatus | 'all'>('all');
  const [viewMode, setViewMode]         = useState<ViewMode>('compact');
  const [statusOpen, setStatusOpen]     = useState(false);
  const dropdownRef                     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statusOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [statusOpen]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return modules.filter((m) => {
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.russianName.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const grouped = statusOrder
    .map((status) => ({
      status,
      label: statusLabels[status],
      style: STATUS_STYLE[status],
      meta:  STATUS_META[status],
      items: filtered.filter((m) => m.status === status),
    }))
    .filter((g) => g.items.length > 0);

  const isFiltering = search.trim() !== '' || statusFilter !== 'all';
  const isDetailed  = viewMode === 'detailed';

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-b border-slate-800"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(71,85,105,0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-72 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.25) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-start gap-5 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xl"
              style={{ background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.38)' }}
            >
              {/* Railroad track icon */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="2" x2="6" y2="22" />
                <line x1="18" y1="2" x2="18" y2="22" />
                <line x1="6" y1="5"  x2="18" y2="5" />
                <line x1="6" y1="10" x2="18" y2="10" />
                <line x1="6" y1="15" x2="18" y2="15" />
                <line x1="6" y1="20" x2="18" y2="20" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa' }} />
                Каталог цифровой платформы
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                Каталог модулей Rail Ecosystem
              </h1>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#94a3b8' }}>
                {modules.length} цифровых модулей, покрывающих все производственные процессы КТЖ —
                от маршрутных листов до ИИ-аналитики.
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <span className="rounded-full px-3 py-1 text-sm font-medium" style={{ background: 'rgba(71,85,105,0.5)', color: '#cbd5e1' }}>
              {modules.length} модулей
            </span>
            <span className="rounded-full px-3 py-1 text-sm font-medium border" style={{ background: 'rgba(37,99,235,0.2)', color: '#60a5fa', borderColor: 'rgba(37,99,235,0.3)' }}>
              {mvpCount} в MVP
            </span>
            <span className="rounded-full px-3 py-1 text-sm font-medium border" style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.3)' }}>
              {coreCount} ядра платформы
            </span>
            <span className="rounded-full px-3 py-1 text-sm font-medium border" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}>
              {strategicCount} стратегических
            </span>
          </div>
        </div>
      </div>

      {/* ── Control panel ───────────────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-10 border-b shadow-lg"
        style={{ background: '#1e293b', borderColor: '#334155' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2.5 items-center">

            {/* Search */}
            <div className="relative flex-1 min-w-44">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: '#64748b' }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию..."
                className="w-full rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-400"
                style={{ background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9' }}
              />
            </div>

            {/* Status filter — custom dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setStatusOpen(v => !v)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors hover:bg-slate-700/40"
                style={{ background: '#0f172a', border: '1px solid #334155', color: '#cbd5e1' }}
              >
                <span className="truncate max-w-[160px]">
                  {statusFilter === 'all' ? 'Все этапы' : statusLabels[statusFilter]}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${statusOpen ? 'rotate-180' : ''}`}
                  style={{ color: '#64748b' }}
                />
              </button>
              {statusOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-60 rounded-xl overflow-hidden shadow-2xl z-20"
                  style={{ background: '#1e293b', border: '1px solid #334155' }}
                >
                  <button
                    onClick={() => { setStatusFilter('all'); setStatusOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 text-sm transition-colors hover:bg-slate-700/60"
                    style={{ color: statusFilter === 'all' ? '#a78bfa' : '#cbd5e1' }}
                  >
                    Все этапы
                  </button>
                  {statusOrder.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setStatusOpen(false); }}
                      className="w-full text-left px-3.5 py-2.5 text-sm transition-colors hover:bg-slate-700/60 border-t"
                      style={{
                        color: statusFilter === s ? '#a78bfa' : '#cbd5e1',
                        borderColor: '#334155',
                      }}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear filter */}
            {isFiltering && (
              <button
                onClick={() => { setSearch(''); setStatusFilter('all'); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors hover:bg-slate-700"
                style={{ color: '#94a3b8', border: '1px solid #334155' }}
              >
                <X className="w-3.5 h-3.5" />
                Сбросить
              </button>
            )}

            {/* View toggle */}
            <div className="flex bg-slate-100 rounded-lg p-1 gap-1 shrink-0 ml-auto">
              <button
                onClick={() => setViewMode('compact')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                  viewMode === 'compact'
                    ? 'bg-white shadow-sm text-slate-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Кратко
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                  viewMode === 'detailed'
                    ? 'bg-white shadow-sm text-slate-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
                Подробно
              </button>
            </div>

            {/* Counter */}
            <span className="text-xs shrink-0 font-mono" style={{ color: '#64748b' }}>
              {isFiltering
                ? `${filtered.length} / ${modules.length}`
                : `${modules.length} модулей`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Module groups ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {grouped.length > 0 ? (
          <div className="space-y-6">
            {grouped.map(({ status, label, style, meta, items }) => {
              const GroupIcon = meta.Icon;
              const isSingle = items.length === 1;

              return (
                <div
                  key={status}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                  style={{ borderTopColor: style.dot, borderTopWidth: 3 }}
                >
                  {/* Group header */}
                  <div
                    className="px-6 py-4 border-b border-slate-100"
                    style={{ background: style.bg }}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: style.bg, border: `1px solid ${style.border}` }}
                      >
                        <GroupIcon className="w-4 h-4" style={{ color: style.dot }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h2
                            className="text-sm font-bold pl-3 border-l-4"
                            style={{ color: style.text, borderColor: GROUP_BORDER_COLOR[status] ?? style.dot }}
                          >
                            {label}
                          </h2>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0"
                            style={{ background: style.bg, color: style.text, borderColor: style.border }}
                          >
                            {pluralModules(items.length)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{meta.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cards: featured (1 item) or grid (2+) */}
                  {isSingle ? (
                    <div className="p-5">
                      <ModuleCard
                        module={items[0]}
                        detailed={isDetailed}
                        featured
                      />
                    </div>
                  ) : (
                    <div className={`p-5 ${gridClass(items.length)}`}>
                      {items.map((mod) => (
                        <div key={mod.id} id={mod.id}>
                          <ModuleCard module={mod} detailed={isDetailed} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-slate-400" />
            </div>
            <div className="text-slate-800 font-bold text-base mb-1">Модули не найдены</div>
            <p className="text-sm text-slate-500 mb-5 text-center max-w-xs">
              По запросу «{search}» ничего не найдено.
            </p>
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors hover:opacity-90"
              style={{ background: '#7c3aed' }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
