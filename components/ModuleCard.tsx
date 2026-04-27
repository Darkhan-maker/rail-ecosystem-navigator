import type { Module } from '@/types/railEcosystem';
import { modules } from '@/data/railEcosystemContent';
import Link from 'next/link';

const moduleNameMap = Object.fromEntries(modules.map(m => [m.id, m.name]));

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  'mvp-priority':   { label: 'MVP',           bg: '#dbeafe', text: '#1d4ed8' },
  'mvp-support':    { label: 'MVP',           bg: '#dbeafe', text: '#2563eb' },
  'core-stage':     { label: 'Ядро',          bg: '#d1fae5', text: '#065f46' },
  'next-stage':     { label: 'Следующий',     bg: '#e0e7ff', text: '#3730a3' },
  'future-stage':   { label: 'Будущий',       bg: '#f1f5f9', text: '#475569' },
  'parallel-stage': { label: 'Параллельный',  bg: '#ffedd5', text: '#c2410c' },
  'planned-stage':  { label: 'Запланирован',  bg: '#fef3c7', text: '#92400e' },
  'strategic-stage':{ label: 'Стратегический',bg: '#ede9fe', text: '#5b21b6' },
};

interface ModuleCardProps {
  module: Module;
  showDetails?: boolean;
}

export default function ModuleCard({ module, showDetails = false }: ModuleCardProps) {
  const status = statusConfig[module.status] ?? { label: module.status, bg: '#f1f5f9', text: '#475569' };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 hover:border-blue-200 hover:shadow-md transition-all duration-150 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900 leading-snug">{module.name}</div>
          <div className="text-xs text-slate-400 mt-0.5 truncate">{module.russianName}</div>
        </div>
        <span
          className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{ background: status.bg, color: status.text }}
        >
          {status.label}
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">{module.description}</p>

      {showDetails && module.details && (
        <p className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 leading-relaxed border border-slate-100">
          {module.details}
        </p>
      )}

      {showDetails && module.inputData && module.inputData.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Входные данные</div>
          <div className="flex flex-wrap gap-1">
            {module.inputData.map(d => (
              <span key={d} className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">{d}</span>
            ))}
          </div>
        </div>
      )}

      {showDetails && module.outputData && module.outputData.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Выходные данные</div>
          <div className="flex flex-wrap gap-1">
            {module.outputData.map(d => (
              <span key={d} className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">{d}</span>
            ))}
          </div>
        </div>
      )}

      {module.relatedModules.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Связанные модули</div>
          <div className="flex flex-wrap gap-1">
            {module.relatedModules.map(id => (
              <Link
                key={id}
                href={`/modules#${id}`}
                className="text-[10px] text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 hover:border-blue-200 px-2 py-0.5 rounded-full transition-colors"
              >
                {moduleNameMap[id] ?? id}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-1">
        <Link href={`/modules#${module.id}`} className="text-xs font-medium text-blue-600 hover:text-blue-700">
          Подробнее →
        </Link>
      </div>
    </div>
  );
}
