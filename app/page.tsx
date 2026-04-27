import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ContourCards from '@/components/ContourCards';
import ModuleGrid from '@/components/ModuleGrid';
import RoadmapSection from '@/components/RoadmapSection';
import Link from 'next/link';
import { openQuestions } from '@/data/railEcosystemContent';
import { MapPin, Clock, CheckCircle, FileSpreadsheet, ClipboardCheck, BarChart3, ArrowRight, type LucideIcon } from 'lucide-react';

// ─── What becomes visible ──────────────────────────────────────────────────────

const visibilityItems: { Icon: LucideIcon; color: string; text: string }[] = [
  { Icon: MapPin,        color: '#2563eb', text: 'Кто куда поехал и что сделал — по каждому работнику' },
  { Icon: Clock,         color: '#7c3aed', text: 'Фактическое время работы на объекте — без ручного учёта' },
  { Icon: CheckCircle,   color: '#16a34a', text: 'Реальный факт выезда подтверждён QR, а не подписью на бумаге' },
  { Icon: FileSpreadsheet, color: '#0369a1', text: 'Excel-реестр поездок формируется автоматически для бухгалтерии' },
  { Icon: ClipboardCheck, color: '#d97706', text: 'Цепочка согласования прозрачна — кто утвердил, когда, с какого устройства' },
  { Icon: BarChart3,     color: '#16a34a', text: 'Аналитика по дистанции: частота поездок, выполнение работ, нагрузка' },
];

function VisibilitySection() {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Что Rail Ecosystem делает видимым</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-xl">
          Сейчас эти данные существуют на бумаге или не существуют вовсе.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibilityItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.color + '15' }}>
                <item.Icon className="w-4 h-4" style={{ color: item.color }} />
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Data flow (6 steps) ───────────────────────────────────────────────────────

const dataFlowSteps = [
  { step: 1, label: 'Служба', desc: 'Работник ШЧ выезжает на станцию' },
  { step: 2, label: 'Процесс', desc: 'Маршрутный лист создан, согласован' },
  { step: 3, label: 'Событие', desc: 'QR-скан фиксирует прибытие и убытие' },
  { step: 4, label: 'Подтверждение', desc: 'Начальник утверждает итог поездки' },
  { step: 5, label: 'Отчёт', desc: 'Excel-реестр формируется автоматически' },
  { step: 6, label: 'Аналитика', desc: 'Данные — в дашборды и KPI дистанции' },
];

function DataFlowSection() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Как течут данные</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-xl">
          От реального события на станции — до управленческой аналитики.
        </p>

        {/* Desktop: horizontal chain with arrows */}
        <div className="hidden md:flex items-start gap-0">
          {dataFlowSteps.map((s, i) => (
            <div key={s.step} className="flex items-start shrink-0">
              <div className="flex flex-col items-center w-28">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-2 shadow-sm">
                  {s.step}
                </div>
                <div className="text-sm font-semibold text-slate-900 text-center leading-tight mb-1">{s.label}</div>
                <div className="text-xs text-slate-500 text-center leading-snug">{s.desc}</div>
              </div>
              {i < dataFlowSteps.length - 1 && (
                <div className="flex items-start pt-3 px-1 shrink-0">
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
          {dataFlowSteps.map((s, i) => (
            <div key={s.step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  {s.step}
                </div>
                {i < dataFlowSteps.length - 1 && <div className="w-0.5 bg-blue-200 flex-1 mt-1" />}
              </div>
              <div className="pb-3">
                <div className="text-sm font-semibold text-slate-800">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Open Questions ────────────────────────────────────────────────────────────

function OpenQuestionsSection() {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Что нужно уточнить перед пилотом</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-xl">
          Открытые вопросы, ответы на которые определяют финальный объём MVP.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {openQuestions.map((q, i) => (
            <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">{q.area}</div>
              <p className="text-sm font-medium text-slate-800 leading-snug mb-2">{q.question}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{q.why}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ContourCards />
      <VisibilitySection />
      <DataFlowSection />

      {/* Pilot callout */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-1">Текущий этап</div>
            <h2 className="text-xl font-bold text-white">Пилот RailRoutes для ШЧ</h2>
            <p className="text-blue-100 mt-1.5 text-sm max-w-lg leading-relaxed">
              Станции Айса, Донгал, Босага. Цифровой маршрутный лист с QR-отметками, офлайн-режимом
              и автоматическим Excel-реестром для бухгалтерии.
            </p>
          </div>
          <Link
            href="/pilot"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/30"
          >
            Детали пилота
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ModuleGrid limit={8} />
      <RoadmapSection />
      <OpenQuestionsSection />

      {/* Map CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Откройте интерактивную карту экосистемы</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
            Все контуры, организации, модули, процессы и проблемы — на одной интерактивной схеме.
            Переключайте режимы и кликайте на узлы.
          </p>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
          >
            Открыть карту
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
