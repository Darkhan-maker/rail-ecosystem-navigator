'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { pilotStations } from '@/lib/pilotStations';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)['_getIconUrl'];

const baseIcon = L.divIcon({
  className:   'station-marker base',
  html: `<div class="station-marker-inner sm">
    <div class="station-marker-dot base"></div>
  </div>`,
  iconSize:    [24, 24],
  iconAnchor:  [12, 12],
  popupAnchor: [0, -14],
});

const pilotIcon = L.divIcon({
  className:   'station-marker pilot',
  html: `<div class="station-marker-inner">
    <div class="station-marker-pulse"></div>
    <div class="station-marker-dot pilot"></div>
  </div>`,
  iconSize:    [30, 30],
  iconAnchor:  [15, 15],
  popupAnchor: [0, -18],
});

function FlyToStations() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.flyTo([48.82, 73.00], 9, { duration: 2.5, easeLinearity: 0.1 });
    }, 1500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const base = pilotStations.find(s => s.type === 'base')!;
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

      {/* Dashed lines from base to each pilot station */}
      {pilots.map(s => (
        <Polyline
          key={`line-${s.id}`}
          positions={[base.coordinates, s.coordinates]}
          pathOptions={{ color: '#2563eb', weight: 1.5, opacity: 0.45, dashArray: '4 6' }}
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
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#f1f5f9">
                    ${s.name}
                    ${s.type === 'base'
                      ? '<span style="color:#d97706;font-size:11px;margin-left:6px;font-weight:600">База</span>'
                      : ''}
                  </div>
                  <div style="font-size:11px;color:#94a3b8;margin-bottom:4px">${s.region}</div>
                  <div style="font-size:12px;color:#cbd5e1">${s.description}</div>
                `,
              }}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
