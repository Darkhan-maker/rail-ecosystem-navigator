import type { LucideIcon } from '@/components/icons';

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
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Accent glow blob */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: accentColor + '10', filter: 'blur(64px)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Icon container */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            style={{
              background: accentColor + '20',
              border: `1px solid ${accentColor}38`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: accentColor === '#2563eb' ? '#93c5fd' : accentColor === '#16a34a' ? '#86efac' : accentColor === '#7c3aed' ? '#c4b5fd' : accentColor === '#d97706' ? '#fcd34d' : '#93c5fd' }} />
          </div>

          <div className="min-w-0 flex-1">
            {badge && (
              <div className="mb-2">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: accentColor + '25', color: '#93c5fd', border: `1px solid ${accentColor}35` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  {badge}
                </span>
              </div>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed max-w-2xl">{lead}</p>

            {chips && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={
                      chip.color
                        ? {
                            background: chip.color + '18',
                            color: chip.color === '#2563eb' ? '#93c5fd' : chip.color === '#16a34a' ? '#86efac' : chip.color === '#7c3aed' ? '#c4b5fd' : '#fcd34d',
                            border: `1px solid ${chip.color}30`,
                          }
                        : { background: 'rgba(255,255,255,0.07)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.10)' }
                    }
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
