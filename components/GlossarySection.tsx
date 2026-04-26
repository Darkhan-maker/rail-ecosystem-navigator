import { glossary } from '@/data/railEcosystemContent';

export default function GlossarySection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Словарь сокращений</h2>
          <p className="mt-2 text-gray-500">Термины и аббревиатуры, используемые в Rail Ecosystem</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {glossary.map((item) => (
            <div key={item.abbreviation} className="border border-gray-200 rounded-lg p-4">
              <div className="text-xl font-bold text-blue-600 mb-1">{item.abbreviation}</div>
              <div className="text-sm text-gray-800 font-medium">{item.fullForm}</div>
              {item.note && (
                <div className="text-xs text-amber-600 mt-1 italic">{item.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
