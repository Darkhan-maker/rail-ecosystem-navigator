import Link from 'next/link';
import { contours } from '@/data/railEcosystemContent';

export default function ContourCards() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Операционные контуры</h2>
          <p className="mt-2 text-slate-500">Два производственных контура и цифровое ядро Rail Ecosystem</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {contours.map((contour) => (
            <div
              key={contour.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 flex flex-col"
            >
              {/* Coloured top bar */}
              <div className="h-1.5" style={{ background: contour.color }} />

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-slate-900 mb-2">{contour.name}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed flex-1">{contour.description}</p>

                <div className="space-y-0.5">
                  {contour.chain.map((node, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="flex flex-col items-center mt-1 shrink-0">
                        <div
                          className="w-2 h-2 rounded-full border-2 shrink-0"
                          style={{
                            borderColor: contour.color,
                            backgroundColor: i === 0 ? contour.color : 'transparent',
                          }}
                        />
                        {i < contour.chain.length - 1 && (
                          <div className="w-px h-3.5" style={{ backgroundColor: contour.color + '35' }} />
                        )}
                      </div>
                      <div className="pb-0.5">
                        <span className="text-sm font-medium text-slate-800">{node.label}</span>
                        {node.sublabel && (
                          <span className="text-xs text-slate-400 ml-1.5">— {node.sublabel}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">{contour.modules.length} модулей</span>
                <div
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: contour.color, background: contour.color + '15' }}
                >
                  {contour.id === 'magistral' ? 'Магистраль'
                    : contour.id === 'cargo' ? 'Грузовые'
                    : 'Цифровое ядро'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/contours"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Подробнее о контурах →
          </Link>
        </div>
      </div>
    </section>
  );
}
