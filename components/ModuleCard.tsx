import type { Module } from '@/types/railEcosystem';
import { modules } from '@/data/railEcosystemContent';
import Link from 'next/link';

const moduleNameMap = Object.fromEntries(modules.map((m) => [m.id, m.name]));

const statusConfig: Record<string, { label: string; className: string }> = {
  'mvp-priority':   { label: 'MVP',           className: 'bg-blue-100 text-blue-700' },
  'mvp-support':    { label: 'MVP',           className: 'bg-blue-100 text-blue-600' },
  'core-stage':     { label: 'Ядро',          className: 'bg-green-100 text-green-700' },
  'next-stage':     { label: 'Следующий',     className: 'bg-indigo-100 text-indigo-700' },
  'future-stage':   { label: 'Будущий',       className: 'bg-gray-100 text-gray-600' },
  'parallel-stage': { label: 'Параллельный',  className: 'bg-orange-100 text-orange-700' },
  'planned-stage':  { label: 'Запланирован',  className: 'bg-yellow-100 text-yellow-700' },
  'strategic-stage':{ label: 'Стратегический',className: 'bg-purple-100 text-purple-700' },
};

interface ModuleCardProps {
  module: Module;
  showDetails?: boolean;
}

export default function ModuleCard({ module, showDetails = false }: ModuleCardProps) {
  const status = statusConfig[module.status] ?? { label: module.status, className: 'bg-gray-100 text-gray-600' };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-base font-semibold text-gray-900">{module.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{module.russianName}</div>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded ${status.className}`}>
          {status.label}
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>

      {showDetails && module.details && (
        <p className="text-xs text-gray-500 bg-gray-50 rounded p-3 leading-relaxed">{module.details}</p>
      )}

      {showDetails && module.inputData && module.inputData.length > 0 && (
        <div>
          <div className="text-xs font-medium text-gray-500 mb-1">Входные данные</div>
          <div className="flex flex-wrap gap-1">
            {module.inputData.map((d) => (
              <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{d}</span>
            ))}
          </div>
        </div>
      )}

      {showDetails && module.outputData && module.outputData.length > 0 && (
        <div>
          <div className="text-xs font-medium text-gray-500 mb-1">Выходные данные</div>
          <div className="flex flex-wrap gap-1">
            {module.outputData.map((d) => (
              <span key={d} className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">{d}</span>
            ))}
          </div>
        </div>
      )}

      {module.relatedModules.length > 0 && (
        <div>
          <div className="text-xs font-medium text-gray-400 mb-1">Связанные модули</div>
          <div className="flex flex-wrap gap-1">
            {module.relatedModules.map((id) => (
              <Link
                key={id}
                href={`/modules#${id}`}
                className="text-xs text-gray-500 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-2 py-0.5 rounded transition-colors"
              >
                {moduleNameMap[id] ?? id}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-1">
        <Link
          href={`/modules#${module.id}`}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Подробнее →
        </Link>
      </div>
    </div>
  );
}
