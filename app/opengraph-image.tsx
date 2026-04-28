import { ImageResponse } from 'next/og';

export const runtime     = 'edge';
export const alt         = 'Rail Ecosystem Navigator';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:     '#080d1a',
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'flex-start',
          justifyContent: 'center',
          padding:        '80px 88px',
          fontFamily:     'sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{ width: 56, height: 4, background: '#2563eb', borderRadius: 2, marginBottom: 40 }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 40 }}>
          <div
            style={{
              width:          56,
              height:         56,
              background:     '#2563eb',
              borderRadius:   12,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            {/* Train icon (simplified) */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="3" width="16" height="13" rx="2" />
              <path d="M4 11h16" />
              <path d="M8 16v3M16 16v3M6 19h12" />
              <circle cx="8.5" cy="14.5" r="0.5" fill="white" />
              <circle cx="15.5" cy="14.5" r="0.5" fill="white" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: '#e2e8f0', fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
              Rail Ecosystem Navigator
            </span>
            <span style={{ color: '#4a6080', fontSize: 18 }}>v0.1 · КТЖ</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            color:      '#e2e8f0',
            fontSize:   54,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth:   900,
            marginBottom: 24,
          }}
        >
          Цифровая карта эксплуатации железной дороги
        </div>

        {/* Subline */}
        <div style={{ color: '#7a90a8', fontSize: 24, lineHeight: 1.4, maxWidth: 820 }}>
          От бумажного маршрутного листа до аналитики в реальном времени
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 12, marginTop: 52 }}>
          {['RailRoutes', 'RailCrew', 'RailAI Core', '14 модулей'].map((label) => (
            <div
              key={label}
              style={{
                background:   'rgba(37,99,235,0.15)',
                border:       '1px solid rgba(37,99,235,0.35)',
                borderRadius: 999,
                padding:      '8px 22px',
                color:        '#93c5fd',
                fontSize:     18,
                fontWeight:   500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
