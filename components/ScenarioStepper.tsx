'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ScenarioStep } from '@/types/railEcosystem';

const C = {
  card:   '#0c1424',
  bg:     '#080d1a',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
};

// ─── Single step card ──────────────────────────────────────────────────────────

interface StepCardProps {
  step:    ScenarioStep;
  color:   string;
  isLast:  boolean;
}

function StepCard({ step, color, isLast }: StepCardProps) {
  const [open, setOpen] = useState(false);
  const hasData = step.dataPoints.length > 0;

  // Light readable tag colours for dark background
  const tagText   = color === '#2563eb' ? '#93c5fd' : '#fbbf24';
  const tagBg     = color + '12';
  const tagBorder = color + '30';

  return (
    <div className="flex gap-4">
      {/* ── Timeline rail ──────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 32 }}>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: color, boxShadow: `0 0 0 3px ${color}20` }}
        >
          {step.number}
        </div>
        {!isLast && (
          <div
            className="flex-1 w-px mt-1.5"
            style={{ background: `linear-gradient(to bottom, ${color}40, ${color}10)`, minHeight: 20 }}
          />
        )}
      </div>

      {/* ── Step card ──────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 pb-5">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ background: C.card, borderColor: C.border }}
        >
          {/* Content */}
          <div className="px-4 py-4">
            <div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>
              {step.name}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              {step.description}
            </p>
          </div>

          {/* Data toggle — only rendered if step has dataPoints */}
          {hasData && (
            <>
              <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center gap-1.5 px-4 py-2 border-t text-xs font-semibold transition-colors duration-150"
                style={{
                  borderColor: C.border,
                  color:       open ? color : C.dim,
                  background:  open ? color + '0a' : 'transparent',
                }}
              >
                {open
                  ? <ChevronUp   className="w-3.5 h-3.5" />
                  : <ChevronDown className="w-3.5 h-3.5" />
                }
                {open ? '– Скрыть данные' : '+ Данные шага'}
              </button>

              {/* Animated expand via max-height */}
              <div
                style={{
                  maxHeight:  open ? '240px' : '0px',
                  overflow:   'hidden',
                  transition: 'max-height 0.28s ease-out',
                }}
              >
                <div
                  className="px-4 py-3 flex flex-wrap gap-2 border-t"
                  style={{ borderColor: C.border }}
                >
                  {step.dataPoints.map(dp => (
                    <span
                      key={dp}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md border"
                      style={{ background: tagBg, color: tagText, borderColor: tagBorder }}
                    >
                      {dp}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Public component ──────────────────────────────────────────────────────────

export interface ScenarioStepperProps {
  steps: ScenarioStep[];
  color: string;
}

export function ScenarioStepper({ steps, color }: ScenarioStepperProps) {
  return (
    <div>
      {steps.map((step, i) => (
        <StepCard
          key={step.number}
          step={step}
          color={color}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
