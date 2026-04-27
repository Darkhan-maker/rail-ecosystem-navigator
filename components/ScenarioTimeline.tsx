import type { Scenario } from '@/types/railEcosystem';

interface ScenarioTimelineProps {
  scenario: Scenario;
}

export default function ScenarioTimeline({ scenario }: ScenarioTimelineProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
        <p className="text-sm text-slate-500 mt-1">{scenario.subtitle}</p>
        {/* Chain strip */}
        <div className="mt-4 flex flex-wrap gap-1.5 items-center">
          {scenario.chain.map((step, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs font-medium bg-white border border-slate-200 rounded-md px-2 py-0.5 text-slate-700">
                {step}
              </span>
              {i < scenario.chain.length - 1 && (
                <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="divide-y divide-slate-50">
        {scenario.steps.map((step) => (
          <div key={step.number} className="px-6 py-4 flex gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                {step.number}
              </div>
              {step.number < scenario.steps.length && (
                <div className="w-px flex-1 bg-blue-100 mt-1 min-h-4" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="font-semibold text-slate-900 text-sm">{step.name}</div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.description}</p>
              {step.dataPoints.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {step.dataPoints.map((dp) => (
                    <span key={dp} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                      {dp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
