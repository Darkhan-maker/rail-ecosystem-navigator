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
    coordinates: [48.26319976046474, 72.85596715373623],
    region:      'Шетский район, Карагандинская область',
    description: 'Станция базирования бригады ШЧ',
    type:        'base',
  },
  {
    id:          'aysa',
    name:        'Айса',
    coordinates: [48.52548335967602, 72.624889635163],
    region:      'Шетский район, Карагандинская область',
    description: 'Контур НЖС · Магистральная сеть',
    type:        'pilot',
  },
  {
    id:          'dongal',
    name:        'Донгал',
    coordinates: [48.058187748755984, 72.91803492515005],
    region:      'Шетский район, Карагандинская область',
    description: 'Контур НЖС · Магистральная сеть',
    type:        'pilot',
  },
  {
    id:          'bosaga',
    name:        'Босага',
    coordinates: [47.881081742075274, 72.95516589392355],
    region:      'Шетский район, Карагандинская область',
    description: 'Контур НЖС · Магистральная сеть',
    type:        'pilot',
  },
];
