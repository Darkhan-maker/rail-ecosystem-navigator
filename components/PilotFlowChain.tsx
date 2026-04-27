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

const row1 = steps.slice(0, 5);
const row2 = steps.slice(5, 10);

function StepCard({ step, showArrow }: { step: typeof steps[0]; showArrow: boolean }) {
  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-0">
      <div className="flex flex-col items-center text-center flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mb-2 shadow-sm">
          {step.number}
        </div>
        <div className="text-xs font-semibold text-slate-800 leading-tight mb-1">{step.name}</div>
        <div className="text-xs text-slate-500 leading-snug">{step.desc}</div>
      </div>
      {showArrow && (
        <svg className="w-4 h-4 text-blue-300 shrink-0 mt-[-18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
}

export default function PilotFlowChain() {
  return (
    <div>
      {/* Desktop: 2 rows of 5 steps — no horizontal scroll */}
      <div className="hidden md:block space-y-6">
        {[row1, row2].map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-start gap-0">
            {row.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                showArrow={i < row.length - 1}
              />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400 shrink-0">шаги 1–5 → шаги 6–10</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </div>

      {/* Mobile/tablet: vertical list */}
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
              <div className="text-xs text-slate-500 mt-0.5 leading-snug">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
