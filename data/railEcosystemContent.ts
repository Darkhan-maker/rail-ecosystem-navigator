import type {
  Contour,
  Module,
  Scenario,
  RoadmapStage,
  GlossaryItem,
  PilotInfo,
  OpenQuestion,
  MapNodeData,
  MapNodeType,
} from '@/types/railEcosystem';
import type { Node, Edge } from '@xyflow/react';

// ─── Contours ─────────────────────────────────────────────────────────────────

export const contours: Contour[] = [
  {
    id: 'magistral',
    name: 'Контур магистральной сети',
    description:
      'Управление служебными поездками, работами, ГТП, журналами и отчётностью по дистанциям путевого хозяйства, сигнализации/связи и электроснабжения.',
    chain: [
      { label: 'КТЖ' },
      { label: 'Дирекция магистральной сети' },
      { label: 'ЦЖС', sublabel: 'центральный уровень' },
      { label: 'НЖС', sublabel: 'региональный уровень' },
      { label: 'ПЧ', sublabel: 'путевая дистанция' },
      { label: 'ШЧ', sublabel: 'дистанция сигнализации и связи' },
      { label: 'ЭЧ', sublabel: 'дистанция электроснабжения' },
      { label: 'Участки / станции / объекты / бригады' },
    ],
    color: '#2563eb',
    modules: ['railroutes', 'railwork', 'raildocs', 'railsafety', 'railanalytics'],
  },
  {
    id: 'cargo',
    name: 'Контур грузовых перевозок и локомотивных бригад',
    description:
      'Управление локомотивными бригадами: вызов, явка, меддопуск, рейс, учёт рабочего времени, сдача и аналитика по бригадам.',
    chain: [
      { label: 'КТЖ' },
      { label: 'ТОО «КТЖ – Грузовые перевозки»' },
      { label: 'Отделения / депо' },
      { label: 'Локомотивные бригады' },
      { label: 'Рейсы / рабочие циклы' },
    ],
    color: '#16a34a',
    modules: ['railcrew', 'railtime', 'railcargo', 'railanalytics'],
  },
  {
    id: 'digital-core',
    name: 'Цифровое ядро Rail Ecosystem',
    description:
      'Горизонтальная платформа, обслуживающая оба контура: данные, аналитика, ИИ, интеграции, уведомления, отчёты и управление ролями.',
    chain: [
      { label: 'RailData Hub', sublabel: 'центр данных и событий' },
      { label: 'RailAI Core', sublabel: 'ИИ-ядро и нормативная база' },
      { label: 'RailAnalytics', sublabel: 'аналитика и отчётность' },
      { label: 'Reporting Layer', sublabel: 'отчёты и выгрузки' },
      { label: 'Notification Engine', sublabel: 'уведомления' },
      { label: 'User & Role Management', sublabel: 'пользователи и доступы' },
    ],
    color: '#7c3aed',
    modules: ['railanalytics', 'railai', 'raildatahub', 'reporting', 'notifications', 'usermgmt', 'integration'],
  },
];

// ─── Modules ───────────────────────────────────────────────────────────────────

