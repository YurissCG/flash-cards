import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { ENTREGAVEIS } from '@/content/entregaveis'
import { ICONS } from '@/lib/icons'
import { SECTION_ENTREGA } from '@/content/copy'

export function SectionEntrega() {
  return (
    <SectionShell id="entrega" faixa="branco" eyebrow={SECTION_ENTREGA.eyebrow} heading={SECTION_ENTREGA.heading}>
      <Reveal>
        <p className="max-w-prose text-lead text-tinta-600">{SECTION_ENTREGA.lead}</p>
      </Reveal>

      <RevealGroup as="ul" itemAs="li" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ENTREGAVEIS.map((item) => {
          const Icon = ICONS[item.icone]
          return (
            <div key={item.titulo} className="rounded-lg bg-roxo-50 p-5">
              <Icon aria-hidden="true" strokeWidth={2.25} className="h-6 w-6 text-roxo-400" />
              <p className="mt-3 font-display text-h3 font-semibold text-tinta-900">{item.titulo}</p>
              <p className="mt-1 text-sm text-tinta-600">{item.descricao}</p>
            </div>
          )
        })}
      </RevealGroup>
    </SectionShell>
  )
}
