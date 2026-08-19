import { Info } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { SECTION_SOBRE } from '@/content/copy'

export function SectionSobre() {
  return (
    <SectionShell id="sobre" faixa="branco" heading={SECTION_SOBRE.heading}>
      <div className="max-w-prose">
        <Reveal>
          <p className="text-tinta-600">{SECTION_SOBRE.intro}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-4 font-display text-h3 font-semibold text-tinta-900">
            {SECTION_SOBRE.palavrasStaccato.join(' ')}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 text-tinta-600">{SECTION_SOBRE.problemaNaoE}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-2 font-display text-h3 font-semibold text-tinta-900">{SECTION_SOBRE.problemaE}</p>
        </Reveal>

        {SECTION_SOBRE.paragrafos.map((paragrafo) => (
          <Reveal key={paragrafo} delay={0.05}>
            <p className="mt-4 text-tinta-600">{paragrafo}</p>
          </Reveal>
        ))}

        <Reveal delay={0.05}>
          <p className="mt-4 font-display text-h3 font-semibold text-tinta-900">{SECTION_SOBRE.fechamento}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex max-w-prose items-start gap-3 rounded-lg bg-roxo-100 p-5">
          <Info aria-hidden="true" strokeWidth={2.25} className="mt-0.5 h-5 w-5 shrink-0 text-roxo-700" />
          <p className="text-sm text-roxo-800">{SECTION_SOBRE.disclaimer}</p>
        </div>
      </Reveal>
    </SectionShell>
  )
}
