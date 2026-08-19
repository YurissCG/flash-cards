import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/content/site'
import { OBRIGADO_COPY } from '@/content/legal'
import { ConversionTracker } from './ConversionTracker'

// Página pós-compra: nunca deve ser indexada nem seguida (§7.7).
export const metadata: Metadata = {
  title: OBRIGADO_COPY.titulo,
  robots: { index: false, follow: false },
}

export default function ObrigadoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-roxo-50 py-[var(--section-y-mobile)]">
      <ConversionTracker />
      <Container>
        <div className="mx-auto flex max-w-prose flex-col items-center gap-4 rounded-xl bg-white p-10 text-center shadow-lg">
          <CheckCircle2 aria-hidden="true" strokeWidth={2.25} className="h-12 w-12 text-verde-500" />
          <h1 className="font-display text-h2 font-semibold text-tinta-900">{OBRIGADO_COPY.titulo}</h1>
          <p className="text-tinta-600">{OBRIGADO_COPY.corpo}</p>
          <p className="text-sm text-tinta-600">{OBRIGADO_COPY.aviso}</p>

          <p className="mt-4 text-sm text-tinta-600">
            {OBRIGADO_COPY.contatoLabel}{' '}
            <a href={`mailto:${SITE.supportEmail}`} className="underline underline-offset-4">
              {SITE.supportEmail}
            </a>
          </p>

          <Button href="/" variant="ghost" size="md" className="mt-2 text-tinta-600">
            {OBRIGADO_COPY.voltarLabel}
          </Button>
        </div>
      </Container>
    </main>
  )
}
