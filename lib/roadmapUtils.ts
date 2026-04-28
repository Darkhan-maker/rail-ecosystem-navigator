import type { RoadmapStage } from '@/types/railEcosystem';

export type VisualStatus = 'current' | 'next' | 'future' | 'strategic';

export function getVisualStatus(stage: RoadmapStage, i: number, total: number): VisualStatus {
  if (stage.status === 'future' && i === total - 1) return 'strategic';
  return stage.status as VisualStatus;
}

export const VS_COLOR: Record<VisualStatus, string> = {
  current:   '#2563eb',
  next:      '#3b82f6',
  future:    '#d97706',
  strategic: '#7c3aed',
};
