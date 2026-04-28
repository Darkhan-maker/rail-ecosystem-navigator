import Link from 'next/link';
import { Home, ArrowRight, Train } from 'lucide-react';

const C = {
  bg:     '#080d1a',
  card:   '#0c1424',
  border: '#1a2535',
  text:   '#e2e8f0',
  muted:  '#7a90a8',
  dim:    '#4a6080',
  blue:   '#2563eb',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: C.bg }}
    >
      <div className="text-center max-w-sm">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: C.blue + '15', border: `1px solid ${C.blue}30` }}
        >
          <Train className="w-8 h-8" style={{ color: C.blue }} />
        </div>

        {/* Number */}
        <div
          className="text-8xl font-black leading-none mb-4 select-none"
          style={{ color: C.blue + '25' }}
        >
          404
        </div>

        <h1 className="text-xl font-bold mb-2" style={{ color: C.text }}>
          Страница не найдена
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: C.muted }}>
          Запрошенная страница не существует или была перемещена.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: C.blue, color: '#fff' }}
          >
            <Home className="w-4 h-4" />
            На главную
          </Link>
          <Link
            href="/pilot"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-80"
            style={{ color: C.text, borderColor: C.border, background: C.card }}
          >
            О пилоте
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
