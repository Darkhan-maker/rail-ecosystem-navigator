const problems = [
  {
    icon: '📄',
    title: 'Бумажные маршрутные листы',
    description: 'Работники ШЧ заполняют бумажные листы вручную. Нет контроля, нет данных, потери и ошибки.',
    service: 'ШЧ / НЖС',
  },
  {
    icon: '⏱',
    title: 'Ручной учёт рабочего времени',
    description: 'Учёт явки локомотивных бригад ведётся в таблицах. Нет связи с реальными рейсами.',
    service: 'Локомотивные бригады',
  },
  {
    icon: '📊',
    title: 'Нет оперативной аналитики',
    description: 'Отчётность формируется вручную с задержкой. Данные по дистанциям не агрегированы.',
    service: 'Дирекция / ЦЖС',
  },
  {
    icon: '🔌',
    title: 'Разрозненные системы',
    description: 'Данные по поездкам, работам, ГТП и документам хранятся в разных местах без связи между собой.',
    service: 'Все уровни',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-14 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Какие проблемы решает Rail Ecosystem</h2>
          <p className="mt-2 text-gray-500">Реальные операционные проблемы в дистанциях КТЖ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p) => (
            <div key={p.title} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-2xl mb-3">{p.icon}</div>
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">{p.service}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
