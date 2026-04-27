import type { Module } from '@/types/railEcosystem';
import { modules } from '@/data/railEcosystemContent';
import { MODULE_ICONS, STATUS_STYLE, Package, ArrowRight } from '@/components/icons';
import Link from 'next/link';

const moduleNameMap = Object.fromEntries(modules.map(m => [m.id, m.name]));

interface ModuleCardProps {
  module: Module;
  detailed?: boolean;
  featured?: boolean;
}

export default function ModuleCard({
  module,
  detailed = false,
  featured = false,
}: ModuleCardProps) {
  const status = STATUS_STYLE[module.status] ?? {
    label: module.status, bg: '#f8fafc', text: '#475569', border: '#e2e8f0', dot: '#94a3b8',
  };
  const Icon = MODULE_ICONS[module.id] ?? Package;
  const relatedVisible = detailed
    ? module.relatedModules
    : module.relatedModules.slice(0, 3);
  const relatedOverflow = !detailed && module.relatedModules.length > 3
    ? module.relatedModules.length - 3
    : 0;

  // ── Featured (wide) layout ────────────────────────────────────────────────
  if (featured) {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200">
        <div className="h-[3px]" style={{ background: status.dot }} />
        <div className="p-6 flex flex-col sm:flex-row gap-6">

          {/* Left column — identity & actions */}
          <div className="sm:w-56 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: status.bg, border: `1.5px solid ${status.border}` }}
              >
                <Icon className="w-6 h-6" style={{ color: status.dot }} />
              </div>
              <div className="min-w-0">
                <div className="text-base font-bold text-slate-900 leading-snug">{module.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{module.russianName}</div>
              </div>
            </div>

            <span
              className="inline-flex text-[10px] font-bold px-2.5 py-1 rounded-full border mb-4"
              style={{ background: status.bg, color: status.text, borderColor: status.border }}
            >
              {status.label}
            </span>

            {relatedVisible.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-slate-400 mb-1.5">Связанные</div>
                <div className="flex flex-wrap gap-1.5">
                  {relatedVisible.map((id) => (
                    <Link
                      key={id}
                      href={`/modules#${id}`}
                      className="text-xs px-2.5 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {moduleNameMap[id] ?? id}
                    </Link>
                  ))}
                  {relatedOverflow > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-slate-100 bg-slate-50 text-slate-400">
                      +{relatedOverflow}
                    </span>
                  )}
                </div>
              </div>
            )}

            <Link
              href={`/modules#${module.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2 transition-all duration-150"
              style={{ color: status.dot }}
            >
              Подробнее
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden sm:block w-px bg-slate-100 shrink-0" />

          {/* Right column — content */}
          <div className="flex-1 min-w-0 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">{module.description}</p>

            {detailed && module.details && (
              <div className="rounded-xl p-3.5 border" style={{ background: status.bg, borderColor: status.border }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: status.dot }}>
                  Детали
                </div>
                <p className="text-xs leading-relaxed" style={{ color: status.text }}>{module.details}</p>
              </div>
            )}

            {detailed && module.inputData && module.inputData.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1.5">Входные данные</div>
                <div className="flex flex-wrap gap-1">
                  {module.inputData.map((d) => (
                    <span key={d} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">{d}</span>
                  ))}
                </div>
              </div>
            )}

            {detailed && module.outputData && module.outputData.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1.5">Выходные данные</div>
                <div className="flex flex-wrap gap-1">
                  {module.outputData.map((d) => (
                    <span key={d} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">{d}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Regular card ──────────────────────────────────────────────────────────
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
      <div className="h-[3px] w-full shrink-0" style={{ background: status.dot }} />

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Header: icon + name + badge */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: status.bg, border: `1.5px solid ${status.border}` }}
          >
            <Icon className="w-5 h-5" style={{ color: status.dot }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-900 leading-snug">{module.name}</div>
                <div className="text-xs text-slate-400 mt-0.5 truncate">{module.russianName}</div>
              </div>
              <span
                className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap"
                style={{ background: status.bg, color: status.text, borderColor: status.border }}
              >
                {status.label}
              </span>
            </div>
          </div>
        </div>

        {/* Description — text-sm for readability */}
        <p className="text-sm text-slate-600 leading-relaxed">{module.description}</p>

        {/* Details box — detailed mode only */}
        {detailed && module.details && (
          <div className="rounded-xl p-3 border" style={{ background: status.bg, borderColor: status.border }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: status.dot }}>
              Детали
            </div>
            <p className="text-xs leading-relaxed" style={{ color: status.text }}>{module.details}</p>
          </div>
        )}

        {/* Input data — detailed mode only */}
        {detailed && module.inputData && module.inputData.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1.5">Входные данные</div>
            <div className="flex flex-wrap gap-1">
              {module.inputData.map((d) => (
                <span key={d} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">{d}</span>
              ))}
            </div>
          </div>
        )}

        {/* Output data — detailed mode only */}
        {detailed && module.outputData && module.outputData.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1.5">Выходные данные</div>
            <div className="flex flex-wrap gap-1">
              {module.outputData.map((d) => (
                <span key={d} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">{d}</span>
              ))}
            </div>
          </div>
        )}

        {/* Related modules */}
        {relatedVisible.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1.5">Связанные</div>
            <div className="flex flex-wrap gap-1">
              {relatedVisible.map((id) => (
                <Link
                  key={id}
                  href={`/modules#${id}`}
                  className="text-xs px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {moduleNameMap[id] ?? id}
                </Link>
              ))}
              {relatedOverflow > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full border border-slate-100 bg-slate-50 text-slate-400">
                  +{relatedOverflow}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <Link
            href={`/modules#${module.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-1.5 transition-all duration-150"
            style={{ color: status.dot }}
          >
            Подробнее
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
