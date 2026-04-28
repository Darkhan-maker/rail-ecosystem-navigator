import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Операционные сценарии — Rail Ecosystem Navigator',
  description: 'Маршрутный лист ШЧ и цикл локомотивной бригады — пошаговое описание процессов',
};

export default function ScenariosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
