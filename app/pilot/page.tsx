import { pilotInfo } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';
import PilotFlowChain from '@/components/PilotFlowChain';
import { Rocket, CheckCircle, MapPin, Users, ArrowRight } from 'lucide-react';

export default function PilotPage() {
  const pilot = pilotInfo;
  const pilotStations = pilot.stations.filter((s) => s.type === 'pilot');
  const baseStations = pilot.stations.filter((s) => s.type === 'base');

  const roleColors = [
    { bg: 'bg-blue-600', checkBg: '#eff6ff', checkBorder: '#bfdbfe', checkText: '#1d4ed8' },
    { bg: 'bg-slate-800', checkBg: '#f8fafc', checkBorder: '#e2e8f0', checkText: '#1e293b' },
    { bg: 'bg-emerald-600', checkBg: '#f0fdf4', checkBorder: '#bbf7d0', checkText: '#065f46' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <PageHeader
        Icon={Rocket}
        badge="Текущий этап"
        title={pilot.title}
        lead={pilot.goal}
        chips={[
          { label: `${pilotStations.length} пилотных станции`, color: '#2563eb' },
          { label: '10 шагов маршрута', color: '#7c3aed' },
          { label: `${pilot.successCriteria.length} критериев успеха`, color: '#16a34a' },
        ]}
        accentColor="#2563eb"
      />

      {/* Quick facts strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: pilotStations.length.toString(), label: 'пилотных станции', color: '#2563eb' },
              { value: pilot.successCriteria.length.toString(), label: 'критериев успеха', color: '#16a34a' },
              { value: pilot.mvpFeatures.length.toString(), label: 'функций MVP', color: '#7c3aed' },
              { value: pilot.roles.length.toString(), label: 'ролей участников', color: '#d97706' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Flow chain card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Цифровая цепочка</div>
              <div className="text-base font-bold text-slate-900">Служебная поездка ШЧ — 10 шагов</div>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
              <PilotFlowChain />
            </div>
          </div>
        </div>

        {/* Benefits card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Выгоды</div>
            <div className="text-base font-bold text-slate-900">Что получает каждая роль</div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {pilot.benefits.map((b, i) => {
                const c = roleColors[i] ?? roleColors[0];
                return (
                  <div key={b.role} className="rounded-2xl overflow-hidden border border-slate-200">
                    <div className={`px-5 py-3 ${c.bg}`}>
                      <div className="text-sm font-bold text-white">{b.role}</div>
                    </div>
                    <ul className="px-5 py-4 space-y-2.5 bg-white">
                      {b.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: c.checkText }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Success criteria card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Критерии успеха</div>
            <div className="text-base font-bold text-slate-900">Пилот считается успешным, если</div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {pilot.successCriteria.map((criterion, i) => (
                <div key={i} className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-emerald-200">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">{criterion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stations + Roles card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="text-base font-bold text-slate-900">Участники и станции</div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stations */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Станции</div>
                </div>
                <div className="px-5 py-4">
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Пилотные</div>
                  <div className="space-y-1.5 mb-4">
                    {pilotStations.map((s) => (
                      <div key={s.name} className="flex items-center gap-2.5">
                        <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                        <span className="text-sm font-medium text-slate-800">{s.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Базовые</div>
                    {baseStations.map((s) => (
                      <div key={s.name} className="flex items-center gap-2.5 mb-1.5">
                        <span className="w-2 h-2 bg-slate-300 rounded-full shrink-0" />
                        <span className="text-sm text-slate-500">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roles */}
              <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Роли участников</div>
                </div>
                <div className="p-5 grid sm:grid-cols-2 gap-3">
                  {pilot.roles.map((role) => (
                    <div key={role.name} className="bg-white border border-slate-200 rounded-xl p-3.5">
                      <div className="text-sm font-bold text-slate-900 mb-2">{role.name}</div>
                      <ul className="space-y-1">
                        {role.responsibilities.map((r) => (
                          <li key={r} className="text-xs text-slate-500 flex items-start gap-1.5">
                            <span className="text-slate-300 shrink-0 mt-0.5">—</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MVP scope card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Объём пилота</div>
            <div className="text-base font-bold text-slate-900">Что входит в MVP и что вне скоупа</div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3 className="text-sm font-bold text-emerald-900">В MVP пилота</h3>
                </div>
                <ul className="space-y-2">
                  {pilot.mvpFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-slate-400 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-slate-700">Не входит в MVP</h3>
                </div>
                <ul className="space-y-2">
                  {pilot.outOfScope.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="text-slate-300 mt-0.5 shrink-0 font-bold">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
