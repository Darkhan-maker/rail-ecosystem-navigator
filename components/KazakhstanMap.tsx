'use client';

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import type { PilotStation } from '@/lib/pilotStations';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Props {
  stations:  PilotStation[];
  active:    string | null;
  onSelect:  (id: string) => void;
}

export function KazakhstanMap({ stations, active, onSelect }: Props) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [67, 48], scale: 650 }}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const isKZ = geo.id === '398';
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default:  { fill: isKZ ? '#1a2d4a' : '#0c1424', stroke: '#1a2535', strokeWidth: 0.5, outline: 'none' },
                  hover:    { fill: isKZ ? '#1e3459' : '#0c1424', stroke: '#1a2535', strokeWidth: 0.5, outline: 'none' },
                  pressed:  { fill: isKZ ? '#162a46' : '#0c1424', stroke: '#1a2535', strokeWidth: 0.5, outline: 'none' },
                }}
              />
            );
          })
        }
      </Geographies>

      {stations.map(s => {
        const isActive = active === s.id;
        return (
          <Marker
            key={s.id}
            coordinates={s.coords}
            onClick={() => onSelect(s.id)}
          >
            {isActive && (
              <circle
                r={14}
                fill="#2563eb"
                opacity={0.2}
                style={{ animation: 'mapPulse 1.6s ease-out infinite' }}
              />
            )}
            <circle
              r={isActive ? 7 : 5}
              fill={isActive ? '#3b82f6' : '#2563eb'}
              stroke="#fff"
              strokeWidth={1.5}
              style={{ transition: 'r 0.2s', cursor: 'pointer' }}
            />
            <text
              textAnchor="middle"
              y={-14}
              style={{
                fontSize:       10,
                fontWeight:     isActive ? 700 : 500,
                fill:           isActive ? '#e2e8f0' : '#7a90a8',
                pointerEvents:  'none',
                userSelect:     'none',
                transition:     'fill 0.2s',
              }}
            >
              {s.name}
            </text>
          </Marker>
        );
      })}
    </ComposableMap>
  );
}
