import { contours, modules } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';
import { Network, GitBranch, Cpu, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const CONTOUR_META: { Icon: LucideIcon; label: string; effect: string }[] = [
  {
    Icon: GitBranch,
    label: 'Магистральная сеть',
    effect: 'Прозрачный учёт служебных поездок, работ и документации по всей сети дистанций.',
  },
  {
    Icon: ArrowRight,
    label: 'Грузовые перевозки',
    effect: 'Цифровой контроль полного рабочего цикла каждой бригады — от вызова до учёта времени.',
  },
  {
    Icon: Cpu,
    label: 'Цифровое ядро',
    effect: 'Единый источник данных, аналитики и управления ролями для обоих контуров.',
  },
];

export default function ContoursPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <PageHeader
        Icon={Network}
        title="Операционные контуры Rail Ecosystem"
        lead="Два производственных контура и единое цифровое ядро — каждый со своей организационной иерархией, процессами и модулями."
        chips={[
          { label: '3 контура', color: '#2563eb' },
          { label: '14 модулей', color: '#7c3aed' },
          { label: '2 MVP в работе', color: '#16a34a' },
        ]}
      />

      {/* Stat strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            {[
              { value: '2', label: 'операционных контура', color: '#2563eb' },
              { value: '1', label: 'цифровое ядро платформы', color: '#7c3aed' },
              { value: '14', label: 'цифровых модулей', color: '#16a34a' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contour panels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {contours.map((contour, idx) => {
          const contourModules = modules.filter((m) => contour.modules.includes(m.id));
          const { Icon: ContourIcon, effect } = CONTOUR_META[idx] ?? CONTOUR_META[0];

          return (
            <div
              key={contour.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
              style={{ borderTopColor: contour.color, borderTopWidth: 3 }}
            >
              {/* Panel header */}
              <div
                className="px-6 py-5 sm:px-8"
                style={{ background: `linear-gradient(135deg, ${contour.color}08 0%, transparent 70%)` }}
              >
                <div className="flex items-start gap-4 flex-wrap">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: contour.color + '15', border: `1px solid ${contour.color}28` }}
                  >
                    <ContourIcon className="w-5 h-5" style={{ color: contour.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg font-bold text-slate-900">{contour.name}</h2>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0"
                        style={{ background: contour.color + '15', color: contour.color }}
                      >
                        {contour.modules.length} модулей
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-2xl">{contour.description}</p>
                  </div>
                </div>
              </div>

              {/* Panel body */}
              <div className="border-t border-slate-100 grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                {/* Org chain */}
                <div className="px-6 py-6 sm:px-8">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                    Организационная иерархия
                  </div>
                  <div className="space-y-0">
                    {contour.chain.map((node, i) => (
                      <div key={i} className="flex items-stretch gap-3">
                        <div className="flex flex-col items-center w-5 shrink-0">
                          <div
                            className="w-3 h-3 rounded-full border-2 mt-1 shrink-0 z-10"
                            style={{
                              borderColor: contour.color,
                              background: i === 0 ? contour.color : '#fff',
                            }}
                          />
                          {i < contour.chain.length - 1 && (
                            <div className="w-px flex-1 min-h-[16px]" style={{ background: contour.color + '30' }} />
                          )}
                        </div>
                        <div className="pb-3">
                          <span className={`text-sm ${i === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                            {node.label}
                          </span>
                          {node.sublabel && (
                            <span className="text-xs text-slate-400 ml-2">— {node.sublabel}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                {contourModules.length > 0 && (
                  <div className="px-6 py-6 sm:px-8">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                      Цифровые модули
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {contourModules.map((m) => (
                        <div
                          key={m.id}
                          className="group border border-slate-200 rounded-xl p-3.5 bg-slate-50 hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all duration-150"
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{m.name}</div>
                            <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: contour.color }} />
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 leading-snug">{m.russianName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Effect footer */}
              <div
                className="border-t border-slate-100 px-6 py-4 sm:px-8 flex items-start gap-3"
                style={{ background: contour.color + '06' }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: contour.color + '20' }}
                >
                  <svg className="w-2.5 h-2.5" style={{ color: contour.color }} fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-700">Эффект: </span>{effect}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Каталог модулей</div>
            <p className="text-sm text-slate-600">Изучите все 14 модулей с деталями, входными/выходными данными и связями.</p>
          </div>
          <a
            href="/modules"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Все модули
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
