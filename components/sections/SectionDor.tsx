import { Fragment } from 'react'
import { X } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { SECTION_DOR } from '@/content/copy'

export function SectionDor() {
  return (
    <SectionShell id="dor" faixa="roxo-50" heading={SECTION_DOR.heading}>
      <div className="max-w-prose">
        <Reveal>
          <p className="text-lead text-tinta-600">{SECTION_DOR.intro}</p>
        </Reveal>
        {SECTION_DOR.paragrafos.map((paragrafo, i) => (
          <Reveal key={paragrafo} delay={0.05 * (i + 1)}>
            <p className="mt-4 text-tinta-600">{paragrafo}</p>
          </Reveal>
        ))}
      </div>

      {/* No mobile, 6 cards empilhados (com padding, sombra e cantos
          arredondados cada um) pesam demais na rolagem — vira uma lista
          enxuta com só um traço fino entre os itens. A partir de sm:, volta
          ao tratamento em card de 2 colunas, que já cabia bem. */}
      <RevealGroup
        as="ul"
        itemAs="li"
        className="mt-6 flex flex-col divide-y divide-roxo-100 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0"
        itemClassName="flex items-start gap-2.5 py-2.5 sm:gap-3 sm:rounded-md sm:bg-white sm:p-4 sm:py-4 sm:shadow-sm"
      >
        {SECTION_DOR.pontosDeDor.map((ponto) => (
          <Fragment key={ponto}>
            <X aria-hidden="true" strokeWidth={2.25} className="mt-0.5 h-4 w-4 shrink-0 text-coral-400 sm:h-5 sm:w-5" />
            <span className="text-sm text-tinta-600">{ponto}</span>
          </Fragment>
        ))}
      </RevealGroup>

      <div className="mt-10 max-w-prose">
        {SECTION_DOR.paragrafosResolucao.map((paragrafo, i) => (
          <Reveal key={paragrafo} delay={0.05 * (i + 1)}>
            <p className="mt-3 text-tinta-600">{paragrafo}</p>
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <p className="mt-4 font-display text-h3 font-semibold text-tinta-900">{SECTION_DOR.fechamento}</p>
        </Reveal>
      </div>
    </SectionShell>
  )
}
