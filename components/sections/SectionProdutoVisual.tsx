import Image from 'next/image'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { SECTION_PRODUTO_VISUAL } from '@/content/copy'

export function SectionProdutoVisual() {
  return (
    <SectionShell id="produto" faixa="roxo-50" heading={SECTION_PRODUTO_VISUAL.heading}>
      <Reveal>
        <p className="max-w-prose text-lead text-tinta-600">{SECTION_PRODUTO_VISUAL.lead}</p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="relative mt-8 aspect-[1600/728] w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src="/produto-cards-fisicos.jpg"
            alt="Fileira com 10 dos +300 cards, cada um com número de catálogo, foto e conteúdo"
            fill
            sizes="(min-width: 1024px) 1120px, 90vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </SectionShell>
  )
}
