import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)',
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 60% 50%, #3b82f6 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-blue-200 font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Версия 0.1 — Пилот RailRoutes
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Rail Ecosystem —{' '}
            <span className="text-blue-300">цифровая карта</span> реальной<br className="hidden sm:block" />
            эксплуатации железной дороги
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            Объединяет служебные поездки, маршрутные листы, выполнение работ, ГТП,
            журналы, локомотивные бригады, аналитику и нормативную базу в единую
            цифровую экосистему.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 backdrop-blur-sm">
            <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider mr-1">Формула</span>
            <code className="text-sm text-white font-mono">
              Служба → процесс → событие → подтверждение → отчёт → аналитика
            </code>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-900/30"
            >
              Открыть карту экосистемы
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/25 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Пилот для ШЧ →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
