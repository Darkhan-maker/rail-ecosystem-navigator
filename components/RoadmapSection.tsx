import { roadmapStages, modules } from '@/data/railEcosystemContent';

const statusConfig = {
  current: { label: 'Текущий этап', className: 'bg-blue-600 text-white' },
  next: { label: 'Следующий', className: 'bg-indigo-100 text-indigo-700' },
  future: { label: 'Будущий', className: 'bg-gray-100 text-gray-500' },
};

const moduleNameMap = Object.fromEntries(modules.map((m) => [m.id, m.name]));

export default function RoadmapSection() {
  return (
    <section className="py-14 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Дорожная карта</h2>
          <p className="mt-2 text-gray-500">Поэтапное развитие Rail Ecosystem</p>
        </div>
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-gray-200" style={{ top: '1.75rem' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {roadmapStages.map((stage) => {
              const st = statusConfig[stage.status];
              return (
                <div key={stage.number} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 ${st.className}`}>
                      {stage.number}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded hidden lg:inline ${st.className}`}>
                      {st.label}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{stage.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stage.subtitle}</div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{stage.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {stage.modules.map((m) => (
                        <span key={m} className="text-xs bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                          {moduleNameMap[m] ?? m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
