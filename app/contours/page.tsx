import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Операционные контуры — Rail Ecosystem Navigator',
  description: 'Магистральная сеть, грузовые перевозки и цифровое ядро Rail Ecosystem',
};
import {
  Route, Container, Cpu, Target, ArrowRight,
  Database, Brain, BarChart3, FileText, Bell, Users, Plug,
  type LucideIcon,
} from 'lucide-react';
import { contours, modules } from '@/data/railEcosystemContent';
import type { Contour, ContourChainNode } from '@/types/railEcosystem';

// ─── Constants ─────────────────────────────────────────────────────────────────

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
};

const CONTOUR_ICONS: Record<string, LucideIcon> = {
  'magistral':    Route,
  'cargo':        Container,
  'digital-core': Cpu,
};

const MODULE_ICONS: Record<string, LucideIcon> = {
  'railanalytics': BarChart3,
  'railai':        Brain,
  'raildatahub':   Database,
  'reporting':     FileText,
  'notifications': Bell,
  'usermgmt':      Users,
  'integration':   Plug,
};

const CONTOUR_EFFECTS: Record<string, string> = {
  'magistral': 'Прозрачный учёт служебных поездок, работ и документации по всей сети дистанций — без бумаги и ручного реестра.',
  'cargo':     'Цифровой контроль полного рабочего цикла каждой бригады — от вызова до учёта времени и закрытия смены.',
};

// ─── Org Hierarchy ─────────────────────────────────────────────────────────────

