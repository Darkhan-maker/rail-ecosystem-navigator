'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Home, MapPin } from 'lucide-react';
import { pilotStations } from '@/lib/pilotStations';

const KazakhstanMap = dynamic(() => import('@/components/KazakhstanMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height:         '100%',
        background:     '#0c1424',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          '#7a90a8',
        fontSize:       14,
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
  orange: '#d97706',
};

export function PilotStationsSection() {
  const [active, setActive] = useState<string>(pilotStations[0].id);

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
          {pilotStations.map(s => {
            const isBase    = s.type === 'base';
            const isActive  = active === s.id;
            const accentColor = isBase ? C.orange : C.blue;

            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-pressed={isActive}
                className="text-left rounded-xl border px-4 py-3.5 transition-colors relative overflow-hidden"
                style={{
                  background:  isActive ? accentColor + '0f' : C.card,
                  borderColor: isActive ? accentColor + '55' : C.border,
                  borderLeftWidth: 3,
                  borderLeftColor: accentColor,
                }}
              >
                {/* Badge */}
                <span
                  className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                  style={{ background: accentColor + '20', color: accentColor }}
                >
                  {isBase ? 'БАЗА' : 'ПИЛОТ'}
                </span>

                {/* Name row */}
                <div className="flex items-center gap-2 mb-1 pr-10">
                  {isBase
                    ? <Home  className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    : <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                  }
                  <span className="text-sm font-bold" style={{ color: isActive ? C.text : C.muted }}>
                    {s.name}
                  </span>
                </div>

                {/* Region + description */}
                <div className="pl-5 space-y-0.5">
                  <div className="text-xs" style={{ color: C.dim }}>{s.region}</div>
                  <div className="text-xs" style={{ color: C.dim }}>{s.description}</div>
                </div>
              </button>
            );
          })}

          {/* Legend */}
          <div
            className="flex items-center gap-5 px-4 py-3 rounded-xl border mt-1"
            style={{ background: C.bg, borderColor: C.border }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: C.orange }} />
              <span className="text-xs" style={{ color: C.dim }}>База ШЧ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: C.blue }} />
              <span className="text-xs" style={{ color: C.dim }}>Пилотная станция</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs mt-3" style={{ color: C.dim }}>
        Карта пилотного развёртывания. Координаты станций Айса, Донгал, Босага уточняются — указаны примерные позиции в Карагандинской области.
      </p>
    </div>
  );
}
