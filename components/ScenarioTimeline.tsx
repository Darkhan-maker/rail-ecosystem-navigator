import type { Scenario } from '@/types/railEcosystem';
import { Route, Users, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ScenarioTimelineProps {
  scenario: Scenario;
}

const SCENARIO_META: Record<string, { color: string; Icon: LucideIcon; outcome: string }> = {
  'shch-trip': {
    color: '#2563eb',
    Icon: Route,
    outcome: 'Каждая поездка зафиксирована цифровым следом: QR-отметки, Excel-реестр для бухгалтерии, аналитика по дистанции.',
  },
  'crew-cycle': {
    color: '#d97706',
    Icon: Users,
    outcome: 'Полный рабочий цикл бригады оцифрован: от вызова до учёта времени, без бумажных журналов.',
  },
};

export default function ScenarioTimeline({ scenario }: ScenarioTimelineProps) {
  const meta = SCENARIO_META[scenario.id] ?? { color: '#2563eb', Icon: Route, outcome: '' };
  const { Icon } = meta;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
      style={{ borderTopColor: meta.color, borderTopWidth: 3 }}
    >
      {/* Header */}
      <div
        className="px-6 sm:px-8 py-6"
        style={{ background: `linear-gradient(135deg, ${meta.color}0a 0%, transparent 60%)` }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: meta.color + '15', border: `1px solid ${meta.color}25` }}
          >
            <Icon className="w-5 h-5" style={{ color: meta.color }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{scenario.title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{scenario.subtitle}</p>
          </div>
        </div>

        {/* Chain strip */}
        <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <div className="flex flex-nowrap gap-1 items-center min-w-max">
            {scenario.chain.map((step, i) => (
              <div key={i} className="flex items-center gap-1">
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap"
                  style={
                    i === 0
                      ? { background: meta.color, color: '#fff' }
                      : i === scenario.chain.length - 1
                      ? { background: meta.color + '1a', color: meta.color, border: `1px solid ${meta.color}30` }
                      : { background: '#fff', color: '#475569', border: '1px solid #e2e8f0' }
                  }
                >
                  {step}
                </span>
                {i < scenario.chain.length - 1 && (
                  <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="border-t border-slate-100">
        {scenario.steps.map((step, stepIdx) => (
          <div
            key={step.number}
            className="flex gap-5 px-6 sm:px-8 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors"
          >
            <div className="shrink-0 flex flex-col items-center pt-0.5">
              <div
                className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center text-white shrink-0"
                style={{ background: meta.color }}
              >
                {step.number}
              </div>
              {stepIdx < scenario.steps.length - 1 && (
                <div className="w-px flex-1 mt-1 min-h-[20px]" style={{ background: meta.color + '25' }} />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="text-sm font-semibold text-slate-900">{step.name}</div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.description}</p>
              {step.dataPoints.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {step.dataPoints.map((dp) => (
                    <span
                      key={dp}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                      style={{
                        background: meta.color + '08',
                        color: meta.color === '#2563eb' ? '#1d4ed8' : '#92400e',
                        borderColor: meta.color + '25',
                      }}
                    >
                      {dp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Outcome */}
      {meta.outcome && (
        <div
          className="px-6 sm:px-8 py-4 border-t flex items-start gap-3"
          style={{ background: meta.color + '07', borderColor: meta.color + '20' }}
        >
          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: meta.color }} />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: meta.color }}>
              Результат сценария
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{meta.outcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}
