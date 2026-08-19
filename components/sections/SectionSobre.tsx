import Image from 'next/image'
import { Info } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal } from '@/components/ui/Reveal'
import { SECTION_SOBRE } from '@/content/copy'

// TODO: trocar por fotos reais (equipe, estúdio, atendimento) antes do deploy.
// picsum.photos/seed/{slug} é a opção 2 do §8.2 para os poucos lugares que
// precisam de fotografia real — sem busca por palavra-chave, é foto real
// genérica, mas com cara profissional e 100% pronta pra ser substituída.
const SOBRE_PHOTOS = [
  { seed: 'psicologia-infantil-estudo', alt: 'Pessoa estudando com livros e anotações em uma mesa' },
  { seed: 'psicologia-infantil-biblioteca', alt: 'Estante de biblioteca com livros organizados' },
  { seed: 'psicologia-infantil-consulta', alt: 'Ambiente de consultório acolhedor e organizado' },
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
                src={`https://picsum.photos/seed/${SOBRE_PHOTOS[0].seed}/800/600`}
                alt={SOBRE_PHOTOS[0].alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-roxo-50">
              <Image
                src={`https://picsum.photos/seed/${SOBRE_PHOTOS[1].seed}/500/500`}
                alt={SOBRE_PHOTOS[1].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-roxo-50">
              <Image
                src={`https://picsum.photos/seed/${SOBRE_PHOTOS[2].seed}/500/500`}
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
