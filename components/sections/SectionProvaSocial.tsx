import { Star, ImageOff } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { DEPOIMENTOS, EIXOS_DE_PROVA_SUGERIDOS } from '@/content/depoimentos'
import { SECTION_PROVA_SOCIAL } from '@/content/copy'

export function SectionProvaSocial() {
  return (
    <SectionShell id="prova-social" faixa="roxo-50" heading={SECTION_PROVA_SOCIAL.heading}>
      {DEPOIMENTOS.length > 0 ? (
        <RevealGroup as="ul" itemAs="li" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPOIMENTOS.map((depoimento) => (
            <div key={depoimento.nome} className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex items-center gap-0.5" aria-label={`Nota ${depoimento.nota} de 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    strokeWidth={2.25}
                    className={
                      i < depoimento.nota ? 'h-4 w-4 fill-amarelo-400 text-amarelo-400' : 'h-4 w-4 text-roxo-100'
                    }
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-tinta-600">&ldquo;{depoimento.texto}&rdquo;</p>
              <p className="mt-3 font-display font-semibold text-tinta-900">{depoimento.nome}</p>
              <p className="text-xs text-tinta-600">{depoimento.papel}</p>
            </div>
          ))}
        </RevealGroup>
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
