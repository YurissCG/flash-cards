import { Gift } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { BONUS, TABELA_ANCORAGEM, VALOR_TOTAL_ANCORAGEM_FORMATTED } from '@/content/bonus'
import { SECTION_BONUS } from '@/content/copy'

export function SectionBonus() {
  return (
    <SectionShell id="bonus" faixa="branco" eyebrow={SECTION_BONUS.eyebrow} heading={SECTION_BONUS.heading}>
      <Reveal>
        <p className="max-w-prose text-lead text-tinta-600">{SECTION_BONUS.lead}</p>
      </Reveal>

      <RevealGroup as="ul" itemAs="li" className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {BONUS.map((bonus) => (
          <div key={bonus.numero} className="flex flex-col gap-3 rounded-lg bg-roxo-50 p-5">
            <Gift aria-hidden="true" strokeWidth={2.25} className="h-6 w-6 text-roxo-400" />
            <p className="font-display text-h3 font-semibold text-tinta-900">{bonus.titulo}</p>
            <p className="text-sm text-tinta-600">{bonus.descricao}</p>
            {bonus.temas ? (
              <div className="flex flex-wrap gap-1.5">
                {bonus.temas.map((tema) => (
                  <Badge key={tema} color="roxo">
                    {tema}
                  </Badge>
                ))}
              </div>
            ) : null}
            <p className="mt-auto text-sm font-semibold text-verde-600">Valor: {bonus.valorFormatted}</p>
          </div>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <div className="mt-10 max-w-prose rounded-lg bg-roxo-50 p-6">
          <p className="text-sm text-tinta-600">{SECTION_BONUS.ancoragemIntro}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {TABELA_ANCORAGEM.map((item) => (
              <li key={item.nome} className="flex items-baseline justify-between gap-4 text-sm text-tinta-600">
                <span>{item.nome}</span>
                <span className="font-semibold text-tinta-900">{item.valorFormatted}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-roxo-100 pt-3">
            <span className="font-semibold text-tinta-900">Valor total</span>
            <span className="font-display text-h3 font-semibold text-coral-400 line-through decoration-2">
              {VALOR_TOTAL_ANCORAGEM_FORMATTED}
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 max-w-prose">
          {SECTION_BONUS.naoVaiPagar.map((linha, i) => (
            <p key={linha} className={i === 0 ? 'text-tinta-600' : 'mt-1 text-tinta-600'}>
              {linha}
            </p>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  )
}
