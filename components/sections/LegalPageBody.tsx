import { Container } from '@/components/ui/Container'
import { SITE } from '@/content/site'

export interface LegalPageBodyProps {
  heading: string
  updatedAtLabel: string
  sections: readonly { titulo: string; paragrafos: readonly string[] }[]
}

export function LegalPageBody({ heading, updatedAtLabel, sections }: LegalPageBodyProps) {
  return (
    <main className="bg-white py-[var(--section-y-mobile)] md:py-[var(--section-y-desktop)]">
      <Container>
        <div className="mb-8 max-w-prose rounded-lg bg-roxo-100 p-4 text-sm text-roxo-800">
          {/* TODO: remover este aviso após revisão jurídica do conteúdo abaixo. */}
          Minuta estrutural — este texto ainda precisa de revisão jurídica antes de ir ao ar.
        </div>

        <h1 className="font-display text-hero font-semibold text-tinta-900">{heading}</h1>
        <p className="mt-2 text-sm text-tinta-600">{updatedAtLabel}</p>

        <div className="mt-8 flex max-w-prose flex-col gap-8">
          {sections.map((section) => (
            <section key={section.titulo}>
              <h2 className="font-display text-h3 font-semibold text-tinta-900">{section.titulo}</h2>
              {section.paragrafos.map((paragrafo) => (
                <p key={paragrafo} className="mt-2 text-tinta-600">
                  {paragrafo}
                </p>
              ))}
            </section>
          ))}

          <p className="text-tinta-600">
            Dúvidas? Fale com a gente:{' '}
            <a href={`mailto:${SITE.supportEmail}`} className="underline underline-offset-4">
              {SITE.supportEmail}
            </a>
          </p>
        </div>
      </Container>
    </main>
  )
}
