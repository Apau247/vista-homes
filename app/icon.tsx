import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0a2540',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Geist, Arial, sans-serif',
        }}
      >
        <span style={{ color: 'white', fontSize: 20, fontWeight: 700, lineHeight: 1 }}>
          V
        </span>
      </div>
    ),
    { ...size },
  );
}
