import Image from 'next/image'
import { Info } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { SECTION_SOBRE } from '@/content/copy'

// Fotos reais do dia a dia de quem usa os cards — home office, café, parque —
// substituindo os placeholders de banco de imagens genérico (§8.2, opção 2).
const SOBRE_PHOTOS = [
  { src: '/sobre/estudo.jpg', alt: 'Psicóloga consultando os cards no notebook, em um home office' },
  { src: '/sobre/cafe.jpg', alt: 'Psicóloga revisando um card em um café, entre um atendimento e outro' },
  { src: '/sobre/parque.jpg', alt: 'Psicóloga revisando os cards sentada em um banco de praça' },
] as const

export function SectionSobre() {
  return (
    <SectionShell id="sobre" faixa="branco" heading={SECTION_SOBRE.heading}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
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

          <Reveal delay={0.1}>
            <div className="mt-8 flex items-start gap-3 rounded-lg bg-roxo-100 p-5">
              <Info aria-hidden="true" strokeWidth={2.25} className="mt-0.5 h-5 w-5 shrink-0 text-roxo-700" />
              <p className="text-sm text-roxo-800">{SECTION_SOBRE.disclaimer}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-lg bg-roxo-50">
              <Image
                src={SOBRE_PHOTOS[0].src}
                alt={SOBRE_PHOTOS[0].alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-roxo-50">
              <Image
                src={SOBRE_PHOTOS[1].src}
                alt={SOBRE_PHOTOS[1].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-roxo-50">
              <Image
                src={SOBRE_PHOTOS[2].src}
                alt={SOBRE_PHOTOS[2].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
