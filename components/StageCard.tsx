import Link from 'next/link';
import { Target, Package } from 'lucide-react';
import { MODULE_ICONS } from '@/components/icons';
import type { RoadmapStage } from '@/types/railEcosystem';
import type { Module } from '@/types/railEcosystem';
import { getVisualStatus, VS_COLOR, type VisualStatus } from '@/lib/roadmapUtils';

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
};

const STATUS_LABEL: Record<VisualStatus, string> = {
  current:   'Активный',
  next:      'Следующий',
  future:    'Будущий',
  strategic: 'Стратегический',
};

const STATUS_TEXT: Record<VisualStatus, string> = {
  current:   '#93c5fd',
  next:      '#93c5fd',
  future:    '#fbbf24',
  strategic: '#c4b5fd',
};

interface Props {
  stage:        RoadmapStage;
  stageModules: Module[];
  index:        number;
  total:        number;
}

export function StageCard({ stage, stageModules, index, total }: Props) {
  const vs    = getVisualStatus(stage, index, total);
  const color = VS_COLOR[vs];

  return (
    <div
      id={`stage-${stage.number}`}
      className="rounded-2xl border overflow-hidden"
      style={{
        background:   C.card,
        borderColor:  C.border,
        borderTop:    `3px solid ${color}`,
        scrollMarginTop: 80,
      }}
    >
      {/* Header */}
      <div className="px-6 py-5 flex items-start gap-5" style={{ background: color + '08' }}>
        {/* Big number */}
        <div
          className="text-6xl md:text-7xl font-black leading-none shrink-0 select-none"
          style={{ color: color + '28' }}
        >
          {stage.number}
        </div>

        {/* Title + badge */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
            <h2 className="text-xl font-bold leading-tight" style={{ color: C.text }}>
              {stage.name}
            </h2>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0"
              style={{
                color:       STATUS_TEXT[vs],
                borderColor: color + '40',
                background:  color + '12',
              }}
            >
              {STATUS_LABEL[vs]}
            </span>
          </div>
          <p className="text-sm" style={{ color: C.muted }}>{stage.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 border-t space-y-5" style={{ borderColor: C.border }}>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
          {stage.description}
        </p>

        {/* Result block */}
        {stage.result && (
          <div
            className="rounded-xl border p-4 flex items-start gap-3"
            style={{ background: C.bg, borderColor: color + '25' }}
          >
            <Target className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
            <div>
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color }}
              >
                Ожидаемый результат
              </div>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                {stage.result}
              </p>
            </div>
          </div>
        )}

        {/* Modules grid */}
        {stageModules.length > 0 && (
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: C.dim }}
            >
              Модули этапа
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stageModules.map((m) => {
                const Icon = MODULE_ICONS[m.id] ?? Package;
                return (
                  <Link
                    key={m.id}
                    href={`/modules#${m.id}`}
                    className="flex items-center gap-3 rounded-xl border p-3 transition-opacity hover:opacity-75"
                    style={{ background: C.bg, borderColor: C.border }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: color + '18' }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight" style={{ color: C.text }}>
                        {m.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: C.muted }}>
                        {m.russianName}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
