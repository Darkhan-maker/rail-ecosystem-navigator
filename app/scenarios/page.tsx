import { scenarios } from '@/data/railEcosystemContent';
import ScenarioTimeline from '@/components/ScenarioTimeline';
import PageHeader from '@/components/PageHeader';

export default function ScenariosPage() {
  return (
    <div>
      <PageHeader
        icon="🔄"
        title="Производственные сценарии"
        lead="Ключевые пользовательские сценарии Rail Ecosystem — от начала до результата"
        chips={[
          { label: `${scenarios.length} сценария`, color: '#2563eb' },
          { label: 'ШЧ + Бригады', color: '#16a34a' },
        ]}
      />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="space-y-8">
        {scenarios.map((scenario) => (
          <ScenarioTimeline key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </div>
    </div>
  );
}
