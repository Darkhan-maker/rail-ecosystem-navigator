export interface PilotStation {
  id:          string;
  name:        string;
  coordinates: [number, number]; // [latitude, longitude] — Leaflet convention
  region:      string;
}

export const PILOT_STATIONS: PilotStation[] = [
  {
    id:          'aisa',
    name:        'Айса',
    coordinates: [49.5, 75.5],
    region:      'Карагандинская обл.',
  },
  {
    id:          'dongal',
    name:        'Донгал',
    coordinates: [49.3, 76.0],
    region:      'Карагандинская обл.',
  },
  {
    id:          'bosaga',
    name:        'Босага',
    coordinates: [49.0, 75.8],
    region:      'Карагандинская обл.',
  },
];
