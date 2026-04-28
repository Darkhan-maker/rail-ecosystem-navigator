import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Карта экосистемы — Rail Ecosystem Navigator',
  description: 'Визуальная карта Rail Ecosystem: два операционных контура и цифровое ядро платформы',
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
