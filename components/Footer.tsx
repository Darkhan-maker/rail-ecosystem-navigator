import { HelpCircle } from 'lucide-react';

const C = {
  bg:     '#080d1a',
  border: '#1a2535',
  dim:    '#4a6080',
};

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: C.dim }}>
          Rail Ecosystem Navigator · v0.1
        </p>
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 shrink-0" style={{ color: C.dim }} />
          <p className="text-xs" style={{ color: C.dim }}>
            Наведите на подчёркнутое слово для расшифровки
          </p>
        </div>
      </div>
    </footer>
  );
}
