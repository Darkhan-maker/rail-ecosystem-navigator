export interface PilotStation {
  id:     string;
  name:   string;
  coords: [number, number]; // [longitude, latitude] — approximate, TODO: replace with survey data
  region: string;
}

export const PILOT_STATIONS: PilotStation[] = [
  {
    id:     'aisa',
    name:   'Айса',
    coords: [73.17, 49.82],
    region: 'Карагандинская обл.',
  },
  {
    id:     'dongal',
    name:   'Донгал',
    coords: [72.43, 49.35],
    region: 'Карагандинская обл.',
  },
  {
    id:     'bosaga',
    name:   'Босага',
    coords: [71.06, 48.67],
    region: 'Карагандинская обл.',
  },
];
