'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PILOT_STATIONS } from '@/lib/pilotStations';
import { Term } from '@/components/Term';

const KazakhstanMap = dynamic(
  () => import('@/components/KazakhstanMap').then(m => ({ default: m.KazakhstanMap })),
  {
    ssr:     false,
    loading: () => (
      <div
        className="animate-pulse"
        style={{ height: 280, background: '#0c1424', borderRadius: '12px 12px 0 0' }}
      />
    ),
  },
);

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
  blue:   '#2563eb',
};

export function PilotStationsSection() {
  const [active, setActive] = useState<string>(PILOT_STATIONS[0].id);

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: C.card, borderColor: C.border }}
    >
      {/* Map */}
      <div className="border-b" style={{ borderColor: C.border }}>
        <KazakhstanMap
          stations={PILOT_STATIONS}
          active={active}
          onSelect={setActive}
        />
      </div>

      {/* Station list */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ borderColor: C.border }}
      >
        {PILOT_STATIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              aria-pressed={isActive}
              className="text-left px-4 py-4 transition-colors"
              style={{
                background:  isActive ? C.blue + '12' : 'transparent',
                borderRight: i < PILOT_STATIONS.length - 1 ? `1px solid ${C.border}` : undefined,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: isActive ? C.blue : C.dim }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: isActive ? C.text : C.muted }}
                >
                  {s.name}
                </span>
              </div>
              <div className="pl-4 space-y-0.5">
                <div className="text-xs" style={{ color: C.dim }}>{s.region}</div>
                <div className="text-xs" style={{ color: C.dim }}>
                  Контур <Term>НЖС</Term> · Магистральная сеть
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
