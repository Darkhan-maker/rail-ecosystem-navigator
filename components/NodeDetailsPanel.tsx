'use client';

import Link from 'next/link';
import type { MapNodeData } from '@/types/railEcosystem';
import { modules } from '@/data/railEcosystemContent';

interface NodeDetailsPanelProps {
  node: { id: string; data: MapNodeData } | null;
  onClose: () => void;
}

export default function NodeDetailsPanel({ node, onClose }: NodeDetailsPanelProps) {
  if (!node) return null;

  const { data } = node;
  const relatedModuleObjects = (data.relatedModules ?? [])
    .map((id) => modules.find((m) => m.id === id))
    .filter(Boolean);

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-10 overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Детали узла</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-200 text-gray-500"
          aria-label="Закрыть"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        <div>
          <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-2 ${nodeTypeBadge(data.nodeType)}`}>
            {nodeTypeLabel(data.nodeType)}
          </div>
          <h3 className="text-base font-semibold text-gray-900">{data.label}</h3>
        </div>

        {data.description && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Назначение</div>
            <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
          </div>
        )}

        {data.details && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Что внутри</div>
            <p className="text-sm text-gray-600 leading-relaxed">{data.details}</p>
          </div>
        )}

        {data.inputData && data.inputData.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Входные данные</div>
            <ul className="space-y-1">
              {data.inputData.map((d) => (
                <li key={d} className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">{d}</li>
              ))}
            </ul>
          </div>
        )}

        {data.outputData && data.outputData.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Выходные данные</div>
            <ul className="space-y-1">
              {data.outputData.map((d) => (
                <li key={d} className="text-xs text-green-700 bg-green-50 rounded px-2 py-1">{d}</li>
              ))}
            </ul>
          </div>
        )}

        {data.effect && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Эффект для дистанции</div>
            <p className="text-sm text-gray-600 italic">{data.effect}</p>
          </div>
        )}

        {relatedModuleObjects.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Связанные модули</div>
            <div className="space-y-2">
              {relatedModuleObjects.map((m) => m && (
                <Link
                  key={m.id}
                  href={`/modules#${m.id}`}
                  className="block bg-gray-50 border border-gray-100 rounded p-2 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-xs font-semibold text-gray-800">{m.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{m.russianName}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function nodeTypeLabel(type: string): string {
  const map: Record<string, string> = {
    root: 'Корень',
    contour: 'Контур',
    org: 'Организация',
    module: 'Модуль',
    core: 'Ядро',
    submodule: 'Подмодуль',
    process: 'Процесс',
    problem: 'Проблема',
  };
  return map[type] ?? type;
}

function nodeTypeBadge(type: string): string {
  const map: Record<string, string> = {
    root: 'bg-blue-100 text-blue-700',
    contour: 'bg-indigo-100 text-indigo-700',
    org: 'bg-gray-100 text-gray-600',
    module: 'bg-green-100 text-green-700',
    core: 'bg-purple-100 text-purple-700',
    submodule: 'bg-yellow-100 text-yellow-700',
    process: 'bg-amber-100 text-amber-700',
    problem: 'bg-red-100 text-red-700',
  };
  return map[type] ?? 'bg-gray-100 text-gray-600';
}
