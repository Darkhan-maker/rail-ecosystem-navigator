const steps = [
  { number: 1,  name: 'Создание',     desc: 'Работник создаёт маршрутный лист: станция, цель, поезд' },
  { number: 2,  name: 'Согласование', desc: 'Старший проверяет и подтверждает маршрут' },
  { number: 3,  name: 'Инструктаж',   desc: 'Предвыездной инструктаж — фиксируется в журнале' },
  { number: 4,  name: 'Выезд',        desc: 'Работник отправляется. Маршрутный лист активирован' },
  { number: 5,  name: 'QR-прибытие',  desc: 'Скан QR на станции — время фиксируется автоматически' },
  { number: 6,  name: 'Работа',       desc: 'Выполнение плановых работ, фиксация статуса и фото' },
  { number: 7,  name: 'QR-убытие',    desc: 'Скан QR убытия — система считает время работы' },
  { number: 8,  name: 'Утверждение',  desc: 'Начальник дистанции утверждает маршрутный лист' },
  { number: 9,  name: 'Excel-реестр', desc: 'Автоматический реестр с суммой оплаты для бухгалтерии' },
  { number: 10, name: 'Аналитика',    desc: 'Данные — в дашборды по дистанции и выполнению работ' },
];

export default function PilotFlowChain() {
  return (
    <div>
      {/* Desktop: horizontal scroll with arrows */}
      <div className="hidden md:flex items-start gap-0 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-start shrink-0">
            <div className="flex flex-col items-center w-28">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mb-2 shadow-sm">
                {step.number}
              </div>
              <div className="text-xs font-semibold text-slate-800 text-center leading-tight mb-1">{step.name}</div>
              <div className="text-xs text-slate-500 text-center leading-snug">{step.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-start pt-4 px-1 shrink-0">
                <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden space-y-3">
        {steps.map((step, i) => (
          <div key={step.number} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                {step.number}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 bg-blue-200 flex-1 mt-1" />}
            </div>
            <div className="pb-3">
              <div className="text-sm font-semibold text-slate-800">{step.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
