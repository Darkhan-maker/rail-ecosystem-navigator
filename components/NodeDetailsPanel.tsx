'use client';

import Link from 'next/link';
import type { MapNodeData } from '@/types/railEcosystem';
import { modules } from '@/data/railEcosystemContent';

interface NodeDetailsPanelProps {
  node: { id: string; data: MapNodeData } | null;
  onClose: () => void;
}

const TYPE_META: Record<string, { label: string; icon: string; accent: string; bg: string }> = {
  root:      { label: 'Корень',      icon: '⬡', accent: '#1d4ed8', bg: '#eff6ff' },
  contour:   { label: 'Контур',      icon: '◈', accent: '#4f46e5', bg: '#eef2ff' },
  core:      { label: 'Ядро',        icon: '✦', accent: '#7c3aed', bg: '#f5f3ff' },
  org:       { label: 'Организация', icon: '▪', accent: '#475569', bg: '#f8fafc' },
  module:    { label: 'Модуль',      icon: '◉', accent: '#2563eb', bg: '#eff6ff' },
  submodule: { label: 'Подмодуль',   icon: '▸', accent: '#6b7280', bg: '#f9fafb' },
  process:   { label: 'Процесс',     icon: '⚙', accent: '#d97706', bg: '#fffbeb' },
  problem:   { label: 'Проблема',    icon: '⚠', accent: '#dc2626', bg: '#fff1f2' },
};

export default function NodeDetailsPanel({ node, onClose }: NodeDetailsPanelProps) {
  if (!node) return null;

  const { data } = node;
  const meta = TYPE_META[data.nodeType] ?? TYPE_META.org;
  const relatedModuleObjects = (data.relatedModules ?? [])
    .map(id => modules.find(m => m.id === id))
    .filter(Boolean);

  return (
    <div className="absolute top-0 right-0 h-full w-72 bg-white border-l border-slate-200 shadow-xl z-10 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3 border-b border-slate-100 shrink-0"
        style={{ background: meta.bg }}>
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
            style={{ background: meta.accent + '18', color: meta.accent }}
          >
            {meta.icon}
          </span>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: meta.accent }}>
              {meta.label}
            </div>
            <div className="text-sm font-semibold text-slate-900 leading-snug truncate">{data.label}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors shrink-0 ml-2"
          aria-label="Закрыть"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 flex-1 text-[13px]">
        {data.description && (
          <Section label="Назначение">
            <p className="text-slate-700 leading-relaxed">{data.description}</p>
          </Section>
        )}

        {data.details && (
          <Section label="Что внутри">
            <p className="text-slate-600 leading-relaxed">{data.details}</p>
          </Section>
        )}

        {data.inputData && data.inputData.length > 0 && (
          <Section label="Входные данные">
            <div className="flex flex-wrap gap-1.5">
              {data.inputData.map(d => (
                <span key={d} className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                  {d}
                </span>
              ))}
            </div>
          </Section>
        )}

        {data.outputData && data.outputData.length > 0 && (
          <Section label="Выходные данные">
            <div className="flex flex-wrap gap-1.5">
              {data.outputData.map(d => (
                <span key={d} className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                  {d}
                </span>
              ))}
            </div>
          </Section>
        )}

        {relatedModuleObjects.length > 0 && (
          <Section label="Связанные модули">
            <div className="space-y-1.5">
              {relatedModuleObjects.map(m => m && (
                <Link
                  key={m.id}
                  href={`/modules#${m.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                >
                  <span className="text-blue-500 shrink-0 text-xs group-hover:text-blue-600">◉</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 truncate">{m.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{m.russianName}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {data.effect && (
          <Section label="Эффект для дистанции">
            <p className="text-slate-600 leading-relaxed italic">{data.effect}</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</div>
      {children}
    </div>
  );
}
