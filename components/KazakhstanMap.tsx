'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { PILOT_STATIONS } from '@/lib/pilotStations';

// Prevent Leaflet from trying to resolve default marker images (we use divIcon)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)['_getIconUrl'];

const stationIcon = L.divIcon({
  className:   'station-marker',
  html: `
    <div class="station-marker-inner">
      <div class="station-marker-pulse"></div>
      <div class="station-marker-dot"></div>
    </div>
  `,
  iconSize:    [30, 30],
  iconAnchor:  [15, 15],
  popupAnchor: [0, -18],
});

function FlyToStations() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.flyTo([49.3, 75.7], 8, { duration: 2.5, easeLinearity: 0.1 });
    }, 1500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

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
      {PILOT_STATIONS.map(s => (
        <Marker key={s.id} position={s.coordinates} icon={stationIcon}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: '#666', fontSize: 12 }}>{s.region}</div>
              <div style={{ color: '#666', fontSize: 12, marginTop: 2 }}>
                Контур НЖС · Магистральная сеть
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
