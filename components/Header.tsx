'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Train, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/',          label: 'Главная' },
  { href: '/map',       label: 'Карта' },
  { href: '/contours',  label: 'Контуры' },
  { href: '/modules',   label: 'Модули' },
  { href: '/scenarios', label: 'Сценарии' },
  { href: '/pilot',     label: 'Пилот' },
  { href: '/roadmap',   label: 'Дорожная карта' },
];

const NAV_BG     = 'rgba(8,13,26,0.88)';
const NAV_BORDER = '#1a2535';
const SHEET_BG   = '#0c1424';
const ACTIVE     = '#f1f5f9';
const IDLE       = '#7a90a8';
const HOVER      = '#e2e8f0';
const ACCENT     = '#2563eb';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 h-14"
        style={{
          background: NAV_BG,
          borderBottom: `1px solid ${NAV_BORDER}`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div
              className="flex items-center justify-center w-9 h-9 shrink-0 transition-opacity group-hover:opacity-80"
              style={{ background: ACCENT, borderRadius: 8 }}
            >
              <Train className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="text-sm font-semibold" style={{ color: ACTIVE }}>
                Rail Ecosystem
              </span>
              <span className="text-xs font-medium" style={{ color: '#4a6080' }}>
                Navigator v0.1
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 h-14 flex items-center text-sm font-medium transition-colors duration-150"
                  style={{ color: active ? ACTIVE : IDLE }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = HOVER; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = IDLE; }}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: ACCENT }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Burger */}
          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: IDLE }}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── Mobile sheet ─────────────────────────────────────────────────── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.55)' }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-up sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            style={{
              background: SHEET_BG,
              borderTop: `1px solid ${NAV_BORDER}`,
              borderRadius: '16px 16px 0 0',
              animation: 'sheetSlideUp 0.25s ease-out',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-8 h-1 rounded-full" style={{ background: NAV_BORDER }} />
            </div>

            {/* Links */}
            <nav className="pb-10 mt-2">
              {navLinks.map(link => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-6 py-4 text-base font-medium transition-colors"
                    style={
                      active
                        ? { color: ACTIVE, background: `${ACCENT}20`, borderLeft: `3px solid ${ACCENT}` }
                        : { color: IDLE,   borderLeft: '3px solid transparent' }
                    }
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = HOVER; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = IDLE; }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
