import { scenarios } from '@/data/railEcosystemContent';
import ScenarioTimeline from '@/components/ScenarioTimeline';
import SectionTitle from '@/components/SectionTitle';

export default function ScenariosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        title="Производственные сценарии"
        subtitle="Ключевые пользовательские сценарии Rail Ecosystem — от начала до результата"
      />

      <div className="space-y-10">
        {scenarios.map((scenario) => (
          <ScenarioTimeline key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
}
