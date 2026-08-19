import { Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/content/site'
import { SECTION_SOBRE, FOOTER_COPY } from '@/content/copy'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-roxo-900 py-12 text-roxo-200">
      <Container>
        <p className="font-display text-lg font-semibold text-white">{SITE.name}</p>
        <p className="mt-2 max-w-prose text-sm">{FOOTER_COPY.tagline}</p>

        <p className="mt-6 max-w-prose text-xs text-roxo-200">{SECTION_SOBRE.disclaimer}</p>

        <nav aria-label="Links legais" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="/politica-de-privacidade" className="underline-offset-4 hover:underline">
            {FOOTER_COPY.privacyLabel}
          </a>
          <a href="/termos-de-uso" className="underline-offset-4 hover:underline">
            {FOOTER_COPY.termsLabel}
          </a>
          <a href={`mailto:${SITE.supportEmail}`} className="flex items-center gap-1.5 underline-offset-4 hover:underline">
            <Mail aria-hidden="true" strokeWidth={2.25} className="h-4 w-4" />
            {SITE.supportEmail}
          </a>
        </nav>

        {/* TODO: substituir pela razão social e CNPJ reais antes do deploy. */}
        <p className="mt-6 text-xs text-roxo-200">Razão social: [TODO] · CNPJ: [TODO]</p>

        <p className="mt-2 text-xs text-roxo-200">
          © {currentYear} {SITE.name}. Todos os direitos reservados. Última atualização: 19/08/2026.
        </p>
      </Container>
    </footer>
  )
}
