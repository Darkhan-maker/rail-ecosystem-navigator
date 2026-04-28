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

        {/* Station list + legend */}
        <div className="flex flex-col gap-3">
          {pilotStations.map(s => {
            const isBase   = s.type === 'base';
            const isActive = active === s.id;
            const accent   = isBase ? C.orange : C.blue;

            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-pressed={isActive}
                className="text-left rounded-xl border px-4 py-3.5 transition-colors relative overflow-hidden"
                style={{
                  background:      isActive ? accent + '0f' : C.card,
                  borderColor:     isActive ? accent + '55' : C.border,
                  borderLeftWidth: 3,
                  borderLeftColor: accent,
                }}
              >
                {/* Badge */}
                <span
                  className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                  style={{ background: accent + '20', color: accent }}
                >
                  {isBase ? 'БАЗА' : 'ПИЛОТ'}
                </span>

                {/* Name row */}
                <div className="flex items-center gap-2 mb-1 pr-12">
                  {isBase
                    ? <Home   className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                    : <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
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
            style={{
              marginTop:    4,
              padding:      '12px 14px',
              background:   C.bg,
              border:       `1px solid ${C.border}`,
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 10, color: C.dim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              {'Легенда'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.orange, flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: C.muted }}>{'База ШЧ'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.blue, flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: C.muted }}>{'Пилотная станция'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 0, borderTop: `1px dashed ${C.blue}`, flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: C.muted }}>{'Маршрут выезда'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs mt-3" style={{ color: C.dim }}>
        {'Реальные координаты станций Шетского района Карагандинской области. Бригада ШЧ базируется в Акадыре, выезжает на пилотные станции Айса, Донгал, Босага.'}
      </p>
    </div>
  );
}
