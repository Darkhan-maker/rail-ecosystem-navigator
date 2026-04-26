'use client';

import { useState, useMemo } from 'react';
import { glossary } from '@/data/railEcosystemContent';
import SectionTitle from '@/components/SectionTitle';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        title="Глоссарий"
        subtitle="Термины и аббревиатуры, используемые в Rail Ecosystem"
      />

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по аббревиатуре или расшифровке..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="text-xs text-gray-400 mb-6">
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
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
            >
              <div className="text-xl font-bold text-blue-600 mb-1">{item.abbreviation}</div>
              <div className="text-sm text-gray-800 font-medium">{item.fullForm}</div>
              {item.note && (
                <div className="text-xs text-amber-600 mt-1 italic">{item.note}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          Термины не найдены по запросу «{search}»
        </div>
      )}
    </div>
  );
}
