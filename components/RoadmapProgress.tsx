'use client';

import type { RoadmapStage } from '@/types/railEcosystem';
import { getVisualStatus, VS_COLOR } from '@/lib/roadmapUtils';

export { getVisualStatus, VS_COLOR };
export type { VisualStatus } from '@/lib/roadmapUtils';

const C = {
  bg:     '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
};

interface Props {
  stages: RoadmapStage[];
}

export function RoadmapProgress({ stages }: Props) {
  function scrollToStage(n: number) {
    document.getElementById(`stage-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div
      className="rounded-2xl border p-6 overflow-x-auto"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <div className="relative" style={{ minWidth: `${stages.length * 120}px` }}>
        {/* Background connecting line */}
        <div
          className="absolute"
          style={{ top: 19, left: 20, right: 20, height: 1, background: C.border }}
        />

        {/* Nodes */}
        <div className="relative flex justify-between">
          {stages.map((stage, i) => {
            const status  = getVisualStatus(stage, i, stages.length);
            const color   = VS_COLOR[status];
            const active  = status === 'current';

            return (
              <button
                key={stage.number}
                onClick={() => scrollToStage(stage.number)}
                className="flex flex-col items-center gap-2 group"
                style={{ minWidth: 80 }}
              >
                {/* Circle */}
                <div className="relative w-10 h-10">
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: color, opacity: 0.25 }}
                    />
                  )}
                  <div
                    className="relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10"
                    style={{
                      background:  color,
                      color:       '#fff',
                      boxShadow:   active ? `0 0 0 4px ${color}25` : undefined,
                    }}
                  >
                    {stage.number}
                  </div>
                </div>

                {/* Label */}
                <div
                  className="text-xs font-medium text-center leading-tight px-1"
                  style={{
                    color:    active ? C.text : C.muted,
                    maxWidth: 90,
                  }}
                >
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
