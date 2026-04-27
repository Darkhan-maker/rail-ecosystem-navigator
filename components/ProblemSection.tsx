const problems = [
  {
    icon: '📄',
    title: 'Бумажные маршрутные листы',
    description: 'Работники ШЧ заполняют бумажные листы вручную. Нет контроля, нет данных, потери и ошибки.',
    service: 'ШЧ / НЖС',
    color: '#ef4444',
    lightBg: '#fff1f2',
    borderColor: '#fecaca',
  },
  {
    icon: '⏱',
    title: 'Ручной учёт рабочего времени',
    description: 'Учёт явки локомотивных бригад ведётся в таблицах. Нет связи с реальными рейсами.',
    service: 'Локомотивные бригады',
    color: '#f59e0b',
    lightBg: '#fffbeb',
    borderColor: '#fcd34d',
  },
  {
    icon: '📊',
    title: 'Нет оперативной аналитики',
    description: 'Отчётность формируется вручную с задержкой. Данные по дистанциям не агрегированы.',
    service: 'Дирекция / ЦЖС',
    color: '#f97316',
    lightBg: '#fff7ed',
    borderColor: '#fed7aa',
  },
  {
    icon: '🔌',
    title: 'Разрозненные системы',
    description: 'Данные по поездкам, работам, ГТП и документам хранятся в разных местах без связи между собой.',
    service: 'Все уровни',
    color: '#8b5cf6',
    lightBg: '#f5f3ff',
    borderColor: '#ddd6fe',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Какие проблемы решает Rail Ecosystem</h2>
          <p className="mt-2 text-slate-500">Реальные операционные проблемы в дистанциях КТЖ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-xl p-5 flex flex-col gap-3 border"
              style={{ background: p.lightBg, borderColor: p.borderColor }}
            >
              <div className="text-2xl">{p.icon}</div>
              <div>
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: p.color }}
                >
                  {p.service}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">{p.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
