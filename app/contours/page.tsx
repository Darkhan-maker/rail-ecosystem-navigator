import { contours } from '@/data/railEcosystemContent';
import { modules } from '@/data/railEcosystemContent';
import SectionTitle from '@/components/SectionTitle';

export default function ContoursPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        title="Операционные контуры Rail Ecosystem"
        subtitle="Rail Ecosystem охватывает два производственных контура и единое цифровое ядро"
      />

      <div className="space-y-10">
        {contours.map((contour) => {
          const contourModules = modules.filter((m) => contour.modules.includes(m.id));

          return (
            <div
              key={contour.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
              style={{ borderLeftColor: contour.color, borderLeftWidth: 4 }}
            >
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{contour.name}</h2>
                  <p className="text-sm text-gray-500 mt-1 max-w-xl">{contour.description}</p>
                </div>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: contour.color + '18', color: contour.color }}
                >
                  {contour.modules.length} модулей
                </span>
              </div>

              <div className="p-6 grid lg:grid-cols-2 gap-8">
                {/* Chain */}
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
                    Иерархическая цепочка
                  </div>
                  <div className="space-y-0">
                    {contour.chain.map((node, i) => (
                      <div key={i} className="flex items-stretch gap-3">
                        <div className="flex flex-col items-center w-6">
                          <div
                            className="w-3 h-3 rounded-full border-2 mt-1 shrink-0 z-10"
                            style={{
                              borderColor: contour.color,
                              backgroundColor: i === 0 ? contour.color : 'white',
                            }}
                          />
                          {i < contour.chain.length - 1 && (
                            <div
                              className="w-px flex-1 min-h-4"
                              style={{ backgroundColor: contour.color + '30' }}
                            />
                          )}
                        </div>
                        <div className="pb-3">
                          <span className="text-sm font-medium text-gray-800">{node.label}</span>
                          {node.sublabel && (
                            <span className="text-xs text-gray-400 ml-2">— {node.sublabel}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                {contourModules.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
                      Связанные модули
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {contourModules.map((m) => (
                        <div key={m.id} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                          <div className="text-sm font-semibold text-gray-800">{m.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{m.russianName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
