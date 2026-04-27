import { scenarios } from '@/data/railEcosystemContent';
import ScenarioTimeline from '@/components/ScenarioTimeline';
import PageHeader from '@/components/PageHeader';
import { Workflow, Route, Users } from 'lucide-react';

export default function ScenariosPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <PageHeader
        Icon={Workflow}
        title="Производственные сценарии"
        lead="Ключевые сквозные процессы Rail Ecosystem — от первого события до управленческого результата"
        chips={[
          { label: `${scenarios.length} сценария`, color: '#2563eb' },
          { label: 'ШЧ — маршрутный лист', color: '#2563eb' },
          { label: 'Цикл бригады', color: '#16a34a' },
        ]}
        accentColor="#2563eb"
      />

      {/* Scenario meta band */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-6">
            {[
              { Icon: Route,  title: 'Контур ШЧ',      desc: 'Служебные поездки работников дистанции', color: '#2563eb' },
              { Icon: Users,  title: 'Контур бригад',   desc: 'Рабочий цикл локомотивной бригады',     color: '#16a34a' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: item.color + '15', border: `1px solid ${item.color}25` }}
                >
                  <item.Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {scenarios.map((scenario) => (
          <ScenarioTimeline key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
}
