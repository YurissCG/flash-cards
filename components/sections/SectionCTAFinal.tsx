import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { CtaButton } from '@/components/ui/CtaButton'
import { SECTION_CTA_FINAL } from '@/content/copy'

export function SectionCTAFinal() {
  return (
    <SectionShell id="cta-final" faixa="roxo-800" heading={SECTION_CTA_FINAL.heading}>
      <Reveal>
        <p className="max-w-prose text-lead text-roxo-200">{SECTION_CTA_FINAL.lead}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-2 max-w-prose text-roxo-200">{SECTION_CTA_FINAL.body}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          {SECTION_CTA_FINAL.stats.map((stat) => (
            <span key={stat} className="font-display text-h3 font-semibold text-amarelo-400">
              {stat}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 font-display text-h2 font-semibold text-white">{SECTION_CTA_FINAL.priceLine}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-6 flex flex-col items-start gap-3">
          <CtaButton label={SECTION_CTA_FINAL.ctaLabel} origem="cta-final" size="lg" />
          <p className="text-sm text-roxo-200">{SECTION_CTA_FINAL.microcopy}</p>
        </div>
      </Reveal>
    </SectionShell>
  )
}
