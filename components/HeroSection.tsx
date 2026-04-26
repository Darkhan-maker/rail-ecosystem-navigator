import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-white border-b border-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-sm text-blue-700 font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Версия 0.1 — Пилот RailRoutes
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Rail Ecosystem —<br />
            <span className="text-blue-600">цифровая карта</span> реальной<br />
            эксплуатации железной дороги
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Интерактивная система, которая объединяет служебные поездки, маршрутные листы,
            выполнение работ, ГТП, журналы, локомотивные бригады, аналитику и нормативную
            базу в единую цифровую экосистему.
          </p>

          <div className="mt-4 inline-block bg-gray-50 border border-gray-200 rounded px-4 py-2 text-sm text-gray-700 font-mono">
            Служба → процесс → событие → подтверждение → отчёт → аналитика
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Открыть карту экосистемы
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Пилот для ШЧ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
