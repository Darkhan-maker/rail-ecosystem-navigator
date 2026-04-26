'use client';

import dynamic from 'next/dynamic';

const EcosystemMap = dynamic(() => import('@/components/EcosystemMap'), { ssr: false });

const legend = [
  { type: 'root',     color: 'bg-blue-600',    label: 'Корень',       desc: 'Rail Ecosystem' },
  { type: 'contour',  color: 'bg-indigo-500',  label: 'Контур',       desc: 'Магистраль, Грузовые, Ядро' },
  { type: 'org',      color: 'bg-gray-400',    label: 'Организация',  desc: 'КТЖ, дирекции, дистанции' },
  { type: 'module',   color: 'bg-green-500',   label: 'Модуль',       desc: 'Цифровые модули системы' },
  { type: 'core',     color: 'bg-purple-500',  label: 'Ядро',         desc: 'Цифровое ядро платформы' },
  { type: 'process',  color: 'bg-amber-500',   label: 'Процесс',      desc: 'Производственные операции' },
  { type: 'problem',  color: 'bg-red-500',     label: 'Проблема',     desc: 'Решаемые системой проблемы' },
];

export default function MapPage() {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-base font-semibold text-gray-900">Карта Rail Ecosystem</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Кликните на узел — увидите детали. Прокрутите — масштаб. Переключайте режимы кнопками на карте.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {legend.map((item) => (
              <div key={item.type} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.color}`} />
                <span className="text-xs text-gray-600">{item.label}</span>
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
