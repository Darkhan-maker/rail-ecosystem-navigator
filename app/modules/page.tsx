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
          className="flex-1 min-w-56 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as MaturityStatus | 'all')}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">Все статусы</option>
          {statusOrder.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>
        {isFiltering && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('all'); }}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Сбросить
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-400 mb-8">
        {isFiltering
          ? `Найдено: ${filtered.length} из ${modules.length} модулей`
          : `${modules.length} модулей · сгруппированы по этапам зрелости`}
      </div>

      {grouped.length > 0 ? (
        <div className="space-y-10">
          {grouped.map(({ status, label, items }) => (
            <div key={status}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 border-b border-gray-100 pb-2">
                {label}
              </h2>
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
        <div className="text-center py-16 text-gray-400 text-sm">
          Модули не найдены по запросу «{search}»
        </div>
      )}
    </div>
  );
}
