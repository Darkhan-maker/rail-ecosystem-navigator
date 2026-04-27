'use client';

import { useState, useMemo } from 'react';
import { modules } from '@/data/railEcosystemContent';
import ModuleCard from '@/components/ModuleCard';
import SectionTitle from '@/components/SectionTitle';
import type { MaturityStatus } from '@/types/railEcosystem';

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

const statusAccent: Record<MaturityStatus, string> = {
  'mvp-priority':   'text-blue-600 border-blue-200',
  'mvp-support':    'text-blue-500 border-blue-100',
  'core-stage':     'text-emerald-600 border-emerald-200',
  'next-stage':     'text-indigo-600 border-indigo-200',
  'future-stage':   'text-slate-500 border-slate-200',
  'parallel-stage': 'text-orange-600 border-orange-200',
  'planned-stage':  'text-amber-600 border-amber-200',
  'strategic-stage':'text-violet-600 border-violet-200',
};

export default function ModulesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MaturityStatus | 'all'>('all');

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
      accent: statusAccent[status],
      items: filtered.filter((m) => m.status === status),
    }))
    .filter((g) => g.items.length > 0);

  const isFiltering = search.trim() !== '' || statusFilter !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        title="Модули Rail Ecosystem"
        subtitle={`${modules.length} цифровых модулей, покрывающих все процессы железнодорожной эксплуатации`}
      />

      {/* Search & filter */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию или описанию..."
          className="flex-1 min-w-56 border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as MaturityStatus | 'all')}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        >
          <option value="all">Все статусы</option>
          {statusOrder.map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
        {isFiltering && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('all'); }}
            className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white shadow-sm"
          >
            Сбросить
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="text-xs text-slate-400 mb-8">
        {isFiltering
          ? `Найдено: ${filtered.length} из ${modules.length} модулей`
          : `${modules.length} модулей · сгруппированы по этапам зрелости`}
      </div>

      {grouped.length > 0 ? (
        <div className="space-y-10">
          {grouped.map(({ status, label, accent, items }) => (
            <div key={status}>
              <div className={`flex items-center gap-3 mb-4 pb-2 border-b ${accent.split(' ')[1]}`}>
                <h2 className={`text-xs font-bold uppercase tracking-widest ${accent.split(' ')[0]}`}>
                  {label}
                </h2>
                <span className="text-xs text-slate-400">{items.length} модулей</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((mod) => (
                  <div key={mod.id} id={mod.id}>
                    <ModuleCard module={mod} showDetails />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-sm bg-white rounded-xl border border-slate-200 shadow-sm">
          Модули не найдены по запросу «{search}»
        </div>
      )}
    </div>
  );
}
