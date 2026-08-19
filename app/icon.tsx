import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#5B4AE8',
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 16,
            height: 20,
            borderRadius: 3,
            background: '#FFFFFF',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
