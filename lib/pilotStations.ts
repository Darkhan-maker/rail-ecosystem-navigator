export interface PilotStation {
  id:          string;
  name:        string;
  coordinates: [number, number]; // [latitude, longitude] — Leaflet convention
  region:      string;
  description: string;
  type:        'base' | 'pilot'; // base = база выезда, pilot = пилотная станция
}

export const pilotStations: PilotStation[] = [
  {
    id:          'akadyr',
    name:        'Акадыр',
    coordinates: [48.864, 72.870], // точные координаты
    region:      'Шетский район, Карагандинская область',
    description: 'Станция базирования бригады ШЧ',
    type:        'base',
  },
  {
    id:          'aysa',
    name:        'Айса',
    coordinates: [48.95, 72.45], // TODO: заменить на точные координаты после уточнения
    region:      'Шетский район, Карагандинская область',
    description: 'Контур НЖС · Магистральная сеть',
    type:        'pilot',
  },
  {
    id:          'dongal',
    name:        'Донгал',
    coordinates: [48.78, 73.20], // TODO: заменить на точные координаты после уточнения
    region:      'Шетский район, Карагандинская область',
    description: 'Контур НЖС · Магистральная сеть',
    type:        'pilot',
  },
  {
    id:          'bosaga',
    name:        'Босага',
    coordinates: [48.66, 73.55], // TODO: заменить на точные координаты после уточнения
    region:      'Шетский район, Карагандинская область',
    description: 'Контур НЖС · Магистральная сеть',
    type:        'pilot',
  },
];
