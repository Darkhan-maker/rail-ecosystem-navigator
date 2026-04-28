'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PILOT_STATIONS } from '@/lib/pilotStations';
import { Term } from '@/components/Term';

const KazakhstanMap = dynamic(() => import('@/components/KazakhstanMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height:          '100%',
        background:      '#0c1424',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        color:           '#7a90a8',
        fontSize:        14,
      }}
    >
      Загрузка карты...
    </div>
  ),
});

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
    <div>
      {/* Desktop: map left (1.5fr) + list right (1fr) | Mobile: stacked */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6">

        {/* Map */}
        <div
          className="rounded-xl overflow-hidden border h-[400px] md:h-[500px]"
          style={{ borderColor: C.border }}
        >
          <KazakhstanMap />
        </div>

        {/* Station list */}
        <div className="flex flex-col gap-3">
          {PILOT_STATIONS.map(s => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-pressed={isActive}
                className="text-left rounded-xl border px-4 py-4 transition-colors"
                style={{
                  background:  isActive ? C.blue + '12' : C.card,
                  borderColor: isActive ? C.blue + '50' : C.border,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: isActive ? C.blue : C.dim }}
                  />
                  <span className="text-sm font-bold" style={{ color: isActive ? C.text : C.muted }}>
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

      {/* Disclaimer */}
      <p className="text-xs mt-3" style={{ color: C.dim }}>
        Карта пилотного развёртывания. Координаты станций уточняются — указаны примерные позиции в Карагандинской области.
      </p>
    </div>
  );
}
