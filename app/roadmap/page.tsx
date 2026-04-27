import { roadmapStages, modules } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';
import { Milestone } from 'lucide-react';

const statusConfig = {
  current: {
    label: 'Активный этап',
    dotBg: 'bg-blue-600',
    dotText: 'text-white',
    badge: 'bg-green-100 text-green-700',
    cardBorder: '#2563eb',
    headerBg: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
  },
  next: {
    label: 'Следующий',
    dotBg: 'bg-slate-300',
    dotText: 'text-slate-600',
    badge: 'bg-blue-100 text-blue-600',
    cardBorder: '#6366f1',
    headerBg: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
  },
  future: {
    label: 'Будущий',
    dotBg: 'bg-slate-200',
    dotText: 'text-slate-400',
    badge: 'bg-slate-100 text-slate-500',
    cardBorder: '#94a3b8',
    headerBg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
};

export default function RoadmapPage() {
  const currentCount = roadmapStages.filter(s => s.status === 'current').length;

  return (
    <div className="min-h-screen bg-slate-100">
      <PageHeader
        Icon={Milestone}
        title="Дорожная карта Rail Ecosystem"
        lead="Поэтапное развитие цифровой платформы — от MVP пилота до интеллектуальной экосистемы управления"
        chips={[
          { label: `${roadmapStages.length} этапов`, color: '#2563eb' },
          { label: `${currentCount} активный`, color: '#16a34a' },
          { label: `${roadmapStages.length - currentCount} планируемых` },
        ]}
        accentColor="#6366f1"
      />

      {/* Stage summary strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {roadmapStages.map((stage, i) => {
              const st = statusConfig[stage.status];
              return (
                <div key={stage.number} className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${st.dotBg} ${st.dotText} shrink-0`}
                    >
                      {stage.number}
                    </div>
                    <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{stage.name}</span>
                  </div>
                  {i < roadmapStages.length - 1 && (
                    <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-slate-200" aria-hidden="true" />

          <div className="space-y-6">
            {roadmapStages.map((stage) => {
              const st = statusConfig[stage.status];
              const stageModules = modules.filter((m) => stage.modules.includes(m.id));
              const isCurrent = stage.status === 'current';

              return (
                <div key={stage.number} className="relative flex gap-5 sm:gap-6">

                  {/* Timeline dot with optional pulse */}
                  <div className="relative z-10 shrink-0 mt-0.5">
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30" />
                    )}
                    <div
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${st.dotBg} ${st.dotText} ${isCurrent ? 'ring-2 ring-blue-300 ring-offset-2' : ''}`}
                    >
                      {stage.number}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-w-0"
                    style={{ borderLeftColor: st.cardBorder, borderLeftWidth: isCurrent ? 4 : 2 }}
                  >
                    {/* Card header */}
                    <div className="px-5 py-4 border-b border-slate-100" style={{ background: st.headerBg }}>
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h2 className="text-base font-bold text-slate-900">{stage.name}</h2>
                          <div className="text-sm text-slate-500 mt-0.5">{stage.subtitle}</div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.badge}`}>
                          {st.label}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-5 py-4 space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed">{stage.description}</p>

                      {stage.result && (
                        <div className="bg-slate-50 rounded-lg px-4 py-3 border-l-2 border-blue-400 mt-3">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1.5">
                            Ожидаемый результат
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{stage.result}</p>
                        </div>
                      )}

                      {stageModules.length > 0 && (
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                            Модули этапа
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {stageModules.map((m) => (
                              <a
                                key={m.id}
                                href={`/modules#${m.id}`}
                                className="group flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 hover:border-blue-200 hover:bg-blue-50 transition-all duration-150 cursor-pointer"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-blue-500 shrink-0 transition-colors" />
                                <div>
                                  <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">{m.name}</div>
                                  <div className="text-[10px] text-slate-400 leading-tight">{m.russianName}</div>
                                </div>
                              </a>
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
