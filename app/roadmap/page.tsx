import { ChevronDown, Layers, Workflow, Network, Sparkles, Milestone } from 'lucide-react';
import { roadmapStages, modules } from '@/data/railEcosystemContent';
import { RoadmapProgress } from '@/components/RoadmapProgress';
import { VS_COLOR, type VisualStatus } from '@/lib/roadmapUtils';
import { StageCard } from '@/components/StageCard';

// ─── Constants ─────────────────────────────────────────────────────────────────

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
  blue:   '#2563eb',
};

// ─── Legend ─────────────────────────────────────────────────────────────────────

const LEGEND: { status: VisualStatus; label: string; pulse: boolean }[] = [
  { status: 'current',   label: 'Активный',       pulse: true  },
  { status: 'next',      label: 'Следующий',       pulse: false },
  { status: 'future',    label: 'Будущий',         pulse: false },
  { status: 'strategic', label: 'Стратегический',  pulse: false },
];

// ─── Principles ─────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  { Icon: Layers,    title: 'От малого к большому',          desc: 'Сначала один модуль на пилотных станциях, потом масштабирование на всю сеть' },
  { Icon: Workflow,  title: 'От ручного к автоматическому',  desc: 'Каждый этап убирает больше бумажной рутины и ручного ввода' },
  { Icon: Network,   title: 'От разрозненного к единому',    desc: 'Все модули собираются в одну цифровую экосистему' },
  { Icon: Sparkles,  title: 'От реактивного к проактивному', desc: 'Финальный этап — предиктивная платформа, которая сама предлагает оптимизации' },
];

// ─── Stage connector ────────────────────────────────────────────────────────────

function StageConnector() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-5" style={{ background: C.border }} />
      <ChevronDown className="w-4 h-4 -my-0.5" style={{ color: C.dim }} />
      <div className="w-px h-4" style={{ background: C.border }} />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const total   = roadmapStages.length;
  const current = roadmapStages.filter(s => s.status === 'current').length;

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* 1. Hero */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: C.dim }}
          >
            <Milestone className="w-3.5 h-3.5" />
            Стратегия
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ color: C.text }}
          >
            Дорожная карта развития
          </h1>
          <p
            className="text-base leading-relaxed mb-6 max-w-2xl"
            style={{ color: C.muted }}
          >
            От пилота одного модуля до интеллектуальной платформы масштаба КТЖ
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: `${total} этапов`,      color: C.blue },
              { label: `${current} активный`,  color: '#10b981' },
              { label: `${total - current} планируемых`, color: C.dim },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="text-xs font-medium px-3 py-1.5 rounded-full border"
                style={{ color, borderColor: color + '40', background: color + '12' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* 2. Progress bar */}
        <RoadmapProgress stages={roadmapStages} />

        {/* 3. Legend */}
        <div className="flex flex-wrap gap-4 px-1">
          {LEGEND.map(({ status, label, pulse }) => {
            const color = VS_COLOR[status];
            return (
              <div key={status} className="flex items-center gap-2">
                <div className="relative w-3 h-3">
                  {pulse && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: color, opacity: 0.4 }}
                    />
                  )}
                  <span
                    className="relative block w-3 h-3 rounded-full"
                    style={{ background: color }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: C.muted }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 4. Stage cards with connectors */}
        <div>
          {roadmapStages.map((stage, i) => {
            const stageModules = modules.filter(m => stage.modules.includes(m.id));
            return (
              <div key={stage.number}>
                <StageCard
                  stage={stage}
                  stageModules={stageModules}
                  index={i}
                  total={total}
                />
                {i < total - 1 && <StageConnector />}
              </div>
            );
          })}
        </div>

        {/* 5. Principles block */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: C.card, borderColor: C.border }}
        >
          <div className="px-6 py-5 border-b" style={{ borderColor: C.border }}>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: C.dim }}
            >
              Подход
            </div>
            <h2 className="text-lg font-bold" style={{ color: C.text }}>
              Как мы движемся
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {PRINCIPLES.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="px-6 py-5 border-b sm:even:border-l last:border-b-0 sm:[&:nth-child(3)]:border-b-0"
                style={{ borderColor: C.border }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: C.blue + '15' }}
                >
                  <Icon className="w-4 h-4" style={{ color: C.blue }} />
                </div>
                <div className="text-sm font-bold mb-1" style={{ color: C.text }}>
                  {title}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
