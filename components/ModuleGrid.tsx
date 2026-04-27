import { modules } from '@/data/railEcosystemContent';
import ModuleCard from '@/components/ModuleCard';
import Link from 'next/link';

interface ModuleGridProps {
  limit?: number;
  showDetails?: boolean;
}

export default function ModuleGrid({ limit, showDetails = false }: ModuleGridProps) {
  const displayed = limit ? modules.slice(0, limit) : modules;

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Модули Rail Ecosystem</h2>
          <p className="mt-2 text-slate-500">{modules.length} цифровых модулей, покрывающих все процессы железнодорожной эксплуатации</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map((mod) => (
            <ModuleCard key={mod.id} module={mod} showDetails={showDetails} />
          ))}
        </div>
        {limit && modules.length > limit && (
          <div className="mt-8 text-center">
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              Все {modules.length} модулей →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
