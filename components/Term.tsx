'use client';

import { useState, useRef, useEffect } from 'react';
import { glossaryTerms } from '@/lib/glossary';

interface TermProps {
  children: string;
  termKey?: string;
}

export function Term({ children, termKey }: TermProps) {
  const [open, setOpen]   = useState(false);
  const ref               = useRef<HTMLSpanElement>(null);
  const key               = termKey ?? children;
  const entry             = glossaryTerms[key];
  const tooltipId         = `term-tooltip-${key.replace(/\s+/g, '-')}`;

  // Close on outside mousedown / touchstart
  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [open]);

  // Passthrough if term not found
  if (!entry) return <>{children}</>;

  return (
    <span
      ref={ref}
      className="relative inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={tooltipId}
        aria-label={`${children} — нажмите для расшифровки`}
        className="cursor-help font-[inherit] text-[inherit] leading-[inherit]"
        style={{
          background:   'none',
          border:       'none',
          padding:      0,
          borderBottom: '1px dotted rgba(122,144,168,0.7)',
        }}
      >
        {children}
      </button>

      {/* Tooltip */}
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute z-50 left-1/2 pointer-events-none"
          style={{
            bottom:    'calc(100% + 8px)',
            transform: 'translateX(-50%)',
            minWidth:  200,
            maxWidth:  280,
          }}
        >
          <span
            className="block rounded-xl shadow-2xl"
            style={{
              background:  '#0c1424',
              border:      '1px solid #1a2535',
              padding:     '10px 14px 12px',
            }}
          >
            {/* Header row */}
            <span className="flex items-center gap-2 mb-1.5">
              <span className="text-sm font-bold" style={{ color: '#e2e8f0' }}>
                {entry.term}
              </span>
              {entry.category && (
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{ background: '#1a2535', color: '#4a6080' }}
                >
                  {entry.category}
                </span>
              )}
            </span>

            {/* Definition */}
            <span
              className="block text-xs leading-relaxed"
              style={{ color: '#7a90a8' }}
            >
              {entry.definition}
            </span>

            {/* Arrow pointing down */}
            <span
              className="absolute left-1/2 block"
              style={{
                bottom:    -5,
                transform: 'translateX(-50%) rotate(45deg)',
                width:     9,
                height:    9,
                background: '#0c1424',
                borderRight: '1px solid #1a2535',
                borderBottom: '1px solid #1a2535',
              }}
            />
          </span>
        </span>
      )}
    </span>
  );
}
