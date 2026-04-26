import Link from 'next/link';
import { contours } from '@/data/railEcosystemContent';

export default function ContourCards() {
  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Операционные контуры</h2>
          <p className="mt-2 text-gray-500">Два производственных контура и цифровое ядро Rail Ecosystem</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {contours.map((contour) => (
            <div
              key={contour.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
              style={{ borderTopColor: contour.color, borderTopWidth: 3 }}
            >
              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{contour.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{contour.description}</p>

                <div className="space-y-1">
                  {contour.chain.map((node, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="flex flex-col items-center mt-1 shrink-0">
                        <div
                          className="w-2 h-2 rounded-full border-2"
                          style={{ borderColor: contour.color, backgroundColor: i === 0 ? contour.color : 'white' }}
                        />
                        {i < contour.chain.length - 1 && (
                          <div className="w-px h-4" style={{ backgroundColor: contour.color + '40' }} />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800">{node.label}</span>
                        {node.sublabel && (
                          <span className="text-xs text-gray-400 ml-1">— {node.sublabel}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <span className="text-xs text-gray-400">{contour.modules.length} модулей</span>
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
