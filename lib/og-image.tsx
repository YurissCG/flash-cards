import { SITE } from '@/content/site'

export const OG_IMAGE_SIZE = { width: 1200, height: 630 }
export const OG_IMAGE_ALT = 'Pilha de cards de Psicologia Infantil sobre fundo roxo'

// JSX compartilhado por app/opengraph-image.tsx e app/twitter-image.tsx — o
// Next.js exige um arquivo próprio por convenção para cada um, mas o desenho é o mesmo.
export function OgImageContent() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#5B4AE8',
        backgroundImage: 'linear-gradient(135deg, #5B4AE8 0%, #3B2FB8 100%)',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', position: 'absolute', right: 90, top: 110 }}>
        {[2, 1, 0].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 220,
              height: 300,
              borderRadius: 28,
              backgroundColor: '#FFFFFF',
              transform: `rotate(${(i - 1) * 9}deg) translateX(${(i - 1) * 10}px)`,
              boxShadow: '0 24px 60px rgba(21,15,70,0.35)',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#FFD54A', letterSpacing: 2 }}>
        PSICOLOGIA INFANTIL
      </div>
      <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, color: '#FFFFFF', marginTop: 8 }}>
        +300 Cards
      </div>
      <div style={{ display: 'flex', fontSize: 30, color: '#C9C2FB', marginTop: 20, maxWidth: 620 }}>
        Biblioteca visual para consultar em segundos, direto do celular.
      </div>
      <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#FFFFFF', marginTop: 40 }}>
        {SITE.priceFormatted} · acesso digital
      </div>
    </div>
  )
}
