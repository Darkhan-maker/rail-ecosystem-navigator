import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Пилот RailRoutes для ШЧ — Rail Ecosystem Navigator',
  description: 'Цифровой маршрутный лист на пилотных станциях магистральной сети. Объём MVP, критерии успеха, роли участников.',
};

export default function PilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
