'use client';

import type { PilotStation } from '@/lib/pilotStations';

// Simplified outline of Kazakhstan (Natural Earth, stylised for web)
const KZ_PATH =
  'M 50 180 L 80 160 L 120 140 L 180 130 L 240 125 L 310 130 ' +
  'L 380 135 L 450 145 L 520 155 L 580 170 L 620 185 L 650 210 ' +
  'L 660 240 L 645 270 L 615 290 L 570 295 L 510 285 L 450 280 ' +
  'L 390 285 L 330 290 L 270 295 L 210 290 L 150 280 L 100 260 ' +
  'L 65 230 L 50 200 Z';

interface Props {
  stations: PilotStation[];
  active:   string | null;
  onSelect: (id: string) => void;
}

export function KazakhstanMap({ stations, active, onSelect }: Props) {
  return (
    <svg
      viewBox="0 0 700 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Карта Казахстана с пилотными станциями"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Background */}
      <rect width="700" height="400" fill="#080d1a" />

      {/* Kazakhstan fill */}
      <path
        d={KZ_PATH}
        fill="#1a3a6e"
        stroke="#2563eb"
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* Station markers */}
      {stations.map(s => {
        const [cx, cy] = s.svgCoords;
        const isActive  = active === s.id;

        return (
          <g
            key={s.id}
            onClick={() => onSelect(s.id)}
            role="button"
            aria-label={s.name}
            aria-pressed={isActive}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onSelect(s.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Pulse ring on active station */}
            {isActive && (
              <circle
                cx={cx}
                cy={cy}
                r={12}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                style={{
                  animation:       'mapPulse 1.6s ease-out infinite',
                  transformBox:    'fill-box',
                  transformOrigin: 'center',
                }}
              />
            )}

            {/* Dot */}
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 7 : 5}
              fill={isActive ? '#3b82f6' : '#2563eb'}
              stroke="#fff"
              strokeWidth="1.5"
            />

            {/* Label */}
            <text
              x={cx}
              y={cy - 13}
              textAnchor="middle"
              style={{
                fontSize:      10,
                fontWeight:    isActive ? 700 : 500,
                fill:          isActive ? '#e2e8f0' : '#94a3b8',
                pointerEvents: 'none',
                userSelect:    'none',
              }}
            >
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
