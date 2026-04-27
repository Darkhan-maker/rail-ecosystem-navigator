import type { LucideIcon } from '@/components/icons';
import type { CSSProperties } from 'react';

interface Chip {
  label: string;
  color?: string;
}

interface PageHeaderProps {
  Icon: LucideIcon;
  badge?: string;
  title: string;
  lead: string;
  chips?: Chip[];
  accentColor?: string;
}

function chipStyle(color?: string): CSSProperties {
  if (!color) return { background: 'rgba(51,65,85,0.8)', color: '#cbd5e1', border: '1px solid #475569' };
  if (color === '#2563eb') return { background: 'rgba(37,99,235,0.18)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.35)' };
  if (color === '#16a34a') return { background: 'rgba(22,163,74,0.18)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.35)' };
  if (color === '#d97706') return { background: 'rgba(245,158,11,0.18)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.35)' };
  if (color === '#7c3aed') return { background: 'rgba(124,58,237,0.18)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.35)' };
  if (color === '#6366f1') return { background: 'rgba(99,102,241,0.18)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.35)' };
  return { background: color + '18', color: '#93c5fd', border: `1px solid ${color}30` };
}

function iconColor(accentColor: string): string {
  const map: Record<string, string> = {
    '#2563eb': '#93c5fd',
    '#16a34a': '#86efac',
    '#7c3aed': '#c4b5fd',
    '#d97706': '#fcd34d',
    '#6366f1': '#a5b4fc',
  };
  return map[accentColor] ?? '#93c5fd';
}

export default function PageHeader({
  Icon,
  badge,
  title,
  lead,
  chips,
  accentColor = '#2563eb',
}: PageHeaderProps) {
  return (
    <div
      className="relative overflow-hidden border-b border-slate-800"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(71,85,105,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Accent glow */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: accentColor + '12', filter: 'blur(64px)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            style={{ background: accentColor + '20', border: `1px solid ${accentColor}38` }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor(accentColor) }} />
          </div>

          <div className="min-w-0 flex-1">
            {badge && (
              <div className="mb-2.5">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: accentColor + '25', color: iconColor(accentColor), border: `1px solid ${accentColor}35` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  {badge}
                </span>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-base text-slate-400 mt-2 leading-relaxed max-w-2xl">{lead}</p>

            {chips && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full"
                    style={chipStyle(chip.color)}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
