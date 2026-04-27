import { roadmapStages, modules } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';

const statusConfig = {
  current: {
    label: 'Текущий этап',
    dot:   'bg-blue-600 text-white ring-4 ring-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    result:'bg-blue-50 border-blue-100',
    resultText: 'text-blue-400',
  },
  next: {
    label: 'Следующий',
    dot:   'bg-indigo-400 text-white ring-4 ring-indigo-100',
    badge: 'bg-indigo-50 text-indigo-700',
    result:'bg-indigo-50 border-indigo-100',
    resultText: 'text-indigo-400',
  },
  future: {
    label: 'Будущий',
    dot:   'bg-slate-300 text-slate-600 ring-4 ring-slate-100',
    badge: 'bg-slate-100 text-slate-500',
    result:'bg-slate-50 border-slate-100',
    resultText: 'text-slate-400',
  },
};

export default function RoadmapPage() {
  const currentCount = roadmapStages.filter(s => s.status === 'current').length;
  return (
    <div>
      <PageHeader
        icon="🗺"
        title="Дорожная карта Rail Ecosystem"
        lead="Поэтапное развитие цифровой экосистемы — от MVP пилота до интеллектуальной платформы"
        chips={[
          { label: `${roadmapStages.length} этапов`, color: '#2563eb' },
          { label: `${currentCount} активный`, color: '#16a34a' },
          { label: `${roadmapStages.length - currentCount} планируемых` },
        ]}
      />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-slate-200" aria-hidden="true" />

        <div className="space-y-0">
          {roadmapStages.map((stage) => {
            const st = statusConfig[stage.status];
            const stageModules = modules.filter((m) => stage.modules.includes(m.id));

            return (
              <div key={stage.number} className="relative flex gap-6 pb-10">
                {/* Timeline dot */}
                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 shadow-sm ${st.dot}`}>
                  {stage.number}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h2 className="text-base font-bold text-slate-900">{stage.name}</h2>
                        <div className="text-sm text-slate-500 mt-0.5">{stage.subtitle}</div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${st.badge}`}>
                        {st.label}
                      </span>
                    </div>
                  </div>

                  <div className="px-5 py-4 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">{stage.description}</p>

                    {stage.result && (
                      <div className={`border rounded-xl px-4 py-3 ${st.result}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${st.resultText}`}>
                          Результат этапа
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{stage.result}</p>
                      </div>
                    )}

                    {stageModules.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Модули этапа
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {stageModules.map((m) => (
                            <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 hover:border-blue-200 transition-colors">
                              <div className="text-xs font-semibold text-slate-800">{m.name}</div>
                              <div className="text-xs text-slate-400">{m.russianName}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
