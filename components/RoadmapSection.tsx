import { roadmapStages, modules } from '@/data/railEcosystemContent';

const statusConfig = {
  current: { label: 'Текущий этап', dot: 'bg-blue-600 text-white', badge: 'bg-blue-100 text-blue-700' },
  next:    { label: 'Следующий',    dot: 'bg-indigo-400 text-white', badge: 'bg-indigo-50 text-indigo-700' },
  future:  { label: 'Будущий',      dot: 'bg-slate-300 text-slate-600', badge: 'bg-slate-100 text-slate-500' },
};

const moduleNameMap = Object.fromEntries(modules.map((m) => [m.id, m.name]));

export default function RoadmapSection() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Дорожная карта</h2>
          <p className="mt-2 text-slate-500">Поэтапное развитие Rail Ecosystem</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute h-px bg-slate-200" style={{ top: '1.75rem', left: 0, right: 0 }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {roadmapStages.map((stage) => {
              const st = statusConfig[stage.status];
              return (
                <div key={stage.number} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 shadow-sm ${st.dot}`}>
                      {stage.number}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full hidden lg:inline ${st.badge}`}>
                      {st.label}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{stage.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stage.subtitle}</div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{stage.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {stage.modules.map((m) => (
                        <span key={m} className="text-xs bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md">
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
