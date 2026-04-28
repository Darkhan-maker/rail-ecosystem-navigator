'use client';

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import type { PilotStation } from '@/lib/pilotStations';

// Local copy of world-atlas — avoids CDN availability issues
const GEO_URL = '/countries-110m.json';

// Kazakhstan ISO 3166-1 numeric code (stored as number in world-atlas TopoJSON)
const KZ_ID = 398;

interface Props {
  stations:  PilotStation[];
  active:    string | null;
  onSelect:  (id: string) => void;
}

export function KazakhstanMap({ stations, active, onSelect }: Props) {
  return (
    // Wrapper div gives the map an explicit height so the SVG doesn't collapse
    <div style={{ width: '100%', minHeight: 280, background: '#080d1a', position: 'relative' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [67, 48], scale: 650 }}
        width={800}
        height={400}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              // world-atlas stores numeric IDs — use Number() to compare correctly
              const isKZ = Number(geo.id) === KZ_ID;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill:        isKZ ? '#1a3a6e' : '#0e1929',
                      stroke:      isKZ ? '#2563eb40' : '#1a253580',
                      strokeWidth: isKZ ? 0.8 : 0.4,
                      outline:     'none',
                    },
                    hover: {
                      fill:        isKZ ? '#1e4482' : '#0e1929',
                      stroke:      isKZ ? '#2563eb60' : '#1a253580',
                      strokeWidth: isKZ ? 0.8 : 0.4,
                      outline:     'none',
                    },
                    pressed: {
                      fill:    isKZ ? '#162e5e' : '#0e1929',
                      outline: 'none',
                    },
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
              {/* Pulse ring — uses CSS scale transform (works in SVG) */}
              {isActive && (
                <circle
                  r={10}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth={2}
                  style={{ animation: 'mapPulse 1.6s ease-out infinite', transformOrigin: 'center' }}
                />
              )}

              {/* Main dot */}
              <circle
                r={isActive ? 7 : 5}
                fill={isActive ? '#3b82f6' : '#2563eb'}
                stroke="#fff"
                strokeWidth={1.5}
                style={{ cursor: 'pointer' }}
              />

              {/* Label */}
              <text
                textAnchor="middle"
                y={-14}
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
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