export const modules: Module[] = [
  {
    id: 'railroutes',
    name: 'RailRoutes',
    russianName: 'Цифровые маршрутные листы',
    description:
      'Цифровой маршрутный лист для служебных поездок работников дистанций на малые станции. QR-отметки прибытия/убытия, офлайн-режим, согласование, Excel-реестр для оплаты.',
    status: 'mvp-priority',
    relatedModules: ['railwork', 'raildocs', 'railanalytics'],
    inputData: ['Данные работника', 'Маршрут', 'Цель поездки', 'Номер поезда'],
    outputData: ['Подписанный маршрутный лист', 'Excel-реестр', 'Аналитические данные'],
    details:
      'Первый модуль для пилота в контуре НЖС/ШЧ. Покрывает полный цикл: создание → согласование → инструктаж → выезд → QR-прибытие → работа → QR-убытие → утверждение → Excel.',
  },
  {
    id: 'railwork',
    name: 'RailWork',
    russianName: 'Работы и ГТП',
    description:
      'Цифровое управление работами на объектах инфраструктуры. Связь с графиком технологического процесса (ГТП), фиксация выполненных работ, нарядная система.',
    status: 'next-stage',
    relatedModules: ['railroutes', 'raildocs', 'railanalytics'],
    inputData: ['ГТП', 'Задания на работу', 'Объект инфраструктуры'],
    outputData: ['Акты выполненных работ', 'Обновлённый ГТП', 'Статусы объектов'],
  },
  {
    id: 'raildocs',
    name: 'RailDocs',
    russianName: 'Цифровые документы и журналы',
    description:
      'Электронные журналы, акты, приказы, инструктажи. Замена бумажных документов с электронной подписью и хранением.',
    status: 'next-stage',
    relatedModules: ['railroutes', 'railwork', 'railsafety'],
    inputData: ['Бумажные формы', 'Данные из других модулей'],
    outputData: ['Цифровые документы', 'Электронные подписи', 'Архив'],
  },
  {
    id: 'railsafety',
    name: 'RailSafety & Learning',
    russianName: 'Безопасность и обучение',
    description:
      'Управление инструктажами, обучением, проверкой знаний и журналами безопасности. Нормативная база по охране труда.',
    status: 'future-stage',
    relatedModules: ['raildocs', 'railai', 'railroutes'],
    inputData: ['Программы обучения', 'Нормативные документы'],
    outputData: ['Сертификаты', 'Журналы инструктажей', 'Статистика безопасности'],
  },
  {
    id: 'railcrew',
    name: 'RailCrew',
    russianName: 'Локомотивные бригады',
    description:
      'Цифровое управление локомотивными бригадами: вызов, явка, меддопуск, рейс, сдача, завершение рабочего цикла.',
    status: 'next-stage',
    relatedModules: ['railtime', 'railcargo', 'railanalytics'],
    inputData: ['Расписание рейсов', 'Данные бригад', 'Результаты меддопуска'],
    outputData: ['Статусы бригад', 'Журналы явки', 'Данные для табельного учёта'],
  },
  {
    id: 'railtime',
    name: 'RailTime',
    russianName: 'Учёт времени',
    description:
      'Автоматический учёт рабочего времени на основе данных маршрутных листов, журналов явки и рейсовых данных. Интеграция с расчётом зарплаты.',
    status: 'future-stage',
    relatedModules: ['railroutes', 'railcrew', 'railanalytics'],
    inputData: ['QR-отметки', 'Данные рейсов', 'Явочные данные'],
    outputData: ['Табели рабочего времени', 'Данные для расчёта оплаты'],
  },
  {
    id: 'railcargo',
    name: 'RailCargo',
    russianName: 'Грузовые процессы',
    description:
      'Управление грузовыми операциями, планированием рейсов и учётом грузовых потоков в контуре ТОО «КТЖ – Грузовые перевозки».',
    status: 'planned-stage',
    relatedModules: ['railcrew', 'railtime', 'railanalytics'],
    inputData: ['Планы перевозок', 'Грузовые накладные'],
    outputData: ['Статусы рейсов', 'Грузовая аналитика'],
  },
  {
    id: 'railanalytics',
    name: 'RailAnalytics',
    russianName: 'Аналитика и отчётность',
    description:
      'Агрегация данных из всех модулей. Дашборды по служебным поездкам, работам, бригадам, времени. Управленческая отчётность.',
    status: 'next-stage',
    relatedModules: ['raildatahub', 'reporting', 'railai'],
    inputData: ['Данные из всех модулей'],
    outputData: ['Дашборды', 'KPI-отчёты', 'Сводные аналитики'],
  },
  {
    id: 'railai',
    name: 'RailAI Core',
    russianName: 'ИИ-ядро и нормативная база',
    description:
      'Интеллектуальная система для обработки нормативных документов КТЖ, автоматизации проверок, аномалий и рекомендаций по эксплуатации.',
    status: 'strategic-stage',
    relatedModules: ['raildatahub', 'railsafety', 'railanalytics'],
    inputData: ['Нормативная база', 'Данные из всех модулей'],
    outputData: ['Аномалии', 'Рекомендации', 'Автоматические проверки'],
  },
  {
    id: 'raildatahub',
    name: 'RailData Hub',
    russianName: 'Центр данных и событий',
    description:
      'Единый сервис хранения и маршрутизации событий экосистемы. Обеспечивает согласованность данных между модулями.',
    status: 'core-stage',
    relatedModules: ['railanalytics', 'railai', 'notifications'],
    inputData: ['События из всех модулей'],
    outputData: ['Единый поток данных', 'Хранилище событий'],
  },
  {
    id: 'integration',
    name: 'Integration Layer',
    russianName: 'Интеграционный слой',
    description:
      'API-шлюз для интеграции с корпоративными системами КТЖ. Адаптеры для ERP, HR, бухгалтерских систем.',
    status: 'strategic-stage',
    relatedModules: ['raildatahub', 'reporting', 'railanalytics'],
    inputData: ['Внешние системы КТЖ'],
    outputData: ['Синхронизированные данные'],
  },
  {
    id: 'notifications',
    name: 'Notification Engine',
    russianName: 'Уведомления и подтверждения',
    description:
      'Push-уведомления, SMS, in-app оповещения. Управление рабочими процессами согласования и подтверждений.',
    status: 'core-stage',
    relatedModules: ['railroutes', 'railcrew', 'raildatahub'],
    inputData: ['События из модулей'],
    outputData: ['Уведомления пользователям'],
  },
  {
    id: 'reporting',
    name: 'Reporting Layer',
    russianName: 'Отчёты и выгрузки',
    description:
      'Генерация Excel, PDF и других форматов отчётности. Реестры для бухгалтерии, акты для руководства.',
    status: 'core-stage',
    relatedModules: ['railanalytics', 'raildatahub'],
    inputData: ['Данные из аналитики и модулей'],
    outputData: ['Excel-реестры', 'PDF-отчёты', 'Сводные таблицы'],
  },
  {
    id: 'usermgmt',
    name: 'User & Role Management',
    russianName: 'Пользователи, роли и доступы',
    description:
      'Управление учётными записями, ролями, разрешениями и организационной структурой. Интеграция с корпоративным каталогом.',
    status: 'core-stage',
    relatedModules: ['raildatahub', 'notifications'],
    inputData: ['Корпоративный каталог', 'Ручное управление'],
    outputData: ['Токены доступа', 'Настройки ролей'],
  },
];

// ─── Flow Map Nodes ────────────────────────────────────────────────────────────

