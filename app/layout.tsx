import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { PopupProvider } from '@/components/popups/PopupProvider'
import { Pixels } from '@/components/analytics/Pixels'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildJsonLdGraph } from '@/components/seo/schemas'
import { SITE } from '@/content/site'
import { display, body } from './fonts'
import './globals.css'

// Exato de §7.2 — não reinterpretar nenhum campo.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: '+300 Cards de Psicologia Infantil | Biblioteca Visual de Consulta Rápida',
    template: '%s | +300 Cards de Psicologia Infantil',
  },
  description:
    'Biblioteca visual com mais de 300 cards de Psicologia Infantil organizados em 12 áreas — desenvolvimento, emoções, ansiedade, TDAH, autismo, família e mais. Consulte pelo celular em segundos. Acesso digital por R$ 47,90.',
  keywords: [
    'cards de psicologia infantil',
    'material de apoio psicologia infantil',
    'flashcards psicologia infantil',
    'resumo psicologia infantil',
    'material para estagiário de psicologia',
    'psicologia infantil consulta rápida',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.name,
    title: '+300 Cards de Psicologia Infantil na palma da sua mão',
    description:
      'Desenvolvimento, emoções, ansiedade, TDAH, autismo, família e mais — em 12 categorias organizadas para consulta rápida. Acesso digital por R$ 47,90.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Pilha de cards de Psicologia Infantil sobre fundo roxo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '+300 Cards de Psicologia Infantil',
    description: 'Uma biblioteca visual para consultar em segundos. R$ 47,90, acesso digital.',
    images: ['/og.jpg'],
  },
  category: 'education',
  formatDetection: { telephone: false, address: false, email: false },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={buildJsonLdGraph()} />
        <Pixels />
        {/* domAnimation cobre whileInView/whileHover/whileTap/exit — ~60% mais leve
            que o bundle completo (§5.1). O Hero Deck usa `motion` cheio à parte,
            para o drag, que domAnimation não inclui. */}
        <LazyMotion features={domAnimation}>
          <PopupProvider>{children}</PopupProvider>
        </LazyMotion>
      </body>
    </html>
  )
}
