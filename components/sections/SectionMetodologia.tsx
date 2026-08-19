import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import type { AccentColor } from '@/content/hero-cards'
import { SECTION_METODOLOGIA } from '@/content/copy'

const CHIP_COLORS: AccentColor[] = ['roxo', 'verde', 'amarelo', 'coral']

export function SectionMetodologia() {
  return (
    <SectionShell id="metodologia" faixa="branco" heading={SECTION_METODOLOGIA.heading}>
      <Reveal>
        <p className="max-w-prose text-lead text-tinta-600">{SECTION_METODOLOGIA.intro}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-prose text-tinta-600">{SECTION_METODOLOGIA.explicacao}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 max-w-prose rounded-lg bg-roxo-50 p-6">
          <p className="text-sm text-tinta-600">{SECTION_METODOLOGIA.comparativoIntro}</p>
          <p className="mt-1 font-display text-h3 font-semibold text-tinta-900">
            &ldquo;{SECTION_METODOLOGIA.buscaGenerica}&rdquo;
          </p>
          <p className="mt-4 text-sm text-tinta-600">{SECTION_METODOLOGIA.comparativoOutro}</p>
          <RevealGroup as="ul" itemAs="li" className="mt-3 flex flex-wrap gap-2">
            {SECTION_METODOLOGIA.exemplosCards.map((exemplo, i) => (
              <Badge key={exemplo} color={CHIP_COLORS[i % CHIP_COLORS.length]}>
                {exemplo}
              </Badge>
            ))}
          </RevealGroup>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-6 max-w-prose font-display text-h3 font-semibold text-tinta-900">
          {SECTION_METODOLOGIA.conclusao}
        </p>
      </Reveal>
    </SectionShell>
  )
}
