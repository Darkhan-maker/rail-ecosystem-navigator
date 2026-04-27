'use client';

import dynamic from 'next/dynamic';

const EcosystemMap = dynamic(() => import('@/components/EcosystemMap'), { ssr: false });

const legend = [
  { color: '#1d4ed8', label: 'Rail Ecosystem',  dot: true },
  { color: '#6366f1', label: 'Контур',           dot: true },
  { color: '#7c3aed', label: 'Цифровое ядро',    dot: true },
  { color: '#64748b', label: 'Организация',       dot: true },
  { color: '#3b82f6', label: 'Модуль',            dot: true },
  { color: '#d97706', label: 'Процесс',           dot: true },
  { color: '#ef4444', label: 'Проблема',          dot: true },
];

export default function MapPage() {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* Page header */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <h1 className="text-sm font-bold text-slate-900">Карта Rail Ecosystem</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Кликните на узел — детали справа. Колёсико — масштаб. Переключайте режимы.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {legend.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-xs text-slate-600 whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <EcosystemMap />
      </div>
    </div>
  );
}
