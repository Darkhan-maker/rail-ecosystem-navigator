'use client';

import { useState } from 'react';
import { contours, modules, mapNodes } from '@/data/railEcosystemContent';
import type { Module } from '@/types/railEcosystem';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'contours' | 'modules' | 'processes' | 'problems';

interface SidebarItem {
  id: string;
  label: string;
  sublabel?: string;
  type: 'org' | 'module';
}

interface SidebarSection {
  id: string;
  label: string;
  color: string;
  items: SidebarItem[];
}

interface SelectedItem {
  id: string;
  kind: 'org' | 'module' | 'process' | 'problem';
}

// ─── Static Data ───────────────────────────────────────────────────────────────

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: 'magistral',
    label: 'Магистральная сеть',
    color: '#2563eb',
    items: [
      { id: 'ktj',          label: 'КТЖ',                        sublabel: 'национальный оператор', type: 'org' },
      { id: 'dir-magistral',label: 'Дирекция магистральной сети', sublabel: 'управление эксплуатацией', type: 'org' },
      { id: 'czjs',         label: 'ЦЖС',                        sublabel: 'центральный уровень', type: 'org' },
      { id: 'nzjs',         label: 'НЖС',                        sublabel: 'региональный уровень', type: 'org' },
      { id: 'pch',          label: 'ПЧ',                         sublabel: 'путевая дистанция', type: 'org' },
      { id: 'shch',         label: 'ШЧ',                         sublabel: 'сигнализация и связь', type: 'org' },
      { id: 'ech',          label: 'ЭЧ',                         sublabel: 'электроснабжение', type: 'org' },
    ],
  },
  {
    id: 'cargo',
    label: 'Грузовые перевозки',
    color: '#16a34a',
    items: [
      { id: 'ktj-cargo',    label: 'КТЖ',                              sublabel: 'головная организация', type: 'org' },
      { id: 'too-gp',       label: 'ТОО «КТЖ – Грузовые перевозки»',   sublabel: 'дочернее предприятие', type: 'org' },
      { id: 'depo',         label: 'Депо / отделения',                  sublabel: 'производственные единицы', type: 'org' },
      { id: 'brigady',      label: 'Локомотивные бригады',              sublabel: 'машинисты и помощники', type: 'org' },
    ],
  },
  {
    id: 'digital-core',
    label: 'Цифровое ядро',
    color: '#7c3aed',
    items: ['railanalytics','railai','raildatahub','reporting','notifications','usermgmt','integration']
      .map(id => modules.find(m => m.id === id))
      .filter((m): m is Module => Boolean(m))
      .map(m => ({ id: m.id, label: m.name, sublabel: m.russianName, type: 'module' as const })),
  },
  {
    id: 'ops-modules',
    label: 'Операционные модули',
    color: '#3b82f6',
    items: ['railroutes','railwork','raildocs','railsafety','railcrew','railtime','railcargo']
      .map(id => modules.find(m => m.id === id))
      .filter((m): m is Module => Boolean(m))
      .map(m => ({ id: m.id, label: m.name, sublabel: m.russianName, type: 'module' as const })),
  },
];

const PROCESS_FLOWS = [
  {
    id: 'shch-route',
    title: 'Маршрутный лист ШЧ',
    subtitle: 'Служебная поездка работника дистанции',
    moduleId: 'railroutes',
    color: '#2563eb',
    steps: ['Создание', 'Согласование', 'Инструктаж', 'Выезд', 'QR-прибытие', 'Работа', 'QR-убытие', 'Утверждение'],
  },
  {
    id: 'reporting-flow',
    title: 'Формирование отчётности',
    subtitle: 'От поездки до бухгалтерского реестра',
    moduleId: 'reporting',
    color: '#7c3aed',
    steps: ['Данные поездок', 'Утверждение', 'Excel-реестр', 'Бухгалтерия', 'Архивирование'],
  },
  {
    id: 'analytics-flow',
    title: 'Аналитика дистанции',
    subtitle: 'Агрегация и визуализация данных',
    moduleId: 'railanalytics',
    color: '#0891b2',
    steps: ['Сбор событий', 'RailData Hub', 'Агрегация', 'Дашборды', 'KPI-отчёты'],
  },
  {
    id: 'crew-cycle',
    title: 'Цикл локомотивной бригады',
    subtitle: 'От вызова до учёта рабочего времени',
    moduleId: 'railcrew',
    color: '#16a34a',
    steps: ['Вызов', 'Подтверждение', 'Явка', 'Меддопуск', 'Рейс', 'Сдача', 'Завершение', 'Учёт времени'],
  },
];

