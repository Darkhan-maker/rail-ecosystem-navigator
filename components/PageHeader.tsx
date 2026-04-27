interface Chip {
  label: string;
  color?: string;
}

interface PageHeaderProps {
  icon: string;
  badge?: string;
  title: string;
  lead: string;
  chips?: Chip[];
}

export default function PageHeader({ icon, badge, title, lead, chips }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4 flex-wrap">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm"
            style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            {badge && (
              <span className="inline-flex text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full mb-1.5">
                {badge}
              </span>
            )}
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{title}</h1>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{lead}</p>
            {chips && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                    style={
                      chip.color
                        ? { background: chip.color + '15', color: chip.color, borderColor: chip.color + '30' }
                        : { background: '#f1f5f9', color: '#475569', borderColor: '#e2e8f0' }
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