function OrgHierarchy({ chain, color }: { chain: ContourChainNode[]; color: string }) {
  return (
    <div className="space-y-1.5">
      {chain.map((node, i) => (
        <div key={i} style={{ paddingLeft: `${Math.min(i, 5) * 16}px` }}>
          <div
            className="px-3 py-2 rounded-lg border text-sm"
            style={{
              background:  i === 0 ? color + '18' : C.bg,
              borderColor: i === 0 ? color + '45' : C.border,
              ...(i > 0 ? { borderLeft: `2px solid ${color}35` } : {}),
            }}
          >
            <span
              className={i === 0 ? 'font-bold' : 'font-medium'}
              style={{ color: i === 0 ? color : C.text }}
            >
              {node.label}
            </span>
            {node.sublabel && (
              <span className="ml-2 text-xs" style={{ color: C.muted }}>
                — {node.sublabel}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Operational Contour Card ──────────────────────────────────────────────────

function OperationalContourCard({ contour }: { contour: Contour }) {
  const Icon = CONTOUR_ICONS[contour.id] ?? Route;
  const effect = CONTOUR_EFFECTS[contour.id] ?? '';
  const contourModules = modules.filter((m) => contour.modules.includes(m.id));

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        background:   C.card,
        borderColor:  C.border,
        borderTop:    `3px solid ${contour.color}`,
      }}
    >
      {/* Header */}
      <div className="px-6 py-5 sm:px-8" style={{ background: contour.color + '0a' }}>
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: contour.color + '1a' }}
          >
            <Icon className="w-5 h-5" style={{ color: contour.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="text-lg font-bold" style={{ color: C.text }}>
                {contour.name}
              </h2>
              <span
                className="text-xs font-medium px-2.5 py-0.5 rounded-full border"
                style={{
                  color:       contour.color,
                  borderColor: contour.color + '40',
                  background:  contour.color + '10',
                }}
              >
                {contour.modules.length} модулей
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              {contour.description}
            </p>
          </div>
        </div>
      </div>

      {/* Body: org hierarchy + modules */}
      <div className="grid lg:grid-cols-2 border-t" style={{ borderColor: C.border }}>
        {/* Left: org hierarchy */}
        <div className="px-6 py-6 sm:px-8">
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-4"
            style={{ color: C.dim }}
          >
            Организационная иерархия
          </div>
          <OrgHierarchy chain={contour.chain} color={contour.color} />
        </div>

        {/* Right: modules */}
        <div
          className="px-6 py-6 sm:px-8 border-t lg:border-t-0 lg:border-l"
          style={{ borderColor: C.border }}
        >
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-4"
            style={{ color: C.dim }}
          >
            Цифровые модули
          </div>
          <div className="flex flex-wrap gap-2">
            {contourModules.map((m) => (
              <Link
                key={m.id}
                href={`/modules#${m.id}`}
                className="text-sm px-2.5 py-1.5 rounded-md border transition-opacity hover:opacity-70"
                style={{
                  color:       contour.color,
                  borderColor: contour.color + '40',
                  background:  contour.color + '0e',
                }}
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Effect footer */}
      <div
        className="border-t px-6 py-4 sm:px-8 flex items-start gap-3"
        style={{ borderColor: C.border, background: contour.color + '08' }}
      >
        <Target className="w-4 h-4 shrink-0 mt-0.5" style={{ color: contour.color }} />
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: contour.color }}
          >
            Эффект
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
            {effect}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Digital Core Card ─────────────────────────────────────────────────────────

const VIOLET = '#7c3aed';

function DigitalCoreCard({ contour }: { contour: Contour }) {
  const coreModules = modules.filter((m) => contour.modules.includes(m.id));

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ background: C.card, borderColor: C.border, borderTop: `3px solid ${VIOLET}` }}
    >
      {/* Header */}
      <div className="px-6 py-5 sm:px-8" style={{ background: VIOLET + '0a' }}>
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: VIOLET + '1a' }}
          >
            <Cpu className="w-5 h-5" style={{ color: VIOLET }} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>
              Цифровое ядро Rail Ecosystem
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Горизонтальная платформа, обслуживающая оба операционных контура
            </p>
          </div>
        </div>
      </div>

      {/* Platform composition */}
      <div className="px-6 py-6 sm:px-8 border-t" style={{ borderColor: C.border }}>
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-4"
          style={{ color: C.dim }}
        >
          Состав платформы
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {coreModules.map((m) => {
            const ModIcon = MODULE_ICONS[m.id] ?? Database;
            return (
              <Link
                key={m.id}
                href={`/modules#${m.id}`}
                className="flex items-start gap-3 rounded-xl p-3 border transition-opacity hover:opacity-75"
                style={{ background: C.bg, borderColor: C.border }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: VIOLET + '15' }}
                >
                  <ModIcon className="w-4 h-4" style={{ color: VIOLET }} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight" style={{ color: C.text }}>
                    {m.name}
                  </div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: C.muted }}>
                    {m.russianName}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* General function */}
      <div
        className="border-t px-6 py-4 sm:px-8 flex items-start gap-3"
        style={{ borderColor: C.border, background: VIOLET + '08' }}
      >
        <Target className="w-4 h-4 shrink-0 mt-0.5" style={{ color: VIOLET }} />
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: VIOLET }}
          >
            Общая функция
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
            {contour.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ContoursPage() {
  const operationalContours = contours.filter((c) => c.id !== 'digital-core');
  const digitalCore = contours.find((c) => c.id === 'digital-core')!;

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* Hero */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: C.dim }}
          >
            Архитектура
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3 max-w-2xl"
            style={{ color: C.text }}
          >
            Операционные контуры Rail Ecosystem
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: C.muted }}>
            Два производственных контура и единое цифровое ядро — каждый со своей
            организационной иерархией, процессами и цифровыми модулями.
          </p>
          <div className="flex flex-wrap gap-3">
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{
                background:  'rgba(37,99,235,0.12)',
                color:       '#93c5fd',
                borderColor: 'rgba(37,99,235,0.3)',
              }}
            >
              2 операционных контура
            </span>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{
                background:  'rgba(124,58,237,0.12)',
                color:       '#c4b5fd',
                borderColor: 'rgba(124,58,237,0.3)',
              }}
            >
              1 цифровое ядро
            </span>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium border"
              style={{
                background:  'rgba(71,85,105,0.12)',
                color:       '#94a3b8',
                borderColor: 'rgba(71,85,105,0.3)',
              }}
            >
              14 модулей
            </span>
          </div>
        </div>
      </section>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {operationalContours.map((c) => (
          <OperationalContourCard key={c.id} contour={c} />
        ))}
        <DigitalCoreCard contour={digitalCore} />
      </div>

      {/* Bottom CTA */}
      <div className="border-t" style={{ borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: C.dim }}
            >
              Каталог модулей
            </div>
            <p className="text-sm" style={{ color: C.muted }}>
              Изучите все 14 модулей с деталями, входными/выходными данными и связями.
            </p>
          </div>
          <Link
            href="/modules"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-80"
            style={{ background: C.card, color: C.text, borderColor: C.border }}
          >
            Все модули
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