const PROBLEMS = [
  {
    id: 'prob-paper-routes',
    problem: 'Бумажные маршрутные листы',
    problemDesc: 'Маршрутные листы ШЧ заполняются вручную — потери, ошибки, нет цифрового контроля.',
    solutionId: 'railroutes',
    solution: 'RailRoutes',
    solutionDesc: 'Цифровой маршрутный лист с QR-отметками, согласованием и офлайн-режимом.',
    effect: 'QR-контроль каждой поездки, автоматическая фиксация прибытия/убытия',
  },
  {
    id: 'prob-manual-journals',
    problem: 'Ручные журналы',
    problemDesc: 'Журналы явки и инструктажей ведутся на бумаге — нет системы хранения и поиска.',
    solutionId: 'raildocs',
    solution: 'RailDocs',
    solutionDesc: 'Электронные журналы, акты и инструктажи с электронной подписью.',
    effect: 'Цифровой архив документов, мгновенный поиск и аудит',
  },
  {
    id: 'prob-fake-trips',
    problem: 'Фиктивные поездки',
    problemDesc: 'Без QR-контроля невозможно подтвердить реальный факт выезда на станцию.',
    solutionId: 'railroutes',
    solution: 'RailRoutes',
    solutionDesc: 'QR-коды на станциях подтверждают физическое присутствие работника.',
    effect: 'Верифицированный факт выезда и присутствия на объекте',
  },
  {
    id: 'prob-no-digital-trail',
    problem: 'Нет цифрового следа',
    problemDesc: 'Данные о поездках и работах не сохраняются системно — невозможен аудит.',
    solutionId: 'raildatahub',
    solution: 'RailData Hub',
    solutionDesc: 'Единый сервис хранения и маршрутизации всех событий экосистемы.',
    effect: 'Полный аудируемый журнал событий по каждой дистанции',
  },
  {
    id: 'prob-scattered-excel',
    problem: 'Разрозненные Excel-файлы',
    problemDesc: 'Данные в разных файлах без единой системы — ручная сводка, задержки, ошибки.',
    solutionId: 'reporting',
    solution: 'Reporting Layer',
    solutionDesc: 'Автоматическая генерация Excel и PDF реестров напрямую из системы.',
    effect: 'Один источник правды, реестр формируется в один клик',
  },
  {
    id: 'prob-weak-analytics',
    problem: 'Слабая аналитика',
    problemDesc: 'Нет оперативной аналитики по дистанциям — отчёты с задержкой и ошибками.',
    solutionId: 'railanalytics',
    solution: 'RailAnalytics',
    solutionDesc: 'Агрегация данных из всех модулей в живые дашборды и KPI-отчёты.',
    effect: 'Оперативная картина по каждой дистанции в реальном времени',
  },
  {
    id: 'prob-gtp-disconnect',
    problem: 'Разрыв ГТП и выезда',
    problemDesc: 'ГТП и фактические выезды не связаны — нельзя сопоставить план с реальным выполнением.',
    solutionId: 'railwork',
    solution: 'RailWork',
    solutionDesc: 'Привязка маршрутных листов к ГТП и задачам на работу.',
    effect: 'Прямое сопоставление плановых и фактических работ',
  },
];

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  'mvp-priority':   { label: 'MVP — приоритет',  color: '#2563eb', bg: '#eff6ff' },
  'mvp-support':    { label: 'MVP — поддержка',  color: '#0891b2', bg: '#ecfeff' },
  'next-stage':     { label: 'Следующий этап',   color: '#7c3aed', bg: '#f5f3ff' },
  'future-stage':   { label: 'Будущий этап',     color: '#d97706', bg: '#fffbeb' },
  'planned-stage':  { label: 'Планируется',      color: '#64748b', bg: '#f8fafc' },
  'core-stage':     { label: 'Ядро платформы',   color: '#7c3aed', bg: '#f5f3ff' },
  'strategic-stage':{ label: 'Стратегический',   color: '#6b7280', bg: '#f9fafb' },
  'parallel-stage': { label: 'Параллельный',     color: '#059669', bg: '#f0fdf4' },
};