export const mapNodes: Node<MapNodeData>[] = [
  {
    id: 'root',
    type: 'railNode',
    position: { x: 650, y: 0 },
    data: {
      label: 'Rail Ecosystem',
      nodeType: 'root' as MapNodeType,
      description: 'Единая цифровая экосистема управления железнодорожной эксплуатацией.',
      details:
        'Rail Ecosystem объединяет два операционных контура (магистральная сеть и грузовые перевозки) и цифровое ядро в единую платформу.',
      effect: 'Прозрачность, управляемость, цифровизация производственных процессов КТЖ.',
    },
  },
  // Contours
  {
    id: 'contour-magistral',
    type: 'railNode',
    position: { x: 50, y: 160 },
    data: {
      label: 'Контур магистральной сети',
      nodeType: 'contour' as MapNodeType,
      description: 'Управление служебными поездками, работами, ГТП, журналами по дистанциям.',
      relatedModules: ['railroutes', 'railwork', 'raildocs', 'railsafety'],
    },
  },
  {
    id: 'contour-cargo',
    type: 'railNode',
    position: { x: 1200, y: 160 },
    data: {
      label: 'Контур грузовых перевозок',
      nodeType: 'contour' as MapNodeType,
      description: 'Управление локомотивными бригадами и грузовыми операциями.',
      relatedModules: ['railcrew', 'railtime', 'railcargo'],
    },
  },
  {
    id: 'digital-core',
    type: 'railNode',
    position: { x: 650, y: 160 },
    data: {
      label: 'Цифровое ядро',
      nodeType: 'core' as MapNodeType,
      description: 'Горизонтальная платформа: данные, ИИ, аналитика, уведомления, отчёты.',
      relatedModules: ['railanalytics', 'railai', 'raildatahub', 'reporting', 'notifications', 'usermgmt'],
    },
  },
  // Magistral org hierarchy
  {
    id: 'ktj',
    type: 'railNode',
    position: { x: 50, y: 320 },
    data: {
      label: 'КТЖ',
      nodeType: 'org' as MapNodeType,
      description: 'АО «Казахстан Темір Жолы» — национальный железнодорожный оператор Казахстана.',
    },
  },
  {
    id: 'dir-magistral',
    type: 'railNode',
    position: { x: 50, y: 460 },
    data: {
      label: 'Дирекция магистральной сети',
      nodeType: 'org' as MapNodeType,
      description: 'Управляет эксплуатацией магистральной инфраструктуры.',
    },
  },
  {
    id: 'czjs',
    type: 'railNode',
    position: { x: 50, y: 600 },
    data: {
      label: 'ЦЖС',
      nodeType: 'org' as MapNodeType,
      description: 'Центральный уровень управления магистральной сетью (аббревиатура уточняется).',
    },
  },
  {
    id: 'nzjs',
    type: 'railNode',
    position: { x: 50, y: 740 },
    data: {
      label: 'НЖС',
      nodeType: 'org' as MapNodeType,
      description: 'Региональный уровень управления магистральной сетью (аббревиатура уточняется).',
    },
  },
  {
    id: 'pch',
    type: 'railNode',
    position: { x: -130, y: 900 },
    data: {
      label: 'ПЧ',
      nodeType: 'org' as MapNodeType,
      description: 'Путевая дистанция — отвечает за содержание пути.',
    },
  },
  {
    id: 'shch',
    type: 'railNode',
    position: { x: 50, y: 900 },
    data: {
      label: 'ШЧ',
      nodeType: 'org' as MapNodeType,
      description: 'Дистанция сигнализации и связи — эксплуатация устройств СЦБ и телекоммуникаций.',
    },
  },
  {
    id: 'ech',
    type: 'railNode',
    position: { x: 230, y: 900 },
    data: {
      label: 'ЭЧ',
      nodeType: 'org' as MapNodeType,
      description: 'Дистанция электроснабжения — электрические устройства инфраструктуры.',
    },
  },
  // Cargo org hierarchy
  {
    id: 'ktj-cargo',
    type: 'railNode',
    position: { x: 1200, y: 320 },
    data: {
      label: 'КТЖ',
      nodeType: 'org' as MapNodeType,
      description: 'АО «Казахстан Темір Жолы».',
    },
  },
  {
    id: 'too-gp',
    type: 'railNode',
    position: { x: 1200, y: 460 },
    data: {
      label: 'ТОО «КТЖ – Грузовые перевозки»',
      nodeType: 'org' as MapNodeType,
      description: 'Дочернее предприятие КТЖ, осуществляющее грузовые перевозки.',
    },
  },
  {
    id: 'depo',
    type: 'railNode',
    position: { x: 1200, y: 600 },
    data: {
      label: 'Депо / отделения',
      nodeType: 'org' as MapNodeType,
      description: 'Производственные единицы для обслуживания локомотивов и бригад.',
    },
  },
  {
    id: 'brigady',
    type: 'railNode',
    position: { x: 1200, y: 740 },
    data: {
      label: 'Локомотивные бригады',
      nodeType: 'org' as MapNodeType,
      description: 'Машинисты и помощники машинистов, выполняющие рейсы.',
    },
  },
  // Modules
  {
    id: 'mod-railroutes',
    type: 'railNode',
    position: { x: 280, y: 1060 },
    data: {
      label: 'RailRoutes',
      nodeType: 'module' as MapNodeType,
      description: 'Цифровые маршрутные листы для служебных поездок.',
      relatedModules: ['railroutes'],
    },
  },
  {
    id: 'mod-railwork',
    type: 'railNode',
    position: { x: 460, y: 1060 },
    data: {
      label: 'RailWork',
      nodeType: 'module' as MapNodeType,
      description: 'Работы и ГТП.',
      relatedModules: ['railwork'],
    },
  },
  {
    id: 'mod-raildocs',
    type: 'railNode',
    position: { x: 640, y: 1060 },
    data: {
      label: 'RailDocs',
      nodeType: 'module' as MapNodeType,
      description: 'Цифровые документы и журналы.',
      relatedModules: ['raildocs'],
    },
  },
  {
    id: 'mod-railsafety',
    type: 'railNode',
    position: { x: 820, y: 1060 },
    data: {
      label: 'RailSafety',
      nodeType: 'module' as MapNodeType,
      description: 'Безопасность и обучение.',
      relatedModules: ['railsafety'],
    },
  },
  {
    id: 'mod-railcrew',
    type: 'railNode',
    position: { x: 1000, y: 1060 },
    data: {
      label: 'RailCrew',
      nodeType: 'module' as MapNodeType,
      description: 'Локомотивные бригады.',
      relatedModules: ['railcrew'],
    },
  },
  {
    id: 'mod-railtime',
    type: 'railNode',
    position: { x: 280, y: 1200 },
    data: {
      label: 'RailTime',
      nodeType: 'module' as MapNodeType,
      description: 'Учёт рабочего времени.',
      relatedModules: ['railtime'],
    },
  },
  {
    id: 'mod-railanalytics',
    type: 'railNode',
    position: { x: 460, y: 1200 },
    data: {
      label: 'RailAnalytics',
      nodeType: 'module' as MapNodeType,
      description: 'Аналитика и отчётность.',
      relatedModules: ['railanalytics'],
    },
  },
  {
    id: 'mod-railai',
    type: 'railNode',
    position: { x: 640, y: 1200 },
    data: {
      label: 'RailAI Core',
      nodeType: 'module' as MapNodeType,
      description: 'ИИ-ядро и нормативная база.',
      relatedModules: ['railai'],
    },
  },
  {
    id: 'mod-raildatahub',
    type: 'railNode',
    position: { x: 820, y: 1200 },
    data: {
      label: 'RailData Hub',
      nodeType: 'module' as MapNodeType,
      description: 'Центр данных и событий.',
      relatedModules: ['raildatahub'],
    },
  },
  {
    id: 'mod-reporting',
    type: 'railNode',
    position: { x: 1000, y: 1200 },
    data: {
      label: 'Reporting Layer',
      nodeType: 'module' as MapNodeType,
      description: 'Отчёты и выгрузки.',
      relatedModules: ['reporting'],
    },
  },
  {
    id: 'mod-notifications',
    type: 'railNode',
    position: { x: 280, y: 1340 },
    data: {
      label: 'Notification Engine',
      nodeType: 'module' as MapNodeType,
      description: 'Уведомления и подтверждения.',
      relatedModules: ['notifications'],
    },
  },
  {
    id: 'mod-usermgmt',
    type: 'railNode',
    position: { x: 460, y: 1340 },
    data: {
      label: 'User & Role Management',
      nodeType: 'module' as MapNodeType,
      description: 'Пользователи, роли и доступы.',
      relatedModules: ['usermgmt'],
    },
  },
  {
    id: 'mod-railcargo',
    type: 'railNode',
    position: { x: 1180, y: 1060 },
    data: {
      label: 'RailCargo',
      nodeType: 'module' as MapNodeType,
      description: 'Управление грузовыми операциями и учётом грузовых потоков.',
      relatedModules: ['railcargo'],
    },
  },
  {
    id: 'mod-integration',
    type: 'railNode',
    position: { x: 640, y: 1480 },
    data: {
      label: 'Integration Layer',
      nodeType: 'module' as MapNodeType,
      description: 'API-шлюз для интеграции с корпоративными системами КТЖ.',
      relatedModules: ['integration'],
    },
  },
  // ─── Process nodes (visible in «По процессам» mode) ───────────────────────
  {
    id: 'proc-trip',
    type: 'railNode',
    position: { x: 100, y: 1700 },
    data: {
      label: 'Служебная поездка',
      nodeType: 'process' as MapNodeType,
      description: 'Планирование и регистрация служебной поездки работника ШЧ на малую станцию.',
    },
  },
  {
    id: 'proc-route-sheet',
    type: 'railNode',
    position: { x: 350, y: 1700 },
    data: {
      label: 'Маршрутный лист',
      nodeType: 'process' as MapNodeType,
      description: 'Создание, заполнение и согласование цифрового маршрутного листа.',
    },
  },
  {
    id: 'proc-qr-arrive',
    type: 'railNode',
    position: { x: 600, y: 1700 },
    data: {
      label: 'QR-прибытие',
      nodeType: 'process' as MapNodeType,
      description: 'Сканирование QR-кода при прибытии на станцию — автоматическая фиксация времени.',
    },
  },
  {
    id: 'proc-work',
    type: 'railNode',
    position: { x: 100, y: 1870 },
    data: {
      label: 'Выполнение работы',
      nodeType: 'process' as MapNodeType,
      description: 'Выполнение плановых работ на объекте и фиксация результата.',
    },
  },
  {
    id: 'proc-qr-depart',
    type: 'railNode',
    position: { x: 350, y: 1870 },
    data: {
      label: 'QR-убытие',
      nodeType: 'process' as MapNodeType,
      description: 'Сканирование QR-кода при убытии — система рассчитывает время работы на объекте.',
    },
  },
  {
    id: 'proc-approve',
    type: 'railNode',
    position: { x: 600, y: 1870 },
    data: {
      label: 'Утверждение',
      nodeType: 'process' as MapNodeType,
      description: 'Утверждение маршрутного листа начальником дистанции.',
    },
  },
  {
    id: 'proc-excel',
    type: 'railNode',
    position: { x: 850, y: 1700 },
    data: {
      label: 'Excel-реестр',
      nodeType: 'process' as MapNodeType,
      description: 'Автоматическое формирование Excel-реестра поездок для бухгалтерии с суммой оплаты.',
    },
  },
  {
    id: 'proc-analytics',
    type: 'railNode',
    position: { x: 850, y: 1870 },
    data: {
      label: 'Аналитика',
      nodeType: 'process' as MapNodeType,
      description: 'Агрегация данных по поездкам и работам в управленческие дашборды.',
    },
  },
  {
    id: 'proc-crew-cycle',
    type: 'railNode',
    position: { x: 1100, y: 1780 },
    data: {
      label: 'Цикл бригады',
      nodeType: 'process' as MapNodeType,
      description: 'Полный рабочий цикл локомотивной бригады: вызов → явка → меддопуск → рейс → сдача → учёт времени.',
    },
  },
  // ─── Problem nodes (visible in «По проблемам» mode) ──────────────────────
  {
    id: 'prob-paper-routes',
    type: 'railNode',
    position: { x: 100, y: 2100 },
    data: {
      label: 'Бумажные маршрутные листы',
      nodeType: 'problem' as MapNodeType,
      description: 'Маршрутные листы ШЧ заполняются вручную — потери, ошибки, нет цифрового контроля.',
    },
  },
  {
    id: 'prob-manual-journals',
    type: 'railNode',
    position: { x: 400, y: 2100 },
    data: {
      label: 'Ручные журналы',
      nodeType: 'problem' as MapNodeType,
      description: 'Журналы явки и инструктажей ведутся на бумаге — нет системы хранения и поиска.',
    },
  },
  {
    id: 'prob-fake-trips',
    type: 'railNode',
    position: { x: 100, y: 2270 },
    data: {
      label: 'Фиктивные поездки',
      nodeType: 'problem' as MapNodeType,
      description: 'Без QR-контроля невозможно подтвердить реальный факт выезда на станцию.',
    },
  },
  {
    id: 'prob-no-digital-trail',
    type: 'railNode',
    position: { x: 400, y: 2270 },
    data: {
      label: 'Нет цифрового следа',
      nodeType: 'problem' as MapNodeType,
      description: 'Данные о поездках и работах не сохраняются системно — невозможен аудит.',
    },
  },
  {
    id: 'prob-scattered-excel',
    type: 'railNode',
    position: { x: 700, y: 2100 },
    data: {
      label: 'Разрозненные Excel-файлы',
      nodeType: 'problem' as MapNodeType,
      description: 'Данные в разных файлах без единой системы — ручная сводка, задержки, ошибки.',
    },
  },
  {
    id: 'prob-weak-analytics',
    type: 'railNode',
    position: { x: 700, y: 2270 },
    data: {
      label: 'Слабая аналитика',
      nodeType: 'problem' as MapNodeType,
      description: 'Нет оперативной аналитики по дистанциям — отчёты формируются с задержкой и ошибками.',
    },
  },
  {
    id: 'prob-gtp-disconnect',
    type: 'railNode',
    position: { x: 1000, y: 2100 },
    data: {
      label: 'Разрыв ГТП и выезда',
      nodeType: 'problem' as MapNodeType,
      description: 'ГТП и фактические выезды не связаны — нельзя сопоставить план с реальным выполнением.',
    },
  },
];

