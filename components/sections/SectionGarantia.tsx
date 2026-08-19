import { ShieldCheck } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { CtaButton } from '@/components/ui/CtaButton'
import { SECTION_GARANTIA } from '@/content/copy'

export function SectionGarantia() {
  return (
    <SectionShell id="garantia" faixa="branco" heading={SECTION_GARANTIA.heading}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
        <Reveal>
          <ShieldCheck aria-hidden="true" strokeWidth={2} className="h-16 w-16 text-verde-500" />
        </Reveal>

        <div className="max-w-prose">
          <Reveal>
            <p className="text-lead text-tinta-600">{SECTION_GARANTIA.lead}</p>
          </Reveal>

          {SECTION_GARANTIA.paragrafos.map((paragrafo) => (
            <Reveal key={paragrafo} delay={0.05}>
              <p className="mt-3 text-tinta-600">{paragrafo}</p>
            </Reveal>
          ))}

          <RevealGroup as="ul" itemAs="li" className="mt-4 flex flex-wrap gap-2" itemClassName="">
            {SECTION_GARANTIA.passos.map((passo) => (
              <span
                key={passo}
                className="inline-flex items-center rounded-full bg-verde-100 px-3 py-1 text-sm font-semibold text-verde-600"
              >
                {passo}
              </span>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-4 text-sm text-tinta-600">{SECTION_GARANTIA.condicao}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-1 text-xs text-tinta-600">{SECTION_GARANTIA.baseLegal}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 font-display text-h3 font-semibold text-tinta-900">{SECTION_GARANTIA.fechamento}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6">
              <CtaButton label={SECTION_GARANTIA.ctaLabel} origem="garantia" size="lg" />
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}