// ─── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({
  expanded,
  onToggle,
  selected,
  onSelect,
}: {
  expanded: Set<string>;
  onToggle: (id: string) => void;
  selected: SelectedItem | null;
  onSelect: (item: SelectedItem) => void;
}) {
  return (
    <div className="w-56 shrink-0 bg-slate-900 flex flex-col overflow-y-auto border-r border-slate-800">
      <div className="px-3 py-3 border-b border-slate-800 shrink-0">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Навигатор</div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {SIDEBAR_SECTIONS.map(section => {
          const isOpen = expanded.has(section.id);
          return (
            <div key={section.id}>
              <button
                onClick={() => onToggle(section.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800 transition-colors group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: section.color }}
                />
                <span className="flex-1 text-xs font-semibold text-slate-300 group-hover:text-white leading-tight">
                  {section.label}
                </span>
                <svg
                  className={`w-3 h-3 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {isOpen && (
                <div className="pl-5 pb-1">
                  {section.items.map(item => {
                    const isActive = selected?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelect({ id: item.id, kind: item.type })}
                        className={`w-full text-left px-2 py-1.5 rounded-md mb-0.5 transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-[11px] font-medium leading-tight">{item.label}</div>
                        {item.sublabel && (
                          <div className={`text-[10px] leading-tight mt-0.5 ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                            {item.sublabel}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Right Inspector Panel ─────────────────────────────────────────────────────

function InspectorPanel({
  selected,
  onClose,
}: {
  selected: SelectedItem | null;
  onClose: () => void;
}) {
  if (!selected) {
    return (
      <div className="w-72 shrink-0 bg-white border-l border-slate-200 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">◉</div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Выберите элемент в левом дереве или кликните на карточку в центре
        </p>
      </div>
    );
  }

  const { id, kind } = selected;

  if (kind === 'module') {
    const mod = modules.find(m => m.id === id);
    if (!mod) return null;
    const statusMeta = STATUS_META[mod.status] ?? { label: mod.status, color: '#64748b', bg: '#f8fafc' };
    const related = mod.relatedModules.map(rid => modules.find(m => m.id === rid)).filter(Boolean) as Module[];

    return (
      <div className="w-72 shrink-0 bg-white border-l border-slate-200 flex flex-col overflow-y-auto">
        <div className="px-4 py-3 border-b border-slate-100 shrink-0 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Модуль</div>
            <div className="text-sm font-bold text-slate-900">{mod.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">{mod.russianName}</div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400 shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4 text-[13px]">
          <span
            className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: statusMeta.bg, color: statusMeta.color }}
          >
            {statusMeta.label}
          </span>
          <p className="text-slate-700 leading-relaxed">{mod.description}</p>
          {mod.details && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Детали</div>
              <p className="text-slate-600 leading-relaxed text-xs">{mod.details}</p>
            </div>
          )}
          {mod.inputData && mod.inputData.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Входные данные</div>
              <div className="flex flex-wrap gap-1">
                {mod.inputData.map(d => (
                  <span key={d} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">{d}</span>
                ))}
              </div>
            </div>
          )}
          {mod.outputData && mod.outputData.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Выходные данные</div>
              <div className="flex flex-wrap gap-1">
                {mod.outputData.map(d => (
                  <span key={d} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">{d}</span>
                ))}
              </div>
            </div>
          )}
          {related.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Связанные модули</div>
              <div className="space-y-1">
                {related.map(m => (
                  <div key={m.id} className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-slate-400 ml-1">— {m.russianName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (kind === 'org') {
    const node = mapNodes.find(n => n.id === id);
    if (!node) return null;
    return (
      <div className="w-72 shrink-0 bg-white border-l border-slate-200 flex flex-col overflow-y-auto">
        <div className="px-4 py-3 border-b border-slate-100 shrink-0 flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Организация</div>
            <div className="text-sm font-bold text-slate-900">{node.data.label}</div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400 shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 text-[13px]">
          {node.data.description && (
            <p className="text-slate-700 leading-relaxed">{node.data.description}</p>
          )}
          {(node.data.relatedModules ?? []).length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Использует модули</div>
              <div className="space-y-1">
                {(node.data.relatedModules ?? []).map(mid => {
                  const m = modules.find(x => x.id === mid);
                  if (!m) return null;
                  return (
                    <div key={mid} className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 font-medium">
                      {m.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ─── Tab: Overview ─────────────────────────────────────────────────────────────

function OverviewTab({ onSelect }: { onSelect: (item: SelectedItem) => void }) {
  const contourMeta = [
    { color: '#2563eb', icon: '🛤', orgs: ['КТЖ', 'Дирекция', 'ЦЖС', 'НЖС', 'ПЧ / ШЧ / ЭЧ'], tag: 'Магистральная сеть' },
    { color: '#16a34a', icon: '🚂', orgs: ['КТЖ', 'ТОО КТЖ-ГП', 'Депо', 'Локомотивные бригады'], tag: 'Грузовые перевозки' },
    { color: '#7c3aed', icon: '⬡',  orgs: ['RailData Hub', 'RailAI', 'RailAnalytics', 'Reporting', 'Notifications'], tag: 'Цифровое ядро' },
  ];

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Rail Ecosystem</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Единая цифровая платформа для управления железнодорожной эксплуатацией КТЖ.
          Два операционных контура и горизонтальное цифровое ядро.
        </p>
      </div>

      {/* 3 zone cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {contours.map((c, i) => {
          const meta = contourMeta[i];
          const contourModules = modules.filter(m => c.modules.includes(m.id));
          return (
            <div
              key={c.id}
              className="rounded-2xl border overflow-hidden shadow-sm"
              style={{ borderColor: c.color + '30' }}
            >
              <div className="px-4 py-3" style={{ background: c.color + '12' }}>
                <div className="text-lg mb-1">{meta.icon}</div>
                <div className="text-sm font-bold leading-snug" style={{ color: c.color }}>{c.name}</div>
              </div>
              <div className="px-4 py-3 bg-white">
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{c.description}</p>
                <div className="flex flex-wrap gap-1">
                  {contourModules.map(m => (
                    <button
                      key={m.id}
                      onClick={() => onSelect({ id: m.id, kind: 'module' })}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border transition-colors hover:border-blue-300 hover:text-blue-700"
                      style={{ borderColor: c.color + '40', color: c.color }}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connection diagram */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Как они соединяются</div>
        <div className="flex flex-col gap-3">
          {[
            { from: 'Магистральная сеть', to: 'Цифровое ядро', desc: 'Данные поездок, работ, документов', fromColor: '#2563eb', toColor: '#7c3aed' },
            { from: 'Грузовые перевозки', to: 'Цифровое ядро', desc: 'Данные бригад, рейсов, меддопуска', fromColor: '#16a34a', toColor: '#7c3aed' },
            { from: 'Цифровое ядро', to: 'Обе контуры', desc: 'Аналитика, отчёты, уведомления, роли', fromColor: '#7c3aed', toColor: '#3b82f6' },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="font-semibold px-2 py-1 rounded-md shrink-0" style={{ background: row.fromColor + '18', color: row.fromColor }}>{row.from}</span>
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="font-semibold px-2 py-1 rounded-md shrink-0" style={{ background: row.toColor + '18', color: row.toColor }}>{row.to}</span>
              <span className="text-slate-500 text-[11px] leading-tight">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { value: '3', label: 'контура' },
          { value: '14', label: 'модулей' },
          { value: '2', label: 'MVP в работе' },
          { value: '7', label: 'проблем решается' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 px-4 py-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Contours ─────────────────────────────────────────────────────────────

function ContoursTab({ onSelect }: { onSelect: (item: SelectedItem) => void }) {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {contours.map(c => {
        const cMods = modules.filter(m => c.modules.includes(m.id));
        return (
          <div key={c.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: c.color + '30' }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: c.color + '20', background: c.color + '08' }}>
              <h3 className="text-sm font-bold" style={{ color: c.color }}>{c.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.description}</p>
            </div>
            {/* Org chain */}
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Организационная цепочка</div>
              <div className="flex flex-wrap gap-0 items-center">
                {c.chain.map((node, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 whitespace-nowrap">
                        {node.label}
                      </div>
                      {node.sublabel && (
                        <div className="text-[10px] text-slate-400 mt-0.5 text-center">{node.sublabel}</div>
                      )}
                    </div>
                    {i < c.chain.length - 1 && (
                      <svg className="w-4 h-4 text-slate-300 shrink-0 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Modules */}
            <div className="px-5 py-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Модули</div>
              <div className="flex flex-wrap gap-2">
                {cMods.map(m => {
                  const sm = STATUS_META[m.status] ?? { label: m.status, color: '#64748b', bg: '#f8fafc' };
                  return (
                    <button
                      key={m.id}
                      onClick={() => onSelect({ id: m.id, kind: 'module' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xs font-semibold text-slate-800">{m.name}</span>
                      <span className="text-[10px] rounded-full px-1.5 py-0.5 font-medium" style={{ background: sm.bg, color: sm.color }}>
                        {sm.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tab: Modules ──────────────────────────────────────────────────────────────

function ModulesTab({ onSelect, selected }: { onSelect: (item: SelectedItem) => void; selected: SelectedItem | null }) {
  const [filter, setFilter] = useState<string>('all');

  const statusGroups = [
    { key: 'all', label: 'Все' },
    { key: 'mvp-priority', label: 'MVP' },
    { key: 'next-stage', label: 'Следующие' },
    { key: 'core-stage', label: 'Ядро' },
    { key: 'future-stage', label: 'Будущее' },
    { key: 'strategic-stage', label: 'Стратегические' },
  ];

  const filtered = filter === 'all' ? modules : modules.filter(m => m.status === filter);

  return (
    <div className="p-6 max-w-3xl">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {statusGroups.map(sg => (
          <button
            key={sg.key}
            onClick={() => setFilter(sg.key)}
            className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
              filter === sg.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
            }`}
          >
            {sg.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(m => {
          const sm = STATUS_META[m.status] ?? { label: m.status, color: '#64748b', bg: '#f8fafc' };
          const isActive = selected?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect({ id: m.id, kind: 'module' })}
              className={`text-left p-4 rounded-xl border shadow-sm transition-all ${
                isActive
                  ? 'border-blue-400 bg-blue-50 shadow-blue-100'
                  : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="text-sm font-bold text-slate-900">{m.name}</div>
                <span className="text-[10px] font-semibold rounded-full px-2 py-0.5 shrink-0" style={{ background: sm.bg, color: sm.color }}>
                  {sm.label}
                </span>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">{m.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Processes ────────────────────────────────────────────────────────────

function ProcessesTab({ onSelect }: { onSelect: (item: SelectedItem) => void }) {
  return (
    <div className="p-6 space-y-5 max-w-3xl">
      {PROCESS_FLOWS.map(flow => {
        const mod = modules.find(m => m.id === flow.moduleId);
        return (
          <div key={flow.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3" style={{ background: flow.color + '08' }}>
              <div>
                <div className="text-sm font-bold" style={{ color: flow.color }}>{flow.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{flow.subtitle}</div>
              </div>
              {mod && (
                <button
                  onClick={() => onSelect({ id: mod.id, kind: 'module' })}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-lg border shrink-0 hover:border-blue-300 transition-colors"
                  style={{ borderColor: flow.color + '40', color: flow.color, background: flow.color + '10' }}
                >
                  {mod.name}
                </button>
              )}
            </div>
            <div className="px-5 py-4">
              <div className="flex flex-wrap gap-0 items-center">
                {flow.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                        style={{ background: flow.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{step}</span>
                    </div>
                    {i < flow.steps.length - 1 && (
                      <svg className="w-3.5 h-3.5 text-slate-300 shrink-0 mx-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tab: Problems ─────────────────────────────────────────────────────────────

function ProblemsTab({ onSelect }: { onSelect: (item: SelectedItem) => void }) {
  return (
    <div className="p-6 space-y-4 max-w-3xl">
      <div className="text-xs text-slate-500 mb-5">
        Проблемы текущего состояния → решения через модули Rail Ecosystem → эффект для дистанции
      </div>
      {PROBLEMS.map(p => {
        const mod = modules.find(m => m.id === p.solutionId);
        return (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-slate-100">
              {/* Problem */}
              <div className="p-4 bg-red-50">
                <div className="text-[9px] font-bold text-red-500 uppercase tracking-widest mb-1.5">Проблема</div>
                <div className="text-xs font-semibold text-slate-800 mb-1.5">{p.problem}</div>
                <div className="text-[11px] text-slate-500 leading-relaxed">{p.problemDesc}</div>
              </div>
              {/* Solution */}
              <div className="p-4">
                <div className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-1.5">Решение</div>
                <button
                  onClick={() => mod && onSelect({ id: mod.id, kind: 'module' })}
                  className="text-xs font-semibold text-blue-700 underline-offset-2 hover:underline mb-1.5 block"
                >
                  {p.solution}
                </button>
                <div className="text-[11px] text-slate-500 leading-relaxed">{p.solutionDesc}</div>
              </div>
              {/* Effect */}
              <div className="p-4 bg-emerald-50">
                <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Эффект</div>
                <div className="text-[11px] text-slate-700 leading-relaxed font-medium">{p.effect}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview',   label: 'Обзор' },
  { id: 'contours',   label: 'Контуры' },
  { id: 'modules',    label: 'Модули' },
  { id: 'processes',  label: 'Процессы' },
  { id: 'problems',   label: 'Проблемы' },
];

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['magistral', 'digital-core']));

  function toggleSection(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  function handleSelect(item: SelectedItem) {
    setSelected(prev => (prev?.id === item.id ? null : item));
    // When a module is selected, switch to modules tab for context
    if (item.kind === 'module') setActiveTab('modules');
  }

  return (
    <div className="flex" style={{ height: 'calc(100vh - 3.5rem)' }}>
      {/* Left sidebar */}
      <Sidebar
        expanded={expanded}
        onToggle={toggleSection}
        selected={selected}
        onSelect={handleSelect}
      />

      {/* Center */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-slate-50">
        {/* Tab bar */}
        <div className="shrink-0 border-b border-slate-200 bg-white px-4">
          <div className="flex gap-1 -mb-px">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview'  && <OverviewTab  onSelect={handleSelect} />}
          {activeTab === 'contours'  && <ContoursTab  onSelect={handleSelect} />}
          {activeTab === 'modules'   && <ModulesTab   onSelect={handleSelect} selected={selected} />}
          {activeTab === 'processes' && <ProcessesTab onSelect={handleSelect} />}
          {activeTab === 'problems'  && <ProblemsTab  onSelect={handleSelect} />}
        </div>
      </div>

      {/* Right inspector */}
      <InspectorPanel selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
