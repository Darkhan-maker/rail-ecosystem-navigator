import { roadmapStages, modules } from '@/data/railEcosystemContent';
import SectionTitle from '@/components/SectionTitle';

const statusConfig = {
  current: {
    label: 'Текущий этап',
    dot: 'bg-blue-600',
    ring: 'ring-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    line: 'bg-blue-300',
  },
  next: {
    label: 'Следующий',
    dot: 'bg-indigo-400',
    ring: 'ring-indigo-100',
    badge: 'bg-indigo-100 text-indigo-700',
    line: 'bg-indigo-200',
  },
  future: {
    label: 'Будущий',
    dot: 'bg-gray-300',
    ring: 'ring-gray-100',
    badge: 'bg-gray-100 text-gray-500',
    line: 'bg-gray-200',
  },
};

export default function RoadmapPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        title="Дорожная карта Rail Ecosystem"
        subtitle="Поэтапное развитие цифровой экосистемы — от MVP пилота до интеллектуальной платформы"
      />

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gray-200" aria-hidden="true" />

        <div className="space-y-0">
          {roadmapStages.map((stage) => {
            const st = statusConfig[stage.status];
            const stageModules = modules.filter((m) => stage.modules.includes(m.id));

            return (
              <div key={stage.number} className="relative flex gap-6 pb-10">
                {/* Timeline dot */}
                <div className={`relative z-10 w-9 h-9 rounded-full ${st.dot} ring-4 ${st.ring} text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5`}>
                  {stage.number}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">{stage.name}</h2>
                        <div className="text-sm text-gray-500 mt-0.5">{stage.subtitle}</div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${st.badge}`}>
                        {st.label}
                      </span>
                    </div>
                  </div>

                  <div className="px-5 py-4 space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{stage.description}</p>

                    {stage.result && (
                      <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Результат этапа</div>
                        <p className="text-sm text-gray-700 leading-relaxed">{stage.result}</p>
                      </div>
                    )}

                    {stageModules.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                          Модули этапа
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {stageModules.map((m) => (
                            <div key={m.id} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
                              <div className="text-xs font-semibold text-gray-800">{m.name}</div>
                              <div className="text-xs text-gray-400">{m.russianName}</div>
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
  );
}
