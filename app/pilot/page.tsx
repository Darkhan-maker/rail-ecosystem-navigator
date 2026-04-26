import { pilotInfo } from '@/data/railEcosystemContent';
import SectionTitle from '@/components/SectionTitle';
import PilotFlowChain from '@/components/PilotFlowChain';

export default function PilotPage() {
  const pilot = pilotInfo;
  const pilotStations = pilot.stations.filter((s) => s.type === 'pilot');
  const baseStations = pilot.stations.filter((s) => s.type === 'base');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-2">
        <span className="inline-block text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded mb-3">
          Текущий этап — RailRoutes MVP
        </span>
      </div>
      <SectionTitle title={pilot.title} subtitle={pilot.goal} />

      {/* Digital chain */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
          Цифровая цепочка: служебная поездка ШЧ
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
          <PilotFlowChain />
        </div>
      </div>

      {/* Success criteria */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Критерии успеха пилота
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {pilot.successCriteria.map((criterion, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{criterion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits by role */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Что получает каждая роль
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {pilot.benefits.map((b) => (
            <div key={b.role} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-sm font-bold text-gray-900 mb-3">{b.role}</div>
              <ul className="space-y-2">
                {b.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-500 shrink-0 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stations + roles */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Пилотные станции</h3>
          <div className="space-y-2">
            {pilotStations.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                <span className="text-sm text-gray-700">{s.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-400 mb-2">Базовые станции</div>
            {baseStations.map((s) => (
              <div key={s.name} className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-gray-300 rounded-full shrink-0" />
                <span className="text-sm text-gray-500">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Роли участников</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {pilot.roles.map((role) => (
              <div key={role.name} className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm font-semibold text-gray-800 mb-1.5">{role.name}</div>
                <ul className="space-y-0.5">
                  {role.responsibilities.map((r) => (
                    <li key={r} className="text-xs text-gray-500 flex items-start gap-1.5">
                      <span className="text-gray-300 mt-0.5">—</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MVP Features & Out of Scope */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
            В MVP пилота
          </h3>
          <ul className="space-y-2">
            {pilot.mvpFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">✕</span>
            Не входит в MVP
          </h3>
          <ul className="space-y-2">
            {pilot.outOfScope.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="text-gray-300 mt-0.5 shrink-0">✕</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
