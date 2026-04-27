import {
  Route,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Users,
  Clock,
  Container,
  BarChart3,
  BrainCircuit,
  Database,
  PlugZap,
  Bell,
  FileSpreadsheet,
  UserCog,
  Network,
  Boxes,
  Package,
  Workflow,
  TriangleAlert,
  BookOpen,
  Rocket,
  Milestone,
  Map,
  Building2,
  Cpu,
  GitBranch,
  Layers,
  MapPin,
  CheckCircle,
  ArrowRight,
  Info,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

// ─── Module icon registry ──────────────────────────────────────────────────────

export const MODULE_ICONS: Record<string, LucideIcon> = {
  railroutes:    Route,
  railwork:      ClipboardCheck,
  raildocs:      FileText,
  railsafety:    ShieldCheck,
  railcrew:      Users,
  railtime:      Clock,
  railcargo:     Container,
  railanalytics: BarChart3,
  railai:        BrainCircuit,
  raildatahub:   Database,
  integration:   PlugZap,
  notifications: Bell,
  reporting:     FileSpreadsheet,
  usermgmt:      UserCog,
};

// ─── Page icon registry ────────────────────────────────────────────────────────

export const PAGE_ICONS: Record<string, LucideIcon> = {
  contours:  Network,
  modules:   Boxes,
  scenarios: Workflow,
  pilot:     Rocket,
  roadmap:   Milestone,
  glossary:  BookOpen,
  map:       Map,
};

// ─── Node type icon registry ───────────────────────────────────────────────────

export const NODE_TYPE_ICONS: Record<string, LucideIcon> = {
  root:      Network,
  contour:   GitBranch,
  core:      Cpu,
  org:       Building2,
  module:    Package,
  submodule: Layers,
  process:   Workflow,
  problem:   TriangleAlert,
};

// ─── ModuleIcon component ──────────────────────────────────────────────────────

interface ModuleIconProps extends LucideProps {
  moduleId: string;
}

export function ModuleIcon({ moduleId, ...props }: ModuleIconProps) {
  const Icon = MODULE_ICONS[moduleId] ?? Package;
  return <Icon {...props} />;
}

// ─── Status badge config ───────────────────────────────────────────────────────

export const STATUS_STYLE: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  'mvp-priority':   { label: 'MVP',          bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', dot: '#2563eb' },
  'mvp-support':    { label: 'MVP',          bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd', dot: '#0ea5e9' },
  'core-stage':     { label: 'Ядро',         bg: '#f0fdf4', text: '#065f46', border: '#a7f3d0', dot: '#10b981' },
  'next-stage':     { label: 'Следующий',    bg: '#eef2ff', text: '#3730a3', border: '#c7d2fe', dot: '#6366f1' },
  'future-stage':   { label: 'Будущий',      bg: '#f9fafb', text: '#374151', border: '#d1d5db', dot: '#9ca3af' },
  'parallel-stage': { label: 'Параллельный', bg: '#fff7ed', text: '#9a3412', border: '#fed7aa', dot: '#f97316' },
  'planned-stage':  { label: 'Запланирован', bg: '#fffbeb', text: '#78350f', border: '#fde68a', dot: '#f59e0b' },
  'strategic-stage':{ label: 'Стратег.',     bg: '#f5f3ff', text: '#4c1d95', border: '#ddd6fe', dot: '#8b5cf6' },
};

// ─── Contour icon registry ─────────────────────────────────────────────────────

export const CONTOUR_ICONS: Record<string, LucideIcon> = {
  magistral: Route,
  cargo:     Container,
  core:      Cpu,
};

// ─── Visibility item icon registry (home page) ─────────────────────────────────

export const VISIBILITY_ICONS = {
  location:  MapPin,
  time:      Clock,
  verified:  CheckCircle,
  report:    FileSpreadsheet,
  approval:  ClipboardCheck,
  analytics: BarChart3,
} as const;

// Re-export commonly used icons for convenience
export {
  Network, Boxes, Package, Workflow, TriangleAlert,
  BookOpen, Rocket, Milestone, Map, Route,
  ClipboardCheck, FileText, ShieldCheck, Users, Clock,
  Container, BarChart3, BrainCircuit, Database, PlugZap,
  Bell, FileSpreadsheet, UserCog, Cpu, Building2, GitBranch,
  Layers, MapPin, CheckCircle, ArrowRight, Info,
};
export type { LucideIcon };
