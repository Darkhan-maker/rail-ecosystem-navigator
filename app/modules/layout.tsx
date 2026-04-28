import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Модули платформы — Rail Ecosystem Navigator',
  description: 'Каталог из 14 модулей Rail Ecosystem: операционные, ядерные и стратегические компоненты',
};

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
