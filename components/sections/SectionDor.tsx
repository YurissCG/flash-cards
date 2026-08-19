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

      <RevealGroup
        as="ul"
        itemAs="li"
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
        itemClassName="flex items-start gap-3 rounded-md bg-white p-4 shadow-sm"
      >
        {SECTION_DOR.pontosDeDor.map((ponto) => (
          <Fragment key={ponto}>
            <X aria-hidden="true" strokeWidth={2.25} className="mt-0.5 h-5 w-5 shrink-0 text-coral-400" />
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
