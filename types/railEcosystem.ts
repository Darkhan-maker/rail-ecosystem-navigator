export type MaturityStatus =
  | 'mvp-priority'
  | 'mvp-support'
  | 'next-stage'
  | 'future-stage'
  | 'parallel-stage'
  | 'planned-stage'
  | 'strategic-stage'
  | 'core-stage';

export interface Module {
  id: string;
  name: string;
  russianName: string;
  description: string;
  status: MaturityStatus;
  relatedModules: string[];
  inputData?: string[];
  outputData?: string[];
  details?: string;
}

export interface ContourChainNode {
  label: string;
  sublabel?: string;
}

export interface Contour {
  id: string;
  name: string;
  description: string;
  chain: ContourChainNode[];
  color: string;
  modules: string[];
}

export type MapNodeType = 'root' | 'contour' | 'org' | 'module' | 'core' | 'submodule' | 'process' | 'problem';

export interface MapNodeData extends Record<string, unknown> {
  label: string;
  nodeType: MapNodeType;
  description?: string;
  details?: string;
  inputData?: string[];
  outputData?: string[];
  relatedModules?: string[];
  effect?: string;
}

export interface ScenarioStep {
  number: number;
  name: string;
  description: string;
  dataPoints: string[];
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  chain: string[];
  steps: ScenarioStep[];
}

export interface RoadmapStage {
  number: number;
  name: string;
  subtitle: string;
  modules: string[];
  description: string;
  status: 'current' | 'next' | 'future';
  result?: string;
}

export interface OpenQuestion {
  area: string;
  question: string;
  why: string;
}

export interface GlossaryItem {
  abbreviation: string;
  fullForm: string;
  note?: string;
}

export interface PilotStation {
  name: string;
  type: 'pilot' | 'base';
}

export interface PilotRole {
  name: string;
  responsibilities: string[];
}

export interface PilotBenefit {
  role: string;
  items: string[];
}

export interface PilotInfo {
  title: string;
  goal: string;
  mvpFeatures: string[];
  outOfScope: string[];
  stations: PilotStation[];
  roles: PilotRole[];
  successCriteria: string[];
  benefits: PilotBenefit[];
}

export type ViewMode = 'structure' | 'modules' | 'processes' | 'problems';
