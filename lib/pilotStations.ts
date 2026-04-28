export interface PilotStation {
  id:        string;
  name:      string;
  coords:    [number, number]; // geographic [longitude, latitude] — approximate
  svgCoords: [number, number]; // position in KazakhstanMap viewBox "0 0 700 400"
  region:    string;
}

// SVG mapping: x = 50 + (lon - 51) / 36 * 610,  y = 125 + (55 - lat) / 14 * 170
export const PILOT_STATIONS: PilotStation[] = [
  {
    id:        'aisa',
    name:      'Айса',
    coords:    [73.17, 49.82],
    svgCoords: [426, 188],
    region:    'Карагандинская обл.',
  },
  {
    id:        'dongal',
    name:      'Донгал',
    coords:    [72.43, 49.35],
    svgCoords: [413, 194],
    region:    'Карагандинская обл.',
  },
  {
    id:        'bosaga',
    name:      'Босага',
    coords:    [71.06, 48.67],
    svgCoords: [390, 202],
    region:    'Карагандинская обл.',
  },
];
