'use client';

import { useState, useMemo } from 'react';
import { glossary } from '@/data/railEcosystemContent';
import PageHeader from '@/components/PageHeader';

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

  return (
    <div>
      <PageHeader
        icon="📖"
        title="Глоссарий"
        lead="Термины и аббревиатуры, используемые в Rail Ecosystem"
        chips={[{ label: `${glossary.length} терминов`, color: '#2563eb' }]}
      />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по аббревиатуре или расшифровке..."
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>

      <div className="text-xs text-slate-400 mb-6">
        {filtered.length === glossary.length
          ? `${glossary.length} терминов`
          : `${filtered.length} из ${glossary.length} терминов`}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((item) => (
            <div
              key={item.abbreviation}
              id={item.abbreviation}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-150"
            >
              <div className="text-xl font-bold text-blue-600 mb-1 leading-tight">{item.abbreviation}</div>
              <div className="text-sm text-slate-800 font-medium leading-snug">{item.fullForm}</div>
              {item.note && (
                <div className="text-xs text-amber-600 mt-1.5 italic leading-relaxed">{item.note}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-sm bg-white rounded-xl border border-slate-200 shadow-sm">
          Термины не найдены по запросу «{search}»
        </div>
      )}
    </div>
    </div>
  );
}
