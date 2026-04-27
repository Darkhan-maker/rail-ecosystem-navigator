'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/map', label: 'Карта' },
  { href: '/contours', label: 'Контуры' },
  { href: '/modules', label: 'Модули' },
  { href: '/scenarios', label: 'Сценарии' },
  { href: '/pilot', label: 'Пилот' },
  { href: '/roadmap', label: 'Дорожная карта' },
  { href: '/glossary', label: 'Глоссарий' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ background: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span
              className="inline-flex w-7 h-7 rounded-lg items-center justify-center text-white text-[11px] font-bold tracking-tight leading-none shadow-sm"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              RE
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-white text-sm font-semibold tracking-tight">Rail Ecosystem</span>
              <span className="text-slate-400 text-[10px] font-medium tracking-wide">Navigator v0.1</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-700/60 px-4 py-3 space-y-1" style={{ background: '#0f172a' }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Brand accent stripe */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%)' }} />
    </header>
  );
}
