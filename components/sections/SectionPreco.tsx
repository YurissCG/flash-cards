import { Fragment } from 'react'
import { Check } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { CtaButton } from '@/components/ui/CtaButton'
import { SITE } from '@/content/site'
import { SECTION_PRECO } from '@/content/copy'

export function SectionPreco() {
  return (
    <SectionShell id="preco" faixa="roxo-500" heading={SECTION_PRECO.heading}>
      <Reveal>
        <p className="max-w-prose text-lead text-roxo-100">{SECTION_PRECO.lead}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="font-display text-price font-semibold text-white">{SITE.priceFormatted}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-roxo-100">
          {SECTION_PRECO.subLead.map((linha) => (
            <span key={linha}>{linha}</span>
          ))}
        </div>
      </Reveal>

      <RevealGroup
        as="ul"
        itemAs="li"
        className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2"
        itemClassName="flex items-start gap-2"
      >
        {SECTION_PRECO.itensInclusos.map((item) => (
          <Fragment key={item}>
            <Check aria-hidden="true" strokeWidth={2.25} className="mt-0.5 h-5 w-5 shrink-0 text-verde-500" />
            <span className="text-sm text-white">{item}</span>
          </Fragment>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-8 font-display text-h3 font-semibold text-white">{SECTION_PRECO.closingLine}</p>
        <p className="mt-1 text-sm text-roxo-100">{SECTION_PRECO.comparativo}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col items-start gap-3">
          <CtaButton label={SECTION_PRECO.ctaLabel} origem="preco" size="lg" />
          <p className="text-sm text-roxo-100">{SECTION_PRECO.microcopy}</p>
        </div>
      </Reveal>
    </SectionShell>
  )
}
