import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ibmPlex = IBM_Plex_Sans({
  subsets:  ['latin', 'cyrillic'],
  weight:   ['400', '500', '600', '700'],
  display:  'swap',
  variable: '--font-ibm-plex',
});

export const viewport: Viewport = {
  themeColor:          '#080d1a',
  colorScheme:         'dark',
  width:               'device-width',
  initialScale:        1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rail-ecosystem-navigator.vercel.app'),
  title: {
    default:  'Rail Ecosystem Navigator',
    template: '%s — Rail Ecosystem Navigator',
  },
  description: 'Цифровая карта железнодорожной эксплуатации КТЖ. Единая платформа для управления служебными поездками, работами, документами и локомотивными бригадами.',
  openGraph: {
    type:        'website',
    locale:      'ru_RU',
    siteName:    'Rail Ecosystem Navigator',
    title:       'Rail Ecosystem Navigator — Цифровая карта КТЖ',
    description: 'Единая платформа для управления служебными поездками, работами, документами и локомотивными бригадами в КТЖ.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Rail Ecosystem Navigator',
    description: 'Цифровая карта эксплуатации железной дороги КТЖ',
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={ibmPlex.variable}>
      <body className="min-h-screen antialiased">
        {/* Skip to main content — keyboard/screen-reader shortcut */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none"
          style={{ background: '#2563eb', color: '#fff' }}
        >
          Перейти к содержимому
        </a>

        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