// ─── Flow Map Edges ────────────────────────────────────────────────────────────

export const mapEdges: Edge[] = [
  // Root to contours and core
  { id: 'e-root-magistral', source: 'root', target: 'contour-magistral', type: 'smoothstep' },
  { id: 'e-root-core', source: 'root', target: 'digital-core', type: 'smoothstep' },
  { id: 'e-root-cargo', source: 'root', target: 'contour-cargo', type: 'smoothstep' },
  // Magistral hierarchy
  { id: 'e-mag-ktj', source: 'contour-magistral', target: 'ktj', type: 'smoothstep' },
  { id: 'e-ktj-dir', source: 'ktj', target: 'dir-magistral', type: 'smoothstep' },
  { id: 'e-dir-czjs', source: 'dir-magistral', target: 'czjs', type: 'smoothstep' },
  { id: 'e-czjs-nzjs', source: 'czjs', target: 'nzjs', type: 'smoothstep' },
  { id: 'e-nzjs-pch', source: 'nzjs', target: 'pch', type: 'smoothstep' },
  { id: 'e-nzjs-shch', source: 'nzjs', target: 'shch', type: 'smoothstep' },
  { id: 'e-nzjs-ech', source: 'nzjs', target: 'ech', type: 'smoothstep' },
  // Cargo hierarchy
  { id: 'e-cargo-ktj', source: 'contour-cargo', target: 'ktj-cargo', type: 'smoothstep' },
  { id: 'e-ktj2-too', source: 'ktj-cargo', target: 'too-gp', type: 'smoothstep' },
  { id: 'e-too-depo', source: 'too-gp', target: 'depo', type: 'smoothstep' },
  { id: 'e-depo-brigady', source: 'depo', target: 'brigady', type: 'smoothstep' },
  // Digital core to modules
  { id: 'e-core-railanalytics', source: 'digital-core', target: 'mod-railanalytics', type: 'smoothstep' },
  { id: 'e-core-railai', source: 'digital-core', target: 'mod-railai', type: 'smoothstep' },
  { id: 'e-core-raildatahub', source: 'digital-core', target: 'mod-raildatahub', type: 'smoothstep' },
  { id: 'e-core-reporting', source: 'digital-core', target: 'mod-reporting', type: 'smoothstep' },
  { id: 'e-core-notifications', source: 'digital-core', target: 'mod-notifications', type: 'smoothstep' },
  { id: 'e-core-usermgmt', source: 'digital-core', target: 'mod-usermgmt', type: 'smoothstep' },
  // Magistral to operational modules
  { id: 'e-shch-railroutes', source: 'shch', target: 'mod-railroutes', type: 'smoothstep' },
  { id: 'e-shch-railwork', source: 'shch', target: 'mod-railwork', type: 'smoothstep' },
  { id: 'e-nzjs-raildocs', source: 'nzjs', target: 'mod-raildocs', type: 'smoothstep' },
  { id: 'e-nzjs-railsafety', source: 'nzjs', target: 'mod-railsafety', type: 'smoothstep' },
  // Cargo to crew modules
  { id: 'e-brigady-railcrew', source: 'brigady', target: 'mod-railcrew', type: 'smoothstep' },
  { id: 'e-brigady-railtime', source: 'brigady', target: 'mod-railtime', type: 'smoothstep' },
  { id: 'e-brigady-railcargo', source: 'brigady', target: 'mod-railcargo', type: 'smoothstep' },
  // Integration
  { id: 'e-core-integration', source: 'digital-core', target: 'mod-integration', type: 'smoothstep' },
  // Integration cross-module connections
  { id: 'e-integration-raildatahub',   source: 'mod-integration', target: 'mod-raildatahub',   type: 'smoothstep' },
  { id: 'e-integration-reporting',     source: 'mod-integration', target: 'mod-reporting',     type: 'smoothstep' },
  { id: 'e-integration-railanalytics', source: 'mod-integration', target: 'mod-railanalytics', type: 'smoothstep' },
  // Process nodes → modules
  { id: 'e-proc-trip-railroutes',       source: 'proc-trip',        target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-sheet-railroutes',      source: 'proc-route-sheet', target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-qrarrive-railroutes',   source: 'proc-qr-arrive',   target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-work-railwork',         source: 'proc-work',        target: 'mod-railwork',       type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-work-railroutes',       source: 'proc-work',        target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-qrdepart-railroutes',   source: 'proc-qr-depart',   target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-approve-railroutes',    source: 'proc-approve',     target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-excel-reporting',       source: 'proc-excel',       target: 'mod-reporting',      type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-analytics-railanalytics', source: 'proc-analytics', target: 'mod-railanalytics',  type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-crew-railcrew',         source: 'proc-crew-cycle',  target: 'mod-railcrew',       type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  { id: 'e-proc-crew-railtime',         source: 'proc-crew-cycle',  target: 'mod-railtime',       type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5 } },
  // Problem nodes → modules
  { id: 'e-prob-paper-railroutes',        source: 'prob-paper-routes',     target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-journals-raildocs',       source: 'prob-manual-journals',  target: 'mod-raildocs',       type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-journals-railroutes',     source: 'prob-manual-journals',  target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-fake-railroutes',         source: 'prob-fake-trips',       target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-notrail-raildatahub',     source: 'prob-no-digital-trail', target: 'mod-raildatahub',    type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-notrail-railroutes',      source: 'prob-no-digital-trail', target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-excel-reporting',         source: 'prob-scattered-excel',  target: 'mod-reporting',      type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-excel-analytics',         source: 'prob-scattered-excel',  target: 'mod-railanalytics',  type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-analytics-railanalytics', source: 'prob-weak-analytics',   target: 'mod-railanalytics',  type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-analytics-raildatahub',   source: 'prob-weak-analytics',   target: 'mod-raildatahub',    type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-gtp-railwork',            source: 'prob-gtp-disconnect',   target: 'mod-railwork',       type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
  { id: 'e-prob-gtp-railroutes',          source: 'prob-gtp-disconnect',   target: 'mod-railroutes',     type: 'smoothstep', style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '5 3' } },
];

// ─── Scenarios ─────────────────────────────────────────────────────────────────

export const scenarios: Scenario[] = [
  {
    id: 'shch-trip',
    title: 'Служебная поездка работника ШЧ',
    subtitle: 'Полный цикл от создания маршрутного листа до аналитики',
    chain: ['Создание', 'Согласование', 'Инструктаж', 'Выезд', 'QR-прибытие', 'Работа', 'QR-убытие', 'Утверждение', 'Excel', 'Аналитика'],
    steps: [
      {
        number: 1,
        name: 'Создание',
        description: 'Работник или старший создаёт маршрутный лист: станция назначения, цель поездки, номер поезда туда и обратно.',
        dataPoints: ['Табельный номер', 'Станция прибытия', 'Цель поездки', 'Номер поезда'],
      },
      {
        number: 2,
        name: 'Согласование',
        description: 'Старший проверяет маршрут и согласует поездку. Уведомление поступает в приложение.',
        dataPoints: ['Статус согласования', 'ФИО согласующего', 'Дата/время'],
      },
      {
        number: 3,
        name: 'Инструктаж',
        description: 'Работник проходит предвыездной инструктаж по безопасности. Фиксируется в журнале.',
        dataPoints: ['Тип инструктажа', 'Результат проверки знаний', 'Подпись'],
      },
      {
        number: 4,
        name: 'Выезд',
        description: 'Работник отправляется к месту назначения. Маршрутный лист активирован.',
        dataPoints: ['Время выезда', 'Вид транспорта', 'Маршрут'],
      },
      {
        number: 5,
        name: 'QR-прибытие',
        description: 'По прибытии на станцию работник сканирует QR-код. Время прибытия фиксируется автоматически.',
        dataPoints: ['GPS/QR', 'Время прибытия', 'Идентификатор станции'],
      },
      {
        number: 6,
        name: 'Работа',
        description: 'Выполнение плановых работ на объекте. Фиксация результата: выполнено / не выполнено / замечания.',
        dataPoints: ['Тип работы', 'Статус выполнения', 'Комментарий', 'Фото'],
      },
      {
        number: 7,
        name: 'QR-убытие',
        description: 'По завершении работ — скан QR убытия. Система рассчитывает фактическое время работы.',
        dataPoints: ['Время убытия', 'Длительность работы'],
      },
      {
        number: 8,
        name: 'Утверждение',
        description: 'Начальник дистанции утверждает маршрутный лист. Данные готовы для расчёта оплаты.',
        dataPoints: ['Подпись начальника', 'Статус утверждения', 'Дата'],
      },
      {
        number: 9,
        name: 'Excel-реестр',
        description: 'Система формирует Excel-реестр поездок для бухгалтерии с суммой оплаты по каждому работнику.',
        dataPoints: ['Реестр поездок', 'Суммы оплаты', 'Табельные номера'],
      },
      {
        number: 10,
        name: 'Аналитика',
        description: 'Данные поступают в RailAnalytics. Дашборды по дистанции, частоте поездок, выполнению работ.',
        dataPoints: ['KPI дистанции', 'Статистика поездок', 'Выполнение работ'],
      },
    ],
  },
  {
    id: 'crew-cycle',
    title: 'Рабочий цикл локомотивной бригады',
    subtitle: 'От вызова до завершения рейса и учёта времени',
    chain: ['Вызов', 'Подтверждение', 'Явка', 'Меддопуск', 'Рейс', 'Сдача', 'Завершение', 'Учёт времени'],
    steps: [
      {
        number: 1,
        name: 'Вызов',
        description: 'Диспетчер формирует вызов бригады на рейс. Push-уведомление поступает машинисту.',
        dataPoints: ['ID рейса', 'Время явки', 'Маршрут'],
      },
      {
        number: 2,
        name: 'Подтверждение',
        description: 'Машинист подтверждает явку через приложение.',
        dataPoints: ['Статус подтверждения', 'Время'],
      },
      {
        number: 3,
        name: 'Явка',
        description: 'Машинист прибывает в депо. Фиксируется время явки.',
        dataPoints: ['Время явки', 'Табельный номер', 'Депо'],
      },
      {
        number: 4,
        name: 'Меддопуск',
        description: 'Медицинский осмотр перед рейсом. Результат фиксируется и подписывается медработником.',
        dataPoints: ['Результат осмотра', 'ФИО медработника', 'Давление', 'Алкотест'],
      },
      {
        number: 5,
        name: 'Рейс',
        description: 'Выполнение рейса. Регистрация ключевых событий в пути.',
        dataPoints: ['Время отправления', 'Маршрут', 'Локомотив', 'События'],
      },
      {
        number: 6,
        name: 'Сдача',
        description: 'Сдача локомотива принимающей бригаде или в депо.',
        dataPoints: ['Время сдачи', 'Принимающий', 'Состояние локомотива'],
      },
      {
        number: 7,
        name: 'Завершение',
        description: 'Закрытие рабочего цикла. Фиксация итогового времени работы.',
        dataPoints: ['Общее время', 'Пробег', 'Статус рейса'],
      },
      {
        number: 8,
        name: 'Учёт времени',
        description: 'Данные передаются в RailTime. Формируется табель рабочего времени бригады.',
        dataPoints: ['Часы работы', 'Переработки', 'Данные для расчёта оплаты'],
      },
    ],
  },
];

// ─── Roadmap ───────────────────────────────────────────────────────────────────

export const roadmapStages: RoadmapStage[] = [
  {
    number: 1,
    name: 'RailRoutes MVP',
    subtitle: 'Пилот ШЧ в контуре НЖС',
    modules: ['railroutes', 'notifications', 'reporting', 'usermgmt'],
    description:
      'Запуск цифрового маршрутного листа для служебных поездок на пилотных станциях Айса, Донгал, Босага. QR-отметки, офлайн-режим, согласование, Excel-реестр.',
    status: 'current',
    result: 'Каждая служебная поездка — цифровой след: кто, куда, когда, что сделал. Excel-реестр автоматически.',
  },
  {
    number: 2,
    name: 'RailWork / ГТП',
    subtitle: 'Связь маршрутов с работами',
    modules: ['railwork', 'raildocs', 'raildatahub'],
    description:
      'Цифровое управление работами на объектах. Интеграция с графиком технологического процесса. Электронные документы и журналы.',
    status: 'next',
    result: 'Каждый выезд привязан к конкретной работе. ГТП и факт — в одной системе.',
  },
  {
    number: 3,
    name: 'RailDocs',
    subtitle: 'Цифровые документы',
    modules: ['raildocs', 'railsafety'],
    description:
      'Электронные журналы, акты, приказы, инструктажи. Электронная подпись. Начальная интеграция с корпоративными системами.',
    status: 'next',
    result: 'Нет бумажных журналов. Любой документ — найти за секунды, с историей изменений.',
  },
  {
    number: 4,
    name: 'RailCrew',
    subtitle: 'Локомотивные бригады',
    modules: ['railcrew', 'railtime', 'railcargo'],
    description:
      'Цифровой рабочий цикл локомотивных бригад в контуре ТОО «КТЖ – Грузовые перевозки». Вызов, явка, меддопуск, рейс, учёт времени.',
    status: 'future',
    result: 'Полный цикл бригады — от вызова до расчёта оплаты — без бумаги и ручных таблиц.',
  },
  {
    number: 5,
    name: 'RailAI Core + Аналитика',
    subtitle: 'Интеллектуальная платформа',
    modules: ['railai', 'railanalytics', 'raildatahub', 'integration'],
    description:
      'ИИ-ядро, единая аналитика и интеграционный слой. Обработка нормативных документов, обнаружение аномалий, рекомендации. Подключение к корпоративным системам КТЖ.',
    status: 'future',
    result: 'Система сама выявляет аномалии, предлагает оптимизации и интегрирована в корпоративный ландшафт КТЖ.',
  },
];

// ─── Pilot ─────────────────────────────────────────────────────────────────────

export const pilotInfo: PilotInfo = {
  title: 'Пилот RailRoutes для ШЧ в контуре НЖС',
  goal: 'Проверить цифровой маршрутный лист для служебных поездок работников ШЧ на малые станции с QR-отметками, офлайн-режимом, утверждением и Excel-реестром для оплаты.',
  mvpFeatures: [
    'Одна станция прибытия',
    'Создание маршрута работником или старшим',
    'Цель поездки',
    'Номер поезда или транспорта туда и обратно',
    'Предвыездной инструктаж',
    'Согласование старшим',
    'QR-прибытие на станции',
    'QR-убытие со станции',
    'Офлайн-сохранение событий',
    'Аварийная ручная отметка с фото и объяснением',
    'Статус результата работы',
    'Короткий комментарий',
    'Утверждение начальником дистанции',
    'Excel-реестр для бухгалтерии',
    'Табельный номер работника',
  ],
  outOfScope: [
    'Полный цифровой журнал оборудования',
    'Карточки станций',
    'История работ по оборудованию',
    'Многостанционные маршруты',
    'Автоматический генератор QR-кодов',
    'Глубокая интеграция с ГТП',
    'Интеграция с корпоративными системами КТЖ',
  ],
  stations: [
    { name: 'Айса', type: 'pilot' },
    { name: 'Донгал', type: 'pilot' },
    { name: 'Босага', type: 'pilot' },
    { name: 'Акадыр', type: 'base' },
    { name: 'Жарык', type: 'base' },
    { name: 'Мойынты', type: 'base' },
  ],
  successCriteria: [
    'Все поездки на пилотных станциях регистрируются через приложение — 0 бумажных листов',
    'QR-сканирование работает офлайн: данные синхронизируются при подключении',
    'Excel-реестр формируется автоматически — бухгалтерия не вводит данные вручную',
    'Начальник дистанции утверждает маршрутный лист за < 2 минуты через телефон',
    'Время от завершения поездки до готового реестра — не более 1 рабочего дня',
    'Минимум 80% работников используют систему самостоятельно после 1 обучения',
  ],
  benefits: [
    {
      role: 'Работник',
      items: [
        'Не нужно заполнять бумагу — всё в телефоне',
        'QR-скан вместо ручной подписи',
        'Офлайн-режим на малых станциях без связи',
        'История всех поездок в одном месте',
      ],
    },
    {
      role: 'Руководство',
      items: [
        'Реальная картина: кто где, что сделал',
        'Утверждение одним нажатием из любой точки',
        'Дашборд по выполнению работ в дистанции',
        'Аудиторский след по каждой поездке',
      ],
    },
    {
      role: 'Бухгалтерия',
      items: [
        'Excel-реестр создаётся автоматически',
        'Нет ручного ввода — нет ошибок',
        'Табельный номер, дата, маршрут, сумма — всё заполнено',
        'Закрытие месяца в разы быстрее',
      ],
    },
  ],
  roles: [
    {
      name: 'Работник',
      responsibilities: ['Создание маршрута', 'QR-отметки', 'Фиксация результата работы'],
    },
    {
      name: 'Старший',
      responsibilities: ['Согласование маршрута', 'Создание маршрута за работника'],
    },
    {
      name: 'Начальник дистанции',
      responsibilities: ['Утверждение маршрутных листов', 'Просмотр реестра поездок'],
    },
    {
      name: 'Бухгалтерия',
      responsibilities: ['Получение Excel-реестра', 'Расчёт оплаты поездок'],
    },
  ],
};

// ─── Glossary ──────────────────────────────────────────────────────────────────

export const glossary: GlossaryItem[] = [
  {
    abbreviation: 'КТЖ',
    fullForm: 'АО «Казахстан Темір Жолы»',
    note: 'Национальный железнодорожный оператор Казахстана',
  },
  {
    abbreviation: 'ЦЖС',
    fullForm: 'Центральный уровень магистральной сети',
    note: 'Аббревиатура уточняется — используется по контексту КТЖ',
  },
  {
    abbreviation: 'НЖС',
    fullForm: 'Региональный уровень магистральной сети',
    note: 'Аббревиатура уточняется — используется по контексту КТЖ',
  },
  {
    abbreviation: 'ПЧ',
    fullForm: 'Путевая дистанция',
  },
  {
    abbreviation: 'ШЧ',
    fullForm: 'Дистанция сигнализации и связи',
  },
  {
    abbreviation: 'ЭЧ',
    fullForm: 'Дистанция электроснабжения',
  },
  {
    abbreviation: 'ГТП',
    fullForm: 'График технологического процесса',
  },
  {
    abbreviation: 'QR',
    fullForm: 'Quick Response',
    note: 'Двумерный штрих-код для быстрого сканирования',
  },
];

export const viewModeDescriptions = {
  structure: 'Иерархия: КТЖ → Контуры → Дирекции → Дистанции',
  modules: 'Цифровые модули и их связи (организационная структура затемнена)',
  processes: 'Производственные процессы: маршрутные листы, QR-отметки, выполнение работ, циклы бригад',
  problems: 'Проблемы, которые решает Rail Ecosystem, и связанные модули-решения',
};

// ─── Open Questions ────────────────────────────────────────────────────────────

export const openQuestions: OpenQuestion[] = [
  {
    area: 'Роль ЦЖС',
    question: 'Участвует ли ЦЖС в цепочке согласования маршрутных листов?',
    why: 'Если да — нужен отдельный уровень утверждения и права в системе.',
  },
  {
    area: 'Иерархия НЖС → ШЧ',
    question: 'Утверждает ли НЖС маршрутные листы или только начальник ШЧ?',
    why: 'Определяет глубину цепочки согласования и количество ролей в MVP.',
  },
  {
    area: 'Центральные службы',
    question: 'Какие отчёты нужны центральным службам КТЖ из пилота?',
    why: 'Влияет на формат Excel-реестра и структуру аналитических дашбордов.',
  },
  {
    area: 'Формат Excel-реестра',
    question: 'Есть ли действующий шаблон Excel-реестра в бухгалтерии ШЧ?',
    why: 'Нужно воспроизвести точный формат — иначе реестр не примут без переработки.',
  },
  {
    area: 'QR-коды на станциях',
    question: 'Кто изготавливает и устанавливает QR-коды на малых станциях?',
    why: 'Логистика установки QR — отдельная задача до старта пилота.',
  },
  {
    area: 'Офлайн-синхронизация',
    question: 'Каков типичный период без связи на пилотных станциях (Айса, Донгал, Босага)?',
    why: 'Определяет требования к офлайн-хранилищу и стратегии разрешения конфликтов при синхронизации.',
  },
];
