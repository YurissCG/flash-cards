import { Star, ImageOff } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { DEPOIMENTOS, EIXOS_DE_PROVA_SUGERIDOS, type Depoimento } from '@/content/depoimentos'
import { SECTION_PROVA_SOCIAL } from '@/content/copy'
import { cn } from '@/lib/cn'

export function SectionProvaSocial() {
  return (
    <SectionShell id="prova-social" faixa="roxo-50" heading={SECTION_PROVA_SOCIAL.heading}>
      {DEPOIMENTOS.length > 0 ? (
        <>
          {/* No mobile, 6 cards empilhados (cada um com nome, papel, título e
              texto completo) pesam demais na rolagem — vira carrossel
              horizontal com scroll nativo e snap. A partir de sm:, volta ao
              grid, que já cabia bem. */}
          <div
            role="region"
            aria-label={SECTION_PROVA_SOCIAL.heading}
            tabIndex={0}
            className="-mx-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex snap-x snap-mandatory gap-4 px-4">
              {DEPOIMENTOS.map((depoimento) => (
                <DepoimentoCard
                  key={depoimento.nome}
                  depoimento={depoimento}
                  className="w-[80vw] max-w-xs shrink-0 snap-start"
                />
              ))}
            </div>
          </div>

          <RevealGroup as="ul" itemAs="li" className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {DEPOIMENTOS.map((depoimento) => (
              <DepoimentoCard key={depoimento.nome} depoimento={depoimento} />
            ))}
          </RevealGroup>
        </>
      ) : (
        // TODO: substituir por prints/depoimentos reais assim que existirem (art. 37 CDC).
        <Reveal>
          <div className="rounded-lg border-2 border-dashed border-roxo-200 bg-white p-6">
            <div className="flex items-center gap-3 text-tinta-600">
              <ImageOff aria-hidden="true" strokeWidth={2.25} className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Ainda não temos depoimentos publicados nesta página. Assim que os primeiros relatos reais
                chegarem, eles aparecem aqui. Por enquanto, é isso que estudantes e profissionais costumam
                valorizar neste tipo de material:
              </p>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {EIXOS_DE_PROVA_SUGERIDOS.map((eixo) => (
                <li key={eixo} className="rounded-md bg-roxo-50 px-3 py-2 text-sm text-tinta-600">
                  {eixo}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </SectionShell>
  )
}

function DepoimentoCard({ depoimento, className }: { depoimento: Depoimento; className?: string }) {
  return (
    <div className={cn('rounded-lg bg-white p-5 shadow-sm', className)}>
      {depoimento.nota ? (
        <div className="flex items-center gap-0.5" aria-label={`Nota ${depoimento.nota} de 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              strokeWidth={2.25}
              className={i < depoimento.nota! ? 'h-4 w-4 fill-amarelo-400 text-amarelo-400' : 'h-4 w-4 text-roxo-100'}
            />
          ))}
        </div>
      ) : null}
      <p className={cn('font-display font-semibold text-tinta-900', depoimento.nota ? 'mt-3' : undefined)}>
        {depoimento.titulo}
      </p>
      <p className="mt-2 text-sm text-tinta-600">&ldquo;{depoimento.texto}&rdquo;</p>
      <p className="mt-3 font-display text-sm font-semibold text-tinta-900">{depoimento.nome}</p>
      <p className="text-xs text-tinta-600">{depoimento.papel}</p>
    </div>
  )
}
