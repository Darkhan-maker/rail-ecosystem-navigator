'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { pilotStations } from '@/lib/pilotStations';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)['_getIconUrl'];

const baseIcon = L.divIcon({
  className:   'station-marker',
  html: `
    <div class="station-marker-inner">
      <div class="station-marker-dot base"></div>
    </div>
  `,
  iconSize:    [28, 28],
  iconAnchor:  [14, 14],
  popupAnchor: [0, -16],
});

const pilotIcon = L.divIcon({
  className:   'station-marker',
  html: `
    <div class="station-marker-inner">
      <div class="station-marker-pulse"></div>
      <div class="station-marker-dot pilot"></div>
    </div>
  `,
  iconSize:    [30, 30],
  iconAnchor:  [15, 15],
  popupAnchor: [0, -18],
});

const ALL_BOUNDS: [number, number][] = pilotStations.map(s => s.coordinates);

function FlyToStations() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.flyToBounds(ALL_BOUNDS, {
        duration:      2.5,
        padding:       [50, 50],
        easeLinearity: 0.1,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const akadyr = pilotStations.find(s => s.type === 'base')!;
const pilots = pilotStations.filter(s => s.type === 'pilot');

export default function KazakhstanMap() {
  return (
    <MapContainer
      center={[48.0, 68.0]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />
      <FlyToStations />

      {/* Dashed routes from base to each pilot station */}
      {pilots.map(s => (
        <Polyline
          key={`line-${s.id}`}
          positions={[akadyr.coordinates, s.coordinates]}
          pathOptions={{ color: '#2563eb', weight: 1.5, opacity: 0.6, dashArray: '4 6' }}
        />
      ))}

      {/* Markers */}
      {pilotStations.map(s => (
        <Marker
          key={s.id}
          position={s.coordinates}
          icon={s.type === 'base' ? baseIcon : pilotIcon}
        >
          <Popup>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                {s.name}
                {s.type === 'base' && (
                  <span style={{ color: '#d97706', fontSize: 9, background: '#d9770622', border: '1px solid #d9770644', padding: '2px 6px', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
                    База
                  </span>
                )}
                {s.type === 'pilot' && (
                  <span style={{ color: '#2563eb', fontSize: 9, background: '#2563eb22', border: '1px solid #2563eb44', padding: '2px 6px', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
                    Пилот
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{s.region}</div>
              <div style={{ fontSize: 12, color: '#cbd5e1' }}>{s.description}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
