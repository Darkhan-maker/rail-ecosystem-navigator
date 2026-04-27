'use client';

import { useState, useMemo } from 'react';
import { modules } from '@/data/railEcosystemContent';
import ModuleCard from '@/components/ModuleCard';
import {
  STATUS_STYLE,
  Boxes,
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
import { Search, X, AlignJustify, LayoutGrid } from 'lucide-react';
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

// ── Grid class helper ─────────────────────────────────────────────────────────

function gridClass(count: number): string {
  if (count <= 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
}

// ── Page ──────────────────────────────────────────────────────────────────────

type ViewMode = 'compact' | 'detailed';

export default function ModulesPage() {
  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState<MaturityStatus | 'all'>('all');
  const [viewMode, setViewMode]       = useState<ViewMode>('compact');

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
            backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)',
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
              <Boxes className="w-7 h-7" style={{ color: '#a78bfa' }} />
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { value: modules.length, label: 'Всего модулей',  color: '#94a3b8' },
              { value: mvpCount,       label: 'В MVP',           color: '#60a5fa' },
              { value: coreCount,      label: 'Ядро платформы', color: '#a78bfa' },
              { value: strategicCount, label: 'Стратегических', color: '#6ee7b7' },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-1" style={{ color: m.color }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>{m.label}</div>
              </div>
            ))}
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
                className="w-full rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-500"
                style={{ background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9' }}
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as MaturityStatus | 'all')}
              className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{ background: '#0f172a', border: '1px solid #334155', color: '#cbd5e1' }}
            >
              <option value="all">Все этапы</option>
              {statusOrder.map((s) => (
                <option key={s} value={s}>{statusLabels[s]}</option>
              ))}
            </select>

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
            <div
              className="flex rounded-lg overflow-hidden shrink-0 ml-auto"
              style={{ border: '1px solid #334155' }}
            >
              <button
                onClick={() => setViewMode('compact')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors"
                style={
                  viewMode === 'compact'
                    ? { background: '#7c3aed', color: '#fff' }
                    : { background: 'transparent', color: '#94a3b8' }
                }
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Кратко
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors"
                style={
                  viewMode === 'detailed'
                    ? { background: '#7c3aed', color: '#fff' }
                    : { background: 'transparent', color: '#94a3b8' }
                }
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
                          <h2 className="text-sm font-bold" style={{ color: style.text }}>{label}</h2>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0"
                            style={{ background: style.bg, color: style.text, borderColor: style.border }}
                          >
                            {items.length}
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
