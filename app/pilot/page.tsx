import { pilotInfo } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';
import PilotFlowChain from '@/components/PilotFlowChain';

export default function PilotPage() {
  const pilot = pilotInfo;
  const pilotStations = pilot.stations.filter((s) => s.type === 'pilot');
  const baseStations = pilot.stations.filter((s) => s.type === 'base');

  return (
    <div>
      <PageHeader
        icon="🚀"
        badge="Текущий этап"
        title={pilot.title}
        lead={pilot.goal}
        chips={[
          { label: `${pilotStations.length} пилотных станции`, color: '#2563eb' },
          { label: '10 шагов маршрута', color: '#7c3aed' },
          { label: `${pilot.successCriteria.length} критериев успеха`, color: '#16a34a' },
        ]}
      />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Digital chain */}
      <div className="mb-10">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          Цифровая цепочка: служебная поездка ШЧ
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <PilotFlowChain />
        </div>
      </div>

      {/* Success criteria */}
      <div className="mb-10">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          Критерии успеха пилота
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {pilot.successCriteria.map((criterion, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{criterion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits by role */}
      <div className="mb-10">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          Что получает каждая роль
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {pilot.benefits.map((b) => (
            <div key={b.role} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-sm font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">{b.role}</div>
              <ul className="space-y-2">
                {b.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-500 shrink-0 mt-0.5 font-bold">→</span>
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
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Пилотные станции</h3>
          <div className="space-y-2">
            {pilotStations.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                <span className="text-sm text-slate-700">{s.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-400 mb-2 font-medium">Базовые станции</div>
            {baseStations.map((s) => (
              <div key={s.name} className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-slate-300 rounded-full shrink-0" />
                <span className="text-sm text-slate-500">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Роли участников</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {pilot.roles.map((role) => (
              <div key={role.name} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <div className="text-sm font-semibold text-slate-800 mb-1.5">{role.name}</div>
                <ul className="space-y-0.5">
                  {role.responsibilities.map((r) => (
                    <li key={r} className="text-xs text-slate-500 flex items-start gap-1.5">
                      <span className="text-slate-300 mt-0.5">—</span>
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
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shrink-0">✓</span>
            В MVP пилота
          </h3>
          <ul className="space-y-2">
            {pilot.mvpFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center text-white text-xs shrink-0">✕</span>
            Не входит в MVP
          </h3>
          <ul className="space-y-2">
            {pilot.outOfScope.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-500">
                <span className="text-slate-300 mt-0.5 shrink-0">✕</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
