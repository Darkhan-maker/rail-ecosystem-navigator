'use client';

import { useState, useMemo } from 'react';
import { glossary } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';
import { BookOpen, Search, X } from 'lucide-react';

function groupByFirstChar(items: typeof glossary) {
  const map = new Map<string, typeof glossary>();
  for (const item of items) {
    const ch = item.abbreviation[0].toUpperCase();
    if (!map.has(ch)) map.set(ch, []);
    map.get(ch)!.push(item);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, 'ru'));
}

const TERM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'КТЖ': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'ШЧ':  { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'ПЧ':  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'ЭЧ':  { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff' },
  'ЦЖС': { bg: '#f8fafc', text: '#334155', border: '#e2e8f0' },
  'НЖС': { bg: '#f8fafc', text: '#334155', border: '#e2e8f0' },
  'ГТП': { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  'QR':  { bg: '#f5f3ff', text: '#5b21b6', border: '#ddd6fe' },
};

export default function GlossaryPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return glossary;
    return glossary.filter(
      (item) =>
        item.abbreviation.toLowerCase().includes(q) ||
        item.fullForm.toLowerCase().includes(q) ||
        (item.note?.toLowerCase().includes(q) ?? false)
    );
  }, [search]);

  const grouped = groupByFirstChar(filtered);

  return (
    <div className="min-h-screen bg-slate-100">
      <PageHeader
        Icon={BookOpen}
        title="Глоссарий Rail Ecosystem"
        lead="Термины, аббревиатуры и понятия, используемые в платформе и проектной документации"
        chips={[{ label: `${glossary.length} терминов`, color: '#2563eb' }]}
        accentColor="#2563eb"
      />

      {/* Dark sticky search bar */}
      <div
        className="sticky top-14 z-10 border-b shadow-lg"
        style={{ background: '#1e293b', borderColor: '#334155' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: '#64748b' }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по аббревиатуре или расшифровке..."
                className="w-full rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                style={{ background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9' }}
              />
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors hover:bg-slate-700"
                style={{ color: '#94a3b8', border: '1px solid #334155' }}
              >
                <X className="w-3.5 h-3.5" />
                Сбросить
              </button>
            )}
            <span className="text-xs shrink-0 font-mono" style={{ color: '#64748b' }}>
              {filtered.length === glossary.length
                ? `${glossary.length} терминов`
                : `${filtered.length} / ${glossary.length}`}
            </span>
          </div>
        </div>
      </div>

      {/* Quick chips (full list, not filtered) */}
      {!search && (
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2">
            {glossary.map(item => {
              const c = TERM_COLORS[item.abbreviation] ?? { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
              return (
                <a
                  key={item.abbreviation}
                  href={`#${item.abbreviation}`}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors hover:shadow-sm"
                  style={{ background: c.bg, color: c.text, borderColor: c.border }}
                >
                  {item.abbreviation}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Term groups */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {grouped.map(([letter, items]) => (
              <div
                key={letter}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Letter header */}
                <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {letter}
                  </div>
                  <span className="text-xs text-slate-400">{items.length} {items.length === 1 ? 'термин' : 'терминов'}</span>
                </div>

                {/* Terms grid */}
                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((item) => {
                    const c = TERM_COLORS[item.abbreviation] ?? { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
                    return (
                      <div
                        key={item.abbreviation}
                        id={item.abbreviation}
                        className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-150"
                      >
                        <div className="px-4 py-2 border-b border-slate-100" style={{ background: c.bg }}>
                          <span className="text-lg font-bold" style={{ color: c.text }}>{item.abbreviation}</span>
                        </div>
                        <div className="px-4 py-3 bg-white">
                          <div className="text-sm font-semibold text-slate-800 leading-snug">{item.fullForm}</div>
                          {item.note && (
                            <div className="mt-1.5 text-xs text-slate-500 leading-relaxed">{item.note}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-slate-400" />
            </div>
            <div className="text-slate-800 font-bold text-base mb-1">Термины не найдены</div>
            <p className="text-sm text-slate-500 mb-5 text-center max-w-xs">
              По запросу «{search}» ничего не найдено.
            </p>
            <button
              onClick={() => setSearch('')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors hover:opacity-90"
              style={{ background: '#2563eb' }}
            >
              Сбросить поиск
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
